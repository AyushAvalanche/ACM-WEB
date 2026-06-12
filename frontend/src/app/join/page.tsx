"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { MagneticButton } from "@/components/ui/magnetic-button";

const benefits = [
  { num: "01", title: "Community", desc: "250+ passionate computing students united by purpose", color: "rgba(0,102,255,0.5)" },
  { num: "02", title: "Learning", desc: "Workshops, certifications, and industry mentorship", color: "rgba(139,92,246,0.5)" },
  { num: "03", title: "Competition", desc: "Hackathons, coding contests, and ACM events", color: "rgba(6,214,160,0.5)" },
  { num: "04", title: "Building", desc: "Real projects with team support and open source culture", color: "rgba(236,72,153,0.5)" },
];

const faqs = [
  { q: "Who can join?", a: "Any NMIMS Indore student with interest in computing and technology." },
  { q: "Is there a fee?", a: "ACM student membership is required. Chapter activities are free for members." },
  { q: "How to get involved?", a: "Submit the application below and attend our orientation session." },
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        label="Join ACM"
        title="Become part of something bigger"
        description="Apply for membership and join NMIMS Indore's premier computing community."
      />

      {/* Benefits */}
      <section className="border-b border-white/[0.04] py-20 md:py-24">
        <div className="container-wide">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <FadeIn key={b.num} delay={i * 0.08}>
                <div className="group rounded-2xl border border-white/[0.04] bg-surface p-8 transition-all duration-500 hover:border-white/[0.08] hover:bg-surface-elevated">
                  <div
                    className="mb-6 h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: b.color, boxShadow: `0 0 10px ${b.color}` }}
                  />
                  <span className="text-sm text-white/15">{b.num}</span>
                  <h3 className="mt-3 text-xl font-medium text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/30">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application + FAQs */}
      <section className="relative py-24 md:py-32">
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="container-wide relative grid gap-16 lg:grid-cols-2">
          <FadeIn>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4 rounded-3xl border border-white/[0.06] bg-surface p-12"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-white">Application received</h3>
                <p className="text-white/35">We&apos;ll review and respond within a week.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
                  <SectionLabel>Application</SectionLabel>
                </div>
                <h2 className="display-md gradient-text">Membership form</h2>
                {["Full Name", "Email", "Student ID", "Branch", "Year of Study"].map((label) => (
                  <div key={label} className="input-underline">
                    <label className="mb-2 block text-xs text-white/20">{label}</label>
                    <input
                      required
                      type={label === "Email" ? "email" : "text"}
                      className="w-full bg-transparent py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                ))}
                <div className="input-underline">
                  <label className="mb-2 block text-xs text-white/20">
                    Why do you want to join?
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent py-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="pt-2">
                  <MagneticButton variant="primary">
                    Submit Application
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                </div>
              </form>
            )}
          </FadeIn>

          {/* FAQs with accordion */}
          <FadeIn delay={0.1}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-accent-purple to-transparent" />
              <SectionLabel>FAQs</SectionLabel>
            </div>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <button
                  key={faq.q}
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="block w-full border-t border-white/[0.04] py-6 text-left transition-all duration-300"
                  data-cursor-hover
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{faq.q}</h3>
                    <motion.span
                      animate={{ rotate: expandedFaq === i ? 45 : 0 }}
                      className="text-white/20"
                    >
                      +
                    </motion.span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === i ? "auto" : 0,
                      opacity: expandedFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-white/30">{faq.a}</p>
                  </motion.div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
