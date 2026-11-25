/**
 * Content types for the site.
 *
 * These mirror the planned Sanity schema (category, project, siteSettings) so that
 * swapping the local seed data for Sanity only touches `src/lib/content/index.ts`.
 */

export type Image = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Tiny base64 preview shown while the full image loads (Sanity provides this as `lqip`). */
  blurDataURL?: string;
  caption?: string;
  /**
   * How the image sits in a project gallery. `auto` lets the layout decide:
   * landscape images go full width, consecutive portraits are paired.
   */
  layout?: "auto" | "full" | "half";
};

export type Category = {
  slug: string;
  title: string;
  /** Short intro shown at the top of the category page. */
  intro?: string;
  coverImage: Image;
  order: number;
};

export type Project = {
  slug: string;
  title: string;
  categorySlug: string;
  /** e.g. "Private villa", "Hotel lobby". */
  type: string;
  city: string;
  country: string;
  year: number;
  /** Paragraphs of the project story. */
  description: string[];
  collaboration?: string;
  photoCredit?: string;
  coverImage: Image;
  gallery: Image[];
  featured: boolean;
  order: number;
};

/** A project joined with its category, as most pages need both. */
export type ProjectWithCategory = Project & { category: Category };

export type Office = {
  city: string;
  country: string;
  addressLines: string[];
  mapUrl: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  heroImages: Image[];
  philosophy: string[];
  about: {
    founder: string;
    role: string;
    bio: string[];
    quote: string;
    image: Image;
  };
  services: { title: string; text: string }[];
  offices: Office[];
  email: string;
  phone: string;
  social: { label: string; href: string }[];
};
