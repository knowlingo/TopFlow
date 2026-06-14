/**
 * Pre-execution workflow-graph safety checks.
 *
 * Cycle detection runs server-side BEFORE a workflow executes and fails closed:
 * a cyclic graph could otherwise drive an infinite loop (browser hang, runaway
 * API-credit burn). This is independent of any validation in the workflow engine
 * package — defense in depth.
 */

export interface GraphNode {
  id: string
}
export interface GraphEdge {
  source: string
  target: string
}

export interface CycleResult {
  hasCycle: boolean
  /** The node ids forming the detected cycle (first repeated id appears at both ends). */
  cycle?: string[]
}

/**
 * Detect a directed cycle via DFS coloring (white/gray/black). Returns the cycle
 * path when found so callers can produce an actionable error message.
 */
export function detectWorkflowCycle(nodes: GraphNode[], edges: GraphEdge[]): CycleResult {
  const adjacency = new Map<string, string[]>()
  for (const node of nodes) adjacency.set(node.id, [])
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, [])
    adjacency.get(edge.source)!.push(edge.target)
  }

  const WHITE = 0
  const GRAY = 1
  const BLACK = 2
  const color = new Map<string, number>()
  for (const id of adjacency.keys()) color.set(id, WHITE)

  const stack: string[] = []

  const visit = (nodeId: string): string[] | null => {
    color.set(nodeId, GRAY)
    stack.push(nodeId)

    for (const next of adjacency.get(nodeId) || []) {
      const c = color.get(next) ?? WHITE
      if (c === GRAY) {
        // Back-edge → cycle. Slice the current path from the repeated node.
        const start = stack.indexOf(next)
        return stack.slice(start).concat(next)
      }
      if (c === WHITE) {
        const found = visit(next)
        if (found) return found
      }
    }

    color.set(nodeId, BLACK)
    stack.pop()
    return null
  }

  for (const id of adjacency.keys()) {
    if ((color.get(id) ?? WHITE) === WHITE) {
      const found = visit(id)
      if (found) return { hasCycle: true, cycle: found }
    }
  }

  return { hasCycle: false }
}
