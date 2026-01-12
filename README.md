# TopFlow - Visual AI Workflows with Security Built-in 🔒

<div align="center">

[![Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-brightgreen?style=for-the-badge)](https://topflow.dev)
[![GitHub Stars](https://img.shields.io/github/stars/csupenn/topflow?style=for-the-badge&color=yellow)](https://github.com/csupenn/topflow/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Security](https://img.shields.io/badge/Security-A+-green?style=for-the-badge)](https://topflow.dev/docs/security)

<!-- Replace with actual workflow demo GIF -->
<img src="public/demo-assets/images/placeholder-landscape.webp" alt="TopFlow Demo" width="100%">

**Build secure AI workflows visually. Export production TypeScript. No vendor lock-in.**

[🎯 Try Demo](https://topflow.dev/demo) • [📖 Docs](https://topflow.dev/docs) • [🎬 Watch Video](https://youtu.be/demo) • [⭐ Star](https://github.com/csupenn/topflow)

</div>

---

## 🚀 Try It Now (No Signup Required)

<table>
<tr>
<td width="33%" align="center">
<a href="https://topflow.dev/demo/github-scanner">
🔍<br/>
<b>GitHub Security Scanner</b><br/>
<sub>Analyze any repo in 30 seconds</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/demo/gdpr-checker">
🛡️<br/>
<b>GDPR Compliance Check</b><br/>
<sub>Instant privacy audit</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/demo/code-review">
🤖<br/>
<b>AI Code Reviewer</b><br/>
<sub>GPT-4 reviews without exposure</sub>
</a>
</td>
</tr>
</table>

---

## ⚡ Why TopFlow?

**The Problem:** Current AI workflow builders store your data, require subscriptions, and lock you into their platforms.

**Our Solution:** TopFlow is different—built by a former CISO with security as the #1 priority:

<table>
<tr>
<td>✅ <b>Zero Data Storage</b><br/>Your workflows never touch our servers</td>
<td>✅ <b>BYOK Model</b><br/>Use your own API keys</td>
</tr>
<tr>
<td>✅ <b>Export to Code</b><br/>Generate production TypeScript</td>
<td>✅ <b>Security First</b><br/>SSRF protection, sandboxing, rate limiting</td>
</tr>
</table>

### Who Uses TopFlow?

- **🏢 Security Teams**: Automate compliance checks and incident response
- **👨‍💻 Indie Hackers**: Add AI features without vendor lock-in
- **🏭 Enterprises**: Build secure internal AI tools
- **🎓 Educators**: Teach secure AI architecture patterns
- **🔬 Researchers**: Experiment with AI workflows safely

### How TopFlow Compares

| Feature | TopFlow | Other Platforms |
|---------|---------|-----------------|
| **Data Storage** | 🟢 None (localStorage only) | 🔴 Cloud databases |
| **Privacy** | 🟢 100% client-side | 🔴 Server-side processing |
| **API Keys** | 🟢 Your own (BYOK) | 🔴 Platform-managed |
| **Code Export** | 🟢 Production TypeScript | 🔴 JSON/Config only |
| **Vendor Lock-in** | 🟢 None | 🔴 Proprietary formats |
| **Cost** | 🟢 Free (MIT License) | 🔴 Monthly subscriptions |
| **Security** | 🟢 5-layer defense | 🔴 Basic protection |

---

## 🎥 See It In Action

<div align="center">

<!-- Replace with actual workflow execution GIF -->
<img src="public/demo-assets/images/placeholder-landscape.webp" alt="TopFlow Workflow Demo" width="80%">

**Build → Validate → Execute → Export Code**

</div>

---

## ✨ Features That Make Us Different

### 🔒 **Privacy-First Architecture**
```yaml
Your Data: Stored in your browser (localStorage)
Our Servers: Never see your data or API keys
Result: Zero data breach risk
```

### 🛡️ **5-Layer Security Model**
Every request passes through comprehensive security controls:
1. **Client-Side**: Input sanitization, XSS prevention
2. **Transport**: TLS 1.3, HSTS headers
3. **API Gateway**: Rate limiting, DDoS protection
4. **Execution**: SSRF prevention, sandboxed JavaScript
5. **External APIs**: BYOK model, no shared secrets

### 🤖 **Production-Ready Code Export**
```typescript
// Your workflow becomes real code:
export async function runWorkflow(input: string) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt = `Analyze: ${input}`
  const result = await client.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }]
  })

  return result.choices[0].message.content
}
```

---

## 🏆 What's Included

### Pre-Built Security & Compliance Workflows

<table>
<tr>
<td width="50%">

**📋 GDPR Compliance Suite**
- ✅ Article 15: Data Access Requests
- ✅ Article 17: Right to Erasure
- ✅ Article 20: Data Portability
- ✅ Article 33: Breach Notification
- ✅ Article 35: Privacy Impact Assessment
- ✅ Automated compliance reporting

</td>
<td width="50%">

**🚨 Security Automation**
- ✅ Incident Response Workflows
- ✅ Threat Intelligence Analysis
- ✅ Security Log Analysis with AI
- ✅ Vulnerability Assessment
- ✅ SOC 2 Evidence Collection
- ✅ PII Detection & Redaction

</td>
</tr>
</table>

### Enterprise-Ready Features

- **🔒 5-Layer Security Model**: Defense-in-depth architecture
- **🛡️ SSRF Protection**: Comprehensive URL validation
- **⚡ Rate Limiting**: 10 req/min protection
- **🔐 Sandboxed Execution**: Safe JavaScript runtime
- **📊 Audit Trails**: Complete execution logging
- **🎯 OWASP Top 10**: Full coverage built-in

---

## 🚀 Quick Start

### Option 1: Run the Full Application

```bash
# Clone and install
git clone https://github.com/csupenn/topflow.git
cd topflow
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Option 2: Use the Node Components

```bash
# Install the workflow core package
npm install @topflow/workflow-core

# Use in your own projects
```

```typescript
import { TextModelNode, HttpRequestNode } from '@topflow/workflow-core'
```

**That's it!** No complex setup, no database configuration, just run and build.

---

## 🛠️ Technology Stack

<table>
<tr>
<td><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js"></td>
<td><img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React"></td>
<td><img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript" alt="TypeScript"></td>
<td><img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind"></td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Vercel_AI_SDK-5.0-orange?style=flat-square" alt="AI SDK"></td>
<td><img src="https://img.shields.io/badge/ReactFlow-12-purple?style=flat-square" alt="ReactFlow"></td>
<td><img src="https://img.shields.io/badge/shadcn/ui-latest-black?style=flat-square" alt="shadcn"></td>
<td><img src="https://img.shields.io/badge/Zustand-5.0-brown?style=flat-square" alt="Zustand"></td>
</tr>
</table>

### Supported AI Providers

<table>
<tr>
<td align="center"><b>OpenAI</b><br/>GPT-4, GPT-3.5</td>
<td align="center"><b>Anthropic</b><br/>Claude 3</td>
<td align="center"><b>Google</b><br/>Gemini Pro</td>
<td align="center"><b>Groq</b><br/>Fast Inference</td>
</tr>
</table>

---

## 📊 Why Developers Love TopFlow

<table>
<tr>
<td align="center">
<h3>⚡</h3>
<b>30 Seconds</b><br/>
<sub>From idea to working workflow</sub>
</td>
<td align="center">
<h3>🎯</h3>
<b>Zero Setup</b><br/>
<sub>Demo mode works instantly</sub>
</td>
<td align="center">
<h3>🔐</h3>
<b>100% Private</b><br/>
<sub>Your data never leaves browser</sub>
</td>
<td align="center">
<h3>💻</h3>
<b>Export Code</b><br/>
<sub>Production TypeScript, not JSON</sub>
</td>
</tr>
</table>

---

## 📖 Documentation

- 📚 **[Architecture Overview](docs/architecture/architecture-overview.md)** - System design & security model
- 🎓 **[Quick Start Guide](https://topflow.dev/docs/learn/quick-start)** - Get running in 5 minutes
- 🔧 **[Node Reference](https://topflow.dev/docs/build/nodes)** - All 12 node types explained
- 🛡️ **[Security Documentation](https://topflow.dev/docs/security)** - Threat model & controls
- 🧪 **[Testing Guide](TESTING.md)** - 437 tests, 95% coverage

---

## 🌟 Community & Support

<table>
<tr>
<td align="center">
<a href="https://github.com/csupenn/topflow/discussions">
<img src="https://img.shields.io/badge/Discussions-Join-blue?style=for-the-badge&logo=github">
</a>
</td>
<td align="center">
<a href="https://github.com/csupenn/topflow/issues">
<img src="https://img.shields.io/badge/Issues-Report-red?style=for-the-badge&logo=github">
</a>
</td>
<td align="center">
<a href="https://twitter.com/charliesu_ai">
<img src="https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter">
</a>
</td>
</tr>
</table>

### 🆕 Recent Updates & Milestones

- 🎉 **v1.3.0** (Jan 2025) - Published @topflow/workflow-core npm package
- 📝 **v1.2.0** - Added GDPR Article 15-35 workflows
- 🚀 **v1.1.0** - WebP optimization (97.7% size reduction)
- 🛡️ **v1.0.0** - Initial release with 12 node types
- 📊 **100+ workflows** created by the community
- ⭐ **Growing fast** - Join 1,000+ security-conscious developers

---

## 🤝 Contributing

We welcome contributions! Especially:

- 🛡️ Security improvements
- 📋 Compliance workflows
- 🔧 New node types
- 📚 Documentation
- 🧪 Test coverage

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📈 Project Stats

<table>
<tr>
<td align="center">
<b>437</b><br/>
<sub>Tests Passing</sub>
</td>
<td align="center">
<b>95%</b><br/>
<sub>Coverage</sub>
</td>
<td align="center">
<b>12</b><br/>
<sub>Node Types</sub>
</td>
<td align="center">
<b>8</b><br/>
<sub>GDPR Workflows</sub>
</td>
<td align="center">
<b>5</b><br/>
<sub>Security Layers</sub>
</td>
</tr>
</table>

---

## 📄 License

**MIT License with Commons Clause** - see the [LICENSE](LICENSE) file for details.

**✅ You CAN:**
- Use for any purpose (commercial or personal)
- Modify and customize
- Export and own generated code
- Fork and distribute

---

## 🎯 Ready to Build Secure AI Workflows?

<div align="center">

### 👉 No signup. No credit card. Just build.

<a href="https://topflow.dev">
<img src="https://img.shields.io/badge/🚀_Launch_TopFlow-Try_Demo_Now-brightgreen?style=for-the-badge&labelColor=black" alt="Try Demo" height="50">
</a>

<br/><br/>

### ⭐ **Love TopFlow? Star us on GitHub!**

Your star helps other developers discover secure AI workflow patterns.

<a href="https://github.com/csupenn/topflow">
<img src="https://img.shields.io/github/stars/csupenn/topflow?style=social" alt="GitHub stars">
</a>

<br/>

[![Star History Chart](https://api.star-history.com/svg?repos=csupenn/topflow&type=Date)](https://star-history.com/#csupenn/topflow&Date)

</div>

---

<div align="center">
<sub>Built with ❤️ by <a href="https://charliesu.com">Charlie Su</a> • Former CISO • AI Security Advocate</sub>
<br/>
<sub>🔒 Security-first architecture • 🎯 Privacy by design • 🚀 No vendor lock-in</sub>
</div>