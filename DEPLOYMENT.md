# NEXUS - Deployment & Infrastructure Guide

This guide covers production deployment for the **NEXUS** anonymous adult dating platform (18+).

---

## 1. Quick Local Development Setup

### Step A: Prerequisites
- **Node.js**: v20.x or higher
- **Docker & Docker Compose**: Recommended for local PostgreSQL & Redis instances

### Step B: Launch Services with Docker Compose
```bash
docker-compose up -d
```
This spins up:
- **PostgreSQL** on port `5432`
- **Redis** on port `6379`
- **NestJS API** on `http://localhost:4000`
- **Next.js Frontend** on `http://localhost:3000`

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure `DATABASE_URL` matches your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://nexus_user:nexus_password@localhost:5432/nexus_db?schema=public"
JWT_SECRET="your_production_jwt_secret_key"
```

---

## 3. Database Migrations

Run Prisma migrations inside `backend/`:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

---

## 4. Swagger API Documentation

Once the backend is running, access live interactive Swagger OpenAPI documentation at:
- **`http://localhost:4000/api/docs`**

---

## 5. Security & Privacy Shield Architecture

1. **Client-Side E2E Photo Shield**: Photos are encrypted upon upload and shown as blurred placeholders (`.photo-locked`) until both users submit mutual reveal consent.
2. **Rate-Limiting**: Enforced via NestJS ThrottlerGuard on auth endpoints.
3. **No Precise GPS**: Distances are computed and rounded to neighborhood radii to prevent location tracking.
