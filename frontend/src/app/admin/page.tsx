"use client";

import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionLabel } from "@/components/ui/section-label";

const modules = [
  { label: "Events", count: 45 },
  { label: "Gallery", count: 120 },
  { label: "Team", count: 12 },
  { label: "Blogs", count: 8 },
  { label: "Projects", count: 28 },
  { label: "Achievements", count: 15 },
  { label: "Applications", count: 34 },
  { label: "Analytics", count: null },
];

export default function AdminPage() {
  return (
    <>
      <PageHeader
        label="Admin"
        title="Chapter management"
        description="Role-based CMS for events, content, team, and recruitment."
      />

      <section className="section-padding">
        <div className="container-wide">
          <FadeIn className="mb-10 rounded-xl border border-border p-5">
            <p className="text-sm text-text-secondary">
              Connect Clerk authentication via{" "}
              <code className="rounded border border-border px-1.5 py-0.5 text-xs">.env.local</code>{" "}
              to enable role-based access.
            </p>
          </FadeIn>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, i) => (
              <FadeIn key={mod.label} delay={i * 0.04} className="bg-bg p-8">
                <SectionLabel className="mb-4">{mod.label}</SectionLabel>
                {mod.count !== null ? (
                  <p className="text-3xl font-semibold text-white">{mod.count}</p>
                ) : (
                  <p className="text-sm text-text-muted">View metrics</p>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
