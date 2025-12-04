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

React 18 + TypeScript + Vite + TailwindCSS + Framer Motion + React Router

## Architecture

MARMELAT (Kazakhstan hair styling brand) website with two main routes:

### Routes (main.tsx)
- `/` - Landing page (App.tsx)
- `/pitch` - Investor pitch deck (PitchDeck.tsx)

### Landing Page Structure (App.tsx)
Single-page app with sections: `Header → Hero → About → Benefits → Products → Bundles → Partners → Footer + ScrollToTop`

**Key directories:**
- `src/components/` - Section components matching page flow
- `src/pages/` - PitchDeck page component
- `src/data/brandData.ts` - Landing page content: `products`, `bundles`, `partners`, `benefits`, `contactInfo`, `missionText`, `slogan`
- `src/data/pitchDeckData.ts` - Pitch deck content: slides, financials, market data, team info
- `src/types/index.ts` - TypeScript interfaces (Product, Bundle, Partner, Benefit, ContactInfo, PitchSlide, Competitor, etc.)
- `src/hooks/` - `useScrollAnimation` (IntersectionObserver visibility), `useCarousel` (Framer Motion drag navigation)
- `public/images/products/` - Images in product folders (wax_stick/, gel_for_vellus_hair/, etc.)

### Pitch Deck (/pitch)
- Full-screen presentation with 12 slides (cover, problem, solution, market, products, business model, traction, competition, team, financials, investment, contact)
- Keyboard navigation (arrows/space), dots navigation, mobile menu
- Custom chart components: RevenueChart (line), DonutChart, CompetitiveMatrix (scatter), UnitEconomicsDashboard
- Progress bar, slide counter, navigation arrows
- All pitch content centralized in `src/data/pitchDeckData.ts`

**Prices:** KZT (Kazakh Tenge), dual pricing: `priceRetail` / `priceWholesale`

**Styling:**
- TailwindCSS with custom brand colors: `marmelat-pink` (#F5BED7), `marmelat-dark-pink` (#E8A5C4), `marmelat-light-pink` (#FDF0F5)
- Custom font "Horizon" via `font-display` class (Hero section + pitch deck cover only)
- Framer Motion for component animations
- Custom breakpoints: xs(375), sm(768), md(1024), lg(1440), xl(1920)

**Content language:** Russian

## Content Editing

- **Products/Bundles/Partners:** Edit `src/data/brandData.ts`
- **Pitch deck slides/metrics:** Edit `src/data/pitchDeckData.ts`
- **Product images:** Add to `public/images/products/{product_folder}/`
- **Types:** Update `src/types/index.ts` when adding new data fields

## Deployment

- `deploy.sh` — Automated nginx + SSL setup
- `docker-compose.yml` — Docker deployment
- `nginx.conf` / `nginx-docker.conf` — Server configs
- Target domain: www.marmelat.kz
