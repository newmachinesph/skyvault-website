# SKYVAULT Elevator Cab Configurator

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-SQLite-2D3748?logo=prisma)

Marketing site and interactive 3D elevator cab configurator for SKYVAULT, a custom
elevator-interior brand. Visitors walk through a four-step wizard (cab size, finishes,
options, contact), watch the cab update live in a procedurally rendered React Three Fiber
model, and submit the design as a lead. Submissions are stored in SQLite via Prisma,
trigger an optional SMTP notification, and are reviewed in an admin dashboard with a
printable summary per configuration.

## Features

- **Multi-step configurator** (`/configure`): CabSizeStep, FinishesStep, OptionsStep,
  ContactStep, with state held in a React context (`useConfigurator()`).
- **Live 3D preview**: walls, floor, ceiling, handrails and mirrors are generated in code
  (no external 3D assets); material properties live in `src/lib/material-map.ts`.
- **Business-rule validation** (`src/lib/validation.ts`), e.g. freight cabs cannot have
  glass walls and COP options are mutually exclusive.
- **Lead capture**: `POST /api/configurations` saves a `Configuration` and `Lead`, then
  sends an email notification if SMTP is configured.
- **Admin dashboard** (`/admin`): NextAuth v5 credentials login, configuration list, and a
  status workflow (new, reviewed, quoted, archived).
- **Printable summary**: `GET /api/pdf/[id]` returns an HTML page ready to print to PDF.
- Marketing pages: home (hero video), about, contact.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Headless UI, Heroicons,
Lucide, React Three Fiber + drei (three.js), Prisma 6 with SQLite, NextAuth v5 (beta),
Nodemailer.

## Getting started

Requires Node.js 20+.

```bash
npm install
npx prisma generate      # generate the Prisma client
npx prisma db push       # create/update the SQLite schema
npm run dev              # http://localhost:3000
```

Create a `.env` file (it is git-ignored):

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | SQLite connection string, e.g. `file:./dev.db` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | yes | Admin dashboard login |
| `AUTH_SECRET` | yes | NextAuth secret |
| `NEXTAUTH_URL` | yes | Base URL, e.g. `http://localhost:3000` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `NOTIFICATION_EMAIL` | no | Email notifications for new submissions (logged to the console when unset) |

## Scripts

```bash
npm run dev             # start the dev server
npm run build           # production build
npm run start           # start the production server
npm run lint            # ESLint (flat config, eslint.config.mjs)
npx prisma studio       # browse the database
npx tsx prisma/seed.ts  # seed script (schema only, no sample data)
```

There is no automated test suite yet.

## Project structure

```
prisma/                       schema.prisma (Configuration, Lead), seed.ts, empty dev.db
public/                       logo, hero video, icons
src/app/                      pages: /, /about, /contact, /configure, /summary/[id], /admin
src/app/api/                  configurations, pdf and NextAuth routes
src/components/               Navbar, HeroVideo, ScrollElevator
src/components/configurator/  wizard steps, context, 3D viewer and cab model
src/lib/                      auth, email, Prisma client, validation, option data, material map
src/types/                    shared TypeScript types
```

Elevator options (cab types, finishes, lighting, accessories) are static data in
`src/lib/data/elevator-options.ts`, not database rows. The `@/*` import alias maps to
`./src/*`.

## API

| Route | Access | Description |
|---|---|---|
| `POST /api/configurations` | public | Save configuration and lead, send notification |
| `GET /api/configurations` | admin | List all configurations |
| `GET /api/configurations/[id]` | public | Single configuration |
| `PATCH /api/configurations/[id]` | admin | Update status |
| `GET /api/pdf/[id]` | public | Printable HTML summary |

## License

Released under the [MIT License](LICENSE). MIT covers the code; the SKYVAULT name and logo
identify the project.
