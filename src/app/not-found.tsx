import type { Metadata } from "next";
import NotFound from "@/components/NotFound/NotFound";

export const metadata: Metadata = {
  title: "404 — Page not found | Rascal Dev Labs",
  description: "This page does not exist. Head back to Rascal Dev Labs.",
};

export default function NotFoundPage() {
  return (
    <main>
      <NotFound />
    </main>
  );
}
