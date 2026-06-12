import { HeroSection } from "@/components/home/hero-section";
import { ImpactSection } from "@/components/home/impact-section";
import { FeaturedEvent } from "@/components/home/featured-event";
import { FeaturedProject } from "@/components/home/featured-project";
import { AchievementSpotlight } from "@/components/home/achievement-spotlight";
import { QuickAccess } from "@/components/home/quick-access";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <FeaturedEvent />
      <FeaturedProject />
      <AchievementSpotlight />
      <QuickAccess />
    </>
  );
}
