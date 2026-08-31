"use client";

import { memo, useCallback, useEffect, useRef } from "react";

/**
 * Pixel star field, adapted from design-mds/background-stars.md.
 * The source draws bright stars for a black page; this version is
 * re-palettized for the warm light scheme, so the "stars" are warm
 * grays that read as faint paper grain rather than a night sky.
 */

// Warm neutrals drawn from the palette. Orange appears once so it
// stays rare — an occasional accent speck, not a color story.
const STAR_COLORS = [
  "#c9c7c0",
  "#b3b0a8",
  "#9a978e",
  "#8a8880",
  "#696a66",
  "#c9c7c0",
  "#b3b0a8",
  "#9a978e",
  "#ff6b1a",
] as const;

const starDensity = 0.00004;
const twinkleProbability = 0.7;
const minTwinkleSpeed = 2;
const maxTwinkleSpeed = 4;
const pixelSize = 5;
const starRegenerationInterval = 5000;
const percentToRegenerate = 0.15;

// Low enough that the field never competes with the type.
const minOpacity = 0.1;
const opacityRange = 0.18;

const shootingStarPixelSize = 2;
const shootingStarColor = "138, 136, 128";
const targetFps = 16;

type BackgroundStar = {
  x: number;
  y: number;
  color: string;
  baseOpacity: number;
  currentOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleDirection: number;
  twinkleTimer: number;
};

type TrailPoint = { x: number; y: number; opacity: number };

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  distance: number;
  trail: TrailPoint[];
};

export const BackgroundStars = memo(
  () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const shootingStarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

    const backgroundStarsRef = useRef<BackgroundStar[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const lastRenderTimeRef = useRef<number>(0);
    // Canvas is scaled to CSS pixels, so these are the drawing bounds.
    const sizeRef = useRef({ width: 0, height: 0 });
    const frameInterval = 1000 / targetFps;

    const makeStar = useCallback((width: number, height: number) => {
      const baseOpacity = Math.random() * opacityRange + minOpacity;
      return {
        x: Math.floor(Math.random() * (width / pixelSize)) * pixelSize,
        y: Math.floor(Math.random() * (height / pixelSize)) * pixelSize,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        baseOpacity,
        currentOpacity: baseOpacity,
        twinkle: Math.random() < twinkleProbability,
        twinkleSpeed:
          minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
        twinkleDirection: -1,
        twinkleTimer: 0,
      };
    }, []);

    const initBackgroundStars = useCallback((): void => {
      const { width, height } = sizeRef.current;
      const numStars = Math.floor(width * height * starDensity);

      backgroundStarsRef.current = Array.from({ length: numStars }, () =>
        makeStar(width, height),
      );
    }, [makeStar]);

    const regenerateBackgroundStars = useCallback((): void => {
      const stars = backgroundStarsRef.current;
      if (stars.length === 0) return;

      const { width, height } = sizeRef.current;
      const numToRegenerate = Math.max(
        1,
        Math.floor(stars.length * percentToRegenerate),
      );

      for (let i = 0; i < numToRegenerate; i++) {
        stars[Math.floor(Math.random() * stars.length)] = makeStar(
          width,
          height,
        );
      }
    }, [makeStar]);

    const drawStars = useCallback((ctx: CanvasRenderingContext2D): void => {
      backgroundStarsRef.current.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.currentOpacity;
        ctx.fillRect(star.x, star.y, pixelSize, pixelSize);
      });
      ctx.globalAlpha = 1;
    }, []);

    const animateCanvas = useCallback(
      (timestamp: number): void => {
        animationFrameRef.current = requestAnimationFrame(animateCanvas);

        if (timestamp - lastRenderTimeRef.current < frameInterval) return;
        lastRenderTimeRef.current = timestamp;

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const { width, height } = sizeRef.current;
        ctx.clearRect(0, 0, width, height);

        // 1. Background stars, with their discrete twinkle steps.
        backgroundStarsRef.current.forEach((star) => {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.currentOpacity;
          ctx.fillRect(star.x, star.y, pixelSize, pixelSize);

          if (!star.twinkle) return;

          star.twinkleTimer += 1 / targetFps;
          if (star.twinkleTimer >= star.twinkleSpeed) {
            star.twinkleTimer = 0;
            star.twinkleDirection *= -1;
          }

          const progress = star.twinkleTimer / star.twinkleSpeed;
          const dim = progress < 0.5 === star.twinkleDirection > 0;
          star.currentOpacity = dim ? star.baseOpacity * 0.3 : star.baseOpacity;
        });
        ctx.globalAlpha = 1;

        if (!shootingStarsRef.current.length) return;

        // 2. Advance shooting stars and age their trails.
        shootingStarsRef.current = shootingStarsRef.current
          .map((star) => {
            const radians = (star.angle * Math.PI) / 180;
            const newDistance = star.distance + star.speed;
            const trail = [...star.trail];

            if (newDistance % 8 < star.speed) {
              trail.push({ x: star.x, y: star.y, opacity: 1 });
            }

            return {
              ...star,
              x: star.x + star.speed * Math.cos(radians),
              y: star.y + star.speed * Math.sin(radians),
              distance: newDistance,
              trail: trail
                .map((point) => ({ ...point, opacity: point.opacity - 0.1 }))
                .filter((point) => point.opacity > 0),
            };
          })
          .filter(
            (star) =>
              star.x >= -30 &&
              star.x <= width + 30 &&
              star.y >= -30 &&
              star.y <= height + 30,
          );

        // 3. Draw them.
        shootingStarsRef.current.forEach((star) => {
          star.trail.forEach((point) => {
            ctx.fillStyle = `rgba(${shootingStarColor}, ${point.opacity * 0.5})`;
            ctx.fillRect(
              point.x,
              point.y,
              shootingStarPixelSize,
              shootingStarPixelSize,
            );
          });

          ctx.fillStyle = `rgba(${shootingStarColor}, 0.65)`;
          for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 4; x++) {
              if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue;
              ctx.fillRect(
                star.x + x * shootingStarPixelSize,
                star.y + y * shootingStarPixelSize,
                shootingStarPixelSize,
                shootingStarPixelSize,
              );
            }
          }
        });
      },
      [frameInterval],
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Backing store is scaled by DPR so the blocks stay crisp
      // instead of being upscaled soft on retina displays.
      const sizeCanvas = (): CanvasRenderingContext2D | null => {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        sizeRef.current = { width, height };
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        const ctx = canvas.getContext("2d");
        ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
        return ctx;
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const rebuild = (): void => {
        const ctx = sizeCanvas();
        initBackgroundStars();
        // The animated path repaints on its own; the static one
        // has to redraw here or the canvas is left blank.
        if (reduceMotion && ctx) drawStars(ctx);
      };

      let resizeTimeout: ReturnType<typeof setTimeout>;
      const handleResize = (): void => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(rebuild, 150);
      };

      rebuild();
      window.addEventListener("resize", handleResize);

      // Reduced motion gets one static frame: no loop, no twinkle,
      // no shooting stars, no regeneration.
      if (reduceMotion) {
        return () => {
          clearTimeout(resizeTimeout);
          window.removeEventListener("resize", handleResize);
        };
      }

      animationFrameRef.current = requestAnimationFrame(animateCanvas);

      const spawnShootingStar = (): void => {
        shootingStarsRef.current = [
          ...shootingStarsRef.current,
          {
            id: Date.now(),
            x: Math.random() * sizeRef.current.width,
            y: 0,
            angle: 45 + Math.random() * 90,
            speed: Math.random() * 5 + 8,
            distance: 0,
            trail: [],
          },
        ];

        shootingStarTimeoutRef.current = setTimeout(
          spawnShootingStar,
          Math.random() * 4000 + 2000,
        );
      };

      shootingStarTimeoutRef.current = setTimeout(spawnShootingStar, 2000);

      const regeneration = setInterval(
        regenerateBackgroundStars,
        starRegenerationInterval,
      );

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // The spawn chain re-arms itself, so this must be cleared or
        // it outlives the component.
        if (shootingStarTimeoutRef.current) {
          clearTimeout(shootingStarTimeoutRef.current);
        }
        clearTimeout(resizeTimeout);
        clearInterval(regeneration);
        window.removeEventListener("resize", handleResize);
        shootingStarsRef.current = [];
      };
    }, [
      animateCanvas,
      drawStars,
      initBackgroundStars,
      regenerateBackgroundStars,
    ]);

    return <canvas ref={canvasRef} className="ca-stars" aria-hidden="true" />;
  },
  () => true,
);

BackgroundStars.displayName = "BackgroundStars";

export default BackgroundStars;
