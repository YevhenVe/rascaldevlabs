import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
} from "@/components/SectionHeading/SectionHeading";
import styles from "./LegalDocument.module.scss";

interface LegalDocumentProps {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  /** Human-readable date, e.g. "November 24, 2026". */
  lastUpdated: string;
  children: ReactNode;
}

/** Shared layout for long-form legal pages (Privacy Policy, Terms of Use). */
export default function LegalDocument({
  id,
  eyebrow,
  title,
  accent,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <main>
      <Section variant="page" aria-labelledby={id}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading id={id} as="h1">
          {title} <SectionHeadingAccent>{accent}</SectionHeadingAccent>
        </SectionHeading>
        <p className={styles.updated}>Last updated: {lastUpdated}</p>
        <article className={styles.prose}>{children}</article>
      </Section>
    </main>
  );
}
