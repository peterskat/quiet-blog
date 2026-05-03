import Image from "next/image";
import { cafeCornerConfig } from "@/lib/cafecorner/config";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { SceneHotspot } from "@/components/cafecorner/scene-hotspot";

export function CafeCornerScene() {
  const introImage = cloudinaryUrl(cafeCornerConfig.introImage.publicId, {
    width: cafeCornerConfig.introImage.width,
    height: cafeCornerConfig.introImage.height,
    crop: "limit"
  });

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[34rem] overflow-hidden rounded-lg border border-[color:rgb(139_118_89_/_0.45)] bg-[var(--cc-background-soft)] shadow-[var(--cc-shadow-lifted)]">
      {introImage ? (
        <Image
          src={introImage}
          alt={cafeCornerConfig.introImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 34rem, calc(100vw - 3.5rem)"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 cc-scene-wash" aria-hidden />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,39,31,0.02),rgba(47,39,31,0.1))]" aria-hidden />

      {cafeCornerConfig.hotspots.map((hotspot) => (
        <SceneHotspot key={hotspot.id} hotspot={hotspot} />
      ))}
    </div>
  );
}
