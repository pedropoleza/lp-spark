// Gera avatares realistas pros contatos mock da demo (OpenAI gpt-image-1).
// Uso: OPENAI_API_KEY=... node scripts/gen-demo-avatars.mjs
// Falha graciosamente por imagem; o componente cai em monograma se faltar.
import { writeFileSync, mkdirSync } from "node:fs";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error("sem OPENAI_API_KEY"); process.exit(1); }

const OUT = new URL("../public/demo/avatars/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const people = [
  { f: "ana", p: "warm professional headshot of a Brazilian woman in her early 30s, friendly genuine smile, business casual blazer" },
  { f: "joao", p: "warm professional headshot of a Brazilian man in his late 40s, kind confident smile, light shirt" },
  { f: "marcos", p: "warm professional headshot of a Brazilian man in his 30s, approachable smile, casual modern look" },
  { f: "carla", p: "warm professional headshot of a Brazilian woman in her 40s, confident warm expression, professional" },
  { f: "pedro", p: "warm professional headshot of a Brazilian man in his 50s, trustworthy gentle smile, business casual" },
  { f: "lucia", p: "warm professional headshot of a young Brazilian woman late 20s, bright friendly smile" },
];
const base =
  "photorealistic, soft even studio lighting, plain very light cool-gray background, shallow depth of field, centered, high quality, no text, no watermark";

const gen = async ({ f, p }) => {
  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt: `${p}. ${base}`, size: "1024x1024", quality: "low", n: 1 }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j).slice(0, 200));
  const b64 = j.data?.[0]?.b64_json;
  if (!b64) throw new Error("sem imagem");
  writeFileSync(new URL(`${f}.png`, OUT), Buffer.from(b64, "base64"));
  console.log("OK", f);
};

let ok = 0;
for (const person of people) {
  try { await gen(person); ok++; } catch (e) { console.error("ERRO", person.f, String(e).slice(0, 160)); }
}
console.log(`\navatares gerados: ${ok}/${people.length}`);
