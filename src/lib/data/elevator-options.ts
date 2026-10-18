import type { CabType, FinishOption, LightingOption, MirrorOption, AccessoryOption } from "@/types";

export const cabTypes: CabType[] = [
  {
    id: "passenger-standard",
    name: "Passenger - Standard",
    description: "Standard passenger elevator for mid-rise buildings",
    sizes: [
      { id: "ps-2100", label: '2100 lb (6\'8" x 4\'3")', width: 80, depth: 51, height: 96, capacity: "2,100 lbs / 14 persons" },
      { id: "ps-2500", label: '2500 lb (6\'8" x 5\'3")', width: 80, depth: 63, height: 96, capacity: "2,500 lbs / 16 persons" },
      { id: "ps-3000", label: '3000 lb (6\'8" x 5\'7")', width: 80, depth: 67, height: 96, capacity: "3,000 lbs / 20 persons" },
    ],
  },
  {
    id: "passenger-large",
    name: "Passenger - Large",
    description: "Large passenger elevator for high-rise buildings",
    sizes: [
      { id: "pl-3500", label: '3500 lb (8\'0" x 5\'5")', width: 96, depth: 65, height: 96, capacity: "3,500 lbs / 23 persons" },
      { id: "pl-4000", label: '4000 lb (8\'0" x 6\'5")', width: 96, depth: 77, height: 96, capacity: "4,000 lbs / 26 persons" },
    ],
  },
  {
    id: "freight",
    name: "Freight",
    description: "Heavy-duty freight elevator for cargo transport",
    sizes: [
      { id: "fr-5000", label: '5000 lb (8\'0" x 8\'0")', width: 96, depth: 96, height: 108, capacity: "5,000 lbs" },
      { id: "fr-8000", label: '8000 lb (8\'0" x 10\'0")', width: 96, depth: 120, height: 108, capacity: "8,000 lbs" },
      { id: "fr-10000", label: '10000 lb (10\'0" x 12\'0")', width: 120, depth: 144, height: 108, capacity: "10,000 lbs" },
    ],
  },
  {
    id: "service",
    name: "Service",
    description: "Service elevator for staff and light cargo",
    sizes: [
      { id: "sv-3000", label: '3000 lb (6\'8" x 5\'7")', width: 80, depth: 67, height: 96, capacity: "3,000 lbs" },
      { id: "sv-4000", label: '4000 lb (8\'0" x 6\'5")', width: 96, depth: 77, height: 96, capacity: "4,000 lbs" },
    ],
  },
];

export const wallFinishes: FinishOption[] = [
  { id: "stainless-steel", name: "Stainless Steel #4", category: "wall", description: "Brushed stainless steel panels, durable and modern" },
  { id: "stainless-mirror", name: "Mirror Stainless Steel", category: "wall", description: "Mirror-finish stainless steel for a premium look" },
  { id: "laminate-white", name: "Laminate - White", category: "wall", description: "Clean white laminate panels" },
  { id: "laminate-woodgrain", name: "Laminate - Woodgrain", category: "wall", description: "Wood-grain textured laminate" },
  { id: "glass-panel", name: "Glass Panel", category: "wall", description: "Tempered glass wall panels with backlit option" },
  { id: "wood-veneer", name: "Wood Veneer - Oak", category: "wall", description: "Real wood veneer with clear coat finish" },
  { id: "quilted-stainless", name: "Quilted Stainless Steel", category: "wall", description: "Quilted pattern stainless steel panels" },
];

export const floorTypes: FinishOption[] = [
  { id: "vinyl-tile", name: "Vinyl Tile", category: "floor", description: "Commercial-grade vinyl tile flooring" },
  { id: "vinyl-plank", name: "Vinyl Plank", category: "floor", description: "Wood-look vinyl plank flooring" },
  { id: "marble", name: "Marble", category: "floor", description: "Natural marble floor tiles" },
  { id: "granite", name: "Granite", category: "floor", description: "Polished granite floor tiles" },
  { id: "rubber", name: "Rubber Flooring", category: "floor", description: "Heavy-duty rubber flooring" },
  { id: "epoxy", name: "Epoxy Coating", category: "floor", description: "Industrial epoxy floor coating" },
];

export const ceilingTypes: FinishOption[] = [
  { id: "standard-white", name: "Standard White", category: "ceiling", description: "Flat white ceiling panel with standard lighting" },
  { id: "led-panel", name: "LED Panel Ceiling", category: "ceiling", description: "Integrated LED panel ceiling for even illumination" },
  { id: "stainless-ceiling", name: "Stainless Steel", category: "ceiling", description: "Brushed stainless steel ceiling panel" },
  { id: "custom-suspended", name: "Suspended Ceiling", category: "ceiling", description: "Custom suspended ceiling with recessed details" },
];

export const handrailOptions: FinishOption[] = [
  { id: "brushed-ss-round", name: "Brushed SS Round Bar", category: "handrail", description: "1.5\" diameter brushed stainless steel round handrail" },
  { id: "brushed-ss-flat", name: "Brushed SS Flat Bar", category: "handrail", description: "Flat profile brushed stainless steel handrail" },
  { id: "brass-round", name: "Brass Round Bar", category: "handrail", description: "Polished brass round bar handrail" },
  { id: "wood-handrail", name: "Wood Handrail", category: "handrail", description: "Hardwood handrail with clear finish" },
  { id: "none", name: "No Handrail", category: "handrail", description: "No handrail installed" },
];

export const lightingOptions: LightingOption[] = [
  { id: "fluorescent", name: "Fluorescent", description: "Standard T8 fluorescent fixtures" },
  { id: "led-downlight", name: "LED Downlights", description: "Recessed LED downlight fixtures" },
  { id: "led-panel", name: "LED Panel", description: "Full-coverage LED panel integrated into ceiling" },
  { id: "cove-lighting", name: "Cove Lighting", description: "Indirect LED cove lighting around perimeter" },
];

export const mirrorOptions: MirrorOption[] = [
  { id: "none", name: "No Mirror", description: "No mirror panel" },
  { id: "half-rear", name: "Half Mirror - Rear Wall", description: "Upper half of rear wall mirror panel" },
  { id: "full-rear", name: "Full Mirror - Rear Wall", description: "Full rear wall mirror panel" },
  { id: "half-side", name: "Half Mirror - Side Wall", description: "Upper half of side wall mirror panel" },
];

export const accessoryOptions: AccessoryOption[] = [
  { id: "fan", name: "Ceiling Fan", description: "Built-in ceiling fan for ventilation", category: "ventilation" },
  { id: "emergency-phone", name: "Emergency Phone", description: "ADA-compliant emergency telephone", category: "safety" },
  { id: "digital-display", name: "Digital Floor Indicator", description: "LCD floor position indicator", category: "display" },
  { id: "cop-standard", name: "COP - Standard", description: "Standard car operating panel with push buttons", category: "controls" },
  { id: "cop-touchscreen", name: "COP - Touchscreen", description: "Modern touchscreen car operating panel", category: "controls" },
  { id: "cop-vandal-resistant", name: "COP - Vandal Resistant", description: "Heavy-duty vandal resistant operating panel", category: "controls" },
  { id: "security-camera", name: "Security Camera", description: "In-cab security camera with housing", category: "safety" },
  { id: "handrail-bumper", name: "Bumper Guards", description: "Protective bumper guards on lower walls", category: "protection" },
  { id: "moving-pad-hooks", name: "Moving Pad Hooks", description: "Wall-mounted hooks for protective moving pads", category: "protection" },
];

export function getCabTypeById(id: string) {
  return cabTypes.find((ct) => ct.id === id);
}

export function getCabSizeById(cabTypeId: string, sizeId: string) {
  const cabType = getCabTypeById(cabTypeId);
  return cabType?.sizes.find((s) => s.id === sizeId);
}

export function getOptionLabel(category: string, id: string): string {
  switch (category) {
    case "cabType": return cabTypes.find((ct) => ct.id === id)?.name ?? id;
    case "cabSize": {
      for (const ct of cabTypes) {
        const size = ct.sizes.find((s) => s.id === id);
        if (size) return size.label;
      }
      return id;
    }
    case "wallFinish": return wallFinishes.find((w) => w.id === id)?.name ?? id;
    case "floorType": return floorTypes.find((f) => f.id === id)?.name ?? id;
    case "ceilingType": return ceilingTypes.find((c) => c.id === id)?.name ?? id;
    case "handrail": return handrailOptions.find((h) => h.id === id)?.name ?? id;
    case "lighting": return lightingOptions.find((l) => l.id === id)?.name ?? id;
    case "mirror": return mirrorOptions.find((m) => m.id === id)?.name ?? id;
    case "options": return accessoryOptions.find((a) => a.id === id)?.name ?? id;
    default: return id;
  }
}
