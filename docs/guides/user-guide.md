# AI Agent Builder - User Guide

Welcome to AI Agent Builder, a visual workflow designer for creating AI-powered applications without code. This guide will help you get started and master all the features.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setting Up API Keys](#setting-up-api-keys)
3. [Understanding the Interface](#understanding-the-interface)
4. [Building Your First Workflow](#building-your-first-workflow)
5. [Node Types Reference](#node-types-reference)
6. [Working with Templates](#working-with-templates)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What is AI Agent Builder?

AI Agent Builder is a visual tool that lets you create sophisticated AI workflows by connecting nodes together. Each node represents a step in your workflow—from fetching data to generating text or images.

### Key Concepts

- **Nodes**: Building blocks that perform specific actions (AI models, prompts, API calls, etc.)
- **Edges**: Connections between nodes that define the flow of data
- **Workflow**: A complete set of connected nodes that accomplish a task
- **Templates**: Pre-built workflows you can use as starting points

---

## Setting Up API Keys

Before you can run workflows with AI models, you need to configure your API keys.

### Step 1: Click "API Keys" Button

In the top right corner of the interface, click the **"API Keys"** button (key icon).

### Step 2: Add Your API Keys

The AI Agent Builder supports multiple providers. Add keys for the providers you want to use:

#### OpenAI (Recommended for beginners)
- **Where to get**: https://platform.openai.com/api-keys
- **Format**: `sk-proj-...` (starts with `sk-`)
- **Best for**: Text generation (GPT-4, GPT-4o-mini), embeddings
- **Free tier**: $5 credit for new accounts

#### Anthropic
- **Where to get**: https://console.anthropic.com/
- **Format**: `sk-ant-...`
- **Best for**: Claude models (advanced reasoning)

#### Google AI
- **Where to get**: https://aistudio.google.com/app/apikey
- **Format**: `AIza...`
- **Best for**: Gemini models, image generation

#### Groq
- **Where to get**: https://console.groq.com/keys
- **Format**: `gsk_...`
- **Best for**: Fast inference, Llama models

### Step 3: Validate Keys

- The system automatically validates your API key format
- Green checkmark = valid format
- Red X = invalid format
- Warning icon = missing key (if nodes require it)

### Step 4: Save

Your API keys are stored securely in your browser's localStorage. They are never sent to our servers—only directly to the AI providers when you run workflows.

---

## Understanding the Interface

### Header Bar

- **AI Agent Builder** logo - Returns to home view
- **Templates** - Browse and load pre-built workflows
- **Save** - Save your current workflow with metadata
- **History** - View and restore previous versions (if workflow is saved)
- **Import/Export** - Transfer workflows between browsers or share with others
- **Validate** - Check for errors in your workflow
- **API Keys** - Configure provider credentials
- **Export Code** - Generate TypeScript code from your workflow
- **Run** - Execute the current workflow

### Left Panel - Node Palette

Contains all available node types organized by category:

- **I/O** - Start and End nodes
- **AI Models** - Text, embedding, and image generation
- **Logic** - Conditionals, JavaScript execution
- **Data** - HTTP requests, structured outputs
- **Content** - Prompts, tools, audio

**Tip**: Drag nodes from the palette onto the canvas, or click to add them to the center.

### Center - Canvas

The main workspace where you build workflows:

- **Pan**: Click and drag empty space
- **Zoom**: Use mouse wheel or pinch gesture
- **Select node**: Click on a node
- **Connect nodes**: Drag from a node's output handle to another node's input handle
- **Delete**: Select node/edge and press `Delete` or `Backspace`

### Bottom Right - Controls

- **Zoom in/out** buttons
- **Fit view** - Auto-zoom to show all nodes
- **Lock/unlock** - Toggle interactive mode

### Bottom Right - MiniMap

A bird's-eye view of your entire workflow. Click to jump to different areas.

### Right Panel (Context-Sensitive)

Shows different content based on selection:

- **Node selected**: Configuration panel for that node
- **Run clicked**: Execution panel showing real-time results
- **Validate clicked**: Validation panel with errors and warnings

---

## Building Your First Workflow

Let's create a simple chatbot workflow from scratch.

### Step 1: Add a Start Node

1. From the left panel under "I/O", drag a **Start** node onto the canvas
2. This is your workflow entry point

### Step 2: Add a Prompt Node

1. Drag a **Prompt** node onto the canvas
2. Click the Prompt node to select it
3. In the right panel, enter:
   \`\`\`
   You are a helpful assistant. The user says: {{input1}}
   \`\`\`
4. This template will receive input from the Start node

### Step 3: Add a Text Model Node

1. Drag a **Text Model** node onto the canvas
2. Click it and configure:
   - **Model**: `openai/gpt-4o-mini`
   - **Temperature**: 0.7
   - **Max Tokens**: 500

### Step 4: Add an End Node

1. Drag an **End** node onto the canvas
2. This marks where your workflow completes

### Step 5: Connect the Nodes

1. Click and drag from the **Start** node's output (right side) to the **Prompt** node's input (left side)
2. Connect **Prompt** → **Text Model**
3. Connect **Text Model** → **End**

### Step 6: Save Your Workflow

1. Click **Save** in the header
2. Enter details:
   - **Name**: "My First Chatbot"
   - **Description**: "A simple conversational bot"
   - **Category**: "Chatbots"
   - **Tags**: "beginner, chat"

### Step 7: Run It

1. Click **Run** in the header
2. The execution panel appears on the right
3. Click **Execute Workflow**
4. Enter test input: "Hello, how are you?"
5. Watch nodes turn green as they execute
6. See the AI response in the End node's output

**Congratulations!** You've built your first AI workflow.

---

## Node Types Reference

### Input/Output Nodes

#### Start Node
- **Purpose**: Entry point for your workflow
- **Outputs**: Initial input data
- **Use case**: Every workflow needs exactly one Start node

#### End Node
- **Purpose**: Marks workflow completion
- **Inputs**: Final output data
- **Use case**: Can have multiple End nodes for different paths

### AI Model Nodes

#### Text Model Node
- **Purpose**: Generate text using AI language models
- **Configuration**:
  - **Model**: Choose from OpenAI, Anthropic, Google, or Groq models
  - **Temperature**: 0.0 (deterministic) to 2.0 (creative)
  - **Max Tokens**: Response length limit
- **Inputs**: Prompt text
- **Outputs**: Generated text
- **Best practices**:
  - Use `gpt-4o-mini` for speed and cost efficiency
  - Use `gpt-4o` or `claude-sonnet-4` for complex reasoning
  - Lower temperature (0.3-0.5) for factual content
  - Higher temperature (0.7-1.0) for creative writing

#### Embedding Model Node
- **Purpose**: Convert text into vector embeddings
- **Configuration**:
  - **Model**: Embedding model (e.g., `text-embedding-3-small`)
  - **Dimensions**: Vector size
- **Inputs**: Text to embed
- **Outputs**: Numerical vector
- **Use cases**: Semantic search, similarity comparison, RAG systems

#### Image Generation Node
- **Purpose**: Create images from text descriptions
- **Configuration**:
  - **Model**: Image generation model
  - **Aspect Ratio**: 1:1, 16:9, 9:16, etc.
  - **Output Format**: PNG, JPEG
- **Inputs**: Text prompt
- **Outputs**: Generated image URL
- **Supported models**:
  - `black-forest-labs/flux-1.1-pro` (recommended)
  - `black-forest-labs/flux-pro`

### Content Nodes

#### Prompt Node
- **Purpose**: Format text with variable substitution
- **Configuration**:
  - **Content**: Template text with `{{variable}}` placeholders
- **Variables**:
  - `{{input1}}`, `{{input2}}`, etc. refer to connected inputs
  - Use the Advanced Editor for syntax highlighting
- **Example**:
  \`\`\`
  Write a story about {{input1.topic}} in {{input2.style}} style
  \`\`\`

#### Tool Node
- **Purpose**: Define AI function calling tools
- **Configuration**:
  - **Name**: Tool identifier
  - **Description**: What the tool does
  - **Parameters**: JSON schema for tool inputs
- **Use case**: Enable AI to call external functions

#### Audio Node
- **Purpose**: Generate speech from text (Text-to-Speech)
- **Configuration**:
  - **Model**: TTS model
  - **Voice**: Voice style (alloy, echo, fable, etc.)
  - **Speed**: Playback speed (0.5-2.0)
- **Inputs**: Text to speak
- **Outputs**: Audio file URL

### Logic Nodes

#### Conditional Node
- **Purpose**: Branch workflow based on conditions
- **Configuration**:
  - **Condition**: JavaScript expression (e.g., `input1.score > 0.8`)
- **Outputs**:
  - **TRUE** handle (top): Condition is true
  - **FALSE** handle (bottom): Condition is false
- **Example conditions**:
  - `input1 === 'urgent'`
  - `input1.length > 100`
  - `input1.temperature > 75`

#### JavaScript Node
- **Purpose**: Execute custom JavaScript code
- **Configuration**:
  - **Code**: JavaScript function body
- **Available variables**: `input1`, `input2`, etc. from connected nodes
- **Return value**: Use `return` to output data
- **Example**:
  \`\`\`javascript
  // Calculate average
  const nums = input1.numbers
  const avg = nums.reduce((a, b) => a + b) / nums.length
  return { average: avg }
  \`\`\`

### Data Nodes

#### HTTP Request Node
- **Purpose**: Call external APIs
- **Configuration**:
  - **URL**: Endpoint to call
  - **Method**: GET, POST, PUT, DELETE
  - **Headers**: HTTP headers (in Advanced Editor)
  - **Body**: Request payload for POST/PUT
- **Outputs**: API response
- **Security**: Validated to prevent SSRF attacks
- **Example**:
  - URL: `https://api.github.com/users/octocat`
  - Method: GET

#### Structured Output Node
- **Purpose**: Validate AI output against a schema
- **Configuration**:
  - **Schema Name**: Identifier for the schema
  - **Mode**: object or array
  - **Schema**: JSON Schema definition
- **Use case**: Ensure AI returns data in expected format
- **Example schema**:
  \`\`\`json
  {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "number" }
    }
  }
  \`\`\`

---

## Working with Templates

Templates are pre-built workflows that demonstrate common patterns and use cases.

### Loading a Template

1. Click **Templates** in the header
2. Browse available templates by category:
   - **Complete Workflows**: Full end-to-end examples
   - **Chatbots**: Conversational AI patterns
   - **Data Processing**: API integration and transformation
   - **Creative**: Content and image generation
3. Click **Use Template** to load it onto your canvas

### Recommended Templates for Beginners

#### 1. Simple Chatbot
- **Best for**: Testing your API keys
- **What it does**: Responds to user messages
- **Nodes**: Start → Prompt → Text Model → End
- **Try it**:
  1. Load template
  2. Ensure OpenAI key is configured
  3. Click Run
  4. Enter: "Tell me a joke"

#### 2. AI Content Generator with Image
- **Best for**: Understanding complex workflows
- **What it does**: Fetches country data → Generates text → Creates image
- **Nodes**: HTTP Request → Conditional → Prompts → Text Models → Image Generation
- **Try it**:
  1. Load template
  2. Configure OpenAI and FAL keys
  3. Click Run
  4. Watch the complete pipeline execute

#### 3. API Data Pipeline
- **Best for**: Learning data transformation
- **What it does**: Fetches user data → Transforms with JavaScript → Structures output
- **Nodes**: HTTP Request → JavaScript → Structured Output
- **Try it**:
  1. Load template (no API keys needed!)
  2. Click Run
  3. See how data flows through transformations

### Modifying Templates

Templates are just starting points—customize them freely:

- Click any node to change its configuration
- Add new nodes by dragging from the palette
- Remove nodes by selecting and pressing `Delete`
- Save your modified version with a new name

---

## Keyboard Shortcuts

Master these shortcuts to work faster:

### Global

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Cmd/Ctrl + /` | Show keyboard shortcuts |
| `Cmd/Ctrl + S` | Save workflow |
| `Cmd/Ctrl + R` | Run workflow |
| `Cmd/Ctrl + E` | Export code |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |

### Canvas

| Shortcut | Action |
|----------|--------|
| `Delete` / `Backspace` | Delete selected node/edge |
| `Cmd/Ctrl + A` | Select all nodes |
| `Cmd/Ctrl + C` | Copy selected nodes |
| `Cmd/Ctrl + V` | Paste nodes |
| `Cmd/Ctrl + D` | Duplicate selected nodes |
| `Space` | Pan mode (hold and drag) |

### View

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + 0` | Fit view to show all nodes |
| `Cmd/Ctrl + Plus` | Zoom in |
| `Cmd/Ctrl + Minus` | Zoom out |

### Node Operations

| Shortcut | Action |
|----------|--------|
| `1` - `9` | Quick add node by type |
| `Esc` | Deselect all |
| `Enter` | Edit selected node |

---

## Advanced Features

### Command Palette

Press `Cmd/Ctrl + K` to access the command palette for quick actions:

- **Add Node**: Type to search node types
- **Templates**: Quick template access
- **Actions**: Run, validate, export, save
- **View**: Zoom, fit view, toggle panels

### Undo/Redo System

The app tracks your workflow history:

- Up to 50 actions stored
- Works across nodes, edges, and configuration changes
- Toolbar buttons show undo/redo availability
- Keyboard shortcuts: `Cmd/Ctrl + Z` and `Cmd/Ctrl + Shift + Z`

### Auto-Save

Your work is automatically saved:

- Saves every 30 seconds
- Visual indicator in bottom left shows save status
- Data stored in browser localStorage
- Recovers automatically if browser crashes

### Validation System

Click **Validate** to check for issues:

- **Errors** (red): Must fix before running
  - Disconnected nodes
  - Cycles in workflow
  - Missing required configurations
  - Missing API keys for AI nodes
  
- **Warnings** (yellow): Recommended to fix
  - Inefficient patterns
  - Best practice violations
  
- **Info** (blue): Helpful suggestions
  - Optimization tips
  - Alternative approaches

Click any issue to zoom to the affected node.

### Version History

For saved workflows, you can:

1. Click **History** button
2. See all previous versions
3. Compare changes
4. Restore any version
5. Branch from a version

### Code Export

Generate TypeScript code from your workflow:

1. Click **Export Code**
2. Choose format:
   - **Next.js API Route**: For server-side execution
   - **React Component**: For client-side execution
   - **Pure Function**: Standalone TypeScript
3. Copy code and use in your project

---

## Troubleshooting

### Common Issues

#### "API key missing" error

**Solution**: Click "API Keys" and add the required provider key. The validation panel shows which keys are needed.

#### Workflow won't run

**Possible causes**:
1. Missing API keys → Add them in API Keys dialog
2. Disconnected nodes → Validation panel shows disconnected nodes
3. Cycles detected → Remove loops in your workflow
4. Invalid configuration → Check nodes for red indicators

#### Node shows error during execution

**Check**:
1. **Input data**: Is the previous node providing correct data?
2. **Configuration**: Are all required fields filled?
3. **API limits**: Have you exceeded provider rate limits?
4. **Network**: Is your internet connection stable?

**Debug tips**:
- Use JavaScript nodes to log intermediate data: `console.log(input1); return input1`
- Check execution panel for detailed error messages
- Test API endpoints separately in Postman/Bruno

#### Image generation fails

**Common reasons**:
1. **No FAL API key**: Image generation requires FAL or similar provider
2. **Invalid prompt**: Some words may be filtered by safety systems
3. **Rate limits**: Wait a minute and try again

#### Template loads but doesn't work

**Steps**:
1. Check which API keys the template requires (hover over nodes)
2. Add missing keys in API Keys dialog
3. Validate workflow to see specific issues
4. Start with a simpler template to test your setup

### Best Practices

1. **Start small**: Begin with simple templates before building complex workflows
2. **Save often**: Use Cmd/Ctrl + S frequently (even though auto-save is enabled)
3. **Name clearly**: Give nodes descriptive labels to track data flow
4. **Test incrementally**: Add and test one node at a time
5. **Use validation**: Check for issues before running
6. **Read errors**: Execution panel provides detailed error messages
7. **Version control**: Save major changes as new versions

### Getting Help

- **In-app**: Use the validation panel to identify issues
- **Documentation**: Refer to this guide's relevant sections
- **API Providers**: Check provider status pages if APIs fail
  - OpenAI: https://status.openai.com/
  - Anthropic: https://status.anthropic.com/
  - FAL: https://status.fal.ai/

---

## Next Steps

Now that you understand the basics:

1. **Experiment**: Load the "AI Content Generator with Image" template and modify it
2. **Build**: Create a workflow for a real use case you have
3. **Share**: Export your workflow JSON to share with colleagues
4. **Learn**: Try progressively complex templates
5. **Optimize**: Use validation suggestions to improve workflows

**Pro tip**: Start by recreating the example workflows from scratch. This helps internalize the concepts better than just loading templates.

---

## Quick Reference

### When to Use Each Node

| I want to... | Use this node |
|-------------|---------------|
| Start my workflow | Start |
| End my workflow | End |
| Generate text | Text Model |
| Format text with variables | Prompt |
| Make a decision | Conditional |
| Call an API | HTTP Request |
| Transform data | JavaScript |
| Generate an image | Image Generation |
| Convert text to speech | Audio |
| Ensure output format | Structured Output |
| Create vector embeddings | Embedding Model |

### Model Recommendations

| Use case | Recommended model |
|----------|------------------|
| Fast, cheap text generation | `openai/gpt-4o-mini` |
| Complex reasoning | `openai/gpt-4o` or `anthropic/claude-sonnet-4` |
| Image generation | `black-forest-labs/flux-1.1-pro` |
| Embeddings | `openai/text-embedding-3-small` |
| Very fast inference | `groq/llama-3.3-70b` |

---

**Happy building!** Remember: Every complex workflow starts with a simple Start→End connection. Add nodes one at a time, test frequently, and iterate.
