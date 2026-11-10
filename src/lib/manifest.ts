export type Brand = "bluey" | "beast";

/** Centralized asset manifest. Prompts / creation times intentionally left blank — not supplied. */
export interface ProductAsset {
  productId: string;
  productName: string;
  brand: Brand;
  conceptCategory: string;
  assetType: "Concept Render + Interactive 3D";
  imagePath: string;
  glbPath: string;
  renderAngle: string;
  variantName: string;
  description: string;
  workflowStage: string;
  rationale: string;
  sourcePrompt?: string;
  creationTime?: string;
  notes?: string;
}

export const products: ProductAsset[] = [
  {
    productId: "bluey-classic",
    productName: "Classic Bluey Collectible",
    brand: "bluey",
    conceptCategory: "Bluey Collectibles",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/classic-bluey-collectible.jpg",
    glbPath: "/meshy/classic-bluey-collectible.glb",
    renderAngle: "Front, studio",
    variantName: "Classic Edition",
    description: "Flocked-finish hero figure that keeps Bluey's recognizable proportions and palette.",
    workflowStage: "Image-to-3D",
    rationale: "Core assortment anchor: the most recognizable silhouette for broad retail appeal.",
    notes: "Meshy Image-to-3D with texture, compressed for web preview.",
  },
  {
    productId: "bluey-adventure",
    productName: "Bluey Adventure Edition",
    brand: "bluey",
    conceptCategory: "Bluey Collectibles",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/bluey-adventure-edition.jpg",
    glbPath: "/meshy/bluey-adventure-edition.glb",
    renderAngle: "Front, studio",
    variantName: "Adventure Edition",
    description: "Costume and accessory variation exploring a themed play pattern.",
    workflowStage: "Iterate & refine",
    rationale: "Accessory variants extend a single sculpt into multiple SKUs and seasonal drops.",
  },
  {
    productId: "bluey-mystery",
    productName: "Bluey Mystery Edition",
    brand: "bluey",
    conceptCategory: "Bluey Collectibles",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/bluey-mystery-edition.jpg",
    glbPath: "/meshy/bluey-mystery-edition.glb",
    renderAngle: "Front, studio",
    variantName: "Premium Mystery",
    description: "Iridescent, gold-accented chase figure exploring a premium finish.",
    workflowStage: "Material exploration",
    rationale: "Chase / rare finishes drive repeat blind-box purchase and collector demand.",
  },
  {
    productId: "beast-arena",
    productName: "Modular Challenge Arena",
    brand: "beast",
    conceptCategory: "Beast Games",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/modular-challenge-arena.jpg",
    glbPath: "/meshy/modular-challenge-arena.glb",
    renderAngle: "Isometric",
    variantName: "Arena Base",
    description: "Hex-tile playset with swappable challenge pods around a central logo stage.",
    workflowStage: "Image-to-3D",
    rationale: "A modular base lets each expansion pack plug into one system.",
  },
  {
    productId: "beast-station",
    productName: "Precision Challenge Station",
    brand: "beast",
    conceptCategory: "Beast Games",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/precision-challenge-station.jpg",
    glbPath: "/meshy/precision-challenge-station.glb",
    renderAngle: "Isometric",
    variantName: "Challenge Pod",
    description: "Skill-based station concept exploring components and layout.",
    workflowStage: "Iterate & refine",
    rationale: "Individual pods are a natural add-on SKU for the arena system.",
  },
  {
    productId: "beast-vault",
    productName: "Final Vault",
    brand: "beast",
    conceptCategory: "Beast Games",
    assetType: "Concept Render + Interactive 3D",
    imagePath: "/meshy/final-vault.jpg",
    glbPath: "/meshy/final-vault.glb",
    renderAngle: "Isometric",
    variantName: "Endgame Set",
    description: "Prize-vault finale with coin rewards and a lock-wheel centerpiece.",
    workflowStage: "Render & present",
    rationale: "A premium finale set gives the line a hero price point.",
  },
];

export const byBrand = (b: Brand) => products.filter((p) => p.brand === b);
