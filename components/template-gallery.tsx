"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sparkles, Download, Clock, User, Tag, AlertCircle } from "lucide-react"
import { WorkflowStorage, type StoredWorkflow } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateGalleryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUseTemplate: (workflow: StoredWorkflow) => void
}

export function TemplateGallery({ open, onOpenChange, onUseTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const templates = useMemo(() => WorkflowStorage.getTemplates(), [open])
  const userWorkflows = useMemo(() => WorkflowStorage.getAllWorkflows(), [open])

  const categories = useMemo(() => {
    const cats = new Set(templates.map((t) => t.category))
    return ["all", ...Array.from(cats)]
  }, [templates])

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [templates, searchQuery, selectedCategory])

  const filteredWorkflows = useMemo(() => {
    return userWorkflows.filter((workflow) => {
      return (
        workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [userWorkflows, searchQuery])

  const handleUseTemplate = (template: StoredWorkflow) => {
    // Preserve original template ID for demo mode lookup
    const templateId = template.id.startsWith('template-') ? template.id : undefined

    // Create a new workflow from template with unique ID
    const newWorkflow: StoredWorkflow = {
      ...template,
      id: templateId || `workflow-${Date.now()}`,  // Keep template ID if it's a template
      name: templateId ? template.name : `${template.name} (Copy)`,  // Don't add (Copy) for templates
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: templateId ? template.author : "You",  // Keep original author for templates
      version: 1,
      isPublic: false,
    }
    onUseTemplate(newWorkflow)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Template Gallery
          </DialogTitle>
          <DialogDescription>Choose from pre-built templates or start from your saved workflows</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="templates" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
              <TabsTrigger value="templates">Templates ({filteredTemplates.length})</TabsTrigger>
              <TabsTrigger value="my-workflows">My Workflows ({filteredWorkflows.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="flex-1 flex flex-col gap-4 overflow-hidden mt-4">
              <div className="flex gap-2 flex-wrap flex-shrink-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto -mx-1 px-1">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 pr-4 pb-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex flex-col"
                    >
                      <CardHeader className="pb-3">
                        {template.id === "template-gdpr-access-request" && (
                          <Badge
                            variant="outline"
                            className="mb-2 w-fit bg-amber-500/10 text-amber-700 border-amber-500/40 flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Demo Mode - Mock Data
                          </Badge>
                        )}
                        <CardTitle className="text-base font-semibold leading-tight">{template.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-[2.5rem]">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col gap-4 pt-0">
                        <div className="flex flex-wrap gap-1.5 min-h-[1.75rem]">
                          {template.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          <span className="font-medium">{template.author}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span>{template.nodes.length} nodes</span>
                        </div>

                        <Button onClick={() => handleUseTemplate(template)} className="w-full mt-auto" size="default">
                          <Download className="mr-2 h-4 w-4" />
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-lg font-medium">No templates found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="my-workflows" className="flex-1 flex flex-col overflow-hidden mt-4">
              <div className="flex-1 overflow-y-auto -mx-1 px-1">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 pr-4 pb-4">
                  {filteredWorkflows.map((workflow) => (
                    <Card
                      key={workflow.id}
                      className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex flex-col"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold leading-tight">{workflow.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-[2.5rem]">
                          {workflow.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col gap-4 pt-0">
                        <div className="flex flex-wrap gap-1.5 min-h-[1.75rem]">
                          {workflow.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                          {workflow.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              +{workflow.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-medium">{new Date(workflow.updatedAt).toLocaleDateString()}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span>v{workflow.version}</span>
                        </div>

                        <Button onClick={() => handleUseTemplate(workflow)} className="w-full mt-auto" size="default">
                          <Download className="mr-2 h-4 w-4" />
                          Load Workflow
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredWorkflows.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-lg font-medium">No saved workflows yet</p>
                    <p className="text-sm text-muted-foreground">Your saved workflows will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
