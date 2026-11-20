"use client";

import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { generateKeyBetween } from "fractional-indexing";
import Button from "@/components/Button/Button";
import { db } from "@/lib/firebase";
import type { ItemFormData, ItemFormProps } from "@/types/item-form";
import styles from "./ItemForm.module.scss";

const TipTapEditor = dynamic(() => import("./TipTapEditor"), {
  ssr: false,
  loading: () => <div className={styles.loading} aria-hidden />,
});

const emptyForm: ItemFormData = {
  tag: "",
  title: "",
  description: "",
  year: "",
  link: "",
  background: "",
};

function isDescriptionEmpty(html: string): boolean {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0;
}

function toFormState(data?: ItemFormProps["initialData"]): ItemFormData {
  if (!data) return emptyForm;
  return {
    tag: data.tag ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    year: String(data.year ?? ""),
    link: data.link ?? "",
    background: data.background ?? "",
  };
}

export default function ItemForm({
  initialData = null,
  topOrder = null,
  onClose,
}: ItemFormProps) {
  // Parent remounts this form with key={id|"new"} so initialData is applied cleanly
  const [form, setForm] = useState<ItemFormData>(() => toFormState(initialData));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  const isEdit = Boolean(initialData?.id);
  const descriptionInitial =
    initialData?.description || form.description || "";

  function updateField<K extends keyof ItemFormData>(
    key: K,
    value: ItemFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.tag.trim() || !form.title.trim()) {
      setError("Tag and title are required.");
      return;
    }

    if (isDescriptionEmpty(form.description)) {
      setError("Description is required.");
      return;
    }

    if (!form.year.trim()) {
      setError("Year is required.");
      return;
    }

    if (!form.link.trim() || !form.background.trim()) {
      setError("Link and background are required.");
      return;
    }

    const yearNum = Number(form.year.trim());
    const data = {
      tag: form.tag.trim(),
      title: form.title.trim(),
      description: form.description,
      // number so Firestore orderBy("year") sorts correctly
      year: Number.isFinite(yearNum) ? yearNum : form.year.trim(),
      link: form.link.trim(),
      background: form.background.trim(),
    };

    setSubmitting(true);

    try {
      if (initialData?.id) {
        await updateDoc(doc(db, "projects", initialData.id), {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "projects"), {
          ...data,
          // New projects land at the top of the manual order
          order: generateKeyBetween(null, topOrder),
          createdAt: serverTimestamp(),
        });
      }

      setForm(emptyForm);
      setEditorKey((key) => key + 1);
      onClose?.();
    } catch {
      setError("Failed to save project. Check Firestore rules and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.modeLabel}>
        {isEdit ? "Edit project" : "New project"}
      </p>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Tag</span>
          <input
            className={styles.input}
            type="text"
            name="tag"
            value={form.tag}
            onChange={(e) => updateField("tag", e.target.value)}
            required
            placeholder="SaaS"
            disabled={submitting}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Year</span>
          <input
            className={styles.input}
            type="number"
            name="year"
            min={1990}
            max={2100}
            value={form.year}
            onChange={(e) => updateField("year", e.target.value)}
            required
            placeholder="2026"
            disabled={submitting}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Title</span>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          placeholder="Project title"
          disabled={submitting}
        />
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Description</span>
        <TipTapEditor
          key={editorKey}
          initialValue={descriptionInitial}
          onChange={(html) => updateField("description", html)}
        />
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Link</span>
        <input
          className={styles.input}
          type="text"
          name="link"
          value={form.link}
          onChange={(e) => updateField("link", e.target.value)}
          required
          placeholder="https://example.com or /path"
          disabled={submitting}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Background</span>
        <input
          className={styles.input}
          type="text"
          name="background"
          value={form.background}
          onChange={(e) => updateField("background", e.target.value)}
          required
          placeholder="#161A24 or /assets/image.jpg"
          disabled={submitting}
        />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Saving…"
            : isEdit
              ? "Update project"
              : "Save project"}
        </Button>
        {onClose && (
          <Button
            type="button"
            variant="secondary"
            disabled={submitting}
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
