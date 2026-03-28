/** True when a cover/inline image can be rendered from Cloudinary. */
export function shouldRenderCloudinary(publicId: string): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() && publicId.trim());
}

/**
 * Build a Cloudinary delivery URL from a public ID and optional transforms.
 * Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME at runtime for URLs used in the browser.
 */
export function cloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number; quality?: number; crop?: "fill" | "limit" }
): string | null {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !publicId.trim()) return null;

  const parts: string[] = ["f_auto", `q_${options?.quality ?? "auto"}`];
  if (options?.width) parts.push(`w_${options.width}`);
  if (options?.height) parts.push(`h_${options.height}`);
  if (options?.crop) parts.push(`c_${options.crop}`);

  const transform = parts.join(",");
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}/${publicId}`;
}
