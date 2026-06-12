import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { CHAPTER } from "@/data/chapter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: CHAPTER.name,
    template: `%s | ${CHAPTER.shortName}`,
  },
  description:
    "Official website of NMIMS Indore ACM Student Chapter — empowering students through innovation, research, collaboration, and technology leadership.",
  keywords: [
    "ACM",
    "NMIMS Indore",
    "Student Chapter",
    "Computing",
    "Hackathon",
    "Workshops",
    "Technology",
  ],
  openGraph: {
    title: CHAPTER.name,
    description: CHAPTER.tagline,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
