# Flavor Fusion — Backend (TypeScript)

A production-ready Express + TypeScript backend for the Flavor Fusion app. It provides a clean, tested API with PostgreSQL (via Prisma) for primary data storage and MongoDB (via Mongoose) for activity logging. Built with security, observability and developer ergonomics in mind.

**Key features**
- Role-based JWT authentication (admin, user)
- Prisma ORM for PostgreSQL with migrations
- Mongoose for activity logs
- Request validation with Zod
- Production middleware: helmet, cors, rate limiting, compression, logging
- Idempotent default admin seeding

## Tech Stack
- Node.js 18+ / Express 4
- TypeScript 5 (strict)
- PostgreSQL + Prisma
- MongoDB + Mongoose
- Zod, bcrypt, jsonwebtoken

## Project Layout
```
src/
├── config/         # env, prisma client, mongo connection
├── controllers/    # HTTP handlers
├── services/       # business logic
├── repositories/   # Prisma data access
├── models/         # Mongoose schemas
├── routes/v1/      # API routes
├── middlewares/    # auth, error handling, rate-limit, validation
├── validators/     # Zod request schemas
├── utils/          # helpers: jwt, response, pagination, seed
├── app.ts          # express app factory
└── server.ts       # process bootstrap
```

## Quick Start
1. Install dependencies

```bash
npm install
```

2. Copy and edit environment variables

```bash
cp .env.example .env
# then edit DATABASE_URL, MONGO_URI, JWT_SECRET, and other values
```

3. Run database migrations and start (development)

```bash
npx prisma migrate dev --name init
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Environment Variables
Set values in `.env` (see `.env.example`). Important keys:
- `DATABASE_URL` — Postgres connection string
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing tokens
- `DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PASSWORD`, `DEFAULT_ADMIN_NAME` — used by the seed routine

## Default Admin
On startup the server will create or promote the default admin account idempotently. You can also run the seeder manually:

```bash
npm run seed
```

## API Overview — /api/v1
Core endpoints (authentication, categories, products, orders, dashboard):

- POST /auth/register — public
- POST /auth/login — public
- GET /auth/me — authenticated user
- GET /categories — public
- POST /categories — admin
- PUT /categories/:id — admin
- DELETE /categories/:id — admin
- GET /products — public (supports `categoryId`, `page`, `limit`)
- GET /products/:id — public
- POST /products — admin
- PUT /products/:id — admin
- DELETE /products/:id — admin
- POST /orders — public
- GET /orders — admin
- PATCH /orders/:id/status — admin

For full API details and examples refer to the route handlers in the `src/routes/v1` folder.

## Development Tips
- Use `npm run dev` for hot-reloading during feature work.
- Run Prisma Studio: `npx prisma studio` to inspect the database.
- Activity logs are persisted to MongoDB — check `src/models/ActivityLog.ts`.

## Contributing
1. Fork the repo and create a feature branch.
2. Follow existing TypeScript and linting conventions.
3. Open a PR with a clear summary and testing instructions.

## License
MIT

---

If you'd like, I can also:
- add a short API examples section, or
- generate a small Postman/Insomnia collection for the endpoints.
