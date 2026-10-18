export interface MaterialProps {
  color: string;
  metalness: number;
  roughness: number;
  opacity: number;
  transparent: boolean;
  emissive?: string;
  emissiveIntensity?: number;
}

export const wallMaterials: Record<string, MaterialProps> = {
  "stainless-steel": { color: "#c0c0c0", metalness: 0.8, roughness: 0.3, opacity: 1, transparent: false },
  "stainless-mirror": { color: "#d4d4d4", metalness: 0.95, roughness: 0.05, opacity: 1, transparent: false },
  "laminate-white": { color: "#f5f5f0", metalness: 0, roughness: 0.6, opacity: 1, transparent: false },
  "laminate-woodgrain": { color: "#8B6914", metalness: 0, roughness: 0.7, opacity: 1, transparent: false },
  "glass-panel": { color: "#b8d4e3", metalness: 0.1, roughness: 0.05, opacity: 0.35, transparent: true },
  "wood-veneer": { color: "#a0744a", metalness: 0, roughness: 0.7, opacity: 1, transparent: false },
  "quilted-stainless": { color: "#b8b8b8", metalness: 0.7, roughness: 0.4, opacity: 1, transparent: false },
};

export const floorMaterials: Record<string, MaterialProps> = {
  "vinyl-tile": { color: "#d4c9a8", metalness: 0, roughness: 0.5, opacity: 1, transparent: false },
  "vinyl-plank": { color: "#9c7c5c", metalness: 0, roughness: 0.6, opacity: 1, transparent: false },
  "marble": { color: "#e8e0d4", metalness: 0.1, roughness: 0.15, opacity: 1, transparent: false },
  "granite": { color: "#4a4a4a", metalness: 0.1, roughness: 0.2, opacity: 1, transparent: false },
  "rubber": { color: "#3a3a3a", metalness: 0, roughness: 0.9, opacity: 1, transparent: false },
  "epoxy": { color: "#808888", metalness: 0.05, roughness: 0.1, opacity: 1, transparent: false },
};

export const ceilingMaterials: Record<string, MaterialProps> = {
  "standard-white": { color: "#f0f0f0", metalness: 0, roughness: 0.8, opacity: 1, transparent: false },
  "led-panel": { color: "#ffffff", metalness: 0, roughness: 0.3, opacity: 1, transparent: false, emissive: "#ffffff", emissiveIntensity: 0.5 },
  "stainless-ceiling": { color: "#c0c0c0", metalness: 0.8, roughness: 0.3, opacity: 1, transparent: false },
  "custom-suspended": { color: "#e8e8e8", metalness: 0.05, roughness: 0.5, opacity: 1, transparent: false },
};

export const handrailMaterials: Record<string, MaterialProps> = {
  "brushed-ss-round": { color: "#c0c0c0", metalness: 0.8, roughness: 0.3, opacity: 1, transparent: false },
  "brushed-ss-flat": { color: "#c0c0c0", metalness: 0.8, roughness: 0.3, opacity: 1, transparent: false },
  "brass-round": { color: "#d4a843", metalness: 0.7, roughness: 0.3, opacity: 1, transparent: false },
  "wood-handrail": { color: "#8B6914", metalness: 0, roughness: 0.7, opacity: 1, transparent: false },
};

export const defaultMaterial: MaterialProps = {
  color: "#cccccc",
  metalness: 0,
  roughness: 0.5,
  opacity: 1,
  transparent: false,
};

export function getMaterial(category: string, id: string): MaterialProps {
  switch (category) {
    case "wall": return wallMaterials[id] ?? defaultMaterial;
    case "floor": return floorMaterials[id] ?? defaultMaterial;
    case "ceiling": return ceilingMaterials[id] ?? defaultMaterial;
    case "handrail": return handrailMaterials[id] ?? defaultMaterial;
    default: return defaultMaterial;
  }
}
