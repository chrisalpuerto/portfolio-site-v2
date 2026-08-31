# Pook load-in animation (staggered fade-up)

How to add the same on-load entrance animation the login/landing page uses
(`frontend/app/page.tsx` + `frontend/app/styles/login.css`) to any other page in
this app.

An agent should be able to read this file alone and do the port. No existing
skill covers this — `pook-ui` mentions the animation exists but does not
document how to reuse it.

---

## 1. What the animation actually is

Pure CSS. No JS, no library, no `useEffect`, no IntersectionObserver. Every
element starts at `opacity: 0` and animates in once, on page load, with
`forwards` so it holds its end state. The stagger comes entirely from
`animation-delay` utility classes applied per element.

Two keyframes (source: `frontend/app/styles/login.css:312-320`):

- `element-in` — fade + 22px slide up. Used for most content.
- `mark-in` — fade + 10px slide up + scale from `.9`. Used only for the brand
  lockup, so the logo "pops" slightly instead of just sliding.

Both use the project's signature easing `cubic-bezier(.16, .8, .3, 1)`.
Durations: `.7s` for `element-in`, `.6s` for `mark-in`.

The stagger on the login page runs top-to-bottom in reading order, in 100ms
steps, with decorative flourishes last:

| Delay | Element |
|---|---|
| 0s | brand lockup (`mark-in`) |
| .10s | `h1` |
| .20s | subtitle `p` |
| .30s | first field |
| .40s | second field |
| .50s | options row |
| .60s | primary button |
| .70s | footer line |
| .80s / .90s | decorative corner hearts (last, deliberately) |

Cap the stagger around .9s. Beyond that the page feels slow.

## 2. Where the CSS goes on the target page

Two different situations — check which one applies before editing.

**Target is inside the `(app)` route group** (`frontend/app/(app)/**`, e.g.
dashboard, quizzes, study-guides, upcoming, settings). These share
`frontend/app/styles/dashboard.css` via `frontend/app/(app)/layout.tsx`. Add the
block below to `dashboard.css`, using the `pk-` prefix that file already uses
for every shared class. Do **not** import `login.css` — it carries unrelated
login-only layout and would leak styles.

**Target is another root-level page outside `(app)`.** Give it its own
stylesheet imported by that page, and paste the same block with whatever prefix
that file uses.

Block to add (namespaced for `dashboard.css`):

```css
/* ============================================================
   Page load-in — staggered fade-up, ported from login.css
   ============================================================ */
@keyframes pk-element-in {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pk-mark-in {
  from { opacity: 0; transform: translateY(10px) scale(.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.pk-animate-element {
  opacity: 0;
  animation: pk-element-in .7s cubic-bezier(.16, .8, .3, 1) forwards;
}
.pk-animate-mark {
  opacity: 0;
  animation: pk-mark-in .6s cubic-bezier(.16, .8, .3, 1) forwards;
}

.pk-animate-delay-100 { animation-delay: .10s; }
.pk-animate-delay-200 { animation-delay: .20s; }
.pk-animate-delay-300 { animation-delay: .30s; }
.pk-animate-delay-400 { animation-delay: .40s; }
.pk-animate-delay-500 { animation-delay: .50s; }
.pk-animate-delay-600 { animation-delay: .60s; }
.pk-animate-delay-700 { animation-delay: .70s; }
.pk-animate-delay-800 { animation-delay: .80s; }
.pk-animate-delay-900 { animation-delay: .90s; }

@media (prefers-reduced-motion: reduce) {
  .pk-animate-element,
  .pk-animate-mark {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

The `prefers-reduced-motion` guard is **not optional** — every animation in this
codebase has one, and without it the elements would be stuck at `opacity: 0` for
users who disable motion.

## 3. Applying it to the markup

Add class names only. Do not restructure the JSX, and do not move any existing
inline styles.

```tsx
<h1 className="pk-animate-element pk-animate-delay-100" style={{ ...existing }}>
```

If the element already has a `className`, append to it — never replace:

```tsx
<div className="pk-hover-card pk-animate-element pk-animate-delay-300" ...>
```

Rules for choosing what to animate:

- **Animate groups, not leaves.** One class on a card, not on every line inside
  it. The login page animates ~8 elements total.
- **Order by reading order,** top to bottom, one 100ms step each.
- **Siblings in a row/grid** (stat tiles, cards in a row) may share one delay,
  or step by 100ms if there are ≤4 of them. Don't stagger a long list — put one
  class on its container instead.
- **Decorative elements last** (.80s/.90s), like the login page's corner hearts.
- **Never animate the sidebar, topbar, or any layout chrome** from
  `(app)/layout.tsx` — those persist across client-side navigation, so a load-in
  animation on them would replay on every route change and look broken. Animate
  only the page's own content.
- `pk-animate-mark` is for a single logo/icon lockup at delay 0 if the page has
  one. Otherwise use `pk-animate-element` everywhere.

## 4. Gotchas

- **`transform` collision.** `pk-element-in` animates `transform`. If the target
  element already has a `transform` (a rotation, a `translate`, a hover lift),
  the animation will override it for its duration and then drop back. Wrap the
  element in an animating `<div>` and keep the existing transform on the inner
  element — that is exactly what the login page does with its hearts (the outer
  `.corner-hearts` div animates, the inner `<Heart>` keeps `rotate(-16deg)`).
- **`overflow: hidden` parents.** The 22px upward slide can be clipped if a
  parent clips overflow. Move the class to the clipping parent, or accept the
  clip.
- **Client-side nav.** These fire on mount, so they replay when the user
  navigates back to the page. That is fine and matches the intent — just keep it
  off persistent chrome (see above).
- **No `will-change`.** Not used anywhere in this codebase; don't introduce it.
- Works in both server and client components — it is pure CSS.

## 5. Verify

1. `cd frontend && npx tsc --noEmit` (class-name-only changes should be clean).
2. Load the page and confirm: content fades up top-to-bottom in ~0.9s, nothing
   stays invisible, nothing shifts layout after settling.
3. Toggle OS "reduce motion" and reload — everything must be visible instantly.
4. Note: Playwright/Chrome cannot launch in this environment (segfault), so
   step 2 and 3 need a manual browser check.

## 6. Reference

- Keyframes + utilities: `frontend/app/styles/login.css:308-343`
- Usage in markup: `frontend/app/page.tsx:93-233`
- Design system rules this must stay consistent with: `.claude/skills/pook-ui/`
