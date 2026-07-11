import projectsData from "@/data/projects.json";

export type Project = {
  id: string;
  tag: string;
  title: string;
  description: string;
  year: number;
  link: string;
  background: string;
};

const projects = projectsData as Project[];

/** All projects, newest year first (title as stable tiebreaker). */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

/** Newest N projects from the same sorted source. */
export function getRecentProjects(limit = 3): Project[] {
  return getProjects().slice(0, limit);
}
