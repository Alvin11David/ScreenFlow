import { EmailJSResponseStatus, send } from "@emailjs/nodejs";

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || "";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || "";
const MAIL_FROM = process.env.MAIL_FROM || "";

export async function sendResetCodeEmail(to: string, code: string) {
  if (process.env.MAIL_CONSOLE_FALLBACK === "true") {
    console.log(`[MAIL] Password reset code for ${to}: ${code}`);
    return;
  }

  const templateParams = {
    to_email: to,
    from_name: process.env.MAIL_FROM_NAME || "ScreenFlow",
    code,
    message: `Your password reset code is: ${code}`,
  };

  try {
    const response: EmailJSResponseStatus = await send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      },
    );
    return response;
  } catch (error) {
    console.error("Failed to send reset email via EmailJS:", error);
    throw error;
  }
}
