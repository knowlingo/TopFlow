/**
 * Badge SVG Generator
 * Generates shields.io-style security badges
 */

type BadgeGrade = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D" | "F" | "?"

interface BadgeColors {
  background: string
  text: string
}

const GRADE_COLORS: Record<BadgeGrade, BadgeColors> = {
  "A+": { background: "#00C853", text: "#ffffff" },
  A: { background: "#00E676", text: "#ffffff" },
  "A-": { background: "#69F0AE", text: "#000000" },
  "B+": { background: "#76FF03", text: "#000000" },
  B: { background: "#C6FF00", text: "#000000" },
  "B-": { background: "#FFEB3B", text: "#000000" },
  "C+": { background: "#FFC107", text: "#000000" },
  C: { background: "#FF9800", text: "#000000" },
  "C-": { background: "#FF6F00", text: "#ffffff" },
  D: { background: "#F44336", text: "#ffffff" },
  F: { background: "#D32F2F", text: "#ffffff" },
  "?": { background: "#9E9E9E", text: "#ffffff" },
}

/**
 * Calculate text width in pixels (approximation for monospace)
 */
function calculateTextWidth(text: string, fontSize: number = 11): number {
  // Average character width for Verdana 11px
  const avgCharWidth = 6.5
  return text.length * avgCharWidth + 10 // padding
}

/**
 * Generate security badge SVG
 */
export function generateSecurityBadge(grade: BadgeGrade, score: number): string {
  const colors = GRADE_COLORS[grade]
  const scoreText = `${grade} (${score}/100)`

  const labelText = "Security"
  const labelWidth = calculateTextWidth(labelText)
  const valueWidth = calculateTextWidth(scoreText)
  const totalWidth = labelWidth + valueWidth

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="Security: ${scoreText}">
  <title>Security: ${scoreText}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${colors.background}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${labelWidth / 2 * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(labelText.length * 65)}">${labelText}</text>
    <text x="${labelWidth / 2 * 10}" y="140" transform="scale(.1)" fill="#fff" textLength="${(labelText.length * 65)}">${labelText}</text>
    <text aria-hidden="true" x="${(labelWidth + valueWidth / 2) * 10}" y="150" fill="${colors.text === "#000000" ? "#010101" : "#010101"}" fill-opacity=".3" transform="scale(.1)" textLength="${(scoreText.length * 65)}">${scoreText}</text>
    <text x="${(labelWidth + valueWidth / 2) * 10}" y="140" transform="scale(.1)" fill="${colors.text}" textLength="${(scoreText.length * 65)}">${scoreText}</text>
  </g>
</svg>
  `.trim()

  return svg
}

/**
 * Generate simple flat-style badge
 */
export function generateFlatBadge(grade: BadgeGrade, score: number): string {
  const colors = GRADE_COLORS[grade]
  const scoreText = `${grade} · ${score}/100`

  const labelText = "Security Score"
  const labelWidth = calculateTextWidth(labelText, 12)
  const valueWidth = calculateTextWidth(scoreText, 12)
  const totalWidth = labelWidth + valueWidth + 20

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="24" role="img" aria-label="Security Score: ${scoreText}">
  <title>Security Score: ${scoreText}</title>
  <rect width="${totalWidth}" height="24" rx="4" fill="${colors.background}"/>
  <g fill="${colors.text}" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="12">
    <text x="10" y="17" fill="${colors.text}">${labelText}: ${scoreText}</text>
  </g>
</svg>
  `.trim()

  return svg
}

/**
 * Determine grade from score
 */
export function getGradeFromScore(score: number): BadgeGrade {
  if (score >= 97) return "A+"
  if (score >= 93) return "A"
  if (score >= 90) return "A-"
  if (score >= 87) return "B+"
  if (score >= 83) return "B"
  if (score >= 80) return "B-"
  if (score >= 77) return "C+"
  if (score >= 73) return "C"
  if (score >= 70) return "C-"
  if (score >= 60) return "D"
  if (score < 60) return "F"
  return "?"
}
