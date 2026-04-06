import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  if (!cleanName || cleanName.length > MAX_NAME) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > MAX_EMAIL) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!cleanMessage || cleanMessage.length > MAX_MESSAGE) {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email service not configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      // Without a verified domain, 'from' must be onboarding@resend.dev
      // and 'to' must be your Resend account email.
      // Once you verify a domain, change 'from' to: contact@yourdomain.com
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "spestanam273@gmail.com",
      replyTo: cleanEmail,
      subject: `[Portfolio] Message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
