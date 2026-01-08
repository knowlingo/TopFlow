"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Save, Folder, Tag, Globe, Lock } from "lucide-react"
import { WorkflowStorage, type StoredWorkflow } from "@/lib/storage"
import type { Node, Edge } from "@xyflow/react"

interface WorkflowManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nodes: Node[]
  edges: Edge[]
  currentWorkflow: StoredWorkflow | null
  onWorkflowSaved: (workflow: StoredWorkflow) => void
}

const CATEGORIES = ["Examples", "Chatbots", "Data Processing", "Content Generation", "API Integration", "Other"]

export function WorkflowManager({
  open,
  onOpenChange,
  nodes,
  edges,
  currentWorkflow,
  onWorkflowSaved,
}: WorkflowManagerProps) {
  const [name, setName] = useState(currentWorkflow?.name || "My Workflow")
  const [description, setDescription] = useState(currentWorkflow?.description || "")
  const [category, setCategory] = useState(currentWorkflow?.category || "Other")
  const [tags, setTags] = useState<string[]>(currentWorkflow?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [isPublic, setIsPublic] = useState(currentWorkflow?.isPublic || false)

  const handleSave = () => {
    const workflow: StoredWorkflow = {
      id: currentWorkflow?.id || `workflow-${Date.now()}`,
      name,
      description,
      version: (currentWorkflow?.version || 0) + 1,
      createdAt: currentWorkflow?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: "You",
      isPublic,
      tags,
      category,
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    }

    WorkflowStorage.saveWorkflow(workflow)
    onWorkflowSaved(workflow)
    onOpenChange(false)
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Save className="h-5 w-5" />
            Save Workflow
          </DialogTitle>
          <DialogDescription>Save your workflow to access it later or share it with others</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input
              id="workflow-name"
              placeholder="My Amazing Workflow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
              placeholder="Describe what your workflow does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                >
                  <Folder className="mr-2 h-3 w-3" />
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="workflow-tags"
                placeholder="Add tags (e.g., chatbot, api, ml)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag}
                    <span className="ml-1 text-xs">×</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                <Label htmlFor="public-workflow">Public Workflow</Label>
              </div>
              <p className="text-sm text-muted-foreground">Make this workflow available in the template gallery</p>
            </div>
            <Switch id="public-workflow" checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            <Save className="mr-2 h-4 w-4" />
            Save Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
