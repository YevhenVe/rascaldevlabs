"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import ItemForm from "@/components/ItemForm/ItemForm";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { fadeUp, stagger } from "@/lib/motion";
import type { ProjectFormData } from "@/types/item-form";
import styles from "./Projects.module.scss";

type ProjectItem = ProjectFormData;

interface ProjectsProps {
  variant?: "home" | "page";
}

export default function Projects({ variant = "home" }: ProjectsProps) {
  const isPage = variant === "page";
  const { user, loading: authLoading } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null,
  );
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const canEdit = isPage && !authLoading && !!user;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const items: ProjectItem[] = snapshot.docs.map((snapshotDoc) => {
          const data = snapshotDoc.data();
          return {
            id: snapshotDoc.id,
            tag: String(data.tag ?? ""),
            title: String(data.title ?? ""),
            description: String(data.description ?? ""),
            year: data.year ?? "",
            link: String(data.link ?? "#"),
            background: String(data.background ?? ""),
          };
        });

        // Newest years first (numeric — works for "2024" and 2024)
        items.sort((a, b) => {
          const yearA = Number(a.year) || 0;
          const yearB = Number(b.year) || 0;
          if (yearB !== yearA) return yearB - yearA;
          return a.title.localeCompare(b.title);
        });

        setProjectsList(isPage ? items : items.slice(0, 3));
        setIsLoading(false);
      },
      () => {
        setProjectsList([]);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [isPage]);

  function closeForm() {
    setFormOpen(false);
    setEditingProject(null);
  }

  function handleEdit(project: ProjectItem) {
    setEditingProject(project);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      if (editingProject?.id === id) {
        closeForm();
      }
    } catch {
      window.alert("Failed to delete project. Check Firestore rules.");
    }
  }

  return (
    <Section id="projects" variant={variant} aria-labelledby="projects-title">
      {canEdit && (
        <div className={styles.formToggle}>
          <Button
            type="button"
            variant={formOpen ? "secondary" : "primary"}
            onClick={() => {
              if (formOpen) {
                closeForm();
              } else {
                setEditingProject(null);
                setFormOpen(true);
              }
            }}
          >
            {formOpen
              ? "Hide editor"
              : editingProject
                ? "Edit project"
                : "Show editor"}
          </Button>
        </div>
      )}

      {canEdit && formOpen && (
        <ItemForm
          key={editingProject?.id ?? "new"}
          initialData={editingProject}
          onClose={closeForm}
        />
      )}

      <motion.div
        className={styles.header}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Selected work</Eyebrow>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionHeading id="projects-title">
            {isPage ? (
              <>
                All <SectionHeadingAccent>projects</SectionHeadingAccent>
              </>
            ) : (
              <>
                Recent <SectionHeadingAccent>projects</SectionHeadingAccent>
              </>
            )}
          </SectionHeading>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionLead>
            {isPage
              ? "A full list of shipped and in-progress work — from product UIs to full-stack JAMstack builds."
              : "A snapshot of recent builds. Three latest pieces."}
          </SectionLead>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <p className={styles.loadingStatus}>Loading projects…</p>
      ) : projectsList.length === 0 ? (
        <p className={styles.loadingStatus}>No projects yet.</p>
      ) : (
        <motion.ul
          className={`${styles.grid} ${isPage ? styles.gridPage : styles.gridHome}`}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {projectsList.map((project) => (
            <motion.li key={project.id} className={styles.item} variants={fadeUp}>
              <div className={styles.cardWrap}>
                <ProjectCard
                  tag={project.tag}
                  title={project.title}
                  description={project.description}
                  year={project.year}
                  link={project.link}
                  background={project.background}
                />
                {canEdit && (
                  <div className={styles.adminActions}>
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {!isPage && (
        <motion.div
          className={styles.actions}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Button href="/projects" variant="secondary">
            View all projects
          </Button>
        </motion.div>
      )}
    </Section>
  );
}
