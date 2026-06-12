"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Dynamic scroll-responsive values
  const navScale = useTransform(scrollY, [0, 120], [1, 0.98]);
  const navBlur = useTransform(scrollY, [0, 100], [12, 40]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    if (latest > lastScrollY.current && latest > 120 && !mobileOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden && !mobileOpen ? -120 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.nav
          style={{ scale: navScale }}
          className={cn(
            "pointer-events-auto relative flex w-full max-w-5xl items-center gap-3 rounded-2xl border px-3 py-2 shadow-2xl transition-all duration-700 md:px-5 md:py-2.5",
            scrolled
              ? "border-white/[0.08] bg-[rgba(8,8,14,0.8)] shadow-black/60 backdrop-blur-[40px]"
              : "border-white/[0.05] bg-[rgba(8,8,14,0.35)] shadow-black/20 backdrop-blur-xl"
          )}
        >
          {/* Shimmer border overlay */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700",
              scrolled && "opacity-100"
            )}
            style={{
              background:
                "linear-gradient(135deg, rgba(0,102,255,0.08) 0%, transparent 40%, transparent 60%, rgba(139,92,246,0.06) 100%)",
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              pointerEvents: "none",
            }}
          />

          {/* Logo */}
          <Link href="/" className="group relative flex shrink-0 items-center gap-2.5 pl-1">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,102,255,0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-[9px] font-bold tracking-widest text-white">ACM</span>
            </motion.div>
            <span className="hidden text-sm font-medium tracking-tight text-white/90 transition-colors group-hover:text-white md:block">
              NMIMS
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-1 py-1">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative px-2 xl:px-3 py-1.5"
                    data-cursor-hover
                  >
                    <span
                      className={cn(
                        "relative z-10 text-[11px] xl:text-[12px] font-medium transition-colors duration-300",
                        active ? "text-bg" : "text-white/40 group-hover:text-white/80"
                      )}
                    >
                      {link.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="floating-nav-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA button */}
          <Link
            href="/join"
            className="group hidden shrink-0 items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] lg:flex"
            data-cursor-hover
          >
            Join Chapter
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/50 transition-colors hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[4.5rem] right-4 left-4 z-50 flex max-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(8,8,14,0.95)] shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col overflow-y-auto p-3">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium transition-all",
                          active
                            ? "bg-white text-bg"
                            : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        <span>{link.label}</span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-bg" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04, duration: 0.3 }}
                  className="mt-2 border-t border-white/[0.06] p-2 pt-4"
                >
                  <Link
                    href="/join"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-semibold text-bg"
                  >
                    Join Chapter
                    <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
