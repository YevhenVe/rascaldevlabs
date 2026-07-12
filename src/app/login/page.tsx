"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import styles from "./login.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/admin");
    }
  }, [authLoading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || user) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>
          {user ? "Redirecting…" : "Loading…"}
        </p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Admin</p>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.lead}>
          Restricted area for the site owner. Enter your credentials to continue.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
}
