"use server";

import {
  deliverInquiry,
  parseContactForm,
  validateContact,
  type ContactResult,
} from "@/lib/contact";

export async function submitInquiry(
  _previous: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const payload = parseContactForm(formData);

  if (payload.faxConfirm) {
    return { ok: true };
  }

  const error = validateContact(payload);
  if (error) {
    return { ok: false, error };
  }

  try {
    await deliverInquiry(payload);
    return { ok: true };
  } catch (cause) {
    console.error("[contact] Failed to deliver inquiry", cause);
    return {
      ok: false,
      error:
        "We could not send that just now. Please email info@hacked0ff.com directly.",
    };
  }
}
