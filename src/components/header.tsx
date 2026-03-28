import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="border-b border-stone-200/80 bg-[#f7f1e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.18em] text-stone-600 transition hover:text-stone-900"
        >
          Quiet Notes
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-stone-600 transition hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
