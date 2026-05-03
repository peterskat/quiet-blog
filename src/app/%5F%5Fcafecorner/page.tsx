import type { Metadata } from "next";
import { CafeCornerCard } from "@/components/cafecorner/cafe-corner-card";
import { CafeCornerHero } from "@/components/cafecorner/cafe-corner-hero";
import { CafeCornerSection } from "@/components/cafecorner/cafe-corner-section";
import { buildCafeCornerMetadata, cafeCornerConfig } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata();

export default function CafeCornerHomePage() {
  return (
    <>
      <CafeCornerHero />
      <CafeCornerSection eyebrow="On the counter" title="Choose a corner and stay a while.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cafeCornerConfig.navItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <CafeCornerCard key={item.href} {...item} />
            ))}
        </div>
      </CafeCornerSection>
    </>
  );
}
