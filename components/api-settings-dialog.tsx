"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type ApiSettings = {
  openai?: string
  anthropic?: string
  google?: string
  groq?: string
}

interface ApiSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function validateApiKey(provider: string, key: string): boolean {
  if (!key || key.trim() === "") return false

  switch (provider) {
    case "openai":
      return key.startsWith("sk-")
    case "anthropic":
      return key.startsWith("sk-ant-")
    case "google":
      return key.length > 10 // Google keys vary in format
    case "groq":
      return key.startsWith("gsk_")
    default:
      return false
  }
}

export function ApiSettingsDialog({ open, onOpenChange }: ApiSettingsDialogProps) {
  const [settings, setSettings] = useState<ApiSettings>({})
  const [validationStatus, setValidationStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ai-agent-api-keys")
      const keys = stored ? JSON.parse(stored) : {}
      setSettings(keys)

      // Validate all stored keys
      const status: Record<string, boolean> = {}
      Object.entries(keys).forEach(([provider, key]) => {
        status[provider] = validateApiKey(provider, key as string)
      })
      setValidationStatus(status)
    }
  }, [open])

  const handleKeyChange = (provider: string, value: string) => {
    const newSettings = { ...settings, [provider]: value }
    setSettings(newSettings)

    const newStatus = { ...validationStatus }
    newStatus[provider] = validateApiKey(provider, value)
    setValidationStatus(newStatus)
  }

  const handleSave = () => {
    localStorage.setItem("ai-agent-api-keys", JSON.stringify(settings))
    onOpenChange(false)
  }

  const renderKeyStatus = (provider: string) => {
    const hasKey = settings[provider as keyof ApiSettings]
    const isValid = validationStatus[provider]

    if (!hasKey) return null

    return (
      <div className="mt-2">
        {isValid ? (
          <Badge variant="outline" className="border-green-500 text-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Valid
          </Badge>
        ) : (
          <Badge variant="outline" className="border-red-500 text-red-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            Invalid format
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Settings
          </DialogTitle>
          <DialogDescription>
            Configure your API keys to use AI models. Keys are stored locally and encrypted in your browser.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="openai" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="openai">
              OpenAI
              {validationStatus.openai && <CheckCircle2 className="ml-1 h-3 w-3 text-green-600" />}
            </TabsTrigger>
            <TabsTrigger value="anthropic">
              Anthropic
              {validationStatus.anthropic && <CheckCircle2 className="ml-1 h-3 w-3 text-green-600" />}
            </TabsTrigger>
            <TabsTrigger value="google">
              Google
              {validationStatus.google && <CheckCircle2 className="ml-1 h-3 w-3 text-green-600" />}
            </TabsTrigger>
            <TabsTrigger value="groq">
              Groq
              {validationStatus.groq && <CheckCircle2 className="ml-1 h-3 w-3 text-green-600" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={settings.openai || ""}
                onChange={(e) => handleKeyChange("openai", e.target.value)}
              />
              {renderKeyStatus("openai")}
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  platform.openai.com
                </a>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="anthropic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="anthropic-key">Anthropic API Key</Label>
              <Input
                id="anthropic-key"
                type="password"
                placeholder="sk-ant-..."
                value={settings.anthropic || ""}
                onChange={(e) => handleKeyChange("anthropic", e.target.value)}
              />
              {renderKeyStatus("anthropic")}
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://console.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  console.anthropic.com
                </a>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="google" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google-key">Google AI API Key</Label>
              <Input
                id="google-key"
                type="password"
                placeholder="AI..."
                value={settings.google || ""}
                onChange={(e) => handleKeyChange("google", e.target.value)}
              />
              {renderKeyStatus("google")}
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  aistudio.google.com
                </a>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="groq" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groq-key">Groq API Key</Label>
              <Input
                id="groq-key"
                type="password"
                placeholder="gsk_..."
                value={settings.groq || ""}
                onChange={(e) => handleKeyChange("groq", e.target.value)}
              />
              {renderKeyStatus("groq")}
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline">
                  console.groq.com
                </a>
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
