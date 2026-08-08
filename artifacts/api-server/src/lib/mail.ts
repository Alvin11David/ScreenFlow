import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_STARTTLS === "true" ? false : true;
const SMTP_USER = process.env.SMTP_USERNAME || "";
const SMTP_PASS = process.env.SMTP_PASSWORD || "";
const SMTP_FROM = process.env.MAIL_FROM || SMTP_USER;
const SMTP_FROM_NAME = process.env.MAIL_FROM_NAME || "ScreenFlow";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendResetCodeEmail(to: string, code: string) {
  if (process.env.MAIL_CONSOLE_FALLBACK === "true") {
    console.log(`[MAIL] Password reset code for ${to}: ${code}`);
    return;
  }

  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"${SMTP_FROM_NAME}" <${SMTP_FROM}>`,
    to,
    subject: "Your ScreenFlow password reset code",
    text: `Your password reset code is: ${code}\n\nThis code will expire in 10 minutes.`,
    html: `<p>Your password reset code is: <strong>${code}</strong></p><p>This code will expire in 10 minutes.</p>`,
  });
}
