"use client";

import { useMemo, useState } from "react";
import { generateBrandIdeas } from "../lib/generateBrand";

const styles = [
  { key: "modern", label: "Modern" },
  { key: "luxe", label: "Luxe" },
  { key: "playful", label: "Playful" },
  { key: "minimal", label: "Minimal" },
  { key: "edgy", label: "Edgy" },
];

export default function Page() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("modern");
  const [count, setCount] = useState(24);
  const [results, setResults] = useState([]);

  const canGenerate = name.trim().length > 0;

  const domainHints = useMemo(() => {
    const base = name.trim().toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    if (!base) return [];
    return [`${base}.com`, `${base}.co`, `${base}.ai`, `${base}.studio`].slice(0, 4);
  }, [name]);

  function onGenerate() {
    setResults(generateBrandIdeas(name, { style, count }));
  }

  async function copyAll() {
    const text = results.join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (
    <div className="shell">
      <header className="hero">
        <div className="logo">HannsFree</div>
        <div className="tag">Brand names that feel like they already exist.</div>
      </header>

      <section className="card">
        <div className="cardTitle">Generate</div>

        <div className="row">
          <label className="field">
            <span>Brand seed</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cognia, Puffer, Bettamulla"
            />
          </label>

          <button className="btnPrimary" onClick={onGenerate} disabled={!canGenerate}>
            Generate
          </button>
        </div>

        <div className="row row2">
          <label className="field">
            <span>Style</span>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              {styles.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>How many</span>
            <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[12, 24, 36, 48].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <button className="btnGhost" onClick={() => setResults([])} disabled={results.length === 0}>
            Clear
          </button>

          <button className="btnGhost" onClick={copyAll} disabled={results.length === 0}>
            Copy all
          </button>
        </div>

        {domainHints.length > 0 && (
          <div className="hint">
            <span className="hintLabel">Quick domains:</span>
            <div className="chips">
              {domainHints.map((d) => (
                <span key={d} className="chip">
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="results">
        <div className="resultsHeader">
          <div className="resultsTitle">Results</div>
          <div className="resultsSub">{results.length ? `${results.length} ideas` : "Generate to see ideas"}</div>
        </div>

        <div className="grid">
          {results.map((r, i) => (
            <button
              key={`${r}-${i}`}
              className="resultCard"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(r);
                } catch {}
              }}
              title="Click to copy"
            >
              <div className="resultName">{r}</div>
              <div className="resultMeta">tap to copy</div>
            </button>
          ))}
        </div>
      </section>

      <footer className="foot">
        <span>Next: AI mode + Stripe paywall + saved brand kits.</span>
      </footer>
    </div>
  );
}
