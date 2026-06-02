# 🍛 Spice Garden — Restaurant Website + Reservation System

A complete restaurant website with an **online menu**, **table reservation system**, and a **staff admin panel** to manage bookings and the menu.

Built with **Next.js 14 (App Router)**, **Prisma**, **SQLite**, **TypeScript** and **Tailwind CSS**.

![Tech](https://img.shields.io/badge/Next.js-14-black) ![Tech](https://img.shields.io/badge/Prisma-5-2D3748) ![Tech](https://img.shields.io/badge/SQLite-003B57) ![Tech](https://img.shields.io/badge/TypeScript-5-3178C6) ![Tech](https://img.shields.io/badge/TailwindCSS-3-38BDF8)

---

## ✨ Features

### 🌐 Public site
- Elegant landing page (hero, story, signature dishes)
- **Full menu** grouped by category with **veg / non-veg filter** and spicy markers
- **Online reservation form** with date/time/party-size & validation
- Fully responsive, restaurant-style design

### 🔐 Staff admin panel (`/admin`)
- Password-protected (cookie session, HMAC-signed)
- **Reservations dashboard** — KPIs + table; update status (Pending → Confirmed → Cancelled)
- **Menu management** — add dishes, toggle availability, delete

### 🛠 Engineering
- Type-safe **Server Actions** + **Zod** validation
- Clean separation: public route group `(site)` and guarded `(panel)`
- SQLite for **zero-setup** local development

---

## 🚀 Getting Started

```bash
npm install            # installs deps + generates Prisma client
npm run setup          # creates the SQLite DB and seeds demo data
npm run dev            # start the dev server
```

Open **http://localhost:3000**

| Page | URL |
|------|-----|
| Website | http://localhost:3000 |
| Menu | http://localhost:3000/menu |
| Reservations | http://localhost:3000/reservations |
| Staff admin | http://localhost:3000/admin |

**Admin password:** `admin123` (configurable in `.env`)

---

## 📦 Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run setup` | Create DB + seed demo data |
| `npm run db:studio` | Open Prisma Studio |

## 🧱 Structure
```
src/
├── app/
│   ├── (site)/           # Public: home, menu, reservations
│   ├── admin/
│   │   ├── login/        # Staff login
│   │   └── (panel)/      # Guarded: reservations + menu management
│   └── actions.ts        # Server Actions
├── components/           # Navbar, Footer, forms, admin widgets
└── lib/                  # prisma, auth, utils, validators
prisma/
├── schema.prisma         # MenuItem, Reservation
└── seed.ts               # 12 dishes + sample reservations
```

## ☁️ Deploy
Works on Vercel. For production, switch the Prisma `datasource` provider to `postgresql` and set `DATABASE_URL` (e.g. a free [Neon](https://neon.tech) database) plus `ADMIN_PASSWORD` and `AUTH_SECRET`.

---

Built as a portfolio project. ⭐
