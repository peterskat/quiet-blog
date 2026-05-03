import Link from "next/link";
import type { CafeCornerNavItem } from "@/lib/cafecorner/config";

type CafeCornerCardProps = CafeCornerNavItem & {
  eyebrow?: string;
};

export function CafeCornerCard({ href, label, description, eyebrow }: CafeCornerCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-lg border border-[color:rgb(139_118_89_/_0.32)] bg-[color:rgb(255_247_231_/_0.7)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--cc-accent)] hover:shadow-[var(--cc-shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
    >
      {eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-[var(--cc-accent)]">{eyebrow}</p> : null}
      <h3 className="mt-2 font-serif text-2xl leading-tight text-[var(--cc-text)] group-hover:underline">{label}</h3>
      {description ? <p className="mt-3 leading-7 text-[var(--cc-text-soft)]">{description}</p> : null}
    </Link>
  );
}
