import { useState } from "react";
import { products, type ProductAsset } from "@/lib/manifest";
import { ModelViewer } from "@/components/ModelViewer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const filters = ["All Concepts", "Bluey Collectibles", "Beast Games", "Concept Art", "Product Renderings", "Interactive 3D"] as const;

export function Showcase() {
  const [f, setF] = useState<(typeof filters)[number]>("All Concepts");
  const [open, setOpen] = useState<{ p: ProductAsset; mode: "img" | "3d" } | null>(null);
  const [zoom, setZoom] = useState(false);
  const list = products.filter((p) => f === "Bluey Collectibles" ? p.brand === "bluey" : f === "Beast Games" ? p.brand === "beast" : true);

  return (
    <section id="showcase" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Product Rendering Showcase</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">From Digital Concepts to Shelf-Worthy Imagination.</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">Explore how early-stage 3D assets can support product visualization, assortment planning, and creative review.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)} className={cn("rounded-full border px-4 py-1.5 text-sm", f === x && "border-ink bg-ink text-ink-foreground")}>{x}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.productId} className="group overflow-hidden rounded-3xl border bg-background">
              <div className="studio-surface aspect-square w-full overflow-hidden">
                <ModelViewer src={p.glbPath} alt={`${p.productName} 3D model`} className="h-full w-full" />
              </div>
              <div className="p-5">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", p.brand === "bluey" ? "bg-bluey-soft text-bluey" : "bg-beast-soft text-beast")}>{p.conceptCategory}</span>
                <h3 className="mt-3 text-xl font-bold">{p.productName}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => setOpen({ p, mode: "3d" })} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Explore in 3D</button>
                  <button onClick={() => { setZoom(false); setOpen({ p, mode: "img" }); }} className="rounded-full border px-4 py-2 text-sm font-semibold">Original 2D concept</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl">
          {open && (
            <>
              <DialogTitle>{open.p.productName}</DialogTitle>
              <div className="studio-surface aspect-square max-h-[70vh] w-full overflow-hidden rounded-2xl">
                {open.mode === "3d" ? (
                  <ModelViewer src={open.p.glbPath} poster={open.p.imagePath} alt={open.p.productName} className="h-full w-full" />
                ) : (
                  <img
                    src={open.p.imagePath}
                    alt={open.p.productName}
                    onClick={() => setZoom(!zoom)}
                    className={cn("h-full w-full cursor-zoom-in object-contain transition duration-300", zoom && "scale-[1.8] cursor-zoom-out")}
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <p className="text-muted-foreground">{open.p.description}</p>
                <button onClick={() => setOpen({ p: open.p, mode: open.mode === "3d" ? "img" : "3d" })} className="shrink-0 rounded-full border px-4 py-1.5 font-semibold">
                  {open.mode === "3d" ? "View 2D concept" : "Explore in 3D"}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
