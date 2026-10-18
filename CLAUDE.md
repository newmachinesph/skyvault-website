# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (flat config, eslint.config.mjs)
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma db push   # Push schema changes to SQLite database
npx prisma studio    # Open Prisma Studio GUI for database
npx tsx prisma/seed.ts  # Run database seed script
```

## Environment Variables

Required in `.env`:
- `DATABASE_URL` — SQLite connection string (e.g. `file:./dev.db`)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — Credentials for admin dashboard login
- `AUTH_SECRET` — NextAuth.js secret
- `NEXTAUTH_URL` — Base URL (e.g. `http://localhost:3000`)

Optional (email notifications):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `NOTIFICATION_EMAIL`

## Architecture

**Next.js 16 App Router** with Tailwind CSS v4, Prisma (SQLite), NextAuth v5 (beta), and React Three Fiber for 3D visualization.

### Data Flow

The configurator is a multi-step wizard (`/configure`) that collects elevator cab specifications, then saves them via `POST /api/configurations` which creates a `Configuration` + `Lead` in the database and fires an async email notification.

### Key Architectural Patterns

- **Configurator state**: React Context in `src/components/configurator/ConfiguratorContext.tsx` — provides `useConfigurator()` hook with step navigation, config state (`ConfiguratorState`), lead info, validation errors, and submission state.
- **Wizard steps**: 4-step flow — CabSizeStep → FinishesStep → OptionsStep → ContactStep. Steps are array-indexed in `src/app/configure/page.tsx`.
- **3D viewer**: `CabViewer3D` → `CabModel` using React Three Fiber. The `CabModel` reads config from context and renders walls/floor/ceiling/handrails/mirrors procedurally (no external 3D assets). Material properties are mapped in `src/lib/material-map.ts`.
- **Validation**: `src/lib/validation.ts` enforces business rules (e.g., freight cabs can't have glass walls, COP options are mutually exclusive). Validation runs on every config state change.
- **Static option data**: All elevator options (cab types, finishes, lighting, accessories) are defined in `src/lib/data/elevator-options.ts` — not in the database. The `getOptionLabel()` function resolves IDs to display names.

### Auth & Admin

- NextAuth v5 with credentials provider (`src/lib/auth.ts`). Admin routes (`/admin/*`) are protected via the `authorized` callback.
- Admin dashboard (`/admin`) is a **server component** that directly queries Prisma. Configuration detail pages allow status updates (new → reviewed → quoted → archived) via `PATCH /api/configurations/[id]`.

### API Routes

- `POST /api/configurations` — Public. Saves config + lead, sends email notification.
- `GET /api/configurations` — Admin-only. Lists all configurations.
- `GET /api/configurations/[id]` — Public. Single configuration detail.
- `PATCH /api/configurations/[id]` — Admin-only. Update status.
- `GET /api/pdf/[id]` — Public. Returns an HTML page (printable to PDF) for a configuration.

### Database

Prisma with SQLite. Two models: `Configuration` (cab specs + status) and `Lead` (contact info). The `options` field stores a JSON-stringified array of accessory IDs. Schema is in `prisma/schema.prisma`.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### UI

Tailwind CSS v4 (via `@tailwindcss/postcss`), Headless UI, Heroicons, and Lucide React for icons. Utility `cn()` function in `src/lib/utils.ts` merges Tailwind classes via `clsx` + `tailwind-merge`.
