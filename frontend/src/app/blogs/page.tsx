"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/animations/reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { blogPosts } from "@/data/chapter";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const sorted = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    []
  );

  const featured = sorted[0];

  const filtered = useMemo(() => {
    const rest = sorted.slice(1);
    return rest.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || post.category === category;
      return matchSearch && matchCategory;
    });
  }, [sorted, search, category]);

  return (
    <>
      <PageHeader
        label="Blog & Newsletter"
        title="Stories, guides, and chapter insights"
        description="Technical writing, event recaps, and community updates from NMIMS Indore ACM members."
      />

      {/* Featured post */}
      <section className="border-b border-border">
        <Reveal variant="scale">
          <Link href={`/blogs/${featured.slug}`} className="group block">
            <div className="container-wide section-padding !py-12">
              <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border md:grid-cols-2">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center bg-surface p-8 md:p-10">
                  <SectionLabel className="mb-4">Featured · {featured.category}</SectionLabel>
                  <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-text-secondary">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-text-muted">
                      {featured.author} · {formatDate(featured.publishedAt)}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      Read <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Filters + list */}
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-border bg-transparent py-3 pr-4 pl-11 text-sm text-white placeholder:text-text-muted focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    category === c
                      ? "border-white bg-white text-bg"
                      : "border-border text-text-muted hover:text-white"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <StaggerReveal className="divide-y divide-border">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group grid gap-6 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border md:col-span-4 md:aspect-[4/3]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="300px"
                  />
                </div>
                <div className="flex flex-col justify-center md:col-span-8">
                  <span className="label mb-2">{post.category}</span>
                  <h3 className="text-xl font-medium tracking-tight text-white transition-colors group-hover:text-white/90 md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-text-muted">
                      {post.author} · {formatDate(post.publishedAt)}
                    </p>
                    <ArrowUpRight
                      size={16}
                      className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </StaggerReveal>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-text-muted">No articles match your search.</p>
          )}

          {/* Newsletter strip */}
          <Reveal variant="blur" className="mt-16 rounded-2xl border border-border bg-surface p-8 md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <SectionLabel className="mb-3">Newsletter</SectionLabel>
                <h3 className="text-xl font-semibold text-white">Stay in the loop</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Get chapter updates, event announcements, and new articles in your inbox.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-md gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-border bg-transparent px-5 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-bg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
