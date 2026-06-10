import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters from URL
    const repo = searchParams.get("repo") || "unknown/repo"
    const grade = searchParams.get("grade") || "?"
    const score = searchParams.get("score") || "0"
    const vulnerabilities = searchParams.get("vulnerabilities") || "0"
    const deps = searchParams.get("deps") || "0"

    // Determine colors based on grade
    const getGradeColors = (grade: string) => {
      if (grade.startsWith("A")) return { bg: "#00C853", border: "#00E676", glow: "rgba(0, 200, 83, 0.3)" }
      if (grade.startsWith("B")) return { bg: "#2196F3", border: "#42A5F5", glow: "rgba(33, 150, 243, 0.3)" }
      if (grade.startsWith("C")) return { bg: "#FF9800", border: "#FFB74D", glow: "rgba(255, 152, 0, 0.3)" }
      return { bg: "#F44336", border: "#EF5350", glow: "rgba(244, 67, 54, 0.3)" }
    }

    const colors = getGradeColors(grade)

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Main content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px",
              width: "1080px",
              backgroundColor: "#1a1a1a",
              borderRadius: "24px",
              border: `4px solid ${colors.border}`,
              boxShadow: `0 0 60px ${colors.glow}`,
            }}
          >
            {/* Logo/Title */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: colors.bg,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "20px",
                  fontSize: "32px",
                }}
              >
                🛡️
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff", marginBottom: "4px" }}>
                  TopFlow Security Scanner
                </div>
                <div style={{ fontSize: "20px", color: "#888888" }}>GitHub Repository Analysis</div>
              </div>
            </div>

            {/* Repository Name */}
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              {repo}
            </div>

            {/* Grade Display */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              <div
                style={{
                  width: "240px",
                  height: "240px",
                  backgroundColor: colors.bg,
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 10px 40px ${colors.glow}`,
                  border: `6px solid ${colors.border}`,
                }}
              >
                <div style={{ fontSize: "120px", fontWeight: "bold", color: "#ffffff", lineHeight: 1 }}>{grade}</div>
                <div style={{ fontSize: "32px", color: "#ffffff", opacity: 0.9 }}>{score}/100</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 40px",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "16px",
                  border: "2px solid #333",
                }}
              >
                <div style={{ fontSize: "48px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>
                  {vulnerabilities}
                </div>
                <div style={{ fontSize: "20px", color: "#888888" }}>Critical Issues</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 40px",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "16px",
                  border: "2px solid #333",
                }}
              >
                <div style={{ fontSize: "48px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>
                  {deps}
                </div>
                <div style={{ fontSize: "20px", color: "#888888" }}>Vulnerable Deps</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 40px",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "16px",
                  border: "2px solid #333",
                }}
              >
                <div style={{ fontSize: "48px", fontWeight: "bold", color: colors.bg, marginBottom: "8px" }}>✓</div>
                <div style={{ fontSize: "20px", color: "#888888" }}>Scanned</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ fontSize: "24px", color: "#666666", textAlign: "center" }}>
              topflow.dev • Free Security Analysis
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error("OG Image generation error:", error)

    // Return fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontSize: "48px",
            fontFamily: "system-ui",
          }}
        >
          TopFlow Security Scanner
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
