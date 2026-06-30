import { ImageResponse } from "next/og";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params;
  const size = Math.min(Math.max(parseInt(sizeParam) || 192, 16), 1024);
  const S = size / 40;

  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#dc2626",
        borderRadius: 10 * S,
        display: "flex",
        position: "relative",
      }}
    >
      {/* Tine sinistra */}
      <div style={{ position: "absolute", left: 9 * S, top: 8 * S, width: 3.5 * S, height: 12 * S, backgroundColor: "white", borderRadius: 1.75 * S }} />
      {/* Tine centrale */}
      <div style={{ position: "absolute", left: 18.25 * S, top: 8 * S, width: 3.5 * S, height: 12 * S, backgroundColor: "white", borderRadius: 1.75 * S }} />
      {/* Tine destra */}
      <div style={{ position: "absolute", left: 27.5 * S, top: 8 * S, width: 3.5 * S, height: 12 * S, backgroundColor: "white", borderRadius: 1.75 * S }} />
      {/* Crossbar */}
      <div style={{ position: "absolute", left: 9 * S, top: 18 * S, width: 22 * S, height: 3.5 * S, backgroundColor: "white", borderRadius: 1.75 * S }} />
      {/* Manico */}
      <div style={{ position: "absolute", left: 18.25 * S, top: 18 * S, width: 3.5 * S, height: 14 * S, backgroundColor: "white", borderRadius: 1.75 * S }} />
    </div>,
    { width: size, height: size }
  );
}
