# AI Agent Builder - Roadmap Implementation Guide

## Document Purpose

This guide provides a structured approach to implementing the features outlined in `/docs/development-roadmap-prompts.md`. It serves as a bridge between the roadmap's vision and actual development work, with prioritization based on impact, dependencies, and technical complexity.

---

## Executive Summary

The AI Agent Builder roadmap spans **5 phases over 20 weeks**, addressing critical gaps in UX, reliability, collaboration, and intelligence. This implementation guide identifies:

- **Quick Wins**: Features that can be implemented in 1-2 days with high user impact
- **Critical Path Items**: Dependencies that block other features
- **Technical Debt**: Security and performance issues that must be addressed
- **Strategic Enhancements**: Features that differentiate the product long-term

---

## Current State Assessment

### Strengths
- Functional visual workflow designer with 12+ node types
- Real-time execution with AI SDK v5 integration
- TypeScript code generation and export
- Modern tech stack (Next.js 15, React 19, ReactFlow)

### Critical Gaps
- **No persistence beyond localStorage** - workflows lost on browser clear
- **No undo/redo** - editing mistakes are permanent
- **No validation** - users can create invalid workflows
- **Security vulnerabilities** - SSRF risks, no cycle detection, no sandboxing
- **Limited debugging** - no execution history or step-through capabilities
- **No collaboration** - single-user only, no sharing or templates

### User Pain Points
1. Fear of making mistakes (no undo)
2. Frustration with slow node configuration (no keyboard shortcuts)
3. Difficulty debugging complex workflows (no visibility into execution)
4. Starting from scratch every time (no templates)
5. Data loss anxiety (no cloud backup)

---

## Implementation Strategy

### Phase 0: Immediate Priorities (Week 0 - Before Phase 1)

These items should be addressed ASAP as they affect current usability and security:

#### 1. Fix Current API Key Implementation (1 day)
**Status**: Recently implemented but needs refinement
**Issues**:
- API keys stored in localStorage (security concern)
- No encryption
- No validation before execution
- Missing provider detection logic

**Action Items**:
- Add API key validation before workflow execution
- Implement visual indicators for missing/invalid keys
- Add encryption for stored keys (crypto-js or Web Crypto API)
- Create clear setup guide for first-time users

#### 2. Add Basic Error Handling (1 day)
**Current Issue**: Errors are logged to console but not surfaced to users
**Implementation**:
- Add toast notifications for execution errors
- Display API-specific error messages (rate limits, auth failures)
- Add error boundaries for UI components
- Log errors with context (node ID, workflow state)

#### 3. Security Audit & Hardening (2 days)
**Critical vulnerabilities to address**:
- SSRF prevention in HTTP Request nodes
- Cycle detection before execution
- Input sanitization for all user-provided data
- Rate limiting on API routes
- Validation of AI model outputs before chaining

---

## Phase 1: Foundation & UX Polish (Weeks 1-4)

### Priority Order

#### Week 1: Undo/Redo System
**Why First**: Blocks user confidence in editing workflows
**Dependencies**: None
**Prompt**: Use "Phase 1, Feature 1" from roadmap
**Success Criteria**:
- Ctrl+Z/Ctrl+Shift+Z works for all canvas operations
- History persists across page refreshes
- Limit to 50 operations for performance
- Visual indication of undo/redo availability

**Implementation Notes**:
- Use Zustand middleware for history tracking
- Store node positions, connections, configurations
- Ignore non-destructive operations (hover, selection without changes)

#### Week 2: Workflow Validation Engine
**Why Second**: Prevents invalid workflows from wasting API credits
**Dependencies**: None
**Prompt**: Use "Phase 1, Feature 2" from roadmap
**Success Criteria**:
- Real-time validation with visual indicators
- Validation panel showing all issues
- Block execution until critical errors fixed
- Warning for non-critical issues

**Validation Rules**:
- No cycles in workflow graph
- All required node inputs connected
- API keys present for AI nodes
- Valid JSON schemas for structured output
- HTTP URLs properly formatted

#### Week 3: Auto-Save System
**Why Third**: Addresses data loss anxiety
**Dependencies**: None (localStorage initially, cloud storage in Phase 4)
**Prompt**: Use "Phase 1, Feature 3" from roadmap
**Success Criteria**:
- Auto-save every 30 seconds
- Save on node creation, deletion, connection changes
- Visual indicator of save status
- Version history (last 5 auto-saves)

**Implementation Notes**:
- Use debounced save to prevent performance issues
- Store workflow snapshots with timestamps
- Add "Restore previous version" dropdown

#### Week 4: Keyboard Shortcuts & Command Palette
**Why Fourth**: Significantly improves power user efficiency
**Dependencies**: None
**Prompts**: Use "Phase 1, Features 4-5" from roadmap
**Success Criteria**:
- Cmd+K opens command palette
- Fuzzy search for all actions
- Common shortcuts: delete (Del), duplicate (Cmd+D), select all (Cmd+A)
- Visual shortcut hints in menus

**Shortcuts to Implement**:
\`\`\`
Cmd+K - Command palette
Cmd+Z - Undo
Cmd+Shift+Z - Redo
Cmd+S - Manual save
Cmd+Enter - Execute workflow
Del - Delete selected
Cmd+D - Duplicate selected
Cmd+A - Select all
Cmd+/ - Toggle shortcuts panel
Space - Pan mode
Cmd+Plus/Minus - Zoom
Cmd+0 - Fit view
\`\`\`

---

## Phase 2: Advanced Node Capabilities (Weeks 5-8)

### Priority Order

#### Week 5: Enhanced Prompt Editor
**Why First**: Most commonly used node type
**Dependencies**: None
**Prompt**: Use "Phase 2, Feature 1" from roadmap
**Features**:
- Syntax highlighting for {{variables}}
- Autocomplete for available variables
- Multi-line editing with proper formatting
- Template library for common prompts

#### Week 6: Conditional Logic Node Improvements
**Why Second**: Critical for complex workflows
**Dependencies**: Validation system (Phase 1)
**Prompt**: Use "Phase 2, Feature 2" from roadmap
**Features**:
- Visual condition builder (no code required)
- Support for AND/OR/NOT operations
- Type-aware comparisons (string, number, boolean)
- Test mode to preview evaluation

#### Week 7: HTTP Request Node Enhancement
**Why Third**: Key for integrations
**Dependencies**: Security audit (Phase 0)
**Prompt**: Use "Phase 2, Feature 3" from roadmap
**Features**:
- Support all HTTP methods
- Headers and query params configuration
- Request body editor (JSON, form data)
- Response preview and error handling
- Common API templates (REST, GraphQL)

#### Week 8: Schema Builder for Structured Output
**Why Fourth**: Improves structured data workflows
**Dependencies**: None
**Prompt**: Use "Phase 2, Feature 4" from roadmap
**Features**:
- Visual schema builder (drag-and-drop)
- Common schema templates (person, address, etc.)
- Schema validation preview
- Import/export schemas as JSON

---

## Phase 3: Execution & Debugging (Weeks 9-12)

### Priority Order

#### Week 9: Execution History
**Why First**: Foundation for debugging features
**Dependencies**: Auto-save system (Phase 1)
**Prompt**: Use "Phase 3, Feature 4" from roadmap
**Features**:
- Store last 20 executions
- View inputs/outputs for each node
- Execution timestamp and duration
- Filter by success/failure
- Re-run from history

#### Week 10: Timeline Debugger
**Why Second**: Most requested debugging feature
**Dependencies**: Execution history (Week 9)
**Prompt**: Use "Phase 3, Feature 1" from roadmap
**Features**:
- Visual timeline of node execution order
- Step forward/backward through execution
- Pause between nodes
- Inspect variables at each step
- Highlight current executing node

#### Week 11: Breakpoints System
**Why Third**: Advanced debugging for complex workflows
**Dependencies**: Timeline debugger (Week 10)
**Prompt**: Use "Phase 3, Feature 2" from roadmap
**Features**:
- Click nodes to toggle breakpoints
- Conditional breakpoints (break if error)
- Inspect state when paused
- Continue/step over/step into controls

#### Week 12: Performance Profiling
**Why Fourth**: Optimization for production workflows
**Dependencies**: Timeline debugger (Week 10)
**Prompt**: Use "Phase 3, Feature 3" from roadmap
**Features**:
- Token usage per node
- Execution time per node
- Cost estimation per run
- Identify bottlenecks
- Optimization suggestions

---

## Phase 4: Collaboration & Templates (Weeks 13-16)

### Priority Order

#### Week 13: Authentication System
**Why First**: Blocks all collaboration features
**Dependencies**: None
**Prompt**: Use "Phase 4, Feature 4" from roadmap
**Technology Decision**:
- **Option A**: Supabase Auth (recommended - fast, includes DB)
- **Option B**: NextAuth.js (more flexibility)
- **Option C**: Clerk (premium features)

**Features**:
- Email/password signup
- OAuth (Google, GitHub)
- Session management
- User profile

#### Week 14: Cloud Storage & Sync
**Why Second**: Enables multi-device access
**Dependencies**: Authentication (Week 13)
**Prompt**: Use "Phase 4, Feature 5" from roadmap
**Implementation**:
- Migrate from localStorage to Supabase/Postgres
- Real-time sync across devices
- Conflict resolution (last-write-wins initially)
- Offline mode with sync on reconnect

**Database Schema**:
\`\`\`sql
-- workflows table
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  nodes JSONB NOT NULL,
  edges JSONB NOT NULL,
  viewport JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- executions table
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID REFERENCES workflows(id),
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL,
  node_results JSONB,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  nodes JSONB NOT NULL,
  edges JSONB NOT NULL,
  thumbnail_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### Week 15: Template Gallery
**Why Third**: Accelerates user onboarding
**Dependencies**: Cloud storage (Week 14)
**Prompt**: Use "Phase 4, Feature 1" from roadmap
**Features**:
- Browse templates by category
- Preview before using
- One-click workflow creation from template
- Save current workflow as template
- Community templates (Phase 5)

**Initial Template Categories**:
- Data Processing (CSV transform, JSON parsing)
- Content Generation (blog posts, social media)
- Web Scraping (extract + summarize)
- API Integration (Airtable, Notion, Slack)
- Image Processing (generate + enhance)
- Multi-Agent Systems (research + writing)

#### Week 16: Version Control & Sharing
**Why Fourth**: Team collaboration foundation
**Dependencies**: Cloud storage (Week 14)
**Prompt**: Use "Phase 4, Features 2-3" from roadmap
**Features**:
- Save named versions (v1.0, v1.1, etc.)
- View version diff
- Restore previous versions
- Share workflows via link (view-only or editable)
- Team workspaces (basic)

---

## Phase 5: Intelligence & Analytics (Weeks 17-20)

### Priority Order

#### Week 17: AI Assistant
**Why First**: High differentiation potential
**Dependencies**: None (can work standalone)
**Prompt**: Use "Phase 5, Feature 1" from roadmap
**Features**:
- Chat interface for workflow building
- "Add a node to summarize the text" → auto-creates + connects node
- Workflow optimization suggestions
- Debug assistance (explain errors)

**AI Assistant Capabilities**:
\`\`\`typescript
interface AssistantAction {
  type: 'create_node' | 'connect_nodes' | 'configure_node' | 'explain_error' | 'optimize_workflow'
  params: Record<string, any>
}
\`\`\`

#### Week 18: Cost Tracking & Budgets
**Why Second**: Critical for production use
**Dependencies**: Execution history (Phase 3)
**Prompt**: Use "Phase 5, Feature 2" from roadmap
**Features**:
- Real-time cost estimation before execution
- Cost breakdown by node and model
- Budget alerts (50%, 80%, 100%)
- Monthly spending reports
- Cost comparison between models

**Pricing Database**:
\`\`\`typescript
const MODEL_PRICING = {
  'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
  'gpt-4-turbo': { input: 0.01, output: 0.03 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  // ... etc
}
\`\`\`

#### Week 19: A/B Testing Framework
**Why Third**: Enables experimentation
**Dependencies**: Execution history (Phase 3)
**Prompt**: Use "Phase 5, Feature 3" from roadmap
**Features**:
- Create variants of workflows
- Define success metrics
- Split traffic between variants
- Statistical significance calculator
- Winner recommendation

#### Week 20: Analytics Dashboard
**Why Fourth**: Data-driven optimization
**Dependencies**: Cost tracking (Week 18)
**Prompt**: Use "Phase 5, Feature 4" from roadmap
**Features**:
- Usage patterns (most used nodes, workflows)
- Performance metrics (execution time trends)
- Success/failure rates
- Popular templates
- Team activity (if applicable)

---

## Quick Wins (Can be done anytime)

These features have high impact and low complexity. Implement during "buffer time" or when blocked on larger features:

### 1. Node Color Customization (2 hours)
- Right-click node → Change color
- Helps visual organization
- Store in node data

### 2. Node Notes/Comments (3 hours)
- Add description field to nodes
- Visible on hover or in config panel
- Useful for documentation

### 3. Minimap (1 hour)
- ReactFlow built-in component
- Helps navigate large workflows
- Toggle visibility

### 4. Export Workflow as Image (2 hours)
- Use html-to-image library
- Export PNG/SVG of canvas
- Useful for documentation/sharing

### 5. Dark Mode (4 hours)
- Already using Tailwind with design tokens
- Add theme toggle in header
- Persist preference

### 6. Node Search/Filter (3 hours)
- Search bar in node palette
- Filter by category or name
- Recent/favorite nodes

### 7. Connection Validation (2 hours)
- Type checking when connecting nodes
- Visual feedback (green = valid, red = invalid)
- Prevent incompatible connections

### 8. Zoom to Node (1 hour)
- Double-click node in list to focus
- Useful for large workflows
- Add to context menu

---

## Technical Debt & Security Fixes

### Critical (Do before Phase 4)

#### 1. SSRF Prevention in HTTP Node
**Risk**: Users can make requests to internal services
**Fix**:
\`\`\`typescript
const BLOCKED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254']
const BLOCKED_PORTS = [22, 23, 25, 3306, 5432, 6379]

function validateUrl(url: string): boolean {
  const parsed = new URL(url)
  if (BLOCKED_HOSTS.includes(parsed.hostname)) return false
  if (BLOCKED_PORTS.includes(parseInt(parsed.port))) return false
  if (parsed.hostname.endsWith('.internal')) return false
  return true
}
\`\`\`

#### 2. Cycle Detection
**Risk**: Infinite loops can crash browser or waste API credits
**Fix**:
\`\`\`typescript
function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  // Implement topological sort or DFS cycle detection
  const graph = buildAdjacencyList(nodes, edges)
  return detectCycle(graph)
}
\`\`\`

#### 3. Input Sanitization
**Risk**: XSS attacks through node configurations
**Fix**:
- Sanitize all user input before storing
- Use DOMPurify for HTML content
- Validate JSON schemas
- Escape special characters in prompts

#### 4. Rate Limiting
**Risk**: API abuse, cost overruns
**Fix**:
\`\`\`typescript
// In API routes
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 req/min
})
\`\`\`

### Medium Priority

#### 5. Code Splitting
**Issue**: Large bundle size (ReactFlow + AI SDK)
**Fix**:
- Lazy load node components
- Dynamic imports for heavy libraries
- Analyze with @next/bundle-analyzer

#### 6. Memory Leaks
**Issue**: Long-running sessions may leak memory
**Fix**:
- Cleanup ReactFlow listeners on unmount
- Clear execution results after time
- Monitor with React DevTools Profiler

#### 7. Error Recovery
**Issue**: Unhandled errors crash entire app
**Fix**:
- Error boundaries around canvas, panels, nodes
- Graceful degradation
- Automatic error reporting (Sentry)

---

## Success Metrics

### Phase 1 Success Criteria
- Users can undo/redo 100% of operations
- Invalid workflows are blocked from execution
- Zero data loss incidents (auto-save)
- 50%+ of users use keyboard shortcuts

### Phase 2 Success Criteria
- Prompt editing time reduced by 40%
- Conditional node error rate < 5%
- HTTP integrations work first try 70%+ of time

### Phase 3 Success Criteria
- Users can replay and inspect past executions
- Debug time reduced by 60%
- Users identify performance issues proactively

### Phase 4 Success Criteria
- 80%+ of workflows stored in cloud
- Template usage in 50%+ of new workflows
- Zero sync conflicts reported

### Phase 5 Success Criteria
- AI assistant successfully creates nodes 90%+ of time
- Users stay within budget 95%+ of time
- A/B tests drive 20%+ performance improvements

---

## Implementation Best Practices

### Before Starting Each Feature

1. **Read the specific prompt** from development-roadmap-prompts.md
2. **Check dependencies** - ensure prerequisite features are complete
3. **Review current codebase** - understand existing patterns
4. **Plan data model** - how will this be stored/retrieved?
5. **Design UI first** - sketch or wireframe before coding
6. **Write tests** - especially for validation and execution logic

### Development Workflow

1. **Create feature branch**: `git checkout -b feature/undo-redo`
2. **Implement incrementally**: Break into smaller commits
3. **Test thoroughly**: Manual + automated testing
4. **Update documentation**: README, inline comments
5. **Get feedback**: Have others test the feature
6. **Merge to main**: After validation

### Code Quality Standards

- **TypeScript strict mode**: No `any` types
- **Component modularity**: Max 300 lines per file
- **Error handling**: All async operations wrapped in try-catch
- **Performance**: ReactFlow nodes memoized, heavy operations debounced
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support
- **Testing**: Unit tests for utils, integration tests for workflows

---

## Common Pitfalls to Avoid

### 1. Over-Engineering Early
**Problem**: Building complex abstractions before understanding requirements
**Solution**: Start simple, refactor when patterns emerge

### 2. Ignoring ReactFlow Best Practices
**Problem**: Performance issues with many nodes
**Solution**: Use memoization, connection validation, viewport optimization

### 3. Client-Side Only Validation
**Problem**: Security vulnerabilities
**Solution**: Always validate on server, client validation is UX only

### 4. Tight Coupling to AI Providers
**Problem**: Hard to switch models or add providers
**Solution**: Abstract behind provider interface

### 5. Not Planning for Scale
**Problem**: Features work for 10 nodes but break at 100
**Solution**: Test with realistic workflow sizes

### 6. Ignoring Mobile Users
**Problem**: Canvas unusable on tablets/phones
**Solution**: Responsive design, touch-friendly controls (future consideration)

---

## When to Deviate from Roadmap

The roadmap is a guide, not a mandate. Deviate when:

1. **User feedback indicates different priorities**
   - If users are screaming for feature X, build it even if it's Phase 5

2. **Technical blockers emerge**
   - If a dependency is harder than expected, pivot to unblocked work

3. **Market changes**
   - Competitor launches feature that becomes table-stakes

4. **Resource constraints**
   - Team smaller than expected, focus on MVP features

5. **Better solution discovered**
   - New library/approach makes feature 10x easier

**Process for changes**:
- Document the reason for deviation
- Update this implementation guide
- Communicate to stakeholders
- Re-assess downstream dependencies

---

## Next Steps

### Immediate Actions (Today)

1. **Review Phase 0 priorities** - Fix API key security and error handling
2. **Set up development environment** - Ensure all devs have same setup
3. **Create project board** - GitHub Projects or Linear
4. **Schedule kick-off meeting** - Align team on Phase 1 goals

### Week 1 Actions

1. **Start undo/redo implementation** - Use Phase 1, Feature 1 prompt
2. **Set up testing framework** - Jest + React Testing Library
3. **Document current architecture** - Update diagrams in /docs
4. **Create design system** - Standardize colors, spacing, components

### Ongoing Activities

- **Weekly demos** - Show progress, get feedback
- **Bi-weekly retrospectives** - What's working, what's not
- **Monthly roadmap reviews** - Adjust priorities based on learnings
- **Continuous user testing** - Validate features with real users

---

## Appendix: Feature Cross-Reference

| Feature | Roadmap Location | Dependencies | Estimated Effort |
|---------|-----------------|--------------|------------------|
| Undo/Redo | Phase 1, Feature 1 | None | 3 days |
| Validation | Phase 1, Feature 2 | None | 4 days |
| Auto-Save | Phase 1, Feature 3 | None | 2 days |
| Shortcuts | Phase 1, Feature 4 | None | 2 days |
| Command Palette | Phase 1, Feature 5 | Shortcuts | 3 days |
| Prompt Editor | Phase 2, Feature 1 | None | 4 days |
| Conditional Node | Phase 2, Feature 2 | Validation | 5 days |
| HTTP Node | Phase 2, Feature 3 | Security Audit | 4 days |
| Schema Builder | Phase 2, Feature 4 | None | 5 days |
| Timeline Debugger | Phase 3, Feature 1 | Execution History | 6 days |
| Breakpoints | Phase 3, Feature 2 | Timeline Debugger | 4 days |
| Profiling | Phase 3, Feature 3 | Timeline Debugger | 3 days |
| Execution History | Phase 3, Feature 4 | Auto-Save | 3 days |
| Template Gallery | Phase 4, Feature 1 | Cloud Storage | 5 days |
| Version Control | Phase 4, Feature 2 | Cloud Storage | 4 days |
| Sharing | Phase 4, Feature 3 | Cloud Storage | 3 days |
| Authentication | Phase 4, Feature 4 | None | 4 days |
| Cloud Storage | Phase 4, Feature 5 | Authentication | 5 days |
| AI Assistant | Phase 5, Feature 1 | None | 8 days |
| Cost Tracking | Phase 5, Feature 2 | Execution History | 4 days |
| A/B Testing | Phase 5, Feature 3 | Execution History | 6 days |
| Analytics | Phase 5, Feature 4 | Cost Tracking | 5 days |

**Total Estimated Effort**: ~95 development days (excludes testing, documentation, bug fixes)

---

## Contact & Questions

For questions about implementation:
- Review the specific feature prompt in `/docs/development-roadmap-prompts.md`
- Check existing codebase patterns in similar features
- Consult this implementation guide for dependencies and best practices
- Document decisions in `/docs` folder for future reference

**Remember**: The goal is to build a robust, user-friendly AI workflow builder that empowers users to create complex AI applications without writing code. Every feature should contribute to that mission.

---

*Document Version: 1.0*  
*Last Updated: Based on development-roadmap-prompts.md*  
*Maintained By: Development Team*
