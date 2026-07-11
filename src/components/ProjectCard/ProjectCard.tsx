import Link from "next/link";
import styles from "./ProjectCard.module.scss";

export interface ProjectCardProps {
  tag: string;
  title: string;
  description: string;
  year: number | string;
  link: string;
  background: string;
  className?: string;
}

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function ProjectCard({
  tag,
  title,
  description,
  year,
  link,
  background,
  className = "",
}: ProjectCardProps) {
  const classNames = `${styles.card} ${className}`.trim();
  const style = {
    ["--card-bg" as string]: `url(${JSON.stringify(background).slice(1, -1)})`,
  };

  const content = (
    <>
      <div className={styles.media} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.top}>
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.year}>{year}</span>
      </div>
    </>
  );

  if (isExternalLink(link)) {
    return (
      <a
        href={link}
        className={classNames}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} (opens in new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={link}
      className={classNames}
      style={style}
      aria-label={title}
    >
      {content}
    </Link>
  );
}
