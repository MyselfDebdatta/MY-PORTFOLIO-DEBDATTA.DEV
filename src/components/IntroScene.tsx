import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSceneProps {
  onComplete: () => void;
}

const bootLines = [
  { t: 'system', text: '> Boot sequence initiated...' },
  { t: 'system', text: '> Loading core modules...' },
  { t: 'ok', text: '> [OK] Kernel loaded | Modules: 24 | Threads: 8' },
  { t: 'system', text: '> Mounting workspace...' },
  { t: 'ok', text: '> [OK] Filesystem ready | 1.2GB indexed' },
  { t: 'system', text: '> Establishing secure connection...' },
  { t: 'ok', text: '> [OK] Connection established | Latency: 12ms' },
  { t: 'system', text: '> Initializing rendering engine...' },
  { t: 'ok', text: '> [OK] WebGL enabled | Shaders compiled | Particles active' },
  { t: 'warn', text: '> [INFO] Environment ready for execution.' },
  { t: 'system', text: '> Authenticating user :: DEBDATTA_PANDA' },
  { t: 'ok', text: '> [OK] Access granted — Welcome back, architect.' },
  { t: 'launch', text: '> Launching portfolio...' },
];

const codeSnippets = [
  "function init() {",
  "  const sys = new System();",
  "  sys.boot();",
  "}",
  "while(true) {",
  "  await process();",
  "}",
  "export const config = {",
  "  env: 'production',",
  "  port: 8080",
  "};",
  "// Establishing connection...",
  "[OK] Kernel loaded",
  "sys.mount('/dev/sda1')",
];

/**
 * Terminal boot sequence intro — fast, immersive, no heavy 3D.
 * Total duration ~2.4s, then fades into the main app.
 */
const IntroScene = ({ onComplete }: IntroSceneProps) => {
  const [lineIdx, setLineIdx] = useState(0); // currently typing line index
  const [charIdx, setCharIdx] = useState(0); // chars typed of current line
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Per-character typewriter for the current line, then advance
  useEffect(() => {
    if (lineIdx >= bootLines.length) return;
    const text = bootLines[lineIdx].text;
    if (charIdx < text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    // line finished — small pause, then move to next
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 140);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  // Progress bar driven by line completion
  useEffect(() => {
    const target = Math.min(100, Math.round(((lineIdx + (charIdx / Math.max(1, bootLines[Math.min(lineIdx, bootLines.length - 1)].text.length))) / bootLines.length) * 100));
    setProgress(target);
  }, [lineIdx, charIdx]);

  // Only start exit AFTER all lines have fully typed (progress reaches 100%)
  useEffect(() => {
    if (lineIdx < bootLines.length) return;
    // All boot lines done — show WELCOME flash, then fade out
    const exitTimer = setTimeout(() => setExit(true), 1100);
    const doneTimer = setTimeout(() => onComplete(), 1700);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [lineIdx, onComplete]);

  const colorFor = (t: string) => {
    if (t === 'ok') return 'text-primary';
    if (t === 'warn') return 'text-accent';
    if (t === 'launch') return 'neon-text';
    return 'text-muted-foreground';
  };

  const allDone = lineIdx >= bootLines.length;

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background Code Rain & Data Streams */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Professional Clean Radial Background */}
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% -20%, hsl(var(--primary)/0.25) 0%, transparent 75%)'
              }}
            />
            {/* Vertical Data Streams (Lasers) */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`laser-${i}`}
                initial={{ top: '-20%', opacity: 0 }}
                animate={{ top: '120%', opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.5 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'linear',
                }}
                className="absolute w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-primary/40 to-primary/80"
                style={{ left: `${10 + i * 11}%`, boxShadow: '0 0 10px hsl(var(--primary)/0.5)' }}
              />
            ))}
            
            {/* Falling Code Snippets */}
            {codeSnippets.map((snippet, i) => (
              <motion.div
                key={`code-${i}`}
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '120vh', opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
                className="absolute text-primary font-mono text-[10px] sm:text-xs whitespace-pre drop-shadow-[0_0_5px_hsl(var(--primary)/0.6)]"
                style={{ left: `${(i * 7) % 95}%` }}
              >
                {snippet}
              </motion.div>
            ))}
          </div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 w-[92%] max-w-2xl bg-card border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.1)] rounded-md p-0 overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-card/40">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                debdatta@portfolio ~ boot
              </span>
              <span className="text-[10px] font-mono text-primary tracking-widest">
                {String(progress).padStart(3, '0')}%
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-xs md:text-sm h-[280px] md:h-[320px] overflow-hidden relative">
              {bootLines.slice(0, lineIdx).map((line, i) => (
                <div key={i} className={`${colorFor(line.t)} leading-relaxed tracking-wide`}>
                  {line.text}
                </div>
              ))}
              {!allDone && (
                <div className={`${colorFor(bootLines[lineIdx].t)} leading-relaxed tracking-wide`}>
                  {bootLines[lineIdx].text.slice(0, charIdx)}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-2 h-4 bg-primary align-middle ml-0.5"
                    style={{ boxShadow: '0 0 10px hsl(var(--primary))' }}
                  />
                </div>
              )}
              {allDone && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-2 h-4 bg-primary align-middle ml-1"
                  style={{ boxShadow: '0 0 10px hsl(var(--primary))' }}
                />
              )}
            </div>

            {/* Progress bar */}
            <div className="h-[2px] w-full bg-border/40">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%`, boxShadow: '0 0 12px hsl(var(--primary))' }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>


          {/* Skip Intro Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={() => {
              setExit(true);
              setTimeout(onComplete, 500);
            }}
            className="absolute bottom-6 right-6 z-50 text-xs font-mono font-bold text-primary border border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary shadow-[0_0_15px_hsl(var(--primary)/0.25)] transition-all px-4 py-2 rounded-md tracking-widest flex items-center gap-2"
          >
            [ SKIP INTRO ]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScene;
