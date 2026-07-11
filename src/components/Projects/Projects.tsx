"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { fadeUp, stagger } from "@/lib/motion";
import { getProjects, getRecentProjects } from "@/lib/projects";
import styles from "./Projects.module.scss";

interface ProjectsProps {
  variant?: "home" | "page";
}

export default function Projects({ variant = "home" }: ProjectsProps) {
  const isPage = variant === "page";
  const projects = isPage ? getProjects() : getRecentProjects(3);

  return (
    <Section id="projects" variant={variant} aria-labelledby="projects-title">
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
              : "A snapshot of recent builds. Three latest pieces, sorted by year."}
          </SectionLead>
        </motion.div>
      </motion.div>

      <motion.ul
        className={`${styles.grid} ${isPage ? styles.gridPage : styles.gridHome}`}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {projects.map((project) => (
          <motion.li key={project.id} className={styles.item} variants={fadeUp}>
            <ProjectCard
              tag={project.tag}
              title={project.title}
              description={project.description}
              year={project.year}
              link={project.link}
              background={project.background}
            />
          </motion.li>
        ))}
      </motion.ul>

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
