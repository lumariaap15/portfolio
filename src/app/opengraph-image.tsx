import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen que aparece al compartir el link en LinkedIn / WhatsApp / Twitter.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
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
            color: "#a8a8a8",
          }}
        >
          {site.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 1,
              backgroundImage: "linear-gradient(115deg, #ffac41 0%, #ff1e56 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 44, color: "#f5f3ef" }}>
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            color: "#a8a8a8",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundImage: "linear-gradient(115deg, #ffac41 0%, #ff1e56 100%)",
            }}
          />
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
