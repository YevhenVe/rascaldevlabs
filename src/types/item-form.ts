export interface ItemFormData {
  tag: string;
  title: string;
  description: string;
  year: string;
  link: string;
  background: string;
}

/** Project from Firestore including document id (edit mode). */
export interface ProjectFormData extends ItemFormData {
  id: string;
}

export interface ItemFormProps {
  initialData?: ProjectFormData | null;
  /** `order` key of the first project; a new project is placed before it. */
  topOrder?: string | null;
  onClose?: () => void;
}

export interface TipTapEditorProps {
  onChange: (html: string) => void;
  initialValue?: string;
}
