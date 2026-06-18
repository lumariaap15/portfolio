import { ImageResponse } from "next/og";

// Favicon generado: iniciales "LA" sobre el gradiente de marca.
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
          color: "#000000",
          backgroundImage: "linear-gradient(140deg, #ffac41, #ff1e56)",
          fontFamily: "sans-serif",
        }}
      >
        LA
      </div>
    ),
    { ...size }
  );
}
