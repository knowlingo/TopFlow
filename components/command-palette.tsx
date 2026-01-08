"use client"

import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Bot,
  Braces,
  Code,
  FileJson,
  Globe,
  ImageIcon,
  MessageSquare,
  Music,
  Play,
  Sparkles,
  GitBranch,
  Download,
  Upload,
  ZoomIn,
  Flag,
  Square,
  Key,
  Settings,
} from "lucide-react"
import { Kbd } from "@/components/ui/kbd"

interface CommandPaletteProps {
  onAddNode?: (type: string) => void
  onAction?: (action: string) => void
}

export function CommandPalette({ onAddNode, onAction }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false)

  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault()
      setOpen((open) => !open)
    },
    { enableOnFormTags: true },
  )

  const nodeTypes = [
    { type: "start", label: "Start Node", icon: Flag, description: "Entry point of workflow" },
    { type: "end", label: "End Node", icon: Square, description: "Exit point of workflow" },
    { type: "textModel", label: "Text Model", icon: Bot, description: "LLM text generation" },
    { type: "embeddingModel", label: "Embedding Model", icon: Sparkles, description: "Generate embeddings" },
    { type: "structuredOutput", label: "Structured Output", icon: Braces, description: "Parse JSON/schema" },
    { type: "prompt", label: "Prompt", icon: MessageSquare, description: "Template message" },
    { type: "imageGeneration", label: "Image Generation", icon: ImageIcon, description: "Create images" },
    { type: "audio", label: "Audio", icon: Music, description: "Text-to-speech" },
    { type: "javascript", label: "JavaScript", icon: Code, description: "Custom logic" },
    { type: "conditional", label: "Conditional", icon: GitBranch, description: "Branch workflow" },
    { type: "httpRequest", label: "HTTP Request", icon: Globe, description: "External API" },
    { type: "tool", label: "Tool", icon: Code, description: "Custom tool" },
  ]

  const actions = [
    { id: "run", label: "Run Workflow", icon: Play, shortcut: "⌘↵" },
    { id: "export-code", label: "Export Code", icon: Code, shortcut: "⌘E" },
    { id: "export-json", label: "Export JSON", icon: Download, shortcut: "" },
    { id: "import-json", label: "Import JSON", icon: Upload, shortcut: "" },
    { id: "clear", label: "Clear Canvas", icon: FileJson, shortcut: "" },
    { id: "fit-view", label: "Zoom to Fit", icon: ZoomIn, shortcut: "⌘0" },
    { id: "api-keys", label: "API Keys", icon: Key, shortcut: "" },
    { id: "settings", label: "Settings", icon: Settings, shortcut: "" },
  ]

  const handleSelect = (callback: () => void) => {
    setOpen(false)
    // Small delay to allow dialog to close
    setTimeout(callback, 100)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Add Node">
          {nodeTypes.map((node) => (
            <CommandItem
              key={node.type}
              onSelect={() => handleSelect(() => onAddNode?.(node.type))}
              className="flex items-center gap-3"
            >
              <node.icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{node.label}</div>
                <div className="text-xs text-muted-foreground">{node.description}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actions.map((action) => (
            <CommandItem
              key={action.id}
              onSelect={() => handleSelect(() => onAction?.(action.id))}
              className="flex items-center gap-3"
            >
              <action.icon className="h-4 w-4" />
              <span className="flex-1">{action.label}</span>
              {action.shortcut && <Kbd>{action.shortcut}</Kbd>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
