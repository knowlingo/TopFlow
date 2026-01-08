"use client"

import { useEffect, useRef } from "react"
import { useWorkflowStore } from "@/lib/workflow-store"
import type { Node, Edge } from "@xyflow/react"

const AUTO_SAVE_INTERVAL = 30000 // 30 seconds
const STORAGE_KEY = "ai-agent-builder-workflow"
const STORAGE_KEY_PREFIX = "ai-agent-builder-autosave-"

export function useAutoSave(nodes: Node[], edges: Edge[]) {
  const { setSaveStatus, setLastSaveTimestamp } = useWorkflowStore()
  const lastSaveRef = useRef<string>("")
  const timeoutRef = useRef<NodeJS.Timeout>()

  const saveWorkflow = (isAutoSave = false) => {
    const workflow = { nodes, edges }
    const workflowString = JSON.stringify(workflow)

    // Don't save if nothing changed
    if (workflowString === lastSaveRef.current) {
      return
    }

    try {
      setSaveStatus("saving")

      // Save main workflow
      localStorage.setItem(STORAGE_KEY, workflowString)

      // Save auto-save version with timestamp
      if (isAutoSave) {
        const timestamp = Date.now()
        const autoSaveKey = `${STORAGE_KEY_PREFIX}${timestamp}`
        localStorage.setItem(autoSaveKey, workflowString)

        // Clean up old auto-saves (keep last 5)
        cleanupOldAutoSaves()
      }

      lastSaveRef.current = workflowString
      setSaveStatus("saved")
      setLastSaveTimestamp(Date.now())
    } catch (error) {
      console.error("Failed to save workflow:", error)
      setSaveStatus("error")
    }
  }

  const cleanupOldAutoSaves = () => {
    try {
      const autoSaveKeys = Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_KEY_PREFIX))
        .sort()
        .reverse()

      // Keep last 5, delete the rest
      autoSaveKeys.slice(5).forEach((key) => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error("Failed to cleanup auto-saves:", error)
    }
  }

  // Auto-save on interval
  useEffect(() => {
    const interval = setInterval(() => {
      saveWorkflow(true)
    }, AUTO_SAVE_INTERVAL)

    return () => clearInterval(interval)
  }, [nodes, edges])

  // Debounced save on changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      saveWorkflow(true)
    }, 2000) // Wait 2s after last change

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [nodes, edges])

  return { saveWorkflow }
}
