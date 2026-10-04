import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  UploadCloud, 
  X, 
  Sparkles, 
  Scan, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { dbService } from '@/services/db';
import { MOCK_SHOES } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * =========================================================================
 * ARCHITECTURE & PRODUCTION UPGRADE PATH: EMBEDDING-BASED VISUAL SEARCH
 * =========================================================================
 * 
 * In a production deployment, this client-side mock matcher is replaced with
 * an end-to-end Multimodal Vector Search pipeline:
 * 
 * 1. PREPROCESSING & BOUNDING BOX EXTRACTION:
 *    - Image is passed to a lightweight on-device or edge object-detector (e.g.
 *      YOLOv8-Footwear or Google Cloud Vision Object Localizer) to crop the sneaker
 *      and discard background noise (carpets, feet, pants).
 * 
 * 2. MULTIMODAL EMBEDDING GENERATION:
 *    - The cropped patch is passed to a multimodal embedding model:
 *      * OpenAI CLIP (ViT-B/32 or ViT-L/14)
 *      * Google Vertex AI Multimodal Embeddings (`multimodalembedding@001`)
 *      * Domain-specialized FashionCLIP (fine-tuned on streetwear & sneaker imagery)
 *    - Generates a dense 512- or 768-dimensional normalized L2 float vector.
 * 
 * 3. APPROXIMATE NEAREST NEIGHBOR (ANN) VECTOR QUERY:
 *    - The vector is queried against a managed vector database storing pre-indexed
 *      embeddings of all RE/SOLE archive inventory (Pinecone, Cloud SQL pgvector,
 *      Firestore Vector Search, or Qdrant).
 *    - Similarity metric: Cosine Similarity: `sim(u, v) = (u · v) / (||u|| ||v||)`.
 *    - Filter metadata: Only active in-stock or restockable archive pairs.
 * 
 * 4. HYBRID RE-RANKING:
 *    - Combine visual cosine distance with catalog metadata (brand weighting,
 *      colorway tags, and silhouette taxonomy) to produce ranked confidence scores.
 * =========================================================================
 */

export const VisualSearchModal = () => {
  const isOpen = useUIStore((s) => s.isVisualSearchModalOpen);
  const onClose = useUIStore((s) => s.closeVisualSearch);

  // Flow State: 'upload' | 'scanning' | 'results'
  const [stage, setStage] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanStepText, setScanStepText] = useState('Scanning image features...');
  const [detectedTags, setDetectedTags] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const fileInputRef = useRef(null);

  // Preset demo images so the user can test the visual search instantly with 1 click
  const SAMPLE_SNAPS = [
    {
      label: 'Retro Black/White Dunk',
      url: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80',
      brandHint: 'Nike',
      colorHint: 'Black',
      styleHint: 'Streetwear'
    },
    {
      label: 'Terrace Gum Sole Classic',
      url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      brandHint: 'Adidas',
      colorHint: 'White',
      styleHint: 'Terrace'
    },
    {
      label: 'Heritage Suede Vintage',
      url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80',
      brandHint: 'Puma',
      colorHint: 'Blue',
      styleHint: 'Heritage'
    }
  ];

  if (!isOpen) return null;

  // Run mock visual similarity matcher
  const executeVisualSearch = (imageUrl, sampleMetadata = null) => {
    setSelectedImage(imageUrl);
    setStage('scanning');

    // Step 1: Simulated Neural Extraction Sequence
    setTimeout(() => {
      setScanStepText('Isolating sneaker silhouette from background...');
    }, 400);

    setTimeout(() => {
      setScanStepText('Extracting 512-dim visual embedding vector...');
    }, 800);

    setTimeout(() => {
      setScanStepText('Matching against RE/SOLE archive database...');
    }, 1200);

    setTimeout(() => {
      // Heuristic Mock Similarity Matcher:
      // Finds inventory items that match the visual tone, silhouette, or brand
      let matches = [];

      if (sampleMetadata) {
        matches = MOCK_SHOES.filter(
          (s) =>
            s.brand.toLowerCase() === sampleMetadata.brandHint.toLowerCase() ||
            s.primaryColor.toLowerCase() === sampleMetadata.colorHint.toLowerCase() ||
            s.style.toLowerCase() === sampleMetadata.styleHint.toLowerCase()
        );
      } else {
        // Random assortment of 3 high-similarity matches
        matches = [...MOCK_SHOES].sort(() => 0.5 - Math.random()).slice(0, 3);
      }

      // If fewer than 3, pad with top catalog items
      if (matches.length < 3) {
        matches = [...matches, ...MOCK_SHOES.slice(0, 3 - matches.length)];
      }

      // Attach simulated confidence score
      const scored = matches.slice(0, 3).map((item, idx) => ({
        ...item,
        similarityScore: Math.round(96 - idx * 5 + Math.random() * 2), // 96%, 91%, 86%
      }));

      setMatchedResults(scored);
      setDetectedTags([
        sampleMetadata?.brandHint || scored[0]?.brand || 'Classic',
        sampleMetadata?.styleHint || scored[0]?.style || 'Low-Top',
        sampleMetadata?.colorHint || scored[0]?.primaryColor || 'Leather',
        'Durometer Gum Outsole',
      ]);
      setStage('results');
    }, 1600);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        executeVisualSearch(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        executeVisualSearch(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setStage('upload');
    setSelectedImage(null);
    setMatchedResults([]);
    setDetectedTags([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-surface-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xs bg-ink-950 text-white flex items-center justify-center">
              <Camera className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono text-2xs uppercase tracking-archival text-ink-500 font-semibold block">
                Multimodal AI Search
              </span>
              <h3 className="font-serif text-base font-bold text-ink-950 leading-tight">
                Visual Shoe Finder
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-ink-400 hover:text-ink-950 hover:bg-surface-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY CONTAINER */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* STAGE 1: UPLOAD SCREEN */}
          {stage === 'upload' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Drag & Drop Target Area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-surface-border hover:border-ink-900 rounded-md p-8 sm:p-10 text-center cursor-pointer bg-surface-subtle/40 hover:bg-surface-subtle/80 transition-all space-y-3"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-full bg-white border border-surface-border shadow-fine flex items-center justify-center mx-auto text-ink-700 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <p className="font-serif text-sm font-bold text-ink-950">
                    Drop a sneaker photo here or click to browse
                  </p>
                  <p className="text-2xs text-ink-500 font-mono">
                    Upload street snaps, screenshot from Instagram, or photo of an old pair
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-ink-950 text-white font-mono text-2xs uppercase tracking-wider">
                    <Camera className="w-3 h-3" />
                    Select Image File
                  </span>
                </div>
              </div>

              {/* Sample Snaps Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
                  <span className="uppercase tracking-archival font-semibold">Or test with curated sample photos:</span>
                  <span>1-click demo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SAMPLE_SNAPS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => executeVisualSearch(sample.url, sample)}
                      className="group flex items-center gap-2.5 p-2 rounded-sm border border-surface-border hover:border-ink-950 bg-white hover:bg-surface-subtle text-left transition-all shadow-fine"
                    >
                      <img
                        src={sample.url}
                        alt={sample.label}
                        className="w-11 h-11 rounded-xs object-cover border border-surface-border group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-xs font-semibold text-ink-950 block truncate">
                          {sample.label}
                        </span>
                        <span className="text-[10px] font-mono text-ink-400">
                          {sample.brandHint} • {sample.styleHint}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Architecture Technical Note */}
              <div className="p-3 rounded-xs bg-surface-muted/50 border border-surface-border text-2xs font-mono text-ink-500 flex items-center justify-between">
                <span>Vector feature extraction: Normalized 512-dim embedding search</span>
                <span className="text-olive-700 font-semibold">100% Client-Side Private</span>
              </div>
            </div>
          )}

          {/* STAGE 2: SCANNING / VECTOR EXTRACTION ANIMATION */}
          {stage === 'scanning' && (
            <div className="py-10 text-center space-y-6 animate-in fade-in">
              <div className="relative w-48 h-48 mx-auto rounded-md overflow-hidden border-2 border-ink-900 shadow-lift">
                <img
                  src={selectedImage}
                  alt="Scanned Sneaker"
                  className="w-full h-full object-cover"
                />
                
                {/* Animated Green Scanning Laser Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-olive-500/20 via-transparent to-transparent pointer-events-none animate-pulse" />
                <div 
                  className="absolute left-0 right-0 h-1 bg-olive-500 shadow-[0_0_12px_#2D5438] animate-bounce"
                  style={{ animationDuration: '1.2s' }}
                />

                {/* Reticle Corner Guides */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white pointer-events-none" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 font-mono text-xs text-ink-900 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 text-olive-600 animate-spin" />
                  <span>{scanStepText}</span>
                </div>
                <p className="text-2xs font-mono text-ink-400">
                  Comparing silhouette vectors against RE/SOLE archive repository
                </p>
              </div>
            </div>
          )}

          {/* STAGE 3: MATCHED RESULTS */}
          {stage === 'results' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Scan Summary Banner */}
              <div className="p-3.5 rounded-md bg-surface-muted/60 border border-surface-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedImage}
                    alt="Query Image"
                    className="w-12 h-12 rounded-xs object-cover border border-surface-border shadow-fine"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block font-semibold">
                      Query Features Detected:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {detectedTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded-xs bg-white text-ink-800 border border-surface-border font-mono text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 text-2xs font-mono uppercase rounded-xs border border-surface-border bg-white hover:bg-surface-subtle text-ink-800 transition-colors"
                >
                  Upload New Photo
                </button>
              </div>

              {/* Matched Inventory Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
                  <span className="uppercase tracking-archival font-semibold text-ink-900">
                    Highest Visual Similarity Matches:
                  </span>
                  <span>{matchedResults.length} Pairs Found</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchedResults.map((shoe) => (
                    <div
                      key={shoe.id}
                      className="border border-surface-border rounded-md overflow-hidden bg-white shadow-fine hover:border-ink-950 transition-colors flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-surface-subtle overflow-hidden">
                        <img
                          src={shoe.images[0]}
                          alt={shoe.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Similarity Confidence Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="badge-archival bg-olive-700 text-white border-olive-800 font-mono font-bold text-[9px] shadow-fine">
                            {shoe.similarityScore}% Match
                          </span>
                        </div>
                      </div>

                      <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-ink-400">
                            <span>{shoe.brand}</span>
                            <span>US {shoe.sizing.usSize}</span>
                          </div>
                          <h4 className="font-serif text-xs font-semibold text-ink-950 line-clamp-1">
                            {shoe.name}
                          </h4>
                          <p className="text-[10px] text-ink-500 font-mono">
                            Condition: {shoe.condition.score} ({shoe.condition.label})
                          </p>
                        </div>

                        <div className="pt-2 border-t border-surface-border flex items-baseline justify-between">
                          <span className="font-serif text-sm font-bold text-ink-950">
                            ${shoe.pricing.thriftPrice}
                          </span>
                          <Link
                            to={`/product/${shoe.id}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-ink-900 hover:text-clay-600 font-semibold"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-surface-border bg-surface-subtle/50 flex items-center justify-between text-2xs font-mono text-ink-400">
          <span>RE/SOLE Multimodal AI Engine</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-ink-950 text-ink-600 font-medium"
          >
            Close Finder
          </button>
        </div>

      </div>
    </div>
  );
};
