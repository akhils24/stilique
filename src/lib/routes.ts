export const routes = {
  work: () => "/work",
  category: (categorySlug: string) => `/work/${categorySlug}`,
  project: (p: { categorySlug: string; slug: string }) => `/work/${p.categorySlug}/${p.slug}`,
};

/** Shared view-transition name so a project's cover morphs between card and page hero. */
export const coverTransitionName = (slug: string) => `cover-${slug}`;
