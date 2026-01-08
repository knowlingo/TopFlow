"use client"

import { useMemo } from "react"
import { validateWorkflow, validateApiKeys, type ValidationResult } from "@/lib/security/validation-engine"

export function useWorkflowValidation(nodes: any[], edges: any[], apiKeys: Record<string, string>): ValidationResult {
  return useMemo(() => {
    const workflowValidation = validateWorkflow(nodes, edges)
    const apiKeyIssues = validateApiKeys(apiKeys, nodes)

    return {
      ...workflowValidation,
      errors: [...workflowValidation.errors, ...apiKeyIssues.filter((i) => i.severity === "error")],
      warnings: [...workflowValidation.warnings, ...apiKeyIssues.filter((i) => i.severity === "warning")],
    }
  }, [nodes, edges, apiKeys])
}
