import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface DocsFooterProps {
  previousPage?: {
    title: string
    href: string
  }
  nextPage?: {
    title: string
    href: string
  }
}

export function DocsFooter({ previousPage, nextPage }: DocsFooterProps) {
  if (!previousPage && !nextPage) return null

  return (
    <div className="flex items-center justify-between gap-4 pt-8 mt-12 border-t border-border">
      {previousPage ? (
        <Link href={previousPage.href} className="flex-1">
          <Button variant="outline" className="w-full justify-start group bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="text-sm font-medium">{previousPage.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextPage ? (
        <Link href={nextPage.href} className="flex-1">
          <Button variant="outline" className="w-full justify-end group bg-transparent">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="text-sm font-medium">{nextPage.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
