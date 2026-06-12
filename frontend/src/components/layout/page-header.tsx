"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function PageHeader({
  label,
  title,
  description,
  align = "left",
}: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/[0.04] pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 grid-animated opacity-25" />
      {/* Noise overlay */}
      <div className="noise pointer-events-none absolute inset-0" />
      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <motion.div style={{ opacity, y }} className="container-wide relative">
        <FadeIn
          className={
            align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
          }
        >
          <div
            className={`mb-6 flex items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
            <SectionLabel>{label}</SectionLabel>
            {align === "center" && (
              <div className="h-px w-8 bg-gradient-to-l from-acm-blue to-transparent" />
            )}
          </div>
          <h1 className="display-xl gradient-text">{title}</h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-white/40">
              {description}
            </p>
          )}
        </FadeIn>
      </motion.div>
    </section>
  );
}
