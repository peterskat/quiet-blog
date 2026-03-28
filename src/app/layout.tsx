import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";

/** Avoids `new URL("")` or invalid env values crashing the root layout. */
function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new URL("http://localhost:3000");
  try {
    const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(normalized);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Quiet Notes",
    template: "%s · Quiet Notes"
  },
  description: "Three doors, three voices — writing in English, Czech, and Vietnamese."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} bg-[#f7f1e8] font-sans text-stone-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
