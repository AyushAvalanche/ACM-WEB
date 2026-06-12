"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/chapter";
import { Reveal } from "@/components/animations/reveal";
import { LinkArrow } from "@/components/ui/link-arrow";

const featured = projects.filter((p) => p.featured);
const primary = featured[0];

export function FeaturedProject() {
  const [active, setActive] = useState(primary.id);
  const current = featured.find((p) => p.id === active) ?? primary;

  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-surface py-24 md:py-32">
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="container-wide relative">
        <Reveal
          variant="blur"
          className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gradient-to-r from-accent-purple to-transparent" />
              <span className="label text-white/25">Featured Project</span>
            </div>
            <h2 className="display-lg gradient-text">Built by our community</h2>
          </div>
          <LinkArrow href="/projects">Explore projects</LinkArrow>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Image panel */}
          <Reveal variant="left" className="lg:col-span-7">
            <div className="image-reveal relative overflow-hidden rounded-2xl border border-white/[0.05] bg-bg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[16/10]"
                >
                  <Image
                    src={current.banner}
                    alt={current.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Details panel */}
          <Reveal
            variant="right"
            delay={0.1}
            className="flex flex-col justify-center lg:col-span-5"
          >
            {/* Project tabs */}
            <div className="mb-8 flex flex-wrap gap-2">
              {featured.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={`rounded-full border px-5 py-2 text-xs font-medium transition-all duration-300 ${
                    active === p.id
                      ? "border-white bg-white text-bg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "border-white/[0.06] text-white/30 hover:border-white/[0.12] hover:text-white/60"
                  }`}
                  data-cursor-hover
                >
                  {p.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="label mb-3">{current.category}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/50">
                  {current.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {current.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
