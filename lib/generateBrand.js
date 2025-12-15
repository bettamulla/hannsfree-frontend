// lib/generateBrand.js

const clean = (s) =>
  (s || "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 '&-]/g, "")
    .slice(0, 48);

const titleCase = (s) =>
  s
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

const uniq = (arr) => [...new Set(arr.map((x) => x.trim()))].filter(Boolean);

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const blend = (a, b) => {
  const A = a.replace(/\s/g, "");
  const B = b.replace(/\s/g, "");
  if (A.length < 4 || B.length < 4) return `${A}${B}`;
  const cutA = Math.max(2, Math.floor(A.length * (0.55 + Math.random() * 0.15)));
  const cutB = Math.max(2, Math.floor(B.length * (0.35 + Math.random() * 0.15)));
  return `${A.slice(0, cutA)}${B.slice(B.length - cutB)}`;
};

export function generateBrandIdeas(input, opts = {}) {
  const seed = titleCase(clean(input));
  if (!seed) return [];

  const style = opts.style || "modern"; // modern | luxe | playful | minimal | edgy
  const count = Math.min(Math.max(opts.count || 24, 8), 60);

  const industries = {
    modern: ["Labs", "Studio", "Works", "Systems", "Digital", "Group", "Network", "Creative"],
    luxe: ["Atelier", "Maison", "Collective", "Society", "Reserve", "Heritage", "Noir", "Signature"],
    playful: ["Club", "Garden", "House", "Buddy", "Pop", "Sprout", "Spark", "Jelly"],
    minimal: ["Co", "Company", "Office", "Bureau", "Field", "Form", "Line", "Base"],
    edgy: ["Riot", "Fever", "Ghost", "Neon", "Voltage", "Grime", "Void", "Rogue"],
  };

  const prefixes = {
    modern: ["Neo", "Hyper", "Nova", "Meta", "Prime", "Bright", "Core", "Clear"],
    luxe: ["Saint", "Velvet", "Golden", "Royal", "Silk", "Opal", "Ivory", "Monarch"],
    playful: ["Super", "Happy", "Lil", "Mega", "Bouncy", "Sunny", "Yum", "Zippy"],
    minimal: ["True", "Pure", "Mono", "Zero", "Plain", "Calm", "Kind", "Simple"],
    edgy: ["Dead", "Black", "Night", "Acid", "Dark", "Cold", "Raw", "Null"],
  };

  const suffixes = industries[style] || industries.modern;
  const pre = prefixes[style] || prefixes.modern;

  const extraWords = [
    "Collective",
    "Supply",
    "Society",
    "Vault",
    "Signal",
    "Foundry",
    "District",
    "Avenue",
    "Index",
    "Factory",
    "Market",
    "Bureau",
    "Arc",
    "Wave",
  ];

  const baseTokens = seed.split(" ").filter(Boolean);
  const main = baseTokens[0];
  const second = baseTokens[1] || pick(["Nova", "Atlas", "Bloom", "Orbit", "Echo", "Aura", "Pixel", "Haven"]);

  const candidates = [];

  // clean “brand patterns”
  candidates.push(`${seed} ${pick(suffixes)}`);
  candidates.push(`${pick(pre)} ${seed}`);
  candidates.push(`${seed} & ${second}`);
  candidates.push(`${seed} ${pick(extraWords)}`);
  candidates.push(`${main} ${pick(suffixes)}`);
  candidates.push(`${pick(pre)}${main}`);
  candidates.push(`${main}${pick(["ly", "ify", "io", "verse", "stack", "works", "labs"])}`);
  candidates.push(`${blend(main, second)}`);

  // batch generation
  for (let i = 0; i < 120; i++) {
    const pattern = Math.floor(Math.random() * 10);

    if (pattern === 0) candidates.push(`${seed} ${pick(suffixes)}`);
    if (pattern === 1) candidates.push(`${pick(pre)} ${seed}`);
    if (pattern === 2) candidates.push(`${main} ${pick(extraWords)}`);
    if (pattern === 3) candidates.push(`${blend(main, second)} ${pick(suffixes)}`);
    if (pattern === 4) candidates.push(`${blend(main, pick(extraWords))}`);
    if (pattern === 5) candidates.push(`${main}${pick(["ly", "ify", "io", "base", "house", "lane", "vault"])}`);
    if (pattern === 6) candidates.push(`${pick(pre)}${blend(main, second)}`);
    if (pattern === 7) candidates.push(`${seed} ${pick(["Co", "Studio", "Labs", "Collective", "Works"])}`);
    if (pattern === 8) candidates.push(`${main} & ${pick([second, "Co", "Studio", "Labs", "Works"])}`);
    if (pattern === 9) candidates.push(`${pick(["The", "Project", "House of", "Club"])} ${main}`);
  }

  // normalize + rank-ish (shorter & cleaner first)
  const out = uniq(
    candidates
      .map((x) => x.replace(/\s+/g, " ").trim())
      .map((x) => x.replace(/^\bThe The\b/i, "The"))
      .map((x) => x.replace(/\bCo Co\b/i, "Co"))
      .map((x) => x.replace(/\bStudio Studio\b/i, "Studio"))
      .map((x) => x.replace(/\bLabs Labs\b/i, "Labs"))
      .map((x) => x.slice(0, 36))
  )
    .filter((x) => x.length >= 3)
    .sort((a, b) => a.length - b.length);

  return out.slice(0, count);
}
