import userModel from "../models/user.model.js";
function generateLuhnCardNumber() {
    let digits = [];

  // Generate first 15 digits
    for (let i = 0; i < 15; i++) {
        digits.push(Math.floor(Math.random() * 10));
    }
    let sum = 0;
    let isEven = true;
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return digits.join("") + checkDigit;
}

export default async function generateUniqueCardNumber() {
    while (true) {
        const cardNumber = generateLuhnCardNumber();
        const exists = await userModel.findOne({ cardNumber });
        if (!exists) {
            return cardNumber;
        }
    }
}
