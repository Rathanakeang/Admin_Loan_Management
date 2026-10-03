# Loan Management System

Admin console for customer registration, loan requests, approvals, disbursement, repayment, reports, messages, and notifications.

The interface runs in the browser. No database is connected. Sign in with `admin@loan.local` / `Admin@123`.

## Run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and add the Firebase Web App settings to connect Firebase. The Firebase client exports Firestore and Realtime Database from `src/services/firebase/firebase.js`. Existing app data continues to use browser storage until its services are migrated. Set `VITE_USE_API=true` only after the REST API is ready.

Never add Firebase service-account credentials to this browser app. Protect database access with Firebase Security Rules.

Firebase login uses Firebase Authentication, then loads the matching profile by email from the Firestore `users` collection. Firestore `password` fields are never used; create each sign-in account in Firebase Authentication. The Users page reads profiles from Firestore when Firebase is configured.

## Layout

- `src/app` — application shell, routes, auth and query providers
- `src/features` — one folder per business area (pages, components, services, hooks)
- `src/components` — shared UI, layout, and route guards
- `src/services/api` — axios client and endpoint map
- `src/utils` — currency, dates, validation, permissions

Sign-in keeps a session in the browser. Lists, reports, messages, and payments read and update that browser data.
