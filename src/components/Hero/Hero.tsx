"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiFirebase,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { ChevronDownIcon } from "@/components/Icons/icons";
import SectionHeading, {
  SectionHeadingAccent,
  SectionLead,
} from "@/components/SectionHeading/SectionHeading";
import { fadeUp, fadeUpSmall, stagger, staggerTight } from "@/lib/motion";
import styles from "./Hero.module.scss";

const stack = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Vercel", Icon: SiVercel },
] as const;

function scrollToAbout() {
  document.getElementById("about")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/assets/heroillustrationlight.jpg"
          alt=""
          fill
          priority
          unoptimized
          className={`${styles.bgImage} ${styles.bgImageLight}`}
        />
        <Image
          src="/assets/heroillustrationdark.jpg"
          alt=""
          fill
          priority
          unoptimized
          className={`${styles.bgImage} ${styles.bgImageDark}`}
        />
      </div>
      <div className={styles.bgScrim} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Solo product studio</Eyebrow>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="hero-title" as="h1" size="hero">
              From ideas to{" "}
              <SectionHeadingAccent>flawless</SectionHeadingAccent> execution
            </SectionHeading>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.descWrap}>
            <SectionLead>
              Your dedicated architect for pixels and backend systems. Modern
              web apps, sharp UI, and infrastructure that ships — without the
              agency bloat.
            </SectionLead>
          </motion.div>

          <motion.div className={styles.actions} variants={fadeUp}>
            <Button href="/projects">View projects</Button>
            <Button href="/contact" variant="secondary">
              Let&apos;s talk
            </Button>
          </motion.div>

          <motion.div className={styles.stack} variants={fadeUp}>
            <p className={styles.stackLabel}>Stack I ship with</p>
            <motion.ul
              className={styles.stackList}
              variants={staggerTight}
              initial="hidden"
              animate="show"
            >
              {stack.map(({ name, Icon }) => (
                <motion.li
                  key={name}
                  className={styles.stackItem}
                  variants={fadeUpSmall}
                >
                  <Icon className={styles.stackIcon} aria-hidden />
                  <span>{name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollDownWrap}>
        <motion.button
          type="button"
          className={styles.scrollDown}
          onClick={scrollToAbout}
          aria-label="Scroll to About section"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDownIcon size={22} />
        </motion.button>
      </div>
    </section>
  );
}
