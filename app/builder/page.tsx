"use client"

import React from "react"

import type { ReactElement } from "react"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeTypes,
  type ReactFlowInstance,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Button } from "@/components/ui/button"
import {
  Play,
  Code2,
  Sparkles,
  Download,
  Upload,
  Menu,
  X,
  Key,
  ShieldCheck,
  Save,
  FolderOpen,
  History,
  Home,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import TextModelNode from "@/components/nodes/text-model-node"
import EmbeddingModelNode from "@/components/nodes/embedding-model-node"
import ToolNode from "@/components/nodes/tool-node"
import StructuredOutputNode from "@/components/nodes/structured-output-node"
import PromptNode from "@/components/nodes/prompt-node"
import ImageGenerationNode from "@/components/nodes/image-generation-node"
import AudioNode from "@/components/nodes/audio-node"
import JavaScriptNode from "@/components/nodes/javascript-node"
import StartNode from "@/components/nodes/start-node"
import EndNode from "@/components/nodes/end-node"
import ConditionalNode from "@/components/nodes/conditional-node"
import HttpRequestNode from "@/components/nodes/http-request-node"

import { NodePalette } from "@/components/node-palette"
import { NodeConfigPanel } from "@/components/node-config-panel"
import { CodeExportDialog } from "@/components/code-export-dialog"
import { ExecutionPanel } from "@/components/execution-panel"
import { ApiSettingsDialog } from "@/components/api-settings-dialog"
import { ValidationPanel } from "@/components/validation-panel"
import { TemplateGallery } from "@/components/template-gallery"
import { WorkflowManager } from "@/components/workflow-manager"
import { VersionHistory } from "@/components/version-history"
import { GitHubScannerResultsDialog } from "@/components/github-scanner-results-dialog"
import { Badge } from "@/components/ui/badge"
import { validateWorkflow, validateApiKeys } from "@charliesu/workflow-core"
import { WorkflowStorage, type StoredWorkflow } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { GITHUB_SCANNER_NODES, GITHUB_SCANNER_EDGES } from "@/lib/templates/github-scanner"

const STORAGE_KEY = "ai-agent-builder-workflow"

const nodeTypes: NodeTypes = {
  textModel: TextModelNode,
  embeddingModel: EmbeddingModelNode,
  tool: ToolNode,
  structuredOutput: StructuredOutputNode,
  prompt: PromptNode,
  imageGeneration: ImageGenerationNode,
  audio: AudioNode,
  javascript: JavaScriptNode,
  start: StartNode,
  end: EndNode,
  conditional: ConditionalNode,
  httpRequest: HttpRequestNode,
}

// GitHub Security Scanner - Default Workflow (MVP Launch)
const initialNodes: Node[] = GITHUB_SCANNER_NODES

const initialEdges: Edge[] = GITHUB_SCANNER_EDGES

const getDefaultNodeData = (type: string) => {
  switch (type) {
    case "textModel":
      return { model: "openai/gpt-4o", temperature: 0.7, maxTokens: 2000 }
    case "embeddingModel":
      return { model: "openai/text-embedding-3-small", dimensions: 1536 }
    case "tool":
      return { name: "customTool", description: "A custom tool" }
    case "structuredOutput":
      return { schemaName: "Schema", mode: "object" }
    case "prompt":
      return { content: "Enter your prompt..." }
    case "imageGeneration":
      return { model: "gemini-2.5-flash-image", aspectRatio: "1:1", outputFormat: "png" }
    case "audio":
      return { model: "openai/tts-1", voice: "alloy", speed: 1.0 }
    case "javascript":
      return { code: "// Access inputs as input1, input2, etc.\nreturn input1.toUpperCase()" }
    case "start":
      return {}
    case "end":
      return {}
    case "conditional":
      return { condition: "input1 === 'value'" }
    case "httpRequest":
      return { url: "https://api.example.com", method: "GET" }
    default:
      return {}
  }
}

export default function AgentBuilder(): ReactElement {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [showCodeExport, setShowCodeExport] = useState(false)
  const [showExecution, setShowExecution] = useState(false)
  const [showApiSettings, setShowApiSettings] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [showWorkflowManager, setShowWorkflowManager] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [currentWorkflow, setCurrentWorkflow] = useState<StoredWorkflow | null>(null)
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({})
  const [lastExecutionResults, setLastExecutionResults] = useState<Record<string, any> | null>(null)
  const [showResultsDialog, setShowResultsDialog] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const nodeIdCounter = useRef(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ai-agent-api-keys")
      if (stored) {
        try {
          setApiKeys(JSON.parse(stored))
        } catch (e) {
          console.error("Failed to parse API keys", e)
        }
      }
    }
  }, [showApiSettings])

  useEffect(() => {
    const saved = localStorage.getItem("palette-collapsed")
    if (saved !== null) {
      setIsPaletteCollapsed(saved === "true")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("palette-collapsed", isPaletteCollapsed.toString())
  }, [isPaletteCollapsed])

  // Check if onboarding banner was dismissed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('topflow-onboarding-dismissed')
      setShowOnboarding(!dismissed)
    }
  }, [])

  const handleDismissOnboarding = useCallback(() => {
    localStorage.setItem('topflow-onboarding-dismissed', 'true')
    setShowOnboarding(false)
  }, [])

  useEffect(() => {
    const maxId = Math.max(...nodes.map((n) => Number.parseInt(n.id) || 0), 0)
    nodeIdCounter.current = maxId + 1
  }, [nodes])

  const validationErrorsCount = React.useMemo(() => {
    const workflowIssues = validateWorkflow(nodes, edges)
    const apiKeyIssues = validateApiKeys(apiKeys, nodes)
    const allIssues = [...workflowIssues, ...apiKeyIssues]
    return allIssues.filter((i) => i.type === "error").length
  }, [nodes, edges, apiKeys])

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])

  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setShowExecution(false)
    setShowValidation(false)
    setIsPaletteOpen(false)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const onAddNode = useCallback(
    (type: string) => {
      if (!reactFlowInstance) return

      const newNode: Node = {
        id: `${Date.now()}-${nodeIdCounter.current++}`,
        type,
        position: reactFlowInstance.screenToFlowPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }),
        data: getDefaultNodeData(type),
      }

      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance],
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const type = event.dataTransfer.getData("application/reactflow")
      if (!type) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode: Node = {
        id: `${Date.now()}-${nodeIdCounter.current++}`,
        type,
        position,
        data: getDefaultNodeData(type),
      }

      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance],
  )

  const onUpdateNode = useCallback((nodeId: string, data: any) => {
    setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data } : node)))
    setSelectedNode((node) => (node?.id === nodeId ? { ...node, data } : node))
  }, [])

  const handleNodeStatusChange = useCallback((nodeId: string, status: "idle" | "running" | "completed" | "error") => {
    setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, status } } : node)))
  }, [])

  const handleNodeOutputChange = useCallback((nodeId: string, output: any) => {
    setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, output } } : node)))

    // Store execution results when any node completes
    setLastExecutionResults((prev) => ({
      ...(prev || {}),
      [nodeId]: output
    }))

    // Auto-navigate to end node when GitHub Scanner completes
    if (nodeId === "end" && currentWorkflow?.id === "github-security-scanner" && reactFlowInstance) {
      setTimeout(() => {
        const endNode = nodes.find((node) => node.id === "end")
        if (endNode) {
          reactFlowInstance.fitView({
            nodes: [endNode],
            duration: 800,
            padding: { top: 0.2, right: 0.5, bottom: 0.2, left: 0.2 }, // Extra right padding for execution panel
            maxZoom: 1.0,
          })
        }
      }, 500) // Small delay to ensure rendering completes
    }
  }, [currentWorkflow?.id, reactFlowInstance, nodes])

  const handleDeleteNode = useCallback(() => {
    // Check if any edges are selected (ReactFlow adds selected property)
    const selectedEdges = edges.filter((edge) => edge.selected)

    // Handle edge deletion if edges are selected
    if (selectedEdges.length > 0) {
      const edgeIds = selectedEdges.map((e) => e.id)
      setEdges((eds) => eds.filter((edge) => !edgeIds.includes(edge.id)))

      toast({
        title: "Edge deleted",
        description: `${selectedEdges.length} connection${selectedEdges.length > 1 ? "s" : ""} removed`,
      })
      return
    }

    // Handle node deletion if a node is selected
    if (!selectedNode) return

    // Remove the node and all connected edges
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
    setSelectedNode(null)

    toast({
      title: "Node deleted",
      description: `${selectedNode.type} node has been removed`,
    })
  }, [selectedNode, edges, toast])

  // Wire up keyboard shortcuts
  useKeyboardShortcuts({
    nodes,
    edges,
    reactFlowInstance,
    onDelete: handleDeleteNode,
  })

  const handleNodeHighlight = useCallback(
    (nodeIds: string[]) => {
      if (!reactFlowInstance) return

      const nodesToHighlight = nodes.filter((node) => nodeIds.includes(node.id))
      if (nodesToHighlight.length > 0) {
        reactFlowInstance.fitView({
          nodes: nodesToHighlight,
          duration: 800,
          padding: 0.2,
        })
      }
    },
    [nodes, reactFlowInstance],
  )

  const handleExportWorkflow = useCallback(() => {
    // Smart filtering: Remove large binary data (images, audio) but keep useful outputs (text, JSON, etc.)
    const cleanNodes = nodes.map(node => {
      const cleanData = { ...node.data }

      // Filter output if it exists
      if (cleanData.output !== undefined) {
        cleanData.output = filterLargeBinaryData(cleanData.output)
      }

      return {
        ...node,
        data: cleanData
      }
    })

    const workflow = {
      nodes: cleanNodes,
      edges,
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-workflow-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Workflow exported",
      description: "Binary files excluded (use Download Image buttons for images)",
    })
  }, [nodes, edges, toast])

  // Helper function to filter out large binary data from outputs
  const filterLargeBinaryData = (output: any): any => {
    if (!output) return output

    // Handle string outputs
    if (typeof output === 'string') {
      // Exclude base64 image data URLs (typically 1-5 MB)
      if (output.startsWith('data:image/')) {
        return '[Image data excluded - use Download Image button]'
      }
      // Exclude base64 audio data URLs
      if (output.startsWith('data:audio/')) {
        return '[Audio data excluded - use Download button]'
      }
      // Keep regular text (even if long)
      return output
    }

    // Handle array outputs
    if (Array.isArray(output)) {
      return output.map(item => filterLargeBinaryData(item))
    }

    // Handle object outputs
    if (typeof output === 'object') {
      const cleaned: any = {}
      for (const [key, value] of Object.entries(output)) {
        // Special handling for known binary data fields
        if (key === 'url' && typeof value === 'string' && value.startsWith('data:image/')) {
          cleaned[key] = '[Image data excluded - use Download Image button]'
        } else if (key === 'url' && typeof value === 'string' && value.startsWith('data:audio/')) {
          cleaned[key] = '[Audio data excluded - use Download button]'
        } else if (key === 'images' && Array.isArray(value)) {
          // Filter image arrays
          cleaned[key] = value.map(img =>
            typeof img === 'string' && img.startsWith('data:image/')
              ? '[Image data excluded]'
              : img
          )
        } else {
          cleaned[key] = filterLargeBinaryData(value)
        }
      }
      return cleaned
    }

    // Keep primitives (numbers, booleans, null)
    return output
  }

  const handleImportWorkflow = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const imported = JSON.parse(content)

          // Support both old format (just nodes/edges) and new format (with schemaVersion)
          const workflow = imported.schemaVersion ? imported : imported

          if (workflow.nodes && workflow.edges) {
            setNodes(workflow.nodes)
            setEdges(workflow.edges)

            const maxId = Math.max(
              ...workflow.nodes.map((n: Node) => {
                const parts = n.id.split("-")
                return Number.parseInt(parts[parts.length - 1]) || 0
              }),
              0,
            )
            nodeIdCounter.current = maxId + 1

            toast({
              title: "Workflow imported",
              description: `Loaded ${workflow.nodes.length} nodes successfully`,
            })
          } else {
            toast({
              title: "Import failed",
              description: "Invalid workflow file format",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Failed to import workflow:", error)
          toast({
            title: "Import failed",
            description: "Failed to parse workflow file",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [nodes, toast],
  )

  const handleRun = useCallback(() => {
    setShowExecution(true)
    setShowValidation(false)
    setSelectedNode(null)
    setTimeout(() => {
      const executeButton = document.querySelector("[data-execute-workflow]") as HTMLButtonElement
      if (executeButton) {
        executeButton.click()
      }
    }, 100)
  }, [])

  const handleToggleValidation = useCallback(() => {
    setShowValidation((prev) => !prev)
    setShowExecution(false)
    setSelectedNode(null)
  }, [])

  const handleUseTemplate = useCallback(
    (workflow: StoredWorkflow) => {
      setNodes(workflow.nodes)
      setEdges(workflow.edges)
      setCurrentWorkflow(workflow)

      // Update URL to reflect loaded template
      router.push(`/builder?template=${workflow.id}`, { scroll: false })

      toast({
        title: "Template loaded",
        description: `${workflow.name} has been loaded successfully`,
      })
    },
    [toast, router],
  )

  // Handle template loading from URL params and localStorage (must be after handleUseTemplate definition)
  useEffect(() => {
    const templateId = searchParams.get("template")
    const repoParam = searchParams.get("repo")

    console.log('[Builder] URL params:', { templateId, repoParam })

    // Priority 1: URL template parameter
    if (templateId && !currentWorkflow) {
      const templates = WorkflowStorage.getTemplates()
      let template = templates.find((t) => t.id === templateId)

      if (template) {
        // Pre-fill start node with repo parameter BEFORE loading template (GitHub Scanner only)
        if (templateId === "github-security-scanner" && repoParam) {
          console.log('[Builder] Modifying template for repo:', repoParam)
          const startNodeBefore = template.nodes.find(n => n.type === "start")
          console.log('[Builder] Start node BEFORE:', JSON.stringify(startNodeBefore?.data, null, 2))

          // Clone template and update start node
          template = {
            ...template,
            nodes: template.nodes.map((node) =>
              node.type === "start"
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      defaultValue: `https://github.com/${repoParam}`
                    }
                  }
                : node
            )
          }

          const startNodeAfter = template.nodes.find(n => n.type === "start")
          console.log('[Builder] Start node AFTER:', JSON.stringify(startNodeAfter?.data, null, 2))
        }

        handleUseTemplate(template)
        return
      }
    }

    // Priority 2: Pending template from homepage (localStorage)
    if (!templateId && !currentWorkflow && typeof window !== 'undefined') {
      const pendingTemplateStr = localStorage.getItem("pending-template")
      if (pendingTemplateStr) {
        try {
          const template = JSON.parse(pendingTemplateStr)
          console.log('[Builder] Loading pending template from homepage:', template.id)
          handleUseTemplate(template)
          localStorage.removeItem("pending-template") // Clear after loading
          return
        } catch (e) {
          console.error('[Builder] Failed to load pending template:', e)
          localStorage.removeItem("pending-template") // Clear invalid data
        }
      }

      // Priority 3: Default to GitHub Scanner (MVP landing page)
      const templates = WorkflowStorage.getTemplates()
      const githubScanner = templates.find((t) => t.id === "github-security-scanner")
      if (githubScanner) {
        console.log('[Builder] Loading default GitHub Scanner template')
        handleUseTemplate(githubScanner)
      }
    }
  }, [searchParams, handleUseTemplate, currentWorkflow])

  const handleWorkflowSaved = useCallback(
    (workflow: StoredWorkflow) => {
      setCurrentWorkflow(workflow)
      toast({
        title: "Workflow saved",
        description: `${workflow.name} v${workflow.version} saved successfully`,
      })
    },
    [toast],
  )

  const handleRestoreVersion = useCallback(
    (versionNodes: any[], versionEdges: any[]) => {
      setNodes(versionNodes)
      setEdges(versionEdges)
      toast({
        title: "Version restored",
        description: "Workflow has been restored to the selected version",
      })
    },
    [toast],
  )

  const handleShowEndNode = useCallback(() => {
    // Find the End node
    const endNode = nodes.find((node) => node.type === "end")
    if (endNode) {
      setSelectedNode(endNode)
      setShowExecution(false)

      // Navigate to the End node with smooth animation
      if (reactFlowInstance) {
        reactFlowInstance.fitView({
          nodes: [endNode],
          duration: 800,
          padding: 0.3,
          maxZoom: 1.2,
        })
      }
    }
  }, [nodes, reactFlowInstance])

  // Callback for viewing GitHub Scanner results
  const handleViewResults = useCallback(() => {
    if (lastExecutionResults && currentWorkflow?.id === "github-security-scanner") {
      setShowResultsDialog(true)
    }
  }, [lastExecutionResults, currentWorkflow?.id])

  // Enrich nodes with workflowId and onViewResults callback for end nodes
  const enrichedNodes = useMemo(() => {
    return nodes.map((node) => {
      if (node.type === "end") {
        return {
          ...node,
          data: {
            ...node.data,
            workflowId: currentWorkflow?.id,
            onViewResults: handleViewResults
          }
        }
      }
      return node
    })
  }, [nodes, currentWorkflow?.id, handleViewResults])

  // Get repository name for results dialog
  const repository = lastExecutionResults?.["start"] || ""

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <Link href="/home">
            <Button variant="ghost" size="icon" aria-label="Go to homepage">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            aria-label="Toggle node palette"
          >
            {isPaletteOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-bold text-foreground md:text-xl">TopFlow</h1>
              {currentWorkflow && (
                <span className="text-sm text-muted-foreground">/ {currentWorkflow.name}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground md:text-sm">
              {currentWorkflow
                ? `v${currentWorkflow.version} • ${currentWorkflow.category} • ${
                    currentWorkflow.description?.substring(0, 50) || "Workflow"
                  }${currentWorkflow.description && currentWorkflow.description.length > 50 ? "..." : ""}`
                : "Secure AI Agent Orchestration Platform"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* File Operations Group */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowTemplateGallery(true)}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowWorkflowManager(true)}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            {currentWorkflow && (
              <Button variant="outline" size="sm" onClick={() => setShowVersionHistory(true)}>
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            )}
          </div>

          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-border" />

          {/* Execution Group */}
          <div className="flex items-center gap-2">
            <Button
              variant={validationErrorsCount > 0 ? "destructive" : "outline"}
              size="sm"
              onClick={handleToggleValidation}
              className="relative"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Validate
              {validationErrorsCount > 0 && (
                <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full px-1 text-xs">
                  {validationErrorsCount}
                </Badge>
              )}
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-semibold" onClick={handleRun}>
              <Play className="mr-2 h-4 w-4" />
              Run Demo
            </Button>
          </div>

          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-border" />

          {/* Settings & Export Group */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowApiSettings(true)}>
              <Key className="mr-2 h-4 w-4" />
              API Keys
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportWorkflow}
              className="hidden"
              aria-label="Import workflow"
            />
            <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="hidden md:flex">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="ghost" size="sm" onClick={handleExportWorkflow} className="hidden md:flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowCodeExport(true)} className="hidden md:flex">
              <Code2 className="mr-2 h-4 w-4" />
              Code
            </Button>
          </div>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <div
          className={`${isPaletteOpen ? "fixed inset-0 z-40 bg-black/50 md:hidden" : "hidden"}`}
          onClick={() => setIsPaletteOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`${isPaletteOpen ? "fixed left-0 top-[73px] z-50 h-[calc(100vh-73px)]" : "hidden"} ${
            selectedNode ? "md:block" : "md:block"
          } md:relative md:top-0 md:z-auto md:h-auto`}
        >
          <NodePalette
            onAddNode={onAddNode}
            onClose={() => setIsPaletteOpen(false)}
            isCollapsed={isPaletteCollapsed}
            onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
          />
        </div>

        <div className="flex-1 relative" ref={reactFlowWrapper}>
          {showOnboarding && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl animate-in slide-in-from-top-4 duration-500">
              <div className="bg-primary border-2 border-primary-foreground/20 rounded-lg shadow-xl px-6 py-4 flex items-center gap-4">
                <Sparkles className="h-5 w-5 text-primary-foreground shrink-0" />
                <span className="text-sm md:text-base text-primary-foreground font-medium">
                  <strong>Try the GitHub Security Scanner</strong> in demo mode — no API keys needed!
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismissOnboarding}
                  className="shrink-0 h-7 w-7 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <ReactFlow
            nodes={enrichedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            deleteKeyCode={null}
            fitView
            className="bg-background"
          >
            <Background gap={20} size={1.5} color="oklch(0.15 0 0)" className="opacity-40" />
            <Controls showInteractive={false} />
            <MiniMap
              pannable
              zoomable
              className="bg-card border border-border rounded-lg shadow-sm"
              maskColor="rgb(0, 0, 0, 0.6)"
              nodeColor={(node) => {
                switch (node.type) {
                  case "textModel":
                    return "oklch(0.65 0.25 265)"
                  case "embeddingModel":
                    return "oklch(0.60 0.20 200)"
                  case "tool":
                    return "oklch(0.75 0.20 80)"
                  case "structuredOutput":
                    return "oklch(0.70 0.18 150)"
                  case "prompt":
                    return "oklch(0.68 0.22 320)"
                  case "imageGeneration":
                    return "oklch(0.72 0.22 180)"
                  case "audio":
                    return "oklch(0.70 0.25 40)"
                  case "javascript":
                    return "oklch(0.65 0.25 265)"
                  case "start":
                    return "oklch(0.55 0.30 280)"
                  case "end":
                    return "oklch(0.50 0.25 300)"
                  case "conditional":
                    return "oklch(0.60 0.25 320)"
                  case "httpRequest":
                    return "oklch(0.65 0.25 265)"
                  default:
                    return "oklch(0.65 0.25 265)"
                }
              }}
            />
          </ReactFlow>
        </div>

        {showValidation && (
          <ValidationPanel
            nodes={nodes}
            edges={edges}
            apiKeys={apiKeys}
            onClose={() => setShowValidation(false)}
            onNodeHighlight={handleNodeHighlight}
            workflowId={currentWorkflow?.id}
          />
        )}

        {selectedNode && !showExecution && !showValidation && (
          <NodeConfigPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onUpdate={onUpdateNode}
            onDelete={handleDeleteNode}
            onShowFullReport={() => setShowResultsDialog(true)}
          />
        )}

        {showExecution && !showValidation && (
          <ExecutionPanel
            nodes={nodes}
            edges={edges}
            onClose={() => setShowExecution(false)}
            onNodeStatusChange={handleNodeStatusChange}
            onNodeOutputChange={handleNodeOutputChange}
            onShowEndNode={handleShowEndNode}
            onViewFullReport={handleViewResults}
            workflowId={currentWorkflow?.id || "template-threat-intel"}
          />
        )}
      </div>

      <CodeExportDialog open={showCodeExport} onOpenChange={setShowCodeExport} nodes={nodes} edges={edges} />
      <ApiSettingsDialog open={showApiSettings} onOpenChange={setShowApiSettings} />
      <TemplateGallery
        open={showTemplateGallery}
        onOpenChange={setShowTemplateGallery}
        onUseTemplate={handleUseTemplate}
      />
      <WorkflowManager
        open={showWorkflowManager}
        onOpenChange={setShowWorkflowManager}
        nodes={nodes}
        edges={edges}
        currentWorkflow={currentWorkflow}
        onWorkflowSaved={handleWorkflowSaved}
      />
      <VersionHistory
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        workflowId={currentWorkflow?.id || null}
        onRestoreVersion={handleRestoreVersion}
      />
      <GitHubScannerResultsDialog
        open={showResultsDialog}
        onOpenChange={setShowResultsDialog}
        outputs={lastExecutionResults || {}}
        repository={repository}
      />
    </div>
  )
}
