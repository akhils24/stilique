import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal-page";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default async function ImpressumPage() {
  const settings = await getSiteSettings();
  return (
    <LegalPage title="Impressum">
      <Pending>
        Legal notice to be provided by the client (required for the German office under § 5 DDG). The
        details below are taken from the current website and must be confirmed.
      </Pending>
      <h2>Responsible for content</h2>
      <p>
        {settings.about.founder}
        <br />
        {settings.offices.map((o) => (
          <span key={o.city} className="block">
            {o.addressLines.join(", ")}, {o.country}
          </span>
        ))}
      </p>
      <h2>Contact</h2>
      <p>
        Email: {settings.email}
        <br />
        Phone: {settings.phone}
      </p>
    </LegalPage>
  );
}
