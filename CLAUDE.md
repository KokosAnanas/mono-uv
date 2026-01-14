# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Uvedomlenie" is a monorepo for a notice/violation tracking application with Russian localization. It consists of:
- **Backend**: NestJS API with MongoDB (Mongoose)
- **Frontend**: Angular 19 SPA with PrimeNG UI components
- **Infrastructure**: Docker Compose with Nginx reverse proxy

## Development Commands

### Backend (run from `backend/` directory)
```bash
npm install                    # Install dependencies
npm run start:dev              # Development with hot reload
npm run start:debug            # Debug mode with watch
npm run build                  # Production build
npm run lint                   # ESLint with auto-fix
npm run test                   # Unit tests (Jest)
npm run test:watch             # Watch mode testing
npm run test:e2e               # E2E tests (uses test/jest-e2e.json)
npm run test:cov               # Test coverage
```

### Frontend (run from `frontend/` directory)
```bash
npm install                    # Install dependencies
npm start                      # Dev server with API proxy (port 4200)
npm run build                  # Production build
npm run test                   # Unit tests (Karma/Jasmine)
ng generate component <name>   # Scaffold new component
```

### Docker (run from root directory)
```bash
docker compose up --build      # Build and start all services
docker compose down            # Stop services
```

## Architecture

### Backend Structure
- **Entry**: `backend/src/main.ts` - Sets global `/api` prefix, CORS, body limits (20mb), static file serving at `/api/uploads`
- **Modules**: Feature modules in `backend/src/controllers/` with co-located controllers
  - `UsersModule` - User registration, authentication (Passport local + JWT)
  - `NoticesModule` - CRUD for notices with file uploads (Multer)
  - `HealthModule` - Health check endpoint
- **Services**: Business logic in `backend/src/services/`
- **Schemas**: Mongoose schemas in `backend/src/shemas/` (sic: typo in directory name)
- **DTOs**: Request validation in `backend/src/dto/`
- **Auth**: JWT strategy in `backend/src/services/authentication/`, constants in `backend/src/static/privat/constants.ts`

### Frontend Structure
- **Entry**: `frontend/src/main.ts` → `app.config.ts` (providers, PrimeNG theme, Russian locale)
- **Routes**: `frontend/src/app/app.routes.ts` - Protected by `authGuard`, layout wrapper pattern
- **Services**: `frontend/src/app/services/` - HTTP clients with auth interceptor
- **API URLs**: Centralized in `frontend/src/app/shared/api/index.ts`
- **Pages**: `frontend/src/app/pages/` - Auth, Home, Registry, Notice views
- **Layout**: `frontend/src/app/layout/` - Header, Footer, Sidebar, main Layout wrapper

### Data Flow
1. Frontend calls `/api/*` endpoints (dev: proxied via `proxy.conf.json`, prod: nginx)
2. Backend validates JWT for protected routes (`JwtAuthGuard`)
3. MongoDB stores users and notices
4. File uploads saved to `backend/uploads/`, served at `/api/uploads`

### Key Domain Models
- **User**: `login`, `password`, `role` (Roles enum)
- **Notice**: Organization details, violations array with place/element/subject/norm/deadline, attached photos

## Environment & Configuration

- MongoDB connection: `MONGODB_URI` or `DATABASE_URL` env vars (default: `mongodb://mongo:27017/uvedb`)
- Backend port: `PORT` env var (default: 3000)
- Frontend dev proxy: Configured in `frontend/proxy.conf.json` → `localhost:3000`
- JWT secret: `backend/src/static/privat/constants.ts`

## Testing

Backend tests use Jest with ts-jest transformer. Test files follow `*.spec.ts` pattern for unit tests, `*.e2e-spec.ts` for E2E tests in `backend/test/` directory.

Frontend tests use Karma with Jasmine. Test files follow `*.spec.ts` pattern.

## Docker Services

- `mongo`: MongoDB 7
- `api`: NestJS backend (port 3000 internal)
- `web`: Nginx serving Angular build, proxies `/api/` to backend (port 80 exposed)

## AI Assistant Guidelines

- Разработка ведётся на ОС Windows
- Ты мой личный ментор и учитель. Я учусь у тебя как на уроке
- **ОБЯЗАТЕЛЬНО:** В конце КАЖДОГО ответа добавляй раздел со ссылками на официальную документацию (официальные источники) из интернета, относящиеся к теме ответа
- Пиши больше пояснительные комментарии в коде и ссылки на официальную документацию (официальные источники) в комментариях
- Общение ведётся на русском языке