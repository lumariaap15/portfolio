"use client";

import { useState } from "react";
import type { Messages } from "@/i18n/getMessages";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ t }: { t: Messages["contactForm"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-6 max-w-md text-(--color-ink)">{t.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4">
      <Field label={t.name} name="name" required />
      <Field label={t.email} name="email" type="email" required />
      <Field label={t.companyOptional} name="company" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="project" className="text-xs uppercase tracking-wider text-(--color-faint)">
          {t.project}
        </label>
        <textarea
          id="project"
          name="project"
          required
          rows={6}
          placeholder={t.projectPlaceholder}
          className="placeholder:text-(--color-muted) rounded-md border border-(--color-line) bg-(--color-paper) px-3 py-2 text-(--color-ink) outline-none focus:border-(--color-accent)"
        />
      </div>
      <Field label={t.website} name="website" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-(--color-ink) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent) disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && <p className="text-sm text-(--color-accent)">{t.error}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs uppercase tracking-wider text-(--color-faint)">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-(--color-line) bg-(--color-paper) px-3 py-2 text-(--color-ink) outline-none focus:border-(--color-accent)"
      />
    </div>
  );
}
