import { createElement, useEffect, useState } from "react";

export function ModelViewer({ src, poster, alt, className }: { src: string; poster?: string; alt: string; className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);
  if (!ready) {
    return (
      <div className={className}>
        {poster && <img src={poster} alt={alt} className="h-full w-full object-contain opacity-60" />}
      </div>
    );
  }
  return createElement("model-viewer", {
    src,
    poster,
    alt,
    "camera-controls": true,
    "auto-rotate": true,
    "shadow-intensity": "1",
    exposure: "1.05",
    "environment-image": "neutral",
    "touch-action": "pan-y",
    class: className,
    style: { width: "100%", height: "100%", background: "transparent" },
  });
}
