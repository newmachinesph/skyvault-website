import type { ConfiguratorState, ValidationError } from "@/types";

export function validateConfiguration(state: ConfiguratorState): ValidationError[] {
  const errors: ValidationError[] = [];

  // Freight cabs cannot have glass walls
  if (state.cabType === "freight" && state.wallFinish === "glass-panel") {
    errors.push({
      field: "wallFinish",
      message: "Glass panels are not available for freight elevators due to safety requirements.",
    });
  }

  // Marble/granite floors only on passenger cabs
  if (
    (state.floorType === "marble" || state.floorType === "granite") &&
    (state.cabType === "freight" || state.cabType === "service")
  ) {
    errors.push({
      field: "floorType",
      message: "Marble and granite flooring is only available for passenger elevators.",
    });
  }

  // Full mirror requires stainless steel, mirror stainless, or glass wall
  if (
    state.mirror === "full-rear" &&
    !["stainless-steel", "stainless-mirror", "glass-panel", "quilted-stainless"].includes(state.wallFinish)
  ) {
    errors.push({
      field: "mirror",
      message: "Full-wall mirror requires a stainless steel or glass wall finish for secure mounting.",
    });
  }

  // LED Panel lighting requires LED panel ceiling
  if (state.lighting === "led-panel" && state.ceilingType !== "led-panel") {
    errors.push({
      field: "lighting",
      message: "LED Panel lighting requires the LED Panel Ceiling type.",
    });
  }

  // Cove lighting not compatible with standard ceiling
  if (state.lighting === "cove-lighting" && state.ceilingType === "standard-white") {
    errors.push({
      field: "lighting",
      message: "Cove lighting requires a non-standard ceiling type (LED Panel, Stainless, or Suspended).",
    });
  }

  // Freight cabs should not have wood veneer or glass
  if (state.cabType === "freight" && state.wallFinish === "wood-veneer") {
    errors.push({
      field: "wallFinish",
      message: "Wood veneer is not recommended for freight elevators due to potential damage.",
    });
  }

  // Freight cabs should use rubber or epoxy floors
  if (
    state.cabType === "freight" &&
    !["rubber", "epoxy", "vinyl-tile"].includes(state.floorType)
  ) {
    errors.push({
      field: "floorType",
      message: "Freight elevators should use rubber, epoxy, or vinyl tile flooring for durability.",
    });
  }

  // COP options are mutually exclusive
  const copOptions = state.options.filter((o) => o.startsWith("cop-"));
  if (copOptions.length > 1) {
    errors.push({
      field: "options",
      message: "Please select only one Car Operating Panel (COP) style.",
    });
  }

  return errors;
}

export function getWarnings(state: ConfiguratorState): string[] {
  const warnings: string[] = [];

  if (state.cabType === "freight" && state.handrail === "none") {
    warnings.push("Consider adding a handrail for freight elevators for operator safety.");
  }

  if (state.cabType === "passenger-large" && !state.options.includes("emergency-phone")) {
    warnings.push("Emergency phone is recommended for large passenger elevators.");
  }

  return warnings;
}
