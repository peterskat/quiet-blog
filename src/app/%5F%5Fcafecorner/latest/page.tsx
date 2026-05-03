import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Latest",
  description: "The latest open notes from Cafe Corner.",
  path: "/latest"
});

export default function CafeCornerLatestPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Open sign"
      title="The sign is turned toward the street."
      body="New notes, fresh links, and small updates can land here first."
    />
  );
}
