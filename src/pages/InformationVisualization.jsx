import { useLayoutEffect, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

// --- UI COMPONENTS ---
import Navbar from '../components/Navbar';
import SectionSpacer from '../components/SectionSpacer';
import SectionHeader from '../components/SectionHeader'; 
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackground from '../components/PageBackground';
import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import ProjectCredits from '../components/ProjectCredits';
import ProjectOutcome from '../components/ProjectOutcome';
import ProjectFooter from '../components/ProjectFooter';
import ProjectImage from '../components/ProjectImage';

// --- CONSTANTS ---
const ACCENT = "#224697"; 

// --- ANIMATION TOOLS ---

const TextReveal = ({ children, delay = 0 }) => (
  <div className="overflow-hidden relative">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay }}
    >
      {children}
    </motion.div>
  </div>
);

const BigFadeUp = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut", delay: delay }}
    >
      {children}
    </motion.div>
);

const ParallaxSection = ({ children, speed = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]); 
  
  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

// --- DATA ---
const projectDetails = [
  { label: "Role", value: "Illustrator" }, 
  { label: "Tools", value: "Adobe Illustrator" },  
  { label: "Course", value: "Gestaltung II, TH Ingolstadt" }, 
];

const creditsData = [
  { title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "Design" }] }, 
];

export default function InformationVisualization() {
  const containerRef = useRef(null);
  
  // --- FIXED PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll(); 
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- FIXED MOUSE SPOTLIGHT LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    function updateMouse(e) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [mouseX, mouseY]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
        ref={containerRef}
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#224697] selection:text-white"
    >
      
      {/* 1. TOP PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#224697] z-[9999]"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* 2. GLOBAL MOUSE SPOTLIGHT */}
      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 159, 227, 0.08), 
              transparent 80%
            )
          `
        }}
      />

      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full pt-20">
        
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 relative">
            
            <div className="mb-12">
                <TextReveal>
                    <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 opacity-10 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                        DATA
                    </h1>
                </TextReveal>
                
                <div className="relative z-10">
                    <ProjectHero 
                        title1="Info" 
                        title2="Viz." 
                        year="2026" 
                        subtitle={<>Visualizing the financial impact of the pandemic. <br/><span className="text-white">Turning complex datasets into a clear narrative.</span></>} 
                    />
                </div>
            </div>
            
            <BigFadeUp delay={0.2}>
                <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.01] transition-transform duration-700 ease-out">
                    <ProjectImage src="/images/InformationViz/Cover.png" accentColor={ACCENT} />
                </div>
            </BigFadeUp>

            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview 
                        accentColor={ACCENT} 
                        description="This data visualization explores the financial impact of the COVID-19 pandemic on professional sports, with a primary focus on professional soccer. Using key figures such as revenue losses, ticket sales declines, and sponsorship reductions, the poster translates large datasets into a clear, visually engaging narrative." 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= POSTER SECTION ================= */}
        
        {/* 1. Header */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-12">
             <TextReveal>
                 <SectionHeader 
                    number="01" 
                    title="The Visualization." 
                    text="Full scale poster design (DIN A1)." 
                    accentColor={ACCENT} 
                 />
             </TextReveal>
        </div>

        {/* 2. The Poster (PURE IMAGE) */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 relative mb-24">
            <ParallaxSection speed={0.5}>
                <BigFadeUp>
                    <div className="relative w-full group">
                        <img 
                            src="/images/InformationViz/Datenvisualisierung.png" 
                            alt="Full Data Visualization Poster" 
                            className="w-full h-auto transition-all duration-1000 ease-out group-hover:scale-[1.01] group-hover:brightness-110"
                        />
                    </div>
                </BigFadeUp>
            </ParallaxSection>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= FOOTER & CREDITS ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 pb-24">
           <SectionSpacer accentColor={ACCENT} />
           
           <BigFadeUp>
               <ProjectCredits items={creditsData} accentColor={ACCENT} number="02" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
               <ProjectOutcome 
                    accentColor={ACCENT} 
                    text="By transforming complex financial data into an accessible visual narrative, this project highlights the unseen economic shifts within the sports industry during a global crisis." 
               />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}