import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  X, 
  RotateCw, 
  ZoomIn, 
  FlipHorizontal, 
  Maximize2, 
  Sparkles, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Download,
  Share2,
  Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * =========================================================================
 * ARCHITECTURE & PRODUCTION UPGRADE PATH: REAL-TIME FOOT TRACKING (AR)
 * =========================================================================
 * 
 * In a full production deployment, this client-side module transitions from
 * user-guided overlay placement to automated 6-DoF foot tracking using one
 * of the following recommended production pipelines:
 * 
 * 1. TENSORFLOW.JS / MEDIAPIPE 3D FOOT POSE:
 *    - Model: MediaPipe Foot Landmark Model (or customized YOLOv8-Pose trained on footwear dataset)
 *    - Pipeline:
 *      a. Video stream frame sampled onto hidden OffscreenCanvas @ 30-60 FPS.
 *      b. Extract 6 primary landmarks per foot: Heel Center, Medial Malleolus (inner ankle),
 *         Lateral Malleolus (outer ankle), Metatarsal 1 (big toe joint), Metatarsal 5, and Toe Tip.
 *      c. Compute 3D pose matrix (translation [x, y, z] and rotation [pitch, yaw, roll]).
 *      d. Map 3D coordinate frame to Three.js Sneaker Model world coordinates.
 * 
 * 2. WEBXR IMMERSIVE-AR & DEPTH SENSING:
 *    - Invoke `navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test', 'depth-sensing'] })`.
 *    - Raycast onto ground plane to establish accurate world scale (1 unit = 1 meter).
 *    - Apply real-time foot depth mask to achieve natural ankle occlusion under pant hems.
 * 
 * 3. NATIVE PLATFORM FALLBACKS:
 *    - iOS Safari: Generate `.usdz` file on the fly and trigger `<a rel="ar" href="model.usdz">`
 *      for zero-latency Apple AR QuickLook.
 *    - Android Chrome: Trigger `intent://arvr.google.com/scene-viewer/1.0?file=model.gltf`
 *      for Google SceneViewer AR.
 * =========================================================================
 */

export const VirtualTryOnModal = ({
  shoe,
  isOpen,
  onClose,
}) => {
  // Modal flow states: 'prompt' | 'requesting' | 'active' | 'denied' | 'simulated'
  const [streamState, setStreamState] = useState('prompt');
  const [errorMessage, setErrorMessage] = useState('');
  
  // AR Overlay Transformation States
  const [scale, setScale] = useState(100); // 50% - 150%
  const [rotation, setRotation] = useState(-15); // -180 to 180 deg
  const [position, setPosition] = useState({ x: 0, y: 40 }); // offset from center in px
  const [isMirrored, setIsMirrored] = useState(false); // Left vs Right foot
  const [opacity, setOpacity] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Dragging state for manual shoe placement
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 40 });

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const containerRef = useRef(null);

  // Stop video stream on unmount or close
  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopMediaStream();
      setStreamState('prompt');
      setSnapshotUrl(null);
    }
  }, [isOpen]);

  // Request actual camera stream
  const startCamera = async () => {
    try {
      setStreamState('requesting');
      setErrorMessage('');

      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported by your current browser environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Prefer back camera for looking at shoes
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamState('active');
    } catch (err) {
      console.warn('Camera permission denied or device not found, falling back to simulator:', err);
      setErrorMessage(err.message || 'Unable to access camera.');
      setStreamState('denied');
    }
  };

  // Launch studio simulator mode (always works regardless of device/browser hardware)
  const startSimulator = () => {
    stopMediaStream();
    setStreamState('simulated');
  };

  // Drag handlers for direct sneaker placement
  const handleDragStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    dragStartPos.current = { x: clientX, y: clientY };
    initialPos.current = { ...position };
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    setPosition({
      x: initialPos.current.x + deltaX,
      y: initialPos.current.y + deltaY,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Capture snapshot moment
  const captureSnapshot = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // If active video, draw video frame
    if (videoRef.current && streamState === 'active') {
      try {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      } catch {
        // cross-origin or video issue fallback
      }
    } else {
      // Draw simulated backdrop gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#262626');
      grad.addColorStop(1, '#0f0f0f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Watermark & branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('RE/SOLE ARCHIVE • VIRTUAL TRY-ON', 32, 50);
    ctx.font = '16px monospace';
    ctx.fillStyle = '#8E3C20';
    ctx.fillText(`${shoe.name} • US ${shoe.sizing?.usSize || '10.5'}`, 32, 80);

    setSnapshotUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div 
        ref={containerRef}
        className="relative w-full max-w-xl h-[88vh] max-h-[780px] bg-ink-950 border border-ink-800 rounded-lg shadow-2xl flex flex-col overflow-hidden select-none text-white"
      >
        {/* Flash Effect on Snapshot */}
        {isFlashing && (
          <div className="absolute inset-0 z-50 bg-white animate-out fade-out duration-200 pointer-events-none" />
        )}

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-ink-800 bg-ink-950/90 backdrop-blur-sm z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-olive-500 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xs uppercase tracking-archival text-ink-300">
                  Virtual Try-On (AR)
                </span>
                <span className="px-1.5 py-0.2 rounded-xs bg-ink-800 text-ink-300 font-mono text-[9px]">
                  US {shoe.sizing?.usSize}
                </span>
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-semibold text-white truncate max-w-[240px] sm:max-w-xs">
                {shoe.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(streamState === 'active' || streamState === 'simulated') && (
              <button
                type="button"
                onClick={() => setShowControls(!showControls)}
                className={cn(
                  "p-1.5 rounded-sm border transition-colors text-2xs font-mono flex items-center gap-1",
                  showControls 
                    ? "bg-clay-900/60 border-clay-700 text-clay-300" 
                    : "bg-ink-900 border-ink-700 text-ink-300 hover:text-white"
                )}
                title="Toggle transformation controls"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Controls</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-sm bg-ink-900 hover:bg-ink-800 border border-ink-700 text-ink-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* VIEWPORT CONTENT AREA */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">

          {/* STATE 1: INITIAL PROMPT */}
          {streamState === 'prompt' && (
            <div className="max-w-sm px-6 py-8 text-center space-y-5 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-ink-900 border border-ink-700 flex items-center justify-center mx-auto text-clay-400">
                <Camera className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-white">
                  Position Your Foot on Floor
                </h4>
                <p className="text-2xs text-ink-400 leading-relaxed">
                  Point your camera down towards your feet on a well-lit floor. RE/SOLE's AR studio overlays the exact authenticated 1-of-1 pair to preview real-world silhouette scale.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <Button
                  variant="primary"
                  size="md"
                  onClick={startCamera}
                  className="w-full bg-clay-600 hover:bg-clay-500 text-white font-mono text-xs uppercase tracking-wider"
                >
                  <Camera className="w-3.5 h-3.5 mr-2" />
                  Enable Live Camera
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={startSimulator}
                  className="w-full border-ink-700 bg-ink-900/50 hover:bg-ink-800 text-ink-300 hover:text-white font-mono text-2xs uppercase tracking-wider"
                >
                  <Sparkles className="w-3 h-3 mr-1.5 text-clay-400" />
                  Launch Studio Simulator Mode
                </Button>
              </div>

              <div className="pt-2 text-[10px] font-mono text-ink-500 flex items-center justify-center gap-1.5">
                <Check className="w-3 h-3 text-olive-500" />
                <span>Camera feed processed 100% locally. No image is uploaded.</span>
              </div>
            </div>
          )}

          {/* STATE 2: REQUESTING PERMISSION */}
          {streamState === 'requesting' && (
            <div className="text-center space-y-3 p-6 animate-pulse">
              <RefreshCw className="w-8 h-8 mx-auto text-clay-400 animate-spin" />
              <p className="font-mono text-xs text-ink-300">
                Requesting camera access...
              </p>
              <p className="text-2xs text-ink-500">
                Please tap "Allow" in your browser prompt.
              </p>
            </div>
          )}

          {/* STATE 3: PERMISSION DENIED / ERROR */}
          {streamState === 'denied' && (
            <div className="max-w-sm px-6 py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-clay-950/80 border border-clay-800 flex items-center justify-center mx-auto text-clay-400">
                <AlertCircle className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-base font-bold text-white">
                  Camera Access Unavailable
                </h4>
                <p className="text-2xs text-ink-400 leading-relaxed">
                  {errorMessage || 'Camera access was blocked or is unsupported in this environment. You can still test the complete AR Try-On experience using Studio Simulator Mode.'}
                </p>
              </div>
              <div className="pt-2 space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={startSimulator}
                  className="w-full bg-clay-600 hover:bg-clay-500 text-white font-mono text-xs uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Continue in Simulator Mode
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={startCamera}
                  className="w-full border-ink-700 bg-ink-900 text-ink-300 font-mono text-2xs uppercase"
                >
                  <RefreshCw className="w-3 h-3 mr-1.5" />
                  Retry Camera
                </Button>
              </div>
            </div>
          )}

          {/* STATE 4 & 5: ACTIVE CAMERA OR SIMULATED CANVAS */}
          {(streamState === 'active' || streamState === 'simulated') && (
            <>
              {/* Real Video Stream */}
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  streamState === 'active' ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              />

              {/* Simulated Footwear Studio Background */}
              {streamState === 'simulated' && (
                <div className="absolute inset-0 w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3a3a3a_1px,transparent_1px)] [background-size:16px_16px]" />
                  {/* Studio floor shadow & perspective floor lines */}
                  <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-neutral-900/60 to-transparent pointer-events-none" />
                  
                  {/* Foot perspective silhouette outline to guide user */}
                  <div className="w-64 h-80 rounded-full border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center text-ink-400 pointer-events-none">
                    <div className="w-24 h-48 rounded-[40px] border border-white/30 flex items-center justify-center">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
                        {isMirrored ? "Left Foot" : "Right Foot"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono mt-3 text-ink-400">
                      Studio Perspective Floor
                    </span>
                  </div>
                </div>
              )}

              {/* Viewfinder AR Alignment Reticle Guide */}
              <div className="absolute inset-8 border border-white/15 rounded-md pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
                  <span>[ AR FIT ALIGNMENT ]</span>
                  <span>{isMirrored ? "LEFT FOOT" : "RIGHT FOOT"}</span>
                </div>
                
                <div className="text-center font-mono text-[10px] text-white/40 tracking-wider">
                  DRAG SHOE TO ALIGN OVER FOOT
                </div>
              </div>

              {/* INTERACTIVE FLOATING SNEAKER OVERLAY */}
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale / 100}) scaleX(${isMirrored ? -1 : 1})`,
                  opacity: opacity / 100,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
                className="relative z-20 transition-transform duration-75 ease-out select-none active:scale-[1.02]"
              >
                <img
                  src={shoe.images[0]}
                  alt={shoe.name}
                  draggable={false}
                  className="w-56 sm:w-64 drop-shadow-[0_25px_25px_rgba(0,0,0,0.85)] filter pointer-events-none"
                />
                
                {/* Contact Shadow under shoe */}
                <div className="w-48 h-6 bg-black/60 rounded-full blur-md mx-auto -mt-3 pointer-events-none" />
              </div>

              {/* Bottom Quick Action HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
                <div className="flex items-center gap-1.5">
                  {/* Mirror / Switch Foot */}
                  <button
                    type="button"
                    onClick={() => setIsMirrored(!isMirrored)}
                    className="px-2.5 py-1.5 rounded-sm bg-ink-900/80 hover:bg-ink-800 border border-ink-700 text-white font-mono text-2xs flex items-center gap-1.5 backdrop-blur-sm shadow-fine"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5 text-clay-400" />
                    <span>{isMirrored ? "Left Foot" : "Right Foot"}</span>
                  </button>

                  {/* Reset Position */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition({ x: 0, y: 40 });
                      setScale(100);
                      setRotation(-15);
                    }}
                    className="p-1.5 rounded-sm bg-ink-900/80 hover:bg-ink-800 border border-ink-700 text-ink-300 hover:text-white backdrop-blur-sm"
                    title="Reset position and scale"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Shutter / Capture Button */}
                <button
                  type="button"
                  onClick={captureSnapshot}
                  className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center p-0.5 hover:scale-105 transition-transform bg-white/20 backdrop-blur-sm shadow-lift"
                  title="Capture Fit Photo"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-ink-950">
                    <Camera className="w-5 h-5" />
                  </div>
                </button>

                {/* Simulated Mode Indicator */}
                <div className="px-2 py-1 rounded-xs bg-ink-900/80 border border-ink-700 text-ink-300 font-mono text-[9px] backdrop-blur-sm">
                  {streamState === 'active' ? 'Live Camera' : 'Studio Simulated'}
                </div>
              </div>

              {/* SLIDER CONTROLS PANEL (COLLAPSIBLE) */}
              {showControls && (
                <div className="absolute top-16 right-4 w-52 p-3 rounded-md bg-ink-950/90 border border-ink-800 backdrop-blur-md shadow-lift text-2xs font-mono space-y-2.5 z-30 animate-in fade-in slide-in-from-right-2">
                  <div className="flex items-center justify-between text-ink-300 border-b border-ink-800 pb-1.5">
                    <span className="text-[10px] uppercase font-bold text-clay-400">AR Adjustments</span>
                    <button
                      type="button"
                      onClick={() => setShowControls(false)}
                      className="text-ink-400 hover:text-white text-[10px]"
                    >
                      Hide
                    </button>
                  </div>

                  {/* Size / Scale Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-ink-400">
                      <span>Shoe Scale</span>
                      <span className="text-white">{scale}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="150"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full accent-clay-500 h-1 bg-ink-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Rotation Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-ink-400">
                      <span>Ankle Angle</span>
                      <span className="text-white">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-clay-500 h-1 bg-ink-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Opacity Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-ink-400">
                      <span>Blend Opacity</span>
                      <span className="text-white">{opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="w-full accent-clay-500 h-1 bg-ink-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* SNAPSHOT PREVIEW MODAL */}
              {snapshotUrl && (
                <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md p-4 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                  <div className="relative max-w-xs border border-ink-700 rounded-md overflow-hidden shadow-2xl">
                    <img src={snapshotUrl} alt="Virtual Try-On Snapshot" className="w-full h-auto" />
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={snapshotUrl}
                      download={`resole-try-on-${shoe.sku}.jpg`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-clay-600 hover:bg-clay-500 text-white font-mono text-2xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save Photo</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSnapshotUrl(null)}
                      className="px-3 py-1.5 rounded-sm bg-ink-800 hover:bg-ink-700 text-ink-200 font-mono text-2xs"
                    >
                      Back to Camera
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Technical Note */}
        <div className="px-4 py-2 bg-ink-950 border-t border-ink-800 text-[10px] font-mono text-ink-400 flex items-center justify-between">
          <span>Camera stream handled securely client-side.</span>
          <span className="text-clay-400">1-of-1 Silhouette Proportions</span>
        </div>

      </div>
    </div>
  );
};
