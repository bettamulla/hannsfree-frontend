export function buildBrandKitText(idea) {
  const [bg, a, b, text] = idea.palette;
  return `
HannsFree Brand Kit
===================

Brand Name: ${idea.name}
Tagline: ${idea.tagline}

Palette:
- Background: ${bg}
- Accent A: ${a}
- Accent B: ${b}
- Text: ${text}

Font Pair:
- Headings: ${idea.fontPair[0]}
- Body: ${idea.fontPair[1]}

Suggested Domains:
- ${idea.domains.join("\n- ")}

Notes:
- Keep the layout minimal.
- Use Accent A for buttons/links.
- Use Accent B for highlights/badges.
`.trim();
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
