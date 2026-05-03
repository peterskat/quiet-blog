import type { Metadata } from "next";
import { CafeCornerShell } from "@/components/cafecorner/cafe-corner-shell";
import { buildCafeCornerMetadata, cafeCornerConfig } from "@/lib/cafecorner/config";

export const metadata: Metadata = buildCafeCornerMetadata();

export default function CafeCornerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="en" data-site={cafeCornerConfig.siteName}>
      <CafeCornerShell>{children}</CafeCornerShell>
    </div>
  );
}
