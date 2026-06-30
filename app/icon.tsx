import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Scala dal viewBox 40×40 a 512×512
const S = 512 / 40;

const rect = (
  left: number,
  top: number,
  width: number,
  height: number,
  radius: number
) => ({
  position: "absolute" as const,
  left: left * S,
  top: top * S,
  width: width * S,
  height: height * S,
  backgroundColor: "white",
  borderRadius: radius * S,
});

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 512,
        height: 512,
        backgroundColor: "#dc2626",
        borderRadius: 10 * S,
        display: "flex",
        position: "relative",
      }}
    >
      {/* Tine sinistra */}
      <div style={rect(9, 8, 3.5, 12, 1.75)} />
      {/* Tine centrale */}
      <div style={rect(18.25, 8, 3.5, 12, 1.75)} />
      {/* Tine destra */}
      <div style={rect(27.5, 8, 3.5, 12, 1.75)} />
      {/* Crossbar */}
      <div style={rect(9, 18, 22, 3.5, 1.75)} />
      {/* Manico */}
      <div style={rect(18.25, 18, 3.5, 14, 1.75)} />
    </div>,
    { ...size }
  );
}
