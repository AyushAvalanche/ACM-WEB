"use client";

import { stats } from "@/data/chapter";
import { Counter } from "@/components/animations/counter";
import { FadeIn } from "@/components/animations/fade-in";

export function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-charcoal py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs tracking-wider text-white/40 uppercase sm:text-sm">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
