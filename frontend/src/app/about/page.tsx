import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { timeline, teamMembers } from "@/data/chapter";

export const metadata: Metadata = {
  title: "About",
  description: "Mission, vision, and story of NMIMS Indore ACM Student Chapter.",
};

const values = [
  { title: "Innovation", desc: "Advancing the frontier of computing", color: "rgba(0,102,255,0.5)" },
  { title: "Collaboration", desc: "Building through shared knowledge", color: "rgba(139,92,246,0.5)" },
  { title: "Excellence", desc: "Highest standards in everything we do", color: "rgba(6,214,160,0.5)" },
  { title: "Leadership", desc: "Developing future technology leaders", color: "rgba(236,72,153,0.5)" },
];

const faculty = teamMembers.find((m) => m.department === "faculty");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="A chapter built for the future of computing"
        description="Official ACM Student Chapter at NMIMS Indore — chartered to foster innovation, research, and community."
      />

      {/* ACM Global + Our Chapter */}
      <section className="relative overflow-hidden border-b border-white/[0.04] py-24 md:py-32">
        <div className="noise pointer-events-none absolute inset-0" />
        <div className="container-wide relative grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
              <span className="label text-white/25">ACM Global</span>
            </div>
            <h2 className="display-md gradient-text">
              World&apos;s largest computing society
            </h2>
            <p className="mt-6 leading-relaxed text-white/40">
              The Association for Computing Machinery unites educators, researchers, and
              professionals worldwide — inspiring dialogue, sharing resources, and addressing
              the field&apos;s greatest challenges.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { val: "100K+", label: "Members" },
                { val: "170+", label: "Countries" },
                { val: "37K+", label: "Students" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.04] bg-surface px-4 py-6 text-center">
                  <p className="text-xl font-semibold text-white">{s.val}</p>
                  <p className="mt-1 text-xs text-white/25">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-accent-purple to-transparent" />
              <span className="label text-white/25">Our Chapter</span>
            </div>
            <h2 className="display-md gradient-text">NMIMS Indore ACM</h2>
            <p className="mt-6 leading-relaxed text-white/40">
              We create a thriving ecosystem where students explore cutting-edge technologies,
              compete nationally, publish research, and develop professional skills through
              workshops, hackathons, and mentorship.
            </p>
            <div className="mt-8 space-y-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-surface/50 px-5 py-4 transition-all duration-300 hover:border-white/[0.08]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: v.color, boxShadow: `0 0 8px ${v.color}` }}
                    />
                    <span className="font-medium text-white">{v.title}</span>
                  </div>
                  <span className="text-sm text-white/25">{v.desc}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="relative overflow-hidden border-b border-white/[0.04] bg-surface py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,102,255,0.03),transparent)]" />
        <div className="container-wide relative grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <SectionLabel className="mb-4">Mission</SectionLabel>
            <p className="display-md font-medium leading-snug tracking-tight text-white">
              Advance computing as a science and profession by providing students opportunities
              for technical growth, research exposure, and leadership development.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SectionLabel className="mb-4">Vision</SectionLabel>
            <p className="display-md font-medium leading-snug tracking-tight text-white">
              Be recognized as a premier ACM chapter producing industry-ready technologists,
              award-winning researchers, and community leaders.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Faculty Coordinator */}
      {faculty && (
        <section className="relative overflow-hidden border-b border-white/[0.04] py-24 md:py-32">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-accent-cyan to-transparent" />
                <SectionLabel>Faculty Coordinator</SectionLabel>
              </div>
              <div className="grid items-center gap-12 lg:grid-cols-12">
                <div className="relative aspect-[4/5] w-64 max-w-full overflow-hidden rounded-3xl border border-white/[0.05] lg:w-full lg:col-span-4">
                  <Image src={faculty.photo} alt={faculty.name} fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    {faculty.name}
                  </h3>
                  <p className="mt-2 text-lg text-white/40">{faculty.position}</p>
                  <p className="mt-6 max-w-2xl leading-relaxed text-white/35">{faculty.bio}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <FadeIn className="mb-16">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-acm-blue to-transparent" />
              <SectionLabel>Timeline</SectionLabel>
            </div>
            <h2 className="display-lg gradient-text">Chapter journey</h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-gradient-to-b from-white/[0.04] via-acm-blue/10 to-white/[0.04] md:block" />

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.06}>
                  <div className="grid gap-4 border-t border-white/[0.04] py-10 md:grid-cols-12 md:gap-8 md:pl-8">
                    <div className="md:col-span-2">
                      <span className="text-sm font-medium text-white/20">{item.year}</span>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    </div>
                    <div className="md:col-span-6">
                      <p className="leading-relaxed text-white/35">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
