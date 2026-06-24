# 🏦 Shinrai Bank — Feature Documentation

> **Last Updated:** June 2026  
> A complete catalog of all features across the frontend and backend, organized by domain.  
> Features are marked as ✅ **Implemented**, 🔧 **Partial / UI-Only**, or 🚧 **Planned / Coming Soon**.

---

## Table of Contents

- [1. Authentication & Security](#1-authentication--security)
- [2. Account Management](#2-account-management)
- [3. Banking Operations](#3-banking-operations)
- [4. Dashboard](#4-dashboard)
- [5. Transaction Management](#5-transaction-management)
- [6. Service Applications](#6-service-applications)
- [7. Loan & Credit Services](#7-loan--credit-services)
- [8. User Settings](#8-user-settings)
- [9. Navigation & Layout](#9-navigation--layout)
- [10. Informational Pages](#10-informational-pages)
- [11. API Layer](#11-api-layer)
- [12. Database & Data Models](#12-database--data-models)
- [13. External Integrations](#13-external-integrations)
- [14. Developer Experience](#14-developer-experience)
- [15. Planned / Future Features](#15-planned--future-features)
- [Feature Matrix Summary](#feature-matrix-summary)

---

## 1. Authentication & Security

### ✅ User Registration
- Multi-field registration form: full name, Aadhar number, address, phone number, email, password, account type (Savings / Current), date of birth, and optional nickname.
- **Phone number validation** — digits-only input, capped at 10 digits.
- **Duplicate detection** — rejects registration if the email or Aadhar number already exists (HTTP 409).
- **Backend:** `POST /api/auth/register` → [`auth.controller.js`](backend/src/controllers/auth.controller.js) → `register()`.
- **Frontend:** [`CreateAccount.jsx`](frontend/src/pages/CreateAccount.jsx).

### ✅ Email OTP Verification
- 6-digit OTP generated server-side, hashed with **SHA-256**, and stored with a **10-minute TTL** (MongoDB TTL index auto-expires).
- OTP sent via **Gmail OAuth2** (Nodemailer) to the user's registered email.
- Verification page accepts OTP input and validates against the hashed value.
- On success, the user's `verified` flag is set to `true`; they are redirected to login.
- **Backend:** `POST /api/auth/verify` → `verify()`.
- **Frontend:** [`OtpVerification.jsx`](frontend/src/pages/OtpVerification.jsx), context: `UserTempContext` carries email between registration and OTP screens.

### ✅ Secure Login
- Login with **email + password + account type** (Savings or Current).
- Password compared with **bcrypt** hash (10 salt rounds).
- Verification check — unverified accounts receive HTTP 403.
- **Backend:** `POST /api/auth/login` → `login()`.
- **Frontend:** [`Login.jsx`](frontend/src/pages/Login.jsx), with loading spinner during authentication.

### ✅ JWT Access + Refresh Token System
| Token | Storage | Lifetime | Purpose |
|---|---|---|---|
| **Access Token** | React Context (in-memory) | 15 minutes | API request authentication via `Authorization: Bearer` header |
| **Refresh Token** | HTTP-only, Secure, SameSite cookie | 7 days | Silent token rotation; SHA-256 hashed and stored in `sessions` collection |

- **Token Rotation:** Each refresh request issues a *new* refresh token and invalidates the old session hash.
- **Auto-refresh on mount:** `AccessTokenContext` calls `GET /api/auth/refresh-token` on app load to restore sessions silently.
- **Backend:** `GET /api/auth/refresh-token` → `refreshToken()`.
- **Frontend:** [`AccessTokenContext.jsx`](frontend/src/contexts/AccessTokenContext.jsx).

### ✅ Session Management with IP & User-Agent Tracking
- Every login creates a session record in MongoDB with:
  - Hashed refresh token
  - Client IP address (`req.ip`)
  - User-Agent string
  - `revoked` flag (default: `false`)
- **Model:** [`session.model.js`](backend/src/models/session.model.js).

### ✅ Password Hashing
- User passwords are hashed with **bcrypt** (10 salt rounds) before storage.
- Passwords are re-verified via `bcrypt.compare()` during login and money transfers.

### ✅ Luhn-Valid Card Number Generation
- 16-digit debit card numbers generated using the **Luhn algorithm** to ensure validity.
- Uniqueness enforced via database lookup loop.
- 3-digit random CVV generated at registration.
- Card valid for **5 years** from account creation.
- **Utility:** [`card.util.js`](backend/src/utils/card.util.js).

### ✅ HTTP-Only Secure Cookies
- Refresh tokens stored in cookies with flags: `httpOnly`, `secure`, `sameSite: strict`.
- Prevents XSS access to refresh tokens.

### ✅ CORS Protection
- Origin whitelisted to `http://localhost:5173` (Vite dev server).
- Credentials enabled for cookie transmission.

### 🔧 Google reCAPTCHA Integration
- `react-google-recaptcha` is listed as a frontend dependency.
- **Not yet wired** into the login or registration forms.

---

## 2. Account Management

### ✅ Multi-Account Type Support
- Account types: `SAVINGS`, `CURRENT`, `SALARY`, `FIXED_DEPOSIT` (enum in User model).
- Login requires account type selection to distinguish accounts.

### ✅ Account Status Tracking
- Statuses: `ACTIVE`, `FROZEN`, `CLOSED`, `SUSPENDED` (enum, default: `ACTIVE`).
- Stored per user; not yet enforced in business logic.

### ✅ Auto-Generated Account Details
- **Account Number** = Phone number (used as both identifier and account number).
- **IFSC Code** = `SHIN02042007` (default for all accounts).
- **Branch Code** = `Shinrai Branch of India`.
- **Currency** = `INR` (default).

### ✅ Default Opening Balance
- New accounts receive a default balance of **₹10,000**.

### ✅ KYC Verification Flag
- `kycVerified` boolean field on the user model.
- Displayed in the Settings page (verified / not verified).

### ✅ Nominee Information
- User model supports storing nominee details: name, relation, phone number.

---

## 3. Banking Operations

### ✅ Money Transfers (Send Money)
- Transfer via **three methods**:
  1. **Phone Number** — lookup by `phoneNumber` field
  2. **Account Number** — lookup by `accountNumber` field
  3. **Bank UPI** — extracts phone number from UPI ID (e.g., `9876543210@shinrai` → `9876543210`)
- **Password re-verification** required for every transfer.
- **Self-transfer prevention** — cannot send money to your own account.
- **Atomic transactions** — uses MongoDB sessions with `startTransaction()` / `commitTransaction()` / `abortTransaction()` to ensure consistency.
- On failure at any point, the transaction is rolled back.
- **Backend:** `POST /api/auth/send-money` → `sendMoney()`.
- **Frontend:** [`SendMoney.jsx`](frontend/src/pages/SendMoney.jsx), with dynamic form fields based on transfer type.

### ✅ Daily & Monthly Transfer Limits
| Limit | Default | Reset Logic |
|---|---|---|
| **Daily** | ₹1,00,000 | Auto-resets when the date changes (`lastDailyReset`) |
| **Monthly** | ₹10,00,000 | Auto-resets when the month changes (`lastMonthlyReset`) |

- Limits checked *before* the transaction starts.
- Transferred amounts accumulated per user across all transactions.

### ✅ Balance Check (Password-Protected)
- Dedicated page to securely check account balance.
- Requires **password entry** before revealing the balance.
- Displays balance in a styled gradient card with INR formatting.
- **Backend:** `POST /api/auth/check-balance` → `checkBalance()`.
- **Frontend:** [`CheckBalance.jsx`](frontend/src/pages/CheckBalance.jsx), with loading spinner and conditional reveal.

### ✅ Insufficient Balance Validation
- Transfers rejected if `bankBalance < transferAmount` (HTTP 409).

---

## 4. Dashboard

### ✅ Account Overview Dashboard
- **Debit/Credit Card Display** — gradient card showing:
  - Card type (Debit/Credit)
  - Card number
  - Cardholder name
  - Valid thru date (MM/YY format)
  - CVV
- **Promotional Offers Banner** — "Cashback up to 60%" section.
- **User Details Panel** — name, phone number, account number, UPI ID.
- **QR Code** — auto-generated UPI QR code (`upi://pay?pa=...@shinrai&pn=...`) using `react-qr-code`.

### ✅ Quick Transfer Panel
- Shortcut buttons on the dashboard:
  - **Pay Number** → Send Money via phone number
  - **Pay to Bank** → Send Money via account number
  - **Pay to UPI** → Send Money via UPI ID
  - **Check Balance** → Navigate to balance check page

### ✅ Recent Transactions Widget
- Displays **last 3 transactions** on the dashboard.
- Color-coded: red (↑ debit/sent) / green (↓ credit/received).
- Shows counterparty name, date/time, and amount.
- Clickable "Transactions" header links to full transaction history.

### 🔧 Quick Transfer (UPI / Mobile Input)
- Text input with share icon on the dashboard for quick UPI/mobile transfers.
- **UI exists** but not fully wired to a backend action.

### 🔧 Contact Shortcuts
- Avatar circles (P, S, A, J, +) for frequently contacted users.
- **Static UI** — not backed by a contacts list.

### 🔧 Bill Payments Section
- Dashboard shows icons for: Mobile Recharge, Electricity Bill, Credit Card, LPG Cylinder, DTH Recharge, Broadband Bill.
- **UI-only** — no backend integration for bill payments.

### ✅ Auth-Protected Dashboard
- Redirects unauthenticated users to `/login` via `isLogedIn` context check.
- Data fetched only when an access token is available.

---

## 5. Transaction Management

### ✅ Paginated Transaction History
- Full transaction history page with table display.
- Columns: Description, Status, Date, Time, Amount.
- **Server-side pagination** — configurable `page` and `limit` query params (default: 10 per page).
- **Previous / Next** pagination controls with page counter.
- Debits shown in red (`-₹`), credits in green (`+₹`).
- All transactions show "Success" status badge.
- **Backend:** `GET /api/auth/transactions?page=N&limit=M` → `getTransactions()`.
- **Frontend:** [`Transactions.jsx`](frontend/src/pages/Transactions.jsx).

### ✅ Transaction Recording
- Every successful transfer creates a transaction document storing:
  - Sender ID + name (`user1`, `user1Name`)
  - Receiver ID + name (`user2`, `user2Name`)
  - Amount
  - Timestamps (auto via Mongoose)
- **Model:** [`transaction.model.js`](backend/src/models/transaction.model.js).

---

## 6. Service Applications

### ✅ Service Application Hub
- Central grid page with animated cards linking to 7 service categories.
- Each card features an image, title, and hover animation (scale + gradient shift).
- **Frontend:** [`Application.jsx`](frontend/src/pages/Application.jsx).

| Service | Route | Status |
|---|---|---|
| Account Management Requests | `/account-management` | 🔧 Placeholder page |
| KYC & Identity Services | `/kyc-identity` | 🔧 Placeholder page |
| Card Services | `/card-services` | 🔧 Placeholder page |
| Loan & Credit Services | `/loan-credit-services` | 🔧 Placeholder page |
| Contact & Communication Updates | `/contact-update` | 🔧 Placeholder page |
| Cheque & Payment Services | `/cheque-services` | 🔧 Placeholder page |
| Internet Banking & Security | `/internet-banking` | 🔧 Placeholder page |

---

## 7. Loan & Credit Services

### ✅ Loan Information Page
- Displays three loan categories: **Home Loan**, **Vehicle Loan**, **Personal Loan** — with descriptions.
- **Pre-approved Loan Offer** banner showing eligibility (₹5,00,000).
- **Frontend:** [`Loan.jsx`](frontend/src/pages/Loan.jsx).

### ✅ EMI Calculator
- Interactive calculator with sliders for:
  - **Loan Amount**: ₹10,000 – ₹10,00,000 (step: ₹10,000)
  - **Tenure**: 6 – 84 months
- Calculates EMI using standard amortization formula at **10.5% p.a.** interest rate.
- Real-time display of estimated EMI in INR format.

### 🔧 Active Loan Display
- Static display of a sample active loan (Personal Loan, ₹1,25,000 outstanding).
- **Not backed by dynamic data** — placeholder content.

---

## 8. User Settings

### ✅ Profile Information Display
- Shows name, email, phone number, and KYC verification status.
- **Frontend:** [`Settings.jsx`](frontend/src/pages/Settings.jsx).

### 🔧 Notification Preferences
- UI toggles for: Transaction Alerts, Email Notifications, Marketing Emails.
- **Not persisted** — visual only.

### 🔧 Appearance / Theme Selection
- Dropdown for Dark Theme, Light Theme, System Default.
- **Not functional** — no theme switching logic.

### 🚧 Change Password
- Button displayed with "Coming Soon" label.

### 🚧 Two-Factor Authentication
- Button displayed with "Coming Soon" label.

### 🚧 Login History
- Button displayed with "Coming Soon" label.

### 🔧 Danger Zone
- **Delete Account** button — UI present, no backend endpoint.
- **Logout** button — UI present, no logout logic implemented.

### 🔧 Save Changes
- Save button displayed but not wired to any backend endpoint.

---

## 9. Navigation & Layout

### ✅ Responsive Navbar
- Custom resizable navbar built with shadcn/ui primitives.
- Desktop navigation with links: Home, Dashboard, Contact, About Us.
- **Conditional buttons:**
  - Logged out → Login + Create Account buttons
  - Logged in → User avatar button (first letter of name)
- **Mobile hamburger menu** with toggle animation.
- **Frontend:** [`Navbar.jsx`](frontend/src/components/Navbar.jsx).

### ✅ Dashboard Sidebar
- Icon-based vertical sidebar with navigation to:
  - Dashboard
  - Application (Service Hub)
  - History (Transactions)
  - Loan
  - Statement (Investment)
  - Settings
  - Logout
- **Context-aware active state** — highlights current route.
- **Frontend:** [`SideBar.jsx`](frontend/src/components/SideBar.jsx).

### ✅ Conditional Layout Rendering
- Navbar and Footer are **hidden** on `/login`, `/create-account`, and `/otp` routes.
- Displayed on all other routes.

### ✅ Footer Component
- Full footer with links and information.
- **Frontend:** [`Footer.jsx`](frontend/src/components/Footer.jsx).

---

## 10. Informational Pages

### ✅ Home / Landing Page
- Hero section with gradient text: "Modern Banking Starts Here".
- Credit card imagery from CDN.
- CTA button: "Apply for free" → Dashboard.
- Trust indicators: user count, no charges, secure payments.
- **Frontend:** [`Home.jsx`](frontend/src/pages/Home.jsx).

### ✅ About Us Page
- Mission & Vision statements.
- Statistics: 50K+ Users, ₹10Cr+ Transactions, 99.9% Uptime, 24/7 Support.
- "Why Choose Us" feature cards: Secure Banking, Instant Transfers, Premium Experience.
- Team/founder showcase.
- **Frontend:** [`AboutUs.jsx`](frontend/src/pages/AboutUs.jsx).

### ✅ Contact Page
- Contact information: email, phone, address, working hours.
- **Contact form** (Name, Email, Subject, Message) — UI functional, backend **not connected** (marked "Not Working").
- Quick support cards: Card Support, Security Help, Loan Assistance.
- **Frontend:** [`Contact.jsx`](frontend/src/pages/Contact.jsx).

---

## 11. API Layer

### Backend REST API Endpoints

All endpoints prefixed with `/api/auth/`.

| Method | Endpoint | Description | Auth | Status |
|---|---|---|---|---|
| `POST` | `/register` | Register new user account | ❌ | ✅ |
| `POST` | `/verify` | Verify email with OTP | ❌ | ✅ |
| `POST` | `/login` | Authenticate & issue tokens | ❌ | ✅ |
| `GET` | `/refresh-token` | Rotate access + refresh tokens | Cookie | ✅ |
| `GET` | `/get-dashboardData` | Fetch user data + last 3 transactions | Bearer | ✅ |
| `POST` | `/send-money` | Transfer money to another user | Bearer | ✅ |
| `GET` | `/transactions` | Paginated transaction history | Bearer | ✅ |
| `POST` | `/check-balance` | Password-protected balance check | Bearer | ✅ |

### Frontend API Client

Centralized in [`api.js`](frontend/src/services/api.js) using **Axios**:
- `registerUser(data)` — registration
- `verifyUser(data)` — OTP verification
- `loginUser(data)` — login
- `getDashboardData(accessToken)` — dashboard data
- `sendMoney(accessToken, receiver, amount, password)` — money transfer
- `getTransactions(pageNo, accessToken)` — paginated transactions
- `checkBalance(accessToken, password)` — balance check

---

## 12. Database & Data Models

### MongoDB Atlas Collections

| Collection | Model | Description |
|---|---|---|
| `users` | [`user.model.js`](backend/src/models/user.model.js) | User accounts, banking details, card info, limits, KYC, nominee |
| `otps` | [`otp.model.js`](backend/src/models/otp.model.js) | Email verification OTPs with SHA-256 hash and TTL (600s auto-delete) |
| `sessions` | [`session.model.js`](backend/src/models/session.model.js) | Refresh token sessions with IP, User-Agent, revocation flag |
| `transactions` | [`transaction.model.js`](backend/src/models/transaction.model.js) | Money transfer records between users |

### Key Data Features
- **Timestamps** — all models use Mongoose `timestamps: true` (createdAt, updatedAt).
- **Unique constraints** — email, phone number, Aadhar number.
- **TTL Index** — OTPs auto-expire after 10 minutes.
- **Enum validation** — account type, card type, account status.

---

## 13. External Integrations

| Integration | Technology | Status |
|---|---|---|
| **Email Delivery** | Nodemailer + Gmail OAuth2 | ✅ Implemented |
| **Database** | MongoDB Atlas (cloud) | ✅ Implemented |
| **QR Code Generation** | `react-qr-code` | ✅ Implemented |
| **Google reCAPTCHA** | `react-google-recaptcha` | 🔧 Dependency installed, not wired |
| **Supabase** | `@supabase/supabase-js` | 🚧 Client configured, no usage |

---

## 14. Developer Experience

### ✅ Project Tooling
- **Vite 8** — fast HMR, ESM-native build system.
- **Tailwind CSS 3** — utility-first styling with custom theme config.
- **shadcn/ui** — accessible component primitives (resizable navbar, etc.).
- **Morgan** — HTTP request logging in development.
- **dotenv** — environment variable management.
- **Postman Collection** — API testing resources in `/postman` directory.

### ✅ State Management
- React **Context API** — 6 context providers:
  - `AccessTokenContext` — JWT access token + auto-refresh
  - `SideBarContext` — sidebar active state (URL-driven)
  - `UserTempContext` — temporary user data during registration flow
  - `UserDataContext` — logged-in user data + login state
  - `TransactionsContext` — transaction data state
  - `TransferToContext` — transfer method selection state

### ✅ Design System
- **Animations** — Framer Motion (`motion` package), `tw-animate-css`.
- **Icons** — Lucide React, Tabler Icons, Font Awesome.
- **Class merging** — `clsx` + `tailwind-merge` utility.
- **Modern UI patterns** — glassmorphism, gradient cards, backdrop blur, radial gradients.

### ✅ Documentation
- [`README.md`](README.md) — project overview, setup guide, API reference
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — system design, component hierarchy, data flow diagrams
- [`DATABASE_DESIGN.md`](DATABASE_DESIGN.md) — schema documentation, ER diagrams
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md) — detailed installation and troubleshooting
- [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) — known issues and improvement areas

---

## 15. Planned / Future Features

| Feature | Evidence | Priority |
|---|---|---|
| **AI Chat Integration** | Architecture doc shows OpenAI / Gemini / Claude adapters | 🚧 Designed |
| **AI Code Review** | Architecture doc describes `/api/ai/review` endpoint | 🚧 Designed |
| **AI Doc Generation** | Architecture doc describes `/api/ai/generate-docs` endpoint | 🚧 Designed |
| **Change Password** | Settings page UI — "Coming Soon" | 🚧 |
| **Two-Factor Authentication (2FA)** | Settings page UI — "Coming Soon" | 🚧 |
| **Login History View** | Settings page UI — "Coming Soon" | 🚧 |
| **Bill Payments** | Dashboard UI icons exist (Mobile, Electricity, etc.) | 🔧 UI-only |
| **Supabase Integration** | Client file exists, no active usage | 🚧 |
| **reCAPTCHA Protection** | Dependency installed, not wired | 🔧 |
| **Account Deletion** | Settings page has Delete button, no backend | 🔧 UI-only |
| **Logout** | Sidebar/Settings button exists, no endpoint | 🔧 UI-only |
| **Investment / Statement** | Sidebar link exists, no page/endpoint | 🔧 UI-only |
| **Account Management Requests** | Application hub links to page, placeholder content | 🔧 |
| **KYC & Identity Services** | Application hub links to page, placeholder content | 🔧 |
| **Card Services** | Application hub links to page, placeholder content | 🔧 |
| **Cheque & Payment Services** | Application hub links to page, placeholder content | 🔧 |
| **Internet Banking & Security** | Application hub links to page, placeholder content | 🔧 |
| **Contact Form Submission** | Contact page form exists, no backend | 🔧 UI-only |

---

## Feature Matrix Summary

| Category | ✅ Implemented | 🔧 Partial | 🚧 Planned | Total |
|---|---|---|---|---|
| Authentication & Security | 8 | 1 | 0 | 9 |
| Account Management | 6 | 0 | 0 | 6 |
| Banking Operations | 4 | 0 | 0 | 4 |
| Dashboard | 4 | 3 | 0 | 7 |
| Transaction Management | 2 | 0 | 0 | 2 |
| Service Applications | 1 | 7 | 0 | 8 |
| Loan & Credit Services | 2 | 1 | 0 | 3 |
| User Settings | 1 | 4 | 3 | 8 |
| Navigation & Layout | 4 | 0 | 0 | 4 |
| Informational Pages | 3 | 0 | 0 | 3 |
| API Layer | 8 | 0 | 0 | 8 |
| Database & Models | 4 | 0 | 0 | 4 |
| External Integrations | 3 | 1 | 1 | 5 |
| Developer Experience | 4 | 0 | 0 | 4 |
| **Totals** | **54** | **17** | **4** | **75** |

---

<div align="center">

**Built with ❤️ by the Shinrai Bank Team**

</div>
