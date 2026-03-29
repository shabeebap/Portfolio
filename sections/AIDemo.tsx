"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
// Falling back to standard SVG strings to avoid missing exports, 
// though lucide-react or react-icons can be injected seamlessly.

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

const PREDEFINED_PROMPTS = [
  "Tell me about Shabeeb",
  "Optimize React code",
  "Explain API design",
  "Debug error",
];

export function AIDemo() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>({ triggerOnce: true, rootMargin: "-100px" });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "ai",
      content: "Hello! I'm Shabeeb's embedded AI Assistant. How can I help you understand his technical stack or optimize your code today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reference for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages update
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();

    const textToSubmit = promptOverride || input;
    if (!textToSubmit.trim() || isLoading) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSubmit.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // 2. Transmit to Hybrid Backend
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textToSubmit }),
      });

      if (!res.ok) throw new Error("API Route failed");

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.response || "No response received.",
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "API connection offline. Shabeeb is probably deploying a new update!",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent bg-accent/10 rounded-full border border-accent/20 mb-6 font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Live Assistant
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">OpenAI</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Test my problem-solving workflows directly in the browser. Ask a technical question or use a quick prompt below.
          </p>
        </div>

        {/* Faux Chat Terminal (Glassmorphic) */}
        <div className="flex flex-col h-[600px] w-full border border-foreground/10 bg-foreground/[0.02] backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === "user"
                      ? "bg-accent text-background rounded-br-sm"
                      : "bg-foreground/5 text-foreground/90 rounded-bl-sm border border-foreground/5"
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-foreground/5 border border-foreground/5 px-4 py-4 rounded-2xl rounded-bl-sm flex gap-2 items-center">
                  <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                  <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-4 flex flex-wrap gap-2 border-t border-foreground/5 bg-foreground/[0.01]">
            {PREDEFINED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSubmit(undefined, prompt)}
                disabled={isLoading}
                className="text-xs md:text-sm px-4 py-2 rounded-full bg-background border border-foreground/10 text-foreground/70 hover:text-accent hover:border-accent/40 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-4 md:p-6 bg-background/50 border-t border-foreground/5 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask me anything..."
              className="flex-1 bg-foreground/5 border border-foreground/10 rounded-full px-6 py-3 md:py-4 text-sm md:text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-accent text-background w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300 flex-shrink-0"
              aria-label="Send message"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
