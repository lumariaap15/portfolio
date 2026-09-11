import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { isLocale, getMessages, locales } from "@/i18n/getMessages";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Imagen que aparece al compartir el link en LinkedIn / WhatsApp / Twitter.
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f3ec",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6b6255",
          }}
        >
          {site.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 90, fontWeight: 700, lineHeight: 1.1, color: "#221f1a" }}>
            {t.hero.headline}
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#6b6255" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#6b6255" }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#9a3324" }} />
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
