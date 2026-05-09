import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { domain: 'Frontend', value: 90 },
  { domain: 'Backend', value: 75 },
  { domain: 'Databases', value: 75 },
  { domain: 'DevOps', value: 50 },
  { domain: 'Cloud', value: 50 },
  { domain: 'AI / ML', value: 60 },
  { domain: '3D / UI Motion', value: 80 },
  { domain: 'Tooling', value: 90 },
];

const SkillsRadar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch"
    >
      <div className="glass-panel neon-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Proficiency Radar</p>
            <h3 className="font-display text-xl text-foreground">Skill Spectrum<span className="neon-text">.</span></h3>
          </div>
          <span className="text-[10px] font-mono text-primary tracking-widest border border-primary/30 rounded-full px-2 py-0.5">
            LIVE / SELF-RATED
          </span>
        </div>
        <div className="h-[320px] w-full">
          <ResponsiveContainer>
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="domain"
                tick={{ fill: 'hsl(var(--foreground) / 0.8)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                stroke="hsl(var(--border))"
              />
              <Radar
                name="Mastery"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.35}
                strokeWidth={2}
                dot={{ r: 3, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 1 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col gap-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Domain Breakdown</p>
        <div className="space-y-3 mt-1">
          {data.map((d) => (
            <div key={d.domain}>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-foreground/85">{d.domain}</span>
                <span className="text-primary">{d.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))]"
                  style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsRadar;
