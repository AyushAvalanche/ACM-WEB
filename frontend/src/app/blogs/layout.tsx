import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Articles, technical guides, and chapter updates from NMIMS Indore ACM.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
