"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

const inputClass =
  "peer w-full border-0 border-b border-line bg-transparent px-0 pt-7 pb-3 text-lg outline-none transition-colors placeholder:text-transparent focus:border-ink aria-[invalid=true]:border-accent";
const labelClass =
  "label pointer-events-none absolute top-0 left-0 text-stone transition-colors peer-focus:text-ink";

function Field({
  name,
  label,
  error,
  type = "text",
  autoComplete,
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && " *"}
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ projectTypes }: { projectTypes: string[] }) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const errors = state.status === "error" ? state.fields ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="border-t border-ink pt-10">
        <p className="display-md">Thank you.</p>
        <p className="mt-6 max-w-[48ch] leading-relaxed text-ink-soft">
          Your message has reached us. We usually reply within two working days.
        </p>
        {state.preview && (
          <p className="label mt-8 text-accent">Preview mode: email delivery is not connected yet.</p>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-10">
      <div className="grid gap-10 md:grid-cols-2">
        <Field name="name" label="Name" autoComplete="name" required error={errors.name} defaultValue={values.name} />
        <Field name="email" label="Email" type="email" autoComplete="email" required error={errors.email} defaultValue={values.email} />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" defaultValue={values.phone} />
        <div className="relative">
          <select id="projectType" name="projectType" defaultValue={values.projectType ?? ""} className={`${inputClass} appearance-none`}>
            <option value="">Select…</option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
            <option>Other</option>
          </select>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          placeholder="Your project"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        <label htmlFor="message" className={labelClass}>
          Tell us about your project *
        </label>
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-accent">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            className="mt-1 size-4 shrink-0 accent-ink"
          />
          <span>
            I agree that my details will be used to reply to my enquiry, as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && <p className="mt-2 text-sm text-accent">{errors.consent}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <button
          type="submit"
          disabled={pending}
          className="label group inline-flex items-center gap-4 bg-ink px-9 py-5 text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
          <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
        </button>
        {state.status === "error" && (
          <p role="alert" className="text-sm text-accent">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
