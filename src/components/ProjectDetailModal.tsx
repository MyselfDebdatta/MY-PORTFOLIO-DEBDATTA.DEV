import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Target, Zap, Users, Trophy, Lightbulb, Wrench, Rocket, BarChart3, Shield } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface ProjectDetail {
  id: number;
  name: string;
  tagline: string;
  liveUrl?: string;
  keyDetails: { label: string; value: string }[];
  focusAreas: string[];
  techStack: string[];
  about: {
    problem: string;
    solution: string;
    goals: string;
    engineering: string;
    impact: string;
  };
  team: TeamMember[];
  achievements: string[];
}

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

const sectionIcon: Record<string, React.ReactNode> = {
  problem: <Shield size={20} />,
  solution: <Lightbulb size={20} />,
  goals: <Target size={20} />,
  engineering: <Wrench size={20} />,
  impact: <BarChart3 size={20} />,
};

const ProjectDetailModal = ({ project, onClose }: Props) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: '0 0 60px hsl(var(--primary) / 0.1)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-foreground"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="p-8 pb-6 border-b border-border/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Rocket size={28} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {project.name}
                </h2>
                <p className="text-muted-foreground font-heading text-sm mt-1">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {project.keyDetails.map((detail, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border/30">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                    {detail.label}
                  </span>
                  <p className="text-foreground font-bold text-lg mt-1">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Focus Areas */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
                <Target size={20} className="text-primary" /> Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-muted/40 border border-border/40 text-sm text-foreground font-heading"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
                <Zap size={20} className="text-primary" /> Tech Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-foreground font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* About sections */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground mb-4">About</h3>
              <div className="space-y-4">
                {Object.entries(project.about).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-muted/20 border border-border/30">
                    <h4 className="text-sm font-display font-bold text-primary uppercase tracking-wider flex items-center gap-2 mb-2">
                      {sectionIcon[key]} The {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-heading">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
                <Users size={20} className="text-primary" /> Team Members
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {project.team.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-full border border-border/50 bg-muted/40 flex items-center justify-center text-sm font-bold text-foreground">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-4">
                <Trophy size={20} className="text-primary" /> Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/30"
                  >
                    <Trophy size={16} className="text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground font-heading">{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview button */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button flex items-center justify-center gap-2 w-full !py-4 text-center"
              >
                <ExternalLink size={16} /> Visit Live Project
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export type { ProjectDetail };
export default ProjectDetailModal;
