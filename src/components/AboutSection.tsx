import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Zap, Coffee, Rocket, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const terminalLines = [
  { type: 'command', text: '$ whoami' },
  { type: 'output', text: 'Full-Stack Developer | Creative Coder' },
  { type: 'command', text: '$ cat about.txt' },
  { type: 'output', text: 'I craft digital experiences that blend' },
  { type: 'output', text: 'cutting-edge technology with intuitive design.' },
  { type: 'output', text: 'Passionate about React, Node.js, Spring Boot,' },
  { type: 'output', text: 'and building products that make a difference.' },
  { type: 'command', text: '$ ls skills/' },
  { type: 'output', text: 'frontend/ backend/ devops/ design/' },
  { type: 'command', text: '$ cat passion.log' },
  { type: 'output', text: 'Turning complex problems into elegant solutions.' },
  { type: 'output', text: 'Every line of code tells a story.' },
];

const stats = [
  { icon: Coffee, value: '2+', label: 'Years Coding' },
  { icon: Rocket, value: '8+', label: 'Projects Built' },
  { icon: Zap, value: '10+', label: 'Tech Mastered' },
];

const AboutSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= terminalLines.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 550);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mb-3">
            <span className="text-primary">●</span> {t('about.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            {t('about.title')}<span className="neon-text">?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel neon-border overflow-hidden min-w-0"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">terminal — about</span>
            </div>
            
            {/* Terminal content */}
            <div className="p-6 font-mono text-sm space-y-1 min-h-[350px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${line.type === 'command' ? 'text-primary mt-3 first:mt-0' : 'text-muted-foreground'} break-words whitespace-pre-wrap`}
                >
                  {line.text}
                </motion.div>
              ))}
              {visibleLines < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-primary animate-pulse-glow" />
              )}
            </div>
          </motion.div>

          {/* Right side - stats & info */}
          <div className="space-y-8 flex flex-col h-full min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg text-secondary-foreground leading-relaxed font-heading">
                {t('about.p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed font-heading">
                {t('about.p2')}
              </p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 180, damping: 16 }}
                  whileHover={{ y: -6, scale: 1.05, boxShadow: '0 0 30px hsl(var(--primary) / 0.45)' }}
                  className="glass-panel p-4 text-center hover:neon-border transition-all duration-500 group cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <stat.icon className="mx-auto mb-2 text-primary group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" size={20} />
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Moving tech tagline marquee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel neon-border overflow-hidden relative w-full min-w-0"
            >
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <div className="flex py-3 whitespace-nowrap overflow-hidden">
                <motion.div
                  className="flex gap-8 shrink-0 pr-8"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  {[
                    'CODE · CREATE · INNOVATE',
                    'REACT · NODE · TYPESCRIPT',
                    'BUILD · SHIP · ITERATE',
                    'DESIGN · DEVELOP · DEPLOY',
                    'PIXELS · LOGIC · MAGIC',
                    'CLEAN CODE · BOLD IDEAS',
                    'CODE · CREATE · INNOVATE',
                    'REACT · NODE · TYPESCRIPT',
                    'BUILD · SHIP · ITERATE',
                    'DESIGN · DEVELOP · DEPLOY',
                    'PIXELS · LOGIC · MAGIC',
                    'CLEAN CODE · BOLD IDEAS',
                  ].map((text, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono uppercase tracking-[0.3em] text-primary/80 flex items-center gap-8"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
