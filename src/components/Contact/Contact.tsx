"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm/ContactForm";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Section from "@/components/Section/Section";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { fadeUp, stagger } from "@/lib/motion";
import styles from "./Contact.module.scss";

interface ContactProps {
  variant?: "home" | "page";
}

export default function Contact({ variant = "home" }: ContactProps) {
  return (
    <Section id="contact" variant={variant} aria-labelledby="contact-title">
      <motion.div
        className={styles.layout}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className={styles.copyCol}>
          <motion.div variants={fadeUp}>
            <Eyebrow>Get in touch</Eyebrow>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="contact-title">
              Let&apos;s work{" "}
              <SectionHeadingAccent>together</SectionHeadingAccent>
            </SectionHeading>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.leadWrap}>
            <SectionLead>
              Have a project in mind, or just want to explore fit? Drop a few
              details in the form — name, how to reach you, and what you need.
              No agency runaround: one person reads it and replies.
            </SectionLead>
          </motion.div>

          <motion.div className={styles.thanks} variants={fadeUp}>
            <p className={styles.thanksTitle}>Thanks for your interest</p>
            <p className={styles.thanksText}>
              I&apos;ll get back to you personally — usually within 1–2 business
              days. I read every message, even if the timing isn&apos;t right
              for a build right now. Looking forward to hearing what
              you&apos;re working on.
            </p>
          </motion.div>
        </div>

        <motion.div className={styles.formCol} variants={fadeUp}>
          <div className={styles.formShell}>
            <ContactForm />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
