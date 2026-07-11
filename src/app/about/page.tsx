import type { Metadata } from "next";
import About from "@/components/About/About";

export const metadata: Metadata = {
  title: "About | Rascal Dev Labs",
  description:
    "Solo full-stack studio: UI/UX to production — React, Next.js, Firebase, Supabase, MongoDB Atlas, Git, Docker, Vercel.",
};

export default function AboutPage() {
  return (
    <main>
      <About variant="page" />
    </main>
  );
}
