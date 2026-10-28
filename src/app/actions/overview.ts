"use server";

import {
  deliverOverviewRequest,
  parseOverviewForm,
  validateOverview,
  type OverviewResult,
} from "@/lib/overview";
import { clientIpKey } from "@/lib/client-ip";
import { acceptRequest } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export async function submitOverviewRequest(
  _previous: OverviewResult | null,
  formData: FormData,
): Promise<OverviewResult> {
  const payload = parseOverviewForm(formData);

  if (payload.faxConfirm) {
    return { ok: true };
  }

  if (!acceptRequest(await clientIpKey())) {
    return {
      ok: false,
      error: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const error = validateOverview(payload);
  if (error) {
    return { ok: false, error };
  }

  try {
    await deliverOverviewRequest(payload);
    return { ok: true };
  } catch {
    console.error("[overview] Failed to deliver request");
    return {
      ok: false,
      error: `We could not send that just now. Please email ${site.email} directly.`,
    };
  }
}
