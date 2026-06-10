import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

/**
 * Seção 42 — imagem Open Graph gerada dinamicamente (1200x630).
 * Fundo grafite, logo Spark Leads, headline em inglês e os três planos,
 * com glow laranja/azul. Sem dependência de imagem externa.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0E1014",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(255,122,26,0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(47,107,255,0.30), transparent 55%)",
          color: "#F7F4EC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,122,26,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FF7A1A",
              fontSize: 30,
            }}
          >
            ⚡
          </div>
          Spark Leads
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            CRM, automations and AI for insurance agents
          </div>
          <div style={{ fontSize: 28, color: "#A7ADB8" }}>
            Starter · Growth · Agency — checkout seguro via Stripe
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {[
            { name: "Starter", price: "$79" },
            { name: "Growth", price: "$119" },
            { name: "Agency", price: "$249" },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "20px 28px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(21,24,33,0.6)",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#FF7A1A" }}>{`${p.price}/mo`}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
