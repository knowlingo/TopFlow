"use client"

import { useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Clock, GitBranch, Download, User, Trash2 } from "lucide-react"
import { WorkflowStorage, type WorkflowVersion } from "@/lib/storage"
import { Card, CardContent } from "@/components/ui/card"

interface VersionHistoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workflowId: string | null
  onRestoreVersion: (nodes: any[], edges: any[]) => void
}

export function VersionHistory({ open, onOpenChange, workflowId, onRestoreVersion }: VersionHistoryProps) {
  const versions = useMemo(() => {
    if (!workflowId) return []
    return WorkflowStorage.getWorkflowVersions(workflowId)
  }, [workflowId, open])

  const handleRestore = (version: WorkflowVersion) => {
    onRestoreVersion(version.nodes, version.edges)
    onOpenChange(false)
  }

  const handleDelete = (versionId: string) => {
    if (confirm("Are you sure you want to delete this version?")) {
      WorkflowStorage.deleteVersion(versionId)
      onOpenChange(false)
      // Reopen to refresh
      setTimeout(() => onOpenChange(true), 100)
    }
  }

  const handleCreateSnapshot = () => {
    if (!workflowId) return

    const workflow = WorkflowStorage.getWorkflow(workflowId)
    if (!workflow) return

    const message = prompt("Enter a description for this snapshot:")
    if (!message) return

    const version: WorkflowVersion = {
      id: `version-${Date.now()}`,
      workflowId,
      version: versions.length + 1,
      nodes: workflow.nodes,
      edges: workflow.edges,
      createdAt: new Date().toISOString(),
      author: "You",
      message,
    }

    WorkflowStorage.saveVersion(version)
    onOpenChange(false)
    setTimeout(() => onOpenChange(true), 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <GitBranch className="h-5 w-5" />
            Version History
          </DialogTitle>
          <DialogDescription>View and restore previous versions of your workflow</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button onClick={handleCreateSnapshot} className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Create Snapshot
          </Button>

          <ScrollArea className="h-[60vh]">
            {versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No version history yet</p>
                <p className="text-sm text-muted-foreground">Create snapshots to track changes over time</p>
              </div>
            ) : (
              <div className="space-y-3">
                {versions.map((version, index) => (
                  <Card key={version.id} className={index === 0 ? "border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>v{version.version}</Badge>
                            {index === 0 && (
                              <Badge variant="outline" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm font-medium">{version.message}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{version.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(version.createdAt).toLocaleString()}</span>
                            </div>
                            <span>{version.nodes.length} nodes</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestore(version)}
                            disabled={index === 0}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Restore
                          </Button>
                          {index !== 0 && (
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(version.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
