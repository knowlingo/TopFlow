"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Copy, CheckCircle2, Plus } from "lucide-react"

type PromptEditorProps = {
  value: string
  onChange: (value: string) => void
  availableInputs?: string[]
}

const PROMPT_TEMPLATES = {
  summarization: "Summarize the following text concisely:\n\n$input1",
  extraction: "Extract key information from the text below:\n\n$input1\n\nProvide the result as structured data.",
  classification:
    "Classify the following text into one of these categories: [category1, category2, category3]\n\nText: $input1\n\nCategory:",
  translation: "Translate the following text to [target language]:\n\n$input1",
  qa: "Answer the following question based on the provided context.\n\nContext: $input1\n\nQuestion: $input2\n\nAnswer:",
  generation: "Generate creative content based on this prompt:\n\n$input1",
}

export function PromptEditor({ value, onChange, availableInputs = [] }: PromptEditorProps) {
  const [copied, setCopied] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState("")
  const [userPrompt, setUserPrompt] = useState(value)

  const detectedVariables = (value.match(/\$input\d+/g) || []).filter((v, i, arr) => arr.indexOf(v) === i)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTemplateSelect = (template: string) => {
    onChange(PROMPT_TEMPLATES[template as keyof typeof PROMPT_TEMPLATES])
  }

  const insertVariable = (variable: string) => {
    const cursorPosition = 0
    const newValue = value + (value ? "\n" : "") + variable
    onChange(newValue)
  }

  const characterCount = value.length
  const estimatedTokens = Math.ceil(characterCount / 4)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Prompt Content</Label>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{characterCount} chars</span>
                <span>~{estimatedTokens} tokens</span>
              </div>
            </div>

            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter your prompt... Use $input1, $input2, etc. for variables"
              rows={12}
              className="font-mono text-sm"
            />

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {detectedVariables.map((variable) => (
                  <Badge key={variable} variant="secondary" className="gap-1">
                    {variable}
                    <span className="text-green-500">✓</span>
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Insert</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => insertVariable("$input1")}>
                <Plus className="h-3 w-3 mr-1" />
                Add $input1
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertVariable("$input2")}>
                <Plus className="h-3 w-3 mr-1" />
                Add $input2
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertVariable("$input3")}>
                <Plus className="h-3 w-3 mr-1" />
                Add $input3
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="space-y-2">
            <Label>Prompt Templates</Label>
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summarization">Summarization</SelectItem>
                <SelectItem value="extraction">Information Extraction</SelectItem>
                <SelectItem value="classification">Text Classification</SelectItem>
                <SelectItem value="translation">Translation</SelectItem>
                <SelectItem value="qa">Question Answering</SelectItem>
                <SelectItem value="generation">Content Generation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="p-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 mt-0.5 text-yellow-500" />
              <div>
                <p className="font-medium text-foreground mb-1">Pro Tip</p>
                <p className="text-xs">
                  Use templates as starting points and customize them for your specific use case. Variables like
                  $input1, $input2 will be replaced with actual values from connected nodes.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-4 bg-secondary/50">
            <Label className="text-xs text-muted-foreground mb-2 block">Preview (with sample data)</Label>
            <div className="whitespace-pre-wrap text-sm">
              {value
                .replace(/\$input1/g, "[Sample Input 1]")
                .replace(/\$input2/g, "[Sample Input 2]")
                .replace(/\$input3/g, "[Sample Input 3]")}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
