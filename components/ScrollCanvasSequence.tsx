"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollCanvasSequenceProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  className?: string;
}

export default function ScrollCanvasSequence({
  frameCount = 240,
  framePrefix = "/frames/dog_",
  frameExtension = ".webp",
  className = "",
}: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    imagesRef.current = new Array(frameCount).fill(null);
    let isMounted = true;

    const getFrameUrl = (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${framePrefix}${paddedIndex}${frameExtension}`;
    };

    // 1. Critical FCP Preload: Load Frame 0
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      setLoadedCount(1);
      loadRemainingFramesInChunks();
    };

    // 2. Async Chunk Preload with requestIdleCallback
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

    const setupCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      lastDrawnIndex = -1;
    };

    setupCanvasDimensions();
    window.addEventListener("resize", setupCanvasDimensions);

    const updateTargetFrame = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableHeight));
      targetFrame = progress * (frameCount - 1);

      // Fade out smoothly near the end of the scroll container (last 5% of scroll)
      if (progress > 0.95) {
        const fadeProgress = (1 - progress) / 0.05;
        setOpacity(Math.max(0, fadeProgress));
      } else {
        setOpacity(1);
      }
    };

    const render = () => {
      if (!isVisible) return;
      updateTargetFrame();

      // Lerp for smooth animation tracking
      currentFrame += (targetFrame - currentFrame) * 0.12;

      const frameIndexToDraw = Math.round(currentFrame);
      const clampedIndex = Math.max(0, Math.min(frameCount - 1, frameIndexToDraw));

      // Zero-Redraw Optimization: Paint ONLY if frame index changed
      if (clampedIndex !== lastDrawnIndex) {
        const img = imagesRef.current[clampedIndex] || imagesRef.current[0];

        if (img && img.complete) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const canvasWidth = canvas.width / dpr;
          const canvasHeight = canvas.height / dpr;

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          // Harmonious sizing: Max 310px height on desktop, 200px on mobile
          const isMobile = canvasWidth < 640;
          const maxAllowedHeight = isMobile ? Math.min(canvasHeight * 0.28, 200) : Math.min(canvasHeight * 0.35, 310);

          const imgAspect = img.width / img.height;
          const drawHeight = maxAllowedHeight;
          const drawWidth = drawHeight * imgAspect;

          // Position in bottom-right corner as a discrete, non-intrusive side companion
          const paddingRight = isMobile ? 16 : 48;
          const paddingBottom = isMobile ? 24 : 40;

          const offsetX = canvasWidth - drawWidth - paddingRight;
          const offsetY = canvasHeight - drawHeight - paddingBottom;

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          lastDrawnIndex = clampedIndex;
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0.01 }
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
      className={`absolute inset-0 w-full pointer-events-none ${className}`}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none z-20 transition-opacity duration-300"
        style={{ opacity }}
      >
        <canvas ref={canvasRef} className="block max-w-full max-h-full" />
      </div>
    </div>
  );
}
