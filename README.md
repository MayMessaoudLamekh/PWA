# 🚗 SmartCar — Smart Car Management

A platform to manage a car: the user enters **model, mileage, consumption and maintenance**, and the system computes **📊 consumption, 🔧 maintenance, 💰 costs, 📅 reminders and 📈 evolution**, and predicts:

> "Based on your driving history, your next maintenance is probably due around…"

> 🧱 **This is a skeleton.** The backend (database, auth, validation, server actions, queries, analytics) is ready.
> Pages are placeholders with `TODO (UI)` comments listing which queries/actions to use — the team builds the interface.

**Stack:** Next.js 16 (App Router, Server Actions) · TypeScript · Tailwind CSS 4 · Prisma 6 + MongoDB (Atlas) · Zod

---

## 🚀 Getting started

### MongoDB Atlas setup (once per teammate)

1. Ask the project owner to invite you to the Atlas project, or to give you a database user.
2. **Network Access** → *Add IP Address* → add your current IP (or `0.0.0.0/0` for development only).
3. **Database → Connect → Drivers** → copy the `mongodb+srv://…` string into `DATABASE_URL` in `.env`,
   with your user/password and the database name `/smartcar` before the `?`.

> ⚠️ Everyone shares the same Atlas database. `db:seed` and `db:reset` **wipe all data** — tell the group first.

```bash
npm install           # also generates the Prisma client
cp .env.example .env  # first time only — then put the MongoDB connection string in it
npm run db:push       # create collections + indexes in MongoDB
npm run db:seed       # load demo data
npm run dev           # http://localhost:3000
```

Demo accounts (use them once the login form is built) (from `prisma/seed.ts`):

| Role  | Email                  | Password    |
| ----- | ---------------------- | ----------- |
| Admin | `admin@smartcar.test`  | `admin123`  |
| User  | `driver@smartcar.test` | `driver123` |

> When you register a new account on an empty database, the first account becomes **ADMIN**.

### Scripts

| Command                         | What it does                                       |
| ------------------------------- | -------------------------------------------------- |
| `npm run dev`                   | Start the dev server                               |
| `npm run build`                 | Production build (run before opening a PR)        |
| `npm run lint` / `typecheck`    | ESLint / TypeScript checks                         |
| `npm run db:push`               | Sync schema changes (indexes) to MongoDB           |
| `npm run db:generate`           | Regenerate the Prisma client                       |
| `npm run db:seed`               | Wipe & reload demo data                            |
| `npm run db:reset`              | ⚠️ Wipe the whole database and reload the seed      |
| `npm run db:studio`             | Visual DB browser (Prisma Studio)                  |

---

## 🎨 Theme

The colour chart lives in `src/app/globals.css` (`:root` variables) and is exposed as Tailwind classes:
`bg-bg`, `bg-surface`, `bg-panel`, `text-primary`, `bg-accent`, `border-border`, `text-text`, `text-muted`.
Use these instead of raw colours so the whole app stays consistent. Font: Poppins.

The public landing page (`/`) is built from the Oberlo template, in `src/features/landing/`
(stats and garages come live from the database; the "Get in touch" form saves to `ContactMessage`).

## 🧩 Modules (one owner each)

| # | Module                    | Feature folder           | Pages                                     | DB models                                          |
|---|---------------------------|--------------------------|-------------------------------------------|----------------------------------------------------|
| 1 | **User Management**       | `src/features/users`     | `/login` `/register` `/profile` `/users`  | `User`                                             |
| 2 | **Car Management**        | `src/features/cars`      | `/dashboard` `/cars` `/cars/[carId]`      | `Car` `FuelLog` `Maintenance` `Trip` `Reminder`    |
| 3 | **Insurance Management**  | `src/features/insurance` | `/insurance`                              | `Insurance`                                        |
| 4 | **Complaints Management** | `src/features/complaints`| `/complaints`                             | `Complaint`                                        |
| 5 | **Garage Management**     | `src/features/garages`   | `/garages` `/garages/[garageId]/edit`     | `Garage`                                           |

> Fill in the owners: 1. ___ 2. ___ 3. ___ 4. ___ 5. ___

---

## 📁 Project structure

```
smartcar/
├── prisma/
│   ├── schema.prisma          # DB schema — one section per module
│   └── seed.ts                # demo data
├── prisma.config.ts           # Prisma CLI config (reads DATABASE_URL)
├── src/
│   ├── app/                   # ROUTES ONLY — placeholder pages (see TODO comments)
│   │   ├── (auth)/            # public pages: login, register (centered layout)
│   │   ├── (app)/             # logged-in pages (sidebar + topbar layout)
│   │   │   ├── dashboard/
│   │   │   ├── cars/  [carId]/  new/
│   │   │   ├── insurance/
│   │   │   ├── garages/
│   │   │   ├── complaints/
│   │   │   ├── users/         # admin only
│   │   │   └── profile/
│   │   ├── layout.tsx         # root layout (html, fonts)
│   │   └── page.tsx           # public landing page
│   │
│   ├── features/              # ⭐ ALL BUSINESS LOGIC — one folder per module
│   │   └── <module>/
│   │       ├── actions.ts     # "use server" — mutations (create/update/delete)
│   │       ├── queries.ts     # server-only — DB reads
│   │       ├── schemas.ts     # Zod validation for forms
│   │       ├── components/    # UI specific to this module (empty — to build)
│   │       └── …              # extra logic (cars/analytics.ts, insurance/status.ts)
│   │
│   ├── components/
│   │   ├── ui/                # shared building blocks: Button, Input, Card… (empty — to build)
│   │   └── layout/            # Sidebar, Topbar (empty — to build)
│   ├── config/
│   │   ├── constants.ts       # enum values (fuel types, statuses…), currency, locale
│   │   └── navigation.ts      # navigation links
│   ├── lib/                   # framework-level helpers (prisma, session, password, format, zod)
│   └── proxy.ts               # redirects logged-out users to /login
└── .env.example
```

### The golden rules

1. **Pages in `app/` stay thin.** They read params, call `requireUser()`, call a query, and render feature components.
2. **Work in your own feature folder.** If you need another module's data, import its `queries.ts` (e.g. complaints uses `listGarageOptions()` from garages). Don't write Prisma calls for someone else's model.
3. **Every server action starts with `requireUser()` or `requireAdmin()`.** Server actions are public endpoints. Also check ownership (`where: { id, ownerId: user.id }`).
4. **Validate every form with Zod** in `schemas.ts`, and return `validationError(parsed.error)` so the form shows field errors automatically.
5. **Enum-like values live in `src/config/constants.ts`.** Never hard-code `"OIL_CHANGE"` strings in components.
6. **Generic UI goes in `components/ui`**, module-specific UI in `features/<module>/components`.

---

## 🛠️ How to add a feature (example: "add a field to Garage")

1. `prisma/schema.prisma` → add the field to `Garage`.
2. `npm run db:push` (MongoDB has no migrations — this syncs indexes and regenerates the client).
3. `src/features/garages/schemas.ts` → add the field to the Zod schema.
4. Add the input to your garage form and display it. The action already saves `parsed.data`.

### Form pattern (used everywhere)

```tsx
// features/x/actions.ts
"use server";
export async function createX(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = xSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  await prisma.x.create({ data: { ...parsed.data, userId: user.id } });
  revalidatePath("/x");
  return { ok: true, message: "Saved." };
}

// features/x/components/x-form.tsx
"use client";
const [state, action, pending] = useActionState(createX, undefined);
<form action={action}>
  <input name="name" />
  {state?.errors?.name && <p>{state.errors.name[0]}</p>}
  {state?.message && <p>{state.message}</p>}
  <button disabled={pending}>Save</button>
</form>
```

---

## 🧠 Smart features (Car module)

All the calculations are **pure functions** in `src/features/cars/analytics.ts` (easy to test & extend):

| Function                  | What it computes                                                         |
| ------------------------- | ------------------------------------------------------------------------ |
| `consumptionSeries`       | L/100km between full-tank refuels → consumption chart                    |
| `averageConsumption`      | average L/100km                                                          |
| `costSummary`             | fuel + maintenance + insurance totals, cost per km                       |
| `monthlyCosts`            | spending per month → evolution chart                                     |
| `kmPerDay`                | driving rhythm from odometer readings                                    |
| `predictNextMaintenance`  | next service mileage (last service + 10,000 km) and **estimated date**   |
| `upcomingReminders`       | reminders overdue / due within 30 days or 1,000 km                       |

### Ideas for later

- 📍 **GPS / map**: garages already store `latitude`/`longitude` — show them on a map (Leaflet + OpenStreetMap).
- ⛽ **Fuel stations & prices**: `FuelLog.station` exists; add a `FuelPrice` model or an external API.
- 🗺️ **Trips**: estimated cost per trip is already shown; add route distance via a maps API.
- 🔔 **Notifications**: email reminders for due maintenance / expiring insurance.

---

## 🤝 Git workflow

- `main` is always working. Never push directly to it.
- Branch per task: `feature/<module>-<short-desc>` (e.g. `feature/garages-rating`), `fix/…`.
- Small PRs, one teammate reviews. Run `npm run lint && npm run build` before opening.
- Schema changes: **one person at a time** — announce it in the group, others run `npm run db:generate` after pulling.
- Commit messages: `garages: add rating field`, `cars: fix consumption chart`.
