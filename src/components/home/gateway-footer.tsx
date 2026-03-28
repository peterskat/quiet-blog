import { siteConfig } from "@/lib/blog/config";

export function GatewayFooter() {
  return (
    <footer className="border-t border-stone-200/80">
      <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm leading-relaxed text-stone-500">
        <p>{siteConfig.name}</p>
        <p className="mt-2">Written quietly, one page at a time.</p>
      </div>
    </footer>
  );
}
