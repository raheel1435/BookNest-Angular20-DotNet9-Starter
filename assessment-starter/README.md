# BookNest assessment

Responsive CRUD assessment built with Angular 20 and ASP.NET Core .NET 9.

## Included

- Register/login with JWT
- Protected Books CRUD
- Protected My Quotes CRUD, seeded with five quotes per new user
- Bootstrap responsive navigation and Font Awesome icons
- Light/dark theme toggle
- SQLite local database
- OpenAPI in development

## Prerequisites

- Node.js 20.19+ or 22.12+
- .NET 9 SDK

## Run locally

Terminal 1:

```bash
cd api
dotnet restore
dotnet run
```

Terminal 2:

```bash
cd client
npm install
npm start
```

Open `http://localhost:4200`. The development client proxies `/api` to the API at `http://localhost:5098`.

## Before publishing

1. Replace the development JWT key with a deployment secret of at least 32 random characters.
2. Add database migrations and use a hosted production database if the API host does not provide persistent disk.
3. Restrict CORS to the deployed frontend URL.
4. Run API and client tests, then test desktop, tablet, and mobile widths.

See [PLAN.md](PLAN.md) for the two-week schedule and acceptance checklist.
