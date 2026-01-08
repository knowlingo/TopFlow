"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Copy, CheckCircle2 } from "lucide-react"

type SchemaField = {
  id: string
  name: string
  type: string
  required: boolean
  description?: string
  children?: SchemaField[]
  expanded?: boolean
}

type SchemaBuilderProps = {
  value: string
  onChange: (value: string) => void
}

const FIELD_TYPES = ["string", "number", "boolean", "object", "array", "enum"]

const SCHEMA_TEMPLATES = {
  person: {
    name: "Person",
    fields: [
      { id: "1", name: "name", type: "string", required: true, description: "Full name" },
      { id: "2", name: "age", type: "number", required: true, description: "Age in years" },
      { id: "3", name: "email", type: "string", required: false, description: "Email address" },
    ],
  },
  address: {
    name: "Address",
    fields: [
      { id: "1", name: "street", type: "string", required: true },
      { id: "2", name: "city", type: "string", required: true },
      { id: "3", name: "country", type: "string", required: true },
      { id: "4", name: "zipCode", type: "string", required: false },
    ],
  },
  product: {
    name: "Product",
    fields: [
      { id: "1", name: "id", type: "string", required: true },
      { id: "2", name: "title", type: "string", required: true },
      { id: "3", name: "price", type: "number", required: true },
      { id: "4", name: "inStock", type: "boolean", required: true },
      { id: "5", name: "description", type: "string", required: false },
    ],
  },
}

export function SchemaBuilder({ value, onChange }: SchemaBuilderProps) {
  const [fields, setFields] = useState<SchemaField[]>([{ id: "1", name: "", type: "string", required: false }])
  const [copied, setCopied] = useState(false)
  const [selectedField, setSelectedField] = useState<string | null>(null)

  const buildSchema = (): any => {
    const properties: any = {}
    const required: string[] = []

    fields.forEach((field) => {
      if (!field.name) return

      let fieldSchema: any = {}

      switch (field.type) {
        case "string":
          fieldSchema = { type: "string" }
          break
        case "number":
          fieldSchema = { type: "number" }
          break
        case "boolean":
          fieldSchema = { type: "boolean" }
          break
        case "object":
          fieldSchema = { type: "object", properties: {} }
          break
        case "array":
          fieldSchema = { type: "array", items: { type: "string" } }
          break
        case "enum":
          fieldSchema = { type: "string", enum: [] }
          break
      }

      if (field.description) {
        fieldSchema.description = field.description
      }

      properties[field.name] = fieldSchema

      if (field.required) {
        required.push(field.name)
      }
    })

    return {
      type: "object",
      properties,
      ...(required.length > 0 && { required }),
    }
  }

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        name: "",
        type: "string",
        required: false,
      },
    ])
  }

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
  }

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const applyTemplate = (templateKey: keyof typeof SCHEMA_TEMPLATES) => {
    const template = SCHEMA_TEMPLATES[templateKey]
    setFields(template.fields)
  }

  const handleCopy = () => {
    const schema = buildSchema()
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    const schema = buildSchema()
    onChange(JSON.stringify(schema))
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visual">Visual Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-4">
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card key={field.id} className={`p-4 ${selectedField === field.id ? "border-primary" : ""}`}>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <Input
                        value={field.name}
                        onChange={(e) => updateField(field.id, { name: e.target.value })}
                        placeholder="Field name"
                        className="text-sm"
                      />
                    </div>

                    <div className="col-span-3">
                      <Select value={field.type} onValueChange={(v) => updateField(field.id, { type: v })}>
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3 flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(field.id, { required: checked as boolean })}
                      />
                      <Label className="text-xs">Required</Label>
                    </div>

                    <div className="col-span-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(field.id)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <Input
                    value={field.description || ""}
                    onChange={(e) => updateField(field.id, { description: e.target.value })}
                    placeholder="Description (optional)"
                    className="text-xs"
                  />
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={addField} variant="outline" size="sm" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="space-y-2">
            <Label>Quick Start Templates</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => applyTemplate("person")}
                className="h-auto flex-col items-start p-4"
              >
                <span className="font-semibold">Person</span>
                <span className="text-xs text-muted-foreground">name, age, email</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => applyTemplate("address")}
                className="h-auto flex-col items-start p-4"
              >
                <span className="font-semibold">Address</span>
                <span className="text-xs text-muted-foreground">street, city, country</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => applyTemplate("product")}
                className="h-auto flex-col items-start p-4"
              >
                <span className="font-semibold">Product</span>
                <span className="text-xs text-muted-foreground">id, title, price</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-4 bg-secondary/30">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">JSON Schema Output</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
              {JSON.stringify(buildSchema(), null, 2)}
            </pre>
          </Card>

          <Card className="p-4 bg-secondary/30">
            <Label className="text-sm mb-2 block">Example Output</Label>
            <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
              {JSON.stringify(
                fields.reduce((acc, field) => {
                  if (!field.name) return acc
                  switch (field.type) {
                    case "string":
                      acc[field.name] = "example string"
                      break
                    case "number":
                      acc[field.name] = 42
                      break
                    case "boolean":
                      acc[field.name] = true
                      break
                    default:
                      acc[field.name] = null
                  }
                  return acc
                }, {} as any),
                null,
                2,
              )}
            </pre>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save Schema
      </Button>
    </div>
  )
}
