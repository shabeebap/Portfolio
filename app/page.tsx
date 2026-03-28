import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Contact } from "../sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-accent/30 overflow-hidden">
      <Hero />
      <Projects />
      <Impact />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
