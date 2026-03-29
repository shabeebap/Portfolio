"use client";

import { useEffect, useState, useRef } from "react";

interface UseInViewOptions {
  threshold?: number | number[];
  triggerOnce?: boolean;
  rootMargin?: string;
}

/**
 * A reusable hook for triggering performant animations when an element enters the viewport.
 * Uses the native Intersection Observer API with automatic cleanup.
 */
export function useInViewAnimation<T extends Element = HTMLDivElement>({
  threshold = 0,
  triggerOnce = true,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Use IntersectionObserver to track if the element has crossed the threshold/margin
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // If triggerOnce is enabled, disconnect observer once the element has appeared
          if (triggerOnce) {
            observer.disconnect();
          }
        } else {
          // Allow element to fade back out if triggerOnce is false
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      // Clean up the observer aggressively on unmount boundary
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isInView };
}
