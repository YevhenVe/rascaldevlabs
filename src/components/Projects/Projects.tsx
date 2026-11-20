"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/utils/reorder";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge/extract-closest-edge";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import { generateKeyBetween, generateNKeysBetween } from "fractional-indexing";
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
import SortableProjectItem, { isProjectDragData } from "./SortableProjectItem";
import styles from "./Projects.module.scss";

type ProjectItem = ProjectFormData & {
  /** Fractional-index key for manual ordering; null for legacy docs. */
  order: string | null;
};

/**
 * Manual order first (plain code-unit comparison, as fractional-indexing
 * requires — NOT localeCompare). Legacy docs without `order` go last,
 * by year desc then title, until the first drag assigns them a key.
 */
function compareProjects(a: ProjectItem, b: ProjectItem): number {
  if (a.order !== null && b.order !== null) {
    if (a.order !== b.order) return a.order < b.order ? -1 : 1;
    return a.id < b.id ? -1 : 1;
  }
  if (a.order !== null) return -1;
  if (b.order !== null) return 1;

  const yearDiff = (Number(b.year) || 0) - (Number(a.year) || 0);
  return yearDiff || a.title.localeCompare(b.title);
}

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
            order: typeof data.order === "string" ? data.order : null,
          };
        });

        items.sort(compareProjects);

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

  // Reads the latest projectsList without re-subscribing the monitor.
  const moveProject = useEffectEvent(
    async (sourceId: string, targetId: string, edge: Edge | null) => {
      const list = projectsList;
      const startIndex = list.findIndex((p) => p.id === sourceId);
      const targetIndex = list.findIndex((p) => p.id === targetId);
      if (startIndex === -1 || targetIndex === -1) return;

      const placeAfter = edge === "right" || edge === "bottom";
      let finishIndex = targetIndex + (placeAfter ? 1 : 0);
      if (startIndex < finishIndex) finishIndex -= 1;
      if (finishIndex === startIndex) return;

      const reordered = reorder({ list, startIndex, finishIndex });
      const orders = list.map((p) => p.order);
      const needsFullRewrite =
        orders.includes(null) || new Set(orders).size !== orders.length;

      try {
        if (needsFullRewrite) {
          // One-time migration (or duplicate repair): key every project.
          const keys = generateNKeysBetween(null, null, reordered.length);
          const batch = writeBatch(db);
          reordered.forEach((p, i) => {
            batch.update(doc(db, "projects", p.id), { order: keys[i] });
          });
          await batch.commit();
        } else {
          // Normal case: a single write for the moved card only.
          const before = reordered[finishIndex - 1]?.order ?? null;
          const after = reordered[finishIndex + 1]?.order ?? null;
          await updateDoc(doc(db, "projects", sourceId), {
            order: generateKeyBetween(before, after),
          });
        }
      } catch {
        window.alert("Failed to reorder projects. Check Firestore rules.");
      }
    },
  );

  useEffect(() => {
    if (!canEdit) return;

    return monitorForElements({
      canMonitor: ({ source }) => isProjectDragData(source.data),
      onDrop: ({ source, location }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;
        if (!isProjectDragData(source.data) || !isProjectDragData(target.data)) {
          return;
        }
        void moveProject(
          source.data.id,
          target.data.id,
          extractClosestEdge(target.data),
        );
      },
    });
  }, [canEdit]);

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
          topOrder={projectsList[0]?.order ?? null}
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
            <SortableProjectItem
              key={project.id}
              id={project.id}
              title={project.title}
              enabled={canEdit}
              actions={
                <>
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
                </>
              }
            >
              <ProjectCard
                tag={project.tag}
                title={project.title}
                description={project.description}
                year={project.year}
                link={project.link}
                background={project.background}
              />
            </SortableProjectItem>
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
