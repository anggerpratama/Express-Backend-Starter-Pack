# Express Backend Starter Pack

**PT Ronin Backend Standard and Starterpack**

A production-ready Express.js backend starter pack built with TypeScript, focusing on clean architecture and Domain-Driven Design principles.

## Overview

This is a **Backend API Services** project - a pure REST API service with no view rendering or HTML templates. All responses are JSON-based, designed to serve as a backend for frontend applications or mobile apps.

## Tech Stack

- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe JavaScript
- **tsyringe** - Dependency Injection container
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Primary database
- **Redis** - Session storage and caching
- **Class Validator** - Request validation
- **Class Transformer** - Object transformation

## Prerequisites

- Node.js (v16 or higher recommended)
- PostgreSQL database
- Redis server
- npm or yarn package manager

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Configure your .env file with database and Redis credentials
```

## Available Scripts

### Development

- **`npm run dev`**  
  Starts the development server with hot reload. This script runs TypeScript compiler in watch mode alongside nodemon, automatically restarting the server when files change.

### Building

- **`npm run build`**  
  Compiles TypeScript code to JavaScript in the `dist/` directory.

- **`npm start`**  
  Builds the project and starts the production server from compiled files.

### Database Migrations

- **`npm run migration:generate`**  
  Automatically generates a migration file based on entity changes. Compares current entities with database schema.

- **`npm run migration:create`**  
  Creates a blank migration file for manual database changes in `src/database/migrations/`.

- **`npm run migrate`**  
  Executes all pending migrations against the database.

- **`npm run migrate:revert`**  
  Reverts the last executed migration.

### Database Seeding

- **`npm run db:seed`**  
  Runs database seeders to populate initial data for development or testing.

### Testing

- **`npm test`**  
  Placeholder for test execution (to be implemented).

### TypeORM CLI

- **`npm run typeorm`**  
  Direct access to TypeORM CLI commands for advanced operations.

## Project Structure

The project follows **Domain-Driven Design (DDD)** principles with a clean, modular architecture:

```
src/
├── config/          # Application configuration
├── database/        # Database setup and migrations
├── domain/          # Core business logic
├── infrastructure/  # Supporting utilities and abstractions
├── middleware/      # Request middleware
├── providers/       # Application initialization
├── routes/          # API route definitions
└── index.ts         # Application entry point
```

### Folder Descriptions

#### `config/`
Contains all application configuration files loaded from environment variables (`.env`). Centralizes settings for database, Redis, authentication, and other services.

#### `database/`
Houses TypeORM connection configuration, migration files, and database seeders. This is where all database schema changes and initial data setup are managed.

#### `domain/`
The heart of your application containing core business logic, entities, use cases, and domain services. This layer should be independent of external frameworks and infrastructure concerns.

#### `infrastructure/`
Contains abstract implementations, helpers, utilities, and supporting logic that the domain layer depends on. Includes repositories, external service integrations, and shared utilities.

#### `middleware/`
Express middleware functions for cross-cutting concerns like session validation, authentication guards, request validation, error handling, and logging.

#### `providers/`
**Critical infrastructure layer** - Initializes dependency injection container, database connections, and route registration. 

⚠️ **Recommendation**: Avoid modifying this folder unless you fully understand the application bootstrap process.

#### `routes/`
Defines all API endpoints and maps them to their respective controllers. Keeps routing logic separate from business logic.

#### `index.ts`
The main server entry point that bootstraps the entire application.

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Session
SESSION_SECRET=your_session_secret
```

## Getting Started

1. **Setup your environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

2. **Run migrations**
   ```bash
   npm run migrate
   ```

3. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   ```
   http://localhost:3000
   ```

## Development Workflow

1. Create entities in the `domain/` folder
2. Generate migrations: `npm run migration:generate`
3. Review and run migrations: `npm run migrate`
4. Implement business logic in domain services
5. Create controllers and register routes
6. Add validation and middleware as needed

## Best Practices

- Keep business logic in the `domain/` layer
- Use dependency injection for loose coupling
- Validate all incoming requests
- Follow TypeScript strict mode
- Write migrations for all schema changes
- Use environment variables for configuration
- Never commit sensitive data or `.env` files

## Contributing

Please follow the established patterns and architectural decisions. Review existing code before adding new features to maintain consistency.

---

> **"Clean code is not written by following a set of rules. You don't become a software craftsman by learning a list of what to do and what not to do. Professionalism and craftsmanship come from discipline and practice."**  
> — Start with understanding the architecture, respect the patterns, and write code that the next developer will thank you for.

**Welcome aboard, developer! Happy coding! 🚀**

---

## About

Developed and maintained by **PT RONIN DIGINARA INDONESIA**

🌐 [https://rodiginesia.com/](https://rodiginesia.com/)

© 2026 PT RONIN DIGINARA INDONESIA. All rights reserved.