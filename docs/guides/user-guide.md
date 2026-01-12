# TopFlow User Guide

**👉 For the most up-to-date documentation, visit [topflow.dev/docs/learn](https://topflow.dev/docs/learn)**

This guide covers everything you need to know about building AI workflows with TopFlow.

## Quick Links

- [Quick Start](https://topflow.dev/docs/learn/quick-start) - Get running in 5 minutes
- [Core Concepts](https://topflow.dev/docs/learn/core-concepts) - Understand the fundamentals
- [Tutorials](https://topflow.dev/docs/learn/tutorials) - Step-by-step guides
- [Node Reference](https://topflow.dev/docs/build/nodes) - All 12 node types
- [Security](https://topflow.dev/docs/security) - Enterprise-grade security

## Why visit the website?

The website documentation includes:
- ✅ Live search functionality
- ✅ Interactive examples
- ✅ Always up-to-date
- ✅ Better navigation
- ✅ Dark mode support

---

## Quick Reference (Offline)

For offline reference, here are the basics:

### Getting Started

1. **Visit**: [topflow.dev](https://topflow.dev)
2. **Add API Keys**: Click "API Keys" → Add your OpenAI/Anthropic/Google/Groq keys
3. **Load Template**: Click "Templates" → Try "Simple Chatbot"
4. **Run**: Click "Run" button → See your AI workflow execute

### Core Concepts

- **Nodes**: Building blocks (AI models, prompts, logic)
- **Edges**: Connections between nodes (data flow)
- **Workflow**: Complete graph from Start to End
- **Validation**: Pre-execution checks (security, config)

### Essential Node Types

| Node Type | Purpose | Example Use |
|-----------|---------|-------------|
| **Start** | Entry point | Every workflow begins here |
| **Prompt** | Format text | `You are a helpful assistant. User says: {{input1}}` |
| **Text Model** | Generate AI text | GPT-4, Claude, Gemini responses |
| **HTTP Request** | Call external APIs | Fetch data from REST endpoints |
| **Conditional** | Branch logic | `if (input1.score > 0.8)` route to different paths |
| **JavaScript** | Transform data | Custom code: `return { result: input1.toUpperCase() }` |
| **End** | Workflow completion | Final output destination |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Command palette |
| `Cmd/Ctrl + S` | Save workflow |
| `Cmd/Ctrl + R` | Run workflow |
| `Cmd/Ctrl + E` | Export code |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Delete` | Delete selected node/edge |

### Quick Troubleshooting

**Issue**: "API key missing" error
- **Fix**: Click "API Keys" button → Add required provider key

**Issue**: Workflow won't run
- **Fix**: Click "Validate" → Check for errors (red indicators)
- Common causes: Missing API keys, disconnected nodes, cycles detected

**Issue**: Node shows error during execution
- **Fix**: Check execution panel for detailed error message
- Verify previous node provided correct data format

### Model Recommendations

| Use Case | Recommended Model |
|----------|------------------|
| Fast, cheap text generation | `openai/gpt-4o-mini` |
| Complex reasoning | `openai/gpt-4o` or `anthropic/claude-sonnet-4` |
| Image generation | `black-forest-labs/flux-1.1-pro` |
| Embeddings | `openai/text-embedding-3-small` |
| Very fast inference | `groq/llama-3.3-70b` |

### Security Features

TopFlow implements enterprise-grade security:

- **SSRF Prevention**: Validates all HTTP requests, blocks private IPs
- **Rate Limiting**: 10 requests/minute per client IP
- **Input Sanitization**: Removes potentially dangerous characters
- **Client-Side Privacy**: All data stored in browser only (GDPR compliant)
- **BYOK Model**: Your API keys never leave your browser

### Code Export

Generate production-ready TypeScript:

1. Click **Export Code** button
2. Choose format:
   - **Next.js API Route** - Server-side execution
   - **React Component** - Client-side execution
   - **Pure Function** - Standalone TypeScript
3. Copy and integrate into your project

---

## Need More Help?

**Comprehensive Documentation**: [topflow.dev/docs](https://topflow.dev/docs)

**Quick Links**:
- [FAQ](https://topflow.dev/docs/learn/faq) - Common questions answered
- [Best Practices](https://topflow.dev/docs/learn/best-practices) - Tips from experts
- [API Reference](https://topflow.dev/docs/build/api) - Technical documentation

**Community**:
- [GitHub Discussions](https://github.com/csupenn/topflow/discussions) - Ask questions
- [GitHub Issues](https://github.com/csupenn/topflow/issues) - Report bugs
- [Security Issues](mailto:charlie@charliesu.com) - Private disclosure

---

**Happy building!** 🚀

*For the complete, always-up-to-date user guide with interactive examples, visit [topflow.dev/docs/learn](https://topflow.dev/docs/learn)*
