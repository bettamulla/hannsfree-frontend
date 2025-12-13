const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateBrand(brandNameRaw = "") {
  const brandName = String(brandNameRaw).trim() || "Untitled";

  const niches = [
    "Skincare", "Streetwear", "Coffee", "Fitness", "Tech", "Haircare",
    "Fragrance", "Jewelry", "Home Decor", "Supplements", "Creative Studio"
  ];

  const tones = ["clean", "luxury", "bold", "playful", "minimal", "futuristic"];

  const palettes = [
    { name: "Obsidian + Ice", colors: ["#0B0B0F", "#12121A", "#EAEAF2", "#8AA2FF", "#6D28D9"] },
    { name: "Noir + Neon", colors: ["#07070A", "#111118", "#F5F5FF", "#22C55E", "#F97316"] },
    { name: "Pink Cloud", colors: ["#0B0B0F", "#141424", "#FFF1F8", "#FF4FD8", "#7C3AED"] },
  ];

  const taglines = [
    `Built to make ${pick(["ideas", "brands", "launches", "moves"])} happen fast.`,
    `From name to identity in minutes.`,
    `Your next brand, on demand.`,
    `A brand engine for people who don’t wait.`,
  ];

  const vibeLines = [
    `Tone: ${pick(tones)}. Niche: ${pick(niches)}.`,
    `Designed for scroll-stopping clarity.`,
    `Made for fast launches and clean conversion.`,
  ];

  const brandNames = [
    brandName,
    `${brandName} Labs`,
    `${brandName} Co.`,
    `${brandName} Studio`,
    `${brandName} Supply`,
  ];

  const palette = pick(palettes);

  const features = [
    "Logo direction (wordmark + icon ideas)",
    "Colour palette + typography pairing",
    "3 launch post captions",
    "Homepage hero copy",
    "Product naming ideas",
  ];

  return {
    input: brandName,
    suggestions: [...new Set(brandNames)].slice(0, 4),
    tagline: pick(taglines),
    vibe: pick(vibeLines),
    palette,
    deliverables: features.sort(() => Math.random() - 0.5).slice(0, 4),
  };
}
