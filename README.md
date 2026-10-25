# Rydroo

Rydroo is the web frontend for an intercity ride-booking service. Passengers search scheduled trips, choose seats, and pay by card. Drivers sign up and submit identity and vehicle documents. Admins manage the trip list. The interface is in Arabic and English, with right-to-left layout when Arabic is active.

This repository is the React client. The API lives in [Rydroo_App_Backend](https://github.com/KareemRagabAbdelhameed/Rydroo_App_Backend).

## Features

- **Home and trip search.** A splash screen opens the app. The home page includes a trip search (origin and destination) plus sections for pricing, safety, destinations, social impact, and radio. Search navigates to `/trips` with `source` and `destination` query parameters. Listed cities in the search and in the admin trip form are Suez, El Moneib, Almarg, Ramses, El Salam, and Zagazig.
- **Trip list and seat selection.** `/trips` loads trips from the API using the active language (`Accept-Language`). `/trips/:id` shows trip details, the driver and vehicle when the API returns them, and a seat map. Booked seats cannot be selected. The total is the trip price multiplied by the number of selected seats.
- **Accounts.** Visitors can register as a passenger (`user`) or a driver, verify a 6-digit email OTP (with resend), log in, and log out. The signed-in user is stored in a cookie. After login, a driver whose profile is missing or still a draft is sent to driver onboarding.
- **Driver onboarding.** Drivers enter a national ID and upload national ID, license, and itinerary-license images, then submit vehicle details (type, color, plate, license photos, and a car photo). Draft form data is kept between the two steps.
- **Card payment.** Choosing seats continues to `/payment/:id`, which creates a payment intent and confirms the card with Stripe. A successful payment books those seats and opens a confirmation screen at `/payment/:id/done`.
- **Signed-in routes.** Payment and the admin area require a signed-in user. Anyone else sees an auth prompt. The navbar shows the admin link only when the signed-in role is `admin`.
- **Admin trip management.** `/admin/dashboard` shows summary cards. `/admin/trips` lists trips and can cancel one. Admins can add a trip (bilingual city names, date, time, seats, price in EGP, and an available driver) and edit an existing trip. The sidebar also links to `/admin/drivers`, which is a placeholder page.
- **Arabic and English.** Translations live in `src/locale`. Arabic is the fallback language. The language switcher sets document direction and stores the choice.

## Tech stack

| Area | Libraries |
| --- | --- |
| UI | React 19, TypeScript, Vite 7, React Router 7 |
| Styling | Tailwind CSS, Flowbite, Framer Motion, React Spring (splash screen) |
| Server state | TanStack Query, Axios |
| Auth state | Redux Toolkit, js-cookie |
| Forms | React Hook Form, Yup |
| Payments | Stripe.js (`@stripe/react-stripe-js`) |
| i18n | i18next, react-i18next |
| Feedback | react-toastify |

## Getting started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (the range required by Vite 7.1.7)
- npm

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root. `.env` is listed in `.gitignore`.

| Variable | Used by | Purpose |
| --- | --- | --- |
| `VITE_STRIPE_PUBLIC_KEY` | `src/App.tsx` | Stripe publishable key. Card checkout calls `loadStripe` with this value. |

The API base URL is not an environment variable. `src/config/axiosConfig.ts` sets Axios `baseURL` to `https://rydroo-app-backend.onrender.com/`.

### Scripts

These match `package.json`:

| Script | Command | What it runs |
| --- | --- | --- |
| `dev` | `npm run dev` | `vite` |
| `build` | `npm run build` | `tsc -b && vite build` |
| `preview` | `npm run preview` | `vite preview` |
| `lint` | `npm run lint` | `eslint .` |

Start the dev server:

```bash
npm run dev
```

Typecheck and build, then serve the production build locally:

```bash
npm run build
npm run preview
```

## Project structure

```
.
├── public/                  Static files (favicon)
├── src/
│   ├── admin/               Admin layout, dashboard, and trip pages
│   ├── components/          Navbar, trip card, and shared UI
│   ├── config/              Axios client
│   ├── Features/Authentication/  Auth and driver-registration logic
│   ├── hooks/               Trip, booking, and driver queries
│   ├── locale/              Arabic and English translations
│   ├── pages/               Home, auth, trips, payment, confirmation
│   ├── store/               Redux auth slice and thunks
│   ├── validation/          Yup schemas and the protected-route wrapper
│   ├── App.tsx              Route table
│   ├── i18n.ts              i18next setup
│   └── main.tsx             Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

`src/pages/BookRide/` is present in the tree and is not registered in `src/App.tsx`.

## Backend

API routes used by this client (trips, auth, driver profile, and payments) are implemented in [Rydroo_App_Backend](https://github.com/KareemRagabAbdelhameed/Rydroo_App_Backend).
