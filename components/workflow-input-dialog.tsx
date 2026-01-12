"use client"

import { useState } from "react"
import type { Node } from "@xyflow/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import type { StartNodeData } from "@/components/nodes/start-node"

type WorkflowInputDialogProps = {
  open: boolean
  startNodes: Node<StartNodeData>[]
  onSubmit: (inputs: Record<string, string>) => void
  onCancel: () => void
}

export function WorkflowInputDialog({ open, startNodes, onSubmit, onCancel }: WorkflowInputDialogProps) {
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const initialInputs: Record<string, string> = {}
    startNodes.forEach((node) => {
      initialInputs[node.id] = node.data.defaultValue || ""
    })
    return initialInputs
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInput = (nodeId: string, value: string, inputType: string): string | null => {
    if (!value.trim()) {
      return "This field is required"
    }

    switch (inputType) {
      case "url":
        try {
          new URL(value)
          return null
        } catch {
          return "Please enter a valid URL"
        }
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? null : "Please enter a valid email address"
      case "number":
        return isNaN(Number(value)) ? "Please enter a valid number" : null
      default:
        return null
    }
  }

  const handleInputChange = (nodeId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [nodeId]: value }))
    // Clear error when user starts typing
    if (errors[nodeId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[nodeId]
        return newErrors
      })
    }
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    // Validate all inputs
    startNodes.forEach((node) => {
      const value = inputs[node.id] || ""
      const inputType = node.data.inputType || "text"
      const error = validateInput(node.id, value, inputType)
      if (error) {
        newErrors[node.id] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(inputs)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Workflow Input Required</DialogTitle>
          <DialogDescription>
            This workflow requires input before execution. Please provide the following information:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {startNodes.map((node) => {
            const label = node.data.label || "Input"
            const placeholder = node.data.placeholder || ""
            const inputType = node.data.inputType || "text"
            const error = errors[node.id]

            return (
              <div key={node.id} className="space-y-2">
                <Label htmlFor={`input-${node.id}`}>
                  {label}
                  <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                  id={`input-${node.id}`}
                  type={inputType === "number" ? "number" : "text"}
                  value={inputs[node.id] || ""}
                  onChange={(e) => handleInputChange(node.id, e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className={error ? "border-red-500" : ""}
                />
                {error && (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Start Workflow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
