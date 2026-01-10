import { useWorkflowStore } from '../workflow-store'
import type { Node, Edge } from '@xyflow/react'

describe('useWorkflowStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useWorkflowStore.setState({
      nodes: [],
      edges: [],
      history: [],
      currentIndex: -1,
      lastSaveTimestamp: null,
      saveStatus: 'idle',
    })
  })

  describe('initial state', () => {
    it('should have empty nodes and edges', () => {
      const state = useWorkflowStore.getState()
      expect(state.nodes).toEqual([])
      expect(state.edges).toEqual([])
    })

    it('should have empty history', () => {
      const state = useWorkflowStore.getState()
      expect(state.history).toEqual([])
      expect(state.currentIndex).toBe(-1)
    })

    it('should have idle save status', () => {
      const state = useWorkflowStore.getState()
      expect(state.saveStatus).toBe('idle')
      expect(state.lastSaveTimestamp).toBeNull()
    })
  })

  describe('setNodes', () => {
    it('should update nodes', () => {
      const testNodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().setNodes(testNodes)

      const state = useWorkflowStore.getState()
      expect(state.nodes).toEqual(testNodes)
    })

    it('should replace existing nodes', () => {
      const initialNodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const newNodes: Node[] = [
        { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().setNodes(initialNodes)
      useWorkflowStore.getState().setNodes(newNodes)

      const state = useWorkflowStore.getState()
      expect(state.nodes).toEqual(newNodes)
    })
  })

  describe('setEdges', () => {
    it('should update edges', () => {
      const testEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

      useWorkflowStore.getState().setEdges(testEdges)

      const state = useWorkflowStore.getState()
      expect(state.edges).toEqual(testEdges)
    })
  })

  describe('updateWorkflow', () => {
    const testNodes: Node[] = [
      { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
    ]
    const testEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

    it('should add entry to history', () => {
      useWorkflowStore.getState().updateWorkflow(testNodes, testEdges, 'Add node')

      const state = useWorkflowStore.getState()
      expect(state.history).toHaveLength(1)
      expect(state.history[0].action).toBe('Add node')
      expect(state.history[0].nodes).toEqual(testNodes)
      expect(state.history[0].edges).toEqual(testEdges)
    })

    it('should update currentIndex', () => {
      useWorkflowStore.getState().updateWorkflow(testNodes, testEdges, 'Action 1')

      const state = useWorkflowStore.getState()
      expect(state.currentIndex).toBe(0)
    })

    it('should create deep copies of nodes and edges', () => {
      useWorkflowStore.getState().updateWorkflow(testNodes, testEdges, 'Add node')

      const state = useWorkflowStore.getState()

      // Modify original arrays
      testNodes[0].position.x = 999

      // History should not be affected (deep copy)
      expect(state.history[0].nodes[0].position.x).toBe(0)
    })

    it('should remove future history when making changes after undo', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '1', type: 'start', position: { x: 100, y: 0 }, data: {} },
      ]
      const nodes3: Node[] = [
        { id: '1', type: 'start', position: { x: 200, y: 0 }, data: {} },
      ]

      // Create three history entries
      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')
      useWorkflowStore.getState().updateWorkflow(nodes3, [], 'Action 3')

      expect(useWorkflowStore.getState().history).toHaveLength(3)

      // Undo twice
      useWorkflowStore.getState().undo()
      useWorkflowStore.getState().undo()

      expect(useWorkflowStore.getState().currentIndex).toBe(0)

      // Make a new change - should remove future history
      const newNodes: Node[] = [
        { id: '1', type: 'start', position: { x: 300, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(newNodes, [], 'New Action')

      const state = useWorkflowStore.getState()
      expect(state.history).toHaveLength(2) // Action 1 + New Action
      expect(state.history[1].action).toBe('New Action')
    })

    it('should limit history to MAX_HISTORY entries (50)', () => {
      // Add 55 entries
      for (let i = 0; i < 55; i++) {
        const nodes: Node[] = [
          { id: '1', type: 'start', position: { x: i, y: 0 }, data: {} },
        ]
        useWorkflowStore.getState().updateWorkflow(nodes, [], `Action ${i}`)
      }

      const state = useWorkflowStore.getState()
      expect(state.history).toHaveLength(50)

      // Should keep the latest 50
      expect(state.history[0].action).toBe('Action 5') // First 5 removed
      expect(state.history[49].action).toBe('Action 54')
    })

    it('should set saveStatus to idle when updating', () => {
      useWorkflowStore.setState({ saveStatus: 'saved' })

      useWorkflowStore.getState().updateWorkflow(testNodes, testEdges, 'Change')

      expect(useWorkflowStore.getState().saveStatus).toBe('idle')
    })
  })

  describe('undo', () => {
    it('should go back in history', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '1', type: 'start', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')

      const result = useWorkflowStore.getState().undo()

      expect(result).toBe(true)
      const state = useWorkflowStore.getState()
      expect(state.currentIndex).toBe(0)
      expect(state.nodes[0].position.x).toBe(0)
    })

    it('should return false when cannot undo', () => {
      const result = useWorkflowStore.getState().undo()
      expect(result).toBe(false)
    })

    it('should return false at the beginning of history', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action')

      const result = useWorkflowStore.getState().undo()
      expect(result).toBe(false) // Already at index 0
    })

    it('should restore both nodes and edges', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const edges1: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

      const nodes2: Node[] = [
        { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
      ]
      const edges2: Edge[] = [{ id: 'e2-3', source: '2', target: '3' }]

      useWorkflowStore.getState().updateWorkflow(nodes1, edges1, 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, edges2, 'Action 2')

      useWorkflowStore.getState().undo()

      const state = useWorkflowStore.getState()
      expect(state.nodes).toEqual(nodes1)
      expect(state.edges).toEqual(edges1)
    })
  })

  describe('redo', () => {
    it('should go forward in history', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '1', type: 'start', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')
      useWorkflowStore.getState().undo()

      const result = useWorkflowStore.getState().redo()

      expect(result).toBe(true)
      const state = useWorkflowStore.getState()
      expect(state.currentIndex).toBe(1)
      expect(state.nodes[0].position.x).toBe(100)
    })

    it('should return false when cannot redo', () => {
      const result = useWorkflowStore.getState().redo()
      expect(result).toBe(false)
    })

    it('should return false at the end of history', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action')

      const result = useWorkflowStore.getState().redo()
      expect(result).toBe(false) // Already at latest
    })
  })

  describe('canUndo', () => {
    it('should return false when no history', () => {
      expect(useWorkflowStore.getState().canUndo()).toBe(false)
    })

    it('should return false at beginning of history', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action')

      expect(useWorkflowStore.getState().canUndo()).toBe(false)
    })

    it('should return true when can undo', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')

      expect(useWorkflowStore.getState().canUndo()).toBe(true)
    })
  })

  describe('canRedo', () => {
    it('should return false when no history', () => {
      expect(useWorkflowStore.getState().canRedo()).toBe(false)
    })

    it('should return false at end of history', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action')

      expect(useWorkflowStore.getState().canRedo()).toBe(false)
    })

    it('should return true after undo', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')
      useWorkflowStore.getState().undo()

      expect(useWorkflowStore.getState().canRedo()).toBe(true)
    })
  })

  describe('getHistory', () => {
    it('should return empty history initially', () => {
      expect(useWorkflowStore.getState().getHistory()).toEqual([])
    })

    it('should return all history entries', () => {
      const nodes1: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const nodes2: Node[] = [
        { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
      ]

      useWorkflowStore.getState().updateWorkflow(nodes1, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes2, [], 'Action 2')

      const history = useWorkflowStore.getState().getHistory()
      expect(history).toHaveLength(2)
      expect(history[0].action).toBe('Action 1')
      expect(history[1].action).toBe('Action 2')
    })
  })

  describe('setSaveStatus', () => {
    it('should update save status', () => {
      useWorkflowStore.getState().setSaveStatus('saving')
      expect(useWorkflowStore.getState().saveStatus).toBe('saving')

      useWorkflowStore.getState().setSaveStatus('saved')
      expect(useWorkflowStore.getState().saveStatus).toBe('saved')

      useWorkflowStore.getState().setSaveStatus('error')
      expect(useWorkflowStore.getState().saveStatus).toBe('error')
    })
  })

  describe('setLastSaveTimestamp', () => {
    it('should update last save timestamp', () => {
      const timestamp = Date.now()
      useWorkflowStore.getState().setLastSaveTimestamp(timestamp)

      expect(useWorkflowStore.getState().lastSaveTimestamp).toBe(timestamp)
    })

    it('should update timestamp from null', () => {
      expect(useWorkflowStore.getState().lastSaveTimestamp).toBeNull()

      const timestamp = Date.now()
      useWorkflowStore.getState().setLastSaveTimestamp(timestamp)

      expect(useWorkflowStore.getState().lastSaveTimestamp).toBe(timestamp)
    })
  })

  describe('clearHistory', () => {
    it('should clear all history', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action 1')
      useWorkflowStore.getState().updateWorkflow(nodes, [], 'Action 2')

      expect(useWorkflowStore.getState().history).toHaveLength(2)

      useWorkflowStore.getState().clearHistory()

      const state = useWorkflowStore.getState()
      expect(state.history).toEqual([])
      expect(state.currentIndex).toBe(-1)
    })

    it('should not affect nodes and edges', () => {
      const nodes: Node[] = [
        { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      ]
      const edges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

      useWorkflowStore.getState().setNodes(nodes)
      useWorkflowStore.getState().setEdges(edges)
      useWorkflowStore.getState().updateWorkflow(nodes, edges, 'Action')

      useWorkflowStore.getState().clearHistory()

      const state = useWorkflowStore.getState()
      expect(state.nodes).toEqual(nodes)
      expect(state.edges).toEqual(edges)
    })
  })
})
