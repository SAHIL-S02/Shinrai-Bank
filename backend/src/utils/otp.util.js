export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

export const htmlOtp = (otp) => {
    return `
        <div style="background-color: #f2f2f2; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p style="font-size: 18px; color: #555;">Use the following OTP to complete your action:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${otp}</div>
            <p style="font-size: 14px; color: #999;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
    `;
}
