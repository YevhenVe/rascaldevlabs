import type { ElementType, ReactNode } from "react";
import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "hero" | "section";
};

export function SectionHeadingAccent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`${styles.accent} ${className}`.trim()}>{children}</span>
  );
}

export function SectionLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`${styles.lead} ${className}`.trim()}>{children}</p>
  );
}

export default function SectionHeading({
  children,
  id,
  as = "h2",
  className = "",
  size = "section",
}: SectionHeadingProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      id={id}
      className={`${styles.heading} ${size === "hero" ? styles.hero : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
