import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.headline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.headline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="mx-auto w-full max-w-5xl px-6 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
