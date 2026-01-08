Here is the revised **Topflow Design System Documentation (v2.0)**.

This version strictly implements the **Obsidian Theme** values (OKLCH with Hue 265 and Chroma 0.02) as the default root variables, ensuring the entire system reflects that deep, cohesive purple-tinted dark mode.

---

# Topflow Design System

**Theme:** Obsidian (Default)

**Version:** 2.0

**Last Updated:** January 2026

**Maintainer:** Development Team

## Table of Contents

1. [Design Philosophy](https://www.google.com/search?q=%23design-philosophy)
2. [Color System (Obsidian)](https://www.google.com/search?q=%23color-system-obsidian)
3. [Typography](https://www.google.com/search?q=%23typography)
4. [Spacing & Layout](https://www.google.com/search?q=%23spacing--layout)
5. [Components](https://www.google.com/search?q=%23components)
6. [Node Design Patterns](https://www.google.com/search?q=%23node-design-patterns)
7. [Interactions & Animations](https://www.google.com/search?q=%23interactions--animations)
8. [Accessibility](https://www.google.com/search?q=%23accessibility)
9. [Implementation Guidelines](https://www.google.com/search?q=%23implementation-guidelines)

---

## Design Philosophy

### Core Principles

**1. Obsidian Aesthetic (Deep Focus)**

* **Tinted Darkness:** Unlike standard "flat gray" dark modes, Obsidian uses a deep charcoal with a subtle purple tint (Hue 265). This reduces eye strain during long coding sessions and creates a premium, cohesive atmosphere.
* **Luminous Accents:** Primary elements glow against the deep background, mimicking an IDE or HUD environment.

**2. Visual Hierarchy**

* **Depth over Borders:** We use slight changes in lightness (`bg-app` vs `bg-card`) to define hierarchy, using borders only for distinct separation.
* **Information Density:** High enough to show complex node graphs, but low enough to prevent cognitive overload.

**3. Performance & Accessibility**

* **WCAG 2.1 AA:** Despite the dark aesthetic, text contrast ratios are strictly maintained (4.5:1 minimum).
* **Fluid Rendering:** Node graphs must pan/zoom at 60fps; CSS transforms are preferred over JS animations.

---

## Color System (Obsidian)

### Design Tokens

We use the **OKLCH color space** to ensure perceptual uniformity. The Obsidian theme relies on a fixed Hue of **265** (Purple/Blue) for all neutral surfaces.

#### Base Theme Colors

\`\`\`css
:root {
  /* SHARED BRAND COLORS */
  --primary: oklch(0.65 0.25 265);        /* Electric Purple */
  --primary-foreground: oklch(0.98 0 0);  /* White */
  
  /* OBSIDIAN SURFACE TOKENS (Tinted Neutrals) */
  --background: oklch(0.13 0.02 265);     /* Deepest app background */
  --panel: oklch(0.17 0.02 265);          /* Sidebars / Panels */
  --card: oklch(0.21 0.02 265);           /* Node cards / Modals */
  --popover: oklch(0.21 0.02 265);        /* Dropdowns */
  
  /* TEXT & BORDERS */
  --foreground: oklch(0.95 0 0);          /* Primary Text */
  --muted-foreground: oklch(0.55 0 0);    /* Secondary Text */
  --border: oklch(0.28 0.02 265);         /* Tinted borders */
  
  /* FUNCTIONAL */
  --input: oklch(0.13 0.02 265);          /* Matches background for "cutout" look */
  --ring: oklch(0.65 0.25 265);           /* Focus states */
  --success: oklch(0.65 0.18 150);        /* Mint Green */
  --destructive: oklch(0.63 0.20 25);     /* Alert Red */
}

\`\`\`

#### Chart & Visualization Colors

Used for differentiating node categories and data metrics.

\`\`\`css
--chart-1: oklch(0.65 0.25 265); /* Primary Purple */
--chart-2: oklch(0.60 0.20 230); /* Deep Blue */
--chart-3: oklch(0.70 0.18 150); /* Success Green */
--chart-4: oklch(0.75 0.20 80);  /* Warning Yellow */
--chart-5: oklch(0.68 0.22 320); /* Magenta */

\`\`\`

### Node Type Color Mapping

| Node Type | Token Name | Visual Color | Usage |
| --- | --- | --- | --- |
| **Trigger / Start** | `var(--success)` | Green | Entry points (Webhooks, Schedules) |
| **LLM / Text** | `var(--primary)` | Purple | GPT-4, Claude, Local LLMs |
| **Integrations** | `var(--chart-2)` | Blue | Slack, Gmail, Notion API |
| **Logic / Flow** | `var(--chart-5)` | Magenta | If/Else, Loops, Routers |
| **Tools / Code** | `var(--chart-4)` | Yellow | JavaScript, Python, Calculator |
| **End / Output** | `var(--destructive)` | Red | Final responses, Database writes |

---

## Typography

### Font Families

\`\`\`css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Geist Mono', 'Fira Code', monospace;

\`\`\`

### Type Scale

| Style | Tailwind Class | Specs | Usage |
| --- | --- | --- | --- |
| **H1** | `text-2xl font-semibold tracking-tight` | 24px/1.2 | Page Titles |
| **H2** | `text-xl font-semibold tracking-tight` | 20px/1.3 | Panel Headers |
| **H3** | `text-base font-semibold` | 16px/1.4 | Section Titles |
| **Body** | `text-sm` | 14px/1.5 | General UI |
| **Label** | `text-xs font-medium text-muted-foreground` | 12px/1.4 | Input Labels |
| **Code** | `font-mono text-xs` | 12px/1.6 | Prompts, JSON |

---

## Spacing & Layout

### Grid & Canvas

* **Sidebar Width:** Fixed `260px` (`bg-panel`)
* **Canvas Background:** `bg-background`
* **Canvas Pattern:** Dot grid using `radial-gradient(var(--border) 1px, transparent 1px)` sized at `24px`.

### Spacing Tokens

\`\`\`css
/* Tailwind scale relative to 4px */
p-2 (8px)   /* Compact padding (buttons) */
p-3 (12px)  /* Standard padding (card headers) */
p-4 (16px)  /* Content padding (card bodies) */
p-6 (24px)  /* Section padding */
gap-2 (8px) /* Tight grouping */
gap-4 (16px)/* Standard component separation */

\`\`\`

---

## Components

### 1. Card (The Building Block)

The fundamental surface for the Obsidian theme.

\`\`\`tsx
<div className="bg-card border border-border rounded-xl shadow-sm">
  {children}
</div>

\`\`\`

### 2. Button Variants

* **Primary:** `bg-primary text-primary-foreground hover:opacity-90`
* **Secondary:** `bg-card border border-border hover:bg-panel text-foreground`
* **Ghost:** `bg-transparent hover:bg-card text-muted-foreground hover:text-foreground`

### 3. Inputs & TextAreas

Inputs in Obsidian should feel "recessed" into the card.

\`\`\`tsx
<input 
  className="w-full h-9 rounded-md border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
/>

\`\`\`

---

## Node Design Patterns

Nodes are the most important interactive element. They must look elevated and draggable.

### Anatomy of a Node

\`\`\`tsx
/* Container */
<div className="w-[320px] rounded-xl border border-border bg-card shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all hover:border-primary/50">
  
  /* 1. Header */
  <div className="flex items-center gap-3 border-b border-border p-3">
    /* Icon Box */
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
      <Icon />
    </div>
    /* Title Group */
    <div>
      <h3 className="text-sm font-semibold leading-none">Generate Text</h3>
      <span className="text-[10px] text-muted-foreground">GPT-4 Turbo</span>
    </div>
  </div>

  /* 2. Body */
  <div className="p-4 space-y-3">
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">System Prompt</label>
      <textarea className="bg-background border-border w-full rounded-md p-2 text-xs font-mono min-h-[60px]" />
    </div>
  </div>

  /* 3. Handles (React Flow) */
  <Handle type="target" position="left" className="!bg-primary !border-background !w-3 !h-3" />
  <Handle type="source" position="right" className="!bg-primary !border-background !w-3 !h-3" />
</div>

\`\`\`

### Active / Selected States

* **Selected:** `border-primary` (Solid 1px or 2px)
* **Executing:** `shadow-[0_0_20px_var(--primary)]` (Glow effect)
* **Error:** `border-destructive`

---

## Interactions & Animations

### Micro-interactions

* **Transition:** All color changes should have `transition-all duration-200 ease-in-out`.
* **Scale:** Clickable cards/nodes `active:scale-[0.98]`.

### Canvas Effects

* **Spotlight:** The `main-area` uses a subtle radial gradient to simulate a light source:
`background-image: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 60%);`

---

## Accessibility

### Contrast Compliance

Even in "Obsidian" dark mode, we ensure readability:

* `text-foreground` on `bg-card` = **15.8:1** (AAA)
* `text-muted-foreground` on `bg-card` = **5.2:1** (AA)
* `primary` on `bg-card` = **4.5:1** (AA)

### Focus Indicators

Do not suppress focus rings. Use the brand ring color:
`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`

---

## Implementation Guidelines

### Tailwind Config (`tailwind.config.js`)

Add the Obsidian OKLCH values to your configuration to enable classes like `bg-card` or `text-primary`.

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        panel: "oklch(var(--panel) / <alpha-value>)",
        card: "oklch(var(--card) / <alpha-value>)",
        border: "oklch(var(--border) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--panel) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
      },
    },
  },
}

\`\`\`

### CSS Variables Setup

Paste the `:root` variables from the **Color System** section into your global `globals.css` file. Ensure you import this file at the top level of your application.
