"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import { projects } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";

const featured = projects.filter((p) => p.featured);

export function ProjectsSection() {
  return (
    <section className="border-t border-white/10 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
              Project Showcase
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built by Our Community
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm font-medium text-acm-blue hover:text-cyan"
          >
            All projects <ArrowRight size={16} />
          </Link>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:shadow-xl hover:shadow-acm-blue/5">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.banner}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/50">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-1 text-xs text-white/50 hover:text-white"
                      >
                        <GithubIcon size={14} /> Repo
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="flex items-center gap-1 text-xs text-white/50 hover:text-white"
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
  );
}
