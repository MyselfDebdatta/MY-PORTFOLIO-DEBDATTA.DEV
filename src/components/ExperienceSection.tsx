import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Code2, Sparkles, FolderLock, ChevronRight, LayoutGrid, Image as ImageIcon, ChevronLeft, FileText, Award, X, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Software Engineer Intern (SWE)',
    company: 'IOCL (Indian Oil Corporation Limited), Haldia Refinery',
    location: 'Haldia, India',
    date: 'June 15, 2026 - July 13, 2026',
    status: 'Completed',
    description: [
      'Engineered Argus Bid AI, a production-grade deterministic AI-driven tender auditing and compliance platform from scratch.',
      'Developed a 100% deterministic rule engine eliminating hallucinations in procurement evaluation, with explainable audit trails (XAI).',
      'Designed a Dual-Model Hybrid RAG engine leveraging Ollama for local secure processing and Groq API for rapid cloud execution.',
      'Built a custom client-side PDF.js rendering engine to natively render multi-megabyte PDFs in the browser for secure document inspection.'
    ],
    skills: ['Python', 'Streamlit', 'Ollama', 'Groq', 'LangChain', 'ChromaDB'],
    link: 'https://github.com/MyselfDebdatta/Argus-Bid-AI-Tender-Audit-Compliance-SWE-Internship-IOCL-Haldia-2026',
    offerLetterUrl: '/iocl_internship_offer_letter.pdf',
    certificateUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Replace with real URL later
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Creative Web Studio',
    location: 'Bhubaneswar, India',
    date: 'May 2023 - Aug 2023',
    status: 'Completed',
    description: [
      'Developed responsive, pixel-perfect user interfaces using React and Tailwind CSS.',
      'Collaborated closely with UI/UX designers to translate Figma prototypes into functional web apps.',
      'Built a custom 3D product visualizer using Three.js that increased user engagement by 25%.'
    ],
    skills: ['React', 'Tailwind', 'Three.js', 'Figma', 'Vite'],
    offerLetterUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    certificateUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    ]
  }
];

// Document Modal Component
const DocumentModal = ({ url, title, onClose }: { url: string, title: string, onClose: () => void }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-5xl h-[85vh] bg-card border border-border/50 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-background/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <span className="text-sm font-mono text-foreground uppercase tracking-widest">{title}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* PDF Viewer */}
        <div className="flex-1 w-full bg-black/40 p-2 md:p-4">
          {/* Note: In production, consider using react-pdf or similar for robust PDF rendering. 
              Iframe works for most modern browsers for standard PDFs. */}
          <iframe 
            src={url.includes('#') ? `${url}&toolbar=0&navpanes=0&scrollbar=0` : `${url}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full rounded-xl bg-white shadow-inner"
            title="Official Document"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [activeId, setActiveId] = useState<number>(experiences[0].id);
  const [selectedDoc, setSelectedDoc] = useState<{url: string, title: string} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeExp = experiences.find(e => e.id === activeId) || experiences[0];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [activeId]);

  const scrollPrev = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <>
      <section id="experience" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20 text-center md:text-left w-full"
          >
            <span className="neon-button !px-5 !py-1.5 text-xs flex items-center justify-center md:justify-start gap-2 w-fit mx-auto md:mx-0 mb-3">
              <span className="text-primary"><LayoutGrid size={14} /></span> COMMAND CENTER
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Experience <span className="neon-text">Logs.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg font-heading mx-auto md:mx-0">
              A secure terminal dashboard detailing my professional internships and engineering roles.
            </p>
          </motion.div>

          {/* Dashboard Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-[1200px] mx-auto">
            
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {experiences.map((exp) => {
                const isActive = activeId === exp.id;
                const isOngoing = exp.status === 'Ongoing';
                
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveId(exp.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 min-w-[240px] lg:min-w-0 ${
                      isActive 
                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,255,65,0.15)]' 
                        : 'border-border/50 bg-card/40 hover:border-primary/50 hover:bg-card/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isOngoing && isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute" />
                        )}
                        {isOngoing && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent relative z-10" />
                        )}
                        <span className={`text-[10px] font-mono tracking-widest uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                          {exp.date}
                        </span>
                      </div>
                      <h4 className={`font-display font-bold text-sm line-clamp-1 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {exp.company}
                      </h4>
                    </div>
                    {isActive && <ChevronRight size={16} className="text-primary hidden lg:block" />}
                  </button>
                );
              })}
            </div>

            {/* Main Display: Bento Grid */}
            <div className="flex-1 relative min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full"
                >
                  
                  {/* Bento Box 1: Role & Core Info */}
                  <div className="col-span-1 md:col-span-5 p-6 md:p-8 glass-panel rounded-2xl flex flex-col border border-border/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <FolderLock size={64} />
                    </div>
                    
                    <span className={`text-[10px] font-mono uppercase tracking-widest w-fit px-2.5 py-1 rounded border mb-6 ${activeExp.status === 'Ongoing' ? 'border-accent/50 text-accent bg-accent/10' : 'border-primary/30 text-primary bg-primary/10'}`}>
                      {activeExp.status}
                    </span>
                    
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 leading-tight">
                      {activeExp.title}
                    </h3>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center gap-3 text-sm font-heading text-primary/90">
                        <Briefcase size={16} className="shrink-0" /> 
                        <div className="flex-1">
                          {activeExp.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-heading text-muted-foreground">
                        <MapPin size={16} /> {activeExp.location}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-heading text-muted-foreground">
                        <Calendar size={16} /> {activeExp.date}
                      </div>
                      {'link' in activeExp && activeExp.link && (
                        <div className="flex items-center gap-3 text-sm font-heading text-primary mt-4 pt-2 border-t border-border/50">
                          <ExternalLink size={16} /> 
                          <a href={activeExp.link as string} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4 line-clamp-1">
                            View Project Repository
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bento Box 2: Description & Skills */}
                  <div className="col-span-1 md:col-span-7 p-6 md:p-8 glass-panel rounded-2xl border border-border/50 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <Sparkles size={12} className="text-primary" /> Key Contributions
                      </h4>
                      <ul className="space-y-4">
                        {activeExp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[13px] text-foreground/75 font-heading leading-relaxed">
                            <span className="mt-1.5 text-primary shrink-0">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/30">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Code2 size={12} className="text-primary" /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeExp.skills.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded text-xs font-mono tracking-wider border border-primary/20 text-primary/90 bg-primary/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bento Box 3: Official Documents */}
                  <div className="col-span-1 md:col-span-5 p-6 glass-panel rounded-2xl border border-border/50 flex flex-col justify-between group relative overflow-hidden h-full">
                    <div className="absolute -bottom-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <FolderLock size={120} />
                    </div>
                    <div className="mb-6">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <FileText size={12} className="text-primary" /> Official Records
                      </h4>
                      <p className="text-[11px] text-muted-foreground/80 font-heading">
                        Verified documentation and completion records. Click to decrypt and view securely.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto relative z-10">
                      <button 
                        onClick={() => setSelectedDoc({url: activeExp.offerLetterUrl, title: 'Offer Letter'})}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all group/btn"
                      >
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50 group-hover/btn:border-primary/50 transition-colors">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold font-mono text-primary uppercase tracking-wider mb-1">Offer Letter</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Verified Document</div>
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedDoc({url: activeExp.certificateUrl, title: 'Completion Certificate'})}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-all group/btn"
                      >
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50 group-hover/btn:border-accent/50 transition-colors">
                          <Award size={16} className="text-accent" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold font-mono text-accent uppercase tracking-wider mb-1">Completion Certificate</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Verified Document</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bento Box 4: Image Gallery */}
                  <div className="col-span-1 md:col-span-7 p-4 glass-panel rounded-2xl border border-border/50 relative overflow-hidden h-[280px] md:h-full flex flex-col min-h-[300px]">
                    
                    {/* Top Bar with Controls */}
                    <div className="flex items-center justify-between mb-4 shrink-0 z-20">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur border border-border/50">
                        <ImageIcon size={14} className="text-primary" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">Mission Gallery</span>
                      </div>
                      
                      {/* Manual Navigation Controls */}
                      <div className="hidden md:flex items-center gap-2">
                        <button onClick={scrollPrev} className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                          <ChevronLeft size={16} />
                        </button>
                        <button onClick={scrollNext} className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Scrollable Gallery Area */}
                    <div 
                      ref={scrollRef}
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide pb-2"
                    >
                      {activeExp.gallery.map((imgSrc, index) => (
                        <div key={index} className="snap-center shrink-0 w-[85%] md:w-[60%] lg:w-[50%] h-full relative rounded-xl overflow-hidden group border border-border/30">
                          <img 
                            src={imgSrc} 
                            alt={`${activeExp.title} memory ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            [IMG_REF_{index + 1}]
                          </div>
                        </div>
                      ))}
                      <div className="shrink-0 w-4 md:w-8" />
                    </div>

                    {/* Hint for scrolling (Mobile Only) */}
                    <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 pointer-events-none">
                      ← Swipe to view more →
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Hide scrollbar CSS */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* Document Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <DocumentModal url={selectedDoc.url} title={selectedDoc.title} onClose={() => setSelectedDoc(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceSection;
