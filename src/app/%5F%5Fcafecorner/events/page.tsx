import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Events",
  description: "Gatherings, readings, and gentle announcements from Cafe Corner.",
  path: "/events"
});

export default function CafeCornerEventsPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Events"
      title="Small gatherings will be written on the board."
      body="Readings, listening hours, seasonal notes, and quiet invitations can live here when the room is ready."
    />
  );
}
