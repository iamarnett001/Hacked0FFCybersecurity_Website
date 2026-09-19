"use server";

import { headers } from "next/headers";

import {
  deliverInquiry,
  parseContactForm,
  validateContact,
  type ContactResult,
} from "@/lib/contact";
import { acceptRequest } from "@/lib/rate-limit";

async function clientKey(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown"
  );
}

export async function submitInquiry(
  _previous: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const payload = parseContactForm(formData);

  if (payload.faxConfirm) {
    return { ok: true };
  }

  if (!acceptRequest(await clientKey())) {
    return {
      ok: false,
      error: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const error = validateContact(payload);
  if (error) {
    return { ok: false, error };
  }

  try {
    await deliverInquiry(payload);
    return { ok: true };
  } catch {
    console.error("[contact] Failed to deliver inquiry");
    return {
      ok: false,
      error:
        "We could not send that just now. Please email info@hacked0ff.com directly.",
    };
  }
}
