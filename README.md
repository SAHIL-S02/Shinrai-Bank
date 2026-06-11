# 🏦 Shinrai Bank — Secure Digital Banking Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-green.svg)
![React](https://img.shields.io/badge/frontend-React%2019-61DAFB.svg)
![Express](https://img.shields.io/badge/backend-Express%205-000000.svg)

**A full-stack banking application featuring secure authentication, OTP verification, account management, and real-time money transfers with transaction safety.**

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Authentication & Security
- **User Registration** with email OTP verification
- **Secure Login** with JWT access + refresh token rotation
- **Session Management** with IP/User-Agent tracking
- **Password Hashing** using bcrypt (10 salt rounds)
- **Aadhar & Card Number Hashing** using SHA-256
- **Luhn-valid Card Number Generation** for debit/credit cards
- **HTTP-only Secure Cookies** for refresh tokens
- **CORS Protection** with origin whitelisting
- **Google reCAPTCHA** integration (frontend)

### Banking Operations
- **Dashboard** with account overview and balance display
- **Money Transfers** with atomic MongoDB transactions
- **Daily & Monthly Transfer Limits** with automatic resets
- **Transaction History** tracking between users
- **Multi-Account Types** — Savings, Current, Salary, Fixed Deposit
- **Card Services** — Debit/Credit card management
- **KYC Verification** workflow

### User Interface
- **Modern React 19** SPA with Vite build system
- **Responsive Design** with Tailwind CSS + shadcn/ui components
- **Motion Animations** using Framer Motion
- **Icon Libraries** — Lucide React, Tabler Icons, Font Awesome
- **QR Code Generation** for account sharing
- **Sidebar Navigation** with context-aware routing

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui | Component library |
| React Router 7 | Client-side routing |
| Axios | HTTP client |
| Motion (Framer) | Animations |
| Lucide / Tabler / FA | Icon libraries |
| react-qr-code | QR code generation |
| react-google-recaptcha | Bot protection |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 16+ | Runtime |
| Express 5 | HTTP framework |
| MongoDB Atlas | Cloud database |
| Mongoose 9 | ODM / Schema modeling |
| JWT (jsonwebtoken) | Token-based auth |
| bcrypt | Password hashing |
| Nodemailer | Email delivery (Gmail OAuth2) |
| Morgan | HTTP request logging |
| cookie-parser | Cookie handling |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                   │
│  React 19 + Vite + Tailwind + shadcn/ui                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Home   │ │  Login   │ │Dashboard │ │ Transfer │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│            │           Axios HTTP Client                │
└────────────┼────────────────────────────────────────────┘
             │ REST API (JSON)
┌────────────┼────────────────────────────────────────────┐
│            ▼         BACKEND (Express 5)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Routes    │→ │ Controllers  │→ │   Services   │  │
│  │  /api/auth/* │  │  auth.ctrl   │  │ email.svc    │  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  │
│                           │                             │
│                    ┌──────┴───────┐                     │
│                    │   Models     │                     │
│                    │ User/OTP/Txn │                     │
│                    └──────┬───────┘                     │
└───────────────────────────┼─────────────────────────────┘
                            │ Mongoose
                    ┌───────┴────────┐
                    │ MongoDB Atlas  │
                    │  (Cloud DB)    │
                    └────────────────┘
```

> For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher — [Download](https://nodejs.org/)
- **npm** v8+ (bundled with Node.js)
- **MongoDB Atlas** account — [Sign up](https://www.mongodb.com/atlas)
- **Google Cloud Console** account with Gmail API enabled — [Console](https://console.cloud.google.com/)
- **Git** — [Download](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Shinrai-Bank.git
   cd Shinrai-Bank
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables** (see section below).

5. **Start both servers** (see [Running the Application](#-running-the-application)).

### Environment Variables

#### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
BACKEND_PORT=3000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>

# JWT Secret Key (generate a strong random string)
JWT_URI=your-256-bit-secret-key-here

# Google OAuth2 (for email delivery via Gmail)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
GOOGLE_REFRESH_TOKEN=1//your-refresh-token
GOOGLE_EMAIL_USER=your-email@gmail.com
```

| Variable | Required | Description |
|---|---|---|
| `BACKEND_PORT` | Yes | Port for Express server (default: `3000`) |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_URI` | Yes | Secret key for signing JWTs |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth2 client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth2 client secret |
| `GOOGLE_REFRESH_TOKEN` | Yes | Gmail API refresh token |
| `GOOGLE_EMAIL_USER` | Yes | Gmail address for sending emails |

#### Frontend (`frontend/.env`)

```env
VITE_BACKEND_PORT=http://localhost:3000/api/auth
```

| Variable | Required | Description |
|---|---|---|
| `VITE_BACKEND_PORT` | Yes | Backend API base URL |

> ⚠️ **Security:** Never commit `.env` files. They are listed in `.gitignore`.

### Database Setup

1. **Create a MongoDB Atlas cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free-tier (M0) cluster
   - Create a database user with read/write access

2. **Whitelist your IP:**
   - Navigate to Network Access → Add IP Address
   - Add `0.0.0.0/0` for development (restrict in production)

3. **Get connection string:**
   - Click Connect → Connect your application
   - Copy the URI and replace `<password>` with your database user password

4. **Collections** (auto-created by Mongoose on first use):
   - `users` — User accounts and banking details
   - `otps` — Email verification OTPs (TTL: 10 minutes)
   - `sessions` — JWT refresh token sessions
   - `transactions` — Money transfer records

> For detailed setup with troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Backend runs at `http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at `http://localhost:5173`

### Verify Startup

Look for these success messages in the backend console:
```
✅ Database connected successfully
✅ Email server is ready to send messages
✅ Server is running at port 3000 .....
```

### Production Build

```bash
cd frontend
npm run build
npm run preview
```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/auth/`.

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user account | No |
| `POST` | `/verify` | Verify email with OTP code | No |
| `POST` | `/login` | Authenticate user and get tokens | No |
| `GET` | `/refresh-token` | Refresh expired access token | Cookie |
| `GET` | `/get-data` | Get dashboard user data | Bearer Token |
| `POST` | `/send-money` | Transfer money to another user | Bearer Token |

> For complete API documentation with request/response schemas, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

---

## 📁 Project Structure

```
Shinrai-Bank/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js            # Environment config loader
│   │   │   └── database.config.js   # MongoDB connection
│   │   ├── controllers/
│   │   │   └── auth.controller.js   # Auth & banking logic
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema (accounts, cards, KYC)
│   │   │   ├── otp.model.js         # OTP schema (TTL indexed)
│   │   │   ├── session.model.js     # Session schema (refresh tokens)
│   │   │   └── transaction.model.js # Transaction schema
│   │   ├── routes/
│   │   │   └── auth.route.js        # API route definitions
│   │   ├── services/
│   │   │   └── email.service.js     # Gmail OAuth2 email sender
│   │   ├── utils/
│   │   │   └── otp.util.js          # OTP generation utilities
│   │   ├── app.js                   # Express app setup
│   │   └── server.js                # Server entry point
│   ├── .env                         # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── SideBar.jsx          # Dashboard sidebar
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login form
│   │   │   ├── CreateAccount.jsx    # Registration form
│   │   │   ├── OtpVerification.jsx  # OTP input screen
│   │   │   ├── Dashboard.jsx        # Account dashboard
│   │   │   ├── Application.jsx      # Service applications
│   │   │   └── ...                  # Other service pages
│   │   ├── contexts/
│   │   │   ├── AccessTokenContext.jsx  # JWT state management
│   │   │   ├── SideBarContext.jsx      # Sidebar state
│   │   │   └── UserTempContext.jsx     # Temp user data
│   │   ├── services/
│   │   │   ├── api.js               # API client functions
│   │   │   └── supabaseClient.js    # Supabase client (future)
│   │   ├── config/
│   │   ├── App.jsx                  # Root app with routing
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Frontend env vars
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── package.json
├── design/                          # UI design assets
├── .github/                         # GitHub workflows
├── SETUP_GUIDE.md                   # Detailed setup guide
├── API_DOCUMENTATION.md             # API reference
├── ARCHITECTURE.md                  # Architecture documentation
├── DATABASE_DESIGN.md               # Database schema design
├── TECHNICAL_DEBT.md                # Known issues & debt
├── DIFF_REVIEW.md                   # Code review report
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

### Code Style Guidelines
- Use ES Modules (`import`/`export`)
- Follow existing naming conventions (camelCase for variables, PascalCase for components)
- Add JSDoc comments for all exported functions
- Write tests for new features

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by the Shinrai Bank Team**

[Report Bug](https://github.com/your-username/Shinrai-Bank/issues) · [Request Feature](https://github.com/your-username/Shinrai-Bank/issues)

</div>