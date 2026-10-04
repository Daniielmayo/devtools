"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollCanvasSequenceProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  containerHeightClass?: string;
  className?: string;
}

export default function ScrollCanvasSequence({
  frameCount = 240,
  framePrefix = "/frames/dog_",
  frameExtension = ".webp",
  containerHeightClass = "h-[300vh]",
  className = "",
}: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  // Store image objects in a ref to prevent re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    imagesRef.current = new Array(frameCount).fill(null);
    let isMounted = true;

    // Helper to format frame path: e.g. /frames/dog_0001.webp
    const getFrameUrl = (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${framePrefix}${paddedIndex}${frameExtension}`;
    };

    // 1. Critical FCP Preload: Load Frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      setLoadedCount(1);

      // 2. Load remaining frames asynchronously in background chunks using requestIdleCallback
      loadRemainingFramesInChunks();
    };

    const loadRemainingFramesInChunks = () => {
      let currentIndex = 1;
      const CHUNK_SIZE = 15;

      const loadNextChunk = () => {
        if (!isMounted || currentIndex >= frameCount) return;

        const endIndex = Math.min(currentIndex + CHUNK_SIZE, frameCount);
        let chunkLoaded = 0;

        for (let i = currentIndex; i < endIndex; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isMounted) return;
            imagesRef.current[i] = img;
            chunkLoaded++;
            setLoadedCount((prev) => Math.min(prev + 1, frameCount));

            if (chunkLoaded === endIndex - currentIndex) {
              currentIndex = endIndex;
              scheduleChunk();
            }
          };
          img.onerror = () => {
            chunkLoaded++;
            if (chunkLoaded === endIndex - currentIndex) {
              currentIndex = endIndex;
              scheduleChunk();
            }
          };
        }
      };

      const scheduleChunk = () => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => loadNextChunk());
        } else {
          setTimeout(loadNextChunk, 20);
        }
      };

      scheduleChunk();
    };

    return () => {
      isMounted = false;
    };
  }, [frameCount, framePrefix, frameExtension]);

  // Canvas Animation & Scroll Sync with Lerp, IntersectionObserver & Zero-Redraw
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = false;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastDrawnIndex = -1;

    // Handle DPR capping to 2 max
    const setupCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      lastDrawnIndex = -1; // Trigger redraw on resize
    };

    setupCanvasDimensions();
    window.addEventListener("resize", setupCanvasDimensions);

    // Calculate target frame index from scroll position
    const updateTargetFrame = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      // Scroll progress between 0 and 1
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / totalScrollableHeight)
      );
      targetFrame = progress * (frameCount - 1);
    };

    // Render loop with lerp (interpolation) and Zero-Redraw optimization
    const render = () => {
      if (!isVisible) return;

      updateTargetFrame();

      // Lerp for ultra-smooth animation
      const lerpFactor = 0.12;
      currentFrame += (targetFrame - currentFrame) * lerpFactor;

      const frameIndexToDraw = Math.round(currentFrame);
      const clampedIndex = Math.max(0, Math.min(frameCount - 1, frameIndexToDraw));

      // Zero-Redraw Optimization: Paint ONLY if frame index changed
      if (clampedIndex !== lastDrawnIndex) {
        const img = imagesRef.current[clampedIndex] || imagesRef.current[0];

        if (img && img.complete) {
          const canvasWidth = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
          const canvasHeight = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          // Object-contain aspect ratio scaling
          const imgAspect = img.width / img.height;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth = canvasWidth;
          let drawHeight = canvasHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasAspect > imgAspect) {
            drawHeight = canvasHeight * 0.85; // Slightly padded for aesthetics
            drawWidth = drawHeight * imgAspect;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = (canvasHeight - drawHeight) / 2;
          } else {
            drawWidth = canvasWidth * 0.85;
            drawHeight = drawWidth / imgAspect;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = (canvasHeight - drawHeight) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          lastDrawnIndex = clampedIndex;
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to disconnect loop when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", setupCanvasDimensions);
    };
  }, [frameCount, isFirstFrameLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${containerHeightClass} ${className}`}
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none z-10">
        <canvas ref={canvasRef} className="block max-w-full max-h-full" />

        {/* Optional Progress Indicator Badge */}
        {loadedCount < frameCount && (
          <div className="absolute bottom-6 right-6 bg-brand-navy/80 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-full font-mono text-[11px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
            <span>Cargando secuencia: {Math.round((loadedCount / frameCount) * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
