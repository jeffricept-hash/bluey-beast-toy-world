import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Brand } from "@/lib/manifest";
import { ModelViewer } from "@/components/ModelViewer";
import { Workflow } from "@/components/demo/Workflow";
import { Showcase } from "@/components/demo/Showcase";
import { Calculator, Opportunity, Pilot, Proof, Resources } from "@/components/demo/Business";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moose Toys × Meshy — 3D Product Innovation Lab" },
      { name: "description", content: "Interactive demo: how Meshy AI could help Moose Toys explore Bluey and Beast Games product concepts in 3D." },
      { property: "og:title", content: "Moose Toys × Meshy — 3D Product Innovation Lab" },
      { property: "og:description", content: "Bluey collectibles and Beast Games playsets, from creative brief to interactive 3D with Meshy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "exec" | "design";

const answers: Record<View, [string, string][]> = {
  exec: [
    ["What could Meshy help us do?", "Turn briefs and concept art into reviewable 3D in hours, not weeks."],
    ["Why our categories?", "Collectibles and playsets live on variation — more sculpts, finishes and expansions."],
    ["What's the evidence?", "Reported customer results from miniatures and game studios, below."],
    ["What's the ask?", "A four-week pilot with measured, side-by-side results."],
  ],
  design: [
    ["What do I upload?", "A brief, reference art, a sketch, or approved concept images."],
    ["How do I get 3D?", "Image-to-3D generates a textured mesh you can rotate, retry and refine."],
    ["What can I export?", "GLB, FBX, OBJ, STL, 3MF and USDZ for your existing tools."],
    ["What stays manual?", "Creative approval, topology clean-up, engineering, safety and licensing."],
  ],
};

function Index() {
  const [view, setView] = useState<View>("exec");
  const [brand, setBrand] = useState<Brand>("bluey");
  const [hero, setHero] = useState(0);
  const h = products[hero] ?? products[0]!;

  return (
    <main>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <p className="font-display text-lg font-bold">Moose Toys <span className="text-muted-foreground">×</span> Meshy</p>
          <nav className="hidden gap-6 text-sm text-muted-foreground lg:flex">
            <a href="#workflow">Workflow</a><a href="#showcase">Products</a><a href="#proof">Proof</a><a href="#calculator">ROI</a><a href="#pilot">Pilot</a>
          </nav>
          <div className="inline-flex rounded-full border bg-card p-1 text-xs font-semibold">
            {([["exec", "Executive View"], ["design", "Designer View"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setView(k)} className={cn("rounded-full px-3 py-1.5", view === k ? "bg-ink text-ink-foreground" : "text-muted-foreground")}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">Product Innovation Lab · Concept demo</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] md:text-6xl">
            Explore more toys <span className="rounded-xl bg-primary px-2">in 3D</span> before you sculpt a single one.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Six Bluey and Beast Games concepts, generated with Meshy from 2D renderings into rotatable 3D models — and what that workflow could mean for Moose Toys.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {answers[view].map(([q, a]) => (
              <div key={q} className="rounded-2xl border bg-card p-4">
                <p className="text-sm font-semibold">{q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="studio-surface relative aspect-square overflow-hidden rounded-[2rem] border">
            <ModelViewer key={h.productId} src={h.glbPath} poster={h.imagePath} alt={h.productName} className="h-full w-full" />
            <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold">Live Meshy model · drag to rotate</span>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {products.map((p, i) => (
              <button key={p.productId} onClick={() => setHero(i)} title={p.productName} className={cn("studio-surface overflow-hidden rounded-xl border-2", i === hero ? "border-ink" : "border-transparent")}>
                <img src={p.imagePath} alt={p.productName} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm font-semibold">{h.productName}</p>
        </div>
      </section>

      {view === "design" ? (
        <>
          <Workflow brand={brand} setBrand={setBrand} />
          <Showcase />
          <Opportunity />
          <Proof />
          <Calculator />
          <Pilot />
        </>
      ) : (
        <>
          <Opportunity />
          <Showcase />
          <Proof />
          <Calculator />
          <Workflow brand={brand} setBrand={setBrand} />
          <Pilot />
        </>
      )}
      <Resources />
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        Concept demonstration for discussion. Bluey and Beast Games concepts are hypothetical, not approved or commercially available products. All 3D assets generated with Meshy.
      </footer>
    </main>
  );
}
