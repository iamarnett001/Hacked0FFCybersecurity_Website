"use server";

import {
  deliverInquiry,
  parseContactForm,
  validateContact,
  type ContactResult,
} from "@/lib/contact";
import { clientIpKey } from "@/lib/client-ip";
import { acceptRequest } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export async function submitInquiry(
  _previous: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const payload = parseContactForm(formData);

  if (payload.faxConfirm) {
    return { ok: true };
  }

  if (!acceptRequest(await clientIpKey())) {
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
        `We could not send that just now. Please email ${site.email} directly.`,
    };
  }
}
