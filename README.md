# GitHub Security Scanner by Former CISO

<div align="center">

[![Live Scanner](https://img.shields.io/badge/🚀_Try_Scanner-30_Seconds-brightgreen?style=for-the-badge)](https://topflow.dev/builder?template=github-security-scanner)
[![Built by CISO](https://img.shields.io/badge/Built_by-Former_CISO-blue?style=for-the-badge)](https://topflow.dev/about)
[![GitHub Stars](https://img.shields.io/github/stars/csupenn/topflow?style=for-the-badge&color=yellow)](https://github.com/csupenn/topflow/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Security](https://img.shields.io/badge/Security-A+-green?style=for-the-badge)](https://topflow.dev/docs/security)

<img src="public/demo-assets/images/github-security-dashboard.webp" alt="GitHub Security Scanner Dashboard" width="100%">

**Analyze a GitHub repository's security posture in 30 seconds.**

Powered by [TopFlow](https://topflow.dev), a secure AI workflow platform.

[🎯 Scan facebook/react](https://topflow.dev/builder?template=github-security-scanner&repo=facebook/react) • [📖 How It Works](https://topflow.dev/docs) • [⭐ Star on GitHub](https://github.com/csupenn/topflow)

</div>

---

## 🔍 Example Scan: facebook/react

**Score**: 95/100 (Grade: **A+**) ⭐

| Area | Result |
|------|--------|
| Security controls | Security policy, code scanning, Dependabot, branch protection, and secret scanning detected |
| Vulnerabilities | 0 critical, 1 high, 3 medium, 7 low |
| OWASP coverage | 8 of 10 controls passing |
| Recommendations | Add GPG commit signing and expand SAST coverage |

**Try it yourself** → [Scan any repo in 30 seconds](https://topflow.dev/builder?template=github-security-scanner)

**No signup. No API keys required (demo mode active).**

---

## 🚀 What You Get in 30 Seconds

| Capability | What it includes |
|------------|------------------|
| Security analysis | OWASP Top 10 checks, vulnerability severity summary, dependency and license risk review, code quality signals, and branch protection checks |
| Actionable guidance | Prioritized recommendations, effort estimates, and impact notes for the most important fixes |
| Shareable outputs | Markdown reports, JSON data, pre-filled scan links, social cards, and auto-updating security badges |
| Badge API | Daily-updated badges for README files, docs, and security dashboards |

**Live badge example:**

```markdown
[![Security Score](https://topflow.dev/api/badge/facebook/react)](https://topflow.dev/showcase/security-scanner)
```

[![Security Score](https://topflow.dev/api/badge/facebook/react)](https://topflow.dev/showcase/security-scanner)

**👉 [Try the Interactive Showcase](https://topflow.dev/showcase/security-scanner)** | **[Scan in Builder](https://topflow.dev/builder?template=github-security-scanner)**

---

## 🎨 Interactive Showcase

Explore the scanner UI, compare repository scores, and copy badge snippets:

**🔗 [topflow.dev/showcase/security-scanner](https://topflow.dev/showcase/security-scanner)**

**What's included**:
- 🏆 Competitive leaderboard for open-source projects
- 📊 Dashboard preview with scan results
- 🎯 Badge snippets for Markdown, HTML, and RST
- 📱 Social sharing cards for Twitter and LinkedIn
- ⚡ Quick scan for any public GitHub repo

**Popular Repo Scores**:
- facebook/react - **A+** (95/100)
- aquasecurity/trivy - **A** (90/100)
- django/django - **B+** (85/100)

---

## 🚀 Coming Soon: Google OSV Integration

The scanner is adding Google OSV vulnerability data for real CVE results across npm, PyPI, Go, Rust, Maven, Ruby, and PHP projects.

| Upgrade | Benefit |
|---------|---------|
| Real OSV data | Replace demo vulnerability summaries with authoritative CVE results |
| Commit and manifest scans | Scan a repository, a commit, or direct dependency manifest content |
| Reusable OSV node | Add vulnerability checks to custom TopFlow workflows |
| Private repo support | Use a GitHub PAT stored client-side in localStorage |

Example workflows this enables:
- CI/CD Security: OSV scan → Slack alert for critical vulnerabilities
- Multi-Repo Audit: repo list → OSV scan → aggregate dashboard
- Dependency Report: OSV scan → Markdown or JSON export

Demo mode will remain available for instant scans without API keys.

---

## 🔒 Built by Former CISO - Security You Can Trust

This isn't just another GitHub scanner. It's built with **enterprise-grade security architecture** by someone who understands the stakes.

**Why Trust This Scanner?**

<table>
<tr>
<td>✅ **Privacy-First**<br/>All analysis runs client-side (zero data sent to servers)</td>
<td>✅ **BYOK Model**<br/>Use your own API keys (or try demo mode)</td>
</tr>
<tr>
<td>✅ **No Tracking**<br/>Zero analytics, zero data collection</td>
<td>✅ **Open Source**<br/>Audit the code yourself on GitHub</td>
</tr>
<tr>
<td>✅ **Production Code**<br/>Export TypeScript for your own tools</td>
<td>✅ **5-Layer Security**<br/>Defense-in-depth architecture</td>
</tr>
</table>

**Built by**: [Charlie Su](https://charliesu.com), Former CISO

---

## 💡 This is a TopFlow Template

**GitHub Security Scanner is 1 of 8 pre-built security workflows** running on the TopFlow platform.

### Explore More Security Templates

<table>
<tr>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=github-security-scanner">
🔍<br/>
<b>GitHub Security Scanner</b><br/>
<sub>Repository security analysis</sub><br/>
<sub>✅ You just tried this!</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=gdpr-data-access">
🛡️<br/>
<b>GDPR Compliance</b><br/>
<sub>Automate data access requests</sub><br/>
<sub>Article 15 workflow</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=pii-detection">
🔐<br/>
<b>PII Detection</b><br/>
<sub>Scan for sensitive data</sub><br/>
<sub>Privacy-preserving pipeline</sub>
</a>
</td>
</tr>
<tr>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=incident-response">
🚨<br/>
<b>Incident Response</b><br/>
<sub>SOC automation workflow</sub><br/>
<sub>Threat analysis with AI</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=soc2-evidence">
📋<br/>
<b>SOC 2 Evidence</b><br/>
<sub>Compliance automation</sub><br/>
<sub>Audit trail generation</sub>
</a>
</td>
<td width="33%" align="center">
<a href="https://topflow.dev/builder?template=vulnerability-scan">
🐛<br/>
<b>Security Templates</b><br/>
<sub>+3 more workflows</sub><br/>
<sub>View all in builder</sub>
</a>
</td>
</tr>
</table>

**All templates include**:
- ✅ Instant demo mode (no API keys needed)
- ✅ Export to production TypeScript
- ✅ Visual workflow editor
- ✅ Security-first architecture

**Want to build your own?** → [Launch TopFlow Builder](https://topflow.dev/builder)

---

## ⚡ Why TopFlow is Different

**The Problem:** Current AI workflow builders store your data, require subscriptions, and lock you into their platforms.

**TopFlow's Solution:** a security-first workflow builder with local storage, bring-your-own-key AI providers, and TypeScript export.

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

---

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
| **Built By** | 🟢 Former CISO | 🔴 SaaS companies |

---

## ✨ Core Features

### 🔒 **Privacy-First Architecture**
```yaml
Your Data: Stored in your browser (localStorage)
Our Servers: Never see your data or API keys
Result: Zero data breach risk
```

### 🛡️ **5-Layer Security Model**
Every request passes through layered security controls:
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

## 🏆 Live Badge API

Add auto-updating security badges to your README:

```markdown
[![Security Score](https://topflow.dev/api/badge/OWNER/REPO)](https://topflow.dev/showcase/security-scanner)
```

**Features**:
- ✅ Auto-updates every 24 hours
- ✅ Color-coded by grade (A+ green, B blue, C yellow, D/F red)
- ✅ In-memory cache for fast response
- ✅ Supports shields.io-style SVG format
- ✅ Works in Markdown, HTML, RST

**Example Badges**:

| Repository | Badge |
|------------|-------|
| facebook/react | [![Security Score](https://topflow.dev/api/badge/facebook/react)](https://topflow.dev/showcase/security-scanner) |
| aquasecurity/trivy | [![Security Score](https://topflow.dev/api/badge/aquasecurity/trivy)](https://topflow.dev/showcase/security-scanner) |
| django/django | [![Security Score](https://topflow.dev/api/badge/django/django)](https://topflow.dev/showcase/security-scanner) |

**API Endpoint**: `GET /api/badge/:owner/:repo`

---

## 🚀 Quick Start

### Option 1: Try the Interactive Showcase (Recommended)

```bash
# Beautiful showcase with leaderboard, examples, and social sharing:
https://topflow.dev/showcase/security-scanner
```

### Option 2: Jump Straight to Builder (30 Seconds)

```bash
# No installation needed - just click:
https://topflow.dev/builder?template=github-security-scanner&repo=facebook/react

# Or scan your own repo:
https://topflow.dev/builder?template=github-security-scanner&repo=YOUR_USERNAME/YOUR_REPO
```

**Demo mode active** - No API keys required for initial testing.

---

### Option 3: Run TopFlow Locally (5 Minutes)

```bash
# Clone and install
git clone https://github.com/csupenn/topflow.git
cd topflow
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

**What you get**:
- ✅ Full workflow builder
- ✅ All 8 security templates
- ✅ Code export functionality
- ✅ Local demo mode (no API keys needed)

---

### Option 4: Use in Your Projects (Advanced)

```bash
# Install the workflow core package
npm install @charliesu/workflow-core
```

```typescript
import { validateWorkflow, executeWorkflow } from '@charliesu/workflow-core'

// Use TopFlow's validation and execution engine
// in your own applications
```

**Use cases**:
- CI/CD security scanning
- Automated compliance checks
- Custom security tooling
- Internal workflow automation

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
<td align="center"><b>OpenAI</b><br/>GPT models</td>
<td align="center"><b>Anthropic</b><br/>Claude models</td>
<td align="center"><b>Google</b><br/>Gemini models</td>
<td align="center"><b>Groq</b><br/>Fast inference</td>
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

- 🔍 **v1.4.0** (Jan 2026) - GitHub Security Scanner with instant demo mode
- 🎉 **v1.3.0** (Jan 2026) - Published @charliesu/workflow-core npm package
- 📝 **v1.2.0** (Jan 2025) - Added GDPR Article 15-35 workflows
- 🚀 **v1.1.0** (Jan 2025) - WebP optimization (97.7% size reduction)
- 🛡️ **v1.0.0** (Dec 2024) - Initial release with 12 node types
- 📊 **8 security templates** - Enterprise-ready workflows
- 🌐 **Open source** - MIT licensed, built in the open

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
<b>8</b><br/>
<sub>Security Templates</sub>
</td>
<td align="center">
<b>12</b><br/>
<sub>Node Types</sub>
</td>
<td align="center">
<b>5</b><br/>
<sub>Security Layers</sub>
</td>
<td align="center">
<b>1</b><br/>
<sub>Former CISO</sub>
</td>
<td align="center">
<b>100%</b><br/>
<sub>Privacy-First</sub>
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

## 🎯 Start with the Scanner, Explore the Platform

<div align="center">

### GitHub Security Scanner is your gateway to secure AI workflows

<a href="https://topflow.dev/builder?template=github-security-scanner">
<img src="https://img.shields.io/badge/🔍_Scan_Any_Repo-Try_Now-brightgreen?style=for-the-badge&labelColor=black" alt="Try Scanner" height="50">
</a>

<br/><br/>

### ⭐ **Love the scanner? Star us on GitHub!**

Your star helps other security teams discover these tools.

<a href="https://github.com/csupenn/topflow">
<img src="https://img.shields.io/github/stars/csupenn/topflow?style=social" alt="GitHub stars">
</a>

</div>

---

<div align="center">
<sub>Built with ❤️ by <a href="https://charliesu.com">Charlie Su</a> • Former CISO • AI Security Advocate</sub>
<br/>
<sub>🔒 Security-first architecture • 🎯 Privacy by design • 🚀 No vendor lock-in</sub>
<br/>
<sub>📧 Contact: <a href="mailto:charlie@topflow.dev">charlie@topflow.dev</a> • 💼 <a href="https://linkedin.com/in/charliesu">LinkedIn</a></sub>
</div>
