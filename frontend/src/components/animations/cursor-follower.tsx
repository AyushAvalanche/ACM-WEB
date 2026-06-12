"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleEnter = () => setIsHidden(false);
    const handleLeave = () => setIsHidden(true);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  if (isTouch) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
      >
        <motion.div
          className="mix-blend-difference rounded-full"
          animate={{
            x: "-50%",
            y: "-50%",
            width: isHovering ? 48 : 8,
            height: isHovering ? 48 : 8,
            opacity: isHidden ? 0 : 1,
            backgroundColor: isHovering
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(255, 255, 255, 1)",
            border: isHovering
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "0px solid transparent",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 150, mass: 0.8 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 150, mass: 0.8 }),
        }}
      >
        <motion.div
          className="rounded-full border border-white/10"
          animate={{
            x: "-50%",
            y: "-50%",
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            opacity: isHidden ? 0 : 0.3,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
