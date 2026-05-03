import type { ReactNode } from "react";
import { cafeCornerTheme } from "@/lib/cafecorner/theme";
import { CafeCornerFooter } from "@/components/cafecorner/cafe-corner-footer";
import { CafeCornerNav } from "@/components/cafecorner/cafe-corner-nav";

type CafeCornerShellProps = {
  children: ReactNode;
};

export function CafeCornerShell({ children }: CafeCornerShellProps) {
  const colors = cafeCornerTheme.colors;

  return (
    <div
      className="cc-shell min-h-screen overflow-hidden text-[var(--cc-text)]"
      style={
        {
          "--cc-background": colors.background,
          "--cc-background-soft": colors.backgroundSoft,
          "--cc-surface": colors.surface,
          "--cc-surface-muted": colors.surfaceMuted,
          "--cc-text": colors.text,
          "--cc-text-soft": colors.textSoft,
          "--cc-accent": colors.accent,
          "--cc-accent-2": colors.accent2,
          "--cc-border": colors.border,
          "--cc-highlight": colors.highlight,
          "--cc-plant-green": colors.plantGreen,
          "--cc-wood": colors.wood,
          "--cc-terracotta": colors.terracotta,
          "--cc-charcoal": colors.charcoal,
          "--cc-shadow-soft": cafeCornerTheme.shadow.soft,
          "--cc-shadow-lifted": cafeCornerTheme.shadow.lifted,
          "--cc-shadow-ink": cafeCornerTheme.shadow.ink
        } as React.CSSProperties
      }
    >
      <CafeCornerNav />
      <main>{children}</main>
      <CafeCornerFooter />
    </div>
  );
}
