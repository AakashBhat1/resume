import { ImageResponse } from "next/og";
import { portfolioData } from "@/constants/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#FBF6EE",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#C4541C",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#2B1E16",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          {portfolioData.personal.name}
        </div>
        <div
          style={{
            height: "4px",
            width: "100px",
            backgroundColor: "#E3A33A",
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            fontSize: 32,
            maxWidth: "960px",
            color: "#6E5A4B",
            lineHeight: 1.35,
          }}
        >
          {portfolioData.personal.title}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
