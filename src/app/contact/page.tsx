import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contacts | Rascal Dev Labs",
  description:
    "Get in touch with Rascal Dev Labs — leave a message and I’ll get back to you personally.",
};

export default function ContactPage() {
  return (
    <main>
      <Contact variant="page" />
    </main>
  );
}
