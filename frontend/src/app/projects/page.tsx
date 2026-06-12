"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { GithubIcon } from "@/components/icons/social";
import { projects } from "@/data/chapter";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: (ProjectCategory | "All")[] = [
  "All", "AI/ML", "Web Development", "Mobile Development",
  "Open Source", "IoT", "Research",
];

export default function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => category === "All" || p.category === category);
  }, [category]);

  return (
    <>
      <PageHeader
        label="Projects"
        title="Engineering our community builds"
        description="Open source tools, research systems, and products built by chapter members."
      />

      <section className="relative py-20 md:py-28">
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="container-wide relative">
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300",
                  category === c
                    ? "border-white bg-white text-bg shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    : "border-white/[0.06] text-white/25 hover:border-white/[0.1] hover:text-white/50"
                )}
                data-cursor-hover
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-0 border-t border-white/[0.04]">
            {filtered.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.05}>
                <div
                  className="group grid gap-8 border-b border-white/[0.04] py-10 transition-all duration-500 hover:bg-white/[0.01] md:grid-cols-12 md:items-center"
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="md:col-span-1">
                    <span className="text-2xl font-bold text-white/[0.06]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <p className="label mb-2">{project.category}</p>
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/30">{project.description}</p>
                  </div>
                  <div className="hidden md:col-span-4 md:block">
                    <motion.div
                      className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.04]"
                      animate={{
                        opacity: hovered === project.id ? 1 : 0,
                        scale: hovered === project.id ? 1 : 0.95,
                        filter: hovered === project.id ? "blur(0px)" : "blur(6px)",
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={project.banner}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-3 md:items-end">
                    <div className="flex flex-wrap gap-1.5 md:justify-end">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[10px] text-white/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="flex items-center gap-1.5 text-xs text-white/20 transition-colors hover:text-white/50"
                          data-cursor-hover
                        >
                          <GithubIcon size={14} /> Repo
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          className="flex items-center gap-1.5 text-xs text-white/20 transition-colors hover:text-white/50"
                          data-cursor-hover
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
