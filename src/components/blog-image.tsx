import Image from "next/image";

type BlogImageProps = {
  /** Cloudinary public ID */
  publicId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Optimized image from Cloudinary using the Next.js image loader pattern.
 * Public ID only — no local assets.
 */
export function BlogImage({ publicId, alt, width, height, className, priority, sizes }: BlogImageProps) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !publicId.trim()) return null;

  return (
    <Image
      loader={({ src, width: w, quality }) => {
        const q = quality ?? 75;
        return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_${q},w_${w}/${src}`;
      }}
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
