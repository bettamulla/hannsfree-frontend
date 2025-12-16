export function buildBrandIdeas(seedRaw, style, count) {
  const seed = (seedRaw || "").trim();
  if (!seed) return [];

  const base = seedify(seed);

  const styleSets = {
    Modern: {
      prefixes: ["Neo", "Vertex", "Nova", "Bright", "Core", "Cloud", "Prime", "Flux"],
      suffixes: ["Labs", "Studio", "Systems", "Works", "Network", "Co", "Group", "Technologies"],
      vibes: ["clean", "fast", "digital", "minimal"],
    },
    Luxury: {
      prefixes: ["Maison", "Atelier", "Élan", "Aurum", "Noir", "Velvet", "Opal", "Royale"],
      suffixes: ["House", "Atelier", "Gallery", "Collective", "Society", "Bureau", "Maison", "Studio"],
      vibes: ["premium", "heritage", "crafted", "elevated"],
    },
    Playful: {
      prefixes: ["Happy", "Poppy", "Sunny", "Bubbly", "Cosy", "Cheeky", "Tiny", "Jolly"],
      suffixes: ["Club", "Corner", "Bazaar", "Market", "Kitchen", "Lane", "Loft", "Room"],
      vibes: ["fun", "friendly", "bright", "social"],
    },
  };

  const set = styleSets[style] || styleSets.Modern;

  const patterns = [
    () => `${base} ${pick(set.suffixes)}`,
    () => `${pick(set.prefixes)} ${base}`,
    () => `${base}${pick(["ly", "io", "ify", "labs", "ware", "nova", "co"])}`.replace(/\s+/g, ""),
    () => `${base} & ${titleCase(seedify(seed + " co"))}`.replace(/\sco$/i, ""),
    () => `${base} ${pick(["Collective", "HQ", "Studio", "Works"])}`,
  ];

  const results = new Set();
  let guard = 0;
  while (results.size < count && guard < 500) {
    guard++;
    results.add(cleanBrand(patterns[guard % patterns.length]()));
  }

  return [...results].slice(0, count).map((name) => ({
    name,
    tagline: makeTagline(name, set.vibes),
    palette: makePalette(style),
    fontPair: fontPair(style),
    domains: suggestDomains(name),
  }));
}

function seedify(s) {
  const cleaned = s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(Boolean);
  const core = words[0] || "Cognia";
  return titleCase(core);
}

function cleanBrand(s) {
  return s
    .replace(/\s+/g, " ")
    .replace(/\s(&)\s/g, " $1 ")
    .trim();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function makeTagline(name, vibes) {
  const verbs = ["Built for", "Designed for", "Made to feel", "Created for", "Powered by"];
  const nouns = ["momentum", "clarity", "growth", "precision", "craft", "culture", "speed", "trust"];
  return `${pick(verbs)} ${pick(vibes)} ${pick(nouns)}.`;
}

function makePalette(style) {
  if (style === "Luxury") return ["#0B0B0F", "#E8D7B7", "#5A4A3B", "#FFFFFF"];
  if (style === "Playful") return ["#0A0A0A", "#7C3AED", "#22C55E", "#FFFFFF"];
  return ["#0A0A0A", "#60A5FA", "#A78BFA", "#FFFFFF"];
}

function fontPair(style) {
  if (style === "Luxury") return ["Playfair Display", "Inter"];
  if (style === "Playful") return ["Sora", "Inter"];
  return ["Space Grotesk", "Inter"];
}

function suggestDomains(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return [`${slug}.com`, `${slug}.co`, `${slug}.io`];
}
