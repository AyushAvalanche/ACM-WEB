"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variantMap: Record<
  RevealVariant,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  up: { from: { opacity: 0, y: 56 }, to: { opacity: 1, y: 0 } },
  down: { from: { opacity: 0, y: -40 }, to: { opacity: 1, y: 0 } },
  left: { from: { opacity: 0, x: -48 }, to: { opacity: 1, x: 0 } },
  right: { from: { opacity: 0, x: 48 }, to: { opacity: 1, x: 0 } },
  scale: { from: { opacity: 0, scale: 0.94 }, to: { opacity: 1, scale: 1 } },
  blur: {
    from: { opacity: 0, y: 32, filter: "blur(10px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 1,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const { from, to } = variantMap[variant];

    const tween = gsap.fromTo(
      el,
      { ...from },
      {
        ...to,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [variant, delay, duration, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
