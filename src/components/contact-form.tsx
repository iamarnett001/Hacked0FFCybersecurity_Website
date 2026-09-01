"use client";

import {
  useActionState,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { submitInquiry } from "@/app/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { interests, site } from "@/lib/site";
import type { ContactResult } from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type Fields = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  interest: string;
  message: string;
};

const emptyFields: Fields = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  interest: "unsure",
  message: "",
};

// Survives client remounts (Next.js router refresh) without a hydration mismatch.
let draft: Fields = { ...emptyFields };

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(draft);
  const [state, submit, pending] = useActionState<ContactResult | null, FormData>(
    submitInquiry,
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      draft = { ...emptyFields };
    }
  }, [state]);

  function update<K extends keyof Fields>(key: K, value: string) {
    draft = { ...draft, [key]: value };
    setFields(draft);
  }

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
    <form
      action={submit}
      onReset={(event) => event.preventDefault()}
      className="relative space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="inquiry-name">
          <input
            id="inquiry-name"
            name="name"
            required
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Work email" htmlFor="inquiry-email">
          <input
            id="inquiry-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company or family office" htmlFor="inquiry-organization">
          <input
            id="inquiry-organization"
            name="organization"
            autoComplete="organization"
            value={fields.organization}
            onChange={(event) => update("organization", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Phone" htmlFor="inquiry-phone">
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field label="What would help most?" htmlFor="inquiry-interest">
        <select
          id="inquiry-interest"
          name="interest"
          value={fields.interest}
          onChange={(event) => update("interest", event.target.value)}
          className={fieldClass}
        >
          {interests.map((interest) => (
            <option key={interest.value} value={interest.value}>
              {interest.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="How can we help?" htmlFor="inquiry-message">
        <textarea
          id="inquiry-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="A sentence or two about your environment, a concern, or what you would like to discuss."
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </Field>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="inquiry-fax">Fax</label>
        <input id="inquiry-fax" name="fax_confirm" tabIndex={-1} autoComplete="off" />
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
      <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
        {label}
      </label>
      {children}
    </div>
  );
}
