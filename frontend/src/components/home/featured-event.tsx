"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredEvents } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";
import { Counter } from "@/components/animations/counter";

const event = featuredEvents[0];

export function FeaturedEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="container-wide">
        {/* Section header */}
        <Reveal variant="up" className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
            <span className="label text-white/25">Featured Event</span>
          </div>
          <h2 className="display-lg gradient-text max-w-3xl">
            {event.title}
          </h2>
        </Reveal>

        {/* Full-width event showcase */}
        <Reveal variant="scale" delay={0.1}>
          <Link href={`/events/${event.slug}`} className="group block" data-cursor-hover>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-surface/30 md:bg-transparent">
              {/* Image with parallax */}
              <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden">
                <motion.div
                  style={{ y: imageY, scale: imageScale }}
                  className="absolute inset-0 -top-[10%] h-[120%]"
                >
                  <Image
                    src={event.banner}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-transparent hidden md:block" />
              </div>

              {/* Info overlay */}
              <div className="relative md:absolute right-0 bottom-0 left-0 p-6 md:p-14 bg-gradient-to-t from-bg/95 to-bg/40 md:from-transparent md:to-transparent">
                <div className="grid gap-6 md:gap-8 md:grid-cols-12 md:items-end">
                  <div className="md:col-span-7">
                    <p className="label mb-2 md:mb-3 text-white/30">{event.category}</p>
                    <p className="max-w-xl text-sm md:text-lg leading-relaxed text-white/60">
                      {event.description}. A defining moment for our chapter —
                      bringing together innovators, mentors, and builders.
                    </p>
                  </div>
                  <div className="flex gap-8 md:gap-12 md:col-span-5 md:justify-end">
                    <div>
                      <p className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                        <Counter value={event.participationCount} suffix="+" />
                      </p>
                      <p className="mt-1 text-xs text-white/25">Participants</p>
                    </div>
                    <div>
                      <p className="text-sm md:text-lg font-medium text-white/70">
                        {formatDate(event.date)}
                      </p>
                      <p className="mt-1 text-xs text-white/25">Event Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
