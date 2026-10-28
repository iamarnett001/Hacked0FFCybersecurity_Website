import { isCompanyName, isPersonName, isSafePlainText } from "./input-safety";
import { sendSiteEmail } from "./mail";
import { interests } from "./site";

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

export const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
export const PHONE_PATTERN = /^[0-9+().\s-]*$/;

function nanpAreaCode(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1, 4);
  }
  if (digits.length === 10) {
    return digits.slice(0, 3);
  }
  return null;
}

export function isAcceptablePhone(value: string, required = false): boolean {
  if (!value) {
    return !required;
  }
  if (!PHONE_PATTERN.test(value)) {
    return false;
  }
  // 555 is reserved in the North American Numbering Plan for fiction.
  return nanpAreaCode(value) !== "555";
}

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

  if (payload.name.length < 2 || !isPersonName(payload.name)) {
    return "Please enter your name.";
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  if (!isAcceptablePhone(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (payload.organization && !isCompanyName(payload.organization)) {
    return "Please enter a valid company or family office name.";
  }

  if (payload.message && !isSafePlainText(payload.message)) {
    return "Please enter your note in plain language, without code or markup.";
  }

  if (
    payload.interest &&
    !interests.some((item) => item.value === payload.interest)
  ) {
    return "Please choose a valid topic.";
  }

  return null;
}

export function interestLabel(value: string): string {
  return interests.find((item) => item.value === value)?.label ?? "Not specified";
}

export function informationRequestSubject(interest: string): string {
  return `Information Request - ${interestLabel(interest)}`;
}

export async function deliverInquiry(payload: ContactPayload): Promise<void> {
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Interest: ${interestLabel(payload.interest)}`,
    "",
    payload.message || "(No additional note.)",
  ].join("\n");

  await sendSiteEmail({
    subject: informationRequestSubject(payload.interest),
    text: body,
    replyTo: payload.email,
  });
}
