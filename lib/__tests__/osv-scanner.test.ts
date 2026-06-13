/**
 * Unit tests for the OSV real-scan pure logic (no network).
 * Run with: pnpm test (Jest).
 *
 * Network-dependent code (GitHub fetch, OSV queries, full scanRepository) is
 * intentionally NOT unit-tested here — it is covered by manual/integration
 * validation documented in docs/development/osv-real-scan-implementation.md.
 */
import {
  cleanVer, parsePackageJson, parseRequirements, parseGoMod, parseCargoLock,
  cvss3Base, bucket, severityOf, gradeFor,
} from "../osv/scanner";

describe("version normalization", () => {
  test("cleanVer strips range operators", () => {
    expect(cleanVer("^4.17.4")).toBe("4.17.4");
    expect(cleanVer(">=1.2.3")).toBe("1.2.3");
    expect(cleanVer("~0.9.0")).toBe("0.9.0");
  });
});

describe("manifest parsers", () => {
  test("package.json: strips ranges, skips non-registry specs", () => {
    const deps = parsePackageJson(JSON.stringify({
      dependencies: { lodash: "^4.17.4", next: "15.5.7", local: "workspace:*", star: "*", repo: "git+https://x/y.git" },
      devDependencies: { jest: "~30.0.0" },
    }));
    const map = Object.fromEntries(deps.map((d) => [d.name, d.version]));
    expect(map.lodash).toBe("4.17.4");
    expect(map.next).toBe("15.5.7");
    expect(map.jest).toBe("30.0.0");
    expect(map.local).toBeUndefined();
    expect(map.star).toBeUndefined();
    expect(map.repo).toBeUndefined();
    expect(deps.every((d) => d.ecosystem === "npm")).toBe(true);
  });

  test("requirements.txt: pinned only; ignores comments, options, extras", () => {
    const deps = parseRequirements(
      ["# a comment", "Django==2.2.0", "requests[security]==2.20.0", "-r other.txt", "unpinned>=1.0", "flask == 1.0.2"].join("\n")
    );
    const map = Object.fromEntries(deps.map((d) => [d.name, d.version]));
    expect(map.Django).toBe("2.2.0");
    expect(map.requests).toBe("2.20.0");
    expect(map.flask).toBe("1.0.2");
    expect(map.unpinned).toBeUndefined();
    expect(deps.every((d) => d.ecosystem === "PyPI")).toBe(true);
  });

  test("go.mod: parses the require block", () => {
    const deps = parseGoMod(
      ["module example.com/x", "go 1.21", "require (", "  github.com/gin-gonic/gin v1.7.0", "  golang.org/x/text v0.3.7", ")"].join("\n")
    );
    const map = Object.fromEntries(deps.map((d) => [d.name, d.version]));
    expect(map["github.com/gin-gonic/gin"]).toBe("1.7.0");
    expect(map["golang.org/x/text"]).toBe("0.3.7");
    expect(deps.every((d) => d.ecosystem === "Go")).toBe(true);
  });

  test("Cargo.lock: parses [[package]] blocks", () => {
    const deps = parseCargoLock(
      ["[[package]]", 'name = "serde"', 'version = "1.0.0"', "", "[[package]]", 'name = "tokio"', 'version = "1.20.0"'].join("\n")
    );
    const map = Object.fromEntries(deps.map((d) => [d.name, d.version]));
    expect(map.serde).toBe("1.0.0");
    expect(map.tokio).toBe("1.20.0");
    expect(deps.every((d) => d.ecosystem === "crates.io")).toBe(true);
  });
});

describe("severity model", () => {
  test("cvss3Base computes the textbook critical vector (9.8)", () => {
    expect(cvss3Base("CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H")).toBeCloseTo(9.8, 1);
  });

  test("bucket maps scores to severity bands", () => {
    expect(bucket(9.8)).toBe("CRITICAL");
    expect(bucket(7.5)).toBe("HIGH");
    expect(bucket(5.0)).toBe("MEDIUM");
    expect(bucket(2.0)).toBe("LOW");
  });

  test("severityOf prefers the GHSA rating (MODERATE -> MEDIUM)", () => {
    expect(severityOf({ database_specific: { severity: "MODERATE" } })).toBe("MEDIUM");
    expect(severityOf({ database_specific: { severity: "CRITICAL" } })).toBe("CRITICAL");
  });

  test("severityOf falls back to the CVSS vector when no GHSA rating", () => {
    expect(severityOf({ severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H" }] })).toBe("CRITICAL");
  });

  test("severityOf defaults to MEDIUM when nothing is available", () => {
    expect(severityOf({})).toBe("MEDIUM");
  });
});

describe("grading", () => {
  test("gradeFor maps scores to letter grades", () => {
    expect(gradeFor(96)).toBe("A+");
    expect(gradeFor(72)).toBe("B");
    expect(gradeFor(17)).toBe("D");
  });
});
