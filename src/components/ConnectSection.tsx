import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Lightbulb, Phone, Download, MessageCircle, CalendarClock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { z } from 'zod';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const RESUME_URL = 'https://drive.google.com/file/d/1rHpJvqwHdZZMzZV8n6qbGa0GNmfB87nE/view?usp=drivesdk';
const WHATSAPP_URL = 'https://wa.me/918637377080';
const PHONE_DISPLAY = '+91 86373 77080';
const PHONE_TEL = '+918637377080';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/MyselfDebdatta', color: '#ffffff' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/myself-debdatta-194a822b1', color: '#0A66C2' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/itz__debdatta?igsh=MXRydjliNmdycDFrdg==', color: '#E1306C' },
  { icon: MessageCircle, label: 'WhatsApp', href: WHATSAPP_URL, color: '#25D366' },
];

const optionalUrl = z
  .string()
  .trim()
  .max(255, 'Link too long')
  .optional()
  .or(z.literal(''))
  .refine((v) => !v || /^https?:\/\/.+\..+/i.test(v), { message: 'Enter a valid URL (https://...)' });

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Please enter a valid email').max(255),
  linkedin: optionalUrl,
  github: optionalUrl,
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

type FieldErrors = Partial<Record<'name' | 'email' | 'linkedin' | 'github' | 'message', string>>;

const ConnectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', github: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const validateField = (field: keyof typeof formData, value: string) => {
    const fieldSchema = contactSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({ ...prev, [field]: result.success ? undefined : result.error.issues[0]?.message }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const next: FieldErrors = {};
      result.error.issues.forEach((i) => {
        const f = i.path[0] as keyof FieldErrors;
        if (!next[f]) next[f] = i.message;
      });
      setErrors(next);
      toast.error('Please fix the highlighted fields');
      return;
    }
    setErrors({});
    setSubmitting(true);
    
    try {
      // 1. Send the main email to you (Contact Us Template)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT,
        {
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedin || 'Not provided',
          github: formData.github || 'Not provided',
          message: formData.message,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Send the auto-reply email to the user
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reply_to: 'myselfdeb11@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 3. Save to Google Sheets
      const sheetData = new FormData();
      sheetData.append('Name', formData.name);
      sheetData.append('Email', formData.email);
      sheetData.append('LinkedIn', formData.linkedin || 'Not provided');
      sheetData.append('GitHub', formData.github || 'Not provided');
      sheetData.append('Message', formData.message);

      try {
        await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
          method: 'POST',
          body: sheetData,
          mode: 'no-cors' // Required for Google Apps Script to not block the request
        });
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
        // We don't want to show an error to the user if ONLY the sheet fails but emails sent
      }
      
      setSubmitting(false);
      setConfirmed(true);
      toast.success('Message sent', { description: 'I will get back to you shortly.' });
      setFormData({ name: '', email: '', linkedin: '', github: '', message: '' });
      setTimeout(() => setConfirmed(false), 2600);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitting(false);
      toast.error('Failed to send message', { description: 'Please try again later or reach out via email directly.' });
    }
  };

  const fieldClass = (f: keyof FieldErrors) =>
    `w-full bg-input/50 border rounded-lg px-4 py-3 text-foreground font-heading text-sm focus:outline-none focus:ring-1 transition-all ${
      errors[f]
        ? 'border-destructive/60 focus:border-destructive focus:ring-destructive/30'
        : 'border-border focus:border-primary/50 focus:ring-primary/20'
    }`;

  return (
    <section id="connect" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mb-3">
            <span className="text-primary">●</span> CONTACT
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Connect<span className="neon-text">.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg font-heading">
            Got a project in mind? Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative glass-panel neon-border p-8 space-y-6 overflow-hidden"
          >
            {/* Name */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={(e) => validateField('name', e.target.value)}
                className={fieldClass('name')}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                maxLength={100}
                required
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="err-name"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                  >
                    <AlertCircle size={12} /> {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                className={fieldClass('email')}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                maxLength={255}
                required
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="err-email"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                  >
                    <AlertCircle size={12} /> {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* LinkedIn + GitHub (optional) */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                  <Linkedin size={11} className="text-primary" /> LinkedIn <span className="opacity-50 normal-case">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  onBlur={(e) => validateField('linkedin', e.target.value)}
                  className={fieldClass('linkedin')}
                  placeholder="https://linkedin.com/in/your-id"
                  maxLength={255}
                />
                <AnimatePresence>
                  {errors.linkedin && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                      <AlertCircle size={12} /> {errors.linkedin}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                  <Github size={11} className="text-primary" /> GitHub <span className="opacity-50 normal-case">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  onBlur={(e) => validateField('github', e.target.value)}
                  className={fieldClass('github')}
                  placeholder="https://github.com/your-id"
                  maxLength={255}
                />
                <AnimatePresence>
                  {errors.github && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                      <AlertCircle size={12} /> {errors.github}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Message</label>
                <span className={`text-[10px] font-mono ${formData.message.length > 1000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.message.length}/1000
                </span>
              </div>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={(e) => validateField('message', e.target.value)}
                rows={5}
                className={`${fieldClass('message')} resize-none`}
                placeholder="Tell me about your project, timeline, budget, and any specific tech or design requirements — the more context, the better the build."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
                maxLength={1000}
                required
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    id="err-message"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                  >
                    <AlertCircle size={12} /> {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={submitting || confirmed}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="neon-button w-full !py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {submitting ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : confirmed ? (
                <><CheckCircle2 size={16} /> Sent</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </motion.button>

            {/* Animated confirmation overlay */}
            <AnimatePresence>
              {confirmed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 backdrop-blur-sm bg-background/70 flex flex-col items-center justify-center gap-4 z-10"
                >
                  <motion.svg
                    width="84" height="84" viewBox="0 0 84 84"
                    initial={{ scale: 0.4, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  >
                    <motion.circle
                      cx="42" cy="42" r="38"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
                    />
                    <motion.path
                      d="M26 44 L38 56 L60 32"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                      style={{ filter: 'drop-shadow(0 0 6px hsl(var(--primary)))' }}
                    />
                  </motion.svg>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="font-display text-lg text-foreground"
                  >
                    Message Delivered
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 space-y-5 relative overflow-hidden">
              {/* <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" /> */}
              <h3 className="font-display text-lg font-bold text-foreground tracking-wide relative">
                Reach out Anytime
              </h3>
              <ul className="space-y-3.5 relative">
                <li className="flex items-center gap-3 text-muted-foreground group">
                  <Phone size={15} className="text-primary shrink-0" />
                  <a href={`tel:${PHONE_TEL}`} className="font-heading text-sm group-hover:text-primary transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground group">
                  <MessageCircle size={15} className="text-primary shrink-0" />
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-heading text-sm group-hover:text-primary transition-colors">
                    WhatsApp · {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground group">
                  <Mail size={15} className="text-primary shrink-0" />
                  <a href="mailto:myselfdeb11@gmail.com" className="font-heading text-sm group-hover:text-primary transition-colors break-all">
                    myselfdeb11@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={15} className="text-primary shrink-0" />
                  <span className="font-heading text-sm">Bhubaneswar, India · Available Worldwide (Remote)</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground group">
                  <Download size={15} className="text-primary shrink-0" />
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="font-heading text-sm group-hover:text-primary transition-colors">
                    Grab My Resume
                  </a>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm font-heading leading-relaxed pt-2 border-t border-border/40 relative">
                I'm always excited to collaborate on innovative projects. Whether it's a startup idea,
                a complex web application, or a creative experiment — let's make it happen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-panel p-4 flex items-center gap-3 group cursor-pointer hover:neon-border transition-all duration-300"
                >
                  <social.icon size={20} style={{ color: social.color }} />
                  <span className="text-sm font-heading text-secondary-foreground">{social.label}</span>
                  <ArrowUpRight size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Pro tip card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 via-background/40 to-[hsl(var(--neon-purple))]/5 p-5 overflow-hidden"
            >
              {/* <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" /> */}
              <div className="flex items-start gap-3 relative">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <Lightbulb size={16} className="text-primary" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">Pro Tip from Debdatta</p>
                  <p className="text-sm text-foreground/85 font-heading leading-relaxed">
                    Share your <span className="text-primary">project goals</span>, expected <span className="text-primary">timeline</span>, rough <span className="text-primary">budget</span>, and your preferred <span className="text-primary">tech stack</span> — the more context you give, the faster I can ship a tailored, scalable solution for you.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Calendly booking embed */}
        <motion.div
          id="book"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 glass-panel neon-border overflow-hidden scroll-mt-24"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <CalendarClock size={16} className="text-primary" />
              <div>
                <p className="font-display text-sm text-foreground">{t('connect.book')}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {t('connect.bookSub')}
                </p>
              </div>
            </div>
            <a
              href="https://calendly.com/myselfdeb11/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-widest text-primary border border-primary/40 rounded-full px-3 py-1 hover:bg-primary/10 transition-colors"
            >
              Open in new tab
            </a>
          </div>
          <iframe
            src="https://calendly.com/myselfdeb11/30min?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=0&background_color=0b1418&text_color=e6fffb&primary_color=14e0c2"
            title="Schedule a call with Debdatta"
            className="w-full bg-background"
            style={{ height: 760, border: 0 }}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" /> */}
    </section>
  );
};

export default ConnectSection;
