import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 pt-10 overflow-hidden">
      {/* Top meta row */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Designed & Developed by{' '}
          <span className="text-foreground/80">Debdatta Panda</span>
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {[{ label: 'Home', id: 'home' }, { label: 'About', id: 'about' }, { label: 'Journey', id: 'journey' }, { label: 'Tech', id: 'techstack' }, { label: 'Projects', id: 'projects' }, { label: 'Awards', id: 'achievements' }, { label: 'Connect', id: 'connect' }].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <MapPin size={12} className="text-primary" />
          Bhubaneswar, India
          <span className="ml-1 px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary text-[10px] tracking-widest">
            IN
          </span>
        </div>
      </div>

      {/* Giant watermark name — clean, no blur fade */}
      <div className="relative mt-8 select-none pointer-events-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-black text-center leading-[0.85] whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 12vw, 19rem)',
            background:
              'linear-gradient(180deg, hsl(var(--foreground) / 0.14) 0%, hsl(var(--primary) / 0.10) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.04em',
          }}
        >
          Debdatta
        </motion.h2>
      </div>

      <div className="text-center py-4 font-mono text-[10px] text-muted-foreground/70 tracking-widest relative z-10">
        {'<debdatta.dev/>'} · Crafted with care
      </div>
    </footer>
  );
};

export default Footer;
