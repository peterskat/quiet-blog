import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Reading",
  description: "Books, essays, and reading notes from Cafe Corner.",
  path: "/reading"
});

export default function CafeCornerReadingPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Book pile"
      title="A stack of pages for slower afternoons."
      body="Reading lists, essays, excerpts, and marginalia can gather here beside the table."
    />
  );
}
