# KineticRecruiter Design System

## Brand Personality
Confident, precise, professional. Not playful, not corporate-stiff. Think "sharp recruiter who knows their stuff." The design should feel like a tool built by recruiters, for recruiters — fast, clear, no fluff.

## Color Tokens

### Primary
| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Kinetic Teal | `#0d8488` | `--color-kinetic-teal` | Primary actions, links, interactive elements |
| Kinetic Teal Dark | `#0a6b6e` | `--color-kinetic-teal-dark` | Hover states, emphasis |
| Kinetic Teal Light | `#E8F5F5` | `--color-kinetic-teal-light` | Backgrounds, badges, subtle highlights |

### Secondary
| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Kinetic Navy | `#1a2332` | `--color-kinetic-navy` | Headings, dark backgrounds, sidebar |
| Kinetic Navy Light | `#2a3a4f` | `--color-kinetic-navy-light` | Secondary text on dark, hover states |

### Accent (Sparingly)
| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Motion Amber | `#E8A838` | `--color-motion-amber` | Warnings, highlights, premium badges |
| Momentum Violet | `#9B8EC4` | `--color-momentum-violet` | Charts, data visualization, tertiary accent |
| Flow Cyan | `#7DD3D6` | `--color-flow-cyan` | Progress indicators, decorative accents |

### Neutral
| Token | Usage |
|-------|-------|
| `white` | Card backgrounds, page backgrounds |
| `gray-50` | Section backgrounds (alternating) |
| `gray-100` | Borders, dividers |
| `gray-200` | Input borders, disabled states |
| `gray-400` | Placeholder text |
| `gray-500` | Secondary body text |
| `gray-600` | Primary body text |

### Rules
- NEVER use raw hex values in components. Use Tailwind classes: `text-kinetic-teal`, `bg-kinetic-navy`, etc.
- NEVER use `style={{ color: '#0d8488' }}` inline. Use the CSS variable classes.
- Gray scale uses Tailwind defaults (gray-50 through gray-900). Do not define custom grays.

## Typography

### Font
**Inter** via `next/font/google`. Already configured in layout.tsx.

> Note: Inter is common in AI-generated sites. We differentiate through WEIGHT DISCIPLINE and SPACING, not font choice. Do not change the font — instead, make it feel intentional through tight heading tracking and generous body line-height.

### Scale
| Element | Size | Weight | Tracking | Line Height |
|---------|------|--------|----------|-------------|
| H1 (hero) | `text-4xl md:text-5xl lg:text-6xl` | `font-bold` (700) | `tracking-tight` | `leading-tight` |
| H2 (section) | `text-3xl md:text-4xl` | `font-bold` (700) | `tracking-tight` | `leading-tight` |
| H3 (card/feature) | `text-lg` or `text-xl` | `font-bold` (700) | default | default |
| Body | `text-base` | `font-normal` (400) | default | `leading-relaxed` |
| Body large | `text-lg md:text-xl` | `font-normal` (400) | default | `leading-relaxed` |
| Caption/meta | `text-sm` | `font-medium` (500) | default | default |
| Badge/label | `text-xs` or `text-sm` | `font-semibold` (600) | default | default |

### Rules
- Maximum 3 weights: 400 (body), 600 (labels/badges), 700 (headings).
- Do NOT use font-weight 300 or 800+.
- Headings are ALWAYS `text-kinetic-navy`. Body is ALWAYS `text-gray-600`.

## Spacing

### Base Unit: 4px
| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` / `p-1` | 4px | Tight inner spacing |
| `gap-2` / `p-2` | 8px | Compact elements |
| `gap-3` / `p-3` | 12px | Card inner padding (compact) |
| `gap-4` / `p-4` | 16px | Default padding |
| `gap-6` / `p-6` | 24px | Card padding, section inner |
| `gap-8` / `p-8` | 32px | Between groups |
| `gap-12` | 48px | Between sections (mobile) |
| `py-20 md:py-28` | 80-112px | Section vertical padding |

### Container
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Standard section wrapper: `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`

## Components

### Buttons
Use the `<Button>` component at `src/components/ui/Button.tsx`. Do NOT create ad-hoc button styles.

| Variant | Usage |
|---------|-------|
| `primary` | Main CTAs (Start Free Trial, Submit) |
| `secondary` | Dark CTAs (Learn More on dark sections) |
| `outline` | Secondary actions beside a primary CTA |
| `danger` | Destructive actions (admin only) |

| Size | Padding | Usage |
|------|---------|-------|
| `sm` | `px-3 py-1.5 text-sm` | Inline actions, table rows |
| `md` | `px-5 py-2.5` | Standard buttons |
| `lg` | `px-6 py-3 text-lg` | Hero CTAs, prominent actions |

All buttons: `rounded-lg`, `font-semibold`, `transition-colors`.

### Cards
- Background: `bg-white`
- Border: `border border-gray-100`
- Radius: `rounded-xl`
- Padding: `p-6`
- Hover (optional): `hover:shadow-md hover:-translate-y-1 transition-all duration-200`
- Do NOT mix shadow and border approaches. This project uses border + hover-shadow.

### Badges
- Small: `text-xs font-semibold px-2 py-0.5 rounded`
- Medium: `text-sm font-semibold px-3 py-1 rounded-full`
- Teal badge: `bg-kinetic-teal/10 text-kinetic-teal`
- Amber badge: `bg-motion-amber/10 text-motion-amber`

### Section Pattern
```tsx
<section className="py-20 md:py-28 bg-white"> {/* or bg-gray-50 for alternating */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
        Section heading here.
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Section description here.
      </p>
    </div>
    {/* Section content */}
  </div>
</section>
```

### Icons
- Library: `lucide-react`
- Default size: `w-5 h-5`
- In feature cards: wrapped in `w-10 h-10 bg-kinetic-teal/10 rounded-lg flex items-center justify-center`
- Color: `text-kinetic-teal` (on light backgrounds)

## Depth Approach
**Border + hover shadow.** Cards have `border border-gray-100` at rest, `hover:shadow-md` on interaction. The navbar uses `border-b border-gray-100` with `backdrop-blur-sm`.

Do NOT add `shadow-*` to resting cards. Shadow is for hover and floating elements only (modals, dropdowns, the hero browser mockup).

## Animation
| Property | Duration | Easing |
|----------|----------|--------|
| Color transitions | `transition-colors` (150ms) | default ease |
| Transform + shadow | `transition-all duration-200` | default ease |
| Dropdown appear | `transition-all duration-200` | default ease |
| Page-level motion | None — no page transitions, no scroll animations | — |

Do NOT add `animate-bounce`, `animate-spin`, or scroll-triggered animations. The only animation is `animate-pulse` on the small status dot in badges.

## Images
- Product screenshots: Use the browser mockup pattern (see Hero.tsx)
- Blog images: Store in `public/images/blog/`
- Generated images: Nano Banana outputs to `public/images/generated/`
- Always use `next/image` with explicit width/height
- Default quality: let Next.js optimize (don't set quality prop)

## Dark Mode
Not implemented. Do not add dark mode support unless explicitly requested.
