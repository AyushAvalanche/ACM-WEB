"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { featuredEvents } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";

export function EventsSection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
              Featured Events
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Moments That Defined Us
            </h2>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-medium text-acm-blue transition-colors hover:text-cyan"
          >
            View all events <ArrowRight size={16} />
          </Link>
        </FadeIn>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {featuredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, rotateY: 2, rotateX: -2 }}
              className="group w-80 shrink-0"
              style={{ perspective: 1000 }}
            >
              <Link href={`/events/${event.slug}`}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-acm-blue/10">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.banner}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="320px"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-acm-blue/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/50">
                      {event.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {event.participationCount}+
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
