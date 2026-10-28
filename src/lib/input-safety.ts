// Allowlists for names, plus a small denylist for markup, code, and
// prompt-injection phrases that would still look like ordinary words.

const PERSON_NAME = /^[\p{L}][\p{L} .'\-]{0,118}$/u;
const COMPANY_NAME = /^[\p{L}\p{N}][\p{L}\p{N} .,&'\-/()+#]{0,198}$/u;

const MARKUP_OR_CODE =
  /[<>{}[\]`$]|javascript:|data:text\/html|<\s*\/?\s*script|on\w+\s*=|\$\{|\{\{|}}|<\?|<%/i;

const PROMPT_INJECTION =
  /\b(ignore (all |any )?(previous|prior|above) (instructions|prompts)|you are (now )?(chatgpt|gpt|claude|an? (ai|llm|language model))|system prompt|developer message|jailbreak)\b/i;

export function containsUnsafeContent(value: string): boolean {
  return MARKUP_OR_CODE.test(value) || PROMPT_INJECTION.test(value);
}

export function isPersonName(value: string): boolean {
  return PERSON_NAME.test(value) && !containsUnsafeContent(value);
}

export function isCompanyName(value: string): boolean {
  return COMPANY_NAME.test(value) && !containsUnsafeContent(value);
}

export function isSafePlainText(value: string): boolean {
  return !containsUnsafeContent(value);
}
