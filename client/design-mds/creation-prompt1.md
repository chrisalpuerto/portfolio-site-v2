# Claude Code Prompt 1: Portfolio Header + Intro

You are building the first implementation slice of Chris Alpuerto's portfolio website.

Before making changes, read and follow these files:

- `client/design-mds/design-v1.md`
- `client/design-mds/me.md`
- `client/design-mds/ai-slop-avoid.md`
- `client/design-mds/animation-load.md`

Also inspect these visual references before implementing:

- `client/ui-ref/header.png`
- `client/ui-ref/text-color-scheme-ref.png`
- `client/ui-ref/projects-ref.png`
- `client/public/8bit-laptop-computer.png`

## Goal

Create the first visible part of the portfolio site:

1. A minimal header.
2. A first intro section with:
   - `Chris Alpuerto`
   - A short description of Chris from `client/design-mds/me.md`
   - The 8-bit laptop image on the right.

Do not build the full portfolio yet. This prompt is only for the header and first intro section.

## Design Direction

Follow `client/design-mds/design-v1.md` closely.

The visual style should be minimal, direct, warm-neutral, and portfolio-grade:

- Warm off-white/light gray background.
- Near-black typography.
- Thin warm gray borders.
- Restrained rounding.
- Compact black pill buttons only if needed.
- Small orange accents only where intentional.
- No gradients, glowing orbs, glassmorphism, bento grids, fake metrics, or generic AI-site styling.

Follow `client/design-mds/ai-slop-avoid.md` strictly.

## Header

Use `client/ui-ref/header.png` as the header styling reference.

Important:

- Match the tab placement and rhythm from `header.png`.
- Tabs should be horizontally placed near the center of the header.
- Use these tabs exactly: `Home`, `Projects`, `About`, `Contact`.
- Active tab: near-black text with a simple black underline below it.
- Inactive tabs: muted gray text.
- Ignore the far-left text/logo shown in `header.png`.
- Do not copy the font from `header.png`.
- Use the same clean sans/grotesk typography direction as `text-color-scheme-ref.png`.

## Intro Section

The first section should include:

- Large text: `Chris Alpuerto`
- Description text based on `client/design-mds/me.md`:
  `Full stack software engineer focused on backend systems, cloud, DevOps, infrastructure, automation, and building with AI.`
- `client/public/8bit-laptop-computer.png` positioned to the right of the text on desktop.

The laptop image should be present but not dominant. It should feel like a small personal signature, not the whole visual identity.

On mobile, stack the content cleanly so the text remains first and the laptop image does not crowd or overlap the copy.

## Animation

Use `client/design-mds/animation-load.md` for the page-load animation pattern.

Add a subtle looping animation to the laptop image:

- It should move slightly left, down, right, then up.
- The movement distance should be small.
- It should feel like a gentle GIF-style idle animation.
- It must not bounce dramatically, spin, glow, scale aggressively, or distract from the text.
- Respect `prefers-reduced-motion`.

## Implementation Expectations

- Work inside the existing Next.js app under `client`.
- Prefer the existing Geist font setup unless the repo already indicates a better local choice.
- Use semantic HTML: `header`, `nav`, `main`, and `section`.
- Keep the implementation minimal and readable.
- Do not add a UI library.
- Do not build the projects/about/contact sections yet.
- Do not add unrelated features.

## Acceptance Criteria

- Header visually follows `header.png` for centered tab placement and underline behavior.
- The header does not copy the far-left logo/text or decorative font from `header.png`.
- The page follows the color, border, button, rounding, and minimalism direction from `text-color-scheme-ref.png` and `design-v1.md`.
- The intro shows `Chris Alpuerto` and the engineering description from `me.md`.
- The 8-bit laptop image appears to the right on desktop and stacks cleanly on mobile.
- The laptop has a subtle small-distance looping motion.
- Page-load animation follows `client/design-mds/animation-load.md`.
- The result passes an AI slop audit using `client/design-mds/ai-slop-avoid.md`.
