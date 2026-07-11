import Image from "next/image";
import Link from "next/link";
import styles from "./BrandLogo.module.scss";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md";
  onClick?: () => void;
  priority?: boolean;
  className?: string;
};

const sizes = {
  sm: 40,
  md: 52,
} as const;

export default function BrandLogo({
  href = "/",
  size = "md",
  onClick,
  priority = false,
  className = "",
}: BrandLogoProps) {
  const px = sizes[size];

  return (
    <Link
      href={href}
      className={`${styles.logo} ${styles[size]} ${className}`.trim()}
      aria-label="Rascal Dev Labs home"
      onClick={onClick}
    >
      <Image
        src="/assets/logo.svg"
        alt=""
        width={px}
        height={px}
        className={styles.image}
        priority={priority}
      />
      <span className={styles.text}>
        <span>Rascal Dev</span>
        <span>Labs</span>
      </span>
    </Link>
  );
}
