"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollCanvasSequenceProps {
  startFrame?: number;
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  className?: string;
}

export default function ScrollCanvasSequence({
  startFrame = 35,
  frameCount = 240,
  framePrefix = "/frames/dog_",
  frameExtension = ".webp",
  className = "",
}: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    imagesRef.current = new Array(frameCount).fill(null);
    let isMounted = true;

    const getFrameUrl = (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${framePrefix}${paddedIndex}${frameExtension}`;
    };

    // 1. Critical FCP Preload: Load Start Frame (Frame 35 -> dog_0036.webp)
    const firstImg = new Image();
    firstImg.src = getFrameUrl(startFrame);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[startFrame] = firstImg;
      setIsFirstFrameLoaded(true);
      loadRemainingFramesInChunks();
    };

    // 2. Async Chunk Preload with requestIdleCallback starting from startFrame
    const loadRemainingFramesInChunks = () => {
      let currentIndex = startFrame + 1;
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
  }, [startFrame, frameCount, framePrefix, frameExtension]);

  // Canvas Animation & Scroll Sync with Motion Transition & Lerp
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = false;
    let currentFrame = startFrame;
    let targetFrame = startFrame;
    let scrollProgress = 0;

    const setupCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    setupCanvasDimensions();
    window.addEventListener("resize", setupCanvasDimensions);

    const updateTargetFrame = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      scrollProgress = Math.max(0, Math.min(1, -rect.top / totalScrollableHeight));
      
      // Target frame calculation from startFrame (35) to last frame (239)
      const effectiveFrames = frameCount - 1 - startFrame;
      targetFrame = startFrame + scrollProgress * effectiveFrames;
    };

    const render = () => {
      if (!isVisible) return;
      updateTargetFrame();

      // Lerp for ultra-smooth animation tracking
      currentFrame += (targetFrame - currentFrame) * 0.12;

      const frameIndexToDraw = Math.round(currentFrame);
      const clampedIndex = Math.max(startFrame, Math.min(frameCount - 1, frameIndexToDraw));

      const img = imagesRef.current[clampedIndex] || imagesRef.current[startFrame];

      if (img && img.complete) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const isMobile = canvasWidth < 640;
        const imgAspect = img.width / img.height;

        // 1. Initial State at progress = 0 (Shifted ~50px right in Hero, larger size)
        const startDrawHeight = isMobile ? 220 : Math.min(canvasHeight * 0.42, 380);
        const startDrawWidth = startDrawHeight * imgAspect;
        const startX = (canvasWidth - startDrawWidth) / 2 + (isMobile ? 20 : 50);
        const startY = (canvasHeight - startDrawHeight) / 2 + (isMobile ? 40 : 110);

        // 2. Final State at progress = 1 (Further right on desktop, smaller companion size)
        const endDrawHeight = isMobile ? 160 : Math.min(canvasHeight * 0.28, 250);
        const endDrawWidth = endDrawHeight * imgAspect;
        const paddingRight = isMobile ? 12 : 12;
        const paddingBottom = isMobile ? 20 : 36;
        const endX = canvasWidth - endDrawWidth - paddingRight;
        const endY = canvasHeight - endDrawHeight - paddingBottom;

        // Smooth position & scale interpolation based on scroll progress
        // Easing curve for cinematic transition out of the hero center
        const transitionProgress = Math.min(1, Math.max(0, scrollProgress * 2.5)); // Moves to right side during first 40% of scroll
        const easeProgress = 1 - Math.pow(1 - transitionProgress, 3); // Cubic ease-out

        const drawHeight = startDrawHeight + (endDrawHeight - startDrawHeight) * easeProgress;
        const drawWidth = drawHeight * imgAspect;
        const offsetX = startX + (endX - startX) * easeProgress;
        const offsetY = startY + (endY - startY) * easeProgress;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
  }, [startFrame, frameCount, isFirstFrameLoaded]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full pointer-events-none ${className}`}
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none z-20">
        <canvas ref={canvasRef} className="block max-w-full max-h-full" />
      </div>
    </div>
  );
}
