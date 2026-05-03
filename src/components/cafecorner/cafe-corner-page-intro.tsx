import Link from "next/link";
import { CafeCornerPaperSurface } from "@/components/cafecorner/cafe-corner-paper-surface";

type CafeCornerPageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function CafeCornerPageIntro({ eyebrow, title, body }: CafeCornerPageIntroProps) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-24">
      <CafeCornerPaperSurface className="p-7 sm:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--cc-accent)]">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-[var(--cc-text)] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--cc-text-soft)]">{body}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-[var(--cc-accent)] bg-[color:rgb(255_247_231_/_0.7)] px-4 py-2 text-sm font-semibold text-[var(--cc-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--cc-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
        >
          Back to the cafe
        </Link>
      </CafeCornerPaperSurface>
    </section>
  );
}
