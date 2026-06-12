"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { teamMembers } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";

const previewMembers = teamMembers.filter((m) => m.department !== "faculty").slice(0, 5);

export function TeamSection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
            Leadership Network
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The People Behind ACM
          </h2>
        </FadeIn>

        <div className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6">
          {previewMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="group relative"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 transition-all duration-300 group-hover:border-acm-blue group-hover:shadow-lg group-hover:shadow-acm-blue/20">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="pointer-events-none absolute -bottom-2 left-1/2 w-48 -translate-x-1/2 translate-y-full rounded-xl border border-white/10 bg-charcoal/95 p-3 text-center opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                <p className="text-sm font-bold text-white">{member.name}</p>
                <p className="text-xs text-cyan">{member.position}</p>
                <div className="mt-2 flex justify-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="rounded-md bg-white/5 p-1.5 text-white/60 hover:text-white"
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      className="rounded-md bg-white/5 p-1.5 text-white/60 hover:text-white"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Meet the Full Team
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
