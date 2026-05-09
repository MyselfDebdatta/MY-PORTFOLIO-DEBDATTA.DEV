import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Linkedin, Github, Sparkles, Rocket, Coffee, Trophy } from 'lucide-react';
import profileImg from '@/assets/profile.png';
import { useI18n } from '@/lib/i18n';

const HEADING_NAME = 'Debdatta Panda';
const TYPING_SPEED = 230; // ms per char
const RESUME_URL = 'https://drive.google.com/file/d/1rHpJvqwHdZZMzZV8n6qbGa0GNmfB87nE/view?usp=drivesdk';
const ROLE_TYPE_SPEED = 65;
const ROLE_DELETE_SPEED = 35;
const ROLE_HOLD_MS = 1400;

const HeroSection = () => {
  const { t } = useI18n();
  const ROLES = [t('hero.role.0'), t('hero.role.1'), t('hero.role.2')];
  const HEADING_PREFIX = t('hero.greeting');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleTyped, setRoleTyped] = useState('');
  const [roleDeleting, setRoleDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Parallax tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });
  const glintX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glintY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);
  const glintBg = useTransform(
    [glintX, glintY] as any,
    ([x, y]: any) => `radial-gradient(circle at ${x} ${y}, hsl(var(--primary) / 0.35), transparent 40%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  // Typewriter (only types the name part)
  const fullText = HEADING_NAME;
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, TYPING_SPEED);
    return () => clearInterval(id);
  }, [fullText]);

  const isTypingDone = typed.length >= fullText.length;

  // Cycling role typewriter (only starts after name finishes)
  useEffect(() => {
    if (!isTypingDone) return;
    const current = ROLES[roleIdx];
    if (!roleDeleting) {
      if (roleTyped.length < current.length) {
        const t = setTimeout(() => setRoleTyped(current.slice(0, roleTyped.length + 1)), ROLE_TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setRoleDeleting(true), ROLE_HOLD_MS);
      return () => clearTimeout(t);
    } else {
      if (roleTyped.length > 0) {
        const t = setTimeout(() => setRoleTyped(current.slice(0, roleTyped.length - 1)), ROLE_DELETE_SPEED);
        return () => clearTimeout(t);
      }
      setRoleDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [isTypingDone, roleIdx, roleTyped, roleDeleting]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center pt-24 pb-24 sm:pb-20">
        {/* Left content */}
        <div className="space-y-8 z-10">
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="neon-button !px-6 !py-2 text-sm flex items-center gap-2 w-fit">
              <span className="text-primary animate-pulse-glow">●</span> {t('hero.welcome')}
            </span>
          </motion.div>

          {/* Main heading - typewriter on name */}
          <div className="space-y-3" aria-label={`${HEADING_PREFIX}${HEADING_NAME}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="block">
                <span className="text-foreground/90">{HEADING_PREFIX}</span>
                <span className="animated-gradient-text">
                  {typed}
                </span>
                <span
                  className="inline-block w-[3px] md:w-[4px] h-[0.85em] align-middle ml-1 bg-primary animate-pulse-glow"
                  style={{ boxShadow: '0 0 4px hsl(var(--primary))' }}
                />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isTypingDone ? 1 : 0, x: isTypingDone ? 0 : -10 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-base md:text-lg text-primary tracking-wide min-h-[1.75rem]"
              aria-live="polite"
            >
              <span className="text-muted-foreground">{'>'}</span> {roleTyped}
              <span
                className="inline-block w-[2px] h-[1em] align-middle ml-0.5 bg-primary"
                style={{ boxShadow: '0 0 8px hsl(var(--primary))', animation: 'pulse 1s steps(2) infinite' }}
              />
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="text-muted-foreground text-base md:text-lg max-w-md font-heading leading-relaxed"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* Live status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <p className="text-xs font-mono tracking-widest text-primary uppercase">Live Status</p>
              <span className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="neon-button flex items-center gap-2">
                <Code size={14} /> {t('hero.resume')}
              </a>
              <a href="https://www.linkedin.com/in/myself-debdatta-194a822b1" target="_blank" rel="noopener noreferrer" className="neon-button flex items-center gap-2">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://github.com/MyselfDebdatta" target="_blank" rel="noopener noreferrer" className="neon-button flex items-center gap-2">
                <Github size={14} /> GitHub
              </a>
            </div>

            <div className="relative pl-4 border-l-2 border-primary/40 space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-xs font-mono text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" /> Available for projects
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-foreground/90">
                  <Sparkles size={11} className="text-primary" /> Open to Internships
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--neon-purple))]/10 border border-[hsl(var(--neon-purple))]/30 text-xs font-mono text-foreground/90">
                  <Trophy size={11} className="text-[hsl(var(--neon-purple))]" /> Hackathon Collaborator
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--neon-pink))]/10 border border-[hsl(var(--neon-pink))]/30 text-xs font-mono text-foreground/90">
                  <Rocket size={11} className="text-[hsl(var(--neon-pink))]" /> Remote Worldwide
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-foreground/90">
                  <Coffee size={11} className="text-amber-400" /> Powered by Curiosity
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right - Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] mx-auto flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full group"
          >
            {/* Mouse-tracked glint */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-60 mix-blend-screen"
              style={{ background: glintBg }}
            />
            {/* Sparkles */}
            {[
              { top: '8%', left: '12%', delay: 0 },
              { top: '20%', right: '10%', delay: 0.6 },
              { bottom: '18%', left: '8%', delay: 1.2 },
              { bottom: '10%', right: '14%', delay: 1.8 },
              { top: '50%', left: '4%', delay: 2.4 },
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary z-30 pointer-events-none"
                style={{ ...s, boxShadow: '0 0 12px hsl(var(--primary)), 0 0 4px #fff' }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}
            {/* Animated rotating conic gradient outer frame */}
            <div className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none z-0">
              <motion.div
                className="absolute inset-[-50%]"
                style={{
                  background:
                    'conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 20%, hsl(var(--neon-purple)) 40%, transparent 60%, hsl(var(--neon-pink)) 80%, hsl(var(--primary)) 100%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Outer ambient glow that pulses (softened) */}
            <motion.div
              aria-hidden
              className="absolute -inset-4 rounded-3xl pointer-events-none -z-10"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.1), transparent 60%), radial-gradient(circle at 70% 70%, hsl(var(--neon-purple) / 0.1), transparent 60%)',
                filter: 'blur(20px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main glass panel */}
            <div className="w-full h-full glass-panel rounded-2xl overflow-hidden flex flex-col z-10 border border-primary/30 relative">
              {/* Animated outer corner brackets */}
              <motion.span
                className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary z-30 pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-accent z-30 pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.span
                className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-accent z-30 pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.span
                className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary z-30 pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />

              {/* Sweeping shine on hover */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-12"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.18), transparent)',
                  }}
                  animate={{ x: ['0%', '500%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Top bar with time */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Core UI</span>
                <span className="text-xs font-mono text-primary tracking-wider">{timeString}</span>
                <span className="text-xs font-mono text-green-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" /> Online
                </span>
              </div>

              {/* Profile image area */}
              <div className="flex-1 flex items-center justify-center p-6 relative">
                {/* Animated glow behind profile */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-primary/10 blur-2xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <div className="relative flex flex-col items-center gap-5">
                  {/* Animated rotating conic gradient ring */}
                  <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-2xl p-[2px] overflow-hidden shrink-0">
                    <motion.div
                      className="absolute inset-[-50%] pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, hsl(var(--primary)) 0%, hsl(var(--neon-purple)) 25%, transparent 50%, hsl(var(--primary)) 75%, hsl(var(--neon-purple)) 100%)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card">
                      <img
                        src={profileImg}
                        alt="Debdatta Panda"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                        style={{
                          imageRendering: 'auto',
                          filter: 'contrast(1.05) saturate(1.05)',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      />
                      {/* Subtle scanline overlay (toned down for clarity) */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
                        style={{
                          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--primary) / 0.4) 3px, hsl(var(--primary) / 0.4) 4px)',
                        }}
                      />
                      {/* Moving scan line — softened */}
                      <motion.div
                        className="absolute left-0 right-0 h-12 pointer-events-none mix-blend-screen"
                        style={{
                          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.12), transparent)',
                        }}
                        animate={{ y: ['-100%', '600%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      />
                      {/* Corner brackets */}
                      <span className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary" />
                      <span className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary" />
                      <span className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary" />
                      <span className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary" />
                    </div>
                  </div>
                  {/* Name tag below image */}
                  <motion.span
                    className="neon-button !px-6 !py-2 text-xs tracking-widest font-display"
                    animate={{ boxShadow: [
                      '0 0 10px hsl(var(--primary) / 0.3)',
                      '0 0 25px hsl(var(--primary) / 0.6)',
                      '0 0 10px hsl(var(--primary) / 0.3)',
                    ] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    DEBDATTA PANDA
                  </motion.span>
                </div>
              </div>

              {/* Date bar */}
              <div className="px-4 py-2 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground font-mono tracking-wider">{dateString}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
