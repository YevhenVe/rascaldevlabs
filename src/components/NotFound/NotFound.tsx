"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { fadeUp, stagger } from "@/lib/motion";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgMesh} />
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Error 404</Eyebrow>
          </motion.div>

          <motion.p className={styles.code} variants={fadeUp} aria-hidden="true">
            404
          </motion.p>

          <motion.div variants={fadeUp}>
            <SectionHeading id="not-found-title" as="h1">
              This page went{" "}
              <SectionHeadingAccent>offline</SectionHeadingAccent>
            </SectionHeading>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.descWrap}>
            <SectionLead>
              The route you asked for doesn&apos;t exist — or it moved. Head
              home, browse projects, or drop a message if something should be
              here.
            </SectionLead>
          </motion.div>

          <motion.div className={styles.actions} variants={fadeUp}>
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </motion.div>

          <motion.ul className={styles.links} variants={fadeUp}>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/contact">Contacts</Link>
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
