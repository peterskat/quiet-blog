import { CafeCornerCard } from "@/components/cafecorner/cafe-corner-card";
import { CafeCornerPaperSurface } from "@/components/cafecorner/cafe-corner-paper-surface";
import { CafeCornerScene } from "@/components/cafecorner/cafe-corner-scene";
import { cafeCornerConfig } from "@/lib/cafecorner/config";

export function CafeCornerHero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--cc-accent)]">A quiet room under Tam Writing</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-[var(--cc-text)] sm:text-6xl lg:text-7xl">
          A cafe corner that listens.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--cc-text-soft)]">
          Settle near the window. The kettle is low, the plants are awake, and the notes on the table are meant to be
          read slowly.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {cafeCornerConfig.spotlightLinks.map((item) => (
            <CafeCornerCard key={item.href} {...item} />
          ))}
        </div>
      </div>
      <CafeCornerPaperSurface className="p-3 sm:p-4">
        <CafeCornerScene />
      </CafeCornerPaperSurface>
    </section>
  );
}
