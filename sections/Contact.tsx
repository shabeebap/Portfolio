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
    <section id="contact" className="relative py-32 bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-t-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-8 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Let's Talk
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tighter mb-6">
            Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">extraordinary?</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col items-center gap-12">
            {/* Interactive Copy Email Button */}
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Copy email address to clipboard"
              className="group relative flex items-center justify-between gap-6 px-6 py-4 md:px-8 md:py-5 min-w-[280px] md:min-w-[340px] bg-foreground/[0.03] border border-white/5 backdrop-blur-md rounded-full cursor-pointer hover:bg-foreground/[0.06] hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent),0.25)] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <span className="text-lg md:text-xl font-bold tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
                  {email}
                </span>
              </div>

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 text-foreground/50 group-hover:text-accent transition-colors duration-300 overflow-hidden relative">
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
                      <FaCheck className="w-4 h-4" />
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
                      <FaRegCopy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Social Links Row */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow me on ${social.name}`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground/[0.02] border border-foreground/5 text-foreground/60 hover:bg-accent hover:border-transparent hover:text-background hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] transition-all duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Very bottom simple footer text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-foreground/30 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} Shabeeb AP. All rights reserved.
      </div>
    </section>
  );
}
