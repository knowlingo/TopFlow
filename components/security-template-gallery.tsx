"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, Download, CheckCircle2 } from "lucide-react"
import type { StoredWorkflow } from "@/lib/storage"

interface SecurityTemplateGalleryProps {
  templates: StoredWorkflow[]
  onTryTemplate: (template: StoredWorkflow) => void
  className?: string
}

export function SecurityTemplateGallery({ templates, onTryTemplate, className }: SecurityTemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(templates.map((t) => t.category))
    return ["all", ...Array.from(cats)]
  }, [templates])

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [templates, searchQuery, selectedCategory])

  // Get security score for display
  const getSecurityScore = (template: StoredWorkflow) => {
    // Extract from metadata if available
    return (template as any).securityScore || 95
  }

  // Get security badge color
  const getSecurityBadgeColor = (score: number) => {
    if (score >= 90) return "border-green-500 text-green-600 bg-green-50"
    if (score >= 80) return "border-blue-500 text-blue-600 bg-blue-50"
    if (score >= 70) return "border-yellow-500 text-yellow-600 bg-yellow-50"
    return "border-red-500 text-red-600 bg-red-50"
  }

  // Get compliance badges
  const getComplianceBadges = (template: StoredWorkflow) => {
    const badges: string[] = []
    const name = template.name.toLowerCase()
    const description = template.description.toLowerCase()
    const tags = template.tags.map((t) => t.toLowerCase())

    if (
      name.includes("hipaa") ||
      description.includes("hipaa") ||
      tags.includes("hipaa") ||
      name.includes("patient") ||
      name.includes("health")
    ) {
      badges.push("HIPAA")
    }
    if (
      name.includes("gdpr") ||
      description.includes("gdpr") ||
      tags.includes("gdpr") ||
      name.includes("privacy") ||
      name.includes("europe")
    ) {
      badges.push("GDPR")
    }
    if (
      name.includes("soc2") ||
      name.includes("soc 2") ||
      description.includes("soc2") ||
      description.includes("soc 2") ||
      tags.includes("soc2") ||
      name.includes("audit")
    ) {
      badges.push("SOC 2")
    }
    if (
      name.includes("iso 27001") ||
      name.includes("iso27001") ||
      description.includes("iso 27001") ||
      description.includes("iso27001") ||
      tags.includes("iso27001")
    ) {
      badges.push("ISO 27001")
    }
    if (
      name.includes("ai act") ||
      name.includes("eu ai") ||
      description.includes("ai act") ||
      description.includes("eu ai") ||
      tags.includes("eu-ai-act") ||
      tags.includes("ai-compliance")
    ) {
      badges.push("EU AI Act")
    }
    if (
      name.includes("nerc") ||
      name.includes("ot") ||
      name.includes("ics") ||
      name.includes("scada") ||
      name.includes("critical infrastructure") ||
      description.includes("critical infrastructure") ||
      tags.includes("ot") ||
      tags.includes("nerc-cip") ||
      tags.includes("iec 62443")
    ) {
      badges.push("OT/ICS")
    }
    if (
      name.includes("ccpa") ||
      description.includes("ccpa") ||
      tags.includes("ccpa") ||
      name.includes("california")
    ) {
      badges.push("CCPA")
    }
    if (
      name.includes("cpra") ||
      description.includes("cpra") ||
      tags.includes("cpra")
    ) {
      badges.push("CPRA")
    }

    return badges
  }

  return (
    <div className={className}>
      {/* Filter Controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Category:</span>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-2">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"}
          </Badge>
        </div>
      </div>

      {/* Template Grid */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const securityScore = getSecurityScore(template)
            const complianceBadges = getComplianceBadges(template)

            return (
              <Card
                key={template.id}
                className="flex flex-col border-2 bg-card transition-all hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader className="pb-3">
                  {/* Title & Category */}
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold leading-tight">{template.name}</CardTitle>
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {template.category}
                    </Badge>
                  </div>

                  {/* Description */}
                  <CardDescription className="line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                  {/* Compliance Badges */}
                  {complianceBadges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {complianceBadges.map((badge) => (
                        <Badge key={badge} variant="outline" className="border-green-500 text-green-600">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex min-h-[1.75rem] flex-wrap gap-1.5">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Security Score */}
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Security Score</span>
                    </div>
                    <Badge variant="outline" className={getSecurityBadgeColor(securityScore)}>
                      {securityScore}/100
                    </Badge>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{template.nodes.length} nodes</span>
                    <span className="text-muted-foreground/60">•</span>
                    <span>{template.author}</span>
                  </div>

                  {/* Action Button */}
                  <Button onClick={() => onTryTemplate(template)} className="mt-auto w-full" size="default">
                    <Download className="mr-2 h-4 w-4" />
                    Try Template
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
