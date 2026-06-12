"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";

const hubs = [
  {
    href: "/about",
    label: "About",
    desc: "Our mission, vision, and chapter story",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    href: "/gallery",
    label: "Gallery",
    desc: "Digital archive of every moment",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    href: "/team",
    label: "Team",
    desc: "Leadership and the people behind ACM",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    href: "/projects",
    label: "Projects",
    desc: "Open source and research builds",
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    href: "/join",
    label: "Recruitment",
    desc: "Become a member of the chapter",
    accent: true,
    gradient: "from-white/5 to-transparent",
  },
];

export function QuickAccess() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.04] bg-surface py-24 md:py-32">
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="container-wide relative">
        <Reveal variant="blur" className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-accent-purple to-transparent" />
            <span className="label text-white/25">Explore</span>
          </div>
          <h2 className="display-lg gradient-text">Enter the ecosystem</h2>
        </Reveal>

        <StaggerReveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((hub, i) => (
            <Link
              key={hub.href}
              href={hub.href}
              className={`group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                hub.accent
                  ? "border-white/[0.15] bg-white text-bg hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                  : "border-white/[0.04] bg-bg hover:border-white/[0.08] hover:bg-surface-elevated"
              } ${i >= 3 ? "lg:col-span-1 sm:col-span-1" : ""}`}
              data-cursor-hover
            >
              {/* Hover gradient */}
              {!hub.accent && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${hub.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
              )}

              <div className="relative">
                <motion.p
                  className={`text-2xl font-semibold tracking-tight ${
                    hub.accent ? "text-bg" : "text-white"
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {hub.label}
                </motion.p>
                <p
                  className={`mt-2 text-sm ${
                    hub.accent ? "text-bg/50" : "text-white/30"
                  }`}
                >
                  {hub.desc}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className={`relative mt-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                  hub.accent ? "text-bg/30" : "text-white/15 group-hover:text-white/30"
                }`}
              />
            </Link>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
