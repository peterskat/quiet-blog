import type { Metadata } from "next";
import { CafeCornerPageIntro } from "@/components/cafecorner/cafe-corner-page-intro";
import { buildCafeCornerMetadata } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata({
  title: "Contacts",
  description: "How to reach Cafe Corner.",
  path: "/contacts"
});

export default function CafeCornerContactsPage() {
  return (
    <CafeCornerPageIntro
      eyebrow="Contacts"
      title="Leave a note at the counter."
      body="Contact details, newsletter paths, and ways to send a small hello can live here."
    />
  );
}
