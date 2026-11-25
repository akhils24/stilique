import NextImage from "next/image";
import type { Image } from "@/lib/content";

type Props = {
  image: Image;
  sizes: string;
  className?: string;
  /** Fill the parent box (parent must be positioned and sized) instead of using intrinsic size. */
  fill?: boolean;
  preload?: boolean;
};

/** Project photography with a blurred preview while loading. */
export function Photo({ image, sizes, className = "", fill = false, preload = false }: Props) {
  const common = {
    src: image.src,
    alt: image.alt,
    sizes,
    preload,
    placeholder: image.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: image.blurDataURL,
    className,
  };

  return fill ? (
    <NextImage {...common} fill className={`object-cover ${className}`} />
  ) : (
    <NextImage {...common} width={image.width} height={image.height} className={`h-auto w-full ${className}`} />
  );
}
