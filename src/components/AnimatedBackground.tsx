import { useEffect, useRef, useState } from 'react';

/**
 * Calm glitter background — clean, professional, theme-aware.
 * - Soft twinkles only (no crosses, no scanlines, no vignette darkening)
 * - Per-section density tuning
 * - No edge clipping: full-bleed canvas, no overlay masks
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
      ? 'light'
      : 'dark'
  );
  const sectionRef = useRef<string>('hero');

  useEffect(() => {
    const update = () =>
      setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ids = ['hero', 'about', 'journey', 'techstack', 'projects', 'achievements', 'book', 'connect'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) sectionRef.current = visible.target.id;
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      // Render slightly larger than viewport so glitter never visually clips at edges
      const overscan = 80;
      width = window.innerWidth + overscan * 2;
      height = window.innerHeight + overscan * 2;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.left = `${-overscan}px`;
      canvas.style.top = `${-overscan}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const getToken = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const nav: any = typeof navigator !== 'undefined' ? navigator : {};
    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const isLowEnd = cores <= 4 || memory <= 4 || window.innerWidth < 768;
    const tier = isLowEnd ? 0.6 : 1;

    // Clean, minimalist pool — fewer particles, elegant motion
    const baseSparkleCount = Math.floor(Math.min(100, (width * height) / 15000) * tier);
    const sparkles = Array.from({ length: baseSparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      // Dynamic twinkle
      speed: 0.2 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.05,
      vy: -(0.02 + Math.random() * 0.1),
      // Vibrant palette
      hue: Math.random() < 0.5 ? 'primary' : Math.random() < 0.75 ? 'accent' : 'pink',
    }));

    const baseFireflyCount = Math.floor(Math.min(15, (width * height) / 80000) * tier);
    const fireflies = Array.from({ length: baseFireflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -(0.04 + Math.random() * 0.1),
      r: 1.2 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.6 ? 'primary' : 'accent',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseActive = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX + 80; // offset for overscan
      mouseY = e.clientY + 80;
      isMouseActive = true;
    };
    const onMouseLeave = () => { isMouseActive = false; };
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);

    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Calmer per-section density
    const sectionDensity: Record<string, number> = {
      hero: 1.0,
      about: 0.45,
      journey: 0.6,
      techstack: 0.7,
      projects: 0.4,
      achievements: 0.55,
      book: 0.4,
      connect: 0.85,
    };

    const draw = () => {
      const primary = getToken('--primary', '174 100% 50%');
      const accent = getToken('--accent', '280 100% 65%');
      const pink = getToken('--neon-pink', '330 100% 60%');
      const isLight = document.documentElement.classList.contains('light');
      // Visibility tuning: light mode glitter needs softer alpha but stronger color
      const alphaScale = isLight ? 0.7 : 0.85;
      const haloScale = isLight ? 0.5 : 0.85;

      ctx.clearRect(0, 0, width, height);

      const density = sectionDensity[sectionRef.current] ?? 0.6;
      const sCount = Math.floor(sparkles.length * density);
      const fCount = Math.floor(fireflies.length * density);

      // Sparkles
      for (let i = 0; i < sCount; i++) {
        const s = sparkles[i];
        s.phase += 0.012 * s.speed;
        
        // Mouse interaction
        if (isMouseActive) {
          const dx = mouseX - s.x;
          const dy = mouseY - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            s.x -= (dx / dist) * force * 2;
            s.y -= (dy / dist) * force * 2;
          }
        }
        
        s.x += s.drift;
        s.y += s.vy;
        if (s.y < -10) { s.y = height + 10; s.x = Math.random() * width; }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const tw = (Math.sin(s.phase) + 1) / 2;
        const alpha = (0.18 + tw * 0.6) * alphaScale;
        const color = s.hue === 'primary' ? primary : s.hue === 'accent' ? accent : pink;
        const radius = s.r * (0.7 + tw * 0.5);
        const py = -scrollY * 0.03;

        // halo
        ctx.beginPath();
        ctx.arc(s.x, s.y + py, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color} / ${alpha * 0.14 * haloScale})`;
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(s.x, s.y + py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color} / ${alpha})`;
        ctx.fill();
      }

      // Fireflies
      for (let i = 0; i < fCount; i++) {
        const f = fireflies[i];
        f.phase += 0.02;
        
        // Mouse interaction
        if (isMouseActive) {
          const dx = mouseX - f.x;
          const dy = mouseY - f.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            f.vx -= (dx / dist) * force * 0.5;
            f.vy -= (dy / dist) * force * 0.5;
          }
        }
        
        f.x += f.vx + Math.sin(f.phase) * 0.18;
        f.y += f.vy;
        
        // Add friction to velocity modified by mouse
        f.vx *= 0.95;
        if (Math.abs(f.vx) < 0.1) f.vx += (Math.random() - 0.5) * 0.02;
        
        if (f.y < -10) { f.y = height + 10; f.x = Math.random() * width; }
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        const glow = (Math.sin(f.phase * 1.2) + 1) / 2;
        const py = -scrollY * 0.05;
        const color = f.hue === 'primary' ? primary : accent;
        ctx.beginPath();
        ctx.arc(f.x, f.y + py, f.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color} / ${(0.04 + glow * 0.08) * haloScale})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(f.x, f.y + py, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color} / ${(0.35 + glow * 0.4) * alphaScale})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [theme]);

  return (
    <>
      {/* Solid base color — sits behind canvas */}
      <div
        aria-hidden
        className="fixed inset-0 bg-background"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
    </>
  );
};

export default AnimatedBackground;
