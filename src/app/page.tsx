import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About variant="home" />
      <Projects variant="home" />
      <Contact variant="home" />
    </main>
  );
}
