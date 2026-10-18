"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { CabModel } from "./CabModel";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e5e5e5" wireframe />
    </mesh>
  );
}

export function CabViewer3D({ className }: { className?: string }) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className={className}>
      <div className="relative bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg overflow-hidden" style={{ height: 350 }}>
        <Canvas
          key={resetKey}
          camera={{ position: [3, 2, 3], fov: 40 }}
          shadows
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={0.6} castShadow />
          <Suspense fallback={<LoadingFallback />}>
            <CabModel />
            <Environment preset="studio" environmentIntensity={0.3} />
          </Suspense>
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            maxPolarAngle={Math.PI * 0.85}
            minPolarAngle={Math.PI * 0.1}
          />
          <gridHelper args={[10, 20, "#d0d0d0", "#e8e8e8"]} position={[0, -1, 0]} />
        </Canvas>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-white/80 hover:bg-white rounded shadow text-gray-600 transition-colors"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
