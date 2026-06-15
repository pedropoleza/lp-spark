// Reduz os avatares gerados (1024px PNG) para webp 256px (leves p/ web).
import sharp from "sharp";
import { readdirSync, unlinkSync } from "node:fs";

const dir = new URL("../public/demo/avatars/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".png"));
for (const f of files) {
  const src = new URL(f, dir).pathname;
  const out = new URL(f.replace(".png", ".webp"), dir).pathname;
  await sharp(src).resize(256, 256, { fit: "cover", position: "top" }).webp({ quality: 82 }).toFile(out);
  unlinkSync(src);
  console.log("ok", f, "→ webp");
}
console.log(`otimizados: ${files.length}`);
