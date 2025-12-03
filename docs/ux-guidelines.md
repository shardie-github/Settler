# UX Guidelines

## Overview

This document defines the visual design system, spacing, typography, layout, and interaction patterns for consistent user experience across the Settler application.

## Spacing Scale

### Base Unit
- **4px base unit**: All spacing uses multiples of 4px for consistency

### Vertical Spacing
- **xs**: 24px (1.5rem) - Tight spacing between related elements
- **sm**: 32px (2rem) - Compact sections
- **md**: 48px (3rem) - Standard section spacing
- **lg**: 64px (4rem) - Spacious sections
- **xl**: 80px (5rem) - Hero sections
- **2xl**: 96px (6rem) - Extra spacious

### Horizontal Spacing
- **xs**: 16px (1rem) - Mobile padding
- **sm**: 24px (1.5rem) - Tablet padding
- **md**: 32px (2rem) - Desktop padding
- **lg**: 48px (3rem) - Wide desktop
- **xl**: 64px (4rem) - Extra wide

### Component Spacing

**Cards**:
- Padding: 16px (sm), 24px (md), 32px (lg)

**Forms**:
- Field gap: 24px (1.5rem)
- Label to input: 8px (0.5rem)
- Form group gap: 32px (2rem)

**Lists**:
- Item gap: 12px (0.75rem)
- Section gap: 24px (1.5rem)

**Navigation**:
- Item gap: 24px (1.5rem)
- Section gap: 32px (2rem)

## Typography Hierarchy

### Font Families
- **Sans**: Inter (system fallback)
- **Mono**: System monospace (for code)

### Font Sizes

| Size | Value | Line Height | Use Case |
|------|-------|-------------|----------|
| xs | 0.75rem (12px) | 1rem | Labels, captions |
| sm | 0.875rem (14px) | 1.25rem | Small text, metadata |
| base | 1rem (16px) | 1.5rem | Body text |
| lg | 1.125rem (18px) | 1.75rem | Large body text |
| xl | 1.25rem (20px) | 1.75rem | Subheadings |
| 2xl | 1.5rem (24px) | 2rem | Section headings |
| 3xl | 1.875rem (30px) | 2.25rem | Page headings |
| 4xl | 2.25rem (36px) | 2.5rem | Hero headings |
| 5xl | 3rem (48px) | 1 | Display headings |

### Font Weights
- **400** (normal): Body text
- **500** (medium): Emphasis, labels
- **600** (semibold): Headings, buttons
- **700** (bold): Strong emphasis

### Text Width Guidelines
- **Body paragraphs**: Max 65 characters (65ch)
- **Wide content**: Max 80 characters
- **Avoid**: Ultra-wide text blocks (>80ch)

### Heading Scale
- **H1**: 3xl (30px) - Page title
- **H2**: 2xl (24px) - Section title
- **H3**: xl (20px) - Subsection title
- **H4**: lg (18px) - Card title
- **H5**: base (16px) - Small heading
- **H6**: sm (14px) - Smallest heading

## Layout Grid Rules

### Container Max Widths
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1400px

### Container Padding
- **Mobile**: 16px (1rem)
- **Tablet**: 24px (1.5rem)
- **Desktop**: 32px (2rem)

### Section Constraints
- **Min height**: 400px (for hero sections)
- **Max width**: 1400px
- **Vertical padding**: 48px (md) to 80px (xl)

## Motion & Interaction Guidelines

### Transition Durations
- **Fast**: 100ms - Hover states, quick feedback
- **Default**: 200ms - Standard transitions
- **Slow**: 300ms - Modal animations
- **Slower**: 500ms - Page transitions

### Easing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - Most UI elements
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)` - Buttons, cards
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)` - Exit animations

### Interaction States

#### Buttons
- **Default**: Base styles
- **Hover**: Darker background, subtle shadow
- **Active**: Scale 0.98, darker background
- **Focus**: Ring outline (2px, offset 2px)
- **Disabled**: 50% opacity, no pointer events
- **Loading**: Spinner icon, disabled state

#### Links
- **Default**: Primary color
- **Hover**: Underline, darker color
- **Focus**: Ring outline
- **Visited**: Slightly muted color

#### Form Inputs
- **Default**: Border, background
- **Hover**: Border color change
- **Focus**: Ring outline, border color change
- **Error**: Red border, red focus ring
- **Disabled**: Muted background, no pointer events

#### Cards
- **Default**: Border, background
- **Hover**: Subtle shadow, slight scale (1.01)
- **Focus**: Ring outline (when interactive)

### Animation Principles

1. **Purpose**: Animations should enhance understanding, not distract
2. **Duration**: Keep transitions short (100-300ms)
3. **Easing**: Use ease-out for most interactions
4. **Reduced Motion**: Always respect `prefers-reduced-motion`
5. **Performance**: Use transform and opacity for animations

### Common Animations

**Fade In**:
- Duration: 200ms
- Easing: ease-out
- Use: Content appearing

**Slide Up**:
- Duration: 300ms
- Easing: ease-out
- Use: Modals, dropdowns

**Scale**:
- Duration: 100ms
- Easing: ease-out
- Use: Button active states

## Color Usage

### Text Colors
- **Foreground**: Primary text
- **Muted Foreground**: Secondary text, metadata
- **Accent Foreground**: Links, emphasis

### Background Colors
- **Background**: Page background
- **Card**: Card background
- **Muted**: Subtle backgrounds
- **Accent**: Hover states, highlights

### Border Colors
- **Border**: Default borders
- **Input**: Form input borders
- **Ring**: Focus rings

### Semantic Colors
- **Destructive**: Errors, delete actions
- **Success**: Success messages (green)
- **Warning**: Warnings (yellow/amber)
- **Info**: Information (blue)

## Component Patterns

### Cards
- **Padding**: 24px (md)
- **Border radius**: 8px (lg)
- **Shadow**: Subtle on hover
- **Spacing**: Consistent margins

### Forms
- **Field spacing**: 24px vertical
- **Label spacing**: 8px above input
- **Error spacing**: 8px below input
- **Group spacing**: 32px between groups

### Buttons
- **Height**: 40px (default), 36px (sm), 44px (lg)
- **Padding**: Horizontal 16px (default)
- **Border radius**: 6px (md)
- **Gap**: 8px between icon and text

### Modals
- **Max width**: 512px (default), 672px (lg), 896px (xl)
- **Padding**: 24px
- **Backdrop**: 50% black with blur
- **Animation**: Fade + scale in

## Responsive Design

### Breakpoints
- **sm**: 640px - Mobile landscape
- **md**: 768px - Tablet
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large desktop
- **2xl**: 1536px - Extra large

### Mobile-First Approach
1. Design for mobile first
2. Enhance for larger screens
3. Test at all breakpoints
4. Ensure touch targets ≥ 44px

## Accessibility Standards

### Focus Indicators
- **Ring**: 2px solid, offset 2px
- **Color**: Primary color or ring color
- **Visible**: Always visible on keyboard navigation

### Touch Targets
- **Minimum**: 44px × 44px
- **Spacing**: 8px minimum between targets

### Color Contrast
- **AA Standard**: 4.5:1 for normal text
- **AAA Standard**: 7:1 for normal text (preferred)
- **Large Text**: 3:1 for 18px+ or 14px+ bold

### Reduced Motion
- Respect `prefers-reduced-motion: reduce`
- Disable animations or use instant transitions
- Provide alternative feedback

## Best Practices

### Visual Alignment
- Use consistent padding and margins
- Align to 4px grid
- Fix off-by-1px alignment issues
- Use flexbox/grid for consistent layouts

### Visual Hierarchy
- Use size, weight, and color to create hierarchy
- Headings → Subheadings → Body → Actions
- Maintain consistent spacing between levels

### Consistency
- Use design tokens, not arbitrary values
- Follow component patterns
- Maintain spacing rhythm
- Use consistent border radius

### Performance
- Use CSS transforms for animations
- Avoid layout shifts
- Optimize images
- Lazy load below-fold content

---

**Last Updated**: Phase 8 Implementation
**Maintained By**: Design & Engineering Team
