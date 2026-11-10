import { useState } from "react";
import { capacity, commercial, innovation } from "@/lib/calc";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Field({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input type="number" min={0} step={step} value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2 font-semibold" />
    </label>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-ink p-4 text-ink-foreground">
      <p className="text-xs opacity-70">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

const proof = [
  { name: "Thorns Tavern", ind: "Tabletop gaming & 3D-printed miniatures", metric: "80%", what: "lower production cost", rel: "An example of AI-assisted 3D creation supporting physical miniature production, making it a relevant comparison for collectible toys and tabletop game concepts.", src: "https://www.meshy.ai/use-cases" },
  { name: "37 Interactive Entertainment", ind: "Game development", metric: "50%", what: "less production time for game asset modeling", rel: "Demonstrates how AI-assisted 3D asset generation can accelerate production while remaining part of a professional creative workflow.", src: "https://www.meshy.ai/customers" },
  { name: "Jupiter", ind: "Glasses-free 3D display technology", metric: "98%", what: "faster basic model production", rel: "Illustrates the potential speed improvement for certain foundational 3D modeling tasks.", src: "https://www.meshy.ai/use-cases" },
  { name: "RetroStyle Games", ind: "Game art production", metric: "1 mo → 1 wk", what: "asset-pack development", rel: "Shows how an established art team integrated Meshy into a professional production workflow.", src: "https://www.meshy.ai/customers" },
];

export function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow">Proven results from Meshy customers</p>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">Creative Teams Are Already Seeing the Impact.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">Examples of how organizations have used Meshy to accelerate 3D asset production and improve creative efficiency.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {proof.map((c) => (
          <div key={c.name} className="flex flex-col rounded-3xl border bg-card p-6">
            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.ind}</p>
            <p className="mt-6 font-display text-5xl font-bold">{c.metric}</p>
            <p className="text-sm">{c.what}</p>
            <p className="mt-4 flex-1 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Why it matters for Moose: </span>{c.rel}</p>
            <a href={c.src} target="_blank" rel="noreferrer" className="mt-4 text-sm font-semibold underline underline-offset-4">Source ↗</a>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-4xl text-xs text-muted-foreground">
        Results are reported by Meshy for individual customer workflows. Actual performance depends on asset complexity, design requirements, workflow adoption, and refinement needs. These results are not projections or guarantees for Moose Toys.
      </p>
    </section>
  );
}

export function Calculator() {
  const [mode, setMode] = useState<"A" | "B">("A");
  const [a, setA] = useState({ concepts: 200, traditionalHours: 40, meshyHours: 12, hourlyCost: 75 });
  const [b, setB] = useState({ designers: 10, conceptsPerMonth: 4, variationsPerConcept: 3, extraVariations: 3, advancePct: 20 });
  const [c, setC] = useState({ launches: 0, revenuePerLaunch: 0, marginPct: 0, costs: 0 });
  const ra = capacity(a), rb = innovation(b), rc = commercial(c);
  const max = Math.max(rb.baselineVariations, rb.baselineVariations + rb.additionalVariations, 1);

  return (
    <section id="calculator" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Business impact calculator</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Model the opportunity with your own assumptions.</h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">All defaults are illustrative placeholders, not Moose Toys data. Replace them with your team's numbers.</p>
        <div className="mt-8 inline-flex rounded-full border bg-background p-1 text-sm">
          {([["A", "Creative Capacity"], ["B", "Product Innovation Opportunity"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setMode(k)} className={cn("rounded-full px-4 py-1.5", mode === k ? "bg-ink text-ink-foreground" : "text-muted-foreground")}>{l}</button>
          ))}
        </div>

        {mode === "A" ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Annual concepts" value={a.concepts} onChange={(v) => setA({ ...a, concepts: v })} />
              <Field label="Traditional modeling hrs / concept" value={a.traditionalHours} onChange={(v) => setA({ ...a, traditionalHours: v })} />
              <Field label="Meshy-assisted hrs / concept" value={a.meshyHours} onChange={(v) => setA({ ...a, meshyHours: v })} />
              <Field label="Blended hourly cost ($)" value={a.hourlyCost} onChange={(v) => setA({ ...a, hourlyCost: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Hours freed / yr" value={fmt(ra.hoursFreed)} />
              <Stat label="Effort reduction" value={`${Math.round(ra.reduction * 100)}%`} />
              <Stat label="Labor capacity value" value={usd(ra.value)} />
              <Stat label="Theoretical extra concepts" value={fmt(ra.extraConcepts)} />
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Designers using Meshy" value={b.designers} onChange={(v) => setB({ ...b, designers: v })} />
              <Field label="Concepts / designer / month" value={b.conceptsPerMonth} onChange={(v) => setB({ ...b, conceptsPerMonth: v })} />
              <Field label="Avg variations / concept" value={b.variationsPerConcept} onChange={(v) => setB({ ...b, variationsPerConcept: v })} />
              <Field label="Extra variations enabled" value={b.extraVariations} onChange={(v) => setB({ ...b, extraVariations: v })} />
              <Field label="% advanced to formal review" value={b.advancePct} onChange={(v) => setB({ ...b, advancePct: v })} />
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Baseline concepts / yr" value={fmt(rb.baselineConcepts)} />
                <Stat label="Baseline variations / yr" value={fmt(rb.baselineVariations)} />
                <Stat label="Additional variations / yr" value={fmt(rb.additionalVariations)} />
                <Stat label="Extra advanced to review" value={fmt(rb.advanced)} />
              </div>
              <div className="mt-6 space-y-3 text-sm">
                {[["Baseline", rb.baselineVariations, "bg-chart-5"], ["With Meshy", rb.baselineVariations + rb.additionalVariations, "bg-chart-2"]].map(([l, v, cl]) => (
                  <div key={l as string}>
                    <div className="flex justify-between"><span>{l}</span><span className="font-semibold">{fmt(v as number)} variations</span></div>
                    <div className="mt-1 h-3 rounded-full bg-muted"><div className={cn("h-3 rounded-full transition-all", cl as string)} style={{ width: `${((v as number) / max) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <details className="mt-10 rounded-2xl border bg-background p-6">
          <summary className="cursor-pointer font-semibold">Model a Commercial Opportunity</summary>
          <p className="mt-2 text-xs text-muted-foreground">Illustrative only — enter your own defensible assumptions. Kept separate from Meshy's documented customer results.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <Field label="Incremental launches" value={c.launches} onChange={(v) => setC({ ...c, launches: v })} />
            <Field label="Net revenue / launch ($)" value={c.revenuePerLaunch} onChange={(v) => setC({ ...c, revenuePerLaunch: v })} step={1000} />
            <Field label="Contribution margin %" value={c.marginPct} onChange={(v) => setC({ ...c, marginPct: v })} />
            <Field label="Incremental costs ($)" value={c.costs} onChange={(v) => setC({ ...c, costs: v })} step={1000} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Stat label="Illustrative revenue" value={usd(rc.revenue)} />
            <Stat label="Illustrative contribution" value={usd(rc.contribution)} />
            <Stat label="After incremental costs" value={usd(rc.net)} />
          </div>
        </details>
      </div>
    </section>
  );
}

export function Opportunity() {
  const cards = [
    ["Faster Collectible Experimentation", "Explore more character variations, seasonal editions, and limited-release concepts before committing to detailed development.", "Example: Bluey collectible assortment", "#showcase"],
    ["More Efficient Product Concept Reviews", "Give design, marketing, licensing, and commercial stakeholders interactive 3D assets and visualizations earlier in the development process.", "Example: review collectible variants together", "#workflow"],
    ["Expandable Game Systems", "Rapidly visualize modular game components and potential expansions before committing to physical prototyping.", "Example: Beast Games Challenge Box", "#showcase"],
  ];
  return (
    <section id="opportunity" className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow">What this means for Moose Toys</p>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">Three commercial opportunities.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map(([t, d, e, h]) => (
          <a key={t} href={h} className="rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:border-foreground/30">
            <h3 className="text-2xl font-bold">{t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            <p className="mt-6 text-sm font-semibold">{e} →</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Pilot() {
  const weeks = [
    ["Week 1", "Kickoff, baseline capture, select 2–3 representative briefs (Bluey + Beast Games)."],
    ["Week 2", "Designers generate concepts with Meshy alongside existing methods."],
    ["Week 3", "Iterate, refine, export, and run stakeholder reviews."],
    ["Week 4", "Measure, compare, and deliver an executive readout."],
  ];
  const metrics = ["Time to first reviewable 3D model", "Hands-on modeling & refinement time", "Useful design variations", "Revision cycles", "Stakeholder acceptance rate", "Quality / usability of exports", "Cost per accepted concept", "Designer satisfaction", "Post-processing effort required"];
  return (
    <section id="pilot" className="bg-ink py-24 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">The ask</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">A four-week pilot to validate the workflow.</h2>
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {weeks.map(([w, d]) => (
            <div key={w} className="rounded-2xl border border-ink-foreground/15 p-5"><p className="font-display text-xl font-bold text-primary">{w}</p><p className="mt-2 text-sm opacity-80">{d}</p></div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold">Participants</h3>
            <ul className="mt-3 space-y-1 text-sm opacity-80">
              {["Product designer", "Creative lead", "Product development representative", "Licensing or brand stakeholder, where applicable", "Meshy technical / customer-success representative"].map((x) => <li key={x}>• {x}</li>)}
            </ul>
            <h3 className="mt-8 text-xl font-bold">Deliverables</h3>
            <ul className="mt-3 space-y-1 text-sm opacity-80">
              {["10–20 exploratory 3D concepts", "Documented creative workflows", "Model quality assessment", "Baseline-versus-pilot comparison", "Recommendations for future deployment", "Executive readout and expansion decision"].map((x) => <li key={x}>• {x}</li>)}
            </ul>
            <p className="mt-6 text-sm opacity-80">Same representative briefs, run with existing methods and Meshy-assisted methods side by side.</p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-background text-foreground">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
              <span>Executive scorecard</span><span>Baseline</span><span>Pilot</span>
            </div>
            {metrics.map((m) => (
              <div key={m} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-4 py-2.5 text-sm last:border-0">
                <span>{m}</span><span className="text-muted-foreground">TBM</span><span className="text-muted-foreground">TBM</span>
              </div>
            ))}
            <p className="px-4 py-3 text-xs text-muted-foreground">TBM = To Be Measured during the pilot. No outcomes are assumed.</p>
          </div>
        </div>
        <a href="mailto:?subject=Moose%20Toys%20%C3%97%20Meshy%20pilot" className="mt-12 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Schedule the pilot kickoff</a>
      </div>
    </section>
  );
}

export function Resources() {
  const links = [
    ["Meshy documentation", "https://docs.meshy.ai/en"],
    ["Image-to-3D workflow", "https://help.meshy.ai/en/articles/9996860-how-to-use-meshy-image-to-3d"],
    ["Post-processing guide", "https://docs.meshy.ai/en/webapp/guides/choosing/post-processing"],
    ["Meshy customer stories", "https://www.meshy.ai/customers"],
    ["Meshy use cases", "https://www.meshy.ai/use-cases"],
    ["Meshy API and integrations", "https://www.meshy.ai/api"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <details className="rounded-2xl border bg-card p-6">
        <summary className="cursor-pointer text-xl font-bold">Explore the Meshy Workflow</summary>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(([l, h]) => (
            <a key={h} href={h} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-muted">{l} ↗</a>
          ))}
        </div>
      </details>
    </section>
  );
}
