import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// COMPONENTS
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import PageBackground from '../components/PageBackground';
import Spotlight from '../components/Spotlight';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');

  // --- Scroll Logic für Navbar (Kein Lenis mehr hier!) ---
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.8) {
        setActiveSection('projects');
      } else {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // WICHTIG: Die fehlerhafte "raf" Zeile wurde hier entfernt!
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textVariant = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <div className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-white selection:text-black cursor-default">
      <Navbar activeSection={activeSection} />
      <PageBackground accentColor="#FFFFFF" />
      <Spotlight />

      <header className="h-[100vh] w-full flex flex-col justify-center items-center relative px-4 text-center z-10">
        <div className="flex flex-col items-center">
          <motion.span custom={0} variants={textVariant} initial="hidden" animate="visible" className="font-mono text-xs md:text-sm text-[#666] uppercase tracking-[0.3em] mb-6 block">Portfolio 2026</motion.span>
          <h1 className="text-[40px] md:text-[90px] font-bold leading-[1.0] mb-8 tracking-tight">
            <motion.div custom={1} variants={textVariant} initial="hidden" animate="visible">i am leonie <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block origin-bottom-right">😌</motion.span></motion.div>
            <motion.div custom={2} variants={textVariant} initial="hidden" animate="visible" className="text-[#888]">i create meaningful</motion.div>
            <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">digital experiences.</motion.div>
          </h1>
          <motion.div custom={4} variants={textVariant} initial="hidden" animate="visible" className="flex flex-row items-center justify-center gap-3 text-[#666] text-[16px] md:text-[20px] mt-2">
            <span className="font-mono text-xs md:text-sm tracking-wide">previously at</span>
            <a href="https://www.rohde-schwarz.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity duration-300 relative group">
              <img src="/images/logo-rs.svg" alt="Rohde & Schwarz" className="h-4 md:h-5 w-auto" style={{ filter: 'invert(1) brightness(2)' }} />
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-12 flex flex-col items-center gap-3 cursor-pointer group">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#555] group-hover:text-white transition-colors font-mono">Selected Works</span>
          <div className="w-[1px] h-[40px] bg-[#222] overflow-hidden relative"><div className="absolute top-0 left-0 w-full h-[50%] bg-white animate-scrolldown" /></div>
        </motion.div>
      </header>

      <main id="projects" className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[50px] pb-[200px] pt-[100px] relative z-10">
        <div className="flex flex-col gap-[100px] md:gap-[150px]">
          <Reveal><ProjectCard title="LMU Students" description="Research & Concept for a student app." image="missing" tags={['App Concept', 'Research', 'UI/UX']} link="/project/lmuapp" year="2023" /></Reveal>
          <Reveal><ProjectCard title="EduVenture" description="A gamified platform supporting exchange students and the International Office." image="/images/eduventure.png" tags={['Web App', 'Gamification', 'Bachelor Thesis']} link="/project/eduventure" year="2024" /></Reveal>
          <Reveal><ProjectCard title="HipHopInsight" description="Interactive learning journey through music history." image="/images/hiphop/hiphop-cover.png" tags={['Interactive Learning', 'Figma', 'Prototyping']} link="/project/HipHopInsight" year="2024" /></Reveal>
          <Reveal><ProjectCard title="MapMyWords" description="Visualizing language patterns in a geographical context." image="/images/mapmywords-cover.png" tags={['Data Viz', 'Frontend', 'Research']} link="/project/mapmywords" year="2023" /></Reveal>
        </div>
      </main>
      <footer className="py-10 text-center border-t border-white/5 relative z-10"><p className="text-[#444] text-xs font-mono uppercase tracking-widest">© 2026 Leonie Kehlenbeck</p></footer>
    </div>
  );
}