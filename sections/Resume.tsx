"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function Resume() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <section id="resume" className="relative py-32 bg-background overflow-hidden font-sans">
      {/* Decorative Blur Geometry */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Text Content */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Curriculum Vitae
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Resume</span>.
          </h2>
          
          <p className="text-foreground/70 leading-relaxed text-lg mb-8 max-w-lg mx-auto md:mx-0">
            A comprehensive overview of my professional experience, technical skills, and educational background. Feel free to preview it here or download a copy for your records.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-accent text-background font-bold tracking-widest uppercase rounded-full hover:scale-105 hover:shadow-[0_8px_20px_rgba(var(--accent),0.4)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </button>
            <a
              href="/resume.pdf"
              download="Shabeeb_AP_Resume.pdf"
              className="w-full sm:w-auto px-8 py-3.5 bg-foreground/5 text-foreground font-bold tracking-widest uppercase rounded-full border border-foreground/10 hover:bg-foreground/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* Floating Document Thumbnail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative w-full md:w-1/2 flex justify-center perspective-[1000px]"
        >
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group relative w-[250px] sm:w-[300px] aspect-[1/1.414] bg-foreground/[0.03] backdrop-blur-md border border-foreground/10 rounded-2xl shadow-2xl cursor-pointer hover:border-accent/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(var(--accent),0.15)] flex flex-col overflow-hidden"
          >
            {/* Glossy top edge reflection */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Document Header lines */}
            <div className="w-full h-16 bg-foreground/5 flex items-end px-6 pb-4 border-b border-foreground/5">
              <div className="w-1/3 h-2 bg-foreground/20 rounded-full" />
            </div>

            {/* Document Body lines */}
            <div className="flex-1 p-6 space-y-6">
              <div className="space-y-3">
                <div className="w-full h-2 bg-foreground/10 rounded-full" />
                <div className="w-5/6 h-2 bg-foreground/10 rounded-full" />
                <div className="w-4/6 h-2 bg-foreground/10 rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="w-3/4 h-2 bg-accent/30 rounded-full" />
                <div className="w-full h-2 bg-foreground/10 rounded-full" />
                <div className="w-5/6 h-2 bg-foreground/10 rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="w-full h-2 bg-foreground/10 rounded-full" />
                <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
              </div>
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-accent text-background px-6 py-3 rounded-full font-bold tracking-widest text-sm uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View PDF
              </div>
            </div>
          </div>

          {/* Abstract floating circles behind document */}
          <div className="absolute top-10 right-10 md:right-20 w-16 h-16 rounded-full border border-accent/20 blur-[1px] -z-10 animate-pulse" />
          <div className="absolute bottom-10 left-10 md:left-20 w-24 h-24 rounded-full border border-foreground/10 blur-[2px] -z-10 animate-pulse delay-75" />
        </motion.div>
      </div>

      {/* Fullscreen PDF Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 md:p-12"
          >
            {/* Background Esc Hitbox */}
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

            {/* Modal Iframe Wrapper */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-background border border-foreground/10 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Modal Top Bar */}
              <div className="w-full h-14 bg-foreground/[0.02] border-b border-foreground/5 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-foreground/50">resume.pdf</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-foreground/50 hover:text-foreground hover:bg-foreground/5 p-1.5 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Native PDF Viewer */}
              <div className="flex-1 w-full bg-white relative">
                <iframe 
                  src="/resume.pdf" 
                  className="absolute inset-0 w-full h-full border-0"
                  title="Shabeeb AP Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
