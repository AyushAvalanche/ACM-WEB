import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/chapter";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article>
      <section className="relative min-h-[50vh]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />
        <div className="container-wide relative flex min-h-[50vh] flex-col justify-end pb-12 pt-32">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> All articles
          </Link>
          <span className="label mb-4">{post.category}</span>
          <h1 className="display-lg max-w-4xl text-white">{post.title}</h1>
          <p className="mt-6 text-sm text-text-muted">
            {post.author} · {formatDate(post.publishedAt)}
          </p>
        </div>
      </section>

      <div className="container-wide mx-auto max-w-3xl section-padding !pt-12">
        <p className="text-xl leading-relaxed text-text-secondary">{post.excerpt}</p>
        <div className="prose prose-invert mt-10 max-w-none space-y-6">
          <p className="leading-relaxed text-text-secondary">
            This article is part of the NMIMS Indore ACM blog — sharing knowledge, event insights,
            and community stories from our chapter members. Full content will be published through
            the admin CMS.
          </p>
          <p className="leading-relaxed text-text-secondary">
            Stay connected with the chapter for more technical guides, event recaps, and research
            highlights from NMIMS Indore ACM Student Chapter.
          </p>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <p className="label mb-6">Related articles</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blogs/${r.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:bg-surface"
                >
                  <span className="text-xs text-text-muted">{r.category}</span>
                  <h3 className="mt-2 font-medium text-white group-hover:text-white/90">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{formatDate(r.publishedAt)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
