import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Journal",
  description: "Notes from the Cafe Corner table.",
  path: "/journal"
});

export default function CafeCornerJournalPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Journal"
      title="Notes from the table nearest the plants."
      body="A future journal index for short entries, sketches, small observations, and letters from the cafe corner."
    />
  );
}
