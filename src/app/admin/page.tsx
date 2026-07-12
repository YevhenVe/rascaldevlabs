"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import styles from "./admin.module.scss";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin</p>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.meta}>Signed in as {user?.email}</p>
        </div>
        <Button type="button" variant="secondary" onClick={handleLogout}>
          Sign out
        </Button>
      </header>

      <section className={styles.panel}>
        <p className={styles.panelText}>
          Protected admin area. Anyone signed in with Firebase Auth can open
          this zone — create only your account in the Firebase console.
        </p>
      </section>
    </main>
  );
}
