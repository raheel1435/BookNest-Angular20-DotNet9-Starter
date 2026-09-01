# BookNest

BookNest is a responsive full-stack CRUD application built as an internship assessment using Angular 20 and ASP.NET Core .NET 9.

The application allows authenticated users to register, log in, manage their personal books, and manage their favorite quotes.

## Live Application

Frontend:

https://booknest-angular20.vercel.app

Backend health endpoint:

https://booknest-angular20-dotnet9-starter-production.up.railway.app/api/health

## GitHub Repository

https://github.com/raheel1435/BookNest-Angular20-DotNet9-Starter

## Technology Stack

### Frontend

- Angular 20
- TypeScript
- Bootstrap 5
- Font Awesome
- RxJS

### Backend

- ASP.NET Core .NET 9
- C#
- REST API
- Entity Framework Core
- SQLite

### Authentication

- JSON Web Tokens (JWT)
- ASP.NET Core JWT Bearer authentication
- ASP.NET Core password hashing
- Angular HTTP interceptor for Bearer tokens

### Deployment

- Vercel for the Angular frontend
- Railway for the ASP.NET Core API
- Railway persistent volume for the SQLite database

## Main Features

### User Registration and Login

Users can:

- Register a new account
- Log in with username and password
- Receive a JWT after successful authentication
- Access protected application features after login
- Log out and clear the local authentication state

Passwords are stored as hashes rather than plain text.

### Books CRUD

Authenticated users can:

- View their books
- Add a new book
- Edit an existing book
- Delete a book

Book information includes:

- Title
- Author
- Publication date

All required Books CRUD operations were manually tested and verified.

### My Quotes CRUD

The application contains a separate My Quotes view.

New users receive five starter quotes.

Authenticated users can:

- View quotes
- Add quotes
- Edit quotes
- Delete quotes

All required Quotes CRUD operations were manually tested and verified.

### Navigation

The application includes navigation between:

- Books
- My Quotes

The navigation also includes a responsive mobile menu.

## JWT Authentication

### Authentication Flow

1. The user submits a username and password.
2. The ASP.NET Core API verifies the credentials.
3. The backend creates a signed JWT.
4. Angular receives the JWT.
5. The frontend stores the token.
6. The Angular HTTP interceptor adds the token to protected API requests.
7. ASP.NET Core validates the token.
8. Protected controllers allow the request only when authentication succeeds.

The request header is sent in this format:

```text
Authorization: Bearer <token>
```

### JWT Claims

The token contains claims including:

- `sub` - authenticated user ID
- `unique_name` - username
- `iss` - token issuer
- `aud` - token audience
- `exp` - expiration time

### JWT Validation

The backend validates:

- Issuer
- Audience
- Lifetime
- Signing key

Protected controllers use ASP.NET Core's `[Authorize]` attribute.

A protected endpoint was manually tested:

```text
With a valid JWT: 200 OK
Without a JWT: 401 Unauthorized
```

## User Data Isolation

The backend reads the authenticated user's ID from the JWT `sub` claim.

User-owned database queries are filtered using that authenticated user ID.

This means users access their own records through the normal protected API flow.

## Responsive Design

The application was manually tested at multiple desktop, tablet, and mobile viewport sizes.

Verified responsive behavior includes:

- Desktop layout
- Tablet layout
- Mobile layout
- Responsive book cards
- Responsive quote cards
- Responsive forms
- Responsive buttons
- Responsive spacing
- Collapsing mobile navigation
- No visible horizontal overflow during testing

## Bootstrap and Font Awesome

Bootstrap 5 is used for:

- Navigation
- Responsive layouts
- Cards
- Forms
- Buttons
- Spacing
- Responsive breakpoints

Font Awesome is used for interface icons.

## Light and Dark Mode

The application includes a theme toggle that allows the user to switch between light and dark themes.

Both themes were manually tested.

## Local Development

### Requirements

Install:

- .NET 9 SDK
- Node.js 20.19+ or 22.12+
- npm
- Git

### Run the Backend

From the repository root:

```powershell
cd assessment-starter\api
dotnet restore
dotnet run
```

The API uses the development launch settings to select its local port.

### Run the Frontend

Open another terminal:

```powershell
cd assessment-starter\client
npm.cmd install
npm.cmd start
```

Then open:

```text
http://localhost:4200
```

During local development, Angular uses `proxy.conf.json` to forward `/api` requests to the local ASP.NET Core API.

## Production Configuration

The Angular production environment is configured in:

```text
assessment-starter/client/src/environments/environment.prod.ts
```

The production frontend points to the Railway API.

Production backend configuration is provided through Railway environment variables.

Examples include:

```text
ASPNETCORE_URLS
ConnectionStrings__Default
Jwt__Issuer
Jwt__Audience
Jwt__Key
ClientOrigin
```

The production JWT signing key is not committed to the repository.

## Production Architecture

```text
User Browser
     |
     v
Angular 20 Frontend
Vercel
     |
     | HTTPS REST requests
     | Authorization: Bearer <JWT>
     v
ASP.NET Core .NET 9 API
Railway
     |
     v
Entity Framework Core
     |
     v
SQLite Database
Railway Persistent Volume
```

## API Areas

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Books

```text
GET    /api/books
POST   /api/books
PUT    /api/books/{id}
DELETE /api/books/{id}
```

### Quotes

```text
GET    /api/quotes
POST   /api/quotes
PUT    /api/quotes/{id}
DELETE /api/quotes/{id}
```

### Health Check

```text
GET /api/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

OpenAPI is available when the API runs in the Development environment.

## Deployment

### Frontend

Vercel:

https://booknest-angular20.vercel.app

### Backend

Railway:

https://booknest-angular20-dotnet9-starter-production.up.railway.app

### Backend Health Check

https://booknest-angular20-dotnet9-starter-production.up.railway.app/api/health

### Database

SQLite is used as the application database.

In production, the SQLite database file is stored on a Railway persistent volume.

## Verification Completed

The following were tested and verified:

- User registration
- User login
- Password hashing
- JWT generation
- JWT claim inspection
- JWT storage in the frontend
- Angular Bearer-token interceptor
- Protected endpoint with valid token
- Protected endpoint without token returning `401 Unauthorized`
- Books list
- Add book
- Edit book
- Delete book
- My Quotes list
- Five starter quotes
- Add quote
- Edit quote
- Delete quote
- Navigation between Books and My Quotes
- Responsive desktop layout
- Responsive tablet layout
- Responsive mobile layout
- Collapsing mobile navigation
- Bootstrap styling
- Font Awesome icons
- Light mode
- Dark mode
- Angular production build
- .NET build
- .NET publish
- Railway deployment
- Vercel deployment
- Production frontend-to-backend communication
- Production CORS configuration
- Production JWT authentication
- Production SQLite persistence
- Public health endpoint

## Assessment Requirements Covered

The project implements the requested assessment requirements:

- Angular 20 frontend
- .NET 9 C# REST API
- Responsive CRUD application
- Books CRUD
- User registration
- User login
- JWT token handling
- Backend JWT validation
- Protected CRUD endpoints
- My Quotes CRUD
- Five starter quotes
- Navigation between Books and My Quotes
- Bootstrap
- Font Awesome
- Responsive mobile menu
- Light/dark theme toggle
- Public deployment
- GitHub repository

## Repository Structure

```text
BookNest-Angular20-DotNet9-Starter/
|
|-- README.md
|
|-- assessment-starter/
|   |
|   |-- PLAN.md
|   |
|   |-- api/
|   |   |-- Controllers/
|   |   |-- Data/
|   |   |-- DTOs/
|   |   |-- Models/
|   |   |-- Services/
|   |   |-- Program.cs
|   |   |-- Dockerfile
|   |   `-- BookNest.Api.csproj
|   |
|   `-- client/
|       |-- src/
|       |-- public/
|       |-- angular.json
|       |-- package.json
|       `-- proxy.conf.json
```

## Development Plan

See:

```text
assessment-starter/PLAN.md
```

for the implementation plan and completed assessment milestones.

## Author

Raheel Shan
