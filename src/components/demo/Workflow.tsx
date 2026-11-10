import { useState } from "react";
import { byBrand, type Brand, type ProductAsset } from "@/lib/manifest";
import { ModelViewer } from "@/components/ModelViewer";
import { cn } from "@/lib/utils";

const briefs: Record<Brand, string> = {
  bluey:
    "Develop three collectible character concepts for a potential Bluey-themed product line, including a classic edition, an adventure edition, and a premium mystery collectible.",
  beast:
    "Develop a modular Beast Games challenge playset: an arena base, a precision challenge station, and a final prize vault that can be sold as an expandable system.",
};

const stages = [
  { n: 1, t: "Define the concept" },
  { n: 2, t: "Generate concept imagery" },
  { n: 3, t: "Convert images into 3D" },
  { n: 4, t: "Iterate and refine" },
  { n: 5, t: "Render, present, evaluate" },
  { n: 6, t: "Export and hand off" },
];

export function BrandToggle({ brand, setBrand }: { brand: Brand; setBrand: (b: Brand) => void }) {
  return (
    <div className="inline-flex rounded-full border bg-card p-1 text-sm font-medium">
      {(["bluey", "beast"] as Brand[]).map((b) => (
        <button
          key={b}
          onClick={() => setBrand(b)}
          className={cn(
            "rounded-full px-4 py-1.5 transition",
            brand === b ? (b === "bluey" ? "bg-bluey text-ink-foreground" : "bg-beast text-ink-foreground") : "text-muted-foreground hover:text-foreground",
          )}
        >
          {b === "bluey" ? "Bluey" : "Beast Games"}
        </button>
      ))}
    </div>
  );
}

function CompareSlider({ p }: { p: ProductAsset }) {
  const [mode, setMode] = useState<"2d" | "3d">("2d");
  return (
    <div>
      <div className="mb-3 inline-flex rounded-full border bg-card p-1 text-sm">
        {(["2d", "3d"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={cn("rounded-full px-4 py-1.5", mode === m ? "bg-ink text-ink-foreground" : "text-muted-foreground")}>
            {m === "2d" ? "Original Concept" : "3D Result"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <figure className={cn("studio-surface aspect-square overflow-hidden rounded-2xl border transition", mode === "3d" && "md:opacity-50")}>
          <img src={p.imagePath} alt={`${p.productName} 2D concept`} className="h-full w-full object-cover" />
        </figure>
        <figure className={cn("studio-surface aspect-square overflow-hidden rounded-2xl border transition", mode === "2d" && "md:opacity-60")}>
          <ModelViewer src={p.glbPath} poster={p.imagePath} alt={`${p.productName} 3D model`} className="h-full w-full" />
        </figure>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Drag the 3D model to rotate. Both sides are the same Meshy-generated product.</p>
    </div>
  );
}

export function Workflow({ brand, setBrand }: { brand: Brand; setBrand: (b: Brand) => void }) {
  const [stage, setStage] = useState(1);
  const [pick, setPick] = useState(0);
  const items = byBrand(brand);
  const p = (items[pick] ?? items[0])!;

  return (
    <section id="workflow" className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow">Designer Workflow Studio</p>
      <h2 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">From Creative Brief to 3D Concept — Without Starting From Scratch.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        See how your designers could use Meshy to explore ideas, generate 3D assets, refine concepts, and prepare visual materials for product-development reviews.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <BrandToggle brand={brand} setBrand={(b) => { setBrand(b); setPick(0); }} />
      </div>

      <ol className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-6">
        {stages.map((s) => (
          <li key={s.n}>
            <button
              onClick={() => setStage(s.n)}
              className={cn("w-full rounded-xl border p-3 text-left text-sm transition", stage === s.n ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-foreground/30")}
            >
              <span className="block text-xs opacity-70">Stage {s.n}</span>
              <span className="font-semibold">{s.t}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-3xl border bg-card p-6 md:p-10">
        {stage === 1 && (
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl bg-muted p-6">
              <p className="eyebrow">Creative brief · {brand === "bluey" ? "Bluey" : "Beast Games"}</p>
              <p className="mt-3 font-display text-2xl leading-snug">"{briefs[brand]}"</p>
            </div>
            <div>
              <p className="font-semibold">Designers start with what they already have:</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {["A written creative brief", "Existing character reference art", "A product sketch", "A mood board or visual direction", "Approved franchise design guidelines"].map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-primary-foreground">●</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div>
            <h3 className="text-2xl font-bold">Concept Image Exploration</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {brand === "bluey"
                ? "Generate a consistent character, explore costume variations, and keep recognizable proportions and design language."
                : "Develop visual concepts for the modular arena, a precision challenge station, and the final prize vault — exploring materials, colors and component layouts."}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {items.map((x) => (
                <figure key={x.productId} className="studio-surface overflow-hidden rounded-2xl border">
                  <img src={x.imagePath} alt={x.productName} loading="lazy" className="aspect-square w-full object-cover" />
                  <figcaption className="bg-card p-3 text-sm font-semibold">{x.productName}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div>
              <h3 className="text-2xl font-bold">Meshy Image-to-3D</h3>
              <ol className="mt-4 space-y-2 text-sm">
                {["Upload a reference image", "Select generation settings", "Generate an initial 3D mesh", "Rotate to inspect geometry", "Retry or refine as necessary", "Apply textures and materials"].map((x, i) => (
                  <li key={x} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold">{i + 1}</span>{x}</li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-2">
                {items.map((x, i) => (
                  <button key={x.productId} onClick={() => setPick(i)} className={cn("rounded-full border px-3 py-1 text-xs", pick === i && "border-ink bg-ink text-ink-foreground")}>{x.variantName}</button>
                ))}
              </div>
              <a className="mt-6 inline-block text-sm font-semibold underline underline-offset-4" href="https://help.meshy.ai/en/articles/9996860-how-to-use-meshy-image-to-3d" target="_blank" rel="noreferrer">Meshy Image-to-3D guide ↗</a>
            </div>
            <CompareSlider key={p.productId} p={p} />
          </div>
        )}

        {stage === 4 && (
          <div>
            <h3 className="text-2xl font-bold">Explore More Creative Directions Before Committing.</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Create variations, update textures and colorways, refine geometry, reduce polygon counts, and prepare models for downstream tools. Meshy supports AI texturing and remeshing — designers remain responsible for creative approval and any manual refinement.
            </p>
            <p className="mt-6 font-semibold">Compare Design Directions</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {items.map((x) => (
                <div key={x.productId} className="rounded-2xl border p-3">
                  <img src={x.imagePath} alt={x.productName} loading="lazy" className="studio-surface aspect-square w-full rounded-xl object-cover" />
                  <p className="mt-3 font-semibold">{x.variantName}</p>
                  <p className="text-sm text-muted-foreground">{x.description}</p>
                  <p className="mt-2 text-xs"><span className="font-semibold">Why it matters: </span>{x.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 5 && <PresentStudio items={items} />}

        {stage === 6 && (
          <div>
            <h3 className="text-2xl font-bold">Move From Concept Exploration to Your Existing Design Workflow.</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["GLB", "Interactive web previews, 3D presentations, web visualization"],
                ["FBX / OBJ", "Further editing in compatible 3D apps and creative workflows"],
                ["STL / 3MF", "3D-printing preparation and prototype evaluation"],
                ["USDZ", "Compatible augmented-reality visualization"],
              ].map(([f, d]) => (
                <div key={f} className="rounded-2xl bg-muted p-4"><p className="font-display text-xl font-bold">{f}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-medium">
              {["Creative Brief", "Concept Image", "Meshy 3D Model", "Design Refinement", "Stakeholder Review", "Engineering / Prototyping"].map((s, i, a) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={cn("rounded-full border px-3 py-1.5", s === "Meshy 3D Model" && "border-transparent bg-primary text-primary-foreground")}>{s}</span>
                  {i < a.length - 1 && <span className="text-muted-foreground">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
              Generated models may still require topology adjustments, engineering refinement, printability checks, safety review, licensing approval, and manufacturing preparation. The goal is workflow acceleration — not replacing established product-development disciplines.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function PresentStudio({ items }: { items: ProductAsset[] }) {
  const modes = ["Product Studio", "Collection View", "Executive Review", "DTC Concept"] as const;
  const [m, setM] = useState<(typeof modes)[number]>("Product Studio");
  const hero = items[0]!;
  return (
    <div>
      <h3 className="text-2xl font-bold">Turn 3D Concepts Into Compelling Product Presentations.</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {modes.map((x) => (
          <button key={x} onClick={() => setM(x)} className={cn("rounded-full border px-4 py-1.5 text-sm", m === x && "border-ink bg-ink text-ink-foreground")}>{x}</button>
        ))}
      </div>
      <div className="mt-6">
        {m === "Product Studio" && (
          <div className="studio-surface aspect-[16/9] overflow-hidden rounded-2xl border">
            <ModelViewer src={hero.glbPath} poster={hero.imagePath} alt={hero.productName} className="h-full w-full" />
          </div>
        )}
        {m === "Collection View" && (
          <div className="studio-surface grid grid-cols-3 gap-2 rounded-2xl border p-6">
            {items.map((x) => <img key={x.productId} src={x.imagePath} alt={x.productName} className="w-full rounded-xl" />)}
          </div>
        )}
        {m === "Executive Review" && (
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((x) => (
              <div key={x.productId} className="rounded-2xl border p-4">
                <img src={x.imagePath} alt={x.productName} className="studio-surface aspect-square w-full rounded-xl object-cover" />
                <p className="mt-3 font-semibold">{x.productName}</p>
                <p className="mt-1 text-sm"><span className="font-semibold">Rationale: </span>{x.rationale}</p>
                <p className="mt-1 text-xs text-muted-foreground">Design consideration: confirm licensing guidelines, safety and manufacturability before advancing.</p>
              </div>
            ))}
          </div>
        )}
        {m === "DTC Concept" && (
          <div className="grid items-center gap-8 rounded-2xl bg-ink p-8 text-ink-foreground md:grid-cols-2">
            <img src={hero.imagePath} alt={hero.productName} className="rounded-2xl" />
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70">Hypothetical drop · concept only</p>
              <p className="mt-2 font-display text-4xl font-bold">{hero.productName}</p>
              <p className="mt-3 opacity-80">{hero.description}</p>
              <span className="mt-6 inline-block rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">Join the waitlist (mock)</span>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Concept visualizations only — not approved or commercially available products.</p>
    </div>
  );
}
