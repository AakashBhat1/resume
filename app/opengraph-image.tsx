import { ImageResponse } from "next/og";
import { portfolioData } from "@/constants/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(14,165,233,0.35), transparent 50%), radial-gradient(circle at 80% 10%, rgba(45,212,191,0.3), transparent 40%), #0f172a",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          color: "#e2e8f0",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#67e8f9",
            marginBottom: "16px",
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, marginBottom: "12px" }}>{portfolioData.personal.name}</div>
        <div style={{ fontSize: 34, maxWidth: "900px", color: "#cbd5e1" }}>{portfolioData.personal.title}</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
