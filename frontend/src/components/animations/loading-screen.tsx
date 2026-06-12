"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => onComplete(), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (phase < 1) return;
    const target = phase >= 3 ? 100 : phase >= 2 ? 80 : 40;
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= target) {
          clearInterval(interval);
          return target;
        }
        return c + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.6 : 0 }}
          transition={{ duration: 1.5 }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,102,255,0.08), transparent 60%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* ACM Logo with SVG draw-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Orbital rings */}
          <motion.div
            className="absolute inset-[-24px] rounded-full border border-white/[0.04]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase >= 2 ? 1 : 0.5,
              opacity: phase >= 2 ? 1 : 0,
              rotate: 360,
            }}
            transition={{
              scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
          <motion.div
            className="absolute inset-[-40px] rounded-full border border-white/[0.03]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase >= 2 ? 1 : 0.5,
              opacity: phase >= 2 ? 1 : 0,
              rotate: -360,
            }}
            transition={{
              scale: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Orbiting dots */}
          {phase >= 2 && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 90}deg) translateX(34px) translateY(-50%)`,
                    background:
                      i % 2 === 0
                        ? "rgba(0,102,255,0.8)"
                        : "rgba(139,92,246,0.8)",
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 12px rgba(0,102,255,0.4)"
                        : "0 0 12px rgba(139,92,246,0.4)",
                  }}
                />
              ))}
            </>
          )}

          {/* Core logo */}
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-surface"
            animate={{
              boxShadow:
                phase >= 2
                  ? "0 0 60px rgba(0,102,255,0.15), 0 0 120px rgba(0,102,255,0.05)"
                  : "0 0 0px transparent",
            }}
            transition={{ duration: 1.5 }}
          >
            <motion.span
              className="text-base font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ACM
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="relative h-[1px] w-32 overflow-hidden bg-white/[0.06]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-white to-purple-400"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Counter */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[10px] tabular-nums tracking-[0.25em] text-white/30">
            {String(count).padStart(3, "0")}
          </span>
        </motion.div>

        {/* Chapter name */}
        <motion.p
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{
            opacity: phase >= 3 ? 1 : 0,
            y: phase >= 3 ? 0 : 8,
            filter: phase >= 3 ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.25em] text-white/25 uppercase"
        >
          NMIMS Indore
        </motion.p>
      </div>
    </motion.div>
  );
}
