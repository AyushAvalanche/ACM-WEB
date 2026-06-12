"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Globe,
  GitBranch,
  Shield,
  Microscope,
  Wifi,
} from "lucide-react";
import { techNodes } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  Cpu,
  Globe,
  GitBranch,
  Shield,
  Microscope,
  Wifi,
};

export function TechUniverse() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,85,164,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
            ACM Digital Universe
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Technology Ecosystem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            Seven domains of computing excellence orbiting our chapter&apos;s mission
            to advance technology education and research.
          </p>
        </FadeIn>

        <div className="relative mx-auto aspect-square max-w-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-acm-blue/20 ring-2 ring-acm-blue/40">
              <span className="text-lg font-bold text-white">ACM</span>
            </div>
          </div>

          {techNodes.map((node, i) => {
            const angle = (i / techNodes.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 42;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            const Icon = iconMap[node.icon] || Brain;

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 60 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  whileHover={{ scale: 1.15 }}
                  className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10"
                  style={{ boxShadow: `0 0 20px ${node.color}20` }}
                >
                  <Icon size={22} className="text-white/80" />
                </motion.button>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-0 left-1/2 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl"
              >
                {(() => {
                  const node = techNodes.find((n) => n.id === active);
                  if (!node) return null;
                  return (
                    <>
                      <p className="font-semibold text-white">{node.label}</p>
                      <p className="mt-1 text-sm text-white/50">{node.description}</p>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
