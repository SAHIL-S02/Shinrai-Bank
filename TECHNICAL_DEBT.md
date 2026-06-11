# 🚨 Shinrai Bank — Technical Debt Scanner Report

> Auto-generated analysis of the Shinrai Bank codebase. Issues are categorized by priority with actionable remediation steps.
>
> **Scan Date:** June 2026
> **Files Scanned:** 22 source files (backend + frontend)
> **Total Issues Found:** 22

---

## 🔴 High Priority (7 issues)

Issues that cause crashes, security vulnerabilities, or data corruption. **Must fix before production.**

---

### H-001: Real Credentials Committed to Git

**File:** `backend/.env`
**Impact:** Security — credentials are exposed in version control history

The `.env` file contains real production credentials:
- MongoDB Atlas connection string with username and password
- Google OAuth2 client ID, client secret, and refresh token
- Personal Gmail address

**Remediation:**
1. Rotate all credentials immediately (MongoDB password, Google OAuth tokens)
2. Remove from git history: `git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch backend/.env'`
3. Verify `.gitignore` includes `.env` (it does, but file was committed before the rule)
4. Use a `.env.example` template with placeholder values

**Effort:** 1 hour | **Risk if unfixed:** Account takeover, database breach

---

### H-002: Missing `mongoose` Import Causes Runtime Crash

**File:** `backend/src/controllers/auth.controller.js` (Line 336)
**Impact:** Functionality — `sendMoney()` throws `ReferenceError: mongoose is not defined`

`mongoose.startSession()` is called but `mongoose` is never imported. The money transfer feature is completely broken.

**Remediation:**
```javascript
import mongoose from "mongoose";
```

**Effort:** 1 minute | **Risk if unfixed:** Money transfer feature is unusable

---

### H-003: Missing `await` on Async Card Number Generation

**File:** `backend/src/controllers/auth.controller.js` (Line 113)
**Impact:** Data integrity — card numbers stored as `"[object Promise]"` after hashing

```javascript
const cardNumber = generateUniqueCardNumber(); // Returns Promise, not string
```

**Remediation:**
```javascript
const cardNumber = await generateUniqueCardNumber();
```

**Effort:** 1 minute | **Risk if unfixed:** All card numbers are invalid, cards can never be verified

---

### H-004: `useContext()` Called Outside React Component

**File:** `frontend/src/services/api.js` (Line 19)
**Impact:** Runtime — violates React Rules of Hooks, throws error

`useContext(AccessTokenContextInfo)` is called inside `getDashboardData()`, which is a plain async function, not a React component or custom hook.

**Remediation:** Accept `accessToken` as a function parameter instead of reading from context.

**Effort:** 15 minutes | **Risk if unfixed:** Dashboard data loading is broken

---

### H-005: `setSideBar()` Called During Render

**File:** `frontend/src/App.jsx` (Line 24)
**Impact:** Performance — causes infinite re-render loop

State update `setSideBar(currentLocation.slice(1))` is called directly in the component body, triggering a re-render which calls `setSideBar` again, infinitely.

**Remediation:** Wrap in `useEffect`:
```javascript
useEffect(() => { setSideBar(currentLocation.slice(1)); }, [currentLocation]);
```

**Effort:** 5 minutes | **Risk if unfixed:** Application hangs/crashes on navigation

---

### H-006: Missing `axios` Import in AccessTokenContext

**File:** `frontend/src/contexts/AccessTokenContext.jsx`
**Impact:** Runtime — `ReferenceError: axios is not defined`

The `refresh()` function calls `axios.get()` but `axios` is never imported.

**Remediation:**
```javascript
import axios from "axios";
```

**Effort:** 1 minute | **Risk if unfixed:** Token refresh fails, users can't stay logged in

---

### H-007: No Input Validation or Sanitization

**Files:** All controller methods in `auth.controller.js`
**Impact:** Security — NoSQL injection, parameter pollution

No validation middleware (like `express-validator`, `joi`, or `zod`) is used. User input is passed directly to Mongoose queries without sanitization.

**Remediation:**
1. Install `express-validator` or `zod`
2. Add validation schemas for each endpoint
3. Add a validation middleware to the route definitions

**Effort:** 4 hours | **Risk if unfixed:** NoSQL injection attacks, data corruption

---

## 🟡 Medium Priority (8 issues)

Issues affecting code quality, maintainability, or causing subtle bugs. **Should fix soon.**

---

### M-001: Inconsistent Transaction Session Usage

**File:** `backend/src/controllers/auth.controller.js` (Lines 465-469)
**Impact:** Data integrity — partial writes possible in phone-number transfer path

The account-number branch uses `transactionModel.create([...], {session})` but the phone-number branch uses `transactionModel.create({...})` without the session. If the subsequent `user.save()` fails, the transaction record persists while balances aren't updated.

**Remediation:** Use `[{...}], {session}` syntax in both branches.

**Effort:** 5 minutes

---

### M-002: No Authentication Middleware

**Files:** `auth.route.js`, `auth.controller.js`
**Impact:** Maintainability — duplicated auth logic in every controller

Token verification is copy-pasted across `getDashboardData()` and `sendMoney()`. Adding more protected endpoints means more duplication.

**Remediation:** Create `middleware/auth.middleware.js` and apply to routes:
```javascript
authRouter.get("/get-data", authenticate, authController.getDashboardData);
authRouter.post("/send-money", authenticate, authController.sendMoney);
```

**Effort:** 1 hour

---

### M-003: No Error Handling Middleware

**File:** `backend/src/app.js`
**Impact:** Reliability — unhandled errors crash the server

Express has no global error handler. Unhandled rejections in async route handlers will crash Node.js.

**Remediation:** Add an error handling middleware:
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message });
});
```

**Effort:** 30 minutes

---

### M-004: Invalid Model References

**Files:** `transaction.model.js` (ref: `'user1'`, `'user2'`), `session.model.js` (ref: `'user'`)
**Impact:** Functionality — `populate()` calls will fail silently

The `ref` values don't match the registered model name `"Users"`. Any future `.populate('user1')` or `.populate('user')` will return `null`.

**Remediation:** Change all refs to `"Users"`.

**Effort:** 5 minutes

---

### M-005: `getDashboardData` Frontend Calls Wrong Endpoint

**File:** `frontend/src/services/api.js` (Line 20)
**Impact:** Functionality — dashboard data request hits login endpoint

```javascript
axios.get(`${config.BACKEND_PORT}/login`, ...)  // Should be /get-data
```

**Remediation:** Change to `/get-data`.

**Effort:** 1 minute

---

### M-006: OTP Expiry Check Commented Out

**File:** `backend/src/controllers/auth.controller.js` (Lines 280-286)
**Impact:** Security — race condition with TTL cleanup

While MongoDB's TTL index handles deletion, there's a window where an expired-but-not-yet-deleted OTP could be accepted.

**Remediation:** Uncomment and fix the expiry check:
```javascript
if (Date.now() - otpData.createdAt.getTime() > 10 * 60 * 1000) {
    return res.status(410).json({ success: false, message: "OTP is expired" });
}
```

**Effort:** 5 minutes

---

### M-007: No Logout Endpoint

**Files:** `auth.route.js`, `auth.controller.js`
**Impact:** Security — sessions cannot be revoked

There's no logout endpoint to revoke refresh tokens. Users cannot sign out — their sessions remain active for 7 days.

**Remediation:** Add a `POST /api/auth/logout` endpoint that:
1. Reads the refresh token from cookies
2. Sets `session.revoked = true` in the database
3. Clears the refresh token cookie

**Effort:** 30 minutes

---

### M-008: Morgan Called Without Format String

**File:** `backend/src/app.js` (Line 7)
**Impact:** Reliability — may throw or produce unexpected output

```javascript
app.use(morgan()); // Missing format argument
```

**Remediation:** `app.use(morgan("dev"));`

**Effort:** 1 minute

---

## 🟢 Low Priority (7 issues)

Code style, maintainability, and cosmetic issues. **Fix when convenient.**

---

### L-001: Typo "Reciver" Used Throughout

**File:** `auth.controller.js` — 8+ occurrences
**Impact:** Readability

Variables `reciverPhoneNumber`, `reciverAccountNumber`, and log messages all use "Reciver" instead of "Receiver".

**Effort:** 10 minutes (find & replace)

---

### L-002: Unused `express` Import in `server.js`

**File:** `backend/src/server.js` (Line 1)
**Impact:** Code cleanliness

`import express from "express"` is never used.

**Effort:** 1 minute

---

### L-003: Mixed Line Endings (CRLF/LF)

**Files:** `transaction.model.js`, `api.js`, `AccessTokenContext.jsx` use CRLF; others use LF
**Impact:** Git diffs, cross-platform consistency

**Remediation:** Add `.editorconfig` and configure git: `git config core.autocrlf true`

**Effort:** 10 minutes

---

### L-004: No JSDoc Comments

**Files:** All source files
**Impact:** Developer experience — no IDE hints for function signatures

None of the exported functions have JSDoc documentation. This makes the API harder to understand without reading the full implementation.

**Effort:** 2 hours

---

### L-005: Unused `supabaseClient.js`

**File:** `frontend/src/services/supabaseClient.js`
**Impact:** Confusion — imports a package with unconfigured env vars

The Supabase client is initialized with `undefined` URL and key. Either configure it or remove it until needed.

**Effort:** 1 minute

---

### L-006: Hardcoded Sender Name in Email Service

**File:** `backend/src/services/email.service.js` (Line 41)
**Impact:** Branding — emails say "SK SAHIL UDDIN" instead of "Shinrai Bank"

**Remediation:** Change to `"Shinrai Bank"` or make configurable via environment variable.

**Effort:** 1 minute

---

### L-007: No `.env.example` Template

**Files:** Project root
**Impact:** Onboarding — new developers don't know required env vars

**Remediation:** Create `backend/.env.example` and `frontend/.env.example` with placeholder values and comments.

**Effort:** 15 minutes

---

## Summary Dashboard

```
┌─────────────────────────────────────────────────────┐
│           TECHNICAL DEBT SUMMARY                    │
├──────────────┬──────┬───────────────────────────────┤
│ Priority     │Count │ Estimated Effort              │
├──────────────┼──────┼───────────────────────────────┤
│ 🔴 High      │  7   │ ~5.5 hours                    │
│ 🟡 Medium    │  8   │ ~3 hours                      │
│ 🟢 Low       │  7   │ ~2.5 hours                    │
├──────────────┼──────┼───────────────────────────────┤
│ TOTAL        │  22  │ ~11 hours                     │
└──────────────┴──────┴───────────────────────────────┘
```

### Recommended Fix Order

1. **H-001** — Rotate exposed credentials (URGENT)
2. **H-002** — Add mongoose import (1 min fix, unblocks money transfers)
3. **H-003** — Add `await` to card generation (1 min fix)
4. **H-006** — Add axios import to AccessTokenContext (1 min fix)
5. **H-005** — Fix setSideBar render loop (5 min fix)
6. **H-004** — Fix useContext in api.js (15 min)
7. **M-001** — Fix transaction session consistency (5 min)
8. **M-004** — Fix model references (5 min)
9. **M-005** — Fix dashboard API endpoint (1 min)
10. **M-008** — Fix morgan format (1 min)
11. **M-002** — Create auth middleware (1 hr)
12. **M-003** — Create error handler (30 min)
13. **H-007** — Add input validation (4 hrs)
14. Remaining medium and low priority items
