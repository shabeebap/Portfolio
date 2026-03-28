import { Hero } from "../sections/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-accent/30">
      <Hero />
    </main>
  );
}
