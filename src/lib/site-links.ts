/** Shared site routes — header, footer, HTML sitemap (SEO). */

export type SiteLink = {
  href: string;
  label: string;
  description?: string;
};

/** Primary navigation */
export const navLinks: SiteLink[] = [
  {
    href: "/about",
    label: "About",
    description: "Solo full-stack studio and delivery process",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Selected JAMstack and product work",
  },
  {
    href: "/contact",
    label: "Contacts",
    description: "Get in touch — leave a message",
  },
];

/** Extra indexable pages (footer + sitemap) */
export const extraLinks: SiteLink[] = [
  {
    href: "/",
    label: "Home",
    description: "Rascal Dev Labs — solo product studio",
  },
  {
    href: "/sitemap",
    label: "Sitemap",
    description: "All pages on this website",
  },
];

/** Legal pages (footer + sitemap) */
export const legalLinks: SiteLink[] = [
  {
    href: "/privacy",
    label: "Privacy Policy",
    description: "How contact form and site data are handled",
  },
  {
    href: "/terms",
    label: "Terms of Use",
    description: "Rules for using this website",
  },
];

/** Full list for sitemap page (home first, then nav, then extras without dupes) */
export function getAllSiteLinks(): SiteLink[] {
  const byHref = new Map<string, SiteLink>();
  for (const link of [
    { href: "/", label: "Home", description: "Rascal Dev Labs — solo product studio" },
    ...navLinks,
    ...extraLinks.filter((l) => l.href !== "/"),
    ...legalLinks,
  ]) {
    byHref.set(link.href, link);
  }
  return Array.from(byHref.values());
}
