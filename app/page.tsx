import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { Skills } from "../sections/Skills";
import { Experience } from "../sections/Experience";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-accent/30">
      <Hero />
      <Impact />
      <Skills />
      <Experience />
    </main>
  );
}
