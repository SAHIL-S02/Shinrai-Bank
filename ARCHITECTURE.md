# 🏗 Shinrai Bank — Architecture Documentation

## Table of Contents

- [System Overview](#system-overview)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design)
- [Authentication & Security Flow](#authentication--security-flow)
- [AI Integration Flow](#ai-integration-flow)
- [Key User Journeys](#key-user-journeys)

---

## System Overview

Shinrai Bank follows a **client-server architecture** with a clear separation between the presentation layer (React SPA) and the business logic layer (Express REST API), connected via HTTP/JSON.

### High-Level System Diagram

```mermaid
graph TB
    subgraph Client["🖥 Client Layer"]
        Browser["Browser (SPA)"]
        React["React 19 + Vite"]
        Router["React Router v7"]
        Context["Context API (State)"]
        Axios["Axios HTTP Client"]
    end

    subgraph Server["⚙️ Server Layer"]
        Express["Express 5"]
        Morgan["Morgan (Logging)"]
        CORS["CORS Middleware"]
        CookieParser["Cookie Parser"]
        Routes["Route Layer"]
        Controllers["Controller Layer"]
        Services["Service Layer"]
    end

    subgraph Data["🗄 Data Layer"]
        Mongoose["Mongoose ODM"]
        MongoDB["MongoDB Atlas"]
        Collections["Collections: Users, OTPs, Sessions, Transactions"]
    end

    subgraph External["🌐 External Services"]
        Gmail["Gmail API (OAuth2)"]
        Supabase["Supabase (Future)"]
        reCAPTCHA["Google reCAPTCHA"]
    end

    Browser --> React
    React --> Router
    React --> Context
    React --> Axios
    Axios -->|"REST API (JSON)"| Express
    Express --> Morgan
    Express --> CORS
    Express --> CookieParser
    Express --> Routes
    Routes --> Controllers
    Controllers --> Services
    Controllers --> Mongoose
    Services -->|"SMTP/OAuth2"| Gmail
    Mongoose --> MongoDB
    MongoDB --> Collections
    Browser -->|"Bot Protection"| reCAPTCHA
```

### Technology Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Frontend Framework | React 19 | Latest stable with concurrent features |
| Build Tool | Vite 8 | Fast HMR, native ESM support |
| CSS Framework | Tailwind CSS 3 | Utility-first, shadcn/ui compatibility |
| Component Library | shadcn/ui | Customizable, accessible, React-native |
| Backend Framework | Express 5 | Mature, async route handler support |
| Database | MongoDB Atlas | Flexible schema for banking, cloud-hosted |
| ODM | Mongoose 9 | Schema validation, middleware, population |
| Auth | JWT (access + refresh) | Stateless auth with session tracking |
| Email | Nodemailer + Gmail OAuth2 | Free, reliable for transactional emails |

---

## Frontend Architecture

### Component Hierarchy

```mermaid
graph TD
    Main["main.jsx"]
    Main --> BrowserRouter["BrowserRouter"]
    BrowserRouter --> Providers["Context Providers"]
    Providers --> AccessToken["AccessTokenContext"]
    Providers --> SideBar["SideBarContext"]
    Providers --> UserTemp["UserTempContext"]
    AccessToken --> App["App.jsx"]

    App --> Navbar["Navbar (conditional)"]
    App --> RouterOutlet["Routes"]
    App --> Footer["Footer (conditional)"]

    RouterOutlet --> Home["/ → Home"]
    RouterOutlet --> Login["/login → Login"]
    RouterOutlet --> Create["/create-account → CreateAccount"]
    RouterOutlet --> OTP["/otp → OtpVerification"]
    RouterOutlet --> Dash["/dashboard → Dashboard"]
    RouterOutlet --> AppPage["/application → Application"]
    RouterOutlet --> AccMgmt["/account-management"]
    RouterOutlet --> KYC["/kyc-identity"]
    RouterOutlet --> Cards["/card-services"]
    RouterOutlet --> Loans["/loan-credit-services"]
    RouterOutlet --> Contact["/contact-update"]
    RouterOutlet --> Cheque["/cheque-services"]
    RouterOutlet --> IB["/internet-banking"]

    Dash --> SideBarComp["SideBar"]
    Dash --> DashContent["Dashboard Content"]
```

### State Management Strategy

The application uses React's **Context API** for global state — no external state management library.

| Context | Location | Purpose | Consumed By |
|---|---|---|---|
| `AccessTokenContext` | `contexts/AccessTokenContext.jsx` | Stores JWT access token; auto-refreshes on mount | Dashboard, API calls |
| `SideBarContext` | `contexts/SideBarContext.jsx` | Tracks current sidebar selection based on URL path | Sidebar, App |
| `UserTempContext` | `contexts/UserTempContext.jsx` | Holds temporary user data during registration flow | CreateAccount → OTP |

### Routing Architecture

```
/ ─────────────────── Home (public, with Navbar + Footer)
/login ────────────── Login (standalone, no Navbar/Footer)
/create-account ───── CreateAccount (standalone)
/otp ──────────────── OtpVerification (standalone)
/dashboard ────────── Dashboard (with Navbar + Footer + Sidebar)
/application ──────── Application (with Navbar + Footer)
/account-management ─ AccountManagement (with Navbar + Footer)
/kyc-identity ─────── KYC (with Navbar + Footer)
/card-services ────── CardServices (with Navbar + Footer)
/loan-credit-services LoanServices (with Navbar + Footer)
/contact-update ───── ContactServices (with Navbar + Footer)
/cheque-services ──── ChequeServices (with Navbar + Footer)
/internet-banking ─── InternetBanking (with Navbar + Footer)
```

**Layout Rules:**
- Routes `/create-account`, `/login`, and `/otp` hide the Navbar and Footer
- All other routes display the full layout with Navbar + Footer
- Dashboard includes an additional Sidebar component

### Services Layer

| File | Functions | Description |
|---|---|---|
| `services/api.js` | `registerUser()`, `verifyUser()`, `loginUser()`, `getDashboardData()` | Axios-based API client wrapping all backend calls |
| `services/supabaseClient.js` | `supabase` client instance | Supabase integration (future use — file upload, realtime) |

### Styling Architecture

```
Tailwind CSS 3 (utility classes)
    └── shadcn/ui (component primitives via class-variance-authority)
        └── tw-animate-css (animation utilities)
            └── Motion (Framer Motion for complex animations)
```

- **Base styles** in `index.css` (CSS custom properties for shadcn/ui theming)
- **Component styles** in `App.css` (minimal, mostly utility-based)
- **Tailwind config** extends default theme with custom fonts (Inter variable)
- **Class merging** via `clsx` + `tailwind-merge` (in `lib/utils.js`)

---

## Backend Architecture

### Layer Architecture

```mermaid
graph LR
    subgraph Entry["Entry Point"]
        Server["server.js"]
        AppSetup["app.js"]
    end

    subgraph Middleware["Middleware Stack"]
        M1["morgan() — HTTP Logging"]
        M2["express.json() — Body Parser"]
        M3["cors() — Cross-Origin"]
        M4["cookieParser() — Cookie Handling"]
    end

    subgraph Routing["Route Layer"]
        AuthRoutes["auth.route.js"]
    end

    subgraph Business["Controller Layer"]
        Register["register()"]
        Login["login()"]
        Verify["verify()"]
        Refresh["refreshToken()"]
        GetData["getDashboardData()"]
        SendMoney["sendMoney()"]
    end

    subgraph DataAccess["Model Layer (Mongoose)"]
        UserModel["user.model.js"]
        OTPModel["otp.model.js"]
        SessionModel["session.model.js"]
        TxnModel["transaction.model.js"]
    end

    subgraph ServiceLayer["Service Layer"]
        EmailSvc["email.service.js"]
        OTPUtil["otp.util.js"]
    end

    Server --> AppSetup
    AppSetup --> M1 --> M2 --> M3 --> M4
    M4 --> AuthRoutes
    AuthRoutes --> Register
    AuthRoutes --> Login
    AuthRoutes --> Verify
    AuthRoutes --> Refresh
    AuthRoutes --> GetData
    AuthRoutes --> SendMoney
    Register --> UserModel
    Register --> OTPModel
    Register --> EmailSvc
    Register --> OTPUtil
    Login --> UserModel
    Login --> SessionModel
    Verify --> OTPModel
    Verify --> UserModel
    Refresh --> SessionModel
    GetData --> UserModel
    SendMoney --> UserModel
    SendMoney --> TxnModel
```

### Request Pipeline

```
HTTP Request
  │
  ├── morgan()          →  Log request method, URL, status, timing
  ├── express.json()    →  Parse JSON body into req.body
  ├── cors()            →  Validate origin (http://localhost:5173)
  ├── cookieParser()    →  Parse cookies into req.cookies
  │
  ├── Router Matching   →  /api/auth/* → authRouter
  │
  ├── Controller        →  Business logic execution
  │   ├── Input validation (manual checks)
  │   ├── Database operations (Mongoose)
  │   ├── External service calls (Email)
  │   └── JWT operations (sign/verify)
  │
  └── Response          →  JSON { success, message, data? }
```

### Configuration Management

```mermaid
graph LR
    ENV[".env file"] -->|"dotenv.config()"| Config["config.js"]
    Config --> Server["server.js (PORT)"]
    Config --> DB["database.config.js (MONGODB_URI)"]
    Config --> Auth["auth.controller.js (JWT_URI)"]
    Config --> Email["email.service.js (Google OAuth2)"]
```

All environment variables are loaded once via `dotenv` and exported as a frozen config object.

---

## Database Design

### Collections Overview

```mermaid
erDiagram
    USERS ||--o{ OTPS : "has pending"
    USERS ||--o{ SESSIONS : "has active"
    USERS ||--o{ TRANSACTIONS : "sends (user1)"
    USERS ||--o{ TRANSACTIONS : "receives (user2)"

    USERS {
        ObjectId _id PK
        String name
        String nickName
        String email UK
        Number phoneNumber UK
        String aadharNumber UK "SHA-256 hashed"
        Date dob
        String password "bcrypt hashed"
        Number accountNumber
        String accountType "SAVINGS|CURRENT|SALARY|FIXED_DEPOSIT"
        String cardNumber "SHA-256 hashed"
        String cardCVV "SHA-256 hashed"
        String cardType "DEBIT|CREDIT"
        Date cardValid "default: now + 5 years"
        String status "ACTIVE|FROZEN|CLOSED|SUSPENDED"
        Number bankBalance "default: 10000"
        Number dailyTransferLimit "default: 100000"
        Number dailyTransferredAmount
        Number monthlyTransferLimit "default: 1000000"
        Number monthlyTransferredAmount
        String currency "default: INR"
        String branchCode
        String ifscCode "default: SHIN02042007"
        Boolean kycVerified
        Number interestRate
        Object nominee "name, relation, phone"
        Boolean verified
        Date createdAt
        Date updatedAt
    }

    OTPS {
        ObjectId _id PK
        ObjectId user FK
        String email
        String otp "SHA-256 hashed"
        Date createdAt "TTL: 600s"
    }

    SESSIONS {
        ObjectId _id PK
        ObjectId user FK
        String refreshToken "SHA-256 hashed"
        String ip
        String userAgent
        Boolean revoked "default: false"
        Date createdAt
        Date updatedAt
    }

    TRANSACTIONS {
        ObjectId _id PK
        ObjectId user1 FK "sender"
        ObjectId user2 FK "receiver"
        Number amount
        Date createdAt
        Date updatedAt
    }
```

### Design Decisions

| Decision | Rationale |
|---|---|
| SHA-256 for card/Aadhar numbers | One-way hashing — these are identifiers, not secrets to decrypt |
| bcrypt for passwords | Industry standard, salt + work factor prevent rainbow tables |
| TTL index on OTPs (600s) | MongoDB auto-deletes expired OTPs, no cleanup cron needed |
| Session tracking with IP/UA | Enables suspicious login detection and session management |
| Atomic transactions for transfers | MongoDB sessions ensure consistency — both accounts update or neither |
| Phone number as account number | Simplified account lookup (used as both phone and account ID) |

> For the complete database design including proposed new collections, see [DATABASE_DESIGN.md](./DATABASE_DESIGN.md).

---

## Authentication & Security Flow

### Registration Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (React)
    participant B as Backend (Express)
    participant DB as MongoDB
    participant E as Gmail API

    U->>F: Fill registration form
    F->>B: POST /api/auth/register
    B->>B: Validate fields
    B->>DB: Check if user exists (email/aadhar)
    DB-->>B: Not found
    B->>B: Hash password (bcrypt)
    B->>B: Hash aadhar (SHA-256)
    B->>B: Generate Luhn card number
    B->>B: Hash card number + CVV
    B->>B: Generate 6-digit OTP
    B->>DB: Create user document
    B->>DB: Create OTP document (TTL: 10min)
    B->>E: Send OTP email
    E-->>U: Email with OTP received
    B-->>F: 201 { success, user }
    F->>U: Redirect to /otp page
    U->>F: Enter OTP
    F->>B: POST /api/auth/verify
    B->>DB: Find OTP by email + hashed OTP
    B->>DB: Set user.verified = true
    B-->>F: 200 { success: true }
    F->>U: Redirect to /login
```

### Login & Token Lifecycle

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB

    U->>F: Enter email + password
    F->>B: POST /api/auth/login
    B->>DB: Find user by email + accountType
    B->>B: bcrypt.compare(password)
    B->>B: Check user.verified === true
    B->>B: Sign refresh token (7d expiry)
    B->>B: Hash refresh token (SHA-256)
    B->>DB: Create session record
    B->>B: Sign access token (15m expiry)
    B-->>F: Set refreshToken cookie (httpOnly)
    B-->>F: 200 { accessToken }
    F->>F: Store accessToken in Context

    Note over F,B: Access Token Expired (after 15min)

    F->>B: GET /api/auth/refresh-token (cookie)
    B->>B: Verify refresh token JWT
    B->>B: Hash and lookup session
    B->>B: Sign new access + refresh tokens
    B->>DB: Update session with new hash
    B-->>F: Set new refreshToken cookie
    B-->>F: 200 { newAccessToken }
```

### Token Architecture

```
┌─────────────────────────────────────────┐
│              Access Token               │
│  • Stored in: React Context (memory)    │
│  • Lifetime: 15 minutes                 │
│  • Payload: { id: user._id }            │
│  • Sent via: Authorization header       │
│  • Purpose: API request authentication  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             Refresh Token               │
│  • Stored in: HTTP-only cookie          │
│  • Lifetime: 7 days                     │
│  • Payload: { id: user._id }            │
│  • Sent via: Cookie (automatic)         │
│  • DB record: SHA-256 hash in Sessions  │
│  • Purpose: Rotate access tokens        │
│  • Rotation: New refresh token per use  │
└─────────────────────────────────────────┘
```

---

## AI Integration Flow

> **Note:** AI integration is a planned future feature. The architecture below shows the proposed design for integrating AI-powered code review, documentation generation, and chat capabilities.

### Proposed Architecture

```mermaid
graph TB
    subgraph UserInterface["Frontend"]
        Chat["Chat Interface"]
        Review["Code Review Panel"]
        DocGen["Doc Generator UI"]
    end

    subgraph APIGateway["Backend API"]
        ChatAPI["/api/ai/chat"]
        ReviewAPI["/api/ai/review"]
        DocAPI["/api/ai/generate-docs"]
    end

    subgraph AILayer["AI Service Layer"]
        Router["AI Provider Router"]
        OpenAI["OpenAI Adapter"]
        Gemini["Gemini Adapter"]
        Claude["Claude Adapter"]
    end

    subgraph Storage["Data Storage"]
        ChatSessions["Chat Sessions Collection"]
        Messages["Messages Collection"]
        Reviews["Reviews Collection"]
        AIProviders["AI Providers Config"]
    end

    Chat --> ChatAPI
    Review --> ReviewAPI
    DocGen --> DocAPI

    ChatAPI --> Router
    ReviewAPI --> Router
    DocAPI --> Router

    Router --> OpenAI
    Router --> Gemini
    Router --> Claude

    ChatAPI --> ChatSessions
    ChatAPI --> Messages
    ReviewAPI --> Reviews
    Router --> AIProviders
```

### Provider Abstraction

The AI layer uses a **strategy pattern** to abstract provider-specific implementations:

```javascript
// Planned interface
class AIProvider {
    async chat(messages, options) { }
    async reviewCode(code, language) { }
    async generateDocs(code, type) { }
}
```

Each provider (OpenAI, Gemini, Claude) implements this interface, allowing runtime switching based on the `AIProviders` configuration collection.

---

## Key User Journeys

### Money Transfer Flow

```mermaid
sequenceDiagram
    participant S as Sender
    participant B as Backend
    participant DB as MongoDB

    S->>B: POST /api/auth/send-money
    B->>B: Verify access token
    B->>DB: Find sender by token ID

    B->>B: Validate amount > 0
    B->>B: Check not self-transfer

    Note over B: Reset Limits if Needed
    B->>B: Check daily limit reset (date changed?)
    B->>B: Check monthly limit reset (month changed?)

    B->>B: Verify daily limit not exceeded
    B->>B: Verify monthly limit not exceeded
    B->>B: Verify sufficient balance

    Note over B,DB: MongoDB Transaction Session
    B->>DB: START TRANSACTION
    B->>DB: Find receiver (by account# or phone#)
    B->>DB: sender.balance -= amount
    B->>DB: receiver.balance += amount
    B->>DB: Update sender transfer totals
    B->>DB: Create transaction record
    B->>DB: COMMIT TRANSACTION
    B-->>S: 200 { success, message }

    Note over B,DB: On any error → ABORT TRANSACTION
```

---

## Deployment Considerations

### Current Setup (Development)
- Frontend: Vite dev server on `localhost:5173`
- Backend: Nodemon on `localhost:3000`
- Database: MongoDB Atlas (cloud)
- Email: Gmail OAuth2

### Production Recommendations

| Concern | Recommendation |
|---|---|
| Frontend Hosting | Vercel, Netlify, or CDN-backed static hosting |
| Backend Hosting | Railway, Render, AWS EC2, or Heroku |
| Database | MongoDB Atlas (M10+ for production) |
| Environment Variables | Platform-native secrets management |
| HTTPS | Mandatory — enforce via reverse proxy (nginx) |
| Rate Limiting | Add `express-rate-limit` middleware |
| Logging | Structured logging with Winston or Pino |
| Monitoring | PM2 process manager with health checks |
| CI/CD | GitHub Actions for automated testing and deployment |
