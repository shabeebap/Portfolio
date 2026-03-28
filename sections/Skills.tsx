"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "AI & Modern Web",
    highlight: true,
    skills: [
      "Prompt Engineering",
      "OpenAI API",
      "Agentic Workflows",
      "LLM Integration",
    ],
  },
  {
    title: "Frontend Engineering",
    highlight: false,
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "TypeScript",
      "Javascript",
    ],
  },
  {
    title: "Backend Core",
    highlight: false,
    skills: ["Node.js", "Express", "REST APIs", "MongoDB", "Databases"],
  },
];

// Provides pseudo-random vertical spacing to break the harsh grid alignment
const organicOffsets = [
  "translate-y-0",
  "translate-y-3",
  "-translate-y-4",
  "translate-y-6",
  "-translate-y-2",
  "translate-y-1",
  "-translate-y-5",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 bg-background overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide shadow-[0_0_15px_-3px_rgba(250,204,21,0.2)]">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Core Competencies
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Arsenal</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title} className="flex flex-col items-center">
              {/* Category Title */}
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "text-sm font-black tracking-[0.25em] uppercase mb-12 text-center",
                  category.highlight ? "text-accent drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" : "text-foreground/40"
                )}
              >
                {category.title}
              </motion.h3>

              {/* Skills Cloud */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-12 max-w-5xl">
                {category.skills.map((skill, index) => {
                  const isHighlight = category.highlight;
                  // Base animation timing variations
                  const floatDuration = 3 + (index % 3);
                  const floatDelay = (index % 4) * 0.4;
                  const offsetClass = organicOffsets[index % organicOffsets.length];

                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={cn("relative z-20", offsetClass)}
                    >
                      <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                          duration: floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: floatDelay,
                        }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.15,
                            rotate: index % 2 === 0 ? 3 : -3,
                            y: -5,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                          }}
                          className={cn(
                            "relative flex items-center justify-center cursor-crosshair rounded-full backdrop-blur-md transition-all duration-300",
                            isHighlight
                              ? "px-8 py-4 md:px-10 md:py-5 text-xl md:text-3xl font-black bg-accent/10 border-2 border-accent/50 text-accent shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_50px_rgba(250,204,21,0.6)]"
                              : "px-6 py-3 md:px-8 md:py-4 text-base md:text-xl font-bold bg-foreground/[0.03] border border-foreground/10 text-foreground/80 hover:bg-foreground/10 hover:border-foreground/30 hover:text-foreground shadow-xl hover:shadow-2xl"
                          )}
                        >
                          {skill}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
