import { useEffect, useRef } from 'react';

interface MusicVisualizerProps {
  analyser: AnalyserNode | null;
  active: boolean;
  bars?: number;
  className?: string;
  height?: number;
}

/**
 * Lightweight audio-reactive bar visualizer.
 * Falls back to a gentle synthetic wave when no analyser is available.
 */
const MusicVisualizer = ({
  analyser,
  active,
  bars = 18,
  className = '',
  height = 22,
}: MusicVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    let raf = 0;
    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let t = 0;

    const tick = () => {
      t += 0.06;
      if (analyser && data) {
        analyser.getByteFrequencyData(data);
      }
      const step = data ? Math.floor(data.length / bars) : 0;
      for (let i = 0; i < bars; i++) {
        const el = barRefs.current[i];
        if (!el) continue;
        let v = 0;
        if (active) {
          if (data) {
            // Average a slice for smoother bars
            let sum = 0;
            for (let k = 0; k < step; k++) sum += data[i * step + k];
            v = sum / step / 255; // 0..1
          } else {
            // Synthetic fallback wave
            v = 0.25 + Math.abs(Math.sin(t + i * 0.4)) * 0.5;
          }
        } else {
          v = 0.06;
        }
        const h = Math.max(2, v * height);
        el.style.height = `${h}px`;
        el.style.opacity = String(0.4 + v * 0.6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyser, active, bars, height]);

  return (
    <div
      ref={containerRef}
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) barRefs.current[i] = el;
          }}
          className="w-[2px] rounded-sm bg-primary"
          style={{
            height: 2,
            boxShadow: '0 0 6px hsl(var(--primary) / 0.6)',
            transition: 'height 80ms linear, opacity 80ms linear',
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
