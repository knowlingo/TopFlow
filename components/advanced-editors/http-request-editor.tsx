"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Plus, Trash2, Copy, CheckCircle2 } from "lucide-react"

type Header = { id: string; key: string; value: string }
type QueryParam = { id: string; key: string; value: string }

type HttpRequestEditorProps = {
  url: string
  method: string
  headers?: string
  body?: string
  onUpdate: (data: { url: string; method: string; headers: string; body: string }) => void
}

const HTTP_METHODS = [
  { value: "GET", color: "bg-blue-500" },
  { value: "POST", color: "bg-green-500" },
  { value: "PUT", color: "bg-orange-500" },
  { value: "DELETE", color: "bg-red-500" },
  { value: "PATCH", color: "bg-yellow-500" },
]

export function HttpRequestEditor({ url, method, headers, body, onUpdate }: HttpRequestEditorProps) {
  const [currentUrl, setCurrentUrl] = useState(url || "")
  const [currentMethod, setCurrentMethod] = useState(method || "GET")
  const [headersList, setHeadersList] = useState<Header[]>(() => {
    try {
      const parsed = JSON.parse(headers || "{}")
      return Object.entries(parsed).map(([key, value], index) => ({
        id: index.toString(),
        key,
        value: value as string,
      }))
    } catch {
      return []
    }
  })
  const [currentBody, setCurrentBody] = useState(body || "")
  const [copied, setCopied] = useState(false)

  const urlPreview = currentUrl
    .replace(/\$input1/g, "[input1]")
    .replace(/\$input2/g, "[input2]")
    .replace(/\$input3/g, "[input3]")

  const addHeader = () => {
    setHeadersList([...headersList, { id: Date.now().toString(), key: "", value: "" }])
  }

  const removeHeader = (id: string) => {
    setHeadersList(headersList.filter((h) => h.id !== id))
  }

  const updateHeader = (id: string, field: "key" | "value", value: string) => {
    setHeadersList(headersList.map((h) => (h.id === id ? { ...h, [field]: value } : h)))
  }

  const addCommonHeader = (key: string, value: string) => {
    setHeadersList([...headersList, { id: Date.now().toString(), key, value }])
  }

  const handleSave = () => {
    const headersObj = headersList.reduce(
      (acc, h) => {
        if (h.key) acc[h.key] = h.value
        return acc
      },
      {} as Record<string, string>,
    )

    onUpdate({
      url: currentUrl,
      method: currentMethod,
      headers: JSON.stringify(headersObj),
      body: currentBody,
    })
  }

  const copyCurl = () => {
    const headersStr = headersList
      .filter((h) => h.key)
      .map((h) => `-H "${h.key}: ${h.value}"`)
      .join(" ")

    let curl = `curl -X ${currentMethod} "${currentUrl}"`
    if (headersStr) curl += ` ${headersStr}`
    if (currentBody && currentMethod !== "GET") curl += ` -d '${currentBody}'`

    navigator.clipboard.writeText(curl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>HTTP Method</Label>
        <div className="flex gap-2">
          {HTTP_METHODS.map((m) => (
            <Button
              key={m.value}
              variant={currentMethod === m.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentMethod(m.value)}
              className={currentMethod === m.value ? m.color : ""}
            >
              {m.value}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="font-mono text-sm"
        />
        {currentUrl.includes("$input") && (
          <div className="text-xs text-muted-foreground bg-secondary p-2 rounded">Preview: {urlPreview}</div>
        )}
      </div>

      <Tabs defaultValue="headers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="headers" className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm">Common Headers</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => addCommonHeader("Content-Type", "application/json")}>
                <Plus className="h-3 w-3 mr-1" />
                JSON Content-Type
              </Button>
              <Button variant="outline" size="sm" onClick={() => addCommonHeader("Authorization", "Bearer $input1")}>
                <Plus className="h-3 w-3 mr-1" />
                Bearer Auth
              </Button>
              <Button variant="outline" size="sm" onClick={() => addCommonHeader("Accept", "application/json")}>
                <Plus className="h-3 w-3 mr-1" />
                Accept JSON
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {headersList.map((header) => (
              <div key={header.id} className="flex gap-2">
                <Input
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, "key", e.target.value)}
                  placeholder="Header name"
                  className="flex-1 text-sm"
                />
                <Input
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1 text-sm font-mono"
                />
                <Button variant="ghost" size="icon" onClick={() => removeHeader(header.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}

            <Button onClick={addHeader} variant="outline" size="sm" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Header
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="body" className="space-y-4">
          {currentMethod === "GET" ? (
            <Card className="p-4 bg-secondary/30 text-sm text-muted-foreground">
              GET requests typically don't have a body. Use POST, PUT, or PATCH for sending data.
            </Card>
          ) : (
            <div className="space-y-2">
              <Label>Request Body (JSON)</Label>
              <Textarea
                value={currentBody}
                onChange={(e) => setCurrentBody(e.target.value)}
                placeholder='{\n  "key": "value",\n  "data": "$input1"\n}'
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Use $input1, $input2, etc. to interpolate values from connected nodes
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card className="p-4 bg-secondary/30">
            <Label className="text-sm mb-2 block">Response Handling</Label>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">Status Code</Badge>
                  <span className="text-muted-foreground">Will be available in output</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">Response Body</Badge>
                  <span className="text-muted-foreground">Parsed JSON or raw text</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">Headers</Badge>
                  <span className="text-muted-foreground">Available for debugging</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1">
          <Send className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
        <Button onClick={copyCurl} variant="outline">
          {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
