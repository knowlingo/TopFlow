"use client"

import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ShortcutCategory {
  name: string
  shortcuts: Array<{
    keys: string[]
    description: string
  }>
}

const shortcutCategories: ShortcutCategory[] = [
  {
    name: "Global",
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open command palette" },
      { keys: ["⌘", "Z"], description: "Undo" },
      { keys: ["⌘", "⇧", "Z"], description: "Redo" },
      { keys: ["⌘", "S"], description: "Save workflow" },
      { keys: ["⌘", "E"], description: "Export code" },
      { keys: ["⌘", "↵"], description: "Run workflow" },
      { keys: ["⌘", "/"], description: "Toggle shortcuts" },
      { keys: ["Esc"], description: "Close panels / Deselect" },
    ],
  },
  {
    name: "Canvas",
    shortcuts: [
      { keys: ["Del"], description: "Delete selected" },
      { keys: ["⌘", "A"], description: "Select all" },
      { keys: ["⌘", "D"], description: "Duplicate selected" },
      { keys: ["⌘", "C"], description: "Copy nodes" },
      { keys: ["⌘", "V"], description: "Paste nodes" },
      { keys: ["Space"], description: "Pan mode (hold)" },
      { keys: ["⌘", "+"], description: "Zoom in" },
      { keys: ["⌘", "-"], description: "Zoom out" },
      { keys: ["⌘", "0"], description: "Fit view" },
    ],
  },
  {
    name: "Node",
    shortcuts: [
      { keys: ["Tab"], description: "Cycle through nodes" },
      { keys: ["↵"], description: "Open config panel" },
    ],
  },
]

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  useHotkeys(
    "mod+/",
    (e) => {
      e.preventDefault()
      onOpenChange(!open)
    },
    { enableOnFormTags: true },
  )

  const filteredCategories = React.useMemo(() => {
    if (!searchQuery) return shortcutCategories

    return shortcutCategories
      .map((category) => ({
        ...category,
        shortcuts: category.shortcuts.filter(
          (shortcut) =>
            shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shortcut.keys.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
      }))
      .filter((category) => category.shortcuts.length > 0)
  }, [searchQuery])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Speed up your workflow with these keyboard shortcuts</DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{category.name}</h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5"
                  >
                    <span className="text-sm text-foreground">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIdx) => (
                        <Kbd key={keyIdx}>{key}</Kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No shortcuts found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
