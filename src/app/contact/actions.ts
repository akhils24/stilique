"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Record<string, string>; values?: Record<string, string> }
  | { status: "sent"; preview: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company_website")) return { status: "sent", preview: false };

  const get = (key: string) => String(formData.get(key) ?? "").trim();
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const projectType = get("projectType");
  const message = get("message");

  // Echoed back so the form can refill itself (React resets forms after an action).
  const values = { name, email, phone, projectType, message };

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (message.length < 10) fields.message = "Please tell us a little about your project.";
  if (formData.get("consent") !== "on") fields.consent = "Please agree so we can reply to you.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "Please check the highlighted fields.", fields, values };
  }
  if (name.length > 200 || email.length > 200 || phone.length > 60 || message.length > 5000) {
    return { status: "error", message: "Your message is too long.", values };
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    projectType ? `Project type: ${projectType}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Design preview: email delivery isn't connected yet. Tell the visitor honestly.
    console.info("[contact] RESEND_API_KEY not set; enquiry not emailed:\n" + text);
    return { status: "sent", preview: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Stilique Website <website@stilique.it>",
        to: [process.env.CONTACT_TO_EMAIL ?? "info@stilique.it"],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return { status: "sent", preview: false };
  } catch (error) {
    console.error("[contact] failed to send enquiry", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email us directly at info@stilique.it.",
      values,
    };
  }
}
