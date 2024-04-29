"use server";
import nodemailer from "nodemailer";

interface Message {
  message: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const sendMessage = async ({
  message,
  email,
  firstName,
  lastName,
}: Message) => {
  const { SMTP_PASSWORD, SMTP_USER } = process.env;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const verify = await transport.verify();

    console.log(verify);
  } catch (err) {
    console.log(err);
    return "failed";
  }

  try {
    const send = await transport.sendMail({
      from: email,
      html: `<h2>From: ${email}</h2> <h2>Sender: ${firstName} ${lastName}</h2> <h2>Message:</h2><p>${message}</p>`,
      to: "support@offshoreaccount.org",
      subject: `Contact Form: From ${email}`,
    });

    if (send) return "success";
    return send;
  } catch (err) {
    console.log(err);
    return "failed";
  }
};
