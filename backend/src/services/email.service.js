import config from '../config/config.js';


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    type: 'OAuth2',
    user: config.GOOGLE_EMAIL_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email server connection failed:');
        if (error.code === 'EAUTH') {
            console.error("   OAuth2 Authentication Error");
            console.error("   Possible causes:");
            console.error("   - Invalid or expired GOOGLE_REFRESH_TOKEN");
            console.error("   - Incorrect GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
            console.error("   - The email account has revoked access");
        } else {
            console.error(`   Error: ${error.message}`);
        }
        console.error("\n📋 Please verify your Google OAuth2 credentials in the .env file");
        console.error("📖 To generate a new refresh token:");
        console.error("   1. Visit: https://myaccount.google.com/permissions");
        console.error("   2. Find 'Shinrai Bank' or similar app and reconnect\n");
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});
    


// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"SK SAHIL UDDIN" <${config.GOOGLE_EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('✅ Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        throw error;
    }
};


export default sendEmail;





export { transporter };
