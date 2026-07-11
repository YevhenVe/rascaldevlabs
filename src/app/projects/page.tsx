import type { Metadata } from "next";
import Projects from "@/components/Projects/Projects";

export const metadata: Metadata = {
  title: "Projects | Rascal Dev Labs",
  description:
    "Selected full-stack and JAMstack projects by Rascal Dev Labs — from UI to production.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects variant="page" />
    </main>
  );
}
