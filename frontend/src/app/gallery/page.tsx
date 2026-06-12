"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images, FolderOpen, Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/animations/reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { galleryImages, galleryCollections } from "@/data/chapter";
import type { GalleryCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: (GalleryCategory | "All")[] = [
  "All", "Workshops", "Team Meetings", "Technical Events", "Competitions",
  "Guest Sessions", "Celebrations", "Outreach Activities", "Industrial Visits",
  "Research Activities", "Community Events",
];

const years = ["All", "2025", "2024"] as const;

export default function GalleryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<GalleryCategory | "All">("All");
  const [year, setYear] = useState<string>("All");
  const [collection, setCollection] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return galleryImages.filter((img) => {
      const matchSearch =
        img.alt.toLowerCase().includes(search.toLowerCase()) ||
        img.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || img.category === category;
      const matchYear = year === "All" || img.year.toString() === year;
      const matchCollection = !collection || img.collection === collection;
      return matchSearch && matchCategory && matchYear && matchCollection;
    });
  }, [search, category, year, collection]);

  const activeImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev]);

  const layoutSpans = [
    "md:col-span-2 md:row-span-2",
    "", "",
    "md:row-span-2",
    "",
    "md:col-span-2",
    "", "",
    "md:row-span-2",
    "",
  ];

  return (
    <>
      <PageHeader
        label="Media Archive"
        title="Centralized chapter gallery"
        description="Every workshop, competition, and community moment — organized by collection, year, and category."
      />

      {/* Archive stats */}
      <section className="border-b border-white/[0.04] bg-surface">
        <div className="container-wide grid grid-cols-3 gap-4 py-6">
          {[
            { icon: Images, val: galleryImages.length, label: "Photos" },
            { icon: FolderOpen, val: galleryCollections.length, label: "Collections" },
            { icon: Calendar, val: "2", label: "Years Archived" },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 rounded-xl border border-white/[0.04] bg-bg px-4 py-6">
              <Icon size={18} className="text-white/15" />
              <div>
                <p className="text-xl font-semibold text-white">{val}</p>
                <p className="text-xs text-white/20">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="border-b border-white/[0.04] py-20 md:py-24">
        <div className="container-wide mx-auto max-w-5xl">
          <Reveal variant="up" className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
              <SectionLabel>Event Collections</SectionLabel>
            </div>
            <h2 className="display-md gradient-text">Browse by archive</h2>
          </Reveal>

          <StaggerReveal className="grid gap-3 sm:grid-cols-2">
            {galleryCollections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => {
                  setCollection(collection === col.id ? null : col.id);
                  setCategory("All");
                  setYear(col.year.toString());
                }}
                className={cn(
                  "group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-2xl border bg-bg p-6 text-left transition-all duration-500",
                  collection === col.id
                    ? "border-white/[0.15] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    : "border-white/[0.04] hover:border-white/[0.08]"
                )}
                data-cursor-hover
              >
                <div className="absolute inset-0">
                  <Image
                    src={col.cover}
                    alt={col.title}
                    fill
                    className="object-cover opacity-25 transition-all duration-700 group-hover:opacity-35 group-hover:scale-[1.03]"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
                </div>
                <div className="relative">
                  <p className="label mb-1">{col.category} · {col.year}</p>
                  <p className="text-lg font-medium text-white">{col.title}</p>
                  <p className="mt-1 text-sm text-white/30">{col.description}</p>
                  <p className="mt-2 text-xs text-white/15">{col.imageCount} photos</p>
                </div>
              </button>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-20 md:py-24">
        <div className="container-wide mx-auto max-w-5xl">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="input-underline">
              <input
                type="text"
                placeholder="Search the archive..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-1 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    year === y
                      ? "border-white bg-white text-bg shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                      : "border-white/[0.06] text-white/25 hover:text-white/50"
                  )}
                >
                  {y === "All" ? "All Years" : y}
                </button>
              ))}
              {collection && (
                <button
                  type="button"
                  onClick={() => setCollection(null)}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white"
                >
                  Clear collection ×
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    category === c
                      ? "border-white bg-white text-bg"
                      : "border-white/[0.06] text-white/25 hover:text-white/50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-6 text-sm text-white/20">
            Showing {filtered.length} of {galleryImages.length} items
          </p>

          {/* Masonry grid */}
          <div className="grid auto-rows-[180px] grid-cols-2 gap-2 overflow-hidden rounded-2xl md:grid-cols-3">
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-white/[0.04] bg-bg transition-all duration-500 hover:border-white/[0.08]",
                  layoutSpans[i % layoutSpans.length]
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                data-cursor-hover
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-bg/0 transition-all duration-500 group-hover:bg-bg/50" />
                <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{img.alt}</p>
                  <p className="text-[11px] text-white/40">
                    {img.category} · {img.year}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-white/25">No media matches your filters.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-2xl"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-white/40 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] text-white/40 hover:text-white md:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] text-white/40 hover:text-white md:right-8"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={1400}
                height={900}
                className="max-h-[75vh] rounded-2xl object-contain"
              />
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-white">{activeImage.alt}</p>
                  <p className="text-white/25">
                    {activeImage.category} · {activeImage.year}
                  </p>
                </div>
                <p className="text-white/20 tabular-nums">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
