# BookNest Assessment - Implementation Plan

This document describes the implementation plan used for the BookNest internship assessment and records the completed milestones.

## Definition of Done

The application is complete when:

- A visitor can register a new user.
- A registered user can log in.
- The backend creates a JWT after successful authentication.
- Angular sends the JWT with protected API requests.
- Protected API requests reject requests without valid authentication.
- An authenticated user can create, view, edit, and delete books.
- An authenticated user can create, view, edit, and delete quotes.
- Five starter quotes are created for new users.
- User-owned data is scoped to the authenticated user.
- Navigation works between Books and My Quotes.
- The application is responsive on desktop, tablet, and mobile.
- Bootstrap is used for the responsive interface.
- Font Awesome is used for interface icons.
- The mobile navigation collapses correctly.
- Light and dark themes work.
- The Angular frontend is publicly deployed.
- The ASP.NET Core backend is publicly deployed.
- The production SQLite database uses persistent storage.
- The live application and GitHub links are ready for submission.

All of these requirements have been implemented and tested.

## Days 1-2 - Foundation and Learning

### Goals

- Install .NET 9 SDK.
- Install Node.js and npm.
- Run the Angular client.
- Run the ASP.NET Core API.
- Understand the frontend/backend boundary.
- Understand the project structure.
- Verify Angular can communicate with the backend.
- Learn the core Angular, C#, ASP.NET Core, and EF Core concepts needed for the assessment.

### Concepts Covered

Frontend:

- Angular components
- Angular services
- Angular routing
- TypeScript
- HTTP requests
- Responsive UI structure

Backend:

- C#
- ASP.NET Core
- Controllers
- Dependency injection
- Entity Framework Core
- SQLite
- REST APIs

### Completed Verification

- Angular frontend runs locally.
- ASP.NET Core API runs locally.
- API health endpoint works.
- Angular communicates with the backend.

Checkpoint: Completed

## Days 3-4 - Authentication

### Goals

- Verify user registration.
- Verify password hashing.
- Verify login.
- Verify JWT creation.
- Verify JWT validation.
- Verify Angular token storage.
- Verify the Angular HTTP interceptor.
- Verify protected endpoints.
- Verify logout behavior.

### Backend Authentication Flow

1. The frontend sends username and password.
2. The backend finds the user.
3. The backend verifies the hashed password.
4. The backend creates a JWT.
5. The API returns the token to Angular.

### JWT Claims

The token contains:

```text
sub
unique_name
iss
aud
exp
```

### JWT Validation

The backend validates:

- Issuer
- Audience
- Lifetime
- Signing key

### Frontend Token Handling

Angular:

1. Receives the JWT.
2. Stores it locally.
3. Reads the token through the authentication service.
4. Uses an HTTP interceptor.
5. Adds the token to protected API requests.

Header format:

```text
Authorization: Bearer <token>
```

### Completed Verification

- Registration works.
- Login works.
- Password hashing works.
- JWT generation works.
- JWT claims were decoded and inspected.
- Angular stores the token.
- Angular sends the Bearer token.
- Valid authenticated request returns `200 OK`.
- Protected request without a token returns `401 Unauthorized`.
- Logout clears authentication state.

Checkpoint: Completed

## Days 5-6 - Books CRUD

### Goals

- Display the authenticated user's books.
- Add a new book.
- Edit a book.
- Delete a book.
- Return to the normal books view after create or edit.
- Confirm deleted books disappear from the list.
- Protect the CRUD endpoints with authentication.

### Book Fields

- Title
- Author
- Publication date

### Completed Verification

- Books list loads.
- Add book works.
- New book appears in the list.
- Edit book works.
- Updated information appears correctly.
- Delete book works.
- Deleted book disappears.
- Books CRUD works after navigation and refresh.
- Books endpoints are protected with JWT authentication.

Checkpoint: Completed

## Days 7-8 - My Quotes CRUD

### Goals

- Create a separate My Quotes view.
- Provide five starter quotes for new users.
- Add quotes.
- Edit quotes.
- Delete quotes.
- Navigate between Books and My Quotes.
- Scope quote data to the authenticated user.

### User Ownership

The backend reads the authenticated user's ID from the JWT `sub` claim.

The user ID is used in database queries so quote operations are scoped to the authenticated user.

### Completed Verification

- My Quotes view works.
- Five starter quotes are available.
- Quotes list loads.
- Add quote works.
- Edit quote works.
- Delete quote works.
- Navigation between Books and My Quotes works.
- Quote data is user-scoped.

Checkpoint: Completed

## Days 9-10 - Responsive UI

### Target Viewports

The application was tested at multiple widths, including:

```text
360px
768px
1024px
1440px
```

### Completed Verification

- Desktop layout works.
- Tablet layout works.
- Mobile layout works.
- Book cards respond correctly.
- Quote cards respond correctly.
- Forms remain usable.
- Buttons remain usable.
- Spacing remains consistent.
- Mobile navigation collapses correctly.
- No visible horizontal overflow was found during testing.

### Bootstrap

Bootstrap is used for:

- Responsive layout
- Navigation
- Cards
- Forms
- Buttons
- Spacing
- Responsive breakpoints

### Font Awesome

Font Awesome icons are used in the application interface.

### Theme

Verified:

- Light theme
- Dark theme
- Theme toggle

Checkpoint: Completed

## Days 11-12 - Testing and Hardening

### Build Verification

Completed:

```text
dotnet build
dotnet publish
ng build
```

### Authentication Verification

Completed:

- User registration
- User login
- JWT creation
- JWT claim inspection
- JWT validation
- Bearer token in request headers
- Protected request with valid token
- Protected request without token
- `401 Unauthorized` behavior
- Logout behavior

### Functional Verification

Completed:

- Books CRUD
- Quotes CRUD
- Navigation
- Responsive design
- Mobile menu
- Light mode
- Dark mode

### Production Hardening

Completed:

- Production JWT signing key stored in Railway variables.
- Production issuer configured.
- Production audience configured.
- SQLite production connection configured.
- CORS restricted to the deployed frontend.
- Production Angular API URL configured.
- SQLite database stored on a persistent Railway volume.

Checkpoint: Completed

## Day 13 - Deployment

### Backend Deployment

ASP.NET Core .NET 9 API deployed to Railway.

Backend:

```text
https://booknest-angular20-dotnet9-starter-production.up.railway.app
```

Health endpoint:

```text
https://booknest-angular20-dotnet9-starter-production.up.railway.app/api/health
```

Verified response:

```json
{
  "status": "healthy"
}
```

### Railway Configuration

Completed:

- GitHub repository connected.
- API root directory configured.
- Dockerfile added.
- ASP.NET Core port configured.
- JWT issuer configured.
- JWT audience configured.
- Strong JWT signing key configured.
- SQLite connection configured.
- Persistent `/data` volume mounted.
- Frontend CORS origin configured.

### Frontend Deployment

Angular frontend deployed to Vercel.

Frontend:

```text
https://booknest-angular20.vercel.app
```

### Production Angular Configuration

Completed:

- Development environment file created.
- Production environment file created.
- Production API URL points to Railway.
- Angular production build succeeds.
- Vercel deployment succeeds.

### End-to-End Production Verification

Completed:

- Vercel frontend loads successfully.
- Frontend calls the Railway API.
- Authenticated API requests succeed.
- Quotes request returns `200 OK`.
- Railway returns the correct CORS origin.
- JWT authentication works between the deployed frontend and backend.
- Books CRUD works in production.
- Quotes CRUD works in production.
- Navigation works in production.
- Responsive layout works in production.

Checkpoint: Completed

## Day 14 - Documentation and Submission

### Documentation

Completed:

- README created.
- Technology stack documented.
- JWT flow documented.
- API structure documented.
- Production architecture documented.
- Local development instructions documented.
- Deployment URLs documented.
- Verification checklist documented.
- Implementation plan documented.

### Submission Links

Frontend:

```text
https://booknest-angular20.vercel.app
```

Backend health:

```text
https://booknest-angular20-dotnet9-starter-production.up.railway.app/api/health
```

GitHub:

```text
https://github.com/raheel1435/BookNest-Angular20-DotNet9-Starter
```

Checkpoint: Ready for submission

## Final Assessment Checklist

### Books

- List books
- Add book
- Edit book
- Delete book
- Updated book appears correctly
- Deleted book disappears correctly

Status: Completed

### Authentication

- Register user
- Login user
- Generate JWT
- Store JWT
- Send Bearer token
- Validate JWT on backend
- Protect CRUD endpoints
- Reject unauthenticated protected requests

Status: Completed

### My Quotes

- Separate My Quotes view
- Five starter quotes
- Add quote
- Edit quote
- Delete quote
- Navigation between Books and Quotes

Status: Completed

### Responsive Design

- Desktop
- Tablet
- Mobile
- Responsive cards
- Responsive forms
- Responsive buttons
- Collapsing mobile menu

Status: Completed

### Styling

- Bootstrap
- Font Awesome
- Light theme
- Dark theme

Status: Completed

### Deployment

- Angular deployed
- .NET API deployed
- Persistent SQLite storage configured
- Production CORS configured
- Frontend connected to backend
- Health endpoint verified
- Production CRUD verified

Status: Completed

## Final Architecture

```text
User Browser
     |
     v
Angular 20
Vercel
     |
     | HTTPS
     | REST API
     | JWT Bearer Token
     v
ASP.NET Core .NET 9
Railway
     |
     v
Entity Framework Core
     |
     v
SQLite
Railway Persistent Volume
```

## Submission Status

The BookNest assessment implementation, testing, deployment, and documentation are complete and ready for submission.
