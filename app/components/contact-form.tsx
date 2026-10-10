"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitContact, type ContactState } from "../actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm({ standalone = false }: { standalone?: boolean }) {
  const [state, action, pending] = useActionState(submitContact, initialState, "/contact");
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const Heading = standalone ? "h2" : "h3";

  useEffect(() => {
    if (state.status === "idle") return;
    const invalidField = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (state.status === "error" && invalidField) invalidField.focus();
    else statusRef.current?.focus();
  }, [state]);

  return <form ref={formRef} className="contact-form" action={action} aria-label="Contact Narin">
    <div className="form-heading">
      <p className="eyebrow">Get in touch</p>
      <Heading>Start a conversation</Heading>
      <p>Tell me what you’re working on. All fields are required.</p>
    </div>
    <div className="form-row">
      <div className="form-field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" defaultValue={state.values?.name} aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? `${id}-name-error` : undefined} />
        {state.errors?.name && <p className="field-error" id={`${id}-name-error`}>{state.errors.name}</p>}
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-email`}>Your email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" defaultValue={state.values?.email} aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? `${id}-email-error` : undefined} />
        {state.errors?.email && <p className="field-error" id={`${id}-email-error`}>{state.errors.email}</p>}
      </div>
    </div>
    <div className="form-field">
      <label htmlFor={`${id}-subject`}>Subject</label>
      <input id={`${id}-subject`} name="subject" required maxLength={150} defaultValue={state.values?.subject} placeholder="A role, a project, or a question" aria-invalid={!!state.errors?.subject} aria-describedby={state.errors?.subject ? `${id}-subject-error` : undefined} />
      {state.errors?.subject && <p className="field-error" id={`${id}-subject-error`}>{state.errors.subject}</p>}
    </div>
    <div className="form-field">
      <label htmlFor={`${id}-message`}>Message</label>
      <textarea id={`${id}-message`} name="message" rows={5} required minLength={10} maxLength={5000} defaultValue={state.values?.message} placeholder="Tell me a little about what you have in mind." aria-invalid={!!state.errors?.message} aria-describedby={`${id}-message-hint${state.errors?.message ? ` ${id}-message-error` : ""}`} />
      <p className="field-hint" id={`${id}-message-hint`}>10–5,000 characters.</p>
      {state.errors?.message && <p className="field-error" id={`${id}-message-error`}>{state.errors.message}</p>}
    </div>
    <div className="honeypot" hidden aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this field empty</label><input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} /></div>
    <div className="form-submit">
      <button className="button primary" type="submit" disabled={pending}><span>{pending ? "Sending…" : "Send message"}</span><span aria-hidden="true">↗</span></button>
      <p>I’ll reply to the email you provide. Your details are only used to respond to your message.</p>
    </div>
    <div aria-live="polite" aria-atomic="true">
      {(pending || state.message) && <p ref={statusRef} tabIndex={-1} className={`form-status ${pending ? "pending" : state.status}`}>{pending ? "Sending your message. Please wait." : state.message}</p>}
    </div>
  </form>;
}
