# 📡 Shinrai Bank — API Documentation

## Base URL

```
http://localhost:3000/api/auth
```

All endpoints are served under the `/api/auth/` prefix.

## Authentication

The API uses **JWT Bearer Token** authentication with a **refresh token rotation** strategy.

| Token Type | Transport | Lifetime | Purpose |
|---|---|---|---|
| Access Token | `Authorization: Bearer <token>` header | 15 minutes | Authenticates API requests |
| Refresh Token | HTTP-only cookie (`refreshToken`) | 7 days | Generates new access tokens |

### Authentication Flow
1. Register → Verify OTP → Login
2. Login returns an `accessToken` in the response body and sets a `refreshToken` cookie
3. Use the access token in the `Authorization` header for protected endpoints
4. When the access token expires, call `GET /refresh-token` to get a new one

---

## Endpoints

### 1. Register User

Creates a new bank account with auto-generated card details.

```
POST /api/auth/register
```

#### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phoneNumber": 9876543210,
  "password": "SecureP@ss123",
  "aadharNumber": "123456789012",
  "dob": "1995-03-15"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | ✅ | Full name of the account holder |
| `email` | String | ✅ | Unique email address |
| `phoneNumber` | Number | ✅ | 10-digit phone number (also used as account number) |
| `password` | String | ✅ | Account password (hashed with bcrypt) |
| `aadharNumber` | String | ✅ | 12-digit Aadhar number (hashed with SHA-256) |
| `dob` | Date (ISO) | ✅ | Date of birth |

#### Responses

**201 Created** — Account created, OTP sent to email
```json
{
  "success": true,
  "message": "User is registered",
  "user": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phoneNumber": 9876543210
  }
}
```

**400 Bad Request** — Missing required fields
```json
{
  "success": false,
  "message": "Name is required"
}
```

**409 Conflict** — User already exists (matching email or Aadhar)
```json
{
  "success": false,
  "message": "Rahul Sharma user already exist",
  "user": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phoneNumber": 9876543210
  }
}
```

#### Side Effects
- Sends OTP email to the provided address via Gmail OAuth2
- Creates an OTP record with 10-minute TTL
- Generates a Luhn-valid 16-digit card number
- Generates a 3-digit CVV
- Default bank balance: ₹10,000
- Default account type: SAVINGS
- Default card type: DEBIT

---

### 2. Verify Email (OTP)

Verifies the user's email address using the OTP sent during registration.

```
POST /api/auth/verify
```

#### Request Body

```json
{
  "email": "rahul@example.com",
  "otp": "482917"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | String | ✅ | Email used during registration |
| `otp` | String/Number | ✅ | 6-digit OTP received via email |

#### Responses

**200 OK** — Email verified
```json
{
  "success": true,
  "message": "OTP verified"
}
```

**401 Unauthorized** — Invalid or expired OTP
```json
{
  "success": false,
  "message": "OTP is incorrect or Expired"
}
```

**404 Not Found** — User not found for the OTP
```json
{
  "success": false,
  "message": "User not found"
}
```

#### Notes
- OTP records automatically expire after 10 minutes (MongoDB TTL index)
- The OTP is hashed with SHA-256 before comparison
- After verification, `user.verified` is set to `true`

---

### 3. Login

Authenticates a user and returns JWT tokens.

```
POST /api/auth/login
```

#### Request Body

```json
{
  "email": "rahul@example.com",
  "password": "SecureP@ss123",
  "accountType": "SAVINGS"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | String | ✅ | Registered email |
| `password` | String | ✅ | Account password |
| `accountType` | String | ✅ | Account type: `SAVINGS`, `CURRENT`, `SALARY`, or `FIXED_DEPOSIT` |

#### Responses

**200 OK** — Login successful
```json
{
  "success": true,
  "message": "User login successfully",
  "user": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**404 Not Found** — User does not exist
```json
{
  "success": false,
  "message": "User not found"
}
```

**401 Unauthorized** — Wrong password
```json
{
  "success": false,
  "message": "User password invalid"
}
```

**403 Forbidden** — Email not verified
```json
{
  "success": false,
  "message": "User is not verified by email"
}
```

#### Headers Set
| Header | Value |
|---|---|
| `Set-Cookie` | `refreshToken=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800` |

#### Side Effects
- Creates a session record with hashed refresh token, IP, and User-Agent
- Sets an HTTP-only secure cookie with the refresh token

---

### 4. Refresh Access Token

Issues a new access token using a valid refresh token cookie. Also rotates the refresh token.

```
GET /api/auth/refresh-token
```

#### Request

No request body. The refresh token is read from the `refreshToken` cookie.

```
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Responses

**200 OK** — Tokens refreshed
```json
{
  "message": "Access token refreshed successfully",
  "newAccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**401 Unauthorized** — No cookie or invalid/revoked session
```json
{
  "message": "Refresh Token Not Found"
}
```
```json
{
  "message": "Refresh token invalid"
}
```

#### Notes
- **Token rotation**: Each refresh also generates a new refresh token and updates the session
- The old refresh token becomes invalid immediately
- If a stolen refresh token is reused, the session lookup will fail (detecting potential compromise)

---

### 5. Get Dashboard Data

Returns basic user information for the authenticated user's dashboard.

```
GET /api/auth/get-data
```

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Responses

**200 OK** — User data returned
```json
{
  "success": true,
  "message": "User data found",
  "user": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com"
  }
}
```

**401 Unauthorized** — Missing or invalid token
```json
{
  "success": false,
  "message": "Invalid token"
}
```

**403 Forbidden** — User not verified
```json
{
  "success": false,
  "message": "User not verified"
}
```

---

### 6. Send Money

Transfers money from the authenticated user to another user. Uses MongoDB transactions for atomicity.

```
POST /api/auth/send-money
```

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Request Body

Transfer by account number:
```json
{
  "reciverAccountNumber": 9876543210,
  "amount": 5000
}
```

Transfer by phone number:
```json
{
  "reciverPhoneNumber": 9876543210,
  "amount": 5000
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `reciverAccountNumber` | Number | One of these | Receiver's account number |
| `reciverPhoneNumber` | Number | is required | Receiver's phone number |
| `amount` | Number | ✅ | Amount to transfer (must be > 0) |

#### Responses

**200 OK** — Transfer successful
```json
{
  "success": true,
  "message": "Amount 5000 transferred to Priya Patel"
}
```

**400 Bad Request** — Invalid amount or missing receiver
```json
{
  "success": false,
  "message": "Invalid amount"
}
```

**400 Bad Request** — Self-transfer attempt
```json
{
  "success": false,
  "message": "Cannot transfer money to your own account"
}
```

**404 Not Found** — Receiver not found
```json
{
  "success": false,
  "message": "Reciver not found"
}
```

**409 Conflict** — Limit exceeded or insufficient balance
```json
{
  "success": false,
  "message": "Daily Transfer limit reached"
}
```
```json
{
  "success": false,
  "message": "Monthly Transfer limit reached"
}
```
```json
{
  "success": false,
  "message": "Low balance"
}
```

#### Transfer Limits

| Limit | Default | Reset |
|---|---|---|
| Daily | ₹1,00,000 | Midnight (date change) |
| Monthly | ₹10,00,000 | 1st of each month |

#### Transaction Safety
- Uses MongoDB **sessions** for atomic operations
- Both sender debit and receiver credit happen in one transaction
- On any error, the transaction is aborted (no partial state)
- Creates a `transaction` record linking both users with the amount

---

## Error Response Format

All error responses follow this consistent format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {}
}
```

## Status Code Reference

| Code | Meaning | Used For |
|---|---|---|
| `200` | OK | Successful operations |
| `201` | Created | User registered |
| `400` | Bad Request | Validation errors, missing fields |
| `401` | Unauthorized | Invalid/missing token, wrong password |
| `403` | Forbidden | Unverified user |
| `404` | Not Found | User/receiver not found |
| `409` | Conflict | Duplicate user, transfer limits, low balance |
| `500` | Internal Server Error | Unexpected server failures |
