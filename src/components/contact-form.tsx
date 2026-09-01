"use client";

import { useActionState, type ReactNode } from "react";

import { submitInquiry } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { interests, site } from "@/lib/site";
import type { ContactResult } from "@/lib/contact";

const fieldClass = "h-11 rounded-md px-3 text-sm";

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
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </Field>
        <Field label="Work email" htmlFor="email">
          <Input
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
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input
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
          className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {interests.map((interest) => (
            <option key={interest.value} value={interest.value}>
              {interest.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="How can we help?" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A sentence or two about your environment, a concern, or what you would like to discuss."
          className="min-h-32 rounded-md px-3 text-sm"
        />
      </Field>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={pending}
          className="h-11 rounded-md px-5 text-sm"
        >
          {pending ? "Sending…" : "Request more information"}
        </Button>
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
