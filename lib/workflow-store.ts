import { create } from "zustand"
import type { Node, Edge } from "@xyflow/react"

interface HistoryEntry {
  nodes: Node[]
  edges: Edge[]
  timestamp: number
  action: string
}

interface WorkflowState {
  nodes: Node[]
  edges: Edge[]
  history: HistoryEntry[]
  currentIndex: number
  lastSaveTimestamp: number | null
  saveStatus: "idle" | "saving" | "saved" | "error"

  // Actions
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  updateWorkflow: (nodes: Node[], edges: Edge[], action: string) => void
  undo: () => boolean
  redo: () => boolean
  canUndo: () => boolean
  canRedo: () => boolean
  getHistory: () => HistoryEntry[]
  setSaveStatus: (status: "idle" | "saving" | "saved" | "error") => void
  setLastSaveTimestamp: (timestamp: number) => void
  clearHistory: () => void
}

const MAX_HISTORY = 50

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  currentIndex: -1,
  lastSaveTimestamp: null,
  saveStatus: "idle",

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  updateWorkflow: (nodes, edges, action) => {
    const state = get()
    const entry: HistoryEntry = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
      timestamp: Date.now(),
      action,
    }

    // Remove any history after current index (when undoing and making new changes)
    const newHistory = state.history.slice(0, state.currentIndex + 1)
    newHistory.push(entry)

    // Limit history size
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift()
    }

    set({
      nodes,
      edges,
      history: newHistory,
      currentIndex: newHistory.length - 1,
      saveStatus: "idle", // Mark as unsaved
    })
  },

  undo: () => {
    const state = get()
    if (!state.canUndo()) return false

    const newIndex = state.currentIndex - 1
    const entry = state.history[newIndex]

    if (entry) {
      set({
        nodes: JSON.parse(JSON.stringify(entry.nodes)),
        edges: JSON.parse(JSON.stringify(entry.edges)),
        currentIndex: newIndex,
      })
      return true
    }
    return false
  },

  redo: () => {
    const state = get()
    if (!state.canRedo()) return false

    const newIndex = state.currentIndex + 1
    const entry = state.history[newIndex]

    if (entry) {
      set({
        nodes: JSON.parse(JSON.stringify(entry.nodes)),
        edges: JSON.parse(JSON.stringify(entry.edges)),
        currentIndex: newIndex,
      })
      return true
    }
    return false
  },

  canUndo: () => {
    const state = get()
    return state.currentIndex > 0
  },

  canRedo: () => {
    const state = get()
    return state.currentIndex < state.history.length - 1
  },

  getHistory: () => get().history,

  setSaveStatus: (status) => set({ saveStatus: status }),

  setLastSaveTimestamp: (timestamp) => set({ lastSaveTimestamp: timestamp }),

  clearHistory: () => set({ history: [], currentIndex: -1 }),
}))
