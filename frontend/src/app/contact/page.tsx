"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, CheckCircle, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LinkedinIcon, InstagramIcon } from "@/components/icons/social";
import { CHAPTER } from "@/data/chapter";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's connect"
        description="Collaborations, sponsorships, or general inquiries — we'd love to hear from you."
      />

      <section className="relative py-24 md:py-32">
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,rgba(0,102,255,0.03),transparent)]" />

        <div className="container-wide relative grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
              <SectionLabel>Reach us</SectionLabel>
            </div>

            <div className="space-y-8">
              <a
                href={`mailto:${CHAPTER.email}`}
                className="group flex items-start gap-4"
                data-cursor-hover
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <Mail size={16} className="text-white/30" />
                </div>
                <div>
                  <p className="text-sm text-white/20">Email</p>
                  <p className="mt-1 text-white transition-colors group-hover:text-white/70">
                    {CHAPTER.email}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <MapPin size={16} className="text-white/30" />
                </div>
                <div>
                  <p className="text-sm text-white/20">Campus</p>
                  <p className="mt-1 text-white">{CHAPTER.location}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-12 flex gap-3">
              {[
                { href: CHAPTER.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                { href: CHAPTER.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/25 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/60"
                  data-cursor-hover
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.05]">
              <iframe
                title="NMIMS Indore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTEnMjguMCJF!5e0!3m2!1sen!2sin!4v1"
                className="h-64 w-full border-0 opacity-60 grayscale invert"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-4 rounded-3xl border border-white/[0.06] bg-surface p-12"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Message sent</h3>
                <p className="text-white/35">We&apos;ll respond within 48 hours.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-accent-purple to-transparent" />
                  <SectionLabel>Message</SectionLabel>
                </div>
                <h2 className="display-md gradient-text">Send an inquiry</h2>
                {["Name", "Email", "Subject"].map((label) => (
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
                  <label className="mb-2 block text-xs text-white/20">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-transparent py-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="pt-2">
                  <MagneticButton variant="primary">
                    Send Message
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
