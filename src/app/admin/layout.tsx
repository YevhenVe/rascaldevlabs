"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./admin.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (loading || redirected.current) return;
    if (!user) {
      redirected.current = true;
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className={styles.gate}>
        <p className={styles.status}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.gate}>
        <p className={styles.status}>Redirecting to login…</p>
      </div>
    );
  }

  return <div className={styles.shell}>{children}</div>;
}
