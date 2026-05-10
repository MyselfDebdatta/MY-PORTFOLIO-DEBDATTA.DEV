import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Search, Github, Phone, CalendarDays, Sparkles, MessageCircle } from 'lucide-react';
import ProjectDetailModal, { type ProjectDetail } from './ProjectDetailModal';
import nexusLearnImg from '@/assets/project-nexus-learn.jpg';
import portfolioImg from '@/assets/project-portfolio.jpg';
import maintrixImg from '@/assets/project-maintrix.jpg';
import ishaImg from '@/assets/project-isha.jpg';
import autobleImg from '@/assets/project-autoble.jpg';
import udyogImg from '@/assets/project-udyog.jpg';

interface MemoryCard {
  id: number;
  frontLabel: string;
  title: string;
  tagline: string;
  preview: string;
  image: string;
  backDescription: string;
  liveUrl?: string;
  projectDetail: ProjectDetail;
}

const memoryCards: MemoryCard[] = [
  {
    id: 1,
    frontLabel: 'AI / EDTECH',
    title: 'NEXUS LEARN',
    tagline: 'AI-Powered Student Wellbeing Platform',
    preview: 'A living, breathing digital twin for every student.',
    image: nexusLearnImg,
    backDescription:
      '1 in 3 students burns out before they graduate. Most institutions find out too late. We built NEXUS LEARN — an AI-powered platform with 3 engines (SENTINEL, APOLLO, IRIS) running in parallel to monitor wellbeing, predict dropout risk, and adapt learning environments in real time.',
    liveUrl: 'https://lnkd.in/g-MJd8HQ',
    projectDetail: {
      id: 1,
      name: 'NEXUS LEARN',
      tagline: 'AI-Powered Student Wellbeing Platform — A digital twin for every student',
      liveUrl: 'https://lnkd.in/g-MJd8HQ',
      keyDetails: [
        { label: 'Platform', value: 'Web App' },
        { label: 'Event', value: 'XIM SYNC 4.0' },
        { label: 'Team Size', value: '5 Builders' },
        { label: 'AI Engines', value: '3 Parallel' },
      ],
      focusAreas: ['AI/ML', 'EdTech', 'Student Wellbeing', 'Real-time Analytics', 'Adaptive Learning'],
      techStack: ['React', 'TypeScript', 'Python', 'Google Gemini 2.5 Flash', 'TensorFlow', 'Node.js', 'PostgreSQL'],
      about: {
        problem:
          '1 in 3 students burns out before they graduate. Traditional LMS platforms cost institutions heavily per student per year. Most dropout interventions happen after the damage is done. Educators spend up to 40% of their time on admin work instead of supporting students.',
        solution:
          'NEXUS LEARN is a living, breathing digital twin for every student. It monitors behavioral signals, predicts dropout risk, and adapts the reading environment to cognitive state — all in real time. Every prediction is explainable, every alert has a reason, every student is treated as an individual.',
        goals:
          'Build a platform that can feel when a student is about to break down before they do. Give educators a real-time radar for every student in their cohort. Make the reading environment itself adapt to cognitive state in real time.',
        engineering:
          'Three AI engines run in parallel: SENTINEL monitors 19 behavioral signals and scores cognitive fatigue from 0-100, forecasting the next 72 hours. APOLLO calculates dropout risk in real time, tiering every student from low to critical. IRIS reads cognitive state and adapts font size, line height, contrast, and letter spacing live, powered by Google Gemini 2.5 Flash.',
        impact:
          'NEXUS LEARN flips the traditional approach — intervening before damage is done, reducing educator admin burden, and treating each student as an individual rather than a statistic. Presented at XIM SYNCHRONIZE 4.0 to critical acclaim.',
      },
      team: [
        { name: 'Debdatta Panda', role: 'Team Lead' },
        { name: 'Rohit Jain', role: 'Developer' },
        { name: 'Soumyasri Mohapatra', role: 'Developer' },
        { name: 'Ritisha Sahoo', role: 'Developer' },
        { name: 'Sahil Kumar Sahoo', role: 'Developer' },
      ],
      achievements: [
        'Presented at XIM SYNCHRONIZE 4.0',
        '3 AI engines running in parallel',
        '19 behavioral signals monitored continuously',
        '72-hour cognitive fatigue forecasting',
        'Real-time adaptive reading environment',
      ],
    },
  },
  {
    id: 2,
    frontLabel: 'WEB / PORTFOLIO',
    title: 'debdatta.dev',
    tagline: 'Cinematic 3D Developer Portfolio',
    preview: 'A futuristic, cyber-neon portfolio with cinematic intro & 3D interactions.',
    image: portfolioImg,
    backDescription:
      'My personal portfolio — a cinematic, cyber-neon experience featuring a terminal boot intro, 3D project carousel, animated journey timeline, glittering particle background, and live typewriter roles. Built end-to-end as a showcase of design, engineering, and storytelling.',
    liveUrl: 'https://debdatta-panda.vercel.app/',
    projectDetail: {
      id: 2,
      name: 'debdatta.dev — Portfolio',
      tagline: 'A cinematic cyber-neon portfolio engineered as a product, not a template.',
      liveUrl: 'https://debdatta-panda.vercel.app/',
      keyDetails: [
        { label: 'Type', value: 'Personal Portfolio' },
        { label: 'Stack', value: 'React + Vite + TS' },
        { label: 'Theme', value: 'Cyber Neon' },
        { label: 'Status', value: 'Live · Evolving' },
      ],
      focusAreas: ['Web Development', 'UI/UX Design', '3D Interactions', 'Motion Design', 'Storytelling'],
      techStack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Three Fiber', 'GSAP', 'Lucide'],
      about: {
        problem:
          'Most developer portfolios feel templated — static grids, the same shadcn hero, no personality. Recruiters scroll past them in seconds because nothing earns the attention.',
        solution:
          'I designed debdatta.dev as a cinematic experience: a terminal boot intro sets the tone, a glittering parallax starfield breathes behind every section, a 3D rotating carousel showcases projects, and an animated journey timeline tells my story from Class X to B.Tech.',
        goals:
          'Build a portfolio that feels alive — every section earns its place, every animation has intent, and recruiters remember the brand long after the tab closes.',
        engineering:
          'React + Vite + TypeScript foundation, with a custom design token system in Tailwind. Framer Motion drives layout transitions and micro-interactions. A canvas-based animated background renders 3 parallax layers, sparkles, fireflies and shooting stars with hardware-tier scaling. The intro terminal types per character with a synced progress bar. Light/dark themes share semantic HSL tokens for full consistency.',
        impact:
          'A portfolio that doubles as a project — demonstrating motion design, performance budgeting, accessibility, and product thinking in one shippable artifact. Already drawing inbound interest from recruiters and collaborators.',
      },
      team: [{ name: 'Debdatta Panda', role: 'Designer & Developer' }],
      achievements: [
        'Cinematic terminal boot intro with replay control',
        '3D rotating project carousel with flip cards',
        'Animated My Journey timeline with auto-cycling galleries',
        'Hardware-aware glittering particle background',
        'Light + Dark theme with full semantic token system',
        'Lighthouse-friendly performance with lazy-loaded sections',
      ],
    },
  },
  {
    id: 3,
    frontLabel: 'MERN / SAAS',
    title: 'MAINTRIX',
    tagline: 'Office Maintenance & Ticket Management Platform',
    preview: 'Role-based maintenance workflow with real-time chat & audits.',
    image: maintrixImg,
    backDescription:
      'Maintrix is a modern office maintenance and ticket management platform that streamlines workflows between employees, managers and technicians with role-based dashboards, real-time chat and full issue tracking. Deployed on Google Cloud Run.',
    liveUrl: 'https://maintrix-44806187079.us-central1.run.app',
    projectDetail: {
      id: 3,
      name: 'MAINTRIX — Office Maintenance Software',
      tagline: 'A unified, role-based ticketing platform for modern workplaces.',
      liveUrl: 'https://maintrix-44806187079.us-central1.run.app',
      keyDetails: [
        { label: 'Type', value: 'Full-Stack SaaS' },
        { label: 'Stack', value: 'MERN' },
        { label: 'Deployment', value: 'Google Cloud Run' },
        { label: 'Status', value: 'Live' },
      ],
      focusAreas: ['Workflow Automation', 'RBAC', 'Real-time Chat', 'Cloud Deployment', 'Operational Auditing'],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Docker', 'Google Cloud Run'],
      about: {
        problem:
          'Office maintenance requests are usually chaotic — scattered across emails or paper trails. Employees can\'t track ticket status, managers lack visibility into operations, and technicians juggle disorganized assignments, causing delays and lost productivity.',
        solution:
          'Maintrix gives every workplace a single, transparent, role-driven hub. Employees raise tickets, managers triage and assign, and technicians update status in real time — all backed by an embedded chat tied to each ticket.',
        goals:
          'Cut resolution time, give managers a live operational dashboard, and create a fully auditable ticket lifecycle from creation to closure.',
        engineering:
          'MERN stack with JWT-based auth and role-based access control for Employees, Managers and Technicians. React (Vite) + Tailwind on the frontend, Express + Mongoose API, MongoDB Atlas storage, containerised with Docker and shipped to Google Cloud Run.',
        impact:
          'Replaces fragmented email/paper workflows with a single source of truth — faster triage, clearer accountability and a complete audit trail for every maintenance request.',
      },
      team: [{ name: 'Debdatta Panda', role: 'Full-Stack Developer' }],
      achievements: [
        'End-to-end ticket lifecycle (create → assign → resolve)',
        'JWT auth + RBAC for 3 distinct user roles',
        'Real-time chat embedded per ticket',
        'Containerised deployment on Google Cloud Run',
      ],
    },
  },
  {
    id: 4,
    frontLabel: 'AI / SPACE',
    title: 'ISHA',
    tagline: 'Intelligent Space Hazard Analysis',
    preview: 'Real-time asteroid risk intelligence powered by NASA NeoWs.',
    image: ishaImg,
    backDescription:
      'ISHA is a full-stack asteroid risk intelligence platform built on NASA NeoWs data. It analyzes near-Earth objects in real time, scores threat levels with physics-based risk modelling, and delivers user-specific monitoring with interactive 3D orbital visualisation.',
    liveUrl: 'https://myselfdebdatta.github.io/ISHA-Intelligent-Space-Hazard-Analysis-/',
    projectDetail: {
      id: 4,
      name: 'ISHA — Intelligent Space Hazard Analysis',
      tagline: 'Live near-Earth asteroid intelligence built for the NASA Space Challenge.',
      liveUrl: 'https://myselfdebdatta.github.io/ISHA-Intelligent-Space-Hazard-Analysis-/',
      keyDetails: [
        { label: 'Type', value: 'Full-Stack Platform' },
        { label: 'Data', value: 'NASA NeoWs API' },
        { label: 'Event', value: 'NASA Space Challenge' },
        { label: 'Status', value: 'Live' },
      ],
      focusAreas: ['Space Tech', 'Real-time Data', 'Risk Modelling', '3D Visualisation', 'Watchlists & Alerts'],
      techStack: ['React', 'Node.js', 'Express', 'NASA NeoWs API', 'Three.js', 'JWT', 'Chart.js'],
      about: {
        problem:
          'Near-Earth Objects pose a real planetary risk, but most public asteroid datasets stay locked in dense scientific formats — too slow and too technical for real-time decision making.',
        solution:
          'ISHA bridges raw space telemetry and actionable intelligence: live NASA feeds, automated physics-based risk scoring beyond binary "hazardous" flags, an interactive 3D orbital map and per-user watchlists for ongoing monitoring.',
        goals:
          'Make planetary risk intelligence approachable — instant risk assessment, intuitive 3D spatial awareness and continuous tracking of objects of interest.',
        engineering:
          'React frontend with secure JWT auth and per-user watchlists, Express backend that ingests and normalises NASA NeoWs data, a physics-based risk engine that combines mass, velocity, proximity and hazard flags, and a Three.js powered 3D orbital dashboard.',
        impact:
          'Turns scientific telemetry into a live, human-friendly radar — earlier detection, faster decisions and a much more intuitive way to understand asteroid trajectories.',
      },
      team: [
        { name: 'Debdatta Panda', role: 'Full-Stack Developer' },
        { name: 'Soumyashri Mohapatra', role: 'Full-Stack Developer' },
        { name: 'Deepesh Singh', role: 'Full-Stack Developer' },
        { name: 'Ayush Animesh Barik', role: 'Full-Stack Developer' },
      ],
      achievements: [
        'Live NASA NeoWs data ingestion pipeline',
        'Physics-based asteroid risk scoring engine',
        'Interactive 3D orbital visualisation dashboard',
        'Secure per-user watchlists and alerts',
      ],
    },
  },
  {
    id: 5,
    frontLabel: 'IOT / EMBEDDED',
    title: 'AutoBLE',
    tagline: 'Smart Inventory, Verified by Proximity',
    preview: 'Offline BLE-powered inventory verification on an ESP32 hotspot.',
    image: autobleImg,
    backDescription:
      'AutoBLE is a portable, fully offline inventory system that pairs ESP32 with BLE beacons. Tagged containers are detected via RSSI proximity and auto-verified on a real-time React dashboard served directly from the ESP32 hotspot. Note: As it\'s a hardware-based project, the website is not functional without the hardware model, but it is provided for a better understanding of the project.',
    liveUrl: 'https://MyselfDebdatta.github.io/AutoBLE_SMART-INVENTORY_VERIFIED-BY-PROXIMITY/',
    projectDetail: {
      id: 5,
      name: 'AutoBLE — Smart Inventory Verified by Proximity',
      tagline: 'A fully offline, BLE-powered inventory verifier hosted from an ESP32.',
      liveUrl: 'https://MyselfDebdatta.github.io/AutoBLE_SMART-INVENTORY_VERIFIED-BY-PROXIMITY/',
      keyDetails: [
        { label: 'Type', value: 'IoT + Embedded' },
        { label: 'Hardware', value: 'ESP32 + BLE Tags' },
        { label: 'Connectivity', value: 'Offline · ESP32 Hotspot' },
        { label: 'Status', value: 'Prototype' },
      ],
      focusAreas: ['IoT', 'Embedded Systems', 'BLE / RSSI', 'Offline-First', 'Realtime Dashboards'],
      techStack: ['React', 'Vite', 'Custom SVG', 'ESP32', 'Bluetooth Low Energy', 'C++ (Arduino)', 'WebSockets'],
      about: {
        problem:
          'Field inventory verification often needs internet, expensive scanners or manual checks — none of which are reliable in warehouses, remote sites or moving vehicles.',
        solution:
          'AutoBLE turns an ESP32 into a self-contained inventory hub: it broadcasts its own Wi-Fi hotspot, scans nearby BLE beacons attached to containers, and serves a real-time React dashboard that auto-verifies what is in range.',
        goals:
          'Build a portable inventory verifier that is fast, fully offline, and works on any device with a browser.',
        engineering:
          'ESP32 firmware scans BLE advertisements and reads RSSI for proximity inference, while hosting a Wi-Fi access point and lightweight HTTP/WebSocket server. The React + Vite dashboard is bundled and served directly from the ESP32, with custom SVG visuals for tag status.',
        impact:
          'A pocket-sized, internet-free inventory verifier — ideal for site audits, remote storage and any environment where connectivity isn\'t guaranteed. Note: As it\'s a hardware-based project, the website is not functional without the hardware model, but it is provided for a better understanding of the project.',
      },
      team: [{ name: 'Debdatta Panda', role: 'Full-Stack Developer' }],
      achievements: [
        'Self-hosted React dashboard on ESP32 hotspot',
        'BLE proximity verification using RSSI',
        '100% offline operation — no cloud dependency',
        'Custom SVG visualisation for live tag status',
      ],
    },
  },
  {
    id: 6,
    frontLabel: 'AI / GOVTECH · ONGOING',
    title: 'Udyog Sarthi',
    tagline: 'AI Compliance Co-Pilot for MSMEs',
    preview: 'Step-by-step regulatory guidance for Indian MSMEs.',
    image: udyogImg,
    backDescription:
      'Udyog-Sarthi is an AI-powered compliance co-pilot for MSMEs in India. It simplifies regulatory processes through guided step-by-step flows backed by verified data, helping small businesses navigate licensing, taxation and statutory filings with confidence.',
    projectDetail: {
      id: 6,
      name: 'Udyog Sarthi — AI Compliance Co-Pilot',
      tagline: 'Helping Indian MSMEs untangle regulatory complexity, one step at a time.',
      keyDetails: [
        { label: 'Type', value: 'AI / GovTech' },
        { label: 'Audience', value: 'Indian MSMEs' },
        { label: 'Stack', value: 'Full-Stack + LLM' },
        { label: 'Status', value: 'Ongoing — In Development' },
      ],
      focusAreas: ['GovTech', 'AI Assistants', 'Regulatory Compliance', 'MSME Enablement', 'Conversational UX'],
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'LLM APIs', 'Vector Search', 'PostgreSQL'],
      about: {
        problem:
          'India\'s 60M+ MSMEs face a maze of compliance — GST, Udyam registration, labour laws, sector licences. The information exists but is fragmented across portals, jargon-heavy and intimidating for small business owners.',
        solution:
          'Udyog Sarthi acts as an always-on compliance co-pilot. It asks a few questions, identifies the relevant regulations and walks owners through each step with verified, source-cited guidance in plain language.',
        goals:
          'Make regulatory compliance feel like a conversation, not a research project — reduce filing errors, save hours of manual lookup and build trust through verifiable citations.',
        engineering:
          'A Node/Express backend orchestrates LLM calls grounded on a curated, vetted knowledge base of Indian MSME regulations. A React + TypeScript frontend renders adaptive step-by-step flows, document checklists and live progress tracking.',
        impact:
          'When live, the platform aims to give millions of MSME owners a trusted, free assistant that turns compliance from a blocker into a guided workflow.',
      },
      team: [
        { name: 'Debdatta Panda', role: 'Project Idea Planner & Full-Stack Developer' },
        { name: 'Rounak Singh', role: 'Main Developer & Full-Stack Developer' },
        { name: 'Soumyashri Mohapatra', role: 'Full-Stack Developer' },
        { name: 'Saket Kumar Seth', role: 'Full-Stack Developer' },
      ],
      achievements: [
        'Currently in active development',
        'Conversational, source-cited compliance guidance',
        'Designed for India\'s 60M+ MSME audience',
        'Adaptive multi-step regulatory workflows',
      ],
    },
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [theta, setTheta] = useState(0);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragTheta, setDragTheta] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const totalCards = memoryCards.length;
  const anglePerCard = 360 / totalCards;
  const radius = typeof window !== 'undefined' && window.innerWidth <= 768 ? 260 : 420;

  const currentIndex = Math.round(Math.abs(theta / anglePerCard)) % totalCards;

  const nextCard = useCallback(() => {
    setTheta(prev => prev - anglePerCard);
    setFlippedId(null);
  }, [anglePerCard]);

  const prevCard = useCallback(() => {
    setTheta(prev => prev + anglePerCard);
    setFlippedId(null);
  }, [anglePerCard]);

  const handleCardClick = (id: number, index: number) => {
    if (index === currentIndex) {
      setFlippedId(prev => (prev === id ? null : id));
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragTheta(theta);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    const sensitivity = 0.3;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${dragTheta + diffX * sensitivity}deg)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diffX = e.clientX - startX;
    if (Math.abs(diffX) > 30) {
      if (diffX > 0) prevCard();
      else nextCard();
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') nextCard();
      else if (e.key === 'ArrowRight') prevCard();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextCard, prevCard]);

  return (
    <>
      <section id="projects" ref={ref} className="py-32 relative">
        <div className="container mx-auto px-6 overflow-visible">
          <style>{`#projects .carousel-3d-container { padding: 60px 0; }`}</style>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="neon-button !px-5 !py-1.5 text-xs flex items-center gap-2 w-fit mb-3">
              <span className="text-primary">&#9679;</span> WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Projects<span className="neon-text">.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg font-heading">
              A 3D carousel of my projects. Click a card to flip it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div
              className="carousel-3d-container"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={() => setIsDragging(false)}
            >
              <div
                ref={carouselRef}
                className="carousel-3d"
                style={{ transform: `rotateY(${theta}deg)` }}
              >
                {memoryCards.map((card, index) => {
                  const cardAngle = anglePerCard * index;
                  const isFlipped = flippedId === card.id;

                  return (
                    <div
                      key={card.id}
                      className={`memory-card-3d electric-card ${isFlipped ? 'flipped' : ''}`}
                      style={{
                        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                      }}
                      onClick={() => handleCardClick(card.id, index)}
                    >
                      <div className="card-inner-3d">
                        {/* Front */}
                        <div className="card-face-front">
                          <div className="p-4 h-full flex flex-col">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span
                                className="text-[10px] font-display tracking-widest text-primary uppercase truncate"
                                style={{ textShadow: '0 0 8px hsl(var(--primary) / 0.6)' }}
                              >
                                {card.frontLabel}
                              </span>
                              {card.title === 'Udyog Sarthi' && (
                                <span
                                  className="shrink-0 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-amber-400/60 text-amber-300 bg-amber-400/10 animate-pulse"
                                  style={{ boxShadow: '0 0 10px hsl(45 100% 60% / 0.5)' }}
                                >
                                  ● Ongoing
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-display font-bold text-foreground leading-tight">
                              {card.title}
                            </h3>
                            <p className="text-[11px] text-muted-foreground mb-2 font-heading line-clamp-1">
                              {card.tagline}
                            </p>
                            <div className="rounded-lg bg-background/40 overflow-hidden relative h-[140px]">
                              {card.image ? (
                                <img
                                  src={card.image}
                                  alt={card.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-xl font-display font-bold text-primary/30 px-2 text-center">
                                    {card.title}
                                  </span>
                                </div>
                              )}
                              <div className="glitch-overlay" />
                            </div>
                            {/* Tech stack pills */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {card.projectDetail.techStack.slice(0, 4).map((t) => (
                                <span
                                  key={t}
                                  className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border border-primary/30 bg-primary/10 text-primary/90"
                                >
                                  {t}
                                </span>
                              ))}
                              {card.projectDetail.techStack.length > 4 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-muted-foreground border border-border/50">
                                  +{card.projectDetail.techStack.length - 4}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground/80 mt-auto pt-2 line-clamp-2 font-heading italic">{card.preview}</p>
                          </div>
                          <div className="card-glow-3d" />
                        </div>
                        {/* Back */}
                        <div className="card-face-back">
                          <div className="p-5 h-full flex flex-col">
                            <h3 className="text-lg font-display font-bold text-foreground mb-2">
                              {card.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-1 font-heading">
                              {card.backDescription}
                            </p>
                            <div className="flex gap-2 mt-4">
                              {card.liveUrl && (
                                <a
                                  href={card.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-display hover:bg-primary/20 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={12} /> Live Preview
                                </a>
                              )}
                              <button
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/50 bg-primary/5 text-primary text-xs font-display hover:bg-primary/15 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(card.projectDetail);
                                }}
                              >
                                <Search size={12} /> Explore
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-20">
              <button onClick={prevCard} className="neon-button !p-3 !rounded-full">
                <ChevronLeft size={18} />
              </button>
              <span className="font-mono text-sm text-muted-foreground">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
              </span>
              <button onClick={nextCard} className="neon-button !p-3 !rounded-full">
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 font-mono opacity-60">
              Drag to rotate · Click to flip · Arrow keys to navigate
            </p>

            {/* View all on GitHub */}
            <motion.a
              href="https://github.com/MyselfDebdatta"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-display tracking-wider hover:bg-primary/20 transition-colors"
              style={{ boxShadow: '0 0 24px hsl(var(--primary) / 0.25)' }}
            >
              <Github size={16} /> View all projects on GitHub
              <ExternalLink size={12} className="opacity-70" />
            </motion.a>
          </motion.div>

          {/* Ready to Build CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-24 mx-auto max-w-4xl rounded-2xl border border-primary/30 p-10 md:p-14 text-center overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0.6)), radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.18), transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--neon-purple) / 0.18), transparent 50%)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.15), inset 0 0 30px hsl(var(--primary) / 0.05)',
            }}
          >
            <motion.div
              aria-hidden
              className="absolute -inset-1 rounded-2xl pointer-events-none opacity-40"
              style={{
                background:
                  'conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 25%, hsl(var(--neon-purple)) 50%, transparent 75%, hsl(var(--primary)) 100%)',
                filter: 'blur(20px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] font-mono uppercase tracking-widest text-primary">
                <Sparkles size={10} /> Let's collaborate
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold animated-gradient-text mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-muted-foreground font-heading max-w-xl mx-auto mb-8">
                Let's turn your idea into a fast, modern, and scalable product — with clean engineering and design that actually stands out.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+918637377080"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-display tracking-wider hover:bg-primary/20 hover:border-primary transition-all"
                  style={{ boxShadow: '0 0 18px hsl(var(--primary) / 0.25)' }}
                >
                  <Phone size={16} /> Call Me Now
                </a>
                <a
                  href="https://wa.me/918637377080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-display tracking-wider hover:bg-primary/20 hover:border-primary transition-all"
                  style={{ boxShadow: '0 0 18px hsl(var(--primary) / 0.25)' }}
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-display tracking-wider hover:bg-primary/20 hover:border-primary transition-all"
                  style={{ boxShadow: '0 0 18px hsl(var(--primary) / 0.25)' }}
                >
                  <CalendarDays size={16} /> Schedule a Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" /> */}
      </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsSection;
