import nodemailer from "nodemailer";
import "dotenv/config";

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

// payload example
// const email = {
//     from: process.env.SMTP_USER,
//     to: "wolaseb141@lawior.com",
//     subject: "Test mail",
//     html: "<strong>Test mail</strong>"
// };
export const sendMail = (payload) => {
    const email = { ...payload, from: process.env.SMTP_USER };
    return transport.sendMail(email)
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err));
}

export const getVerificationLink = (token) => {
    return `<a href="${process.env.PUBLIC_URL}/api/auth/verify/${token}" target="_blank">Verify email</a>`;
}
