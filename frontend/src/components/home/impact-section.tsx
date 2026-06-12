"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";

export function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/[0.04] bg-bg py-32 md:py-44"
    >
      {/* Background gradient mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,102,255,0.04),transparent)]" />
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="container-wide relative">
        <Reveal variant="blur" className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-white/10" />
            <span className="label text-white/25">Chapter Impact</span>
            <div className="h-px w-6 bg-white/10" />
          </div>

          <motion.h2
            style={{ y: textY }}
            className="display-xl gradient-text"
          >
            Two years of
            <br />
            measurable excellence
          </motion.h2>
        </Reveal>
      </div>
    </section>
  );
}
