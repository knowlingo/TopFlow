import { useHotkeys } from "react-hotkeys-hook"
import type { Node, Edge } from "@xyflow/react"

interface UseKeyboardShortcutsProps {
  nodes: Node[]
  edges: Edge[]
  reactFlowInstance: any
  onDelete?: () => void
  onDuplicate?: () => void
  onSelectAll?: () => void
  onSave?: () => void
  onRun?: () => void
  onExport?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onFitView?: () => void
}

export function useKeyboardShortcuts({
  nodes,
  edges,
  reactFlowInstance,
  onDelete,
  onDuplicate,
  onSelectAll,
  onSave,
  onRun,
  onExport,
  onUndo,
  onRedo,
  onFitView,
}: UseKeyboardShortcutsProps) {
  // Delete
  useHotkeys(
    ["delete", "backspace"],
    (e) => {
      e.preventDefault()
      onDelete?.()
    },
    {
      enableOnFormTags: false,
      enableOnContentEditable: false,
      preventDefault: true,
    },
    [onDelete],
  )

  // Duplicate
  useHotkeys(
    "mod+d",
    (e) => {
      e.preventDefault()
      onDuplicate?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onDuplicate],
  )

  // Select all
  useHotkeys(
    "mod+a",
    (e) => {
      e.preventDefault()
      onSelectAll?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onSelectAll],
  )

  // Save
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault()
      onSave?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onSave],
  )

  // Run
  useHotkeys(
    "mod+enter",
    (e) => {
      e.preventDefault()
      onRun?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onRun],
  )

  // Export
  useHotkeys(
    "mod+e",
    (e) => {
      e.preventDefault()
      onExport?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onExport],
  )

  // Undo
  useHotkeys(
    "mod+z",
    (e) => {
      e.preventDefault()
      onUndo?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onUndo],
  )

  // Redo
  useHotkeys(
    "mod+shift+z",
    (e) => {
      e.preventDefault()
      onRedo?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onRedo],
  )

  // Fit view
  useHotkeys(
    "mod+0",
    (e) => {
      e.preventDefault()
      onFitView?.()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [onFitView],
  )

  // Zoom in
  useHotkeys(
    "mod+plus",
    (e) => {
      e.preventDefault()
      reactFlowInstance?.zoomIn()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [reactFlowInstance],
  )

  // Zoom out
  useHotkeys(
    "mod+minus",
    (e) => {
      e.preventDefault()
      reactFlowInstance?.zoomOut()
    },
    {
      enableOnFormTags: false,
      preventDefault: true,
    },
    [reactFlowInstance],
  )
}
