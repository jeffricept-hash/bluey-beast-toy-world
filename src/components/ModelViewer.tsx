import { createElement, useEffect, useState } from "react";

let loader: Promise<void> | null = null;
function loadViewer() {
  loader ??= import("@google/model-viewer").then(async () => {
    // Our GLBs are meshopt-compressed; this enables the bundled decoder.
    const El = (await customElements.whenDefined("model-viewer")) as unknown as { meshoptDecoderLocation: string };
    El.meshoptDecoderLocation = "/meshopt_decoder.js";
  });
  return loader;
}

export function ModelViewer({ src, poster, alt, className, interactive = true }: { src: string; poster?: string; alt: string; className?: string; interactive?: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    loadViewer().then(() => setReady(true));
  }, []);
  if (!ready) return <div className={className} />;
  return createElement("model-viewer", {
    src,
    alt,
    "camera-controls": interactive ? true : undefined,
    "auto-rotate": true,
    "auto-rotate-delay": "0",
    "rotation-per-second": "25deg",
    "interaction-prompt": "none",
    loading: "lazy",
    "shadow-intensity": "1",
    exposure: "1.05",
    "environment-image": "neutral",
    "touch-action": "pan-y",
    "data-poster": poster,
    class: className,
    style: { width: "100%", height: "100%", background: "transparent" },
  });
}
