# Shinrai Bank Backend - Environment Setup & Troubleshooting Guide

## Overview
This guide helps you set up and troubleshoot authentication issues for MongoDB and Google OAuth2 in the Shinrai Bank backend.

## Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Google Cloud Console account with Gmail API enabled

---

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials.

### 2. MongoDB Atlas Setup

#### Getting Your Connection String:
1. Log in to [MongoDB Atlas](https://account.mongodb.com/account/login)
2. Navigate to your cluster
3. Click **Connect** → **Connect your application**
4. Copy the connection string (URI)
5. Replace `<password>` with your database user password
6. Update `MONGODB_URI` in `.env`

#### Expected Format:
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database-name
```

#### Checklist:
- [ ] Credentials are correct (username & password)
- [ ] Database name is specified in the URI
- [ ] IP address is whitelisted in MongoDB Atlas Network Access (add `0.0.0.0/0` for development)
- [ ] Cluster is not paused

---

### 3. Google OAuth2 Setup (Gmail)

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Gmail API**

#### Step 2: Create OAuth2 Credentials
1. Go to **Credentials** → **+ Create Credentials** → **OAuth 2.0 Client ID**
2. Select **Desktop application**
3. Download the JSON file
4. Note the `client_id` and `client_secret`

#### Step 3: Generate Refresh Token
1. Use the Google OAuth 2.0 Playground: https://developers.google.com/oauthplaylist
2. Select Gmail API scope: `https://mail.google.com/`
3. Authorize and generate the refresh token
4. Update these in your `.env`:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_EMAIL_USER` (your Gmail address)

#### Expected Format:
```
GOOGLE_CLIENT_ID=xxxxx-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxx
GOOGLE_REFRESH_TOKEN=4/0AeoWuM8u-kwzRlwHtH35S35U8jzJnCYRUTffjyKPCfCvXl0-Sfrr4xNEyAEfVRHvQRs3eA
GOOGLE_EMAIL_USER=your-email@gmail.com
```

---

## Troubleshooting

### MongoDB Authentication Error
```
❌ Database connection failed:
   Authentication Error: Check your MongoDB credentials
```

**Solutions:**
1. Verify username and password in the URI
2. Check that the user exists in MongoDB Atlas Database Access
3. Ensure the IP address is whitelisted in Network Access
4. Try using IP address authentication instead of username/password
5. Verify no special characters in password need URL encoding

### MongoDB ECONNREFUSED Error
```
❌ Database connection failed:
   Error: querySrv ECONNREFUSED
```

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running (not paused)
3. Add your current IP to MongoDB Atlas Network Access
4. Try replacing `mongodb+srv://` with `mongodb://` if DNS issues persist
5. Check if any firewall is blocking the connection

### Google OAuth2 Authentication Error
```
❌ Email server connection failed:
   OAuth2 Authentication Error
   - Invalid or expired GOOGLE_REFRESH_TOKEN
   - Incorrect GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET
   - The email account has revoked access
```

**Solutions:**
1. **Regenerate the refresh token:**
   - Go to https://myaccount.google.com/permissions
   - Find "Shinrai Bank" app and remove it
   - Generate a new refresh token using the steps above

2. **Verify credentials:**
   - Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from Google Cloud Console
   - Ensure they match your OAuth2 application

3. **Check Gmail security:**
   - Enable "Less secure app access" (if using basic auth)
   - Use 2FA with app passwords for enhanced security

4. **Reset OAuth Consent Screen:**
   - Go to Google Cloud Console
   - Configure the OAuth Consent Screen
   - Add scopes: `https://mail.google.com/`
   - Re-authorize the application

---

## Running the Backend

### Development Mode
```bash
npm install
npm run dev
```

### Check Logs
- ✅ `Email server is ready to send messages` - Gmail is configured correctly
- ✅ `Database connected successfully` - MongoDB is connected
- ❌ Error messages will guide you to the issue

---

## Testing Email Functionality

Once both services are connected, you can test sending an email:

```javascript
import sendEmail from './src/services/email.service.js';

await sendEmail('recipient@example.com', 'Test Subject', 'Test Body', '<h1>Test HTML</h1>');
```

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` to version control
- The `.env` file is in `.gitignore` for safety
- Rotate credentials periodically
- Use strong passwords for MongoDB
- Regenerate refresh tokens if compromised
- For production, use environment variables from your deployment platform (Heroku, AWS, etc.)

---

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Nodemailer Gmail Configuration](https://nodemailer.com/smtp/oauth2/)
- [Gmail API Setup Guide](https://developers.google.com/gmail/api/guides)

---

## Quick Checklist

- [ ] `.env` file created with all required variables
- [ ] MongoDB URI tested and working
- [ ] MongoDB IP whitelisted in Atlas
- [ ] Google OAuth2 credentials obtained
- [ ] Refresh token generated and valid
- [ ] Gmail API enabled in Google Cloud Console
- [ ] `npm install` completed
- [ ] `npm run dev` runs without connection errors
- [ ] Both success messages appear in console logs
