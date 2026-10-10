"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

type Field = "name" | "email" | "subject" | "message";
export interface ContactState {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Partial<Record<Field, string>>;
  values?: Record<Field, string>;
}

// Best-effort per-instance throttling. Also apply host-level rate limits when deploying.
const attempts = new Map<string, { count: number; expires: number }>();
const windowMs = 10 * 60 * 1000;

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const read = (field: string) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };
  const values = { name: read("name"), email: read("email"), subject: read("subject"), message: read("message") };
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name || values.name.length > 100 || /[\r\n]/.test(values.name)) errors.name = "Enter your name (up to 100 characters).";
  if (values.email.length > 254 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(values.email)) errors.email = "Enter a valid reply email address.";
  if (!values.subject || values.subject.length > 150 || /[\r\n]/.test(values.subject)) errors.subject = "Enter a subject (up to 150 characters).";
  if (values.message.length < 10 || values.message.length > 5000) errors.message = "Write a message between 10 and 5,000 characters.";
  if (Object.keys(errors).length) return { status: "error", message: "Check the highlighted fields and try again.", errors, values };
  if (read("website")) return { status: "error", message: "Unable to send this message.", values };

  const requestHeaders = await headers();
  const address = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const key = createHash("sha256").update(address).digest("hex");
  const now = Date.now();
  for (const [storedKey, attempt] of attempts) if (attempt.expires <= now) attempts.delete(storedKey);
  const attempt = attempts.get(key);
  if (attempt && attempt.count >= 5) return { status: "error", message: "Too many attempts. Please wait a few minutes before trying again.", values };
  if (!attempt && attempts.size >= 1000) return { status: "error", message: "Please try again in a few minutes.", values };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return { status: "error", message: "Your message could not be sent right now. Please try again later or reach out through LinkedIn.", values };
  attempts.set(key, { count: (attempt?.count ?? 0) + 1, expires: attempt?.expires ?? now + windowMs });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio: ${values.subject}`,
        text: `Name: ${values.name}\nReply email: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { status: "error", message: "Your message could not be sent. Please try again later or reach out through LinkedIn.", values };
    const receipt: unknown = await response.json();
    if (!receipt || typeof receipt !== "object" || !("id" in receipt) || typeof receipt.id !== "string" || !receipt.id) {
      return { status: "error", message: "Your message could not be confirmed. Please try again later.", values };
    }
    return { status: "success", message: "Thanks for reaching out. Your message has been sent." };
  } catch {
    return { status: "error", message: "Your message could not be sent. Please try again later or reach out through LinkedIn.", values };
  }
}
