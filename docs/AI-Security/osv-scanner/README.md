# AI Security Tutorials — TopFlow GitHub Security Scanner

A hands-on cybersecurity / AI-security training series built from **real hardening work** on
TopFlow's LLM workflow engine and its flagship GitHub Security Scanner. Each tutorial turns a
shipped pull request into a teaching case study: you see the threat, the model, the attack, the
design trade-offs, and the actual code that fixed it.

> These are training materials. They reference real files and PRs in this repository so learners
> can read the production code alongside the lesson.

## Who this is for
Application & platform engineers, security engineers, and AI/ML engineers shipping LLM-powered
products. Comfort with TypeScript and basic web security is assumed; each tutorial recaps the
concepts it depends on.

## How each tutorial is structured
A consistent template so the series compounds:

1. **Context & architecture** — where the risk lives in this system.
2. **Security mechanism** — the defensive concept(s), in general terms.
3. **Threat model** — assets, trust boundaries, entry points, STRIDE mapping for *this* architecture.
4. **Attack trees** — attacker goals decomposed into concrete paths (incl. the ones we did *not* fully close).
5. **Design considerations** — the decisions and trade-offs, with the roads not taken.
6. **Implementation case study** — a walkthrough of the real PR: code, tests, what was deferred and why.
7. **Hands-on labs & exercises** — do/observe/break, plus discussion questions.
8. **Takeaways, mappings & further reading** — OWASP / CWE / NIST / MITRE references and a checklist.

## Tutorials
| # | Topic | Source PR | Status |
|---|---|---|---|
| 01 | Securing workflow egress & execution: SSRF allowlisting, cycle detection, rate limiting | #12 | Draft 2026-06-14 |
| 02 | Secrets at rest: BYOK key encryption in a zero-backend app | (W1 key-encryption) | Draft 2026-06-14 |

_More to come as the W1 "5-layer defense" hardening lands (JS-sandbox isolation, etc.)._

## Companion design docs
- `docs/architecture/urw-llm-pipeline-design.md` — the Untrusted Reasoning Worker trust boundary.
- `docs/architecture/osv-real-scan-design.md` — the real OSV scanning architecture.
- `docs/development/osv-scanner/01-p0-security-hardening.md` — the hardening program these tutorials track.
