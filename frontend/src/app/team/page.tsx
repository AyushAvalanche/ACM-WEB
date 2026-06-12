"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { teamMembers } from "@/data/chapter";

const members = [...teamMembers].sort((a, b) => a.order - b.order);

const memberGradients = [
  "radial-gradient(ellipse at 30% 70%, rgba(0,102,255,0.08), transparent 60%)",
  "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.08), transparent 60%)",
  "radial-gradient(ellipse at 50% 50%, rgba(6,214,160,0.06), transparent 60%)",
  "radial-gradient(ellipse at 20% 40%, rgba(236,72,153,0.06), transparent 60%)",
  "radial-gradient(ellipse at 80% 60%, rgba(59,130,246,0.07), transparent 60%)",
  "radial-gradient(ellipse at 40% 80%, rgba(0,102,255,0.06), transparent 60%)",
  "radial-gradient(ellipse at 60% 20%, rgba(139,92,246,0.06), transparent 60%)",
  "radial-gradient(ellipse at 30% 50%, rgba(6,214,160,0.05), transparent 60%)",
  "radial-gradient(ellipse at 70% 70%, rgba(236,72,153,0.05), transparent 60%)",
  "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.06), transparent 60%)",
];

const deptLabels: Record<string, string> = {
  faculty: "Faculty Coordinator",
  leadership: "Executive Committee",
  technical: "Technical Team",
  design: "Design Team",
  events: "Event Team",
  operations: "Operations",
};

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".team-member-section");

      // Small delay ensures layout is completely rendered before triggers are created
      setTimeout(() => {
        sections.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveIndex(i);
            },
          });
        });
        ScrollTrigger.refresh();
      }, 50);
    });

    return () => {
      mm.revert();
    };
  }, []);

  const activeMember = members[activeIndex];

  return (
    <>
      {/* Hero header */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-bg pb-16 md:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-animated opacity-20" />
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

        <div className="container-wide relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
            <span className="label text-white/25">The Team</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-hero gradient-text"
            >
              TEN MINDS
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-hero gradient-text"
            >
              ONE MISSION
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-lg text-lg text-white/35"
          >
            Faculty guidance, executive leadership, and specialized teams
            powering NMIMS Indore ACM.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex gap-12"
          >
            {[
              { val: "10", label: "Team Members" },
              { val: "6", label: "Departments" },
              { val: "2+", label: "Years Strong" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {s.val}
                </p>
                <p className="mt-1 text-xs text-white/20">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scroll-shift team showcase */}
      <section ref={containerRef} className="relative bg-bg">
        {/* Full-screen sticky background gradient */}
        <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
          <div className="sticky top-0 h-screen w-full">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
                style={{ background: memberGradients[activeIndex] }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row w-full">
          {/* Scrolling name panels (left side) */}
          <div className="w-full lg:w-[50%]">
          {members.map((member, i) => (
            <div
              key={member.id}
              className="team-member-section flex h-auto lg:min-h-screen items-center border-b border-white/[0.02] lg:border-none"
            >
              <div className="container-wide py-12 lg:py-0">
                {/* Mobile image */}
                <div className="mb-6 lg:hidden">
                  <div className="relative aspect-[4/5] w-48 overflow-hidden rounded-2xl border border-white/[0.06] shadow-lg">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                  </div>
                </div>

                {/* Index number */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="mb-4 block text-sm text-white/15"
                >
                  {String(i + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
                </motion.span>

                {/* Department label */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${(i * 36) % 360}, 60%, 55%)`,
                      boxShadow: `0 0 8px hsla(${(i * 36) % 360}, 60%, 55%, 0.4)`,
                    }}
                  />
                  <span className="label text-white/25">
                    {deptLabels[member.department] ?? member.department}
                  </span>
                </motion.div>

                {/* Name — oversized */}
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                  >
                    {member.name}
                  </motion.h2>
                </div>

                {/* Position */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="mt-3 text-xl text-white/40 md:text-2xl"
                >
                  {member.position}
                </motion.p>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="mt-6 max-w-md text-base leading-relaxed text-white/30"
                >
                  {member.bio}
                </motion.p>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="mt-8 flex gap-3"
                >
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-xs text-white/30 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/60"
                      data-cursor-hover
                    >
                      <LinkedinIcon size={14} /> LinkedIn
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-xs text-white/30 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/60"
                      data-cursor-hover
                    >
                      <GithubIcon size={14} /> GitHub
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          ))}
          </div>

          {/* Sticky image panel (right side on desktop) */}
          <div className="hidden lg:block lg:w-[50%] pointer-events-none">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
              <div className="relative mr-[14%] w-[26%] min-w-[280px] aspect-[3/4] pointer-events-auto">
                <AnimatePresence>
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl"
                  >
                    <Image
                      src={activeMember.photo}
                      alt={activeMember.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Member index */}
                <AnimatePresence>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -left-12 bottom-6"
                  >
                    <span className="text-6xl font-bold tracking-tight text-white/[0.03]">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
