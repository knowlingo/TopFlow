/**
 * lib/osv/scanner.ts — Real (OSV-powered) GitHub repository vulnerability scan.
 * ============================================================================
 * Drop-in companion to the *demo* scanner (app/api/demo/github-scan/...).
 * It produces an object shaped to TopFlow's existing RepoAnalysis contract —
 * specifically the fields the workflow's "Calculate Score" node already reads
 * in its "Real API mode" branch — so real mode slots into the GitHub Scanner
 * workflow with no changes to the scoring/visualization downstream.
 *
 * BYOK: the caller supplies a GitHub token (Personal Access Token, `public_repo`
 * read scope is enough for public repos). It raises GitHub's rate limit from
 * 60 -> 5,000 req/hr — the documented blocker that forced demo mock data — and
 * enables private-repo scanning. OSV.dev itself requires NO key.
 *
 * Pipeline: repo meta -> fetch manifest(s) -> parse deps -> OSV /v1/querybatch
 *           -> OSV /v1/query (severity + fix) -> map to RepoAnalysis.
 *
 * Validated live against api.github.com + api.osv.dev (see poc/osv-scan.mjs).
 */

const OSV = "https://api.osv.dev";
const GH = "https://api.github.com";

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export interface Dep { ecosystem: string; name: string; version: string }
export interface VulnDetail {
  id: string; osvId: string; severity: Severity; component: string;
  description: string; fix: string; effort: string;
}
export interface ScanResult {
  repository: string; stars: number; forks: number; language: string; lastAnalyzed: string;
  scanMode: "real-osv"; securityScore: number; grade: string;
  vulnerabilities: { critical: number; high: number; medium: number; low: number; details: VulnDetail[] };
  dependencyAudit: {
    total: number; vulnerable: number; outdated: number | null; licenses: string[];
    riskBreakdown: { high: number; medium: number; low: number }; ecosystemsScanned: string[];
  };
  securityPractices: Record<string, boolean | null>;
  owaspCompliance: { A06_vulnerable_components: "PASS" | "WARNING" | "FAIL" };
  _meta: { manifestSources: string[]; dataSources: string[]; byok: boolean };
}

/* ------------------------------ network layer ----------------------------- */
function ghHeaders(token?: string): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "TopFlow-Scanner" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}
async function ghJson(url: string, token?: string): Promise<any> {
  const r = await fetch(url, { headers: ghHeaders(token) });
  if (r.status === 404) return null;
  if (r.status === 403) throw new Error("GitHub rate limit / forbidden — supply a token for higher limits.");
  if (!r.ok) throw new Error(`GitHub ${r.status} for ${url}`);
  return r.json();
}
async function osvPost(path: string, body: unknown): Promise<any> {
  const r = await fetch(`${OSV}${path}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`OSV ${r.status} for ${path}`);
  return r.json();
}

/* ------------------------------- github layer ----------------------------- */
async function fetchFile(owner: string, repo: string, path: string, ref: string, token?: string): Promise<string | null> {
  const d = await ghJson(`${GH}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${ref}`, token);
  if (!d || d.message === "Not Found") return null;
  if (d.content && d.encoding === "base64") return Buffer.from(d.content, "base64").toString("utf8");
  if (d.download_url) { const r = await fetch(d.download_url); return r.ok ? r.text() : null; } // >1MB files
  return null;
}
async function fileExists(owner: string, repo: string, path: string, ref: string, token?: string): Promise<boolean> {
  const d = await ghJson(`${GH}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${ref}`, token);
  return !!(d && !d.message);
}

/* ------------------------------ manifest parsers -------------------------- */
const cleanVer = (v: string) => (v || "").replace(/^[v^~>=<\s]+/, "").match(/\d+(\.\d+){0,3}[\w.-]*/)?.[0] || "";

function parsePackageLock(text: string): Dep[] {
  const j = JSON.parse(text); const out: Dep[] = [];
  if (j.packages) {
    for (const [k, v] of Object.entries<any>(j.packages)) {
      if (!k || !v?.version) continue;
      const name = k.split("node_modules/").pop()!;
      if (name) out.push({ ecosystem: "npm", name, version: v.version });
    }
  } else if (j.dependencies) {
    const walk = (deps: any) => { for (const [name, v] of Object.entries<any>(deps)) {
      if (v?.version) out.push({ ecosystem: "npm", name, version: cleanVer(v.version) });
      if (v?.dependencies) walk(v.dependencies); } };
    walk(j.dependencies);
  }
  return out;
}
function parsePackageJson(text: string): Dep[] {
  const j = JSON.parse(text); const out: Dep[] = [];
  for (const sec of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    for (const [name, range] of Object.entries<string>(j[sec] || {})) {
      if (/^(workspace:|file:|link:|git|http|\*|latest)/.test(range)) continue;
      const version = cleanVer(range); if (version) out.push({ ecosystem: "npm", name, version });
    }
  }
  return out;
}
function parsePnpmLock(text: string): Dep[] {
  const out: Dep[] = []; let inPkgs = false;
  for (const line of text.split("\n")) {
    if (/^packages:\s*$/.test(line)) { inPkgs = true; continue; }
    if (inPkgs && /^\S/.test(line)) inPkgs = false;
    if (!inPkgs) continue;
    const m = line.match(/^\s+'?\/?(@?[\w.-]+(?:\/[\w.-]+)?)@(\d+\.\d+\.\d+[\w.-]*)/);
    if (m) out.push({ ecosystem: "npm", name: m[1], version: m[2] });
  }
  return out;
}
function parseRequirements(text: string): Dep[] {
  const out: Dep[] = [];
  for (let line of text.split("\n")) {
    line = line.split("#")[0].trim(); if (!line || line.startsWith("-")) continue;
    const m = line.match(/^([A-Za-z0-9._-]+)\s*(?:\[[^\]]*\])?\s*==\s*([\w.!+-]+)/);
    if (m) out.push({ ecosystem: "PyPI", name: m[1], version: m[2] });
  }
  return out;
}
function parseGoMod(text: string): Dep[] {
  const out: Dep[] = []; let inBlock = false;
  for (let line of text.split("\n")) {
    line = line.trim();
    if (line.startsWith("require (")) { inBlock = true; continue; }
    if (inBlock && line === ")") { inBlock = false; continue; }
    const m = (inBlock ? line : line.replace(/^require\s+/, "")).match(/^([\w.\-/]+\.[\w]+\/[\w.\-/]+)\s+v(\d+\.\d+\.\d+[\w.\-+]*)/);
    if ((inBlock || line.startsWith("require ")) && m) out.push({ ecosystem: "Go", name: m[1], version: m[2] });
  }
  return out;
}
function parseCargoLock(text: string): Dep[] {
  const out: Dep[] = [];
  for (const b of text.split(/\[\[package\]\]/).slice(1)) {
    const n = b.match(/name\s*=\s*"([^"]+)"/); const v = b.match(/version\s*=\s*"([^"]+)"/);
    if (n && v) out.push({ ecosystem: "crates.io", name: n[1], version: v[1] });
  }
  return out;
}

async function collectDependencies(owner: string, repo: string, ref: string, token?: string) {
  const candidates: Array<[string, (t: string) => Dep[]]> = [
    ["package-lock.json", parsePackageLock], ["pnpm-lock.yaml", parsePnpmLock],
    ["package.json", parsePackageJson], ["requirements.txt", parseRequirements],
    ["go.mod", parseGoMod], ["Cargo.lock", parseCargoLock],
  ];
  let deps: Dep[] = []; const sources: string[] = []; let haveNpmLock = false;
  for (const [path, parser] of candidates) {
    if (path === "package.json" && haveNpmLock) continue; // prefer real lockfile
    const text = await fetchFile(owner, repo, path, ref, token);
    if (!text) continue;
    try {
      const parsed = parser(text);
      if (parsed.length) { deps = deps.concat(parsed); sources.push(`${path} (${parsed.length})`); }
      if (path === "package-lock.json" || path === "pnpm-lock.yaml") haveNpmLock = true;
    } catch (e: any) { sources.push(`${path} (parse error)`); }
  }
  const seen = new Set<string>(); const uniq: Dep[] = [];
  for (const d of deps) { const key = `${d.ecosystem}|${d.name}|${d.version}`; if (!seen.has(key)) { seen.add(key); uniq.push(d); } }
  return { deps: uniq, sources };
}

/* --------------------------- severity + cvss v3.1 ------------------------- */
const C: any = {
  AV: { N: .85, A: .62, L: .55, P: .2 }, AC: { L: .77, H: .44 },
  PR: { N: .85, L: .62, H: .27 }, PR_S: { N: .85, L: .68, H: .5 },
  UI: { N: .85, R: .62 }, CIA: { H: .56, L: .22, N: 0 },
};
function cvss3Base(vector: string): number | null {
  try {
    const m: any = Object.fromEntries(vector.split("/").slice(1).map((p) => p.split(":") as [string, string]));
    const scope = m.S === "C";
    const iss = 1 - (1 - C.CIA[m.C]) * (1 - C.CIA[m.I]) * (1 - C.CIA[m.A]);
    const impact = scope ? 7.52 * (iss - .029) - 3.25 * Math.pow(iss - .02, 15) : 6.42 * iss;
    const expl = 8.22 * C.AV[m.AV] * C.AC[m.AC] * (scope ? C.PR_S : C.PR)[m.PR] * C.UI[m.UI];
    if (impact <= 0) return 0;
    const raw = scope ? Math.min(1.08 * (impact + expl), 10) : Math.min(impact + expl, 10);
    return Math.ceil(raw * 10) / 10;
  } catch { return null; }
}
const bucket = (s: number): Severity => (s >= 9 ? "CRITICAL" : s >= 7 ? "HIGH" : s >= 4 ? "MEDIUM" : "LOW");
function severityOf(v: any): Severity {
  const gh = v.database_specific?.severity;
  if (gh) return (({ CRITICAL: "CRITICAL", HIGH: "HIGH", MODERATE: "MEDIUM", MEDIUM: "MEDIUM", LOW: "LOW" } as any)[String(gh).toUpperCase()]) || "MEDIUM";
  const vec = (v.severity || []).find((s: any) => /CVSS/.test(s.type));
  if (vec) { const sc = cvss3Base(vec.score); if (sc != null) return bucket(sc); }
  return "MEDIUM";
}
function fixedVersionFor(v: any, name: string): string {
  const aff = (v.affected || []).find((a: any) => a.package?.name === name) || (v.affected || [])[0];
  const fixes: string[] = [];
  for (const r of aff?.ranges || []) for (const e of r.events || []) if (e.fixed) fixes.push(e.fixed);
  return fixes.length ? `Upgrade to ${[...new Set(fixes)].join(" / ")}` : "See advisory for remediation";
}
const gradeFor = (s: number) =>
  s >= 95 ? "A+" : s >= 90 ? "A" : s >= 85 ? "A-" : s >= 80 ? "B+" : s >= 70 ? "B" : s >= 60 ? "C+" : s >= 50 ? "C" : "D";

/* ---------------------------------------------------------------------------
 * Pure helpers exported for unit testing (no network). See lib/__tests__.
 * ------------------------------------------------------------------------- */
export {
  cleanVer, parsePackageLock, parsePackageJson, parsePnpmLock, parseRequirements, parseGoMod, parseCargoLock,
  cvss3Base, bucket, severityOf, fixedVersionFor, gradeFor,
};

/* ---------------------------------- main ---------------------------------- */
export async function scanRepository(owner: string, repo: string, opts: { githubToken?: string } = {}): Promise<ScanResult> {
  const token = opts.githubToken;
  const meta = await ghJson(`${GH}/repos/${owner}/${repo}`, token);
  if (!meta) throw new Error(`Repository ${owner}/${repo} not found (or private without a token).`);
  const ref = meta.default_branch;

  const { deps, sources } = await collectDependencies(owner, repo, ref, token);
  if (!deps.length) throw new Error("No parseable dependency manifest found (npm/PyPI/Go/Cargo).");

  const batch = (await osvPost("/v1/querybatch", {
    queries: deps.map((d) => ({ package: { name: d.name, ecosystem: d.ecosystem }, version: d.version })),
  })).results || [];
  const vulnerableDeps = deps.filter((_, i) => batch[i]?.vulns?.length);

  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  const details: VulnDetail[] = []; const perDepWorst = new Map<string, Severity>(); const seen = new Set<string>();
  const rank: any = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  for (const dep of vulnerableDeps) {
    const vulns = (await osvPost("/v1/query", { package: { name: dep.name, ecosystem: dep.ecosystem }, version: dep.version })).vulns || [];
    for (const v of vulns) {
      const key = `${dep.name}@${dep.version}|${v.id}`; if (seen.has(key)) continue; seen.add(key);
      const sev = severityOf(v); counts[sev.toLowerCase() as keyof typeof counts]++;
      const cve = (v.aliases || []).find((a: string) => a.startsWith("CVE-")) || v.id;
      details.push({
        id: cve, osvId: v.id, severity: sev, component: `${dep.name}@${dep.version}`,
        description: (v.summary || (v.details || "").slice(0, 140) || "Known security advisory").trim(),
        fix: fixedVersionFor(v, dep.name), effort: sev === "LOW" ? "5 minutes" : sev === "MEDIUM" ? "15 minutes" : "30+ minutes",
      });
      if (!perDepWorst.has(dep.name) || rank[sev] > rank[perDepWorst.get(dep.name)!]) perDepWorst.set(dep.name, sev);
    }
  }
  const riskBreakdown = { high: 0, medium: 0, low: 0 };
  for (const sev of perDepWorst.values())
    sev === "CRITICAL" || sev === "HIGH" ? riskBreakdown.high++ : sev === "MEDIUM" ? riskBreakdown.medium++ : riskBreakdown.low++;

  const has_security_policy = (await Promise.all(["SECURITY.md", ".github/SECURITY.md", "docs/SECURITY.md"].map((p) => fileExists(owner, repo, p, ref, token)))).some(Boolean);
  const dependabot_enabled = (await Promise.all([".github/dependabot.yml", ".github/dependabot.yaml"].map((p) => fileExists(owner, repo, p, ref, token)))).some(Boolean);

  const vulnScore = Math.max(0, 100 - counts.critical * 30 - counts.high * 20 - counts.medium * 10 - counts.low * 2);
  const depScore = Math.max(0, 100 - vulnerableDeps.length * 15);
  const practiceScore = ([has_security_policy, dependabot_enabled].filter(Boolean).length / 2) * 100;
  const owaspA06 = counts.critical || counts.high ? "FAIL" : counts.medium ? "WARNING" : "PASS";
  const owaspScore = owaspA06 === "PASS" ? 100 : owaspA06 === "WARNING" ? 70 : 30;
  const securityScore = Math.round(vulnScore * 0.35 + depScore * 0.25 + practiceScore * 0.25 + owaspScore * 0.15);

  return {
    repository: `${owner}/${repo}`, stars: meta.stargazers_count, forks: meta.forks_count,
    language: meta.language, lastAnalyzed: new Date().toISOString(),
    scanMode: "real-osv", securityScore, grade: gradeFor(securityScore),
    vulnerabilities: { ...counts, details },
    dependencyAudit: {
      total: deps.length, vulnerable: vulnerableDeps.length, outdated: null, licenses: [],
      riskBreakdown, ecosystemsScanned: [...new Set(deps.map((d) => d.ecosystem))],
    },
    securityPractices: {
      has_security_policy, dependabot_enabled,
      code_scanning: null, secret_scanning: null, branch_protection: null, signed_commits: null, two_factor_required: null,
    },
    owaspCompliance: { A06_vulnerable_components: owaspA06 },
    _meta: { manifestSources: sources, dataSources: ["GitHub REST API", "OSV.dev"], byok: !!token },
  };
}
