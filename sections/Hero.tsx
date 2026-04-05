"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ThemeToggle } from '../components/ThemeToggle';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.includes('.pdf') ? "_blank" : undefined}
    rel={href.includes('.pdf') ? "noopener noreferrer" : undefined}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export function Hero() {
  const logoText = "shabeeb.";
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'WORK', href: '#work' },
    { label: 'RESUME', href: '#resume' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const mainText = "4+ years building scalable, user-centric applications with AI-assisted workflows.";

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/shabeebap' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/shabeeb-ap' },
    // { icon: FaTwitter, href: 'https://twitter.com/shabeeb_ap' },
    { icon: FaInstagram, href: 'https://instagram.com/shabeeb_ap' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-4 font-sans md:px-12'
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between pt-12 md:pt-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          {logoText}
        </motion.div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <ThemeToggle />
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden p-2 z-50 relative"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-5 bg-foreground"></span>
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm md:hidden"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-12 right-6 p-2 text-foreground"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold tracking-widest text-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 gap-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left pt-8 md:pt-0"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          <a href="#contact" className="mt-8 inline-block px-8 py-3 text-sm font-extrabold tracking-widest text-background bg-accent rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] transition-all duration-300 uppercase">
            Contact Me
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full min-h-[40vh] md:min-h-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-accent md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"
          ></motion.div>
          <motion.img
            src="/profile.png"
            alt="Shabeeb AP"
            className="absolute bottom-[-2rem] md:bottom-[-3rem] left-1/6 -translate-x-1/2 z-10 h-[55vh] sm:h-[70vh] md:h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale contrast-100 pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start md:-ml-8 lg:-ml-12 pt-6 md:pt-0"
        >
          <h1 className="text-6xl font-extrabold text-foreground md:text-7xl lg:text-8xl tracking-tighter">
            Shabeeb
            <br />
            AP.
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between pb-8 md:pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80 tracking-widest uppercase"
        >
          Software Developer
        </motion.div>
      </footer>
    </div>
  );
}
