# 🏦 Shinrai Bank — Secure Digital Banking Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-green.svg)
![React](https://img.shields.io/badge/frontend-React%2019-61DAFB.svg)
![Express](https://img.shields.io/badge/backend-Express%205-000000.svg)

**A production-grade full-stack banking application with secure JWT authentication, OTP email verification, real-time money transfers with atomic MongoDB transactions, and a modern React dashboard.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture-overview) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Database Design](#-database-design) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
  - [Authentication & Security](#authentication--security)
  - [Banking Operations](#banking-operations)
  - [Dashboard & UI](#dashboard--ui)
  - [Service Application Hub](#service-application-hub)
  - [Informational Pages](#informational-pages)
- [Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [External Services](#external-services)
- [Architecture Overview](#-architecture-overview)
  - [High-Level System Diagram](#high-level-system-diagram)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [Request Pipeline](#request-pipeline)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Banking Endpoints](#banking-endpoints)
  - [Request & Response Schemas](#request--response-schemas)
- [Database Design](#-database-design)
  - [Collections Overview](#collections-overview)
  - [Users Collection](#users-collection)
  - [OTPs Collection](#otps-collection)
  - [Sessions Collection](#sessions-collection)
  - [Transactions Collection](#transactions-collection)
- [Authentication & Security Deep Dive](#-authentication--security-deep-dive)
  - [Registration Flow](#registration-flow)
  - [Login & Token Lifecycle](#login--token-lifecycle)
  - [Token Architecture](#token-architecture)
  - [Money Transfer Flow](#money-transfer-flow)
- [Frontend Deep Dive](#-frontend-deep-dive)
  - [Routing Architecture](#routing-architecture)
  - [State Management](#state-management)
  - [Component Hierarchy](#component-hierarchy)
  - [Styling Architecture](#styling-architecture)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Related Documentation](#-related-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Authentication & Security
| Feature | Description | Status |
|---|---|---|
| **User Registration** | Multi-field form with name, Aadhar, phone, email, password, DOB, account type, nickname | ✅ Implemented |
| **Email OTP Verification** | 6-digit OTP via Azure Communication Services, SHA-256 hashed, 10-min TTL auto-expiry | ✅ Implemented |
| **Secure Login** | Email + password + account type authentication with bcrypt comparison | ✅ Implemented |
| **JWT Access Tokens** | 15-minute lifespan, stored in React Context (in-memory), sent via `Authorization` header | ✅ Implemented |
| **JWT Refresh Tokens** | 7-day lifespan, HTTP-only secure cookie, SHA-256 hashed in DB, full rotation on each use | ✅ Implemented |
| **Session Tracking** | IP address and User-Agent recorded per login session with revocation support | ✅ Implemented |
| **Password Hashing** | bcrypt with 10 salt rounds for all user passwords | ✅ Implemented |
| **OTP Hashing** | SHA-256 one-way hash for OTP storage | ✅ Implemented |
| **Luhn-Valid Card Generation** | 16-digit card numbers passing Luhn algorithm validation, uniqueness guaranteed | ✅ Implemented |
| **HTTP-Only Secure Cookies** | Refresh tokens use `httpOnly`, `secure`, `sameSite: strict` flags | ✅ Implemented |
| **CORS Protection** | Origin whitelisted to frontend dev server with credentials enabled | ✅ Implemented |
| **Duplicate Detection** | Registration blocked if email or Aadhar number already exists | ✅ Implemented |
| **Google reCAPTCHA** | Dependency installed, integration pending | 🔧 Partial |
| **Two-Factor Authentication** | UI placeholder in Settings | 🚧 Planned |

### Banking Operations
| Feature | Description | Status |
|---|---|---|
| **Send Money (Phone Number)** | Transfer by recipient's phone number with password re-verification | ✅ Implemented |
| **Send Money (Account Number)** | Transfer by recipient's account number | ✅ Implemented |
| **Send Money (Bank UPI)** | Transfer by UPI ID (e.g., `9876543210@shinrai`), extracts phone from UPI | ✅ Implemented |
| **Atomic Transactions** | MongoDB sessions with `startTransaction()` / `commitTransaction()` / `abortTransaction()` | ✅ Implemented |
| **Self-Transfer Prevention** | Cannot send money to own account | ✅ Implemented |
| **Daily Transfer Limit** | ₹1,00,000/day with automatic reset when date changes | ✅ Implemented |
| **Monthly Transfer Limit** | ₹10,00,000/month with automatic reset when month changes | ✅ Implemented |
| **Balance Check** | Password-protected balance inquiry with formatted INR display | ✅ Implemented |
| **Insufficient Balance Guard** | Transfers rejected if balance < amount | ✅ Implemented |
| **Paginated Transaction History** | Server-side pagination with configurable page size (default: 10) | ✅ Implemented |
| **Bill Payments** | Dashboard UI icons for Mobile, Electricity, LPG, DTH, Broadband, Credit Card | 🔧 UI-Only |
| **EMI Calculator** | Interactive loan calculator with adjustable amount (₹10K–₹10L) and tenure (6–84 months) | ✅ Implemented |

### Dashboard & UI
| Feature | Description | Status |
|---|---|---|
| **Account Overview** | Gradient debit/credit card with number, name, validity, CVV | ✅ Implemented |
| **QR Code Generation** | Auto-generated UPI QR code for instant sharing via `react-qr-code` | ✅ Implemented |
| **Recent Transactions** | Last 3 transactions with color-coded debit (red) / credit (green) indicators | ✅ Implemented |
| **Quick Transfer Panel** | Shortcut buttons: Pay Number, Pay to Bank, Pay to UPI, Check Balance | ✅ Implemented |
| **Promotional Offers** | Cashback banner section | ✅ Implemented |
| **User Profile Card** | Name, phone, account number, UPI ID display with QR code | ✅ Implemented |
| **Responsive Navbar** | Desktop + mobile hamburger navigation with conditional auth buttons | ✅ Implemented |
| **Dashboard Sidebar** | Icon-based vertical nav: Dashboard, Application, History, Loan, Statement, Settings | ✅ Implemented |
| **Settings Page** | Profile info, security options, notification preferences, theme selection, danger zone | 🔧 Partial |
| **Contact Shortcuts** | Avatar circles for frequent contacts | 🔧 UI-Only |

### Service Application Hub
Seven banking service categories accessible from a central grid page with animated cards:

| Service | Route | Status |
|---|---|---|
| Account Management Requests | `/account-management` | 🔧 Placeholder |
| KYC & Identity Services | `/kyc-identity` | 🔧 Placeholder |
| Card Services | `/card-services` | 🔧 Placeholder |
| Loan & Credit Services | `/loan-credit-services` | 🔧 Placeholder |
| Contact & Communication Updates | `/contact-update` | 🔧 Placeholder |
| Cheque & Payment Services | `/cheque-services` | 🔧 Placeholder |
| Internet Banking & Security | `/internet-banking` | 🔧 Placeholder |

### Informational Pages
| Page | Route | Description |
|---|---|---|
| **Home / Landing** | `/` | Hero section with gradient text, credit card imagery, CTA, trust indicators |
| **About Us** | `/about-us` | Mission & Vision, statistics (50K+ users, ₹10Cr+ transactions), "Why Choose Us" cards, founder profile |
| **Contact** | `/contact` | Contact info (email, phone, address), contact form (UI-only), quick support cards |
| **Loan** | `/loan` | Loan types, pre-approved offer banner, EMI calculator, active loan display |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework with concurrent features |
| [Vite](https://vite.dev/) | 8 | Build tool with fast HMR and native ESM |
| [React Router](https://reactrouter.com/) | 7 | Client-side SPA routing |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | — | Accessible component primitives (Button, Input, Resizable Navbar) |
| [Axios](https://axios-http.com/) | — | HTTP client for API communication |
| [Motion (Framer)](https://motion.dev/) | — | Smooth animations and transitions |
| [react-qr-code](https://www.npmjs.com/package/react-qr-code) | — | UPI QR code generation |
| [Lucide React](https://lucide.dev/) | — | Icon library |
| [Tabler Icons](https://tabler.io/icons) | — | Icon library |
| [Font Awesome](https://fontawesome.com/) | — | Icon library |
| [clsx](https://www.npmjs.com/package/clsx) + [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) | — | Dynamic class name merging |
| [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) | — | Tailwind animation utilities |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥ 16 | JavaScript runtime |
| [Express](https://expressjs.com/) | 5 | HTTP framework with async route handlers |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | — | Cloud-hosted NoSQL database |
| [Mongoose](https://mongoosejs.com/) | 9 | ODM with schema validation and middleware |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | — | JWT signing and verification |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | 6 | Password hashing |
| [Azure Communication Email](https://www.npmjs.com/package/@azure/communication-email) | 1.1 | Email delivery via Azure Communication Services |
| [Nodemailer](https://www.npmjs.com/package/nodemailer) | 9 | Email transport (available as alternative) |
| [Morgan](https://www.npmjs.com/package/morgan) | — | HTTP request logging |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | — | Cookie parsing middleware |
| [cors](https://www.npmjs.com/package/cors) | — | Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | 17 | Environment variable loading |
| [Nodemon](https://www.npmjs.com/package/nodemon) | 3 | Auto-restart dev server on file changes |

### External Services

| Service | Purpose | Status |
|---|---|---|
| **MongoDB Atlas** | Cloud database hosting | ✅ Active |
| **Azure Communication Services** | Transactional email delivery (OTP) | ✅ Active |
| **Supabase** | Future use — file uploads, realtime features | 🚧 Client configured |
| **Google reCAPTCHA** | Bot protection on forms | 🔧 Dependency installed |

---

## 🏗 Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                             │
│   React 19 + Vite 8 + Tailwind CSS 3 + shadcn/ui + Motion          │
│                                                                     │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│   │   Home   │ │  Login   │ │Dashboard │ │ Transfer │ │Settings │ │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
│                                                                     │
│   Context Providers: AccessToken, UserData, SideBar,                │
│                      UserTemp, TransferTo, Transactions             │
│                        │                                            │
│                   Axios HTTP Client                                 │
└────────────────────────┼────────────────────────────────────────────┘
                         │  REST API (JSON over HTTPS)
┌────────────────────────┼────────────────────────────────────────────┐
│                        ▼       BACKEND (Express 5)                  │
│                                                                     │
│   ┌──────────────────┐    ┌──────────────────┐   ┌───────────────┐ │
│   │   Middleware      │    │   Controllers     │   │   Services    │ │
│   │  ├ morgan()       │    │  ├ register()     │   │  └ sendEmail()│ │
│   │  ├ express.json() │ →  │  ├ login()        │ → │               │ │
│   │  ├ cors()         │    │  ├ verify()       │   ├───────────────┤ │
│   │  └ cookieParser() │    │  ├ refreshToken() │   │   Utilities   │ │
│   └──────────────────┘    │  ├ getDashboard() │   │  ├ generateOtp │ │
│                            │  ├ sendMoney()    │   │  └ cardUtil   │ │
│   ┌──────────────────┐    │  ├ getTransact()  │   └───────────────┘ │
│   │     Routes        │    │  └ checkBalance() │                     │
│   │  /api/auth/*      │    └──────────────────┘                     │
│   └──────────────────┘             │                                │
│                              ┌─────┴──────┐                        │
│                              │   Models    │                        │
│                              │ User / OTP  │                        │
│                              │ Session/Txn │                        │
│                              └─────┬──────┘                        │
└────────────────────────────────────┼────────────────────────────────┘
                                     │  Mongoose ODM
                              ┌──────┴───────┐
                              │ MongoDB Atlas │
                              │  (Cloud DB)   │
                              └──────────────┘
```

### Frontend Architecture

**Component Hierarchy:**
```
main.jsx
  └── Context Providers (6 nested)
       └── BrowserRouter
            └── App.jsx
                 ├── Navbar (conditional — hidden on login/register/otp)
                 ├── Routes
                 │    ├── /              → Home
                 │    ├── /login         → Login
                 │    ├── /create-account → CreateAccount
                 │    ├── /otp           → OtpVerification
                 │    ├── /dashboard     → Dashboard (+ SideBar)
                 │    ├── /send-money    → SendMoney
                 │    ├── /check-balance → CheckBalance
                 │    ├── /transactions  → Transactions
                 │    ├── /settings      → Settings
                 │    ├── /loan          → Loan
                 │    ├── /contact       → Contact
                 │    ├── /about-us      → AboutUs
                 │    ├── /application   → Application (Service Hub)
                 │    ├── /account-management → AccountManagement
                 │    ├── /kyc-identity       → KYC
                 │    ├── /card-services      → CardServices
                 │    ├── /loan-credit-services → LoanServices
                 │    ├── /contact-update     → ContactServices
                 │    ├── /cheque-services    → ChequeServices
                 │    └── /internet-banking   → InternetBanking
                 └── Footer (conditional — hidden on login/register/otp)
```

### Backend Architecture

**Layered Design:**
```
server.js (Entry Point)
  └── app.js (Express Setup)
       ├── Middleware Stack
       │    ├── morgan()        → HTTP request logging
       │    ├── express.json()  → JSON body parsing
       │    ├── cors()          → Origin: http://localhost:5173
       │    └── cookieParser()  → Cookie parsing
       │
       └── Routes
            └── /api/auth/* → auth.route.js
                 ├── POST /register        → register()
                 ├── POST /verify          → verify()
                 ├── POST /login           → login()
                 ├── GET  /refresh-token   → refreshToken()
                 ├── GET  /get-dashboardData → getDashboardData()
                 ├── POST /send-money      → sendMoney()
                 ├── GET  /transactions    → getTransactions()
                 └── POST /check-balance   → checkBalance()
```

### Request Pipeline

```
HTTP Request Incoming
    │
    ├── morgan()          →  Log: method, URL, status code, response time
    ├── express.json()    →  Parse JSON request body → req.body
    ├── cors()            →  Validate origin against whitelist
    ├── cookieParser()    →  Parse cookies → req.cookies
    │
    ├── Router Matching   →  /api/auth/* → authRouter
    │
    ├── Controller Logic
    │   ├── Input validation (manual field checks)
    │   ├── Database operations (Mongoose queries)
    │   ├── External services (Azure Email for OTP)
    │   ├── Cryptographic operations (bcrypt, SHA-256, JWT)
    │   └── MongoDB transactions (for money transfers)
    │
    └── JSON Response     →  { success: boolean, message: string, data?: any }
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Download |
|---|---|---|
| **Node.js** | ≥ 16.0.0 | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 8.0.0 | Bundled with Node.js |
| **MongoDB Atlas** | Free tier (M0) | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Azure Account** | Free tier | [azure.microsoft.com](https://azure.microsoft.com/) |
| **Git** | Any | [git-scm.com](https://git-scm.com/) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Shinrai-Bank.git
cd Shinrai-Bank

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Configure environment variables (see next section)

# 5. Start both servers (see "Running the Application")
```

### Environment Variables

#### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
BACKEND_PORT=3000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>

# JWT Secret Key (use a strong random 256-bit string)
JWT_URI=your-256-bit-secret-key-here

# Azure Communication Services (for email delivery)
AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://<resource>.communication.azure.com/;accesskey=<key>
EMAIL_SENDER=DoNotReply@<domain>.azurecomm.net

# Google OAuth2 (optional — for Nodemailer Gmail transport)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
GOOGLE_REFRESH_TOKEN=1//your-refresh-token
GOOGLE_EMAIL_USER=your-email@gmail.com
```

**Backend Environment Variables Reference:**

| Variable | Required | Description |
|---|---|---|
| `BACKEND_PORT` | ✅ | Express server port (default: `3000`) |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_URI` | ✅ | Secret key for signing/verifying JWTs |
| `AZURE_COMMUNICATION_CONNECTION_STRING` | ✅ | Azure Communication Services connection string |
| `EMAIL_SENDER` | ✅ | Sender email address for Azure Communication |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth2 client ID (for Gmail alternative) |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth2 client secret |
| `GOOGLE_REFRESH_TOKEN` | ❌ | Gmail API refresh token |
| `GOOGLE_EMAIL_USER` | ❌ | Gmail address for sending |

#### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
# Backend API Base URL
VITE_BACKEND_PORT=http://localhost:3000/api/auth

# Supabase (optional — future features)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

| Variable | Required | Description |
|---|---|---|
| `VITE_BACKEND_PORT` | ✅ | Backend API base URL (must include `/api/auth`) |
| `VITE_SUPABASE_URL` | ❌ | Supabase project URL (future use) |
| `VITE_SUPABASE_ANON_KEY` | ❌ | Supabase anonymous key (future use) |

> ⚠️ **Security:** Never commit `.env` files to version control. They are already listed in `.gitignore`.

### Database Setup

1. **Create a MongoDB Atlas cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free-tier (M0) cluster
   - Create a database user with read/write privileges

2. **Whitelist your IP address:**
   - Navigate to **Network Access → Add IP Address**
   - Add `0.0.0.0/0` for development (restrict in production)

3. **Get the connection string:**
   - Click **Connect → Connect your application**
   - Copy the URI and replace `<password>` with your database user's password

4. **Collections** — auto-created by Mongoose on first use:

   | Collection | Purpose | TTL |
   |---|---|---|
   | `users` | User accounts, banking details, card info | — |
   | `otps` | Email verification OTPs | 10 minutes |
   | `sessions` | JWT refresh token sessions | — |
   | `transactions` | Money transfer records | — |

---

## ▶️ Running the Application

### Development Mode

Open **two terminals** and run:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
> Backend starts at `http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
> Frontend starts at `http://localhost:5173`

### Verify Successful Startup

Look for these messages in the **backend** console:
```
Database connected successfully
Server is running at port 3000 .....
```

### Production Build

```bash
cd frontend
npm run build     # Creates optimized build in dist/
npm run preview   # Preview production build locally
```

---

## 📡 API Reference

All endpoints are prefixed with `/api/auth/`. The API follows REST conventions and returns JSON responses in this format:

```json
{
  "success": true,
  "message": "Human-readable status message",
  "data": {}
}
```

### Authentication Endpoints

#### `POST /api/auth/register`

Register a new user account with OTP email verification.

**Request Body:**
```json
{
  "name": "SK Sahil Uddin",
  "email": "sahil@example.com",
  "phoneNumber": "9647397722",
  "password": "SecurePass123",
  "aadharNumber": "123456789012",
  "dob": "2000-01-15"
}
```

**Responses:**

| Status | Description |
|---|---|
| `201` | User registered, OTP email sent |
| `400` | Missing required field(s) |
| `409` | User with this email/Aadhar already exists |

**What happens server-side:**
1. Validates all required fields
2. Checks for duplicate email/Aadhar
3. Hashes password with bcrypt (10 rounds)
4. Generates a Luhn-valid 16-digit card number + 3-digit CVV
5. Creates user document in MongoDB
6. Generates 6-digit OTP, hashes with SHA-256, stores with 10-min TTL
7. Sends OTP email via Azure Communication Services

---

#### `POST /api/auth/verify`

Verify email address with the OTP sent during registration.

**Request Body:**
```json
{
  "email": "sahil@example.com",
  "otp": "482957"
}
```

**Responses:**

| Status | Description |
|---|---|
| `200` | OTP verified, user marked as verified |
| `401` | OTP incorrect or expired (>10 minutes) |
| `404` | User not found |

---

#### `POST /api/auth/login`

Authenticate user and receive JWT tokens.

**Request Body:**
```json
{
  "email": "sahil@example.com",
  "password": "SecurePass123",
  "accountType": "SAVINGS"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User login successfully",
  "user": {
    "name": "SK Sahil Uddin",
    "email": "sahil@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Additionally sets:** `refreshToken` HTTP-only cookie (7-day lifetime).

**Responses:**

| Status | Description |
|---|---|
| `200` | Login successful, tokens issued |
| `401` | Invalid password |
| `403` | Email not verified |
| `404` | User not found |

**What happens server-side:**
1. Finds user by email + account type
2. Compares password hash with bcrypt
3. Verifies `user.verified === true`
4. Signs refresh token (7d) → hashes with SHA-256 → stores in sessions collection
5. Signs access token (15m)
6. Sets HTTP-only cookie with refresh token
7. Returns access token in response body

---

#### `GET /api/auth/refresh-token`

Rotate access and refresh tokens using the refresh token cookie.

**Headers:** Automatically sends `refreshToken` cookie.

**Response (200):**
```json
{
  "message": "Access token refreshed successfully",
  "newAccessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Additionally:** Sets new `refreshToken` cookie (old one invalidated).

| Status | Description |
|---|---|
| `200` | New tokens issued |
| `401` | Refresh token missing, invalid, or revoked |

---

### Banking Endpoints

#### `GET /api/auth/get-dashboardData`

Fetch authenticated user's dashboard data and last 3 transactions.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User data found",
  "user": {
    "userId": "665a...",
    "name": "SK Sahil Uddin",
    "email": "sahil@example.com",
    "phoneNumber": "9647397722",
    "cardType": "DEBIT",
    "cardNumber": "4532015112830366",
    "cardValid": "2031-06-24T00:00:00.000Z",
    "cardCVV": 482,
    "verified": true,
    "accountNumber": "9647397722",
    "transactions": [
      {
        "_id": "...",
        "user1": "...",
        "user1Name": "SK Sahil Uddin",
        "amount": 500,
        "user2": "...",
        "user2Name": "John Doe",
        "createdAt": "2026-06-24T12:00:00.000Z"
      }
    ]
  }
}
```

---

#### `POST /api/auth/send-money`

Transfer money to another user account.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "reciverPhoneNumber": "9876543210",
  "reciverAccountNumber": null,
  "amount": 500,
  "password": "SecurePass123"
}
```

> Provide either `reciverPhoneNumber` OR `reciverAccountNumber`, not both.

**Responses:**

| Status | Description |
|---|---|
| `200` | Transfer successful |
| `400` | Invalid amount, missing password, or missing receiver |
| `401` | Invalid/missing access token |
| `403` | Incorrect password or unverified user |
| `404` | Receiver not found |
| `409` | Insufficient balance, daily limit reached, monthly limit reached, or self-transfer attempt |

**What happens server-side:**
1. Validates access token and verifies password
2. Blocks self-transfer attempts
3. Checks and auto-resets daily/monthly limits if date/month changed
4. Validates against daily limit, monthly limit, and available balance
5. Starts MongoDB transaction session
6. Deducts from sender, credits to receiver (atomically)
7. Updates sender's daily/monthly transferred amounts
8. Creates transaction record
9. Commits transaction (or aborts on any error)

---

#### `GET /api/auth/transactions`

Fetch paginated transaction history for the authenticated user.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**

| Param | Default | Description |
|---|---|---|
| `page` | `1` | Page number |
| `limit` | `10` | Items per page |

**Response (200):**
```json
{
  "success": true,
  "message": "All transactions found",
  "transactions": [...],
  "totalPages": 5,
  "currentPage": 1
}
```

---

#### `POST /api/auth/check-balance`

Check account balance (requires password for security).

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Balance successfully fetched",
  "balance": 9500
}
```

| Status | Description |
|---|---|
| `200` | Balance returned |
| `400` | Password not provided |
| `401` | Invalid/missing access token |
| `403` | Incorrect password |

---

## 🗄 Database Design

### Collections Overview

```
┌─────────────────────────────────────────────────────┐
│                   MongoDB Atlas                      │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐
│  │  users   │──│   otps   │  │ sessions │  │  txns  │
│  │          │  │ (TTL:10m)│  │          │  │        │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘
│                                                     │
│  users ──< otps       (1:N, user has pending OTPs)  │
│  users ──< sessions   (1:N, user has login sessions)│
│  users ──< transactions (1:N, as sender or receiver)│
└─────────────────────────────────────────────────────┘
```

### Users Collection

The main user document stores all account, banking, card, and KYC information.

| Field | Type | Description | Default |
|---|---|---|---|
| `name` | String | Full name | *Required* |
| `nickName` | String | Account nickname | — |
| `email` | String | Email address (unique) | *Required* |
| `phoneNumber` | String | Phone number (unique) | *Required* |
| `aadharNumber` | String | Aadhar ID (unique) | *Required* |
| `password` | String | bcrypt hashed password | *Required* |
| `dob` | Date | Date of birth | *Required* |
| `address` | String | Residential address | — |
| `accountType` | Enum | `SAVINGS` \| `CURRENT` \| `SALARY` \| `FIXED_DEPOSIT` | `SAVINGS` |
| `accountNumber` | String | Account number (= phone number) | — |
| `status` | Enum | `ACTIVE` \| `FROZEN` \| `CLOSED` \| `SUSPENDED` | `ACTIVE` |
| `bankBalance` | Number | Current balance (INR) | `10000` |
| `currency` | String | Currency code | `INR` |
| `branchCode` | String | Branch identifier | `Shinrai Branch of India` |
| `ifscCode` | String | IFSC code | `SHIN02042007` |
| `cardType` | Enum | `DEBIT` \| `CREDIT` | `DEBIT` |
| `cardNumber` | String | 16-digit Luhn-valid card number | Auto-generated |
| `cardCVV` | Number | 3-digit security code | Random (100–999) |
| `cardValid` | Date | Card expiration date | `now + 5 years` |
| `dailyTransferLimit` | Number | Max daily transfer (INR) | `100000` |
| `dailyTransferredAmount` | Number | Transferred today | `0` |
| `monthlyTransferLimit` | Number | Max monthly transfer (INR) | `1000000` |
| `monthlyTransferredAmount` | Number | Transferred this month | `0` |
| `lastDailyReset` | Date | Last daily limit reset timestamp | `Date.now` |
| `lastMonthlyReset` | Date | Last monthly limit reset timestamp | `Date.now` |
| `kycVerified` | Boolean | KYC verification status | `false` |
| `interestRate` | Number | Account interest rate | `0` |
| `nominee.name` | String | Nominee full name | — |
| `nominee.relation` | String | Nominee relation | — |
| `nominee.phone` | String | Nominee phone number | — |
| `verified` | Boolean | Email verified via OTP | `false` |
| `createdAt` | Date | Auto-generated timestamp | Mongoose |
| `updatedAt` | Date | Auto-generated timestamp | Mongoose |

### OTPs Collection

Stores hashed OTPs with automatic 10-minute expiration via MongoDB TTL index.

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Reference to user document |
| `email` | String | User's email address |
| `otp` | String | SHA-256 hashed OTP |
| `createdAt` | Date | Creation time (`expires: 600` seconds) |

### Sessions Collection

Tracks active login sessions with refresh token hashes, client IP, and user-agent.

| Field | Type | Description | Default |
|---|---|---|---|
| `user` | ObjectId | Reference to user document | *Required* |
| `refreshToken` | String | SHA-256 hashed refresh token | *Required* |
| `ip` | String | Client IP address | *Required* |
| `userAgent` | String | Browser user-agent string | *Required* |
| `revoked` | Boolean | Whether session is revoked | `false` |
| `createdAt` | Date | Auto-generated | Mongoose |
| `updatedAt` | Date | Auto-generated | Mongoose |

### Transactions Collection

Records all money transfers between users.

| Field | Type | Description |
|---|---|---|
| `user1` | ObjectId | Sender's user ID |
| `user1Name` | String | Sender's display name |
| `amount` | Number | Transfer amount (INR) |
| `user2` | ObjectId | Receiver's user ID |
| `user2Name` | String | Receiver's display name |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Design Decisions

| Decision | Rationale |
|---|---|
| SHA-256 for OTPs | One-way hashing for verification codes — no need to decrypt |
| bcrypt for passwords | Industry standard with salt + work factor to prevent rainbow tables |
| TTL index on OTPs (600s) | MongoDB auto-deletes expired OTPs, no cleanup cron needed |
| Session tracking with IP/UA | Enables suspicious login detection and session management |
| Atomic transactions for transfers | MongoDB sessions ensure both balances update or neither does |
| Phone number as account number | Simplified account lookup and user-friendly transfers |
| 5-year card validity | Realistic card expiration aligned with banking industry standards |

---

## 🔒 Authentication & Security Deep Dive

### Registration Flow

```
User (Browser)                    Frontend (React)                Backend (Express)           MongoDB            Azure Email
      │                                 │                               │                       │                    │
      ├── Fill registration form ──────►│                               │                       │                    │
      │                                 ├── POST /api/auth/register ──►│                       │                    │
      │                                 │                               ├── Validate fields     │                    │
      │                                 │                               ├── Check duplicates ──►│                    │
      │                                 │                               │◄── Not found ─────────┤                    │
      │                                 │                               ├── Hash password (bcrypt)                    │
      │                                 │                               ├── Generate Luhn card                        │
      │                                 │                               ├── Generate 6-digit OTP                      │
      │                                 │                               ├── Hash OTP (SHA-256)                        │
      │                                 │                               ├── Create user doc ───►│                    │
      │                                 │                               ├── Create OTP doc ────►│ (TTL: 10 min)     │
      │                                 │◄── 201 { success, user } ────┤                       │                    │
      │◄── Redirect to /otp ───────────┤                               ├── Send OTP email ────────────────────────►│
      │                                 │                               │                       │      Email sent    │
      ├── Enter OTP ──────────────────►│                               │                       │                    │
      │                                 ├── POST /api/auth/verify ────►│                       │                    │
      │                                 │                               ├── Hash input OTP      │                    │
      │                                 │                               ├── Find matching OTP ──►│                    │
      │                                 │                               ├── Set verified=true ──►│                    │
      │                                 │◄── 200 { success } ──────────┤                       │                    │
      │◄── Redirect to /login ─────────┤                               │                       │                    │
```

### Login & Token Lifecycle

```
User ──► Login Form ──► POST /api/auth/login
                              │
                              ├── Find user by email + accountType
                              ├── bcrypt.compare(password, hash)
                              ├── Check user.verified === true
                              │
                              ├── Sign Refresh Token (JWT, 7d expiry)
                              │    └── Payload: { id: user._id }
                              ├── SHA-256 hash refresh token
                              ├── Create session record (hash, IP, UA)
                              │
                              ├── Sign Access Token (JWT, 15m expiry)
                              │    └── Payload: { id: user._id }
                              │
                              ├── Set cookie: refreshToken (httpOnly, secure, sameSite)
                              └── Return: { accessToken } in JSON body

                    ┌─── After 15 minutes ───┐
                    │                         │
                    ▼                         │
           GET /refresh-token ────────────────┘
                    │
                    ├── Read refreshToken from cookie
                    ├── Verify JWT signature
                    ├── Hash and find matching session (revoked === false)
                    ├── Sign new access token (15m)
                    ├── Sign new refresh token (7d)
                    ├── Update session with new hash
                    ├── Set new cookie
                    └── Return: { newAccessToken }
```

### Token Architecture

| Property | Access Token | Refresh Token |
|---|---|---|
| **Storage** | React Context (in-memory) | HTTP-only cookie |
| **Lifetime** | 15 minutes | 7 days |
| **Payload** | `{ id: user._id }` | `{ id: user._id }` |
| **Sent via** | `Authorization: Bearer` header | Cookie (automatic) |
| **DB Record** | None | SHA-256 hash in `sessions` collection |
| **Purpose** | Authenticate API requests | Rotate access tokens |
| **Rotation** | New one per refresh | New one per use (invalidates old) |
| **XSS Protection** | Not accessible to scripts (memory only) | `httpOnly` flag prevents JS access |

### Money Transfer Flow

```
Sender ──► POST /api/auth/send-money
                │
                ├── Verify access token (JWT)
                ├── Find sender by token ID
                ├── Validate amount > 0
                ├── Re-verify password (bcrypt)
                ├── Block self-transfer
                │
                ├── Check daily limit reset (date changed? → reset to 0)
                ├── Check monthly limit reset (month changed? → reset to 0)
                ├── Verify daily limit not exceeded
                ├── Verify monthly limit not exceeded
                ├── Verify sufficient balance
                │
                ├── ═══ START MongoDB Transaction ═══
                │    ├── Find receiver by phone/account number
                │    ├── sender.balance -= amount
                │    ├── receiver.balance += amount
                │    ├── Update sender's daily/monthly totals
                │    ├── Create transaction record
                │    └── ═══ COMMIT Transaction ═══
                │
                └── Return: { success, message }

                    On ANY error → ABORT Transaction (no partial updates)
```

---

## 🎨 Frontend Deep Dive

### Routing Architecture

| Route | Page Component | Layout | Auth Required |
|---|---|---|---|
| `/` | `Home` | Navbar + Footer | ❌ |
| `/login` | `Login` | Standalone (no Navbar/Footer) | ❌ |
| `/create-account` | `CreateAccount` | Standalone | ❌ |
| `/otp` | `OtpVerification` | Standalone | ❌ |
| `/dashboard` | `Dashboard` | Navbar + Footer + Sidebar | ✅ |
| `/send-money` | `SendMoney` | Navbar + Footer | ✅ |
| `/check-balance` | `CheckBalance` | Navbar + Footer | ✅ |
| `/transactions` | `Transactions` | Navbar + Footer | ✅ |
| `/settings` | `Settings` | Navbar + Footer | ✅ |
| `/loan` | `Loan` | Navbar + Footer | ❌ |
| `/contact` | `Contact` | Navbar + Footer | ❌ |
| `/about-us` | `AboutUs` | Navbar + Footer | ❌ |
| `/application` | `Application` | Navbar + Footer + Sidebar | ✅ |
| `/account-management` | `AccountManagement` | Navbar + Footer | ✅ |
| `/kyc-identity` | `KYC` | Navbar + Footer | ✅ |
| `/card-services` | `CardServices` | Navbar + Footer | ✅ |
| `/loan-credit-services` | `LoanServices` | Navbar + Footer | ✅ |
| `/contact-update` | `ContactServices` | Navbar + Footer | ✅ |
| `/cheque-services` | `ChequeServices` | Navbar + Footer | ✅ |
| `/internet-banking` | `InternetBanking` | Navbar + Footer | ✅ |

### State Management

The application uses React's **Context API** with 6 context providers nested in `main.jsx`:

| Context | Provider | State | Purpose | Consumed By |
|---|---|---|---|---|
| `TransactionsContext` | Outermost | Transaction list | Store transaction data | Transactions page |
| `TransferToContext` | Level 2 | Transfer method string | Track selected transfer type (phone/account/UPI) | SendMoney, Dashboard |
| `UserDataContext` | Level 3 | Full user object + `isLogedIn` | Store user profile data and login status | Dashboard, Settings, Navbar, Sidebar |
| `AccessTokenContext` | Level 4 | `accessToken` string + `loading` | JWT access token + auto-refresh on mount | All API calls |
| `UserTempContext` | Level 5 | Temp user data `{ name, email, phone }` | Pass registration data to OTP page | CreateAccount → OtpVerification |
| `SideBarContext` | Innermost | `sideBar` string (current route) | Track active sidebar item based on URL | Sidebar, App |

**Auto-refresh mechanism:** `AccessTokenContext` fires a `GET /refresh-token` request on app mount. While loading, children are not rendered (`{!loading && children}`), preventing flash of unauthenticated content.

### Component Hierarchy

```
src/
├── components/
│   ├── Navbar.jsx         →  Responsive navigation with auth-aware buttons
│   ├── Footer.jsx         →  Site-wide footer with social links + nav
│   ├── SideBar.jsx        →  Dashboard vertical icon navigation
│   └── ui/                →  shadcn/ui primitives
│       ├── button.jsx     →  Button component with variants
│       ├── input.jsx      →  Styled input component
│       └── resizable-navbar.jsx → Full navbar system (NavBody, NavItems,
│                                   MobileNav, NavbarLogo, NavbarButton)
│
├── contexts/              →  6 React Context providers (see State Management)
├── services/
│   ├── api.js             →  Axios-based API client (7 functions)
│   └── supabaseClient.js  →  Supabase client instance (future use)
├── config/
│   └── config.js          →  Vite env variable loader
└── lib/
    └── utils.js           →  clsx + tailwind-merge utility (cn function)
```

### Styling Architecture

```
Tailwind CSS 3 (utility classes)
    └── shadcn/ui (class-variance-authority components)
        └── tw-animate-css (animation utilities)
            └── Motion / Framer Motion (complex animations)
```

**Design System Highlights:**
- **Color Palette:** Dark zinc backgrounds (`zinc-950`, `zinc-900`), emerald/cyan accents for CTAs and highlights, gradient cards (pink-to-blue for debit card)
- **Glassmorphism:** `backdrop-blur-xl`, `bg-white/5`, `border border-white/10` used on cards and panels
- **Typography:** Inter variable font via Tailwind config
- **Radial Gradients:** Background orbs with `blur-[120px]` for ambient lighting effects
- **Hover Animations:** Cards with `hover:mt-0 hover:mb-8` lift effect, buttons with `group-hover:translate-x-1` arrow slide
- **Class Merging:** `cn()` utility combines `clsx` + `tailwind-merge` to avoid class conflicts

---

## 📁 Project Structure

```
Shinrai-Bank/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js              # Environment variable loader (dotenv)
│   │   │   └── database.config.js     # MongoDB Atlas connection handler
│   │   │
│   │   ├── controllers/
│   │   │   └── auth.controller.js     # All business logic (587 lines)
│   │   │       ├── register()         #   → User registration + OTP
│   │   │       ├── login()            #   → Authentication + token issuance
│   │   │       ├── verify()           #   → OTP verification
│   │   │       ├── refreshToken()     #   → Token rotation
│   │   │       ├── getDashboardData() #   → Dashboard data fetch
│   │   │       ├── sendMoney()        #   → Atomic money transfer
│   │   │       ├── getTransactions()  #   → Paginated history
│   │   │       └── checkBalance()     #   → Password-protected balance
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js          # User schema (30+ fields, enums, defaults)
│   │   │   ├── otp.model.js           # OTP schema (TTL: 600s auto-delete)
│   │   │   ├── session.model.js       # Session schema (IP, UA, revocation)
│   │   │   └── transaction.model.js   # Transaction schema (sender, receiver, amount)
│   │   │
│   │   ├── routes/
│   │   │   └── auth.route.js          # 8 API endpoint definitions
│   │   │
│   │   ├── services/
│   │   │   └── email.service.js       # Azure Communication Services email sender
│   │   │
│   │   ├── utils/
│   │   │   ├── otp.util.js            # OTP generation + HTML email template
│   │   │   └── card.util.js           # Luhn-valid card number generator
│   │   │
│   │   ├── app.js                     # Express app (middleware + routes)
│   │   └── server.js                  # Entry point (DB connect + listen)
│   │
│   ├── .env                           # Environment variables (not committed)
│   └── package.json                   # Dependencies + scripts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Responsive navbar (desktop + mobile)
│   │   │   ├── Footer.jsx             # Site-wide footer with links
│   │   │   ├── SideBar.jsx            # Dashboard vertical icon nav
│   │   │   └── ui/                    # shadcn/ui component primitives
│   │   │       ├── button.jsx
│   │   │       ├── input.jsx
│   │   │       └── resizable-navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page with hero section
│   │   │   ├── Login.jsx              # Login form (email + password + type)
│   │   │   ├── CreateAccount.jsx      # Registration form (9 fields)
│   │   │   ├── OtpVerification.jsx    # OTP input and verification
│   │   │   ├── Dashboard.jsx          # Main dashboard (card, txns, transfers, bills)
│   │   │   ├── SendMoney.jsx          # Transfer form (3 methods)
│   │   │   ├── CheckBalance.jsx       # Password-protected balance check
│   │   │   ├── Transactions.jsx       # Paginated transaction history table
│   │   │   ├── Settings.jsx           # User settings (profile, security, theme)
│   │   │   ├── Loan.jsx               # Loan types + EMI calculator
│   │   │   ├── Contact.jsx            # Contact info + form
│   │   │   ├── AboutUs.jsx            # About page with stats + team
│   │   │   ├── Application.jsx        # Service application hub (7 cards)
│   │   │   ├── AccountManagement.jsx  # Placeholder service page
│   │   │   ├── KYC.jsx                # Placeholder service page
│   │   │   ├── CardServices.jsx       # Placeholder service page
│   │   │   ├── LoanServices.jsx       # Placeholder service page
│   │   │   ├── ContactServices.jsx    # Placeholder service page
│   │   │   ├── ChequeServices.jsx     # Placeholder service page
│   │   │   └── InternetBanking.jsx    # Placeholder service page
│   │   │
│   │   ├── contexts/
│   │   │   ├── AccessTokenContext.jsx   # JWT + auto-refresh on mount
│   │   │   ├── UserDataContext.jsx      # User profile + isLogedIn flag
│   │   │   ├── SideBarContext.jsx       # Active sidebar item (URL-driven)
│   │   │   ├── UserTempContext.jsx      # Temp data (registration → OTP)
│   │   │   ├── TransferToContext.jsx    # Transfer method state
│   │   │   └── TransactionsContext.jsx  # Transaction data state
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                 # Axios API client (7 functions)
│   │   │   └── supabaseClient.js      # Supabase client (future use)
│   │   │
│   │   ├── config/
│   │   │   └── config.js             # Vite env variable loader
│   │   │
│   │   ├── lib/
│   │   │   └── utils.js              # cn() = clsx + tailwind-merge
│   │   │
│   │   ├── assets/                    # Static assets (hero.png, SVGs)
│   │   ├── test/                      # Test files
│   │   │   └── Test.jsx
│   │   │
│   │   ├── App.jsx                    # Root component with routing
│   │   ├── App.css                    # Minimal app styles
│   │   ├── main.jsx                   # Entry point (context providers + router)
│   │   └── index.css                  # Global styles + shadcn/ui CSS variables
│   │
│   ├── .env                           # Frontend env variables
│   ├── vite.config.js                 # Vite configuration
│   └── tailwind.config.js            # Tailwind CSS configuration
│
├── design/                            # UI design assets & screenshots
│   ├── Screenshot 2026-06-21 205532.png
│   └── *.jpg, *.png
│
├── postman/                           # Postman API collection
├── .github/                           # GitHub workflows & config
├── secrets/                           # Secret management (gitignored)
│
├── ARCHITECTURE.md                    # Detailed architecture documentation
├── DATABASE_DESIGN.md                 # Database schema documentation
├── FEATURE.md                         # Complete feature catalog (75 features)
├── SETUP_GUIDE.md                     # Detailed setup & troubleshooting
├── TECHNICAL_DEBT.md                  # Known issues & improvement areas
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

---

## 🧪 Testing

### Backend Testing

The backend is configured with **Jest** and **Supertest** for API testing:

```bash
cd backend

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

**Configuration:** Uses `--experimental-vm-modules` flag for ESM support with Jest.

**Dev Dependencies:**
- `jest` — testing framework
- `supertest` — HTTP assertion library
- `@jest/globals` — ESM-compatible Jest globals

### Frontend Testing

Test files are located in `frontend/src/test/`. Run via Vite's test runner or add a test script to `package.json`.

---

## 🚢 Deployment

### Current Setup (Development)

| Component | Host | URL |
|---|---|---|
| Frontend | Vite dev server | `http://localhost:5173` |
| Backend | Nodemon | `http://localhost:3000` |
| Database | MongoDB Atlas | Cloud (M0 free tier) |
| Email | Azure Communication Services | Cloud |

### Production Recommendations

| Concern | Recommendation |
|---|---|
| **Frontend Hosting** | Vercel, Netlify, or CDN-backed static hosting |
| **Backend Hosting** | Railway, Render, AWS EC2, or Azure App Service |
| **Database** | MongoDB Atlas M10+ for production workloads |
| **Environment Variables** | Platform-native secrets management |
| **HTTPS** | Mandatory — enforce via reverse proxy (nginx) or platform |
| **Rate Limiting** | Add `express-rate-limit` middleware |
| **Logging** | Structured logging with Winston or Pino |
| **Monitoring** | PM2 process manager with health checks |
| **CI/CD** | GitHub Actions for automated testing and deployment |
| **CORS** | Update origin whitelist to production domain |

### Production Build Steps

```bash
# Frontend
cd frontend
npm run build          # Output: dist/
npm run preview        # Local preview of production build

# Backend
cd backend
NODE_ENV=production node src/server.js
```

---

## 📚 Related Documentation

| Document | Description |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, component diagrams, Mermaid flowcharts, technology decisions |
| [DATABASE_DESIGN.md](./DATABASE_DESIGN.md) | Complete database schema, ER diagrams, field documentation |
| [FEATURE.md](./FEATURE.md) | Full feature catalog — 54 implemented, 17 partial, 4 planned (75 total) |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Step-by-step setup with troubleshooting guide |
| [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md) | Known issues, code quality improvements, security enhancements |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

### Code Style Guidelines

- **ES Modules** — use `import` / `export` (not `require`)
- **Naming** — `camelCase` for variables/functions, `PascalCase` for React components
- **Files** — `.jsx` for React components, `.js` for utilities and backend code
- **Comments** — add JSDoc comments for all exported functions
- **Tests** — write tests for new features using Jest + Supertest
- **Commits** — use descriptive commit messages following conventional commits

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 SK SAHIL UDDIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

**Built with ❤️ by SK SAHIL UDDIN**

[Report Bug](https://github.com/your-username/Shinrai-Bank/issues) · [Request Feature](https://github.com/your-username/Shinrai-Bank/issues)

</div>