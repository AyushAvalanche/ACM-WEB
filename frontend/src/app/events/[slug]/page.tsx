import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { events } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const schedule = [
    { time: "09:00", title: "Registration & Welcome", desc: "Check-in and networking" },
    { time: "10:00", title: "Opening Keynote", desc: "Chapter leadership address" },
    { time: "11:00", title: "Main Session", desc: event.description },
    { time: "13:00", title: "Lunch Break", desc: "" },
    { time: "14:00", title: "Hands-on Workshop", desc: "Interactive technical session" },
    { time: "17:00", title: "Closing & Certificates", desc: "" },
  ];

  return (
    <article>
      <section className="relative min-h-[70vh]">
        <Image src={event.banner} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        <div className="container-wide relative flex min-h-[70vh] flex-col justify-end pb-16 pt-32">
          <SectionLabel className="mb-4 text-white/50">{event.category}</SectionLabel>
          <h1 className="display-lg max-w-4xl text-white">{event.title}</h1>
          <div className="mt-8 flex flex-wrap gap-8 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} /> {event.participationCount} participants
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-wide grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-8">
            <SectionLabel className="mb-4">Event Story</SectionLabel>
            <p className="text-xl leading-relaxed text-text-secondary">{event.description}</p>
            <p className="mt-6 leading-relaxed text-text-secondary">
              This event brought together students, industry mentors, and faculty to advance
              technical excellence and community building at NMIMS Indore ACM.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-4">
            <div className="rounded-2xl border border-border p-8">
              <SectionLabel className="mb-6">Statistics</SectionLabel>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-semibold text-white">{event.participationCount}</p>
                  <p className="text-sm text-text-muted">Registered</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">92%</p>
                  <p className="text-sm text-text-muted">Attendance rate</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">
                    {Math.floor(event.participationCount * 0.92)}
                  </p>
                  <p className="text-sm text-text-muted">Certificates issued</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-4">Schedule</SectionLabel>
            <h2 className="text-2xl font-semibold text-white">Event timeline</h2>
          </FadeIn>
          <div className="space-y-0">
            {schedule.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-border py-6 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium text-text-muted">{item.time}</span>
                  </div>
                  <div className="md:col-span-10">
                    <p className="font-medium text-white">{item.title}</p>
                    {item.desc && (
                      <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
