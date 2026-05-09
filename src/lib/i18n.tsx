import { createContext, useContext, ReactNode } from 'react';

export type Lang = 'en';

const dict: Record<string, string> = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.journey': 'Journey',
  'nav.tech': 'Tech',
  'nav.projects': 'Projects',
  'nav.connect': 'Connect',
  'nav.achievements': 'Awards',
  'hero.welcome': 'Welcome to my digital space',
  'hero.greeting': "Hi, I'm ",
  'hero.role.0': 'Aspiring Full Stack Developer',
  'hero.role.1': 'AI/ML Learner',
  'hero.role.2': 'Cloud & DevOps Practitioner',
  'hero.tagline':
    'Crafting modern web experiences with a passion for continuous learning, creative problem-solving, and building impactful solutions — always ready for new challenges and opportunities.',
  'hero.resume': 'Grab My Resume',
  'hero.available': 'Available for projects',
  'hero.internships': 'Open to Internships',
  'about.badge': 'ABOUT',
  'about.title': 'Who Am I',
  'about.p1':
    "I'm a full-stack developer who thrives at the intersection of design and engineering. With a deep love for React ecosystems and Node.js, I build applications that are both beautiful and performant.",
  'about.p2':
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or pushing the boundaries of what's possible on the web with 3D graphics and interactive experiences.",
  'awards.badge': 'AWARDS',
  'awards.title': 'Achievements Wall',
  'awards.subtitle': 'Certificates, milestones, and proof of the grind.',
  'awards.viewAll': 'View all on Drive',
  'awards.viewCert': 'View Certificate',
  'connect.book': 'Schedule a Call',
  'connect.bookSub': 'Pick a slot that works — calendar synced live.',
  'cmd.placeholder': 'Type a command or jump to a section…',
  'cmd.hint': 'Press ⌘K / Ctrl+K to open',
  'cmd.group.nav': 'Navigate',
  'cmd.group.actions': 'Actions',
  'cmd.group.links': 'External',
  'cmd.theme': 'Toggle theme',
  'cmd.replay': 'Replay intro',
  'cmd.resume': 'Open resume',
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx>({ lang: 'en', setLang: () => {}, t: (k) => dict[k] ?? k });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const t = (key: string) => dict[key] ?? key;
  return <Ctx.Provider value={{ lang: 'en', setLang: () => {}, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => useContext(Ctx);

export const LANG_LABELS: Record<Lang, string> = { en: 'EN' };
