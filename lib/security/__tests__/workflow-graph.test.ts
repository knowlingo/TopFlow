import { detectWorkflowCycle } from "../workflow-graph"

const N = (...ids: string[]) => ids.map((id) => ({ id }))
const E = (...pairs: Array<[string, string]>) => pairs.map(([source, target]) => ({ source, target }))

describe("detectWorkflowCycle", () => {
  test("acyclic DAG → no cycle", () => {
    const r = detectWorkflowCycle(N("a", "b", "c", "d"), E(["a", "b"], ["b", "c"], ["b", "d"], ["c", "d"]))
    expect(r.hasCycle).toBe(false)
    expect(r.cycle).toBeUndefined()
  })

  test("simple cycle a→b→c→a", () => {
    const r = detectWorkflowCycle(N("a", "b", "c"), E(["a", "b"], ["b", "c"], ["c", "a"]))
    expect(r.hasCycle).toBe(true)
    expect(r.cycle).toContain("a")
    expect(r.cycle).toContain("b")
    expect(r.cycle).toContain("c")
  })

  test("self-loop is a cycle", () => {
    expect(detectWorkflowCycle(N("a"), E(["a", "a"])).hasCycle).toBe(true)
  })

  test("empty graph → no cycle", () => {
    expect(detectWorkflowCycle([], []).hasCycle).toBe(false)
  })

  test("cycle in one disconnected component is detected", () => {
    const r = detectWorkflowCycle(N("a", "b", "x", "y"), E(["a", "b"], ["x", "y"], ["y", "x"]))
    expect(r.hasCycle).toBe(true)
  })

  test("a long DAG (scanner-shaped) is fine", () => {
    const r = detectWorkflowCycle(
      N("start", "p", "m", "s", "score", "grade", "rep", "ai", "ext", "img", "end"),
      E(
        ["start", "p"], ["p", "m"], ["p", "s"], ["m", "score"], ["s", "score"],
        ["score", "grade"], ["grade", "rep"], ["rep", "ai"], ["ai", "ext"], ["ext", "img"], ["img", "end"],
      ),
    )
    expect(r.hasCycle).toBe(false)
  })
})
