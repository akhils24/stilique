import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <Pending>
        Privacy policy (Datenschutzerklärung) to be provided by the client or their legal advisor. It should
        cover the contact form, hosting provider, and any analytics added before launch.
      </Pending>
    </LegalPage>
  );
}
