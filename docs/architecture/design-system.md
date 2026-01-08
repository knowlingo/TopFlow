# AI Agent Builder Design System

**Version:** 3.0 - Obsidian Theme  
**Last Updated:** January 2026  
**Maintainer:** Development Team

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Node Design Patterns](#node-design-patterns)
7. [Interactions & Animations](#interactions--animations)
8. [Accessibility](#accessibility)
9. [Implementation Guidelines](#implementation-guidelines)

---

## Design Philosophy

### Core Principles

**1. Developer-First Aesthetic**
- Dark mode optimized for extended coding sessions
- High contrast for code readability
- Obsidian-inspired professional color palette
- Minimal visual noise

**2. Visual Hierarchy**
- Clear information architecture
- Consistent spacing patterns
- Strategic use of color and contrast
- Purposeful animations

**3. Performance & Accessibility**
- Fast rendering with minimal reflows
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility

---

## Color System

### Design Tokens

Our color system uses **OKLCH color space** for perceptually uniform colors and better dark mode support. The **Obsidian Theme** provides a sophisticated, neutral palette with vibrant accents.

#### Primary Colors

```css
--primary: oklch(0.7 0.15 195)         /* Vibrant cyan - primary actions */
--primary-foreground: oklch(0.15 0.02 240) /* Deep blue-black text */
```

**Usage:** Primary actions, focus states, active elements, key CTAs

#### Surface & Background Colors

```css
--background: oklch(0.15 0.02 240)     /* Deep blue-black canvas */
--foreground: oklch(0.95 0.01 240)     /* Crisp white text */

--card: oklch(0.18 0.02 240)           /* Elevated card surfaces */
--card-foreground: oklch(0.95 0.01 240)

--popover: oklch(0.18 0.02 240)        /* Floating elements */
--popover-foreground: oklch(0.95 0.01 240)

--panel: oklch(0.12 0.02 240)          /* Darker panels & sidebars */
```

**Surface Hierarchy:**
- `--panel` (0.12): Darkest - sidebars, navigation panels
- `--background` (0.15): Base - main canvas
- `--card` (0.18): Elevated - cards, popovers, dialogs

#### Secondary & Neutral Colors

```css
--secondary: oklch(0.25 0.02 240)      /* Subtle backgrounds */
--secondary-foreground: oklch(0.95 0.01 240)

--muted: oklch(0.25 0.02 240)          /* Disabled/muted states */
--muted-foreground: oklch(0.55 0.01 240) /* Secondary text */

--accent: oklch(0.3 0.03 240)          /* Hover states */
--accent-foreground: oklch(0.95 0.01 240)
```

#### Functional Colors

```css
--destructive: oklch(0.55 0.2 25)      /* Error/delete actions */
--destructive-foreground: oklch(0.98 0.01 240)

--border: oklch(0.3 0.02 240)          /* Dividers & borders */
--input: oklch(0.3 0.02 240)           /* Form input borders */
--ring: oklch(0.7 0.15 195)            /* Focus rings (cyan) */
```

#### Chart & Visualization Colors

```css
--chart-1: oklch(0.7 0.15 195)         /* Vibrant cyan */
--chart-2: oklch(0.75 0.18 145)        /* Emerald green */
--chart-3: oklch(0.8 0.15 95)          /* Warm amber */
--chart-4: oklch(0.65 0.2 320)         /* Magenta pink */
--chart-5: oklch(0.68 0.18 265)        /* Deep purple */
```

**Usage:** Data visualization, node type differentiation, status indicators

### Node Type Color Mapping

| Node Type | Color Token | Hex Equivalent | Usage |
|-----------|-------------|----------------|-------|
| Start | `bg-emerald-500` | `#10b981` | Entry points |
| Text Model | `bg-chart-1` | `oklch(0.7 0.15 195)` | AI text generation |
| Image Gen | `bg-chart-5` | `oklch(0.68 0.18 265)` | AI image models |
| HTTP Request | `bg-blue-500` | `#3b82f6` | API integrations |
| Conditional | `bg-chart-4` | `oklch(0.65 0.2 320)` | Logic branching |
| JavaScript | `bg-chart-3` | `oklch(0.8 0.15 95)` | Custom code |
| Embedding | `bg-chart-2` | `oklch(0.75 0.18 145)` | Vector operations |
| Tool | `bg-amber-500` | `#f59e0b` | Function tools |
| Prompt | `bg-violet-500` | `#8b5cf6` | Input prompts |
| End | `bg-red-500` | `#ef4444` | Output nodes |

### Color Usage Guidelines

**DO:**
- Use semantic tokens for UI elements (`bg-card`, `text-foreground`, `bg-panel`)
- Use chart colors for data visualization and node differentiation
- Maintain consistent hover states with 20% opacity overlays
- Use `border-2` for selected states
- Use `--panel` for sidebar and navigation surfaces

**DON'T:**
- Hardcode color values (use design tokens)
- Mix color systems (stick to OKLCH)
- Use more than 5 colors in a single visualization
- Override node type colors without documentation

---

## Typography

### Font Families

```css
--font-sans: 'Geist', 'Geist Fallback'          /* UI text */
--font-mono: 'Geist Mono', 'Geist Mono Fallback' /* Code */
```

### Type Scale

| Style | Class | Size | Weight | Line Height | Usage |
|-------|-------|------|--------|-------------|-------|
| H1 | `text-3xl font-bold` | 30px | 700 | 1.2 | Page titles |
| H2 | `text-2xl font-semibold` | 24px | 600 | 1.3 | Section headers |
| H3 | `text-xl font-semibold` | 20px | 600 | 1.4 | Subsections |
| Body | `text-sm` | 14px | 400 | 1.5 | Default text |
| Small | `text-xs` | 12px | 400 | 1.4 | Captions, labels |
| Code | `font-mono text-xs` | 12px | 400 | 1.6 | Code blocks |

### Typography Guidelines

**DO:**
- Use `font-semibold` (600) for headings
- Use `text-sm` as default body size
- Use `text-muted-foreground` for secondary text
- Add `leading-relaxed` for long-form content
- Use `text-balance` or `text-pretty` for titles

**DON'T:**
- Use more than 2 font families
- Use font sizes below 12px
- Mix font weights inconsistently
- Override line-height without purpose

---

## Spacing & Layout

### Spacing Scale

```css
/* Tailwind spacing scale (4px base) */
0.5 = 2px    1 = 4px     1.5 = 6px    2 = 8px
3 = 12px     4 = 16px    6 = 24px     8 = 32px
12 = 48px    16 = 64px   20 = 80px    24 = 96px
```

### Layout Patterns

#### Grid System
```tsx
/* Responsive grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### Flexbox Patterns
```tsx
/* Horizontal stack */
<div className="flex items-center gap-3">

/* Space between */
<div className="flex items-center justify-between">

/* Centered content */
<div className="flex items-center justify-center">
```

#### Container Widths
```tsx
/* Full width */
className="w-full"

/* Fixed widths */
className="w-64"  /* 256px - Sidebar */
className="w-80"  /* 320px - Panels */
className="w-96"  /* 384px - Modals */

/* Max widths */
className="max-w-4xl"  /* Content areas */
className="max-w-7xl"  /* Wide layouts */
```

---

## Components

### Card Component

**Purpose:** Container for grouped content with elevation

```tsx
<Card className="border-2 bg-card">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Variants:**
- Default: `border border-border bg-card`
- Selected: `border-2 border-primary`
- Hover: `hover:border-primary/50`
- Panel: `bg-panel` for sidebar cards

### Button Component

**Purpose:** Interactive elements for user actions

```tsx
/* Primary action */
<Button variant="default">Save</Button>

/* Secondary action */
<Button variant="outline">Cancel</Button>

/* Destructive action */
<Button variant="destructive">Delete</Button>

/* Ghost button */
<Button variant="ghost">Options</Button>
```

**Sizes:**
- `size="sm"` - 32px height (compact actions)
- `size="default"` - 40px height (standard)
- `size="lg"` - 48px height (prominent CTAs)
- `size="icon"` - Square icon buttons

### Input Component

**Purpose:** Form inputs and text entry

```tsx
<Input 
  type="text"
  placeholder="Enter value..."
  className="bg-background border-input"
/>
```

**States:**
- Default: `border-input bg-background`
- Focus: `ring-2 ring-ring ring-offset-2`
- Error: `border-destructive`
- Disabled: `opacity-50 cursor-not-allowed`

---

## Node Design Patterns

### Node Structure

All workflow nodes follow this consistent structure:

```tsx
<Card className="min-w-[280px] max-w-[400px] border-2 bg-card">
  {/* Header */}
  <div className="flex items-center gap-3 border-b border-border px-4 py-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[color]">
      <Icon className="h-4 w-4 text-primary-foreground" />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-semibold">Node Type</h3>
      <p className="text-xs text-muted-foreground">Subtitle</p>
    </div>
  </div>

  {/* Content */}
  <div className="space-y-2 p-4">
    {/* Configuration display */}
  </div>

  {/* Handles */}
  <Handle type="target" position={Position.Left} />
  <Handle type="source" position={Position.Right} />
</Card>
```

### Node Status Colors

```tsx
function getStatusColor(status: string, selected: boolean) {
  const base = selected ? "border-primary shadow-lg" : "border-border"
  
  switch (status) {
    case "running":
      return `${base} border-yellow-500/50 shadow-yellow-500/20`
    case "completed":
      return `${base} border-green-500/50 shadow-green-500/20`
    case "error":
      return `${base} border-red-500/50 shadow-red-500/20`
    default:
      return base
  }
}
```

### Connection Handles

```tsx
/* Input handle (left) */
<Handle 
  type="target" 
  position={Position.Left}
  className="!bg-primary !border-2 !border-primary-foreground"
/>

/* Output handle (right) */
<Handle 
  type="source" 
  position={Position.Right}
  className="!bg-primary !border-2 !border-primary-foreground"
/>
```

---

## Interactions & Animations

### Hover States

```css
/* Button hover */
.hover\:bg-primary\/20:hover {
  background-color: oklch(0.7 0.15 195 / 0.2);
}

/* Scale animation */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
```

### Transitions

```tsx
/* Standard transition */
className="transition-all duration-200"

/* Color only */
className="transition-colors duration-150"

/* Transform only */
className="transition-transform duration-200"
```

### Loading States

```tsx
/* Pulse animation */
<div className="animate-pulse" />

/* Spin animation */
<div className="animate-spin" />

/* Custom pulsing dot */
<div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
```

---

## Accessibility

### Focus Management

```tsx
/* Visible focus rings */
className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

/* Skip to main content */
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### ARIA Labels

```tsx
/* Icon buttons */
<Button aria-label="Close dialog" />

/* Status indicators */
<div role="status" aria-live="polite">
  Workflow running...
</div>

/* Interactive regions */
<div role="region" aria-label="Node configuration">
```

### Keyboard Navigation

| Action | Shortcut | Description |
|--------|----------|-------------|
| Command Palette | `Cmd+K` | Open command palette |
| Save | `Cmd+S` | Save workflow |
| Undo | `Cmd+Z` | Undo last action |
| Redo | `Cmd+Shift+Z` | Redo action |
| Delete | `Delete` / `Backspace` | Delete selected nodes |
| Help | `Cmd+/` | Show keyboard shortcuts |

### Accessibility Compliance

- **WCAG 2.1 AA Compliant:** All color combinations meet minimum contrast ratios
  - Normal text: 4.5:1 minimum
  - Large text: 3:1 minimum
  - UI components: 3:1 minimum
- **Keyboard accessible:** All interactive elements are keyboard navigable
- **Screen reader friendly:** Proper semantic HTML and ARIA labels throughout

---

## Implementation Guidelines

### Component Development

1. **Always use design tokens**
   ```tsx
   // ✅ Good
   className="bg-card text-foreground"
   
   // ❌ Bad
   style={{ backgroundColor: '#1a1a1a' }}
   ```

2. **Follow spacing patterns**
   ```tsx
   // ✅ Good - Consistent spacing
   <div className="space-y-4">
   
   // ❌ Bad - Arbitrary values
   <div style={{ marginTop: '17px' }}>
   ```

3. **Use semantic HTML**
   ```tsx
   // ✅ Good
   <button className="..." onClick={...}>
   
   // ❌ Bad
   <div className="..." onClick={...}>
   ```

### Responsive Design

```tsx
/* Mobile-first approach */
<div className="w-full md:w-1/2 lg:w-1/3">
  
/* Hide on mobile */
<div className="hidden md:block">

/* Show only on mobile */
<div className="block md:hidden">
```

### Performance Best Practices

1. **Memoize expensive components**
   ```tsx
   export default memo(TextModelNode)
   ```

2. **Use CSS for animations**
   ```css
   /* Prefer CSS transitions over JS */
   transition: all 200ms ease-in-out;
   ```

3. **Optimize re-renders**
   ```tsx
   const memoizedValue = useMemo(() => expensiveCalc(), [deps])
   ```

---

## Design System Maintenance

### Version History

- **v3.0** - Obsidian Theme implementation with cyan primary, refined surface hierarchy, added `--panel` token
- **v2.0** - OKLCH color space adoption, enhanced accessibility
- **v1.0** - Initial design system release

### Migration Notes

See `/docs/architecture/color-system-migration.md` for detailed migration guide from v2.0 to v3.0 (Obsidian Theme).

### Contribution Guidelines

1. Propose changes in design system discussions
2. Create examples in Storybook (if available)
3. Update documentation with changes
4. Verify WCAG 2.1 AA compliance for color changes
5. Get approval from design team lead
6. Update version number appropriately

### Future Enhancements

- [ ] Light mode color palette (Obsidian Light variant)
- [ ] Additional chart color variants for 10+ data series
- [ ] Animation library expansion with micro-interactions
- [ ] Component variant system documentation
- [ ] Design token generator tool
- [ ] Automated accessibility testing integration

---

**For questions or suggestions, contact the development team.**

## Related Documentation

- [Color System Migration Guide](/docs/architecture/color-system-migration.md) - v2.0 to v3.0 Obsidian Theme
- [Color System Review](/docs/architecture/color-system-review.md) - Technical analysis and recommendations
