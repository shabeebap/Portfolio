"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaRegCopy, FaCheck, FaEnvelope } from "react-icons/fa";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "shabeebapshebi@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/shabeebap", icon: FaGithub },
    { name: "LinkedIn", href: "https://linkedin.com/in/shabeeb-ap", icon: FaLinkedin },
    { name: "Instagram", href: "https://instagram.com/shabeeb_ap", icon: FaInstagram },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-32 bg-background flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-t-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 md:mb-8 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Let's Talk
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-foreground tracking-tighter mb-4 md:mb-6 px-4">
            Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">extraordinary?</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed px-4">
            I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
            {/* Interactive Copy Email Button */}
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Copy email address to clipboard"
              className="group relative flex items-center justify-between gap-3 md:gap-6 px-4 py-3 md:px-8 md:py-5 w-full max-w-[320px] md:max-w-[340px] bg-foreground/[0.03] border border-white/5 backdrop-blur-md rounded-full cursor-pointer hover:bg-foreground/[0.06] hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent),0.25)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300 flex-shrink-0">
                  <FaEnvelope className="w-3 h-3 md:w-4 md:h-4" />
                </div>
                <span className="text-sm md:text-xl font-bold tracking-wide text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                  {email}
                </span>
              </div>

              <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-foreground/5 text-foreground/50 group-hover:text-accent transition-colors duration-300 overflow-hidden relative flex-shrink-0">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 flex items-center justify-center text-green-500"
                    >
                      <FaCheck className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaRegCopy className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Social Links Row */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow me on ${social.name}`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground/[0.02] border border-foreground/5 text-foreground/60 hover:bg-accent hover:border-transparent hover:text-background hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Very bottom simple footer text */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-foreground/30 text-xs tracking-widest uppercase px-4">
        © {new Date().getFullYear()} Shabeeb AP. All rights reserved.
      </div>
    </section>
  );
}