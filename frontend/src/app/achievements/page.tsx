"use client";

import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Counter } from "@/components/animations/counter";
import { SectionLabel } from "@/components/ui/section-label";
import { achievements } from "@/data/chapter";
import { formatDate } from "@/lib/utils";

const metrics = [
  { label: "Hackathon Wins", value: 12, color: "rgba(0,102,255,0.5)" },
  { label: "Publications", value: 5, color: "rgba(6,214,160,0.5)" },
  { label: "Awards", value: 8, color: "rgba(139,92,246,0.5)" },
  { label: "Certifications", value: 120, suffix: "+", color: "rgba(236,72,153,0.5)" },
];

const categoryColors: Record<string, string> = {
  hackathon: "rgba(0,102,255,0.5)",
  publication: "rgba(6,214,160,0.5)",
  award: "rgba(139,92,246,0.5)",
  certification: "rgba(236,72,153,0.5)",
  milestone: "rgba(59,130,246,0.5)",
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        label="Achievements"
        title="A record of excellence"
        description="Competition wins, publications, certifications, and chapter milestones."
      />

      {/* Metrics */}
      <section className="border-b border-white/[0.04] bg-surface py-16">
        <div className="container-wide">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[0.04] bg-bg px-8 py-10 transition-all duration-500 hover:border-white/[0.08]">
                  <div
                    className="mb-4 h-2 w-2 rounded-full"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}` }}
                  />
                  <p className="text-4xl font-semibold tracking-tight text-white">
                    <Counter value={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-white/25">{m.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement timeline */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <FadeIn className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
              <SectionLabel>Archive</SectionLabel>
            </div>
            <h2 className="display-lg gradient-text">Achievement timeline</h2>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-gradient-to-b from-white/[0.04] via-acm-blue/15 to-white/[0.04] md:block" />

            {achievements.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <div className="group grid gap-4 border-t border-white/[0.04] py-8 transition-all duration-300 hover:bg-white/[0.01] md:grid-cols-12 md:gap-8 md:py-10 md:pl-8">
                  {/* Timeline dot */}
                  <div className="absolute -left-[3px] hidden md:block">
                    <div
                      className="h-[7px] w-[7px] rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: categoryColors[item.category] || "rgba(255,255,255,0.2)",
                        boxShadow: `0 0 8px ${categoryColors[item.category] || "rgba(255,255,255,0.1)"}`,
                      }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <span className="text-sm text-white/20">{formatDate(item.date)}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="rounded-full border border-white/[0.06] px-3 py-1 text-[10px] font-medium tracking-wider text-white/25 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/35">
                      {item.description}
                    </p>
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
