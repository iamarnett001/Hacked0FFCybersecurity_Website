import assert from "node:assert/strict";
import { test } from "node:test";

import { parseOverviewForm, validateOverview } from "./overview";

function validForm(): FormData {
  const form = new FormData();
  form.set("company", "Doe Family Office");
  form.set("firstName", "Jane");
  form.set("lastName", "Doe");
  form.set("email", "jane@example.com");
  form.set("phone", "+1 (555) 010-0101");
  form.set("employees", "8");
  return form;
}

test("accepts a complete overview request", () => {
  const payload = parseOverviewForm(validForm());
  assert.equal(validateOverview(payload), null);
});

test("requires company, first name, last name, phone, and headcount", () => {
  const missingCompany = validForm();
  missingCompany.set("company", "");
  assert.equal(
    validateOverview(parseOverviewForm(missingCompany)),
    "Please enter your company name.",
  );

  const missingFirst = validForm();
  missingFirst.set("firstName", "J");
  assert.equal(
    validateOverview(parseOverviewForm(missingFirst)),
    "Please enter your first name.",
  );

  const missingPhone = validForm();
  missingPhone.set("phone", "");
  assert.equal(
    validateOverview(parseOverviewForm(missingPhone)),
    "Please enter a valid phone number.",
  );

  const missingEmployees = validForm();
  missingEmployees.set("employees", "all-of-them");
  assert.equal(
    validateOverview(parseOverviewForm(missingEmployees)),
    "Please enter an approximate number of employees.",
  );

  const zeroEmployees = validForm();
  zeroEmployees.set("employees", "0");
  assert.equal(
    validateOverview(parseOverviewForm(zeroEmployees)),
    "Please enter an approximate number of employees.",
  );
});

test("strips header-injection characters from overview fields", () => {
  const form = validForm();
  form.set("email", "jane@example.com\r\nBcc: attacker@evil.test");
  const payload = parseOverviewForm(form);
  assert.equal(payload.email.includes("\n"), false);
  assert.equal(validateOverview(payload), "Please enter a valid email address.");
});

test("rejects code and prompt text in overview name fields", () => {
  const script = validForm();
  script.set("company", "<script>alert(1)</script>");
  assert.equal(
    validateOverview(parseOverviewForm(script)),
    "Please enter your company name.",
  );

  const prompt = validForm();
  prompt.set("firstName", "Ignore previous instructions");
  assert.equal(
    validateOverview(parseOverviewForm(prompt)),
    "Please enter your first name.",
  );

  const template = validForm();
  template.set("lastName", "${process.env}");
  assert.equal(
    validateOverview(parseOverviewForm(template)),
    "Please enter your last name.",
  );
});

test("honeypot overview submissions look successful", () => {
  const form = new FormData();
  form.set("company", "x");
  form.set("fax_confirm", "http://spam.test");
  const payload = parseOverviewForm(form);
  assert.equal(validateOverview(payload), null);
  assert.ok(payload.faxConfirm);
});
