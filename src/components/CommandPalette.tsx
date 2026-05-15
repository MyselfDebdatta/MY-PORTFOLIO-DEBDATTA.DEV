import { useEffect, useState } from 'react';
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator,
} from '@/components/ui/command';
import { Home, User, GitBranch, Cpu, FolderGit2, Mail, Trophy, Sun, RotateCcw, FileText, Linkedin, Github, Instagram, MessageCircle, Phone, CalendarDays, PanelBottom } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';

const RESUME_URL = 'https://drive.google.com/file/d/1tS9nOPps8ZYQ2lXxMUzJyg4hJJ9lQWpc/view?usp=drivesdk';
const WHATSAPP_URL = 'https://wa.me/918637377080';
const INSTAGRAM_URL = 'https://www.instagram.com/itz__debdatta?igsh=MXRydjliNmdycDFrdg==';
const PHONE_TEL = '+918637377080';
const EMAIL = 'myselfdeb11@gmail.com';

const sections = [
  { id: 'home', icon: Home, key: 'nav.home' },
  { id: 'about', icon: User, key: 'nav.about' },
  { id: 'journey', icon: GitBranch, key: 'nav.journey' },
  { id: 'techstack', icon: Cpu, key: 'nav.tech' },
  { id: 'projects', icon: FolderGit2, key: 'nav.projects' },
  { id: 'achievements', icon: Trophy, key: 'nav.achievements' },
  { id: 'connect', icon: Mail, key: 'nav.connect' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    const openEvt = () => setOpen(true);
    window.addEventListener('open-command-palette', openEvt);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', openEvt);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light');
    setOpen(false);
  };

  const replayIntro = () => {
    window.dispatchEvent(new Event('replay-intro'));
    setOpen(false);
    toast('Replaying intro');
  };

  const openExternal = (url: string) => { window.open(url, '_blank', 'noopener,noreferrer'); setOpen(false); };
  const openSelf = (url: string) => { window.location.href = url; setOpen(false); };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t('cmd.placeholder')} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading={t('cmd.group.nav')}>
          {sections.map((s) => (
            <CommandItem key={s.id} onSelect={() => go(s.id)}>
              <s.icon className="mr-2 h-4 w-4 text-primary" /> {t(s.key)}
            </CommandItem>
          ))}
          <CommandItem onSelect={() => go('book')}>
            <CalendarDays className="mr-2 h-4 w-4 text-primary" /> Schedule a Call
          </CommandItem>
          <CommandItem onSelect={() => {
            setOpen(false);
            requestAnimationFrame(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
          }}>
            <PanelBottom className="mr-2 h-4 w-4 text-primary" /> Footer
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('cmd.group.actions')}>
          <CommandItem onSelect={toggleTheme}>
            <Sun className="mr-2 h-4 w-4 text-primary" /> {t('cmd.theme')}
          </CommandItem>
          <CommandItem onSelect={replayIntro}>
            <RotateCcw className="mr-2 h-4 w-4 text-primary" /> {t('cmd.replay')}
          </CommandItem>
          <CommandItem onSelect={() => openSelf(`tel:${PHONE_TEL}`)}>
            <Phone className="mr-2 h-4 w-4 text-primary" /> Call Me Now
          </CommandItem>
          <CommandItem onSelect={() => openSelf(`mailto:${EMAIL}`)}>
            <Mail className="mr-2 h-4 w-4 text-primary" /> Email Me
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('cmd.group.links')}>
          <CommandItem onSelect={() => openExternal(RESUME_URL)}>
            <FileText className="mr-2 h-4 w-4 text-primary" /> {t('cmd.resume')}
          </CommandItem>
          <CommandItem onSelect={() => openExternal('https://github.com/MyselfDebdatta')}>
            <Github className="mr-2 h-4 w-4 text-primary" /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal('https://www.linkedin.com/in/myself-debdatta-194a822b1')}>
            <Linkedin className="mr-2 h-4 w-4 text-primary" /> LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => openExternal(INSTAGRAM_URL)}>
            <Instagram className="mr-2 h-4 w-4 text-primary" /> Instagram
          </CommandItem>
          <CommandItem onSelect={() => openExternal(WHATSAPP_URL)}>
            <MessageCircle className="mr-2 h-4 w-4 text-primary" /> WhatsApp
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground bg-muted/30">
        <div className="flex items-center gap-4 hidden sm:flex">
          <div className="flex items-center gap-1.5">
            <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium border border-border/50 shadow-sm">↑</kbd>
            <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium border border-border/50 shadow-sm">↓</kbd>
            <span className="ml-1">Navigate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium border border-border/50 shadow-sm">↵</kbd>
            <span className="ml-1">Select</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium border border-border/50 shadow-sm">ESC</kbd>
          <span className="ml-1">Close</span>
        </div>
      </div>
    </CommandDialog>
  );
};

export default CommandPalette;
