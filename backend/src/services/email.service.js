import config from '../config/config.js';

import {EmailClient} from '@azure/communication-email';

import nodemailer from 'nodemailer';
const client = new EmailClient(config.AZURE_COMMUNICATION_CONNECTION_STRING);

const sendEmail = async (to, subject, html)=>{
    try {
        const message = {
            senderAddress: config.EMAIL_SENDER,
            content: {
                subject,
                html,
            },
            recipients: {
                to: [{ address: to }],
            },
        };
        const poller = await client.beginSend(message);
        const result = await poller.pollUntilDone();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default sendEmail;
