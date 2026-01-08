"use client"

import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ExportSectionProps {
  templateId: string
}

export function ExportSection({ templateId }: ExportSectionProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <section className="border-t border-border pt-8 mb-8 print:hidden">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/30 p-6 rounded-lg">
        <div>
          <h3 className="font-semibold mb-1">Export This Report</h3>
          <p className="text-sm text-muted-foreground">
            Download as PDF for compliance documentation or share with your team.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Save as PDF
          </Button>
          <Link href={`/builder?template=${templateId}`}>
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in Builder
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
