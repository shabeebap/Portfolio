"use client";

import { useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { cn } from "@/lib/utils";

interface CounterProps {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ from, to, prefix = "", suffix = "", duration = 2 }: CounterProps) => {
  const { ref: nodeRef, isInView } = useInViewAnimation<HTMLSpanElement>({ triggerOnce: true, rootMargin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, prefix, suffix, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}{from}{suffix}
    </span>
  );
};

const impactData = [
  {
    title: "Incident Response",
    metric: <AnimatedCounter from={12} to={4} prefix="12 → " suffix="m" />,
    description: "Drastically reduced MTTA/MTTR.",
    highlight: true,
  },
  {
    title: "Troubleshooting",
    metric: <AnimatedCounter from={0} to={25} prefix="↓" suffix="%" />,
    description: "~18+ hrs/week saved on routine debugging.",
  },
  {
    title: "Monitoring Overhead",
    metric: <AnimatedCounter from={0} to={40} prefix="↓30 –" suffix="%" />,
    description: "Streamlined operational observation.",
  },
  {
    title: "Developer Velocity",
    metric: <AnimatedCounter from={0} to={20} prefix="↑" suffix="%" />,
    description: "Accelerated deployments and throughput.",
  },
];

export function Impact() {
  const { ref: headerRef, isInView: isHeaderInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-100px" });
  const { ref: gridRef, isInView: isGridInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-50px" });

  return (
    <section id="impact" className="relative py-32 bg-background overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px]  blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI-Driven Improvements
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Measurable <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Impact</span>
          </h2>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Tangible outcomes achieved through the strategic implementation of
            AI-assisted workflows, optimized systems, and scalable architecture.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={cn(
                "group relative p-8 rounded-3xl border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-foreground/[0.04] hover:border-accent/40 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.25)]",
                item.highlight ? "border-accent/20 bg-accent/[0.03]" : ""
              )}
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <h3 className="text-foreground/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                    {item.title}
                  </h3>
                  <div className={cn(
                    "text-5xl md:text-6xl font-black tracking-tighter drop-shadow-sm",
                    item.highlight ? "text-accent" : "text-foreground"
                  )}>
                    {item.metric}
                  </div>
                </div>
                <p className="text-foreground/80 font-medium text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
