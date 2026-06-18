import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.headline,
  keywords: [
    site.name,
    "Full-Stack Software Engineer",
    "AI Engineering",
    "React",
    "Next.js",
    "Fintech",
    site.location,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.headline,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.headline,
  },
};

// JSON-LD: ayuda a Google a entenderte como entidad (Knowledge Graph).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.headline,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider>
          <AmbientBackground />
          <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 lg:grid lg:grid-cols-[400px_1fr] lg:gap-4 lg:px-8">
            <Sidebar />
            <div className="min-w-0">
              <main className="w-full px-2 md:px-6">{children}</main>
              <Footer />
            </div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
