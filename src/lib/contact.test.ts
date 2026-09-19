import assert from "node:assert/strict";
import { test } from "node:test";

import {
  parseContactForm,
  stripHeaderUnsafe,
  validateContact,
} from "./contact";
import { acceptRequest, resetRateLimitForTests } from "./rate-limit";

test("strips CR/LF used in header injection", () => {
  assert.equal(stripHeaderUnsafe("Jane\r\nBcc: attacker@evil.test"), "JaneBcc: attacker@evil.test");
});

test("rejects injected email addresses", () => {
  const form = new FormData();
  form.set("name", "Jane Doe");
  form.set("email", "jane@example.com\r\nBcc: attacker@evil.test");
  const payload = parseContactForm(form);
  assert.equal(payload.email.includes("\n"), false);
  assert.equal(validateContact(payload), "Please enter a valid email address.");
});

test("accepts a normal inquiry", () => {
  const form = new FormData();
  form.set("name", "Jane Doe");
  form.set("email", "jane@example.com");
  form.set("organization", "Doe Family Office");
  form.set("phone", "+1 (555) 010-0101");
  form.set("interest", "assessment");
  form.set("message", "Need a roadmap.");
  const payload = parseContactForm(form);
  assert.equal(validateContact(payload), null);
});

test("honeypot is treated as valid so bots get a fake success", () => {
  const form = new FormData();
  form.set("name", "bot");
  form.set("email", "not-an-email");
  form.set("fax_confirm", "http://spam.test");
  const payload = parseContactForm(form);
  assert.equal(validateContact(payload), null);
  assert.ok(payload.faxConfirm);
});

test("rate limiter blocks a sixth request in the window", () => {
  resetRateLimitForTests();
  for (let i = 0; i < 5; i += 1) {
    assert.equal(acceptRequest("1.1.1.1"), true);
  }
  assert.equal(acceptRequest("1.1.1.1"), false);
  assert.equal(acceptRequest("2.2.2.2"), true);
});
