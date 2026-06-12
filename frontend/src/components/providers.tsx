"use client";

import { useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/animations/loading-screen";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { PageTransitionProvider } from "@/components/layout/page-transition";
import { CursorFollower } from "@/components/animations/cursor-follower";

export function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SmoothScroll>
      <CursorFollower />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={handleComplete} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-full flex-col"
          >
            <ScrollProgress />
            <Navbar />
            <PageTransitionProvider>
              <main className="flex-1">{children}</main>
            </PageTransitionProvider>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}
