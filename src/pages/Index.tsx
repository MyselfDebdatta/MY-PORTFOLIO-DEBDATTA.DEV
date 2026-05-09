import { useState, useCallback, useEffect } from 'react';
import IntroScene from '@/components/IntroScene';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InterestsMarquee from '@/components/InterestsMarquee';
import AboutSection from '@/components/AboutSection';
import JourneySection from '@/components/JourneySection';
import TechStackSection from '@/components/TechStackSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsWall from '@/components/AchievementsWall';
import ConnectSection from '@/components/ConnectSection';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import CommandPalette from '@/components/CommandPalette';

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Listen for a global event from the navbar's "Replay Intro" button
  useEffect(() => {
    const replay = () => {
      setIntroComplete(false);
      setIntroKey((k) => k + 1);
    };
    window.addEventListener('replay-intro', replay);
    return () => window.removeEventListener('replay-intro', replay);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {!introComplete && <IntroScene key={introKey} onComplete={handleIntroComplete} />}

      {introComplete && (
        <>
          <AnimatedBackground />
          <div className="relative" style={{ zIndex: 10 }}>
            <Navbar />
            <HeroSection />
            <InterestsMarquee />
            <AboutSection />
            <JourneySection />
            <TechStackSection />
            <ProjectsSection />
            <AchievementsWall />
            <ConnectSection />
            <Footer />
            <CommandPalette />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
