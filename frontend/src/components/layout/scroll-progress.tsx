"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(0,102,255,0.6), rgba(139,92,246,0.8), rgba(6,214,160,0.6))",
        boxShadow: "0 0 12px rgba(0,102,255,0.3), 0 0 24px rgba(139,92,246,0.15)",
      }}
      aria-hidden="true"
    />
  );
}
