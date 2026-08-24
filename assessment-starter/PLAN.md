# Two-week implementation plan

## Definition of done

The deployed application lets a visitor register and log in. An authenticated user can create, view, edit, and delete their own books and quotes. Protected API calls reject missing/invalid tokens. The UI works at mobile, tablet, and desktop sizes, uses Bootstrap and Font Awesome, and includes navigation plus a theme switch. Source and deployment links are ready for submission.

## Days 1–2 — Foundation and learning

- Install .NET 9 SDK, Node, Angular CLI, Git, and VS Code extensions.
- Run this starter locally and understand the client/API boundary.
- Create a private GitHub repository and make the first checkpoint commit.
- Learn: Angular standalone components, routing, services, reactive forms; C# models, controllers, dependency injection, EF Core.

Checkpoint: both applications start; Angular can call `/api/health`.

## Days 3–4 — Authentication

- Verify registration, password hashing, login, JWT creation, and JWT validation.
- Verify Angular interceptor attaches `Authorization: Bearer <token>`.
- Verify the auth guard blocks protected routes and logout clears local state.
- Add validation and useful error messages.

Checkpoint: protected endpoints return 401 without a valid token.

## Days 5–6 — Books CRUD

- Complete book list, add/edit form, delete confirmation, loading/empty/error states.
- Confirm records are scoped to the signed-in user.
- Add API and client tests for the main happy paths.

Checkpoint: create → list → edit → delete works after a browser refresh.

## Days 7–8 — My Quotes CRUD

- Confirm five starter quotes are created for every new account.
- Complete quote list, add/edit form, and deletion.
- Verify navigation between Books and My Quotes.

Checkpoint: quote data is persistent and user-scoped.

## Days 9–10 — Responsive UI and accessibility

- Test widths 360, 768, 1024, and 1440 pixels.
- Check collapsed mobile navigation, touch targets, labels, focus states, validation, spacing, and contrast.
- Confirm Font Awesome icons have visible text/accessible labels.
- Finish light/dark theme and persistence.

Checkpoint: no horizontal overflow and all operations are usable on phone and desktop.

## Days 11–12 — Tests and hardening

- API: authentication, authorization, ownership, validation, and CRUD integration tests.
- Client: auth service/interceptor, guards, key components, and production build.
- Test duplicate usernames, wrong passwords, expired tokens, empty forms, API downtime, and delete cancellation.
- Remove secrets and development-only assumptions.

Checkpoint: clean builds and repeatable test results.

## Day 13 — Deployment

- Deploy Angular to Netlify/Vercel/Azure Static Web Apps.
- Deploy .NET API to a .NET-compatible host and configure database/JWT/CORS environment settings.
- Point Angular production API configuration to the deployed API.
- Test registration and both CRUD flows on the public URL.

Checkpoint: public app works in an incognito browser and on a phone.

## Day 14 — Submission and explanation

- Clean README: screenshots, architecture, setup, test and deployment instructions.
- Check Git history and repository visibility.
- Prepare a 3–5 minute demo and explanation of JWT, Angular services/interceptor, API authorization, EF Core, and responsive choices.
- Send deployed URL and GitHub URL.

## Priority if time becomes tight

1. Authentication and protected API
2. Books CRUD
3. Quotes CRUD and five starter quotes
4. Responsive Bootstrap navigation
5. Deployment and README
6. Dark mode and extra polish

## Daily working rhythm

Use 45–60 minute blocks: learn one concept, implement one small slice, test it manually, then commit. Do not copy code you cannot explain; keep brief notes about each important decision and problem solved.
