import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { getAllSiteLinks } from "@/lib/site-links";
import styles from "./sitemap.module.scss";

export const metadata: Metadata = {
  title: "Sitemap | Rascal Dev Labs",
  description:
    "All pages on Rascal Dev Labs — home, about, projects, contact, and more.",
};

export default function SitemapPage() {
  const links = getAllSiteLinks();

  return (
    <main>
      <Section variant="page" aria-labelledby="sitemap-title">
        <Eyebrow>Sitemap</Eyebrow>
        <SectionHeading id="sitemap-title" as="h1">
          All <SectionHeadingAccent>pages</SectionHeadingAccent>
        </SectionHeading>
        <div className={styles.leadWrap}>
          <SectionLead>
            Complete list of public pages on this site. Use these links to
            navigate or for SEO and crawl discovery.
          </SectionLead>
        </div>

        <ul className={styles.list}>
          {links.map(({ href, label, description }) => (
            <li key={href} className={styles.item}>
              <Link href={href} className={styles.link}>
                <span className={styles.linkLabel}>{label}</span>
                <span className={styles.linkPath}>{href}</span>
                {description && (
                  <span className={styles.linkDesc}>{description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
