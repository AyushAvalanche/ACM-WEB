"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { achievements } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { LinkArrow } from "@/components/ui/link-arrow";

const spotlight = achievements.slice(0, 4);

const categoryColors: Record<string, string> = {
  hackathon: "rgba(0,102,255,0.5)",
  publication: "rgba(6,214,160,0.5)",
  award: "rgba(139,92,246,0.5)",
  certification: "rgba(236,72,153,0.5)",
  milestone: "rgba(59,130,246,0.5)",
};

export function AchievementSpotlight() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="container-wide">
        <Reveal
          variant="up"
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-accent-cyan to-transparent" />
              <span className="label text-white/25">Achievements</span>
            </div>
            <h2 className="display-lg gradient-text">Excellence in action</h2>
          </div>
          <LinkArrow href="/achievements">View achievements</LinkArrow>
        </Reveal>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 hidden w-px md:block">
            <div className="h-full w-full bg-gradient-to-b from-white/[0.06] via-acm-blue/20 to-white/[0.06]" />
          </div>

          <StaggerReveal className="space-y-0">
            {spotlight.map((item, i) => (
              <Link
                key={item.id}
                href="/achievements"
                className="group relative grid gap-4 border-b border-white/[0.04] py-8 transition-all duration-500 hover:bg-white/[0.01] md:grid-cols-12 md:gap-8 md:py-10 md:pl-8"
                data-cursor-hover
              >
                {/* Glow dot on timeline */}
                <div className="absolute left-[-4px] top-[2.5rem] hidden md:block">
                  <motion.div
                    className="h-[7px] w-[7px] rounded-full"
                    style={{
                      backgroundColor: categoryColors[item.category] || "rgba(255,255,255,0.3)",
                      boxShadow: `0 0 12px ${categoryColors[item.category] || "rgba(255,255,255,0.2)"}`,
                    }}
                    whileInView={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>

                <div className="md:col-span-2">
                  <span className="text-sm text-white/20">{formatDate(item.date)}</span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-xl font-medium tracking-tight text-white transition-colors group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center md:col-span-3 md:justify-end">
                  <motion.span
                    className="rounded-full border border-white/[0.06] px-3 py-1 text-[10px] font-medium tracking-widest text-white/25 uppercase"
                    whileHover={{ x: 4, borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    {item.category}
                  </motion.span>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
