import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Menu",
  description: "Small offerings and routes through Cafe Corner.",
  path: "/menu"
});

export default function CafeCornerMenuPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Menu"
      title="Tea, pages, quiet sound, and a few open doors."
      body="This placeholder will become a guide to Cafe Corner: reading paths, audio notes, categories, and whatever the chalkboard feels ready to carry."
    />
  );
}
