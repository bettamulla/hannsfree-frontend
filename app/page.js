"use client";
import { useState } from "react";

export default function Page() {
  const [seed, setSeed] = useState("");
  const [results, setResults] = useState([]);

  function generate() {
    if (!seed) return;

    const suffixes = [
      "Labs",
      "Studio",
      "Systems",
      "Group",
      "Works",
      "Collective",
      "HQ",
      "Industries",
      "Co"
    ];

    const output = suffixes.map(s => `${seed} ${s}`);
    setResults(output);
  }

  return (
    <main style={{ padding: 32, maxWidth: 640 }}>
      <h1>HannsFree</h1>
      <p>Brand names that feel like they already exist.</p>

      <input
        placeholder="e.g. Cognia, Puffer, Bettamulla"
        value={seed}
        onChange={e => setSeed(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
      />

      <button onClick={generate} style={{ padding: 8 }}>
        Generate
      </button>

      <ul style={{ marginTop: 16 }}>
        {results.map(r => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <p style={{ marginTop: 24, opacity: 0.6 }}>
        Next: AI mode + Stripe paywall + saved brand kits.
      </p>
    </main>
  );
}
            </select>
          </label>

          <div style={{ marginTop: 12 }}>
  <span>How many</span>
  <select
    value={count}
    onChange={(e) => setCount(Number(e.target.value))}
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
