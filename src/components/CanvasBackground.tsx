import { useEffect, useRef } from "react";

interface CanvasBackgroundProps {
  accentColor?: string;       // e.g. "#00f0ff" or "#8b5cf6"
  accentRgb?: string;         // e.g. "0, 240, 255" or "139, 92, 246"
  bgGradientTop?: string;     // e.g. "#03131a"
  bgGradientBottom?: string;  // e.g. "#010406"
}

export function CanvasBackground({
  accentColor = "#00f0ff", // Cyberpunk Cyan Example Default
  accentRgb = "0, 240, 255",
  bgGradientTop = "#03131a",
  bgGradientBottom = "#010406",
}: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setSize();
    // Debounce the resize event for performance (optional but good practice)
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setSize, 200);
    };
    window.addEventListener("resize", handleResize);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width) * 2 - 1;
      mouseY = (e.clientY / height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const PARTICLE_COUNT = 3500;
    const PIXEL_COUNT = 35;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width * 1.5 - width * 0.25,
      y: Math.random() * height * 1.5 - height * 0.25,
      z: Math.random() * 2.5 + 0.5,
      size: Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      network: Math.random() > 0.98,
    }));

    const pixels = Array.from({ length: PIXEL_COUNT }, () => ({
      x: Math.random() * width * 1.2 - width * 0.1,
      y: Math.random() * height * 1.2 - height * 0.1,
      z: Math.random() * 3 + 1,
      size: Math.random() * 12 + 4,
      opacity: Math.random() * 0.15 + 0.05,
      floatSpeed: Math.random() * 0.5 + 0.1,
    }));

    let animationFrameId: number;

    const draw = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, bgGradientTop);
      bgGradient.addColorStop(1, bgGradientBottom);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      pixels.forEach((px) => {
        px.y -= px.floatSpeed;
        if (px.y < -px.size * 2) px.y = height + px.size * 2;

        const renderX = px.x + targetX * 80 * (1 / px.z);
        const renderY = px.y + targetY * 80 * (1 / px.z);

        ctx.fillStyle = `rgba(${accentRgb}, ${px.opacity})`;
        ctx.shadowColor = `rgba(${accentRgb}, 0.8)`;
        ctx.shadowBlur = 15;
        ctx.fillRect(renderX, renderY, px.size, px.size);
      });

      ctx.shadowBlur = 0;
      ctx.fillStyle = accentColor;
      const networkNodes: { x: number; y: number }[] = [];

      particles.forEach((p) => {
        p.y -= 0.3 * (1 / p.z);
        if (p.y < -height * 0.25) p.y = height * 1.25;

        p.phase += p.speed;
        const twinkle = Math.abs(Math.sin(p.phase));

        const x = p.x + targetX * 100 * (1 / p.z);
        const y = p.y + targetY * 100 * (1 / p.z);

        ctx.globalAlpha = Math.min(twinkle * (0.9 / p.z), 1);
        ctx.fillRect(x, y, p.size, p.size);

        if (p.network) networkNodes.push({ x, y });
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < networkNodes.length; i++) {
        for (let j = i + 1; j < networkNodes.length; j++) {
          const dx = networkNodes[i].x - networkNodes[j].x;
          const dy = networkNodes[i].y - networkNodes[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 15000) {
            ctx.globalAlpha = 1 - dist / 15000;
            ctx.strokeStyle = `rgba(${accentRgb}, ${ctx.globalAlpha * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.max(width, height) * 0.5,
        width / 2, height / 2, Math.max(width, height) * 1.0
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, accentRgb, bgGradientTop, bgGradientBottom]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
