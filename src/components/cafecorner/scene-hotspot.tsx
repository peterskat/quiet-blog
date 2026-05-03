import Link from "next/link";
import type { CafeCornerHotspot } from "@/lib/cafecorner/config";

type SceneHotspotProps = {
  hotspot: CafeCornerHotspot;
};

export function SceneHotspot({ hotspot }: SceneHotspotProps) {
  return (
    <Link
      href={hotspot.href}
      aria-label={hotspot.ariaLabel}
      className="group absolute z-20 min-h-12 min-w-12 rounded-lg outline-none"
      style={hotspot.position}
    >
      <span className="absolute inset-0 rounded-lg border-2 border-[color:rgb(255_245_202_/_0.78)] bg-[color:rgb(255_245_202_/_0.08)] opacity-0 shadow-[0_0_0_5px_rgba(111,63,36,0.08)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100 group-active:scale-95" />
      <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-[color:rgb(139_118_89_/_0.35)] bg-[var(--cc-surface)] px-3 py-1 text-xs font-semibold text-[var(--cc-text)] shadow-md group-hover:block group-focus-visible:block">
        {hotspot.label}
      </span>
      <span className="sr-only">{hotspot.hint}</span>
    </Link>
  );
}
