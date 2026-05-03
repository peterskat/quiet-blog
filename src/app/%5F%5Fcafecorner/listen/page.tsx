import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Listen",
  description: "Ambient listening and audio notes from Cafe Corner.",
  path: "/listen"
});

export default function CafeCornerListenPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Speaker"
      title="The room has a low, kind volume."
      body="A future home for audio notes, ambience, playlists, and gentle background sound from the cafe speaker."
    />
  );
}
