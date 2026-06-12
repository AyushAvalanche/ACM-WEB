"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";

export function GallerySection() {
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60"];

  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
              Gallery
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Digital Yearbook
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-sm font-medium text-acm-blue hover:text-cyan"
          >
            Full archive <ArrowRight size={16} />
          </Link>
        </FadeIn>

        <div className="columns-2 gap-4 md:columns-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative mb-4 block w-full overflow-hidden rounded-xl ${heights[i % heights.length]}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 left-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{img.alt}</p>
                <p className="text-xs text-white/50">{img.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
