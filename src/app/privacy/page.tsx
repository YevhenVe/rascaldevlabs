import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/LegalDocument/LegalDocument";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Rascal Dev Labs",
  description:
    "How Rascal Dev Labs collects, uses and protects personal data submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      id="privacy-title"
      eyebrow="Legal"
      title="Privacy"
      accent="Policy"
      lastUpdated={LEGAL.lastUpdated}
    >
      <p>
        This Privacy Policy explains how {LEGAL.company} (&quot;we&quot;,
        &quot;us&quot;) handles personal data when you visit{" "}
        {LEGAL.siteName} or contact us through it. We collect as little as
        possible: there is no advertising, no analytics and no tracking on this
        site.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>
          <strong>Contact form.</strong> When you send a message we receive your
          first and last name, email address, subject and message.
        </li>
        <li>
          <strong>Technical data.</strong> Like any website, our hosting
          provider may automatically log your IP address, browser type and the
          pages you request, for security and to keep the site running.
        </li>
        <li>
          <strong>Local preferences.</strong> A cookie and browser storage keep
          your light/dark theme choice and remember that you closed the cookie
          notice. They contain no personal information.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        We use contact form data only to read and reply to your message and,
        if you ask, to discuss or provide our services. We never sell your
        data or use it for marketing without your permission. Technical data is
        used only to operate and secure the site.
      </p>
      <p>
        If you are in the EU/EEA or the UK, our legal basis is our legitimate
        interest in responding to enquiries and taking steps at your request
        before entering into a contract (GDPR Art. 6(1)(b) and (f)).
      </p>

      <h2>3. Who we share it with</h2>
      <p>
        We rely on a small number of service providers who process data on our
        behalf:
      </p>
      <ul>
        <li>
          <strong>Google (Google Forms)</strong> stores contact form
          submissions.
        </li>
        <li>
          <strong>Google Firebase</strong> stores the project content shown on
          this site and handles administrator sign-in.
        </li>
        <li>
          <strong>Our hosting provider</strong> serves the website and keeps
          server logs.
        </li>
      </ul>
      <p>
        These providers may process data in the United States and other
        countries. We may also disclose data if required by law.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We only use cookies and browser storage that are strictly necessary
        for the site to work as you expect (your theme preference and the
        cookie notice). We do not use analytics, advertising or third-party
        tracking cookies. Fonts are served from our own domain.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep contact messages for as long as needed to handle your request
        and our ongoing communication, and delete them within{" "}
        {LEGAL.retention} after our last contact unless we need them for a
        contract or legal obligation. Server logs are kept according to our
        hosting provider&apos;s standard retention.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live (for example under the GDPR or US state
        privacy laws such as the CCPA), you may have the right to access,
        correct, delete or receive a copy of your personal data, and to object
        to or restrict its processing. To make a request, contact us through
        the <Link href="/contact">contact form</Link>. We will respond within 30
        days. EU/EEA and UK residents may also complain to their local data
        protection authority.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reputable providers and encrypted connections (HTTPS) to protect
        your data. No method of transmission or storage is completely secure,
        but we take reasonable measures to keep your information safe.
      </p>

      <h2>8. Children</h2>
      <p>
        This site is not directed at children under 16, and we do not
        knowingly collect their personal data.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy from time to time. The &quot;Last
        updated&quot; date at the top shows when it last changed.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this policy or your data? Reach {LEGAL.company} through
        the <Link href="/contact">contact form</Link>.
      </p>
    </LegalDocument>
  );
}
