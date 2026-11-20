"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/utils/combine";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge/attach-closest-edge";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge/extract-closest-edge";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import { MdDragIndicator } from "react-icons/md";
import { fadeUp } from "@/lib/motion";
import styles from "./Projects.module.scss";

const PROJECT_DRAG_TYPE = "project-card";

type ProjectDragData = { type: typeof PROJECT_DRAG_TYPE; id: string };

export function isProjectDragData(
  data: Record<string, unknown>,
): data is ProjectDragData {
  return data.type === PROJECT_DRAG_TYPE && typeof data.id === "string";
}

interface SortableProjectItemProps {
  id: string;
  title: string;
  /** Drag & drop + admin actions are only wired up when true. */
  enabled: boolean;
  /** Extra admin buttons rendered next to the drag handle. */
  actions?: ReactNode;
  children: ReactNode;
}

export default function SortableProjectItem({
  id,
  title,
  enabled,
  actions,
  children,
}: SortableProjectItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const element = itemRef.current;
    const dragHandle = handleRef.current;
    if (!enabled || !element || !dragHandle) return;

    const data: ProjectDragData = { type: PROJECT_DRAG_TYPE, id };

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData: () => data,
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) =>
          source.element !== element && isProjectDragData(source.data),
        // Grid wraps across rows, so any edge is valid:
        // top/left = place before this card, bottom/right = place after.
        getData: ({ input }) =>
          attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "right", "bottom", "left"],
          }),
        onDragEnter: ({ self }) => setClosestEdge(extractClosestEdge(self.data)),
        onDrag: ({ self }) => {
          const edge = extractClosestEdge(self.data);
          setClosestEdge((current) => (current === edge ? current : edge));
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [id, enabled]);

  return (
    <motion.li
      ref={itemRef}
      className={`${styles.item} ${isDragging ? styles.itemDragging : ""}`}
      variants={fadeUp}
    >
      <div className={styles.cardWrap}>
        {children}
        {enabled && (
          <div className={styles.adminActions}>
            <button
              ref={handleRef}
              type="button"
              className={styles.dragHandle}
              aria-label={`Drag to reorder ${title}`}
              title="Drag to reorder"
            >
              <MdDragIndicator aria-hidden />
            </button>
            {actions}
          </div>
        )}
      </div>
      {closestEdge && (
        <span className={styles.dropIndicator} data-edge={closestEdge} aria-hidden />
      )}
    </motion.li>
  );
}
