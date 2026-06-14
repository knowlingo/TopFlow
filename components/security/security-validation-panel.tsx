"use client"

import { useMemo } from "react"
import { ShieldAlert, AlertCircle, AlertTriangle, X, Lock, Eye, FileSearch, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface ValidationIssue {
  id: string
  title: string
  description: string
  severity: "error" | "warning" | "info"
  category: "ssrf" | "pii" | "validation" | "compliance"
  nodeIds: string[]
  fixable?: boolean
}

interface SecurityCheck {
  id: string
  name: string
  passed: boolean
  description: string
  impact: "high" | "medium" | "low"
}

interface SecurityValidationPanelProps {
  errors: ValidationIssue[]
  warnings: ValidationIssue[]
  securityChecks: SecurityCheck[]
  overallScore: number
  onNavigateToNode?: (nodeId: string) => void
  onClose?: () => void
  className?: string
}

const CATEGORY_CONFIG = {
  ssrf: {
    label: "SSRF Risks",
    icon: ShieldAlert,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  pii: {
    label: "PII Detection",
    icon: Eye,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  validation: {
    label: "Validation Issues",
    icon: FileSearch,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  compliance: {
    label: "Compliance",
    icon: Lock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
} as const

export function SecurityValidationPanel({
  errors,
  warnings,
  securityChecks,
  overallScore,
  onNavigateToNode,
  onClose,
  className,
}: SecurityValidationPanelProps) {
  const groupedErrors = useMemo(() => {
    const grouped: Record<string, ValidationIssue[]> = {
      ssrf: [],
      pii: [],
      validation: [],
      compliance: [],
    }
    errors.forEach((error) => {
      grouped[error.category].push(error)
    })
    return grouped
  }, [errors])

  const groupedWarnings = useMemo(() => {
    const grouped: Record<string, ValidationIssue[]> = {
      ssrf: [],
      pii: [],
      validation: [],
      compliance: [],
    }
    warnings.forEach((warning) => {
      grouped[warning.category].push(warning)
    })
    return grouped
  }, [warnings])

  const renderIssueGroup = (category: keyof typeof CATEGORY_CONFIG, issues: ValidationIssue[]) => {
    if (issues.length === 0) return null

    const config = CATEGORY_CONFIG[category]
    const Icon = config.icon

    return (
      <AccordionItem value={category} key={category}>
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.color)} />
            <span className="text-sm font-medium">{config.label}</span>
            <Badge variant="outline" className="ml-auto">
              {issues.length}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {issues.map((issue) => (
              <Card
                key={issue.id}
                className={cn("cursor-pointer transition-all hover:shadow-md", config.bgColor, config.borderColor)}
                onClick={() => onNavigateToNode?.(issue.nodeIds[0])}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold">{issue.title}</p>
                      <p className="text-xs text-muted-foreground">{issue.description}</p>
                      {issue.nodeIds.length > 0 && (
                        <p className="text-xs text-muted-foreground">Nodes: {issue.nodeIds.length}</p>
                      )}
                    </div>
                    {issue.fixable && (
                      <Badge variant="outline" className="shrink-0 text-xs">
                        Fixable
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 50) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  return (
    <aside className={cn("h-full w-full border-l border-border bg-card md:w-96", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">Security Validation</h2>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="space-y-4 p-4">
          {/* Security Score Card */}
          <Card
            className={cn(
              "border-2",
              overallScore >= 80
                ? "border-green-500/20 bg-green-500/5"
                : overallScore >= 50
                  ? "border-yellow-500/20 bg-yellow-500/5"
                  : "border-red-500/20 bg-red-500/5",
            )}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Overall Security Score</CardTitle>
              <CardDescription>Based on validation checks and security analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <span className={cn("text-4xl font-bold", getScoreColor(overallScore))}>{overallScore}</span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
              <Progress
                value={overallScore}
                className={cn("h-2", getScoreGradient(overallScore))}
              />
            </CardContent>
          </Card>

          {/* Tabs for Errors/Warnings/Security */}
          <Tabs defaultValue="errors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="errors" className="gap-1">
                Errors
                {errors.length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {errors.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="warnings" className="gap-1">
                Warnings
                {warnings.length > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-1 h-5 w-5 rounded-full border-yellow-500/20 bg-yellow-500/10 p-0 text-xs text-yellow-600"
                  >
                    {warnings.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1">
                Security
                <Badge
                  variant="outline"
                  className="ml-1 h-5 w-5 rounded-full border-blue-500/20 bg-blue-500/10 p-0 text-xs text-blue-600"
                >
                  {securityChecks.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="errors" className="space-y-2">
              {errors.length === 0 ? (
                <Card className="border-green-500/20 bg-green-500/5 p-6 text-center">
                  <AlertCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                  <p className="font-semibold text-green-600">No Errors</p>
                  <p className="text-sm text-green-600/80">Your workflow has no critical errors</p>
                </Card>
              ) : (
                <Accordion type="multiple" defaultValue={["ssrf", "pii", "validation", "compliance"]}>
                  {Object.entries(groupedErrors).map(([category, issues]) =>
                    renderIssueGroup(category as keyof typeof CATEGORY_CONFIG, issues),
                  )}
                </Accordion>
              )}
            </TabsContent>

            <TabsContent value="warnings" className="space-y-2">
              {warnings.length === 0 ? (
                <Card className="border-green-500/20 bg-green-500/5 p-6 text-center">
                  <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                  <p className="font-semibold text-green-600">No Warnings</p>
                  <p className="text-sm text-green-600/80">Your workflow has no warnings</p>
                </Card>
              ) : (
                <Accordion type="multiple">
                  {Object.entries(groupedWarnings).map(([category, issues]) =>
                    renderIssueGroup(category as keyof typeof CATEGORY_CONFIG, issues),
                  )}
                </Accordion>
              )}
            </TabsContent>

            <TabsContent value="security" className="space-y-2">
              <div className="space-y-2">
                {securityChecks.map((check) => (
                  <Card
                    key={check.id}
                    className={cn(
                      "border",
                      check.passed ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5",
                    )}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
                            check.passed ? "bg-green-500" : "bg-red-500",
                          )}
                        >
                          {check.passed ? (
                            <CheckCircle className="h-3 w-3 text-white" />
                          ) : (
                            <X className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">{check.name}</p>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                check.impact === "high" && "border-red-500/20 text-red-600",
                                check.impact === "medium" && "border-yellow-500/20 text-yellow-600",
                                check.impact === "low" && "border-blue-500/20 text-blue-600",
                              )}
                            >
                              {check.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{check.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </aside>
  )
}
