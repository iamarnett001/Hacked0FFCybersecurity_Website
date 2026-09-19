import { interests, site } from "./site";

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

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_PATTERN = /^[0-9+().\s-]*$/;

const LIMITS = {
  name: 120,
  email: 254,
  organization: 200,
  phone: 40,
  message: 4000,
  faxConfirm: 200,
} as const;

export function stripHeaderUnsafe(value: string): string {
  // CR/LF/NUL in From/Subject/Reply-To can be used for SMTP header injection.
  return value.replace(/[\r\n\0]/g, "");
}

function read(
  formData: FormData,
  key: Exclude<keyof ContactPayload, "faxConfirm">,
  max: number,
): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return stripHeaderUnsafe(value).trim().slice(0, max);
}

export function parseContactForm(formData: FormData): ContactPayload {
  const fax = formData.get("fax_confirm");
  return {
    name: read(formData, "name", LIMITS.name),
    email: read(formData, "email", LIMITS.email).toLowerCase(),
    organization: read(formData, "organization", LIMITS.organization),
    phone: read(formData, "phone", LIMITS.phone),
    interest: read(formData, "interest", 40),
    message: read(formData, "message", LIMITS.message),
    faxConfirm:
      typeof fax === "string"
        ? stripHeaderUnsafe(fax).trim().slice(0, LIMITS.faxConfirm)
        : "",
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

  if (payload.phone && !PHONE_PATTERN.test(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (
    payload.interest &&
    !interests.some((item) => item.value === payload.interest)
  ) {
    return "Please choose a valid topic.";
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

  if (!apiKey || !from) {
    console.info("[contact] Inquiry accepted; email delivery is not configured.");
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
    throw new Error(`Email delivery failed: ${response.status}`);
  }
}
