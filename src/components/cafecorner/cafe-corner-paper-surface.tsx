import type { ReactNode } from "react";

type CafeCornerPaperSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function CafeCornerPaperSurface({ children, className = "" }: CafeCornerPaperSurfaceProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[color:rgb(139_118_89_/_0.34)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow-soft)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 cc-paper-texture" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
