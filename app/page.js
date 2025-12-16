"use client";

import { useMemo, useState } from "react";
import { buildBrandIdeas } from "../lib/brandEngine";
import { buildBrandKitText, downloadText } from "../lib/exportKit";

export default function Page() {
  const [seed, setSeed] = useState("");
  const [style, setStyle] = useState("Modern");
  const [count, setCount] = useState(12);

  const ideas = useMemo(() => {
    if (!seed.trim()) return [];
    return buildBrandIdeas(seed, style, count);
  }, [seed, style, count]);

  return (
    <main className="container">
      <div className="hero">
        <div>
          <h1 className="h1">HannsFree</h1>
          <p className="sub">Brand names that feel like they already exist — plus mini brand kits.</p>
        </div>
        <div className="small">v1: generator + kits • next: AI mode + saved accounts + Stripe</div>
      </div>

      <section className="panel">
        <div className="row">
          <label className="label">
            Brand seed
            <input
              className="input"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="e.g. Cognia, Puffer, Bettamul"
            />
          </label>

          <label className="label">
            Style
            <select className="select" value={style} onChange={(e) => setStyle(e.target.value)}>
              <option>Modern</option>
              <option>Luxury</option>
              <option>Playful</option>
            </select>
          </label>

          <label className="label">
            How many
            <select className="select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[12, 24, 36].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <button className="btn" onClick={() => setSeed((s) => s.trim())}>
            Generate
          </button>
        </div>

        <div className="footerNote">
          Tip: short seeds hit harder (one word). Example: “Cognia”, “Bettamul”, “Hanns”.
        </div>
      </section>

      <section className="panel">
        <div className="small">Results</div>

        {!seed.trim() ? (
          <div style={{ marginTop: 10 }} className="small">Type a seed and press Generate.</div>
        ) : (
          <div className="grid">
            {ideas.map((idea) => (
              <div key={idea.name} className="card">
                <div className="cardTitle">{idea.name}</div>
                <div className="small">{idea.tagline}</div>

                <div className="badges">
                  <span className="badge">{idea.fontPair[0]}</span>
                  <span className="badge">{idea.fontPair[1]}</span>
                  <span className="badge">{idea.domains[0]}</span>
                </div>

                <div className="palette">
                  {idea.palette.map((c) => (
                    <div key={c} className="swatch" style={{ background: c }} title={c} />
                  ))}
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    className="btn"
                    onClick={() => navigator.clipboard.writeText(idea.name)}
                  >
                    Copy name
                  </button>

                  <button
                    className="btn"
                    onClick={() => {
                      const text = buildBrandKitText(idea);
                      downloadText(`${idea.name.replace(/\s+/g, "_")}_brand_kit.txt`, text);
                    }}
                  >
                    Download kit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
