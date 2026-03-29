"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer circle (instant follow)
  const circleX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const circleY = useSpring(mouseY, { stiffness: 1000, damping: 40 });

  // Inner dot (delayed follow as requested)
  const dotX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const dotY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only show custom cursor on screens that support hover (not mobile touch devices)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, mounted]);

  // Don't render cursor shell on server or before hydration completes
  if (!mounted) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor on devices that don't rely entirely on touch */
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer Circle Component */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground/30 pointer-events-none z-[9999]"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner Dot Component (Delayed, Accent Color) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(250,204,21,0.8)] pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
