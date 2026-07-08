import Container from "@/components/Container/Container";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <h1 className={styles.title}>Rascal Dev Labs</h1>
        <p className={styles.description}>
          Get started by editing <code>src/app/page.tsx</code>
        </p>
      </main>
    </Container>
  );
}
