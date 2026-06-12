"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, GitBranch } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { events } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import type { EventCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: (EventCategory | "All")[] = [
  "All",
  "Workshops",
  "Webinars",
  "Hackathons",
  "Competitions",
  "Guest Talks",
  "Technical Sessions",
  "Research Events",
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [year, setYear] = useState("All");
  const [view, setView] = useState<"grid" | "timeline">("grid");

  const years = useMemo(() => {
    const set = new Set(events.map((e) => new Date(e.date).getFullYear().toString()));
    return ["All", ...Array.from(set).sort().reverse()];
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || e.category === category;
      const matchYear =
        year === "All" || new Date(e.date).getFullYear().toString() === year;
      return matchSearch && matchCategory && matchYear;
    });
  }, [search, category, year]);

  return (
    <>
      <PageHeader
        label="Events"
        title="Every event, meticulously archived"
        description="Workshops, hackathons, guest talks, and technical sessions — searchable and filterable."
      />

      <section className="relative py-20 md:py-28">
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="container-wide relative">
          {/* Filters */}
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <div className="input-underline flex-1">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent px-1 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory | "All")}
                className="rounded-full border border-white/[0.06] bg-transparent px-5 py-2.5 text-sm text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-bg">
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-full border border-white/[0.06] bg-transparent px-5 py-2.5 text-sm text-white focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-bg">
                    {y === "All" ? "All Years" : y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex rounded-full border border-white/[0.06] p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all",
                  view === "grid"
                    ? "bg-white text-bg shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                    : "text-white/30 hover:text-white/60"
                )}
              >
                <LayoutGrid size={14} /> Grid
              </button>
              <button
                type="button"
                onClick={() => setView("timeline")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all",
                  view === "timeline"
                    ? "bg-white text-bg shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                    : "text-white/30 hover:text-white/60"
                )}
              >
                <GitBranch size={14} /> Timeline
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event, i) => (
                <FadeIn key={event.id} delay={i * 0.04}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.04] bg-surface transition-all duration-500 hover:border-white/[0.08]"
                    data-cursor-hover
                  >
                    <div className="image-reveal relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={event.banner}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                    </div>
                    <div className="p-6">
                      <p className="label mb-2">{event.category}</p>
                      <h3 className="text-lg font-medium text-white">{event.title}</h3>
                      <div className="mt-4 flex justify-between text-xs text-white/20">
                        <span>{formatDate(event.date)}</span>
                        <span>{event.participationCount}+ attendees</span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-gradient-to-b from-white/[0.04] via-acm-blue/10 to-white/[0.04] md:block" />
              <div className="space-y-0">
                {filtered.map((event, i) => (
                  <FadeIn key={event.id} delay={i * 0.04}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group grid gap-4 border-t border-white/[0.04] py-8 transition-all duration-300 hover:bg-white/[0.01] md:grid-cols-12 md:gap-8 md:pl-8"
                      data-cursor-hover
                    >
                      <div className="md:col-span-2">
                        <span className="text-sm text-white/20">{formatDate(event.date)}</span>
                      </div>
                      <div className="md:col-span-3">
                        <span className="label">{event.category}</span>
                      </div>
                      <div className="md:col-span-5">
                        <h3 className="text-lg font-medium text-white">{event.title}</h3>
                        <p className="mt-1 text-sm text-white/30 line-clamp-1">
                          {event.description}
                        </p>
                      </div>
                      <div className="text-sm text-white/20 md:col-span-2 md:text-right">
                        {event.participationCount}+ participants
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="py-24 text-center text-white/25">No events match your filters.</p>
          )}
        </div>
      </section>
    </>
  );
}
