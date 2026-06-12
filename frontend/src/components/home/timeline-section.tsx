"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
            Chapter Journey
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Story of Growth
          </h2>
        </FadeIn>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-0 left-6 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-acm-blue to-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <div
                className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden flex-1 md:block" />
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-acm-blue bg-charcoal">
                  <div className="h-3 w-3 rounded-full bg-acm-blue" />
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-cyan">{item.year}</span>
                  <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
