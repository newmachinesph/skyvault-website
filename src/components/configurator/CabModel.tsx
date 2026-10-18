"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useConfigurator } from "./ConfiguratorContext";
import { getCabSizeById } from "@/lib/data/elevator-options";
import { getMaterial, type MaterialProps } from "@/lib/material-map";

const SCALE = 0.02; // inches to scene units
const WALL_THICKNESS = 0.06;
const DOOR_WIDTH_INCHES = 42;

function Mat({ mat }: { mat: MaterialProps }) {
  return (
    <meshStandardMaterial
      color={mat.color}
      metalness={mat.metalness}
      roughness={mat.roughness}
      opacity={mat.opacity}
      transparent={mat.transparent}
      emissive={mat.emissive ?? "#000000"}
      emissiveIntensity={mat.emissiveIntensity ?? 0}
      side={THREE.DoubleSide}
    />
  );
}

export function CabModel() {
  const { config } = useConfigurator();

  const size = getCabSizeById(config.cabType, config.cabSize);

  const dims = useMemo(() => {
    if (!size) return { w: 80 * SCALE, d: 60 * SCALE, h: 96 * SCALE };
    return {
      w: size.width * SCALE,
      d: size.depth * SCALE,
      h: size.height * SCALE,
    };
  }, [size]);

  const wallMat = getMaterial("wall", config.wallFinish);
  const floorMat = getMaterial("floor", config.floorType);
  const ceilMat = getMaterial("ceiling", config.ceilingType);
  const hrMat = getMaterial("handrail", config.handrail);

  const doorW = DOOR_WIDTH_INCHES * SCALE;
  const sidePanelW = (dims.w - doorW) / 2;
  const wallH = dims.h - 2 * WALL_THICKNESS; // fit between floor and ceiling to avoid z-fighting

  const showHandrail = config.handrail && config.handrail !== "none";
  const isFlat = config.handrail === "brushed-ss-flat";
  const hrHeight = 34 * SCALE; // 34 inches from floor

  const showMirror = config.mirror && config.mirror !== "none";
  const mirrorOnRear = config.mirror === "half-rear" || config.mirror === "full-rear";
  const mirrorFull = config.mirror === "full-rear";

  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh position={[0, WALL_THICKNESS / 2, 0]} receiveShadow>
        <boxGeometry args={[dims.w, WALL_THICKNESS, dims.d]} />
        <Mat mat={floorMat} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, dims.h - WALL_THICKNESS / 2, 0]}>
        <boxGeometry args={[dims.w, WALL_THICKNESS, dims.d]} />
        <Mat mat={ceilMat} />
      </mesh>

      {/* Rear wall (back, full) */}
      <mesh position={[0, dims.h / 2, -dims.d / 2 + WALL_THICKNESS / 2]}>
        <boxGeometry args={[dims.w, wallH, WALL_THICKNESS]} />
        <Mat mat={wallMat} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-dims.w / 2 + WALL_THICKNESS / 2, dims.h / 2, 0]}>
        <boxGeometry args={[WALL_THICKNESS, wallH, dims.d]} />
        <Mat mat={wallMat} />
      </mesh>

      {/* Right wall */}
      <mesh position={[dims.w / 2 - WALL_THICKNESS / 2, dims.h / 2, 0]}>
        <boxGeometry args={[WALL_THICKNESS, wallH, dims.d]} />
        <Mat mat={wallMat} />
      </mesh>

      {/* Front wall - left panel */}
      {sidePanelW > 0 && (
        <mesh position={[-(doorW / 2 + sidePanelW / 2), dims.h / 2, dims.d / 2 - WALL_THICKNESS / 2]}>
          <boxGeometry args={[sidePanelW, wallH, WALL_THICKNESS]} />
          <Mat mat={wallMat} />
        </mesh>
      )}

      {/* Front wall - right panel */}
      {sidePanelW > 0 && (
        <mesh position={[(doorW / 2 + sidePanelW / 2), dims.h / 2, dims.d / 2 - WALL_THICKNESS / 2]}>
          <boxGeometry args={[sidePanelW, wallH, WALL_THICKNESS]} />
          <Mat mat={wallMat} />
        </mesh>
      )}

      {/* Front wall - header above door */}
      <mesh position={[0, dims.h * 0.9 - WALL_THICKNESS / 2, dims.d / 2 - WALL_THICKNESS / 2]}>
        <boxGeometry args={[doorW, dims.h * 0.2 - WALL_THICKNESS, WALL_THICKNESS]} />
        <Mat mat={wallMat} />
      </mesh>

      {/* Handrails */}
      {showHandrail && (
        <>
          {/* Left wall handrail — runs along Z (front-to-back) */}
          <mesh
            position={[-dims.w / 2 + WALL_THICKNESS + 0.035, hrHeight, 0]}
            rotation={isFlat ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
          >
            {isFlat ? (
              <boxGeometry args={[0.02, 0.04, dims.d * 0.7]} />
            ) : (
              <cylinderGeometry args={[0.02, 0.02, dims.d * 0.7, 16]} />
            )}
            <Mat mat={hrMat} />
          </mesh>

          {/* Left wall brackets */}
          {[-0.25, 0, 0.25].map((zOff) => (
            <mesh
              key={`lb-${zOff}`}
              position={[
                -dims.w / 2 + WALL_THICKNESS + 0.017,
                hrHeight,
                zOff * dims.d,
              ]}
            >
              <boxGeometry args={[0.035, 0.02, 0.015]} />
              <Mat mat={hrMat} />
            </mesh>
          ))}

          {/* Right wall handrail — runs along Z (front-to-back) */}
          <mesh
            position={[dims.w / 2 - WALL_THICKNESS - 0.035, hrHeight, 0]}
            rotation={isFlat ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
          >
            {isFlat ? (
              <boxGeometry args={[0.02, 0.04, dims.d * 0.7]} />
            ) : (
              <cylinderGeometry args={[0.02, 0.02, dims.d * 0.7, 16]} />
            )}
            <Mat mat={hrMat} />
          </mesh>

          {/* Right wall brackets */}
          {[-0.25, 0, 0.25].map((zOff) => (
            <mesh
              key={`rb-${zOff}`}
              position={[
                dims.w / 2 - WALL_THICKNESS - 0.017,
                hrHeight,
                zOff * dims.d,
              ]}
            >
              <boxGeometry args={[0.035, 0.02, 0.015]} />
              <Mat mat={hrMat} />
            </mesh>
          ))}

          {/* Rear wall handrail — runs along X (left-to-right) */}
          <mesh
            position={[0, hrHeight, -dims.d / 2 + WALL_THICKNESS + 0.035]}
            rotation={isFlat ? [0, 0, 0] : [0, 0, Math.PI / 2]}
          >
            {isFlat ? (
              <boxGeometry args={[dims.w * 0.7, 0.04, 0.02]} />
            ) : (
              <cylinderGeometry args={[0.02, 0.02, dims.w * 0.7, 16]} />
            )}
            <Mat mat={hrMat} />
          </mesh>

          {/* Rear wall brackets */}
          {[-0.25, 0, 0.25].map((xOff) => (
            <mesh
              key={`rr-${xOff}`}
              position={[
                xOff * dims.w,
                hrHeight,
                -dims.d / 2 + WALL_THICKNESS + 0.017,
              ]}
            >
              <boxGeometry args={[0.015, 0.02, 0.035]} />
              <Mat mat={hrMat} />
            </mesh>
          ))}
        </>
      )}

      {/* Mirror */}
      {showMirror && (
        <mesh
          position={
            mirrorOnRear
              ? [0, mirrorFull ? dims.h / 2 : dims.h * 0.65, -dims.d / 2 + WALL_THICKNESS + 0.005]
              : [-dims.w / 2 + WALL_THICKNESS + 0.005, dims.h * 0.65, 0]
          }
        >
          <boxGeometry
            args={
              mirrorOnRear
                ? [dims.w * 0.9, mirrorFull ? dims.h * 0.9 : dims.h * 0.45, 0.005]
                : [0.005, dims.h * 0.45, dims.d * 0.9]
            }
          />
          <meshStandardMaterial
            color="#e8e8f0"
            metalness={0.95}
            roughness={0.05}
            opacity={0.9}
            transparent
          />
        </mesh>
      )}

      {/* Interior lighting based on selection */}
      {config.lighting === "led-panel" && (
        <pointLight position={[0, dims.h - 0.1, 0]} intensity={2} color="#ffffff" />
      )}
      {config.lighting === "led-downlight" && (
        <>
          <pointLight position={[-dims.w * 0.25, dims.h - 0.1, -dims.d * 0.2]} intensity={1} color="#fff8e7" />
          <pointLight position={[dims.w * 0.25, dims.h - 0.1, dims.d * 0.2]} intensity={1} color="#fff8e7" />
        </>
      )}
      {config.lighting === "cove-lighting" && (
        <>
          <pointLight position={[0, dims.h - 0.05, -dims.d * 0.4]} intensity={0.8} color="#fff4e0" />
          <pointLight position={[0, dims.h - 0.05, dims.d * 0.4]} intensity={0.8} color="#fff4e0" />
          <pointLight position={[-dims.w * 0.4, dims.h - 0.05, 0]} intensity={0.6} color="#fff4e0" />
          <pointLight position={[dims.w * 0.4, dims.h - 0.05, 0]} intensity={0.6} color="#fff4e0" />
        </>
      )}
      {config.lighting === "fluorescent" && (
        <pointLight position={[0, dims.h - 0.1, 0]} intensity={1.5} color="#f5f5ff" />
      )}
    </group>
  );
}
