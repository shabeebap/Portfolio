"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-foreground/5 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors overflow-hidden border border-foreground/10 focus-visible:ring-2 focus-visible:ring-accent outline-none"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : -40,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute flex items-center justify-center inset-0"
      >
        <Moon className="w-5 h-5 text-accent" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: isDark ? 40 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute flex items-center justify-center inset-0"
      >
        <Sun className="w-5 h-5 text-accent" />
      </motion.div>
    </button>
  );
}
