require('dotenv').config();

const nodemailer = require("nodemailer")
// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
        user: 'aisatmsu@gmail.com', // Your email address
        pass: process.env.email_password, 
    },
});

// Function to send email
const sendReceiptEmail = (to, seatNumber, amount) => {
    const mailOptions = {
        from: 'sasatarang@gmail.com',
        to: to,
        subject: 'Your Payment Receipt',
        text: `Thank you for your payment!\n\nYou have booked seat: ${seatNumber}\nTotal Amount Paid: $${amount}\n\nThank you!`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendReceiptEmail };