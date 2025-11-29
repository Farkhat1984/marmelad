# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Tech Stack

React 18 + TypeScript + Vite + TailwindCSS + Framer Motion

## Architecture

Landing page for MARMELAT (Kazakhstan hair styling brand). Single-page app with sections in App.tsx:
`Header → Hero → About → Benefits → Products → Bundles → Partners → Footer + ScrollToTop`

**Key directories:**
- `src/components/` - Section components matching page flow
- `src/data/brandData.ts` - All content: `products`, `bundles`, `partners`, `benefits`, `contactInfo`, `missionText`, `slogan`
- `src/types/index.ts` - TypeScript interfaces (Product, Bundle, Partner, Benefit, ContactInfo)
- `src/hooks/` - `useScrollAnimation` (IntersectionObserver visibility), `useCarousel` (Framer Motion drag navigation)
- `public/images/products/` - Images in product folders (wax_stick/, gel_for_vellus_hair/, etc.)

**Prices:** KZT (Kazakh Tenge), dual pricing: `priceRetail` / `priceWholesale`

**Styling:**
- TailwindCSS with custom brand colors: `marmelat-pink` (#F5BED7), `marmelat-dark-pink` (#E8A5C4), `marmelat-light-pink` (#FDF0F5)
- Custom font "Horizon" via `font-display` class
- Framer Motion for component animations
- Custom breakpoints: xs(375), sm(768), md(1024), lg(1440), xl(1920)

**Content language:** Russian
