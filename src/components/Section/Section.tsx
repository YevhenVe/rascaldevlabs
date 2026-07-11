import type { ReactNode } from "react";
import styles from "./Section.module.scss";

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: "home" | "page";
  className?: string;
  "aria-labelledby"?: string;
};

export default function Section({
  children,
  id,
  variant = "home",
  className = "",
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${variant === "page" ? styles.page : ""} ${className}`.trim()}
      aria-labelledby={ariaLabelledby}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
