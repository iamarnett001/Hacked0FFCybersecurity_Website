import { EMAIL_PATTERN, PHONE_PATTERN, stripHeaderUnsafe } from "./contact";
import type { ContactResult } from "./contact";
import { isCompanyName, isPersonName } from "./input-safety";
import { site } from "./site";

export type OverviewPayload = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employees: string;
  faxConfirm: string;
};

export type OverviewResult = ContactResult;

const LIMITS = {
  company: 200,
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  employees: 8,
  faxConfirm: 200,
} as const;

const EMPLOYEE_PATTERN = /^\d{1,6}$/;

function read(formData: FormData, key: string, max: number): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return stripHeaderUnsafe(value).trim().slice(0, max);
}

export function parseOverviewForm(formData: FormData): OverviewPayload {
  const fax = formData.get("fax_confirm");
  return {
    company: read(formData, "company", LIMITS.company),
    firstName: read(formData, "firstName", LIMITS.firstName),
    lastName: read(formData, "lastName", LIMITS.lastName),
    email: read(formData, "email", LIMITS.email).toLowerCase(),
    phone: read(formData, "phone", LIMITS.phone),
    employees: read(formData, "employees", LIMITS.employees),
    faxConfirm:
      typeof fax === "string"
        ? stripHeaderUnsafe(fax).trim().slice(0, LIMITS.faxConfirm)
        : "",
  };
}

export function validateOverview(payload: OverviewPayload): string | null {
  if (payload.faxConfirm) {
    return null;
  }

  if (payload.company.length < 2 || !isCompanyName(payload.company)) {
    return "Please enter your company name.";
  }

  if (payload.firstName.length < 2 || !isPersonName(payload.firstName)) {
    return "Please enter your first name.";
  }

  if (payload.lastName.length < 2 || !isPersonName(payload.lastName)) {
    return "Please enter your last name.";
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  if (!payload.phone || !PHONE_PATTERN.test(payload.phone)) {
    return "Please enter a valid phone number.";
  }

  if (!EMPLOYEE_PATTERN.test(payload.employees) || Number(payload.employees) < 1) {
    return "Please enter an approximate number of employees.";
  }

  return null;
}

export async function deliverOverviewRequest(
  payload: OverviewPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const fullName = `${payload.firstName} ${payload.lastName}`;

  const body = [
    "Source: Cybersecurity Overview page",
    `Company: ${payload.company}`,
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Approximate employees: ${payload.employees}`,
  ].join("\n");

  if (!apiKey || !from) {
    console.info(
      "[overview] Request accepted; email delivery is not configured.",
    );
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
      subject: `Cybersecurity Overview request from ${fullName}`,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed: ${response.status}`);
  }
}
