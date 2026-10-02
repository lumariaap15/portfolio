import { ImageResponse } from "next/og";

// Favicon generado: iniciales "LA" en negro sobre blanco, acento ámbar.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
          fontWeight: 700,
          color: "#221f1a",
          backgroundColor: "#f6f3ec",
          border: "3px solid #9a3324",
          borderRadius: 14,
          fontFamily: "sans-serif",
        }}
      >
        LA
      </div>
    ),
    { ...size }
  );
}
