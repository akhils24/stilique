import type { ReactNode } from "react";

/** Simple long-form layout for legal pages. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="px-page pt-[calc(var(--header-h)+4rem)] pb-28 md:pt-[calc(var(--header-h)+7rem)] md:pb-40">
      <h1 className="display-lg">{title}</h1>
      <div className="mt-16 max-w-[68ch] space-y-6 leading-[1.8] text-ink-soft [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
        {children}
      </div>
    </div>
  );
}

/** Marks text the client still has to supply. Removed once real legal copy is in the CMS. */
export function Pending({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-accent bg-paper-deep px-5 py-4 text-sm text-ink">{children}</p>;
}
