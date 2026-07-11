import styles from "./HamburgerMenu.module.scss";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  controlsId?: string;
}

export default function HamburgerMenu({
  isOpen,
  onToggle,
  controlsId = "main-nav",
}: HamburgerMenuProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${isOpen ? styles.buttonOpen : ""}`}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={controlsId}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
