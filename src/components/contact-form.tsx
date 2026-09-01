"use client";

import { useActionState, type ReactNode } from "react";

import { submitInquiry } from "@/app/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { interests, site } from "@/lib/site";
import type { ContactResult } from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactResult | null, FormData>(
    submitInquiry,
    null,
  );

  if (state?.ok) {
    return (
      <div className="border border-border bg-secondary/50 p-8">
        <h3 className="font-heading text-2xl font-medium">Request received.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you. We will follow up at the email you provided. If anything is
          urgent, write directly to{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company or family office" htmlFor="organization">
          <input
            id="organization"
            name="organization"
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </Field>
      </div>
      <Field label="What would help most?" htmlFor="interest">
        <select
          id="interest"
          name="interest"
          defaultValue="unsure"
          className={fieldClass}
        >
          {interests.map((interest) => (
            <option key={interest.value} value={interest.value}>
              {interest.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="How can we help?" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A sentence or two about your environment, a concern, or what you would like to discuss."
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </Field>
      {/* Honeypot: leave empty. Named to avoid password-manager autofill. */}
      <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="fax_confirm">Fax</label>
        <input
          id="fax_confirm"
          name="fax_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants(), "h-11 rounded-md px-5 text-sm")}
        >
          {pending ? "Sending…" : "Request more information"}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Or email{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          . We do not share inquiries.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
