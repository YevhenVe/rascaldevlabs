"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { fadeUp, stagger } from "@/lib/motion";
import styles from "./About.module.scss";

/** Real delivery path: discovery → design → build → data → ship */
const processSteps = [
  {
    step: "01",
    title: "Scope & structure",
    text: "Goals, pages, user flows, and content model. What ships first, what waits, and how success is measured.",
  },
  {
    step: "02",
    title: "UI / UX",
    text: "Information architecture, layouts, and a clear visual system — so the product is usable before a line of production code is locked in.",
  },
  {
    step: "03",
    title: "Frontend build",
    text: "React interfaces on Next.js: App Router, components, forms, routing, and performance-minded rendering (static, SSR, or hybrid where it fits).",
  },
  {
    step: "04",
    title: "Data & backend",
    text: "Auth and APIs wired to the right store: Firebase or Supabase when BaaS fits, MongoDB Atlas when you need a flexible document database — not every tool at once.",
  },
  {
    step: "05",
    title: "Git & Docker",
    text: "Git for history, branches, and reviewable changes. Docker so local/dev environments stay reproducible and match how the project is meant to run.",
  },
  {
    step: "06",
    title: "Deploy on Vercel",
    text: "Repo connected to Vercel: preview deploys per branch, production on main, HTTPS and CDN by default — then iterate from real URLs, not only localhost.",
  },
] as const;

interface AboutProps {
  variant?: "home" | "page";
}

export default function About({ variant = "home" }: AboutProps) {
  const isPage = variant === "page";

  return (
    <Section id="about" variant={variant} aria-labelledby="about-title">
      <motion.div
        className={styles.layout}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className={styles.intro}>
          <motion.div variants={fadeUp}>
            <Eyebrow>About Rascal Dev Labs</Eyebrow>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="about-title">
              From UI/UX to a live site —{" "}
              <SectionHeadingAccent>end to end</SectionHeadingAccent>
            </SectionHeading>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.leadWrap}>
            <SectionLead>
              Rascal Dev Labs is a solo full-stack studio: one developer who
              takes a product from design decisions to a production website. You
              work with the same person on structure, interface, code, data, and
              deploy — not a chain of handoffs.
            </SectionLead>
          </motion.div>

          <motion.div className={styles.copy} variants={fadeUp}>
            <p>
              In practice that means starting with how people will use the
              product (flows, screens, hierarchy), then building it in{" "}
              <strong>React</strong> and <strong>Next.js</strong> — the modern
              JAMstack-friendly stack for fast frontends that still need real
              app behavior.
            </p>
            <p>
              The backend is chosen for the job: <strong>Firebase</strong> or{" "}
              <strong>Supabase</strong> when auth, storage, and managed APIs
              speed delivery; <strong>MongoDB Atlas</strong> when the data model
              fits a document database. Everything important lives in{" "}
              <strong>Git</strong>. Local and team-like setups stay consistent
              with <strong>Docker</strong>. Shipping happens on{" "}
              <strong>Vercel</strong> — git push, preview link, then production.
            </p>
            {!isPage && (
              <p>
                Full process — step by step — is on the About page if you want
                the A-to-Z path without the sales fog.
              </p>
            )}
          </motion.div>

          {isPage && (
            <motion.div className={styles.actions} variants={fadeUp}>
              <Button href="/projects">View projects</Button>
              <Button href="/contact" variant="secondary">
                Start a project
              </Button>
            </motion.div>
          )}

          {!isPage && (
            <motion.div className={styles.actions} variants={fadeUp}>
              <Button href="/about" variant="secondary">
                Full process A → Z
              </Button>
            </motion.div>
          )}
        </div>

        <motion.ol
          className={styles.process}
          variants={stagger}
          aria-label="Delivery process"
        >
          {processSteps.map(({ step, title, text }) => (
            <motion.li key={step} className={styles.step} variants={fadeUp}>
              <span className={styles.stepNum}>{step}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>

      {isPage && (
        <motion.div
          className={styles.stackNote}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className={styles.stackLabel}>Typical stack</p>
          <p className={styles.stackLine}>
            React · Next.js · Firebase · Supabase · MongoDB Atlas · Git · Docker
            · Vercel
          </p>
          <p className={styles.stackHint}>
            Not every project uses every tool. The stack follows the product: UI
            first, then the lightest reliable backend, then a deploy path you
            can keep shipping on.
          </p>
        </motion.div>
      )}
    </Section>
  );
}
