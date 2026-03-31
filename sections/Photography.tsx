"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { FaInstagram } from "react-icons/fa";

type Category = "All" | "Nature" | "Travel" | "Street";

interface Photo {
  id: string;
  url: string;
  category: Category;
  location: string;
  caption: string;
  width: number;
  height: number;
}

const CATEGORIES: Category[] = ["All", "Nature", "Travel", "Street"];

const getLocationForImage = (index: number) => {
  const imgNum = index + 1;
  if (imgNum >= 1 && imgNum <= 2) return "Calicut, India";
  if (imgNum >= 3 && imgNum <= 5) return "Idukki & Munnar";
  if (imgNum >= 6 && imgNum <= 10) return "Ooty, India";
  if (imgNum >= 11 && imgNum <= 16) return "Saudi Arabia";
  return "Wayanad Tentgram";
};

const getCategoryForImage = (index: number): Category => {
  const imgNum = index + 1;
  if (imgNum >= 11 && imgNum <= 16) return "Street";
  if (imgNum === 2) return "Travel";
  return "Nature";
};

const PHOTOS: Photo[] = Array.from({ length: 19 }).map((_, i) => ({
  id: String(i + 1),
  url: `/travel/img-${i + 1}.jpeg`,
  category: getCategoryForImage(i),
  location: getLocationForImage(i),
  caption: `Wanderlust moments captured in ${getLocationForImage(i)}.`,
  width: i % 3 === 0 ? 800 : 1200,
  height: i % 3 === 0 ? 1200 : 800,
}));

export function Photography() {
  const { ref: headerRef, isInView: isHeaderInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true });

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter photos based on current category selection
  const filteredPhotos = PHOTOS.filter(
    (photo) => activeCategory === "All" || activeCategory === "Travel" || photo.category === activeCategory
  );

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;

    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowRight") {
      setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
    if (e.key === "ArrowLeft") {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    }
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleKeyDown]);

  return (
    <section id="photography" className="relative py-16 md:py-32 bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-sm bg-accent" />
            Visual Diary
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-8">
            Wanderlust & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Captures</span>
          </h2>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null); // Reset lightbox on category change
                }}
                className={`min-w-[44px] min-h-[44px] px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                  ? "bg-accent text-background shadow-lg shadow-accent/20"
                  : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent outline-none"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid Engine */}
        {/* We use columns-1 to columns-3 to let browser automatically stack varying height photos naturally. */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group block w-full overflow-hidden rounded-3xl cursor-pointer bg-foreground/5"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Responsive Image preserving aspect ratio perfectly inside the masonry column */}
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay & Text Reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <p className="text-accent text-sm font-bold tracking-widest uppercase mb-1">
                      📍 {photo.location}
                    </p>
                    <h3 className="text-white text-lg font-medium leading-snug">
                      {photo.caption}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore More Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://instagram.com/shabeeb_ap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-foreground/5 text-foreground font-bold tracking-widest uppercase rounded-full border border-foreground/10 hover:bg-accent hover:text-background hover:border-accent hover:shadow-[0_8px_20px_rgba(var(--accent),0.4)] focus-visible:ring-2 focus-visible:ring-accent outline-none active:scale-95 transition-all duration-300 flex items-center gap-3"
          >
            <FaInstagram className="w-5 h-5" />
            Explore More
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4 md:p-12"
          >
            {/* Close Hitbox (Background) */}
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center pointer-events-none">

              <motion.div
                key={filteredPhotos[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-[70vh] md:h-[80vh] pointer-events-auto shadow-2xl rounded-xl overflow-hidden"
              >
                <Image
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].caption}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </motion.div>

              {/* Lightbox Caption */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center pointer-events-auto"
              >
                <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-2">
                  📍 {filteredPhotos[lightboxIndex].location}
                </p>
                <p className="text-foreground/90 md:text-lg">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
              </motion.div>

              {/* Absolute Navigation Elements */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-0 right-0 md:top-4 md:right-4 w-12 h-12 bg-foreground/10 hover:bg-foreground/20 text-foreground flex items-center justify-center rounded-full backdrop-blur-md transition-colors pointer-events-auto focus-visible:ring-2 focus-visible:ring-accent outline-none"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1)); }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 pointer-events-auto focus-visible:ring-2 focus-visible:ring-accent outline-none"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0)); }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 pointer-events-auto focus-visible:ring-2 focus-visible:ring-accent outline-none"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
