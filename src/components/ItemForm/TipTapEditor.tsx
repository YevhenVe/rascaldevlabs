"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { TipTapEditorProps } from "@/types/item-form";
import styles from "./TipTapEditor.module.scss";

export default function TipTapEditor({
  onChange,
  initialValue = "",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.toolBtn} ${editor.isActive("bold") ? styles.toolBtnActive : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          Bold
        </button>
        <button
          type="button"
          className={`${styles.toolBtn} ${editor.isActive("italic") ? styles.toolBtnActive : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          Italic
        </button>
        <button
          type="button"
          className={`${styles.toolBtn} ${editor.isActive("bulletList") ? styles.toolBtnActive : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          Bullet List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
