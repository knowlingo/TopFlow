/**
 * Demo Data System - Main Entry Point
 *
 * Provides demo/mock execution results for workflows to enable
 * zero-friction user testing without requiring API keys.
 *
 * Two-tier architecture:
 * 1. Workflow-specific demos (pre-generated, high-quality results)
 * 2. Node-type fallbacks (generated on-demand for any node)
 */

export * from "./types"
export * from "./node-mocks"
export * from "./default-workflow"
export * from "./ot-workflow"

import type { DemoResult, NodeResult } from "./types"
import { getDefaultWorkflowDemo } from "./default-workflow"
import { getMockNodeOutput, getSimulatedDuration } from "./node-mocks"
import { OT_WORKFLOW_DEMO } from "./ot-workflow"

// Import existing security template demos
import { DEMO_RESULTS } from "../demo-results"

/**
 * Complete registry of all available demo workflows
 */
const DEMO_WORKFLOW_REGISTRY: Record<string, () => DemoResult> = {
  // Default threat intelligence workflow (new default)
  "template-threat-intel": getDefaultWorkflowDemo,

  // Legacy: Original content generator workflow (for backwards compatibility)
  "template-content-generator": getDefaultWorkflowDemo,

  // OT Critical Infrastructure workflow
  "template-ot-critical-infra": () => OT_WORKFLOW_DEMO,

  // Existing security templates (from /lib/demo-results.ts)
  "template-gdpr-data-access": () =>
    DEMO_RESULTS.find((d) => d.templateId === "template-gdpr-data-access")!,
  "template-pii-detection": () =>
    DEMO_RESULTS.find((d) => d.templateId === "template-pii-detection")!,
  "template-security-incident": () =>
    DEMO_RESULTS.find((d) => d.templateId === "template-security-incident")!,
  "template-soc2-evidence": () =>
    DEMO_RESULTS.find((d) => d.templateId === "template-soc2-evidence")!,
}

/**
 * Check if demo data exists for a workflow/template
 */
export function hasDemoData(workflowId?: string): boolean {
  if (!workflowId) return false
  return workflowId in DEMO_WORKFLOW_REGISTRY
}

/**
 * Get complete workflow demo result
 * Returns pre-generated, high-quality demo data for known workflows
 */
export function getDemoWorkflowResult(
  workflowId?: string
): DemoResult | undefined {
  if (!workflowId) return undefined

  const generator = DEMO_WORKFLOW_REGISTRY[workflowId]
  if (!generator) return undefined

  return generator()
}

/**
 * Get demo result for a specific node within a workflow
 * First tries workflow-specific data, falls back to node-type generator
 */
export function getDemoNodeResult(
  workflowId: string | undefined,
  nodeId: string,
  nodeType: string,
  nodeData: any,
  inputs: Record<string, any> = {}
): any {
  // Try to get from workflow-specific demo first
  if (workflowId) {
    const workflowDemo = getDemoWorkflowResult(workflowId)
    if (workflowDemo?.nodeResults[nodeId]) {
      return workflowDemo.nodeResults[nodeId].output
    }
  }

  // Fallback to node-type generator
  return getMockNodeOutput(nodeType, nodeData, inputs)
}

/**
 * Get all node IDs that have demo data for a workflow
 */
export function getDemoNodeIds(workflowId?: string): string[] {
  if (!workflowId) return []

  const demo = getDemoWorkflowResult(workflowId)
  return demo ? Object.keys(demo.nodeResults) : []
}

/**
 * Get metadata about a demo workflow
 */
export function getDemoMetadata(workflowId?: string) {
  if (!workflowId) return undefined

  const demo = getDemoWorkflowResult(workflowId)
  return demo?.metadata
}

/**
 * Export simulated duration function for use in execution API
 */
export { getSimulatedDuration } from "./node-mocks"

/**
 * Get list of all workflows with demo data available
 */
export function getAvailableDemoWorkflows(): string[] {
  return Object.keys(DEMO_WORKFLOW_REGISTRY)
}

/**
 * Statistics about demo data coverage
 */
export function getDemoStats() {
  const workflows = getAvailableDemoWorkflows()
  const totalNodes = workflows.reduce((sum, id) => {
    const demo = getDemoWorkflowResult(id)
    return sum + (demo ? Object.keys(demo.nodeResults).length : 0)
  }, 0)

  return {
    totalWorkflows: workflows.length,
    totalNodes,
    workflows: workflows.map((id) => {
      const demo = getDemoWorkflowResult(id)
      return {
        id,
        name: demo?.workflowName,
        nodeCount: demo ? Object.keys(demo.nodeResults).length : 0,
        executionTime: demo?.executionTime,
      }
    }),
  }
}
