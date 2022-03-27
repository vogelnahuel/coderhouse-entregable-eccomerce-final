import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
export const  smtpTransport:Transporter<SMTPTransport.SentMessageInfo> = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
    },
  });