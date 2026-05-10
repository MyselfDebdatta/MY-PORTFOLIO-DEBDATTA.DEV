import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX, Home, User, Cpu, FolderGit2, Mail, GitBranch, RotateCcw, Command, Trophy } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import MusicVisualizer from './MusicVisualizer';
import { toast } from 'sonner';
import { useI18n } from '@/lib/i18n';

const navItems = [
  { label: 'Home', href: '#home', Icon: Home, key: 'nav.home' },
  { label: 'About', href: '#about', Icon: User, key: 'nav.about' },
  { label: 'Journey', href: '#journey', Icon: GitBranch, key: 'nav.journey' },
  { label: 'Tech', href: '#techstack', Icon: Cpu, key: 'nav.tech' },
  { label: 'Projects', href: '#projects', Icon: FolderGit2, key: 'nav.projects' },
  { label: 'Awards', href: '#achievements', Icon: Trophy, key: 'nav.achievements' },
  { label: 'Connect', href: '#connect', Icon: Mail, key: 'nav.connect' },
];

type Ripple = { id: number; x: number; y: number };

const Navbar = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [ripples, setRipples] = useState<Record<number, Ripple[]>>({});
  const hoverTimerRef = useRef<number | null>(null);

  // Debounced hover setter — small delay coalesces fast cursor sweeps
  const setHoverDebounced = (idx: number | null) => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (idx === null) {
      // immediate clear
      setHoveredIdx(null);
      return;
    }
    hoverTimerRef.current = window.setTimeout(() => setHoveredIdx(idx), 40);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Fully clear hover state on scroll so the halo doesn't lag behind the active pill
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setHoveredIdx(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  // Active section observer for nav highlight
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace('#', ''));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Clear stale hover when active section changes (so the halo follows the click and never sticks)
  useEffect(() => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveredIdx(null);
  }, [activeSection]);

  // Audio element + analyser hookup (one-time)
  useEffect(() => {
    const audio = new Audio('/ambient.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.volume = volume;
    audioRef.current = audio;

    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
      try {
        const ctx = new Ctx();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaElementSource(audio);
        sourceRef.current = source;
        const master = ctx.createGain();
        master.gain.value = 1;
        masterRef.current = master;
        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = 128;
        source.connect(master);
        master.connect(analyserNode);
        analyserNode.connect(ctx.destination);
        setAnalyser(analyserNode);
      } catch {
        // analyser optional — playback still works via the audio element
      }
    }

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      try { audioCtxRef.current?.close(); } catch {}
      audioCtxRef.current = null;
      sourceRef.current = null;
      masterRef.current = null;
      setAnalyser(null);
    };
  }, []);

  // Play/pause based on musicOn
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audioCtxRef.current?.resume().catch(() => {});
      const p = audio.play();
      if (p) {
        p.then(() => setAudioBlocked(false)).catch(() => setAudioBlocked(true));
      }
      const unlock = () => {
        audioCtxRef.current?.resume().catch(() => {});
        audio.play().then(() => setAudioBlocked(false)).catch(() => {});
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('pointerdown', unlock);
      window.addEventListener('keydown', unlock);
      return () => {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      };
    } else {
      audio.pause();
    }
  }, [musicOn]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const isPlaying = musicOn && !audioBlocked;
  const ariaStatus = !musicOn
    ? 'Ambient music muted'
    : audioBlocked
    ? 'Ambient music ready, tap anywhere to enable'
    : 'Ambient music live';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-panel !rounded-none border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {ariaStatus}
      </div>
      <div className="container mx-auto px-2 sm:px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-display text-sm md:text-base lg:text-lg font-bold neon-text tracking-wider shrink-0 mr-2">
          {'<debdatta.dev/>'}
        </a>

        {/* Center nav — interactive pill bar */}
        <div
          className="hidden md:flex relative items-center gap-0 lg:gap-1 px-1 lg:px-2 py-1 lg:py-1.5 rounded-full border border-border/60 bg-background/50 backdrop-blur-md shrink-1"
          style={{ boxShadow: '0 0 24px hsl(var(--primary) / 0.08), inset 0 1px 0 hsl(var(--foreground) / 0.05)' }}
          onMouseLeave={() => setHoverDebounced(null)}
        >
          {navItems.map((item, idx) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            const isHover = hoveredIdx === idx;
            const Icon = item.Icon;
            const itemRipples = ripples[idx] ?? [];
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoverDebounced(idx)}
                onClick={(e) => {
                  const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
                  const r: Ripple = { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top };
                  setRipples((prev) => ({ ...prev, [idx]: [...(prev[idx] ?? []), r] }));
                  setTimeout(() => {
                    setRipples((prev) => ({ ...prev, [idx]: (prev[idx] ?? []).filter((x) => x.id !== r.id) }));
                  }, 650);
                }}
                className="relative px-2 lg:px-4 py-1.5 rounded-full text-[10px] lg:text-xs font-heading uppercase tracking-wider transition-colors overflow-hidden whitespace-nowrap shrink-1"
              >
                {/* Click ripples */}
                {itemRipples.map((r) => (
                  <motion.span
                    key={r.id}
                    initial={{ opacity: 0.5, scale: 0 }}
                    animate={{ opacity: 0, scale: 6 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute rounded-full bg-primary/40 pointer-events-none"
                    style={{ left: r.x - 8, top: r.y - 8, width: 16, height: 16 }}
                  />
                ))}
                {/* Hover halo (scoped per-item — no shared layoutId) */}
                <AnimatePresence>
                  {isHover && !isActive && (
                    <motion.span
                      key="hover"
                      className="absolute inset-0 rounded-full bg-primary/10 pointer-events-none"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
                {/* Active pill (shared layout) */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, hsl(var(--primary) / 0.22), hsl(var(--neon-purple) / 0.18))',
                      border: '1px solid hsl(var(--primary) / 0.55)',
                      boxShadow:
                        '0 0 14px hsl(var(--primary) / 0.35), inset 0 0 12px hsl(var(--primary) / 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Active pulse glow */}
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{ boxShadow: [
                      '0 0 0px hsl(var(--primary) / 0.0)',
                      '0 0 18px hsl(var(--primary) / 0.55)',
                      '0 0 0px hsl(var(--primary) / 0.0)',
                    ] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <span
                  className={`relative flex items-center gap-1.5 z-10 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon size={12} className={`opacity-80 ${isActive ? 'animate-pulse-glow' : ''}`} />
                  {t(item.key)}
                </span>
                {/* Active dot underline */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-1 rounded-full bg-primary z-10"
                    style={{ boxShadow: '0 0 8px hsl(var(--primary))' }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-1 lg:gap-3 shrink-0 ml-2">
          {/* Music control */}
          <div
            className="relative flex items-center gap-2 px-2 py-1.5 rounded-full border border-border/60 bg-background/40"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <button
              onClick={() => {
                setMusicOn((m) => {
                  const next = !m;
                  toast(next ? '🎵 Lofi ambient music on' : '🔇 Music muted', {
                    description: next ? 'Enjoy the vibe while you explore.' : 'Tap the speaker again to bring it back.',
                  });
                  return next;
                });
              }}
              aria-label={musicOn ? 'Mute ambient music' : 'Play ambient music'}
              aria-pressed={musicOn}
              title={isPlaying ? 'Pause ambient music' : !musicOn ? 'Play ambient music' : 'Tap to enable audio'}
              className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-primary/10 transition-colors"
            >
              {isPlaying ? (
                <Volume2 size={13} className="text-primary" />
              ) : (
                <VolumeX size={13} className="text-muted-foreground" />
              )}
            </button>
            <MusicVisualizer analyser={analyser} active={isPlaying} bars={12} height={14} />
            <span className={`hidden lg:inline text-[10px] font-mono uppercase tracking-widest ${isPlaying ? 'text-primary' : 'text-muted-foreground'}`}>
              {isPlaying ? '♪ Playing' : !musicOn ? 'Muted' : 'Tap to play'}
            </span>

            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 p-3 glass-panel !rounded-xl z-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Ambient Music
                    </span>
                    <span className={`text-[10px] font-mono ${isPlaying ? 'text-primary' : 'text-muted-foreground'}`}>
                      {isPlaying ? `${Math.round(volume * 100)}%` : !musicOn ? 'Muted' : 'Paused'}
                    </span>
                  </div>
                  {musicOn ? (
                    <Slider
                      value={[volume]}
                      onValueChange={(v) => setVolume(v[0])}
                      min={0}
                      max={1}
                      step={0.01}
                      aria-label="Ambient music volume"
                    />
                  ) : (
                    <p className="text-[11px] text-muted-foreground font-heading leading-relaxed">
                      Music is muted. Click the speaker icon to enjoy the lofi ambient soundtrack while you browse.
                    </p>
                  )}
                  {musicOn && audioBlocked && (
                    <p className="mt-2 text-[10px] text-muted-foreground font-heading">
                      Tap anywhere on the page to enable audio (browser autoplay policy).
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cmd+K opener */}
          <button
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            aria-label="Open command palette"
            title="Command palette (Ctrl/Cmd + K)"
            className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-full border border-border/60 bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Command size={12} className="text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">K</span>
          </button>


          {/* Replay intro button */}
          <button
            onClick={() => {
              window.dispatchEvent(new Event('replay-intro'));
              toast('Replaying intro', { description: 'Boot sequence restarting...' });
            }}
            aria-label="Replay intro animation"
            title="Replay intro"
            className="w-9 h-9 rounded-full border border-border/60 bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center group"
          >
            <RotateCcw size={13} className="text-primary group-hover:-rotate-45 transition-transform duration-300" />
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-border/60 bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center"
          >
            {isDark ? <Sun size={14} className="text-primary" /> : <Moon size={14} className="text-primary" />}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const targetId = item.href.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }
                  }}
                  className="text-sm font-heading text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-2"
                >
                  <item.Icon size={14} />
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new Event('replay-intro'));
                    toast('Replaying intro', { description: 'Boot sequence restarting...' });
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <RotateCcw size={14} />
                  Replay Intro
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>

      {/* Floating Mobile Controls */}
      <div className="md:hidden fixed bottom-6 right-5 z-50 flex flex-col gap-3">
        <button
          onClick={() => {
            setMusicOn((m) => {
              const next = !m;
              toast(next ? '🎵 Lofi ambient music on' : '🔇 Music muted', {
                description: next ? 'Enjoy the vibe while you explore.' : 'Tap the speaker again to bring it back.',
              });
              return next;
            });
          }}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center shadow-lg border border-primary/20 hover:neon-border transition-all active:scale-95 bg-background/80 backdrop-blur-md"
          aria-label={musicOn ? 'Mute ambient music' : 'Play ambient music'}
        >
          {isPlaying ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} className="text-muted-foreground" />}
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center shadow-lg border border-primary/20 hover:neon-border transition-all active:scale-95 bg-background/80 backdrop-blur-md"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-primary" />}
        </button>
      </div>
    </>
  );
};

export default Navbar;
