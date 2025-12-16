"use client";

import { useMemo, useState } from "react";

function generate(seed, count, style) {
  const s = (seed || "Cognia").trim();

  const suffixesModern = [" Labs", " Studio", " Co", " Systems", " Group", " Works", " Network", " Supply"];
  const suffixesLuxury = [" Atelier", " Maison", " Collective", " Gallery", " Society", " Bureau", " House"];
  const suffixesPlayful = [" Club", " Corner", " Bazaar", " Market", " Kitchen", " Lane", " Loft", " Room"];

  const list =
    style === "Luxury" ? suffixesLuxury :
    style === "Playful" ? suffixesPlayful :
    suffixesModern;

  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(`${s}${list[i % list.length]}`);
  }
  return out;
}

export default function Page() {
  const [seed, setSeed] = useState("");
  const [style, setStyle] = useState("Modern");
  const [count, setCount] = useState(24);

  const results = useMemo(() => {
    if (!seed.trim()) return [];
    return generate(seed, count, style);
  }, [seed, count, style]);

  return (
    <main style={{ minHeight: "100vh", padding: 28, fontFamily: "ui-serif, Georgia, serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>HannsFree</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>Brand names that feel like they already exist.</p>

        <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <label>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Brand seed</div>
            <input
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="e.g. Cognia, Puffer, Bettamul"
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                width: 260,
                outline: "none",
              }}
            />
          </label>

          <label>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Style</div>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
              }}
            >
              <option value="Modern">Modern</option>
              <option value="Luxury">Luxury</option>
              <option value="Playful">Playful</option>
            </select>
          </label>

          <label>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>How many</div>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
              }}
            >
              {[12, 24, 36, 48].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <button
            onClick={() => setSeed((v) => v.trim())}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.12)",
              color: "white",
              cursor: "pointer",
              marginTop: 18,
            }}
          >
            Generate
          </button>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 10 }}>Results</div>

          {!seed.trim() ? (
            <div style={{ opacity: 0.7 }}>Type a seed and hit Generate.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {results.map((r) => (
                <div
                  key={r}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 18, opacity: 0.7, fontSize: 12 }}>
          Next: better generator + Stripe paywall + saved brand kits.
        </div>
      </div>
    </main>
  );
}
    style={{ marginLeft: 8 }}
  >
    {[12, 24, 36, 48].map(n => (
      <option key={n} value={n}>{n}</option>
    ))}
  </select>
</div>

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
