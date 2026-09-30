# Loan Management System

Admin console for customer registration, loan requests, approvals, disbursement, repayment, reports, messages, and notifications.

The interface runs in the browser. No database is connected. Sign in with `admin@loan.local` / `Admin@123`.

## Run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` when a backend exists. Until then the app does not call an API. Set `VITE_USE_API=true` only after the database API is ready.

## Layout

- `src/app` — application shell, routes, auth and query providers
- `src/features` — one folder per business area (pages, components, services, hooks)
- `src/components` — shared UI, layout, and route guards
- `src/services/api` — axios client and endpoint map
- `src/utils` — currency, dates, validation, permissions

Sign-in keeps a session in the browser. Lists, reports, messages, and payments read and update that browser data.
