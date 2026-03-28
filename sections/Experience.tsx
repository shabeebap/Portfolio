"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Oligo IT Solutions",
    role: "Software Developer",
    duration: "2024 — Present",
    achievements: [
      "Owned 100% of frontend development for an enterprise-grade server monitoring tool, building a React-based real-time dashboard that cut incident response time from 12 min to 4 min, improving system uptime by 15% and reducing monitoring response times by 30 – 40%.",
      "Built an AI-powered problem resolution system integrated with OpenAI, reducing manual troubleshooting time by 25% and saving 18+ hours per week for the Dubai operations team.",
      "Leveraged AI-powered developer tools to increase development velocity by 20% while reducing post-deployment bugs by 15%."],
  },
  {
    company: "Fegno Technologies",
    role: "React Developer",
    duration: "2023 — 2024",
    achievements: [
      "Developed and maintained scalable, high-performance web applications using React.js and Next.js, improving load times and overall user experience.",
      "Collaborated closely with designers and backend engineers to deliver seamless, responsive, and user-centric UI/UX solutions across multiple projects.",
      "Optimized application performance through code splitting, lazy loading, and efficient state management, while enforcing best practices for clean, maintainable code.",
    ],
  },
  {
    company: "Cabin-4 Professionals",
    role: "Frontend Developer",
    duration: "2021 — 2023",
    achievements: [
      "Developed scalable and responsive web applications using React.js and Next.js, improving page load performance by 25 – 35% and ensuring seamless experience across mobile, tablet, and desktop devices.",
      "Built and deployed cross-platform mobile applications using React Native for iOS and Android, reducing development effort by 40% through shared codebases and accelerating time-to-market.",
      "Implemented reusable components and modular architecture, reducing development time for new features by 20% and improving code maintainability across projects.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 bg-background overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-sm bg-accent rotate-45" />
            Career Trajectory
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto md:px-0">
          {/* The Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent -translate-x-1/2" />

          {/* The Line - Mobile */}
          <div className="block md:hidden absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.company} className="relative flex flex-col md:flex-row items-center w-full min-h-[250px] group">

                  {/* Node/Dot - Desktop */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-accent outline outline-[6px] outline-background -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-transform duration-300 group-hover:scale-125" />

                  {/* Node/Dot - Mobile */}
                  <div className="block md:hidden absolute left-4 top-10 w-5 h-5 rounded-full bg-accent outline outline-[6px] outline-background z-10 shadow-[0_0_20px_rgba(250,204,21,0.5)]" />

                  {/* Left spacer for odd rows (desktop) */}
                  {!isEven && <div className="hidden md:block md:w-1/2" />}

                  {/* Content Card */}
                  <div
                    className={cn(
                      "w-full md:w-1/2",
                      isEven ? "md:pr-12 lg:pr-20" : "md:pl-12 lg:pl-20"
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.15 }}
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="ml-12 md:ml-0 p-8 rounded-3xl border border-white/5 bg-foreground/[0.02] backdrop-blur-sm hover:border-accent/40 transition-all duration-300 hover:shadow-[0_15px_40px_-15px_rgba(250,204,21,0.15)] group-hover:bg-foreground/[0.04]"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-4">
                        <h3 className="text-2xl font-bold text-foreground leading-tight">{exp.role}</h3>
                        <span className="inline-flex w-fit shrink-0 px-3 py-1 text-xs font-bold tracking-widest uppercase text-accent bg-accent/10 rounded-full border border-accent/20">
                          {exp.duration}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-foreground/60 mb-6">{exp.company}</h4>

                      <ul className="space-y-4">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start text-sm md:text-base text-foreground/70 leading-relaxed font-medium">
                            <span className="text-accent mr-3 mt-1.5 text-xs opacity-80">✦</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Right spacer for even rows (desktop) */}
                  {isEven && <div className="hidden md:block md:w-1/2" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
