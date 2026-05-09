import { motion } from 'framer-motion';
import { Trophy, Award, BadgeCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1Gbzsw399gKczNwpN7oemDiRz1M9v7uMN';

type Cert = {
  title: string;
  issuer: string;
  date: string;
  tag: string;
  file?: string;
};

// 22 real certificates — all visible, no individual click required.
const certificates: Cert[] = [
  { title: 'Getting Started with Artificial Intelligence', issuer: 'IBM SkillsBuild', date: 'Mar 2026', tag: 'AI/ML', file: 'IBM_AI_BOOTCAMP.pdf' },
  { title: 'XIM Synchronize 4.0 Hackathon', issuer: 'XIM University · Bhubaneswar', date: 'Feb 2026', tag: 'Hackathon', file: 'XIM_SYNCHRONIZE_HACKATHON_2026_FEBRUARY.pdf' },
  { title: "Pravah '26", issuer: 'IIT Bhubaneswar', date: 'Feb 2026', tag: 'Tech Fest', file: "IIT BHUVNESHWAR_PRAVAH'26_FEBRUARY.png" },
  { title: 'Tech Brew · Season 2 Episode 3', issuer: 'Community Tech Talk', date: '2026', tag: 'Workshop', file: 'TECH BREW S2E3.png' },
  { title: 'Tech Brew · Season 2 Episode 2', issuer: 'Community Tech Talk', date: '2026', tag: 'Workshop', file: 'TECH BREW S2E2.png' },
  { title: 'Research Odyssey-1', issuer: 'ACM Student Chapter · SOA', date: '2026', tag: 'Research', file: 'RESEARCH ODYSSEY-1_ACM.jpg' },
  { title: 'SOA ACM Student Chapter Membership', issuer: 'ACM · SOA University', date: '2026', tag: 'Membership', file: 'SOA ACM STUDENTS CHAPTER .pdf' },
  { title: 'Cybersecurity Workshop', issuer: 'GDGoC @ SOA University', date: '2026', tag: 'Cybersecurity', file: 'CYBERSECURITY(GDGoC@SOA) CERTIFICATE.pdf' },
  { title: 'Bhubaneswar Tech Workshop', issuer: 'Kshitij · IIT Kharagpur × KIIT', date: 'Dec 2025', tag: 'Workshop', file: 'BHUBNESWAR TECH WORKSHOP -KSHITIJ IIT KHARAGPUR.pdf' },
  { title: 'Kascade @ Kshitij 2026', issuer: 'IIT Kharagpur', date: '2026', tag: 'Tech Fest', file: 'KASCADE @KSHITIJ IIT KHARAGPUR .pdf' },
  { title: 'IEEE Student Membership', issuer: 'IEEE · Kharagpur Section', date: 'Valid till Dec 2026', tag: 'Membership', file: 'IEEE MEMBERSHIP CERTIFICATE.pdf' },
  { title: 'IEEE Computer Society Member', issuer: 'IEEE', date: '2026', tag: 'Membership', file: 'IEEE COMPUTER SOCIETY.pdf' },
  { title: 'IEEE Communications Society Member', issuer: 'IEEE', date: '2026', tag: 'Membership', file: 'IEEE COMMUNICATION SOCIETY.pdf' },
  { title: 'Software Engineering Job Simulation', issuer: 'Electronic Arts × Forage', date: 'Oct 2025', tag: 'Simulation', file: 'ELECTRONICS ARTS SWE JOB SIMULATION_COMPLETATION_CERTIFICATE.pdf' },
  { title: 'Cyber Job Simulation', issuer: 'Deloitte × Forage', date: 'Oct 2025', tag: 'Cybersecurity', file: 'DELOITTE CYBER JOB SIMULATION _COMPLETATION_CERTIFICATE.pdf' },
  { title: 'Introduction to Technology Apprenticeship', issuer: 'Accenture UK × Forage', date: 'Oct 2025', tag: 'Simulation', file: 'ACCENTURE UK JOB SIMULATION_COMPLETATION_CERTIFICATE.pdf' },
  { title: 'Nestlé Job Simulation', issuer: 'Nestlé × Forage', date: '2025', tag: 'Simulation', file: 'NESTLE.pdf' },
  { title: 'Introduction to Generative AI Studio', issuer: 'SimpliLearn', date: 'Oct 2025', tag: 'AI/ML', file: 'INTRODUCTION TO GENERATIVE AI.pdf' },
  { title: 'Introduction to Artificial Intelligence', issuer: 'SimpliLearn', date: 'Oct 2025', tag: 'AI/ML', file: 'INTRODUCTION TO AI BY SIMPLILEARN .pdf' },
  { title: 'Java Bootcamp', issuer: 'LetsUpgrade', date: '2025', tag: 'Programming', file: "JAVA BOOTCAMP LET'S UPGRADE.pdf" },
  { title: 'Student Ambassador', issuer: 'LetsUpgrade EdTech', date: 'Nov 2025 – Feb 2026', tag: 'Leadership', file: "APPOINTMENT LETTER_LET'S UPGRADE.pdf" },
  { title: 'Web Development Bootcamp', issuer: 'LetsUpgrade', date: '2025', tag: 'Web Dev' },
];

const CertCard = ({ c }: { c: Cert }) => {
  const href = c.file ? `/certificates/${c.file}` : DRIVE_FOLDER;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative glass-panel neon-border p-3 sm:p-4 flex flex-col gap-3 overflow-hidden w-[260px] sm:w-[300px] shrink-0 hover:scale-[1.02] transition-transform"
      style={{ minHeight: 280 }}
    >
      <div
        className="relative h-[120px] rounded-lg overflow-hidden border border-primary/30"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary) / 0.18), hsl(var(--neon-purple) / 0.18)), radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.35), transparent 60%), radial-gradient(circle at 80% 80%, hsl(var(--neon-pink) / 0.25), transparent 55%), hsl(var(--card))',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <Award className="text-primary mb-1.5" size={26} />
          <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/85 line-clamp-1 w-full">
            {c.issuer}
          </p>
          <p className="text-[9px] font-mono text-primary mt-0.5">{c.date}</p>
        </div>
        <span className="absolute top-1.5 left-1.5 w-3 h-3 border-l-2 border-t-2 border-primary" />
        <span className="absolute top-1.5 right-1.5 w-3 h-3 border-r-2 border-t-2 border-primary" />
        <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-l-2 border-b-2 border-primary" />
        <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-r-2 border-b-2 border-primary" />
        <Sparkles size={12} className="absolute top-2 right-2 text-primary/60" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-sm text-foreground leading-snug line-clamp-2 flex-1">{c.title}</h3>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-border/60 text-foreground/70 shrink-0">
          {c.tag}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/40">
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-primary">
          <BadgeCheck size={12} /> Verified
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
          View <ExternalLink size={10} />
        </span>
      </div>
    </a>
  );
};

const AchievementsWall = () => {
  const { t } = useI18n();
  const half = Math.ceil(certificates.length / 2);
  const rowA = certificates.slice(0, half);
  const rowB = certificates.slice(half);

  return (
    <section id="achievements" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mb-3">
            <Trophy size={12} /> {t('awards.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            {t('awards.title')}<span className="neon-text">.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg font-heading">
            {t('awards.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="space-y-5">
        {/* Row 1 — left to right */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
          <motion.div
            className="flex gap-6 sm:gap-8 w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {[...rowA, ...rowA].map((c, i) => (
              <CertCard key={`a-${i}`} c={c} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right to left */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
          <motion.div
            className="flex gap-6 sm:gap-8 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          >
            {[...rowB, ...rowB].map((c, i) => (
              <CertCard key={`b-${i}`} c={c} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mt-10 flex justify-center">
        <a
          href={DRIVE_FOLDER}
          target="_blank"
          rel="noopener noreferrer"
          className="neon-button flex items-center gap-2"
        >
          <ExternalLink size={14} /> {t('awards.viewAll')}
        </a>
      </div>
    </section>
  );
};

export default AchievementsWall;
