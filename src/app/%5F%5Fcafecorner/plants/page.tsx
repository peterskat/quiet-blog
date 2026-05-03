import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Plants",
  description: "Leafy atmosphere and plant notes from Cafe Corner.",
  path: "/plants"
});

export default function CafeCornerPlantsPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Plant pot"
      title="Leaves in the window, roots under the quiet."
      body="A placeholder for atmosphere notes, plant care fragments, and the green mood of the cafe."
    />
  );
}
