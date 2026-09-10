import { ImageResponse } from "next/og";

export const alt = "BravSystems — Tecnologia aplicada à gestão e operação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#0b2947", color: "white" }}>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2, color: "#8db8dc" }}>BRAVSYSTEMS</div>
      <div style={{ marginTop: 28, maxWidth: 940, fontSize: 64, lineHeight: 1.05, fontWeight: 800 }}>Sistemas para organizar, controlar e fazer a operação evoluir.</div>
      <div style={{ marginTop: 34, fontSize: 26, color: "#c8ddec" }}>Operação • Financeiro • Pessoas • Comunicação • Treinamento</div>
      <div style={{ marginTop: 60, fontSize: 22, color: "#8db8dc" }}>bravsystems.com.br</div>
    </div>,
    size,
  );
}
