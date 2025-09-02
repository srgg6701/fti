// generate.js
const fs = require("fs");
const path = require("path");

const uidlDir = path.join(process.cwd(), "uidl");
const outDir = path.join(process.cwd(), "generated");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(uidlDir).filter(f => f.endsWith(".json"));

for (const file of files) {
  const raw = fs.readFileSync(path.join(uidlDir, file), "utf-8");
  const data = JSON.parse(raw);

  const name = data.componentUIDLs?.[0]?.name || path.basename(file, ".json");
  const node = data.componentUIDLs?.[0]?.node;

  function renderNode(n) {
    if (!n) return "";
    const c = n.content;
    if (n.type === "element") {
      if (c.elementType === "text") {
        return `<span>${c.children?.map(ch => ch.content || "").join("")}</span>`;
      }
      if (c.elementType === "image") {
        const src = c.attrs?.src?.content || "";
        const alt = c.attrs?.alt?.content || "";
        return `<img src="${src}" alt="${alt}" />`;
      }
      const children = (c.children || []).map(renderNode).join("\n");
      return `<div>${children}</div>`;
    }
    if (n.type === "static") return n.content || "";
    return "";
  }

  const jsx = renderNode(node);

  const component = `
import React from "react";

export default function ${name}() {
  return (
    ${jsx}
  );
}
`;

  fs.writeFileSync(path.join(outDir, `${name}.tsx`), component, "utf-8");
  console.log(`✅ Сгенерирован компонент: ${name}`);
}
