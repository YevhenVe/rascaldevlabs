"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_ENTRIES,
} from "@/lib/contact";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const body = new URLSearchParams();
    body.append(
      GOOGLE_FORM_ENTRIES.firstName,
      String(data.get("firstName") ?? "").trim(),
    );
    body.append(
      GOOGLE_FORM_ENTRIES.lastName,
      String(data.get("lastName") ?? "").trim(),
    );
    body.append(
      GOOGLE_FORM_ENTRIES.email,
      String(data.get("email") ?? "").trim(),
    );
    body.append(
      GOOGLE_FORM_ENTRIES.subject,
      String(data.get("subject") ?? "").trim(),
    );
    body.append(
      GOOGLE_FORM_ENTRIES.message,
      String(data.get("message") ?? "").trim(),
    );

    setStatus("submitting");

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      // no-cors → opaque response; treat as success if request completed
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <p className={styles.successTitle}>Message sent</p>
        <p className={styles.successText}>
          Thanks for reaching out — I&apos;ll get back to you personally,
          usually within 1–2 business days.
        </p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>First name</span>
          <input
            className={styles.input}
            suppressHydrationWarning
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            disabled={status === "submitting"}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Last name</span>
          <input
            className={styles.input}
            suppressHydrationWarning
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            disabled={status === "submitting"}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          suppressHydrationWarning
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "submitting"}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Subject</span>
        <input
          className={styles.input}
          suppressHydrationWarning
          type="text"
          name="subject"
          required
          disabled={status === "submitting"}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          required
          disabled={status === "submitting"}
        />
      </label>

      {status === "error" && (
        <p className={styles.error} role="alert">
          Something went wrong. Please try again in a moment.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>

      <p className={styles.notice}>
        By sending this form you agree to the processing of your data as
        described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
