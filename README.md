# RunnerClub Backend

Backend API service built with **Node.js + TypeScript + NestJS + Prisma + PostgreSQL**.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [NestJS](https://nestjs.com/) | Backend framework (built on Express) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Prisma](https://www.prisma.io/) | Database ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Docker](https://www.docker.com/) | Local database containerization |

---

## Prerequisites

- **Node.js** >= 18.x (recommended: manage versions with [nvm](https://github.com/nvm-sh/nvm))
- **Docker Desktop** (for running PostgreSQL locally)

---

## Local Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

The default values in `.env.example` work out of the box for local development.

### 3. Start the database container

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker compose ps
```

### 4. Run database migrations (first time only)

```bash
npx prisma migrate dev --name init
```

This creates the database tables based on `prisma/schema.prisma`.

### 5. Seed test data (optional)

```bash
npm run prisma:seed
```

### 6. Start the development server

```bash
npm run start:dev
```

The server starts at `http://localhost:3000/api`.

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in development mode (with hot reload) |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Start in production mode (requires build first) |
| `npx prisma migrate dev` | Create and apply a new database migration |
| `npx prisma studio` | Open Prisma's visual database browser |
| `npx prisma generate` | Regenerate Prisma Client |
| `npm run prisma:seed` | Seed the database with test data |
| `docker compose up -d` | Start the database container in the background |
| `docker compose down` | Stop and remove containers |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma     # Data model definitions
│   └── seed.ts           # Database seed script
├── src/
│   ├── main.ts           # Application entry point
│   ├── app.module.ts     # Root module
│   ├── common/           # Shared utilities
│   │   ├── filters/      # Exception filters
│   │   ├── interceptors/ # Interceptors (logging, etc.)
│   │   ├── guards/       # Guards (auth, etc.)
│   │   ├── decorators/   # Custom decorators
│   │   └── pipes/        # Validation pipes
│   └── modules/          # Feature modules
│       ├── health/       # Health check  GET /api/health
│       ├── tryon/        # Virtual try-on
│       ├── events/       # Events / races
│       ├── admin/        # Admin panel
│       ├── integrations/ # Third-party integrations (no routes)
│       ├── commerce/     # E-commerce
│       ├── providers/    # Service providers (no routes)
│       └── storage/      # File storage (no routes)
├── docker-compose.yml    # Local database container config
├── .env.example          # Environment variable template
└── package.json
```

---

## API Routes

All routes are prefixed with `/api`:

| Module | Prefix | Description |
|--------|--------|-------------|
| Health | `GET /api/health` | Service health check |
| Try-on | `/api/tryon` | Virtual try-on endpoints |
| Events | `/api/events` | Events / race endpoints |
| Admin | `/api/admin` | Admin management endpoints |
| Commerce | `/api/commerce` | Product / order endpoints |
>>>>>>> 18f4e03 (chore: initial NestJS backend scaffold)
