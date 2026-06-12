"use client";

import { Trophy, Award, BookOpen, BadgeCheck, Star, Medal } from "lucide-react";
import { achievements } from "@/data/chapter";
import { FadeIn } from "@/components/animations/fade-in";
import { formatDate } from "@/lib/utils";

const iconMap = {
  hackathon: Trophy,
  publication: BookOpen,
  award: Award,
  certification: BadgeCheck,
  milestone: Star,
};

export function AchievementsSection() {
  return (
    <section className="border-y border-white/10 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan uppercase">
            Achievement Spotlight
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Excellence in Action
          </h2>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.category] || Medal;
            return (
              <FadeIn key={item.id} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-acm-blue/30 hover:bg-white/[0.05]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-acm-blue/10 text-acm-blue transition-colors group-hover:bg-acm-blue group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs text-white/30">{formatDate(item.date)}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
