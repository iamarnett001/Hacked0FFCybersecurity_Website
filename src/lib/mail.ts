import { getCloudflareContext } from "@opennextjs/cloudflare";

import { site } from "./site";

const DEFAULT_FROM = `${site.legalName} <noreply@${site.domain}>`;

async function envString(
  name: "RESEND_API_KEY" | "CONTACT_FROM_EMAIL",
): Promise<string | undefined> {
  const fromProcess = process.env[name]?.trim();
  if (fromProcess) {
    return fromProcess;
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = env[name];
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

export async function sendSiteEmail(options: {
  subject: string;
  text: string;
  replyTo: string;
}): Promise<void> {
  const apiKey = await envString("RESEND_API_KEY");
  const from = (await envString("CONTACT_FROM_EMAIL")) ?? DEFAULT_FROM;

  if (!apiKey) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      reply_to: options.replyTo,
      subject: options.subject,
      text: options.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[mail] Resend rejected the message", response.status, detail);
    throw new Error(`Email delivery failed: ${response.status}`);
  }
}
