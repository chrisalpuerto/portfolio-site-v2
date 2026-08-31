# Portfolio Design V1

## Summary

Build a minimal, direct portfolio site with a warm neutral canvas, near-black typography, thin gray borders, restrained orange accents, and small 8-bit laptop/character details. The site should feel focused, confident, personal, and polished. It should not feel like a novelty pixel-art site, a loud landing page, or an experimental visual playground.

The main visual anchor is `client/ui-ref/text-color-scheme-ref.png`. Follow its text style, color scheme, border weight, card rounding, pill buttons, and restrained orange accent usage. Use the Mobbin references below for additional minimal layout cues.

## Reference Materials

Local references:

- `client/ui-ref/text-color-scheme-ref.png`: primary reference for palette, typography feel, bordered cards, pill buttons, small orange accent states, and overall minimalism.
- `client/ui-ref/header.png`: reference for header tab placement only. Ignore the far-left text/logo treatment and do not copy the decorative font.
- `client/ui-ref/projects-ref.png`: reference for the projects archive/list rhythm: category label, large project title, right arrow, horizontal dividers, and lots of negative space.
- `client/public/8bit-laptop-computer.png`: use as the main pixel-art accent, kept small and intentional.

Mobbin references:

- [OFF+BRAND](https://mobbin.com/sites/sections/851e3996-4679-4653-aae6-3b345cab2aba): agency/editorial minimalism, large type, sparse hierarchy.
- [Aboard](https://mobbin.com/sites/sections/72ae36df-5806-4266-9356-c00b9a786b4d): quiet spacing and boxed/card content.
- [Studio Freight](https://mobbin.com/sites/sections/45d8e2ba-244c-4d39-bafb-93e433cb700c): minimal creative portfolio energy without loud styling.
- [Analogue Agency](https://mobbin.com/sites/sections/36c316d3-f7c2-41c9-8e84-2f3f66c16abb): clean about/portfolio sections with confident type and spacing.
- [Analogue Agency case-study section](https://mobbin.com/sites/sections/8e1d64b0-7c88-4989-b510-515186fc2b75): simple work/project layout reference.
- [Fibery](https://mobbin.com/sites/sections/8354be46-ea56-48e0-9057-617a0caff0db): structured content blocks and outlined-card treatment.

## Visual System

Palette:

- Page background: `#f3f2ee` or a very close warm off-white/light gray.
- Primary text: `#0f1110` or another near-black, never pure decorative color for body copy.
- Secondary text: muted gray such as `#696a66`.
- Borders/dividers: thin warm gray such as `#c9c7c0`.
- Card surfaces: off-white or slightly lighter than the page background, such as `#f8f7f3`.
- Accent: `#ff6b1a`. Use only for small dots, active/selected states, focus details, and tiny emphasis moments.

Typography:

- Use the clean sans/grotesk direction from `text-color-scheme-ref.png`.
- Prefer the existing Geist setup, with Arial/Helvetica-style fallbacks.
- Do not use or mimic the decorative serif/display font shown in `header.png`.
- Use large, confident headings with simple line-height. Avoid overly stylized letter spacing, condensed display fonts, and type effects.
- Body text should be plain, readable, and sparse. Keep copy direct and portfolio-focused.

Borders and radius:

- Use 1px borders for cards, dividers, and outlined controls.
- Keep cards nearly square with restrained rounding, around `6px` to `8px`.
- Pill buttons may use full radius.
- Avoid thick outlines, heavy shadows, glass effects, gradients, and nested cards.

Layout:

- Use generous whitespace and max-width content containers.
- Keep the first screen useful and direct: identity, role, short positioning statement, navigation, and one visual accent.
- Do not create a marketing-style hero with decorative gradients, large abstract visuals, or feature-card clusters.
- Do not use decorative orbs, bokeh blobs, loud background patterns, or a one-note purple/blue/dark theme.
- Let the pixel art add personality, but let the portfolio content carry the page.

## Header

Follow `client/ui-ref/header.png` for tab placement and active-state rhythm:

- Header spans the full width at the top with a clean white/off-white background.
- Nav tabs are horizontally placed near the visual center of the header.
- Required tabs: `Home`, `Projects`, `About`, `Contact`.
- Active tab uses near-black text and a black underline placed below the label.
- Inactive tabs use muted gray text.
- The underline should be simple and flat, not animated into a large decorative element.
- Ignore the far-left text/logo from `header.png`; do not copy its text, symbols, or font.
- If a left identity mark is needed, use a simple plain-text name or initials in the same clean sans style as the rest of the site.

Mobile header:

- Keep the same minimal visual language.
- Use either a compact horizontal nav if it fits cleanly, or a simple menu button with the same border/typography treatment.
- Do not introduce a heavy overlay or a visually loud mobile menu.

## Buttons and Links

Primary buttons:

- Black pill button with white/off-white text.
- Padding should feel close to `text-color-scheme-ref.png`: compact, not oversized.
- Hover state may slightly lighten the black or invert the border, but should remain subtle.

Secondary actions:

- Use underlined text links for secondary actions.
- Pair links with a small circular icon button only when useful, similar to the download buttons in `text-color-scheme-ref.png`.
- Circular icon buttons should be simple, 1px bordered or solid black, and sized consistently.

Accent states:

- Orange is reserved for selected states, small status dots, and tiny moments of emphasis.
- Do not use orange as a large background block, gradient, or dominant brand color.

## Projects Section

Use `client/ui-ref/projects-ref.png` as the model for the main projects archive:

- Layout should feel like an archive/list, not a grid of marketing cards.
- Each project row includes a small category/discipline label, a large project name, and a right arrow affordance.
- Rows are separated by thin horizontal dividers.
- Keep the background warm gray and the typography near-black.
- Hover state can shift the row slightly, darken text, show a subtle orange dot, or move the arrow a few pixels.
- Avoid large image cards unless a project detail page needs them.

Suggested project row structure:

- Category label: small, uppercase or compact regular text.
- Project title: large, direct, and readable.
- Right action: simple arrow icon or text arrow.
- Optional meta: year or role, only if it does not clutter the row.

## Pixel-Art Usage

Use `client/public/8bit-laptop-computer.png` as a subtle personality accent:

- Place it in the hero corner, near the footer, or beside a short intro block.
- Keep it visually secondary to the type and projects.
- Use crisp rendering, such as `image-rendering: pixelated` where appropriate.
- Do not build the entire site in an 8-bit theme.
- Do not introduce many pixel-art assets unless they are small and consistent with the laptop.
- The pixel accent should feel like a personal signature, not the main visual system.

## Page Direction

Recommended page structure:

1. Header with centered tabs.
2. Intro section with name, role, short positioning statement, and small 8-bit laptop accent.
3. Projects archive/list section following `projects-ref.png`.
4. About section with short, direct copy and one or two bordered detail blocks.
5. Contact/footer with simple links and a restrained orange accent dot.

Overall behavior:

- Keep interactions subtle and fast.
- Preserve whitespace on desktop and mobile.
- Ensure text never overlaps cards, buttons, arrows, or pixel art.
- Favor utility and clarity over decorative complexity.

## Implementation Notes

- This is a Next.js and Tailwind project. Prefer using existing app structure and Tailwind utilities.
- Preserve the Geist font setup unless there is a strong reason to replace it.
- Define reusable color tokens in CSS variables or Tailwind theme values before applying them broadly.
- Do not add a UI library unless the implementation specifically needs one.
- Use semantic HTML: `header`, `nav`, `main`, `section`, `footer`.
- Keep accessibility visible: strong color contrast, clear focus states, meaningful link labels, and sensible heading order.

## Acceptance Criteria

- The final site matches the minimal warm-neutral direction of `text-color-scheme-ref.png`.
- Header tab placement follows `header.png`, while ignoring the far-left logo/text and avoiding that font.
- Projects follow the archive/list rhythm from `projects-ref.png`.
- The 8-bit laptop appears as a subtle accent using `client/public/8bit-laptop-computer.png`.
- Borders are thin, rounding is restrained, buttons are compact, and orange is used sparingly.
- The site feels portfolio-grade: focused, confident, personal, and direct.
