// Avatares de depoimento (agentes). Otimizar depois com opt-avatars.mjs.
import { writeFileSync, mkdirSync } from "node:fs";
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error("sem OPENAI_API_KEY"); process.exit(1); }
const OUT = new URL("../public/demo/avatars/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const people = [
  { f: "t1", p: "confident professional headshot of a Brazilian man in his 40s, life insurance agent, warm trustworthy smile, blazer" },
  { f: "t2", p: "confident professional headshot of a Brazilian woman in her 30s, financial advisor, bright warm smile, blazer" },
  { f: "t3", p: "confident professional headshot of a Brazilian man in his 30s, agency leader, friendly assured smile" },
];
const base = "photorealistic, soft studio lighting, plain light cool-gray background, centered, high quality, no text, no watermark";
const gen = async ({ f, p }) => {
  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt: `${p}. ${base}`, size: "1024x1024", quality: "low", n: 1 }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j).slice(0, 200));
  writeFileSync(new URL(`${f}.png`, OUT), Buffer.from(j.data[0].b64_json, "base64"));
  console.log("OK", f);
};
let ok = 0;
for (const person of people) { try { await gen(person); ok++; } catch (e) { console.error("ERRO", person.f, String(e).slice(0, 140)); } }
console.log(`testemunhos: ${ok}/${people.length}`);
