import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillsRadar from './SkillsRadar';

interface Tech {
  name: string;
  color: string;
  category: string;
  level: number; // 0-100 mastery
  years: number;
}

const techs: Tech[] = [
  { name: 'React', color: '#61DAFB', category: 'Frontend', level: 95, years: 4 },
  { name: 'TypeScript', color: '#3178C6', category: 'Language', level: 92, years: 3 },
  { name: 'Vite', color: '#646CFF', category: 'Tooling', level: 90, years: 3 },
  { name: 'Tailwind CSS', color: '#06B6D4', category: 'Styling', level: 94, years: 3 },
  { name: 'Framer Motion', color: '#E40464', category: 'Animation', level: 85, years: 2 },
  { name: 'Three.js', color: '#8B5CF6', category: '3D', level: 78, years: 2 },
  { name: 'Node.js', color: '#68A063', category: 'Backend', level: 90, years: 4 },
  { name: 'Express', color: '#10B981', category: 'Backend', level: 88, years: 3 },
  { name: 'MongoDB', color: '#47A248', category: 'Database', level: 85, years: 3 },
  { name: 'PostgreSQL', color: '#4169E1', category: 'Database', level: 82, years: 2 },
  { name: 'JWT Auth', color: '#D63AFF', category: 'Auth', level: 85, years: 3 },
  { name: 'Python', color: '#3776AB', category: 'Language', level: 82, years: 3 },
  { name: 'TensorFlow', color: '#FF6F00', category: 'AI/ML', level: 72, years: 2 },
  { name: 'Gemini API', color: '#4285F4', category: 'AI/ML', level: 80, years: 1 },
  { name: 'LLM / RAG', color: '#FF9F1C', category: 'AI/ML', level: 78, years: 1 },
  { name: 'Docker', color: '#2496ED', category: 'DevOps', level: 75, years: 2 },
  { name: 'Google Cloud', color: '#FBBC04', category: 'Cloud', level: 72, years: 2 },
  { name: 'WebSockets', color: '#00B4D8', category: 'Realtime', level: 80, years: 2 },
  { name: 'ESP32 / C++', color: '#E7352C', category: 'Embedded', level: 75, years: 2 },
  { name: 'Git & GitHub', color: '#F05032', category: 'Tools', level: 92, years: 4 },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [active, setActive] = useState<Tech>(techs[0]);

  return (
    <section id="techstack" ref={ref} className="pt-32 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mb-3">
            <span className="text-primary">●</span> SKILLS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Tech Arsenal<span className="neon-text">.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg font-heading">
            An interactive command center of the technologies powering my craft.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch">
          {/* LEFT: HUD readout panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
          <div className="glass-panel neon-border p-6 h-full flex flex-col">
            {/* Top status bar */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Module Active
                </span>
              </div>
              <span className="text-[10px] font-mono text-primary tracking-widest">
                ID: {String(techs.indexOf(active) + 1).padStart(3, '0')}
              </span>
            </div>

            {/* Tech name + category */}
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {active.category}
              </p>
              <h3
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                style={{
                  color: active.color,
                  textShadow: `0 0 20px ${active.color}80`,
                }}
              >
                {active.name}
              </h3>

              {/* Mastery bar */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>Mastery</span>
                  <span style={{ color: active.color }}>{active.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <motion.div
                    key={`bar-${active.name}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${active.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: active.color,
                      boxShadow: `0 0 10px ${active.color}`,
                    }}
                  />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border/50 rounded-md p-3">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Experience
                  </p>
                  <p className="text-xl font-display font-bold text-foreground">
                    {active.years}
                    <span className="text-xs text-muted-foreground ml-1">yr</span>
                  </p>
                </div>
                <div className="border border-border/50 rounded-md p-3">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Projects
                  </p>
                  <p className="text-xl font-display font-bold text-foreground">
                    {Math.floor(active.level / 8)}
                    <span className="text-xs text-muted-foreground ml-1">+</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Spacer pushes waveform to fill */}
            <div className="flex-1" />

            {/* Bottom waveform */}
            <div className="mt-5 pt-3 border-t border-border/50 flex items-end gap-1 h-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: active.color }}
                  animate={{
                    height: `${20 + Math.sin(i * 0.6) * 30 + Math.random() * 30}%`,
                    opacity: 0.4 + Math.random() * 0.6,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.04,
                  }}
                />
              ))}
            </div>
          </div>
          </motion.div>

          {/* RIGHT: Hex grid of tech nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {techs.map((tech, i) => {
              const isActive = active.name === tech.name;
              return (
                <motion.button
                  key={tech.name}
                  initial={{ opacity: 0, y: 20, rotateX: -30 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 200,
                    damping: 18,
                  }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={() => setActive(tech)}
                  onClick={() => setActive(tech)}
                  className={`relative group glass-panel p-4 text-left transition-all duration-300 ${
                    isActive ? 'border-2' : 'border'
                  }`}
                  style={{
                    borderColor: isActive ? tech.color : `${tech.color}30`,
                    boxShadow: isActive
                      ? `0 0 25px ${tech.color}40, inset 0 0 15px ${tech.color}15`
                      : `0 0 8px ${tech.color}10`,
                  }}
                >
                  {/* Top corner accent */}
                  <span
                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: tech.color,
                      boxShadow: `0 0 8px ${tech.color}`,
                    }}
                  />

                  {/* Index number */}
                  <p className="text-[9px] font-mono text-muted-foreground tracking-widest mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </p>

                  {/* Name */}
                  <p
                    className="font-display font-bold text-base tracking-wide mb-1"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </p>

                  {/* Category */}
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">
                    {tech.category}
                  </p>

                  {/* Mini level bar */}
                  <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tech.level}%` } : {}}
                      transition={{ delay: 0.4 + i * 0.04, duration: 0.6 }}
                      className="h-full"
                      style={{ background: tech.color }}
                    />
                  </div>

                  {/* Scanline on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                    style={{
                      background: `linear-gradient(180deg, transparent, ${tech.color}10, transparent)`,
                    }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <SkillsRadar />
      </div>

      {/* Background glow removed for cleaner look */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" /> */}
    </section>
  );
};

export default TechStackSection;
