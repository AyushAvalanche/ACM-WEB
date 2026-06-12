"use client";

import { NetworkCanvas } from "@/components/animations/network-canvas";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-32">
      <div className="absolute inset-0 opacity-30">
        <NetworkCanvas nodeCount={50} interactive={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join a Community of Builders, Researchers and Innovators
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Be part of NMIMS Indore&apos;s premier computing community. Learn,
            build, compete, and lead.
          </p>
          <div className="mt-10">
            <MagneticButton href="/join" variant="primary">
              Become a Member
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
