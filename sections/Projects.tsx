"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const projects = [
  {
    title: "AI Resolution Engine",
    description: "An automated troubleshooting agent built with Next.js and OpenAI that interprets server logs to suggest fixes, reducing debugging time significantly.",
    github: "https://github.com/shabeebap/ai-resolution-engine",
    tags: ["Next.js", "OpenAI", "Tailwind CSS"],
  },
  {
    title: "Minimalist Portfolio",
    description: "A highly interactive, developer-centric portfolio featuring advanced Framer Motion physics, minimalist glassmorphic design, and optimized responsive layouts.",
    github: "https://github.com/shabeebap/portfolio",
    tags: ["React", "Framer Motion", "TypeScript"],
  },
  {
    title: "Enterprise Dashboard",
    description: "A comprehensive real-time monitoring dashboard with zero-latency state management, optimized for tracking massive high-frequency data streams.",
    github: "https://github.com/shabeebap/enterprise-dashboard",
    tags: ["React Query", "Node.js", "WebSockets"],
  },
];

export function Projects() {
  const { ref: headerRef, isInView: isHeaderInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-100px" });
  const { ref: gridRef, isInView: isGridInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-50px" });

  return (
    <section id="work" className="relative py-16 md:py-32 bg-background overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-sm bg-accent rotate-45" />
            Selected Works
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col justify-between p-8 h-full rounded-3xl border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm overflow-hidden hover:bg-foreground/[0.04] hover:border-accent/40 hover:shadow-[0_15px_40px_-15px_rgba(var(--accent),0.25)] transition-all duration-300"
            >
              {/* Card internal glowing gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-all duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-foreground/40 hover:text-accent hover:scale-110 transition-all duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub className="w-7 h-7" />
                  </a>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6 border-t border-foreground/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold tracking-wider uppercase text-accent bg-accent/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
