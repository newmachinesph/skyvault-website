export interface CabType {
  id: string;
  name: string;
  description: string;
  sizes: CabSize[];
}

export interface CabSize {
  id: string;
  label: string;
  width: number; // inches
  depth: number; // inches
  height: number; // inches
  capacity: string;
}

export interface FinishOption {
  id: string;
  name: string;
  category: "wall" | "floor" | "ceiling" | "handrail";
  description: string;
  priceModifier?: string;
}

export interface LightingOption {
  id: string;
  name: string;
  description: string;
}

export interface MirrorOption {
  id: string;
  name: string;
  description: string;
}

export interface AccessoryOption {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface ConfiguratorState {
  cabType: string;
  cabSize: string;
  wallFinish: string;
  floorType: string;
  ceilingType: string;
  handrail: string;
  lighting: string;
  mirror: string;
  options: string[];
}

export interface LeadInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectInfo: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ConfigurationWithLead {
  id: string;
  cabType: string;
  cabSize: string;
  wallFinish: string;
  floorType: string;
  ceilingType: string;
  handrail: string;
  lighting: string;
  mirror: string;
  options: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  lead: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    projectInfo: string;
  } | null;
}
