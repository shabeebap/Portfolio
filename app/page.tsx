import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Resume } from "../sections/Resume";
import { Contact } from "../sections/Contact";
import { AIDemo } from "../sections/AIDemo";
import { Photography } from "../sections/Photography";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-accent/30 overflow-hidden">
      <Hero />
      <Impact />
      <Skills />
      <Experience />
      <Resume />
      <Projects />
      <AIDemo />
      <Photography />
      <Contact />
    </main>
  );
}
