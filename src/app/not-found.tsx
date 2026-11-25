import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-page flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="label text-stone">404</p>
      <h1 className="display-xl mt-6">
        This space <em>is empty.</em>
      </h1>
      <p className="mt-8 max-w-[44ch] leading-relaxed text-ink-soft">
        The page you are looking for has moved or no longer exists.
      </p>
      <Link href="/work" className="label link-underline mt-10">
        Explore our work →
      </Link>
    </div>
  );
}
