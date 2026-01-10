# TopFlow

**Security-First AI Agent Orchestration Platform**

> Built by a former CISO to demonstrate how to build AI systems with security baked in, not bolted on.

[![License: MIT + Commons Clause](https://img.shields.io/badge/License-MIT%20%2B%20Commons%20Clause-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-5.0-orange)](https://sdk.vercel.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

[![Tests](https://img.shields.io/badge/tests-437%20passing-brightgreen)](TESTING.md)
[![E2E](https://img.shields.io/badge/e2e-5%20smoke%20tests-blue)](E2E_TESTS.md)
[![Coverage](https://img.shields.io/badge/coverage-95%25%20(tested%20modules)-brightgreen)](TESTING.md)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](TESTING.md)

---

## 🎯 Overview

TopFlow is a **privacy-preserving, security-focused** visual workflow builder for creating AI-powered applications. Unlike other no-code AI platforms, TopFlow prioritizes data privacy, security controls, and compliance requirements—making it ideal for security professionals, compliance teams, and privacy-conscious organizations.

### Why TopFlow?

**For CISOs & Security Leaders:**
- Client-side architecture = zero data breach risk
- BYOK (Bring Your Own Key) model = full API key control
- Security-first templates (GDPR, SOC 2, incident response)
- Defense-in-depth across 5 security layers

**For Compliance Officers & DPOs:**
- Pre-built GDPR compliance workflows (Articles 15-35)
- Privacy Impact Assessment automation
- Audit trail generation
- Zero server-side data storage (GDPR Article 5 compliant)

**For AI Engineers:**
- Export production-ready TypeScript code
- Built on Vercel AI SDK v5
- Multi-provider support (OpenAI, Anthropic, Google, Groq)
- Reference architecture for secure AI systems

---

## ✨ Key Features

### 🔒 Privacy-First Architecture

- **Client-Side Only Storage**: All workflows and API keys stored in browser localStorage
- **No Backend Database**: Can't breach what you don't store
- **BYOK Model**: Users provide their own AI provider API keys
- **Zero-Knowledge Design**: Platform never sees your data or credentials

### 🛡️ Security Controls

- **5-Layer Security Model**: Defense-in-depth from browser to AI provider
- **SSRF Prevention**: Blocks private IPs, cloud metadata endpoints
- **Rate Limiting**: 10 requests/minute per IP
- **Input Sanitization**: XSS prevention, CSP headers
- **Sandboxed Execution**: Safe JavaScript evaluation

### 🤖 AI Workflow Builder

- **12 Node Types**: Entry/exit, AI models, data processing, flow control, HTTP requests
- **Multi-Provider Support**: OpenAI, Anthropic, Google, Groq
- **Visual Canvas**: Drag-and-drop workflow design (powered by ReactFlow)
- **Real-Time Validation**: Pre-execution security and configuration checks
- **Streaming Execution**: Live execution logs with progress tracking

### 📋 Security & Compliance Templates

Pre-built workflows for regulated environments:

1. **GDPR Data Access Request** (Article 15)
2. **Right to Erasure** (Article 17)
3. **Data Breach Notification** (Article 33)
4. **Data Portability** (Article 20)
5. **Right to Rectification** (Article 16)
6. **Right to Object** (Article 21)
7. **Records of Processing Activities** (Article 30)
8. **Data Protection Impact Assessment** (Article 35)

Additional templates:
- PII Detection & Redaction Pipeline
- Security Incident Response Workflow
- SOC 2 Control Evidence Collection
- Security Log Analysis with AI

### 🚀 Code Export

- Export workflows as **standalone TypeScript functions**
- Generate **Next.js API routes** (copy-paste ready)
- Full Vercel AI SDK integration
- No vendor lock-in—you own the code

---

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.1.0
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Workflow Canvas**: ReactFlow 12
- **State**: Zustand (undo/redo)
- **AI SDK**: Vercel AI SDK v5
- **TypeScript**: 5.9

### 5-Layer Security Model

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: Client-Side (Browser)                          │
│ - Input sanitization, XSS prevention, CSP headers       │
│ - API key security (localStorage, HTTPS only)           │
├─────────────────────────────────────────────────────────┤
│ Layer 2: Transport (HTTPS/TLS)                          │
│ - TLS 1.3, HSTS headers, Secure cookies                 │
├─────────────────────────────────────────────────────────┤
│ Layer 3: API Gateway (Vercel Edge)                      │
│ - Rate limiting (10 req/min), DDoS protection           │
│ - Request validation                                     │
├─────────────────────────────────────────────────────────┤
│ Layer 4: Execution Layer (Serverless)                   │
│ - SSRF prevention, Cycle detection, Timeout enforcement │
│ - Input validation (Zod), Sandboxed JavaScript          │
├─────────────────────────────────────────────────────────┤
│ Layer 5: External APIs (AI Providers)                   │
│ - HTTPS-only, User-provided credentials (BYOK)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- AI provider API key (OpenAI, Anthropic, Google, or Groq)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/topflow.git
cd topflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Workflow

1. **Try Demo Mode**: Click any template to see cached execution results (no API key required)
2. **Add API Keys**: Click "API Settings" → Add your OpenAI/Anthropic key
3. **Build a Workflow**:
   - Drag nodes from left palette onto canvas
   - Connect nodes to create data flow
   - Configure nodes in right panel
   - Click "Validate" to check for errors
   - Click "Execute" to run workflow
4. **Export Code**: Click "Export Code" → Copy TypeScript function

---

## 📖 Documentation

- **[Architecture Documentation](docs/architecture/)** - Technical deep dives
- **[User Guides](docs/guides/)** - How-to guides and tutorials
- **[Development Docs](docs/development/)** - Contributing and development setup
- **[Testing Documentation](TESTING.md)** - Test coverage, running tests, and contributing tests
- **[CLAUDE.md](CLAUDE.md)** - Project instructions for AI assistants (private, not in public repo)

---

## 🔐 Security Features

### SSRF Prevention

TopFlow blocks requests to:
- Private IP ranges (10.x, 172.16.x, 192.168.x)
- Localhost (127.0.0.1, ::1)
- Cloud metadata endpoints (AWS, GCP, Azure)
- Link-local addresses (169.254.x.x)

### Validation Pipeline

Pre-execution checks include:
- **Structural**: Cycle detection, orphan nodes, missing start/end
- **Configuration**: Missing required fields, invalid models
- **Security**: SSRF detection, blocked hosts
- **API Keys**: Required provider keys for selected models

**Scoring System**: 100-point scale with letter grades (A-F)
- Errors: -10 each (blocks execution)
- Warnings: -10 each (doesn't block)

### Rate Limiting

- **10 requests/minute per client IP**
- In-memory store with timestamp-based reset
- Returns 429 status on exceed

---

## 🎯 Use Cases

### Security & Compliance Automation

- GDPR data subject rights automation
- Data breach notification workflows
- Privacy impact assessments
- SOC 2 evidence collection

### Incident Response

- Security log aggregation and analysis
- Threat intelligence correlation
- Automated containment workflows
- Stakeholder notification automation

### Privacy-Preserving AI

- PII detection and redaction
- Sensitive data classification
- Privacy-safe data analysis
- Consent management automation

---

## 🛠️ Development

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

**Package Manager**: This project uses `pnpm` (not npm or yarn).

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development guidelines.

---

## 📊 Project Status

This is a **professional showcase project** demonstrating:
- Security-first AI architecture patterns
- Privacy-preserving design principles
- Enterprise-grade security controls
- Compliance-conscious AI workflows

**Current Phase**: Building core platform and security-focused templates

**Roadmap**:
- ✅ Phase 1: Core workflow builder with 12 node types
- ✅ Phase 2: GDPR compliance workflows (Articles 15-35)
- 🚧 Phase 3: SOC 2 and HIPAA templates
- 📋 Phase 4: Advanced security integrations (SIEM, IDS, threat intel)

---

## 🤝 Contributing

We welcome contributions, especially:
- Security-focused workflow templates
- Compliance automation patterns
- Privacy-preserving integrations
- Security vulnerability reports

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the **MIT License with Commons Clause** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ **You CAN**:
- Use TopFlow freely for internal purposes
- Modify and customize the code
- Export and deploy workflows in your organization
- Contribute to the project
- Fork and distribute the code

❌ **You CANNOT**:
- Sell TopFlow as a hosted service or SaaS product
- Offer commercial consulting/hosting services based primarily on TopFlow
- Create a competing commercial product derived from TopFlow

### Why Commons Clause?

The Commons Clause protects the project from being commercialized by third parties while keeping it freely available for internal use. This ensures:
- The project remains sustainable and focused
- Companies can use TopFlow internally without restrictions
- Contributors' work isn't exploited for commercial gain without permission
- A clear path exists for commercial licensing partnerships

**Need a commercial license?** Contact us at [INSERT YOUR CONTACT EMAIL OR WEBSITE HERE]

---

## 🌟 Why "Security First"?

Most AI workflow builders treat security as an afterthought. TopFlow is different:

1. **Zero-Trust Architecture**: Client-side storage, BYOK model, no backend database
2. **Compliance-Conscious**: Built-in GDPR, SOC 2, HIPAA workflows
3. **Defense-in-Depth**: 5-layer security model from browser to AI provider
4. **Built by Security Professionals**: Designed by a former CISO with security experience
5. **Audit-Ready**: Immutable logs, evidence generation, SHA256 hashes

**Mission**: Demonstrate that AI-powered automation can be both powerful AND secure.

---

## 🔗 Links

- **Live Demo**: [topflow.dev](https://topflow.dev) *(coming soon)*
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/topflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/topflow/discussions)

---

## 💡 For Security Professionals

If you're evaluating AI adoption for your organization, TopFlow demonstrates:

- How to implement privacy-preserving AI architectures
- Security controls for AI workflow automation
- Compliance automation patterns (GDPR, SOC 2, HIPAA)
- Defense-in-depth strategies for AI systems
- BYOK models that give users full control

**Use this as a reference architecture** for building secure AI systems in your organization.

---

**Built with ❤️ by security professionals, for security professionals.**
