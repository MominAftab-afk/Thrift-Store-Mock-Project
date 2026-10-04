import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import { RotateCcw, Play, Pause, Maximize2, Sparkles, Layers, Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Procedural stylized 3D sneaker mesh fallback for real WebGL rendering
function SneakerMesh({ color = "#141414", accentColor = "#8E3C20" }) {
  const meshRef = useRef();

  return (
    <group ref={meshRef} position={[0, -0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Sole / Midsole */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.4, 1.3]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Gum Outsole Base */}
      <mesh position={[0, -0.62, 0]} receiveShadow>
        <boxGeometry args={[3.25, 0.08, 1.32]} />
        <meshStandardMaterial color="#D29A53" roughness={0.7} />
      </mesh>
      {/* Main Upper Body */}
      <mesh position={[-0.1, 0.15, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Toe Box */}
      <mesh position={[1.1, -0.05, 0]} castShadow>
        <boxGeometry args={[1.0, 0.45, 1.15]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      {/* Collar & Ankle */}
      <mesh position={[-0.6, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 1.1]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      {/* Tongue */}
      <mesh position={[0.2, 0.7, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[0.3, 0.8, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>
      {/* Signature Side Swoosh / Stripe */}
      <mesh position={[0.1, 0.2, 0.62]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1.6, 0.15, 0.05]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.2, -0.62]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[1.6, 0.15, 0.05]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

export const InteractiveShoeViewer = ({
  shoe,
  activeImageIndex = 0,
  onSelectImage,
  className
}) => {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'turntable' | '3d'
  
  // Turntable State
  const [rotationAngle, setRotationAngle] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);

  // Auto-rotation loop
  useEffect(() => {
    let animId;
    if (isAutoRotating && viewMode === 'turntable') {
      const step = () => {
        setRotationAngle((prev) => (prev + 0.5) % 360);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, viewMode]);

  // Mouse / Touch drag handlers for turntable
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartAngle.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartX.current;
    // Map 300px horizontal drag to 360 deg
    const newAngle = (dragStartAngle.current + (deltaX * 0.9)) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Archival inspection hotspots on turntable
  const HOTSPOTS = [
    { id: 'toebox', label: '1. Suede Toe Box', angle: 45, x: '72%', y: '62%', text: 'Full grain leather with verified zero heel-drag.' },
    { id: 'stitching', label: '2. Quarter Stitching', angle: 135, x: '45%', y: '40%', text: 'Double needle stitch count verified under 10x loupe.' },
    { id: 'outsole', label: '3. Outsole Stars', angle: 260, x: '30%', y: '75%', text: '95% original traction pattern preserved.' },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      
      {/* Main Interactive Stage */}
      <div
        className="relative aspect-[4/3] bg-surface-subtle border border-surface-border rounded-md overflow-hidden shadow-fine select-none"
        onMouseDown={viewMode === 'turntable' ? handleMouseDown : undefined}
        onMouseMove={viewMode === 'turntable' ? handleMouseMove : undefined}
        onMouseUp={viewMode === 'turntable' ? handleMouseUp : undefined}
        onTouchStart={viewMode === 'turntable' ? handleMouseDown : undefined}
        onTouchMove={viewMode === 'turntable' ? handleMouseMove : undefined}
        onTouchEnd={viewMode === 'turntable' ? handleMouseUp : undefined}
      >
        {/* MODE 1: Gallery View */}
        {viewMode === 'gallery' && (
          <img
            src={shoe.images[activeImageIndex] || shoe.images[0]}
            alt={shoe.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
        )}

        {/* MODE 2: 360° Drag Turntable View */}
        {viewMode === 'turntable' && (
          <div className="w-full h-full flex items-center justify-center relative cursor-ew-resize">
            {/* Visual representation rotating based on angle */}
            <div
              className="w-4/5 h-4/5 transition-transform duration-75 flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={shoe.images[0]}
                alt={shoe.name}
                className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-xl"
              />
            </div>

            {/* Hotspots */}
            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20 group"
                style={{ left: spot.x, top: spot.y }}
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="w-5 h-5 rounded-full bg-ink-950 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-lift hover:scale-110 transition-transform ring-2 ring-white"
                >
                  +
                </button>
                {activeHotspot === spot.id && (
                  <div className="absolute left-6 top-0 w-48 p-2 rounded-sm bg-white border border-surface-border shadow-lift text-2xs z-30 animate-in fade-in">
                    <p className="font-semibold text-ink-950">{spot.label}</p>
                    <p className="text-[10px] text-ink-500 mt-0.5">{spot.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Turntable HUD Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/90 backdrop-blur-sm border border-surface-border text-2xs font-mono shadow-fine">
                <RotateCcw className="w-3 h-3 text-ink-400" />
                <span className="font-semibold text-ink-900">{Math.round(rotationAngle)}°</span>
                <span className="text-ink-400">• Drag left/right to spin</span>
              </div>

              <button
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="p-1.5 rounded-sm bg-white/90 backdrop-blur-sm border border-surface-border text-ink-900 hover:bg-white text-2xs shadow-fine flex items-center gap-1 font-mono"
              >
                {isAutoRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="hidden sm:inline">{isAutoRotating ? 'Pause' : 'Auto-Spin'}</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: Three.js Real WebGL 3D Studio Canvas */}
        {viewMode === '3d' && (
          <div className="w-full h-full relative bg-gradient-to-b from-white to-surface-muted">
            <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <pointLight position={[-4, 2, -2]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                  <SneakerMesh
                    color={shoe.brand === 'Adidas' ? '#1A1A1A' : shoe.brand === 'Puma' ? '#1D2A44' : '#141414'}
                    accentColor={shoe.brand === 'Nike' ? '#8E3C20' : '#FFFFFF'}
                  />
                </Float>
                <ContactShadows
                  position={[0, -0.8, 0]}
                  opacity={0.4}
                  scale={6}
                  blur={1.5}
                  far={4}
                />
              </Suspense>

              <OrbitControls
                enableZoom={true}
                minDistance={2.5}
                maxDistance={6}
                autoRotate={isAutoRotating}
                autoRotateSpeed={2}
              />
            </Canvas>

            {/* 3D Controls Overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/90 backdrop-blur-sm border border-surface-border text-2xs font-mono text-ink-700 shadow-fine">
              <Layers className="w-3 h-3 text-ink-900" />
              <span>Three.js WebGL Engine • Drag to rotate 3D geometry</span>
            </div>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="badge-archival bg-white/90 backdrop-blur-sm text-ink-900 border-surface-border font-semibold shadow-fine">
            {shoe.condition.label} ({shoe.condition.score}/10)
          </span>
          <span className="badge-archival bg-olive-50/90 backdrop-blur-sm text-olive-700 border-olive-200 font-semibold flex items-center gap-1 shadow-fine">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-surface-border pb-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={cn(
              "px-3 py-1 text-2xs font-mono uppercase tracking-archival rounded-xs border transition-colors",
              viewMode === 'gallery'
                ? "bg-ink-950 text-white border-ink-950 font-semibold"
                : "bg-surface-subtle text-ink-600 border-surface-border hover:border-ink-400"
            )}
          >
            Studio Photos
          </button>

          <button
            type="button"
            onClick={() => setViewMode('turntable')}
            className={cn(
              "px-3 py-1 text-2xs font-mono uppercase tracking-archival rounded-xs border transition-colors flex items-center gap-1",
              viewMode === 'turntable'
                ? "bg-ink-950 text-white border-ink-950 font-semibold"
                : "bg-surface-subtle text-ink-600 border-surface-border hover:border-ink-400"
            )}
          >
            <RotateCcw className="w-3 h-3" />
            <span>360° Turntable</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={cn(
              "px-3 py-1 text-2xs font-mono uppercase tracking-archival rounded-xs border transition-colors flex items-center gap-1",
              viewMode === '3d'
                ? "bg-ink-950 text-white border-ink-950 font-semibold"
                : "bg-surface-subtle text-ink-600 border-surface-border hover:border-ink-400"
            )}
          >
            <Layers className="w-3 h-3 text-clay-600" />
            <span>3D WebGL</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-ink-400 hidden sm:inline">
          {viewMode === 'gallery' ? `${shoe.images.length} High-Res Angles` : viewMode === 'turntable' ? '36-Angle Turntable' : 'OrbitControls Active'}
        </span>
      </div>

      {/* Thumbnails (for gallery view mode) */}
      {viewMode === 'gallery' && shoe.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {shoe.images.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={cn(
                "w-16 h-16 rounded-xs border overflow-hidden shrink-0 transition-all",
                activeImageIndex === idx
                  ? "border-ink-950 ring-1 ring-ink-950 opacity-100"
                  : "border-surface-border opacity-70 hover:opacity-100"
              )}
            >
              <img src={imgUrl} alt={`${shoe.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
