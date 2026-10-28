"use client";

import {
  useActionState,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { submitOverviewRequest } from "@/app/actions/overview";
import { buttonVariants } from "@/components/ui/button";
import type { OverviewResult } from "@/lib/overview";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type Fields = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employees: string;
};

const emptyFields: Fields = {
  company: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  employees: "",
};

// Survives client remounts (Next.js router refresh) without a hydration mismatch.
let draft: Fields = { ...emptyFields };

export function OverviewForm() {
  const [fields, setFields] = useState<Fields>(draft);
  const [state, submit, pending] = useActionState<
    OverviewResult | null,
    FormData
  >(submitOverviewRequest, null);

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
          Thank you. We will follow up at the email you provided to schedule
          your Cybersecurity Overview. If anything is urgent, write directly to{" "}
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
      <Field label="Company name" htmlFor="overview-company">
        <input
          id="overview-company"
          name="company"
          required
          maxLength={200}
          autoComplete="organization"
          value={fields.company}
          onChange={(event) => update("company", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="overview-first-name">
          <input
            id="overview-first-name"
            name="firstName"
            required
            maxLength={80}
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Last name" htmlFor="overview-last-name">
          <input
            id="overview-last-name"
            name="lastName"
            required
            maxLength={80}
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email address" htmlFor="overview-email">
          <input
            id="overview-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Phone number" htmlFor="overview-phone">
          <input
            id="overview-phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field
        label="Approximate number of employees"
        htmlFor="overview-employees"
      >
        <input
          id="overview-employees"
          name="employees"
          type="number"
          required
          min={1}
          max={999999}
          step={1}
          inputMode="numeric"
          placeholder="e.g. 8"
          value={fields.employees}
          onChange={(event) => update("employees", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="overview-fax">Fax</label>
        <input
          id="overview-fax"
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
          {pending ? "Sending…" : "Request a Cybersecurity Overview"}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Submissions go to{" "}
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
