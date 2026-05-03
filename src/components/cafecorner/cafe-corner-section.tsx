import type { ReactNode } from "react";

type CafeCornerSectionProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function CafeCornerSection({ eyebrow, title, children }: CafeCornerSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.22em] text-[var(--cc-accent)]">{eyebrow}</p> : null}
        <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--cc-text)] sm:text-5xl">{title}</h2>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
