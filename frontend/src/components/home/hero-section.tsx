"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NetworkCanvas } from "@/components/animations/network-canvas";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Counter } from "@/components/animations/counter";
import { stats } from "@/data/chapter";
import { techNodes } from "@/data/chapter";

const headlineWords = ["BUILDING", "TOMORROW'S", "INNOVATORS"];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-bg pt-28 md:pt-32"
    >
      {/* Network background */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <NetworkCanvas nodeCount={70} />
      </motion.div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_60%_20%,rgba(0,102,255,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(139,92,246,0.04),transparent)]" />

      {/* Animated grid */}
      <div className="pointer-events-none absolute inset-0 grid-animated opacity-30" />

      {/* Noise */}
      <div className="noise pointer-events-none absolute inset-0" />

      {/* Main content */}
      <motion.div
        style={{ opacity: opacityFade, scale: scaleFade }}
        className="container-wide relative z-10 pb-8 md:pb-12"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
            <span className="label text-white/30">
              NMIMS Indore · ACM Student Chapter
            </span>
          </div>
        </motion.div>

        {/* Giant editorial headline */}
        <div className="mb-8 md:mb-12">
          {headlineWords.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%", rotateX: 20 }}
                animate={{ y: "0%", rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="display-hero gradient-text"
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mb-10 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
        >
          Empowering students through innovation, research, collaboration, and
          technology leadership.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="/about" variant="primary">
            Explore Chapter
          </MagneticButton>
          <MagneticButton href="/events" variant="outline">
            View Events
          </MagneticButton>
          <MagneticButton href="/join" variant="ghost">
            Join ACM
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Orbiting tech nodes ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute top-1/2 right-[-5%] hidden -translate-y-1/2 lg:block"
      >
        <div className="relative h-[420px] w-[420px]">
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border border-white/[0.03]" />
          <div className="absolute inset-8 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.05]" />

          {/* Center ACM mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-surface/80 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0,102,255,0.08)",
                  "0 0 60px rgba(0,102,255,0.15)",
                  "0 0 30px rgba(0,102,255,0.08)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-xl font-bold tracking-tight text-white">
                ACM
              </span>
            </motion.div>
          </div>

          {/* Orbiting tech nodes */}
          {techNodes.slice(0, 6).map((node, i) => {
            const angle = (i / 6) * 360;
            const radius = 170;
            return (
              <motion.div
                key={node.id}
                className="absolute left-1/2 top-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    marginLeft: -radius,
                    marginTop: -radius,
                  }}
                >
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
                      top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 30 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-bg/80 backdrop-blur-sm"
                        style={{
                          borderColor: `${node.color}30`,
                          boxShadow: `0 0 20px ${node.color}15`,
                        }}
                      >
                        <span
                          className="text-[8px] font-semibold"
                          style={{ color: node.color }}
                        >
                          {node.label.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="relative z-10 border-t border-white/[0.05]"
      >
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-px md:grid-cols-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.08 }}
                className="py-6 text-center md:py-8"
              >
                <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[10px] tracking-wider text-white/25 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.2em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
