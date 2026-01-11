import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ThreatVisualizationProps {
  showMap?: boolean
  showArchitecture?: boolean
}

export function ThreatVisualization({
  showMap = true,
  showArchitecture = true,
}: ThreatVisualizationProps) {
  return (
    <div className="space-y-6">
      {/* Threat Intelligence Map */}
      {showMap && (
        <div className="border border-border rounded-lg overflow-hidden bg-black/5">
          <div className="relative w-full aspect-[16/10]">
            <Image
              src="/demo-assets/images/ot-threat-intelligence-map.webp"
              alt="OT Threat Intelligence Map showing attack vectors from IT (Zone 1) to OT (Zone 3)"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="p-3 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground font-mono">
              Live Topology: IT Gateway → Lateral Movement → OT SCADA Array
            </p>
          </div>
        </div>
      )}

      {/* Purdue Model Architecture Diagram */}
      {showArchitecture && (
        <div className="border border-border rounded-lg overflow-hidden bg-card p-6">
          <h3 className="text-sm font-semibold mb-4">Purdue Model: Attack Path Analysis</h3>
          <svg
            viewBox="0 0 800 300"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Zone 1: IT & Cloud */}
            <g>
              <rect
                x="20"
                y="40"
                width="200"
                height="220"
                rx="8"
                className="fill-blue-500/10 stroke-blue-500"
                strokeWidth="2"
              />
              <text x="120" y="70" className="fill-blue-500 text-sm font-bold" textAnchor="middle">
                Zone 1: IT & Cloud
              </text>
              <rect
                x="40"
                y="90"
                width="160"
                height="50"
                rx="4"
                className="fill-destructive/20 stroke-destructive"
                strokeWidth="2"
              />
              <text x="120" y="110" className="fill-foreground text-xs font-mono" textAnchor="middle">
                Enterprise VPN
              </text>
              <text x="120" y="125" className="fill-destructive text-xs font-bold" textAnchor="middle">
                COMPROMISED
              </text>
              <rect
                x="40"
                y="155"
                width="160"
                height="50"
                rx="4"
                className="fill-amber-500/20 stroke-amber-500"
                strokeWidth="2"
              />
              <text x="120" y="175" className="fill-foreground text-xs font-mono" textAnchor="middle">
                Linux Jump Host
              </text>
              <text x="120" y="190" className="fill-amber-600 text-xs font-bold" textAnchor="middle">
                AT RISK
              </text>
            </g>

            {/* Arrow 1: Zone 1 → Zone 2 */}
            <g>
              <line
                x1="220"
                y1="150"
                x2="280"
                y2="150"
                className="stroke-destructive"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
              <text x="250" y="140" className="fill-destructive text-xs font-bold" textAnchor="middle">
                CVE-2024-3400
              </text>
            </g>

            {/* Zone 2: DMZ / Data Diode */}
            <g>
              <rect
                x="280"
                y="100"
                width="120"
                height="100"
                rx="8"
                className="fill-yellow-500/10 stroke-yellow-500"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <text x="340" y="125" className="fill-yellow-600 text-sm font-bold" textAnchor="middle">
                Zone 2: DMZ
              </text>
              <text x="340" y="145" className="fill-foreground text-xs font-mono" textAnchor="middle">
                Data Diode
              </text>
              <text x="340" y="165" className="fill-yellow-600 text-xs" textAnchor="middle">
                Bypassed
              </text>
            </g>

            {/* Arrow 2: Zone 2 → Zone 3 */}
            <g>
              <line
                x1="400"
                y1="150"
                x2="460"
                y2="150"
                className="stroke-destructive"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
              <text x="430" y="140" className="fill-destructive text-xs font-bold" textAnchor="middle">
                SSH Lateral
              </text>
            </g>

            {/* Zone 3: OT / SCADA */}
            <g>
              <rect
                x="460"
                y="40"
                width="320"
                height="220"
                rx="8"
                className="fill-destructive/10 stroke-destructive"
                strokeWidth="3"
              />
              <text x="620" y="70" className="fill-destructive text-sm font-bold" textAnchor="middle">
                Zone 3: OT / SCADA
              </text>
              <rect
                x="480"
                y="90"
                width="130"
                height="50"
                rx="4"
                className="fill-yellow-500/20 stroke-yellow-500"
                strokeWidth="2"
              />
              <text x="545" y="110" className="fill-foreground text-xs font-mono" textAnchor="middle">
                SCADA Bridge
              </text>
              <text x="545" y="125" className="fill-yellow-600 text-xs font-bold" textAnchor="middle">
                WARNING
              </text>
              <rect
                x="630"
                y="90"
                width="130"
                height="50"
                rx="4"
                className="fill-destructive/20 stroke-destructive"
                strokeWidth="2"
              />
              <text x="695" y="110" className="fill-foreground text-xs font-mono" textAnchor="middle">
                Smart Inverter
              </text>
              <text x="695" y="125" className="fill-destructive text-xs font-bold" textAnchor="middle">
                ANOMALOUS
              </text>
              <rect
                x="480"
                y="155"
                width="130"
                height="50"
                rx="4"
                className="fill-green-500/20 stroke-green-500"
                strokeWidth="2"
              />
              <text x="545" y="175" className="fill-foreground text-xs font-mono" textAnchor="middle">
                Storage Unit B
              </text>
              <text x="545" y="190" className="fill-green-600 text-xs font-bold" textAnchor="middle">
                NOMINAL
              </text>
            </g>

            {/* Attack indicator on target */}
            <g>
              <circle cx="695" cy="115" r="30" className="fill-none stroke-destructive" strokeWidth="2">
                <animate
                  attributeName="r"
                  values="30;35;30"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                className="fill-destructive"
              >
                <polygon points="0 0, 10 3, 0 6" />
              </marker>
            </defs>

            {/* Legend */}
            <g transform="translate(20, 280)">
              <text x="0" y="0" className="fill-muted-foreground text-xs font-semibold">
                Legend:
              </text>
              <circle cx="60" cy="-3" r="4" className="fill-destructive" />
              <text x="70" y="0" className="fill-muted-foreground text-xs">
                Compromised
              </text>
              <circle cx="150" cy="-3" r="4" className="fill-amber-500" />
              <text x="160" y="0" className="fill-muted-foreground text-xs">
                At Risk
              </text>
              <circle cx="230" cy="-3" r="4" className="fill-green-500" />
              <text x="240" y="0" className="fill-muted-foreground text-xs">
                Nominal
              </text>
            </g>
          </svg>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              APT Volt Typhoon
            </Badge>
            <Badge variant="outline" className="text-xs">
              Living-off-the-Land Tactics
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
