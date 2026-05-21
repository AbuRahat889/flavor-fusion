# Flavor Fusion — Backend (TypeScript)

Production-ready Express + TypeScript backend using PostgreSQL (Prisma) and MongoDB (Mongoose), with JWT auth and role-based access.

## Stack
- Node.js + Express 4
- TypeScript 5 (strict)
- Prisma ORM → PostgreSQL
- Mongoose → MongoDB (activity logs)
- JWT auth + bcrypt
- Zod validation
- helmet, cors, rate-limit, xss-clean, compression, morgan

## Architecture
```
src/
├── config/         # env, prisma, mongo
├── controllers/    # HTTP layer
├── services/       # business logic
├── repositories/   # data access (Prisma)
├── models/         # Mongoose schemas
├── routes/v1/      # versioned routes
├── middlewares/    # auth, error, validate, rate-limit
├── validators/     # Zod schemas
├── utils/          # response, jwt, asyncHandler, seed
├── app.ts          # express app factory
└── server.ts       # entry
```

## Setup
```bash
npm install
cp .env.example .env          # edit DATABASE_URL, MONGO_URI, JWT_SECRET
npx prisma migrate dev --name init
npm run dev
```

## Default Admin
On every server boot the default admin is created/promoted **idempotently**.
Configure via `.env`:
```
DEFAULT_ADMIN_EMAIL=admin@flavor.com
DEFAULT_ADMIN_PASSWORD=admin123
DEFAULT_ADMIN_NAME=Super Admin
```
You can also run it manually: `npm run seed`.

## Endpoints — `/api/v1`
| Method | Path                    | Auth     |
|--------|-------------------------|----------|
| POST   | /auth/register          | public   |
| POST   | /auth/login             | public   |
| GET    | /auth/me                | user     |
| GET    | /categories             | public   |
| POST   | /categories             | admin    |
| PUT    | /categories/:id         | admin    |
| DELETE | /categories/:id         | admin    |
| GET    | /products               | public   |
| GET    | /products/:id           | public   |
| POST   | /products               | admin    |
| PUT    | /products/:id           | admin    |
| DELETE | /products/:id           | admin    |

`GET /products` accepts `categoryId`, `page`, and `limit` as query params and returns `{ items, meta }` for pagination.

| POST   | /orders                 | public   |
| GET    | /orders                 | admin    |
| PATCH  | /orders/:id/status      | admin    |

## Frontend integration
In the Lovable React app set:
```
VITE_API_URL=http://localhost:5000/api/v1
```
Then replace the mock contexts (`MenuContext`, `OrderContext`, `CategoryContext`, `AdminAuthContext`) with `fetch` calls hitting these endpoints, persisting the JWT from `/auth/login` in `localStorage` and sending it as `Authorization: Bearer <token>`.

## Push to GitHub
```bash
git init
git add .
git commit -m "feat: typescript backend with default admin"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
