import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  href,
}: ButtonProps) {
  const classNames = [
    styles.button,
    variant === "secondary" ? styles.secondary : styles.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const label = <span className={styles.label}>{children}</span>;

  if (href) {
    return (
      <Link href={href} className={classNames} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
