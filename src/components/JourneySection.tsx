import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Rocket, MapPin, Calendar, Award, Trophy, Code2, Sparkles, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

type Stage = {
  id: string;
  phase: string;
  icon: typeof GraduationCap;
  accent: string; // tailwind text color class for icon
  school: string;
  location: string;
  years: string;
  course?: string;
  score: string;
  rank: string;
  description: string;
  highlights: { icon: typeof Award; text: string }[];
  gallery: string[];
};

const stages: Stage[] = [
  {
    id: 'matric',
    phase: 'Matriculation · Class X',
    icon: BookOpen,
    accent: 'text-primary',
    school: 'Ramakrishna Siksha Mandir (R.K.S.M)',
    location: 'Egra, East Medinipur, West Bengal',
    years: '2010 – 2022',
    score: '674 / 700  ·  96.28%',
    rank: 'Top 3 in School',
    description:
      'Where it all began. Twelve years of foundational learning that shaped my discipline, curiosity and love for problem solving — long before I wrote my first line of code.',
    highlights: [
      { icon: Award, text: 'School topper batch — Top 3' },
      { icon: Trophy, text: 'Consistent academic excellence' },
      { icon: Sparkles, text: 'Active in science & quiz events' },
    ],
    gallery: [
      '/journey/matric/1.jpeg',
      '/journey/matric/2.jpeg',
      '/journey/matric/3.jpeg',
      '/journey/matric/4.jpeg',
      '/journey/matric/5.jpeg',
    ],
  },
  {
    id: 'inter',
    phase: 'Intermediate · Class XII',
    icon: GraduationCap,
    accent: 'text-[hsl(var(--neon-purple))]',
    school: 'Egra J.L High School (H.S)',
    location: 'Egra, East Medinipur, West Bengal',
    years: '2022 – 2024',
    score: '468 / 500  ·  93.6%',
    rank: 'Top 3 in School',
    description:
      'Sharpened my analytical edge through Physics, Chemistry & Mathematics. This is where logic met passion — the spark that pulled me toward computer science and engineering.',
    highlights: [
      { icon: Award, text: 'Top 3 in graduating batch' },
      { icon: Trophy, text: 'Excelled in PCM stream' },
      { icon: Sparkles, text: 'Cleared engineering entrances' },
    ],
    gallery: [
      '/journey/inter/1.jpeg',
      '/journey/inter/2.jpeg',
      '/journey/inter/3.jpeg',
    ],
  },
  {
    id: 'college',
    phase: 'B.Tech · Computer Science',
    icon: Rocket,
    accent: 'text-[hsl(var(--neon-pink))]',
    school: 'ITER, SOA Deemed University',
    location: 'Bhubaneswar, Odisha',
    years: '2025 – 2029',
    course: 'B.Tech CSE (Core)',
    score: 'CGPA 9.89',
    rank: 'First Year · Active',
    description:
      'My current chapter — diving deep into systems, algorithms and full-stack development while collaborating with brilliant peers. Building, breaking and learning every single day.',
    highlights: [
      { icon: Code2, text: 'Active member of CODEX' },
      { icon: Code2, text: 'GFG Campus Body — ITER' },
      { icon: Code2, text: 'CN10XOC member' },
      { icon: Sparkles, text: 'Hackathons & open-source contributor' },
    ],
    gallery: [
      '/journey/college/1.jpeg',
      '/journey/college/2.jpeg',
      '/journey/college/3.jpeg',
      '/journey/college/4.jpeg',
      '/journey/college/5.jpeg',
      '/journey/college/6.jpeg',
      '/journey/college/7.jpeg',
      '/journey/college/8.jpeg',
      '/journey/college/9.jpeg',
      '/journey/college/10.jpeg',
      '/journey/college/11.jpeg',
    ],
  },
];

// Auto-cycling photo gallery screen with manual prev/next controls
const GalleryScreen = ({ images, label }: { images: string[]; label: string }) => {
  const [idx, setIdx] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return; // briefly paused after manual interaction
      setIdx((i) => (i + 1) % images.length);
    }, 2800);
    return () => clearInterval(id);
  }, [images.length, pausedUntil]);

  const pauseAutoplay = () => setPausedUntil(Date.now() + 5000);
  const goPrev = () => { pauseAutoplay(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const goNext = () => { pauseAutoplay(); setIdx((i) => (i + 1) % images.length); };
  const goTo = (i: number) => { pauseAutoplay(); setIdx(i); };

  return (
    <div className="relative w-full aspect-[4/3] glass-panel neon-border rounded-2xl overflow-hidden group">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3 py-2 border-b border-border/50 bg-card/40 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-destructive/70" />
          <span className="w-2 h-2 rounded-full bg-accent/70" />
          <span className="w-2 h-2 rounded-full bg-primary/70" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          gallery :: {label}
        </span>
        <span className="text-[10px] font-mono text-primary">
          {String(idx + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Image stack */}
      <div className="absolute inset-0 pt-9">
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`${label} memory ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.06 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        ))}

        {/* Scanline + vignette overlays */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--primary) / 0.5) 3px, hsl(var(--primary) / 0.5) 4px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

        {/* Corner brackets */}
        <span className="absolute top-11 left-2 w-4 h-4 border-l-2 border-t-2 border-primary" />
        <span className="absolute top-11 right-2 w-4 h-4 border-r-2 border-t-2 border-primary" />
        <span className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary" />
        <span className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary" />
      </div>

      {/* Manual prev/next controls — recruiters can step through at their own pace */}
      <button
        onClick={goPrev}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-background/60 backdrop-blur border border-primary/40 hover:bg-primary/20 hover:border-primary text-primary flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-background/60 backdrop-blur border border-primary/40 hover:bg-primary/20 hover:border-primary text-primary flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-6 bg-primary shadow-[0_0_10px_hsl(var(--primary))]' : 'w-1.5 bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Auto/manual hint */}
      <div className="absolute top-11 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-mono uppercase tracking-widest text-primary/80 bg-background/60 backdrop-blur px-2 py-0.5 rounded-full border border-primary/30">
          {Date.now() < pausedUntil ? 'Manual' : 'Auto'}
        </span>
      </div>
    </div>
  );
};

const StageCard = ({ stage }: { stage: Stage }) => {
  const Icon = stage.icon;
  return (
    <div className="glass-panel neon-border rounded-2xl p-6 md:p-7 relative overflow-hidden h-full">
      {/* Decorative gradient blob */}
      {/* <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" /> */}

      <div className="flex items-start gap-4 mb-5">
        <div className={`w-12 h-12 rounded-xl bg-card/60 border border-primary/30 flex items-center justify-center ${stage.accent}`}>
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/80">{stage.phase}</p>
          <h3 className="text-lg md:text-xl font-display font-bold text-foreground leading-tight mt-0.5">
            {stage.school}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={13} className="text-primary shrink-0" />
          <span className="truncate">{stage.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={13} className="text-primary shrink-0" />
          <span>{stage.years}</span>
        </div>
        {stage.course && (
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <Code2 size={13} className="text-primary shrink-0" />
            <span>{stage.course}</span>
          </div>
        )}
      </div>

      {/* Score + rank */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-xs font-mono text-foreground/90 flex items-center gap-2">
          <Trophy size={12} className="text-primary" />
          {stage.score}
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-xs font-mono text-foreground/90 flex items-center gap-2">
          <Award size={12} className="text-accent" />
          {stage.rank}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-heading">
        {stage.description}
      </p>

      <ul className="space-y-1.5">
        {stage.highlights.map((h, i) => {
          const HIcon = h.icon;
          return (
            <li key={i} className="flex items-center gap-2 text-xs text-foreground/80">
              <HIcon size={12} className="text-primary" />
              <span>{h.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type Filter = 'all' | 'matric' | 'inter' | 'college';

const filterOptions: { id: Filter; label: string; short: string }[] = [
  { id: 'all', label: 'All Stages', short: 'All' },
  { id: 'matric', label: 'Matriculation', short: 'Class X' },
  { id: 'inter', label: 'Intermediate', short: 'Class XII' },
  { id: 'college', label: 'Current · B.Tech', short: 'College' },
];

const JourneySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<Filter>('all');

  const visibleStages = filter === 'all' ? stages : stages.filter((s) => s.id === filter);

  return (
    <section id="journey" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mx-auto mb-4">
            <span className="text-primary">●</span> MY JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            From Classrooms to <span className="neon-text">Code</span>
          </h2>
          <p className="text-muted-foreground mt-4 font-heading">
            A timeline of milestones that shaped the developer I am today — every chapter, every lesson, every leap.
          </p>
        </motion.div>

        {/* Stage selector — filter the timeline by academic phase */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter journey by stage"
        >
          <span className="hidden md:inline-flex items-center gap-2 mr-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            <LayoutGrid size={12} className="text-primary" /> Filter
          </span>
          {filterOptions.map((opt) => {
            const active = filter === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(opt.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-all ${
                  active
                    ? 'border-primary text-primary bg-primary/10 shadow-[0_0_18px_hsl(var(--primary)/0.4)]'
                    : 'border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="journey-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {opt.label}
              </button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-primary via-accent to-[hsl(var(--neon-pink))] shadow-[0_0_20px_hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-20 lg:space-y-28">
            <AnimatePresence mode="popLayout">
              {visibleStages.map((stage, i) => {
                const cardLeft = i % 2 === 0; // alternate
                return (
                  <motion.div
                    key={stage.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative"
                  >
                    {/* Spine node */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: 45 }}
                        animate={{ scale: 1, rotate: 45 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                        className="relative group"
                      >
                        <span className="absolute inset-0 rounded-[4px] bg-primary/40 blur-xl animate-pulse-glow" />
                        <span className="relative w-5 h-5 rounded-[4px] bg-background border border-primary/80 flex items-center justify-center shadow-[0_0_12px_hsl(var(--primary)/0.5)] group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary))] transition-all duration-300">
                          <span className="w-2 h-2 rounded-[2px] bg-primary animate-pulse-glow shadow-[0_0_8px_hsl(var(--primary))]" />
                        </span>
                      </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                      {/* Card */}
                      <motion.div
                        initial={{ opacity: 0, x: cardLeft ? -60 : 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className={cardLeft ? 'lg:order-1' : 'lg:order-2'}
                      >
                        <StageCard stage={stage} />
                      </motion.div>

                      {/* Gallery */}
                      <motion.div
                        initial={{ opacity: 0, x: cardLeft ? 60 : -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                        className={cardLeft ? 'lg:order-2' : 'lg:order-1'}
                      >
                        <GalleryScreen images={stage.gallery} label={stage.id} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
