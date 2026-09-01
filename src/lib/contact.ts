import { interests, site } from "@/lib/site";

export type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  interest: string;
  message: string;
  faxConfirm: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: Exclude<keyof ContactPayload, "faxConfirm">): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readRaw(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactForm(formData: FormData): ContactPayload {
  return {
    name: read(formData, "name"),
    email: read(formData, "email"),
    organization: read(formData, "organization"),
    phone: read(formData, "phone"),
    interest: read(formData, "interest"),
    message: read(formData, "message"),
    faxConfirm: readRaw(formData, "fax_confirm"),
  };
}

export function validateContact(payload: ContactPayload): string | null {
  if (payload.faxConfirm) {
    return null;
  }

  if (payload.name.length < 2) {
    return "Please enter your name.";
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  if (
    payload.interest &&
    !interests.some((item) => item.value === payload.interest)
  ) {
    return "Please choose a valid topic.";
  }

  if (payload.message.length > 4000) {
    return "Please keep your note under 4,000 characters.";
  }

  return null;
}

function interestLabel(value: string): string {
  return interests.find((item) => item.value === value)?.label ?? "Not specified";
}

export async function deliverInquiry(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Interest: ${interestLabel(payload.interest)}`,
    "",
    payload.message || "(No additional note.)",
  ].join("\n");

  // Resend needs a verified from-domain. Until those env vars exist, keep the
  // form usable in preview and log the inquiry instead of failing the request.
  if (!apiKey || !from) {
    console.info("[contact] Inquiry received (email delivery not configured):", {
      name: payload.name,
      email: payload.email,
      organization: payload.organization,
      interest: payload.interest,
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Website inquiry from ${payload.name}`,
      text: body,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Email delivery failed: ${response.status} ${detail}`);
  }
}
