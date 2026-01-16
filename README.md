# RPGZume Tormenta Monorepo

This monorepo contains the backend and frontend for the RPGZume Tormenta project.

## Structure

- `backend/`: API (Java/Spring) - [Original Repo](https://github.com/allysonhalley/rpgzume-api)
- `frontend/`: Web Client (Angular) - [Original Repo](https://github.com/allysonhalley/rpgzume-api-front)

## Setup

Please refer to the README files within each subdirectory for specific setup instructions.

### Quick Start

1. **Backend**:
   - Requires Java and Maven.
   - Database: PostgreSQL (configured for port **5433**, user `postgres`, password `123456`).
   - Run: `cd backend && ./mvnw spring-boot:run`
   - Server starts on `http://localhost:8080`.

2. **Frontend**:
   - Requires Node.js and Angular CLI.
   - Run: `cd frontend && npm install && npm start`
   - Application starts on `http://localhost:4200` (proxies `/api` to `localhost:8080`).

