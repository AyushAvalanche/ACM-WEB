import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/icons/social";
import { CHAPTER } from "@/data/chapter";

const columns = [
  {
    title: "Chapter",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/achievements", label: "Achievements" },
      { href: "/join", label: "Join ACM" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/events", label: "Events" },
      { href: "/projects", label: "Projects" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-bg">
      {/* Giant background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none text-[12vw] font-bold tracking-tighter text-white/[0.015]">
          NMIMS ACM
        </span>
      </div>

      <div className="container-wide relative py-20 md:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <span className="text-[10px] font-bold tracking-widest text-white">ACM</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">NMIMS Indore</p>
                <p className="text-xs text-white/20">Student Chapter</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/30">
              {CHAPTER.tagline}
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { href: CHAPTER.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                { href: CHAPTER.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/50"
                  data-cursor-hover
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="label mb-5 text-white/15">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/30 transition-colors hover:text-white/60"
                      data-cursor-hover
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="label mb-5 text-white/15">Contact</p>
            <a
              href={`mailto:${CHAPTER.email}`}
              className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
              data-cursor-hover
            >
              <Mail size={14} />
              {CHAPTER.email}
            </a>
            <p className="mt-4 flex items-start gap-2 text-sm text-white/30">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              {CHAPTER.location}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 mb-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-white/15 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {CHAPTER.name}</p>
          <p>Official ACM Student Chapter</p>
        </div>
      </div>
    </footer>
  );
}
