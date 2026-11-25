/**
 * Seed content for the design preview, taken from the client's portfolio PDF and
 * the current stilique.it site. Once Sanity is connected this file becomes the
 * import source for the initial dataset and is no longer read at runtime.
 */
import type { Category, Image, Project, SiteSettings } from "@/lib/content/types";
import { media, type MediaKey } from "./media";

function img(key: MediaKey, alt: string, extra: Partial<Image> = {}): Image {
  return { ...media[key], alt, ...extra };
}

function gallery(slug: string, title: string, count: number): Image[] {
  return Array.from({ length: count }, (_, i) => {
    const key = `${slug}/${String(i + 1).padStart(2, "0")}` as MediaKey;
    return img(key, `${title}, view ${i + 1}`);
  });
}

export const categories: Category[] = [
  {
    slug: "residential",
    title: "Residential",
    intro: "Villas, penthouses and private homes, shaped around the lives of the people who live in them.",
    coverImage: img("a-luxury-guesthouse/04", "Arched glazed door in a guest apartment in Berlin"),
    order: 1,
  },
  {
    slug: "retail",
    title: "Retail",
    intro: "Showrooms and commercial spaces where architecture becomes part of the brand.",
    coverImage: img("vetrosphere/02", "Showroom interior with bespoke wall decoration"),
    order: 2,
  },
  {
    slug: "hotels",
    title: "Hotels",
    intro: "Lobbies and guest spaces designed to welcome, and to make people stay a little longer.",
    coverImage: img("a-floral-lobby/01", "Hotel lobby bar with green velvet stools and floral wallpaper"),
    order: 3,
  },
  {
    slug: "restaurants",
    title: "Restaurants",
    intro: "Dining rooms with atmosphere, character and a sense of place.",
    coverImage: img("brasserie-le-paris/02", "Brasserie bar with brass shelving and red stools"),
    order: 4,
  },
];

const CARLO = "Carlo Berlin (@carlo.designstudio)";

export const projects: Project[] = [
  {
    slug: "the-persian-villa",
    title: "The Persian Villa",
    categorySlug: "residential",
    type: "Private villa",
    city: "Berlin",
    country: "Germany",
    year: 2022,
    description: [
      "A splendid residence, resonating with Middle Eastern design elements, showcases an eloquent interplay of mosaics and terracotta tiles, profoundly shaping the essence of its architectural character.",
      "The incorporation of azure tones further elevates the atmosphere, endowing the environment with a serene and timeless allure.",
    ],
    collaboration: CARLO,
    photoCredit: "Kfir Harbi",
    coverImage: img("the-persian-villa/02", "Bathroom with deep blue walls, mosaic niche and marble"),
    gallery: gallery("the-persian-villa", "The Persian Villa", 3),
    featured: true,
    order: 1,
  },
  {
    slug: "a-luxury-guesthouse",
    title: "A Luxury Guesthouse",
    categorySlug: "residential",
    type: "Guest apartment",
    city: "Berlin",
    country: "Germany",
    year: 2022,
    description: [
      "A simple apartment has been transformed into an exclusive retreat for the homeowners' guests.",
      "The infusion of vibrant colors and captivating patterns imparts a distinct charm, making the space truly delightful and unique.",
    ],
    collaboration: CARLO,
    photoCredit: "Daniel Schäfer",
    coverImage: img("a-luxury-guesthouse/03", "Bedroom with a bold geometric tiled wall"),
    gallery: gallery("a-luxury-guesthouse", "A Luxury Guesthouse", 6),
    featured: true,
    order: 2,
  },
  {
    slug: "a-japanese-penthouse",
    title: "A Japanese Penthouse",
    categorySlug: "residential",
    type: "Penthouse",
    city: "Berlin",
    country: "Germany",
    year: 2021,
    description: [
      "In this modern Japanese-inspired apartment, meticulous attention has been lavished on every detail.",
      "Notably, a beautiful and one-of-a-kind closet, crafted from exclusive materials, stands as a testament to the dedicated artistry involved in its creation.",
    ],
    collaboration: CARLO,
    photoCredit: "Daniel Schäfer",
    coverImage: img("a-japanese-penthouse/04", "Bespoke closet with hand-painted fish motifs"),
    gallery: gallery("a-japanese-penthouse", "A Japanese Penthouse", 7),
    featured: true,
    order: 3,
  },
  {
    slug: "a-patch-of-green",
    title: "A Patch of Green",
    categorySlug: "residential",
    type: "Penthouse",
    city: "Berlin",
    country: "Germany",
    year: 2020,
    description: [
      "B&B Italia's iconic Camaleonda modular sofa is the centerpiece of this prestigious apartment.",
      "The shades of green create a homely ambience and perfectly match the minimalist style with light colors surrounding it. A small touch of green was also captured in the hallway wardrobe.",
    ],
    collaboration: CARLO,
    photoCredit: "Jochen Arndt",
    coverImage: img("a-patch-of-green/01", "Green velvet modular sofa in a bright penthouse with city views"),
    gallery: gallery("a-patch-of-green", "A Patch of Green", 8),
    featured: true,
    order: 4,
  },
  {
    slug: "a-country-maison",
    title: "A Country Maison",
    categorySlug: "residential",
    type: "Private residence",
    city: "Garda Lake",
    country: "Italy",
    year: 2019,
    description: [
      "Commanding a picturesque view of Garda Lake, this country maison effortlessly blends rustic charm with modern sophistication.",
      "It serves as a canvas for the owner's passion for the Orient, showcasing treasures acquired during his travels. The vast, minimalist interiors create an oasis of calm and contemplation, offering a serene retreat from the bustling world outside.",
    ],
    photoCredit: "Tiberio Sorvillo",
    coverImage: img("a-country-maison/04", "Living room under exposed timber beams with arched windows"),
    gallery: gallery("a-country-maison", "A Country Maison", 9),
    featured: true,
    order: 5,
  },
  {
    slug: "the-circle-elevator",
    title: "The Circle Elevator",
    categorySlug: "residential",
    type: "Villa",
    city: "Bolzano",
    country: "Italy",
    year: 2009,
    description: [
      "This villa, in the heart of South Tyrol, stands out for its distinctive circular glass elevator. The addition of this sophisticated feature not only enhances convenience but also imparts a stylish and executive ambience.",
      "The transparent design facilitates the infusion of natural sunlight, minimizing the reliance on interior lighting.",
    ],
    coverImage: img("the-circle-elevator/01", "Circular glass elevator beside a staircase"),
    gallery: gallery("the-circle-elevator", "The Circle Elevator", 4),
    featured: false,
    order: 6,
  },
  {
    slug: "vetrosphere",
    title: "Vetrosphère",
    categorySlug: "retail",
    type: "Showroom",
    city: "Berlin",
    country: "Germany",
    year: 2022,
    description: [
      "A sophisticated and unconventional showroom gracing Berlin's renowned Kurfürstendamm, distinguished by its bespoke wall adornments.",
    ],
    collaboration: CARLO,
    photoCredit: "Kfir Harbi",
    coverImage: img("vetrosphere/01", "Showroom with deep blue walls and gilded palm-leaf lamps"),
    gallery: gallery("vetrosphere", "Vetrosphère", 4),
    featured: false,
    order: 1,
  },
  {
    slug: "the-centrum-mall",
    title: "The Centrum Mall",
    categorySlug: "retail",
    type: "Commercial, residential and office centre",
    city: "Merano",
    country: "Italy",
    year: 2009,
    description: [
      "Construction project of a commercial, residential and office centre for the city of Merano, South Tyrol, designed by architect Boris Podrecca. Transforming his conceptual drawings into tangible structures was a rewarding process.",
      "Every detail of the facade was discussed and studied down to the smallest detail. Engaging in this collaborative process with a distinguished architect was truly gratifying, embracing the opportunity to appreciate and contribute to their expertise.",
    ],
    collaboration: "Project by Arch. Boris Podrecca. Owner and construction company: Habitat Spa",
    coverImage: img("the-centrum-mall/01", "Curved metal roofline of the Centrum building against a blue sky"),
    gallery: gallery("the-centrum-mall", "The Centrum Mall", 5),
    featured: false,
    order: 2,
  },
  {
    slug: "a-floral-lobby",
    title: "A Floral Lobby",
    categorySlug: "hotels",
    type: "Hotel lobby",
    city: "Berlin",
    country: "Germany",
    year: 2020,
    description: [
      "An industrial yet elegant style was chosen for this hotel lobby in Berlin.",
      "The guests are welcomed by an ambiance that seamlessly blends the industrial with the elegant, creating a space that not only reflects the contemporary spirit of Berlin but also invites them to linger and appreciate the thoughtful interplay of design elements.",
    ],
    collaboration: CARLO,
    coverImage: img("a-floral-lobby/03", "Lobby with dark floral wallpaper and velvet armchairs"),
    gallery: gallery("a-floral-lobby", "A Floral Lobby", 5),
    featured: true,
    order: 1,
  },
  {
    slug: "brasserie-le-paris",
    title: "Brasserie Le Paris",
    categorySlug: "restaurants",
    type: "Restaurant",
    city: "Berlin",
    country: "Germany",
    year: 2019,
    description: [
      "A complete new Parisian look for the historic restaurant “Brasserie Le Paris” on Berlin's elegant Kurfürstendamm. Rich hues, plush upholstery, and subtle Art Nouveau touches converge to create a sophisticated ambiance.",
      "The interplay of ambient lighting with brass accents imparts a warm and inviting glow, while classic bistro elements infuse a touch of nostalgia. This carefully curated design captures the essence of Parisian chic, providing patrons with a refined yet comfortable space to savor culinary delights amidst an atmosphere that resonates with the city's iconic charm.",
    ],
    collaboration: CARLO,
    photoCredit: "Kfir Harbi",
    coverImage: img("brasserie-le-paris/04", "Dining room with red velvet banquettes and botanical murals"),
    gallery: gallery("brasserie-le-paris", "Brasserie Le Paris", 7),
    featured: true,
    order: 1,
  },
];

export const siteSettings: SiteSettings = {
  name: "Stilique",
  tagline: "Italian elegance, German precision.",
  description:
    "Stilique is an architecture and interior design studio in Bolzano and Berlin, led by Italian architect Sonia Guerzoni.",
  heroImages: [
    img("a-patch-of-green/01", "Green velvet sofa in a Berlin penthouse"),
    img("brasserie-le-paris/04", "Dining room of Brasserie Le Paris"),
    img("a-country-maison/04", "Living room of a country maison on Garda Lake"),
    img("a-floral-lobby/02", "Hotel lobby with a hanging garden above a long table"),
  ],
  philosophy: [
    "In today's realm of genuine luxury, our approach to interior design focuses on the details, taking you on a journey from start to finish to meet your exact requirements.",
    "We believe the formula of our meticulous workmanship, mixing harmonious color palettes with a seamless fusion of classic and contemporary design elements, caters uniquely to every distinctive style.",
  ],
  about: {
    founder: "Sonia Guerzoni",
    role: "Architect & Founder",
    bio: [
      "Sonia Guerzoni, an Italian architect, is the visionary behind Stilique. Her work merges Italian elegance with German precision, shaped by years of practice between South Tyrol and Berlin.",
      "From the first sketch to the final detail, she oversees every project personally, working closely with clients, craftspeople and partner studios.",
    ],
    quote: "I love style in all its forms. My goal is to find the right one to create your space.",
    image: img("a-japanese-penthouse/02", "Sculpted wooden chair in a calm, light interior"),
  },
  services: [
    {
      title: "Architecture",
      text: "Planning of architectural structures, from structural engineering to construction follow-up.",
    },
    {
      title: "Interior design",
      text: "Complete interior concepts: layout, materials, colour palettes, lighting and inner fixtures.",
    },
    {
      title: "Furniture design",
      text: "Bespoke furniture and custom pieces, crafted to fit each space and its story.",
    },
    {
      title: "Landscaping",
      text: "Outdoor spaces designed as a natural continuation of the architecture.",
    },
  ],
  offices: [
    {
      city: "Bolzano",
      country: "Italy",
      addressLines: ["Via Agruzzo 56", "39100 Bolzano"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Via+Agruzzo+56+39100+Bolzano",
    },
    {
      city: "Berlin",
      country: "Germany",
      addressLines: ["Kurfürstendamm 33", "10719 Berlin"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Kurf%C3%BCrstendamm+33+10719+Berlin",
    },
  ],
  email: "info@stilique.it",
  phone: "+39 348 748 8620",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/stiliqe/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/101520894/" },
  ],
};
