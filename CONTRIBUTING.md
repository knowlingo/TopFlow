# Contributing to TopFlow

Thank you for your interest in contributing to TopFlow!

We welcome contributions from security professionals, privacy advocates, compliance experts, and AI engineers who share our vision of building secure, privacy-preserving AI systems. Whether you're fixing a bug, adding a security feature, or contributing a compliance workflow template, your contribution helps make AI safer for everyone.

TopFlow is a **security-first, open-source project** designed to demonstrate how to build AI systems with enterprise-grade security baked in from day one. By contributing, you're helping establish best practices for secure AI development.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Security Vulnerability Reporting](#security-vulnerability-reporting)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Feature Guidelines](#feature-guidelines)

---

## 🤝 Code of Conduct

### Our Commitment

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background, experience level, or identity.

### Expected Behavior

- **Be Respectful**: Treat all contributors with respect and professionalism
- **Be Collaborative**: Work together to solve problems and improve the project
- **Be Security-Conscious**: Prioritize security and privacy in all contributions
- **Be Constructive**: Provide helpful, actionable feedback
- **Be Patient**: Remember that everyone was a beginner once

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Publishing others' private information without permission
- Trolling, insulting/derogatory comments, or personal attacks
- Any conduct that would be inappropriate in a professional setting

---

## 🚀 How to Contribute

### Types of Contributions We Welcome

1. **Security-Focused Workflow Templates**
   - GDPR compliance automation
   - SOC 2 control evidence collection
   - HIPAA privacy workflows
   - Incident response automation
   - Threat intelligence correlation

2. **Privacy-Preserving Integrations**
   - PII detection/redaction tools
   - Data anonymization patterns
   - Encryption integrations
   - Zero-knowledge architectures

3. **Security Improvements**
   - Vulnerability fixes
   - Security control enhancements
   - SSRF prevention improvements
   - Rate limiting optimizations

4. **Documentation**
   - User guides and tutorials
   - Architecture documentation
   - Security best practices
   - Compliance guides

5. **Bug Fixes**
   - UI/UX improvements
   - Performance optimizations
   - Edge case handling

### What We DON'T Accept

TopFlow is focused on security, compliance, and privacy. We **do not accept** contributions that:

- Add general business automation features (marketing, sales, HR workflows)
- Implement consumer-facing functionality unrelated to security/compliance
- Dilute the "security-first" positioning
- Introduce dependencies with known security vulnerabilities
- Bypass security controls for convenience

**Feature Evaluation Criteria**:

All new features should align with TopFlow's mission:
1. **Target Audience** - Useful for CISOs, DPOs, Security Engineers, or Compliance Teams
2. **Security Relevance** - Helps secure AI systems or protect sensitive data
3. **Compliance Value** - Aids regulatory compliance (GDPR, SOC 2, HIPAA, etc.)
4. **Reference Architecture** - Demonstrates secure AI implementation patterns
5. **Brand Alignment** - Reinforces "security-first, built by security professionals" identity

---

## 🔒 Security Vulnerability Reporting

**DO NOT** open a public issue for security vulnerabilities.

### Reporting Process

1. **Email**: charlie@charliesu.com (or open a private security advisory on GitHub)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Response Time**: We aim to respond within 48 hours
4. **Disclosure**: We follow coordinated disclosure practices

### What Counts as a Security Vulnerability?

- SSRF bypasses
- XSS vulnerabilities
- Authentication/authorization issues
- Rate limiting bypasses
- Injection vulnerabilities (SQL, NoSQL, command injection)
- Sensitive data exposure
- Insecure dependencies

### Bug Bounty

We currently do not have a bug bounty program, but we will publicly acknowledge security researchers who responsibly disclose vulnerabilities.

---

## 💻 Development Setup

### Prerequisites

- **Node.js**: 18+ (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- **pnpm**: 9+ (`npm install -g pnpm`)
- **Git**: Latest version
- **AI Provider API Key**: OpenAI, Anthropic, Google, or Groq (for testing)

### Installation

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/topflow.git
cd topflow

# Add upstream remote
git remote add upstream https://github.com/topflow/topflow.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Project Structure

```
topflow/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main application orchestrator
│   ├── layout.tsx         # Root layout
│   └── api/               # API routes
│       └── execute-workflow/  # Workflow execution engine
├── components/            # React components
│   ├── nodes/            # Workflow node types
│   ├── advanced-editors/ # Complex node editors
│   └── ui/               # shadcn/ui components
├── lib/                   # Business logic
│   ├── validation.ts     # Workflow validation + SSRF prevention
│   ├── code-generator.ts # TypeScript code export
│   └── storage.ts        # localStorage abstraction
├── hooks/                 # React hooks
├── docs/                  # Documentation
└── public/               # Static assets
```

### Development Commands

```bash
# Development server (localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint

# Type checking
pnpm type-check
```

### Working with workflow-core Package

TopFlow uses [@charliesu/workflow-core](https://www.npmjs.com/package/@charliesu/workflow-core), a shared workflow execution engine.

**For most contributions**, you don't need to modify workflow-core—just work with TopFlow's codebase.

**If you need to contribute to workflow-core** (e.g., adding new node types, modifying execution logic):

1. **Read the documentation**: See [docs/development/workflow-core/](docs/development/workflow-core/) for complete guides
2. **Quick reference**: Check [docs/development/workflow-core/quick-reference.md](docs/development/workflow-core/quick-reference.md) for common commands
3. **Local development**: Use `pnpm link` to test workflow-core changes in TopFlow

**Quick setup for workflow-core development**:
```bash
# Clone workflow-core
cd /path/to/projects
git clone https://github.com/charliesu/workflow-core.git
cd workflow-core
pnpm install
pnpm build

# Link to TopFlow
pnpm link --global

# In TopFlow directory
cd /path/to/topflow
pnpm link --global @charliesu/workflow-core
pnpm dev
```

For detailed instructions, see **[Workflow-Core Package Guide](docs/development/workflow-core/README.md)**.

---

## 🔄 Pull Request Process

### Before Submitting

1. **Search Existing Issues/PRs**: Check if someone is already working on this to avoid duplicate effort
2. **Create an Issue First**: For significant changes, open an issue to discuss your approach before coding
3. **Align with Project Goals**: Ensure your contribution fits TopFlow's security-first, compliance-focused mission
4. **Include Tests**: Add or update tests to cover your changes (see [Testing Requirements](#testing-requirements))
5. **Update Documentation**: Keep README, guides, and inline documentation in sync with code changes
6. **Run Tests Locally**: Verify all tests pass before submitting (`pnpm test && pnpm build`)

### PR Submission Steps

1. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Your Changes**:
   - Follow coding standards
   - Write clear commit messages
   - Keep commits atomic and focused

3. **Test Thoroughly**:
   - Manual testing in browser
   - Verify no console errors
   - Test edge cases
   - Check security implications

4. **Commit with Conventional Commits**:
   ```bash
   git commit -m "feat: add GDPR Article 21 workflow"
   git commit -m "fix: prevent SSRF in HTTP request node"
   git commit -m "docs: update architecture documentation"
   ```

   **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `security`

5. **Push and Create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a PR on GitHub.

### PR Template

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Security improvement
- [ ] New security/compliance workflow template
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance optimization

## 5-Filter Test (for new features)
- [ ] Target Audience: Would CISO/DPO/Security Engineer care?
- [ ] Security Relevance: Helps secure AI systems or protect data?
- [ ] Compliance Value: Aids regulatory compliance?
- [ ] Reference Architecture: Showcases secure AI patterns?
- [ ] Brand Alignment: Reinforces "built by CISO" identity?

## Testing
[How was this tested?]

## Security Impact
[Does this change affect security? If yes, how?]

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings/errors
- [ ] Security implications considered
```

### Review Process

1. **Automated Checks**: PR must pass linting and type checking
2. **Security Review**: All PRs reviewed for security implications
3. **Code Review**: At least one maintainer approval required
4. **Testing**: Manual testing in development environment
5. **Merge**: Squash and merge to main branch

---

## 📝 Coding Standards

### TypeScript

- **Strict Mode**: All code must pass TypeScript strict mode
- **Type Safety**: No `any` types in business logic (runtime data can use `any`)
- **Interfaces**: Define explicit interfaces for node data types
- **Type Guards**: Use type guards for runtime validation

### React

- **Functional Components**: Use function components, not class components
- **Hooks**: Follow React Hooks rules
- **Memoization**: Use `memo()`, `useMemo()`, `useCallback()` for performance
- **Client Components**: Add `"use client"` directive where needed (Next.js App Router)

### Styling

- **Tailwind-First**: Use Tailwind CSS, not CSS modules or styled-components
- **Responsive**: Mobile-first design (`md:` prefix for desktop)
- **Accessibility**: Follow WCAG 2.1 AA standards
- **Dark Mode**: Support dark mode where applicable

### File Naming

- **Components**: kebab-case files, PascalCase exports
  - `text-model-node.tsx` exports `TextModelNode`
- **Libraries**: kebab-case
  - `workflow-store.ts`, `code-generator.ts`
- **Types**: Export from same file as implementation

### Security Guidelines

- **Input Validation**: Always validate and sanitize user input
- **SSRF Prevention**: Block private IPs and cloud metadata endpoints
- **No eval()**: Use `new Function()` for sandboxed JavaScript execution
- **Rate Limiting**: Implement rate limits on API endpoints
- **HTTPS Only**: All external requests must use HTTPS
- **Dependencies**: Regularly update and audit dependencies

---

## ✅ Testing Requirements

### Manual Testing Checklist

For all PRs, verify:

- [ ] **Functionality**: Feature works as expected
- [ ] **Edge Cases**: Handles errors gracefully
- [ ] **Security**: No security vulnerabilities introduced
- [ ] **Performance**: No significant performance degradation
- [ ] **Responsive**: Works on mobile and desktop
- [ ] **Browser Compatibility**: Works in Chrome, Firefox, Safari, Edge
- [ ] **Console Clean**: No errors or warnings in console

### Security Testing

For security-related changes:

- [ ] **SSRF**: Test with private IPs, cloud metadata endpoints
- [ ] **XSS**: Test with malicious input (`<script>`, event handlers)
- [ ] **Rate Limiting**: Verify rate limits can't be bypassed
- [ ] **Input Validation**: Test with edge cases (empty, null, special chars)
- [ ] **Authentication**: Verify auth/authz logic is correct

### Workflow Testing

For new workflow templates:

- [ ] **Validation**: Workflow passes validation without errors
- [ ] **Execution**: Workflow executes successfully
- [ ] **Error Handling**: Gracefully handles API errors, timeouts
- [ ] **Code Export**: Generated TypeScript code is valid
- [ ] **Documentation**: Template includes clear description and use case

---

## 📚 Documentation Standards

### Code Documentation

- **JSDoc Comments**: Add JSDoc for public functions and complex logic
- **Inline Comments**: Explain "why", not "what" (code should be self-documenting)
- **Type Annotations**: Explicit types for function parameters and return values

Example:
```typescript
/**
 * Validates workflow structure and configuration for security issues.
 *
 * Performs SSRF prevention, cycle detection, and configuration validation.
 *
 * @param nodes - Array of workflow nodes
 * @param edges - Array of workflow edges
 * @param apiKeys - User's AI provider API keys
 * @returns Validation result with errors, warnings, and score
 */
export function validateWorkflow(
  nodes: Node[],
  edges: Edge[],
  apiKeys: Record<string, string>
): ValidationResult {
  // Implementation
}
```

### User-Facing Documentation

- **Guides**: Step-by-step tutorials with screenshots
- **Architecture Docs**: Technical deep dives with diagrams
- **API Docs**: Complete API documentation with examples
- **Security Docs**: Security controls and best practices

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples**:
```
feat(nodes): add threat intelligence aggregation node

Implements a new node type that fetches threat intel from multiple sources
(AbuseIPDB, VirusTotal, AlienVault OTX) and correlates findings.

Closes #123
```

```
security(validation): prevent SSRF via redirect bypass

Previous SSRF validation only checked initial URL. Attackers could use
redirects to reach private IPs. Now validates redirect chains.

CVE-2026-XXXXX
```

---

## 🎯 Feature Guidelines

### Adding a New Node Type

1. **Create node component** in `components/nodes/new-node.tsx`
2. **Define data interface**: `NewNodeData` with typed fields
3. **Register in page.tsx**: Add to `nodeTypes` object
4. **Add to NodePalette**: Include icon and description
5. **Implement configuration UI**: Add case to `NodeConfigPanel`
6. **Implement execution logic**: Add case to `app/api/execute-workflow/route.ts`
7. **Implement code generation**: Add case to `lib/code-generator.ts`
8. **Add validation rules**: Update `lib/validation.ts` if needed
9. **Write documentation**: Add usage guide to docs
10. **Test thoroughly**: Manual testing + edge cases

### Adding a Security/Compliance Workflow Template

1. **Design workflow**: Map out node graph and data flow
2. **Build in UI**: Create workflow in TopFlow builder
3. **Test execution**: Verify it works end-to-end
4. **Document specification**: Create detailed spec document (see `docs/repositioning-proposal/00-gdpr-ultimate-plan/` for examples)
5. **Add to templates**: Include in template gallery with description
6. **Cache demo data**: Add cached execution for demo mode
7. **Write user guide**: Document use case, setup, and customization

### Template Specification Format

When contributing new workflow templates, include:

- **Overview**: Purpose, business value, and time savings estimate
- **Node-by-Node Flow**: Complete workflow description with data flow
- **Integration Points**: Required APIs and credentials
- **Security Considerations**: Privacy, compliance, and audit trail requirements
- **Customization Options**: Industry-specific adaptations
- **Implementation Guide**: Step-by-step setup instructions
- **Test Cases**: Expected inputs and outputs for validation

---

## 🌟 Recognition

We value all contributions and will:

- Add contributors to README.md
- Credit template authors in workflow descriptions
- Acknowledge security researchers in security advisories
- Highlight significant contributions in release notes

---

## 📞 Questions?

- **General Questions**: Open a [GitHub Discussion](https://github.com/topflow/topflow/discussions)
- **Bug Reports**: Open a [GitHub Issue](https://github.com/topflow/topflow/issues)
- **Security Issues**: Email charlie@charliesu.com
- **Feature Proposals**: Open an issue with the "feature request" label

---

## 📄 License

By contributing to TopFlow, you agree that your contributions will be licensed under the [MIT License with Commons Clause](LICENSE).

**What this means for contributors**:
- Your code contributions are freely available for non-commercial use
- The Commons Clause prevents others from selling your work as a commercial service without permission
- Internal use by organizations remains unrestricted
- All contributors retain the protections of the Commons Clause

---

**Thank you for helping build secure, privacy-preserving AI systems!** 🔒🤖
