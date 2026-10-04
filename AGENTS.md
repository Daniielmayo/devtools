<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DevTools — project context

## What this is

Single-route marketing site for **DevTools**, a Spanish-language software engineering / SDLC studio. `app/page.tsx` is the only route and does nothing but stack 12 components in order. There is **no CMS, no API, no database, no env config, and no test framework** — every section's copy is a hardcoded array or literal inside its component file. Changing content means editing the component.

Single package, pnpm only (`packageManager: pnpm@11.1.3`). `pnpm-workspace.yaml` contains only `allowBuilds` (denying `sharp`/`unrs-resolver` postinstall scripts) and no `packages:` key — it is not a monorepo, don't add workspace packages there.

## Commands

```bash
pnpm dev            # turbopack is the default bundler in Next 16; no flag needed
pnpm build          # runs the TypeScript check itself ("Running TypeScript ...")
pnpm lint           # bare `eslint` over the repo
pnpm exec tsc --noEmit   # fast standalone typecheck; there is NO `typecheck` script
```

- **Do not invent `pnpm test` / e2e steps; nothing is installed to run them.**
- Verify in order: `pnpm lint` → `pnpm build`. `tsc --noEmit` is only worth running standalone for a quicker type-only loop; `pnpm build` already covers it and is the real gate.
- There is no CI (`.github/` does not exist), so those local runs *are* the gate.

### `pnpm lint` is already red on `main`

Two pre-existing errors and one warning are committed; don't attribute them to your change, and don't silently fix them as drive-bys:

- `components/Header.tsx` (`// SDLC`) and `components/ManifestoSection.tsx` (`// MANIFIESTO DEVTOOLS`) — `react/jsx-no-comment-textnodes`: these `//`-prefixed eyebrow labels are rendered as raw JSX children instead of inside `{"..."}`. If you add a label in that style, expect the same error.
- `app/layout.tsx` — `no-page-custom-font` warning, caused by the Material Symbols `<link>` in `<head>`

## Conventions

- **All UI copy is Spanish.** Keep new strings in Spanish; `<html lang="es">` and metadata `locale: es_ES` in `app/layout.tsx` depend on it.
- **Tailwind v4, no `tailwind.config.js`.** Design tokens live in the `@theme` block in `app/globals.css`: `brand-lime/navy/deep/slate/border/light` plus `font-display`/`font-body`/`font-mono`. Add new tokens there, never in a config file. PostCSS runs via `@tailwindcss/postcss` (`postcss.config.mjs`).
- **Container/responsive idiom:** every section root is `max-w-[1240px] mx-auto px-4 sm:px-6` with mobile-first breakpoints (`text-3xl sm:text-6xl`, `py-14 sm:py-20`). Match it.
- **`"use client"` only where interactive** — currently just `Header.tsx` (mobile drawer) and `CtaSection.tsx`. Leave everything else as a server component.
- **Icons:** no icon package. Icons are Material Symbols Outlined, loaded by a raw `<link>` in `app/layout.tsx`, used as `<span className="material-symbols-outlined text-[18px]">east</span>`. Keep that pattern.
- **Content arrays live at the top of the component** (`faqs`, `items`, …) and are mapped inline — no separate data files.

## Anchor navigation is a cross-file contract

`Header`, `Footer`, and the Hero/CTAs link to `#servicios`, `#disponibilidad`, `#metodologia`, `#casos`, `#faq`, `#contacto` with plain `<a href="#...">` (not `<Link>` — intentional, it's same-page). The matching `id` sits on each section's root `<section>`. **Renaming or reordering a section `id` silently breaks nav** — update the nav in the same change.

Related offset coupling: `Header` is `fixed ... h-20` and `<main>` in `app/page.tsx` carries `pt-20` to compensate. Change one, change both.

Numbered eyebrow labels use `NN / UPPERCASE` in `font-mono` (`01 / CAPACIDADES TÉCNICAS`, `02 / METODOLOGÍA SDLC`, `03 / …`, `04 / …`).

## Traps

- `animate-in slide-in-from-top-2` on the mobile drawer (`components/Header.tsx`) are **`tailwindcss-animate` utilities that are not installed** — they emit nothing and the drawer just appears. Don't assume those classes work, and don't "fix" the drawer by assuming a plugin is present.
- `next-env.d.ts` and `.next/types/*` are generated and gitignored. Never edit or commit them; they're rewritten by `next dev` / `next build`.
- `public/*.svg` are unused create-next-app boilerplate. The site ships no raster/vector assets — don't reach for `next/image` expecting an image pipeline.
- `next.config.ts` is intentionally empty (no experimental flags, no cache components). Turning on a flag is a real architectural change, not a tweak.
