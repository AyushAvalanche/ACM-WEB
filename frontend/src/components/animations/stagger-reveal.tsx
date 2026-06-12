"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  childSelector?: string;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  childSelector = ":scope > *",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(childSelector);
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [stagger, childSelector]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
