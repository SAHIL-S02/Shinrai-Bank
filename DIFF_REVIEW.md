# 🔍 Shinrai Bank — Code Review Report (Diff Review)

> This document is a file-by-file review of the entire Shinrai Bank codebase, analyzing code quality, security, correctness, and best practices. Issues are rated by severity.
>
> **Legend:** 🔴 Critical (must fix) · 🟡 Warning (should fix) · 🟢 Suggestion (nice to have)

---

## Backend Review

### `backend/src/server.js`

**Lines reviewed:** 8 | **Issues found:** 1

🟢 **Unused import**
```diff
-import express from "express";
 import app from "./app.js";
 import config from "./config/config.js";
```
`express` is imported but never used — `app` is already the Express instance.

---

### `backend/src/app.js`

**Lines reviewed:** 16 | **Issues found:** 2

🟡 **`morgan()` called without format argument**
```diff
-app.use(morgan());
+app.use(morgan("dev"));
```
`morgan()` without a format string will throw a deprecation warning or error depending on the version. Use `"dev"`, `"combined"`, or `"short"`.

🟢 **CORS origin is hardcoded**
```diff
-origin: "http://localhost:5173",
+origin: process.env.CORS_ORIGIN || "http://localhost:5173",
```
The CORS origin should be configurable via environment variables for production deployment.

---

### `backend/src/config/config.js`

**Lines reviewed:** 16 | **Issues found:** 1

🟡 **Misleading variable name `JWT_URI`**
```diff
-JWT_URI: process.env.JWT_URI,
+JWT_SECRET: process.env.JWT_SECRET,
```
This is a secret key, not a URI. The name `JWT_URI` is misleading and confusing for new developers.

---

### `backend/src/config/database.config.js`

**Lines reviewed:** 16 | **Issues found:** 0

✅ **Clean implementation.** Error handling differentiates between dev and production correctly. Production exits the process on failure, while development continues for debugging.

---

### `backend/src/controllers/auth.controller.js`

**Lines reviewed:** 492 | **Issues found:** 14

This is the largest and most critical file in the backend. It handles all authentication and banking logic.

#### 🔴 Critical Issues

🔴 **Missing `mongoose` import in `sendMoney()` — will crash at runtime** (Line 336)
```diff
+import mongoose from "mongoose";
 import crypto from "crypto";
 import userModel from "../models/user.model.js";
```
`sendMoney()` calls `mongoose.startSession()` but `mongoose` is never imported. This function will throw a `ReferenceError` whenever called.

🔴 **Unused import `{ access } from "fs"` — potential name collision** (Line 9)
```diff
-import { access } from "fs";
```
This import serves no purpose and could cause confusion. The `access` variable shadows any potential future use.

🔴 **Phone-number branch of `sendMoney()` doesn't use session for `transactionModel.create()`** (Lines 465-469)
```diff
-const debit = await transactionModel.create({
+const debit = await transactionModel.create([{
     user1:user._id,
     amount:transferAmount,
     user2:reciver._id,
-})
+}], {session})
```
The account-number branch correctly passes `{session}` to `transactionModel.create()`, but the phone-number branch does not. This means the transaction record is not part of the atomic session — if the save fails after the transaction is created, data will be inconsistent.

🔴 **No input sanitization** — NoSQL injection risk
None of the controller methods validate or sanitize user input before passing it to Mongoose queries. While Mongoose provides some protection, direct object injection via `req.body` is possible:
```javascript
// An attacker could send: { "email": { "$gt": "" } }
const user = await userModel.findOne({email}); // matches all users
```

**Recommendation:** Add a validation middleware (e.g., `express-validator` or `joi`).

🔴 **No rate limiting on authentication endpoints**
The `/register`, `/login`, and `/verify` endpoints have no rate limiting, making them vulnerable to:
- Brute force password attacks
- OTP flooding (unlimited email sends)
- Registration spam

#### 🟡 Warning Issues

🟡 **Card number and CVV generated but never returned to user** (Lines 113-116)
```javascript
const cardNumber = generateUniqueCardNumber();
const cardCVV = Math.floor(100 + Math.random() * 900);
const hashedCardNumber = crypto.createHash("sha256").update(cardNumber.toString()).digest("hex");
const hashedCVV = crypto.createHash("sha256").update(cardCVV.toString()).digest("hex");
```
The card number and CVV are generated, immediately hashed, and stored — but the plaintext values are never sent to the user. The user has no way to know their card details.

🟡 **Duplicate auth verification logic across controllers** (Lines 297-318, 361-381)
Both `getDashboardData()` and `sendMoney()` contain identical token extraction and verification logic. This should be extracted into a middleware:
```diff
+// middleware/auth.middleware.js
+export async function authenticate(req, res, next) {
+    const token = req.headers.authorization?.split(" ")[1];
+    if (!token) return res.status(401).json({ success: false, message: "Access token required" });
+    try {
+        const decoded = jwt.verify(token, config.JWT_URI);
+        req.user = await userModel.findById(decoded.id);
+        if (!req.user) return res.status(401).json({ success: false, message: "Invalid token" });
+        if (!req.user.verified) return res.status(403).json({ success: false, message: "User not verified" });
+        next();
+    } catch (e) {
+        return res.status(401).json({ success: false, message: "Invalid token" });
+    }
+}
```

🟡 **OTP expiry check is commented out** (Lines 280-286)
```javascript
// const OTP_EXPIRE_TIME = 10 * 60 * 1000 // 10 Minutes
// if(Date.now() - otp.createdAt.getTime() > OTP_EXPIRE_TIME){
```
While the TTL index on the OTP model handles cleanup, there's a race condition: if an OTP is about to expire and is read from DB just before MongoDB's TTL cleaner runs, it could still be accepted.

🟡 **No try/catch in `login()`, `verify()`, or `refreshToken()`**
Unlike `register()` which wraps DB operations in try/catch, these functions will throw unhandled promise rejections if `jwt.verify()` or Mongoose operations fail.

🟡 **Missing `await` on `generateUniqueCardNumber()`** (Line 113)
```diff
-const cardNumber = generateUniqueCardNumber();
+const cardNumber = await generateUniqueCardNumber();
```
`generateUniqueCardNumber()` is `async` and returns a Promise — without `await`, `cardNumber` will be `[object Promise]`.

🟡 **`sendMoney()` doesn't commit early returns within the session** (Lines 427-478)
If the receiver is not found (lines 430, 456), the function returns without calling `session.abortTransaction()` or `session.endSession()`, potentially leaking the session.

#### 🟢 Suggestions

🟢 **Typo: "Reciver" → "Receiver"** — used in 8+ places across the file.

🟢 **The `debit` variable is unused** (Lines 439, 465) — the return value of `transactionModel.create()` is assigned but never used.

---

### `backend/src/models/user.model.js`

**Lines reviewed:** 136 | **Issues found:** 2

🟡 **`unique` validator second argument is ignored** (Lines 98, 103, 108)
```javascript
unique: [true, "Email already exist"]
```
Mongoose's `unique` option does not accept an array — it only accepts `true/false`. The custom message is silently ignored. For custom unique validation errors, use a `pre('save')` hook or handle the MongoDB `E11000` duplicate key error.

🟢 **Missing indexes for frequently queried fields**
`phoneNumber` and `accountNumber` are used in `sendMoney()` lookups but don't have explicit indexes. While `unique: true` creates an index for `email`, `phoneNumber`, and `aadharNumber`, the `accountNumber` field does not have `unique: true`.

---

### `backend/src/models/transaction.model.js`

**Lines reviewed:** 24 | **Issues found:** 1

🟡 **Invalid `ref` values in schema** (Lines 7, 16)
```diff
-ref:'user1'
+ref:'Users'
```
The `ref` should point to the model name (`'Users'` — as registered in `mongoose.model("Users", userSchema)`), not the field name.

---

### `backend/src/models/session.model.js`

**Lines reviewed:** 31 | **Issues found:** 1

🟡 **Incorrect `ref` value**
```diff
-ref:"user",
+ref:"Users",
```
Should reference the registered model name `"Users"`.

---

### `backend/src/services/email.service.js`

**Lines reviewed:** 64 | **Issues found:** 1

🟢 **Hardcoded sender name** (Line 41)
```diff
-from: `"SK SAHIL UDDIN" <${config.GOOGLE_EMAIL_USER}>`,
+from: `"Shinrai Bank" <${config.GOOGLE_EMAIL_USER}>`,
```
The sender name should be the application name, not a personal name. Consider making it configurable.

---

### `backend/src/routes/auth.route.js`

**Lines reviewed:** 17 | **Issues found:** 1

🟢 **No middleware for protected routes**
Routes like `/get-data` and `/send-money` require authentication but have no middleware guard. Authentication is checked inside each controller function, leading to code duplication.

---

## Frontend Review

### `frontend/src/App.jsx`

**Lines reviewed:** 51 | **Issues found:** 2

🔴 **`setSideBar()` called directly in render body** (Line 24)
```diff
-setSideBar(currentLocation.slice(1));
+useEffect(() => {
+    setSideBar(currentLocation.slice(1));
+}, [currentLocation]);
```
Calling a state setter during render causes infinite re-renders. This must be wrapped in `useEffect`.

🟢 **`hideLayout` logic is verbose** — could be simplified:
```javascript
const standaloneRoutes = ['/create-account', '/login', '/otp'];
const hideLayout = standaloneRoutes.some(r => location.pathname === r || location.pathname.startsWith(r + '/'));
```

---

### `frontend/src/services/api.js`

**Lines reviewed:** 23 | **Issues found:** 2

🔴 **`useContext()` called inside a non-component function** (Line 19)
```javascript
export const getDashboardData = async(data) => {
    const {accessToken} = useContext(AccessTokenContextInfo); // ❌ INVALID
```
React Hooks can only be called inside React function components or other hooks. This will throw a runtime error. The `accessToken` should be passed as a parameter:
```diff
-export const getDashboardData = async(data) => {
-    const {accessToken} = useContext(AccessTokenContextInfo);
+export const getDashboardData = async(accessToken) => {
```

🟡 **`getDashboardData` calls wrong endpoint** (Line 20)
```diff
-const res = await axios.get(`${config.BACKEND_PORT}/login`, ...);
+const res = await axios.get(`${config.BACKEND_PORT}/get-data`, ...);
```
It calls `/login` (POST endpoint) via GET, instead of `/get-data`.

---

### `frontend/src/contexts/AccessTokenContext.jsx`

**Lines reviewed:** 33 | **Issues found:** 1

🔴 **`axios` used but never imported** (Line 11)
```diff
+import axios from "axios";
 import React, { createContext, useEffect, useState } from 'react'
```
The `refresh()` function calls `axios.get()` but `axios` is not imported, causing a `ReferenceError`.

---

### `frontend/src/services/supabaseClient.js`

**Lines reviewed:** 6 | **Issues found:** 1

🟡 **Supabase environment variables not configured**
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not in `frontend/.env`. The `createClient()` call will fail with `undefined` arguments. Either configure the variables or remove this file until needed.

---

## Summary

| Severity | Count | Category |
|---|---|---|
| 🔴 Critical | 9 | Missing imports, runtime errors, security |
| 🟡 Warning | 10 | Logic errors, code quality |
| 🟢 Suggestion | 7 | Style, naming, maintainability |
| **Total** | **26** | |

### Top 5 Priority Fixes

1. **Add `mongoose` import to `auth.controller.js`** — `sendMoney()` crashes immediately
2. **Add `await` to `generateUniqueCardNumber()`** — card numbers are broken
3. **Fix `setSideBar()` in render** — causes infinite re-render loop
4. **Fix `useContext()` in `api.js`** — violates Rules of Hooks
5. **Add `axios` import to `AccessTokenContext.jsx`** — token refresh is broken
