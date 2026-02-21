"use client";

import React, { useEffect, useRef } from "react";

interface Moon {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  velocity: { x: number; y: number }; // Added for slight movement
}

const MoonTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moons = useRef<Moon[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastSpawn = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 70) return; // throttle

      lastSpawn.current = now;
      mouse.current = { x: e.clientX, y: e.clientY };

      const count = Math.floor(Math.random() * 3); // 5–7 moons

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 60 + 20; // 20–80px spread

        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        moons.current.push({
          x: mouse.current.x + offsetX,
          y: mouse.current.y + offsetY,
          size: Math.random() * 5 + 17,
          rotation: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.3 + 0.5, // softer entry
          color: "#fff",
          velocity: {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1,
          },
        });
      }
    };

    const crescentPath = new Path2D(
      "M 0 -20 A 20 20 0 1 1 0 20 A 12 20 0 1 0 0 -20 Z"
    );
    const drawCrescent = (moon: Moon) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(moon.x, moon.y);
      ctx.rotate(moon.rotation);
      ctx.globalAlpha = moon.opacity;

      // Glow (THIS is the vibe)
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(167,139,250,0.75)";

      ctx.fillStyle = "#fff";
      ctx.scale(moon.size / 20, moon.size / 20);
      ctx.fill(crescentPath);

      ctx.restore();
    };

    const animate = () => {
      // Create a slight "motion blur" by not clearing perfectly
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      moons.current.forEach((moon, index) => {
        moon.opacity -= 0.006;

        moon.x += moon.velocity.x;
        moon.y += moon.velocity.y;
        moon.rotation += 0.005;

        drawCrescent(moon);

        if (moon.opacity <= 0) {
          moons.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] bg-transparent"
    />
  );
};

export default MoonTrail;
