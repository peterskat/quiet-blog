import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "About",
  description: "The mood and intention behind Cafe Corner.",
  path: "/about"
});

export default function CafeCornerAboutPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="About the room"
      title="A little listening room for words, plants, and warm pauses."
      body="Cafe Corner is a soft side room of Tam Writing: less announcement, more atmosphere. It is built for notes that want a table, a lamp, and time."
    />
  );
}
