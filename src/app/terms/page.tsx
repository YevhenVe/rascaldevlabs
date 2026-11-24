import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/LegalDocument/LegalDocument";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use | Rascal Dev Labs",
  description: "Terms that apply to using the Rascal Dev Labs website.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      id="terms-title"
      eyebrow="Legal"
      title="Terms of"
      accent="Use"
      lastUpdated={LEGAL.lastUpdated}
    >
      <p>
        These Terms of Use apply to your use of {LEGAL.siteName}, operated by{" "}
        {LEGAL.company} (&quot;we&quot;, &quot;us&quot;). By using the site you
        agree to these terms. If you do not agree, please do not use it.
      </p>

      <h2>1. About this site</h2>
      <p>
        This website presents our studio, our work and a way to get in touch.
        Nothing on it is a binding offer. Any services we provide are governed
        by a separate written agreement, which takes precedence over these
        terms.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        Unless stated otherwise, the site&apos;s design, text, graphics, logos
        and code are owned by {LEGAL.company} or used with permission. Projects
        shown in the portfolio may belong to our clients and are displayed with
        their permission. You may view and share links to the site, but you may
        not copy, reproduce or reuse its content for commercial purposes
        without our written consent.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site for anything unlawful or fraudulent;</li>
        <li>
          attempt to gain unauthorized access to the site, its admin area or
          its infrastructure;
        </li>
        <li>
          send spam, malware or abusive content through the contact form;
        </li>
        <li>
          scrape or overload the site in a way that disrupts it for others.
        </li>
      </ul>

      <h2>4. Messages you send</h2>
      <p>
        When you contact us, you confirm that the information you provide is
        accurate and that you have the right to share it. How we handle that
        information is described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>5. External links</h2>
      <p>
        The site may link to third-party websites, including live client
        projects. We are not responsible for their content, availability or
        privacy practices.
      </p>

      <h2>6. Disclaimer</h2>
      <p>
        The site and its content are provided &quot;as is&quot; and &quot;as
        available&quot;, without warranties of any kind. We do our best to keep
        information accurate and the site available, but we do not guarantee
        that it is error-free or uninterrupted.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {LEGAL.company} is not liable
        for any indirect, incidental or consequential damages arising from your
        use of the site. Nothing in these terms limits liability that cannot be
        limited by law.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of {LEGAL.governingLaw}, without
        regard to conflict-of-law rules. If you are a consumer, you also keep
        any protections granted by the law of your country of residence.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update these terms from time to time. The &quot;Last
        updated&quot; date at the top shows when they last changed, and
        continued use of the site means you accept the updated terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Reach us through the{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalDocument>
  );
}
