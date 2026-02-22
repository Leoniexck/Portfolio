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
import EditorialSplitSection from '../components/EditorialSplitSection'; 

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
  { label: "Role", value: "Environment Design, Timer Logic" }, 
  { label: "Tools", value: "Unreal Engine 5, VR Cave" },  
  { label: "Duration", value: "3 1/2 months" },  
  { label: "Team", value: "Nicolas Käufl, Zahra Saremi" },  
  { label: "Course", value: "Virtual Reality, LMU" }, 
];

const creditsData = [
  { 
    title: "Development", 
    people: [
      { name: "Leonie Kehlenbeck", role: "Museum Design & Timer Logic" },
      { name: "Nicolas Käufl", role: "Painting Logic (Mona Lisa)" }, 
      { name: "Zahra Saremi", role: "Color System Logic" }
    ] 
  },
];

const interactionSteps = [
  {
    customIcon: "🏆", 
    text: "Performance is measured by speed, encouraging quick, accurate coloring."
  },
  {
    customIcon: "1️⃣",
    text: "Enter the CAVE & start the game via a user interface, the timer goes off."
  },
  {
    customIcon: "2️⃣",
    text: "Select a color using a Flystick controller."
  },
  {
    customIcon: "3️⃣",
    text: "Shoot/paint chosen color onto numbered art segments."
  },
  {
    customIcon: "4️⃣",
    text: "Complete the artwork by filling all fields, the timer stops."
  }
];

export default function VRtist() {
  const containerRef = useRef(null);
  
  // --- FIXED PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  }); 
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
              rgba(34, 70, 151, 0.08), 
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
                        VIRTUAL
                    </h1>
                </TextReveal>
                
                <div className="relative z-10">
                    <ProjectHero 
                        title1="VR" 
                        title2="tist." 
                        year="2025" 
                        subtitle={<>Reimagining classical art in a virtual dimension. <br/><span className="text-white">Step inside the canvas.</span></>} 
                    />
                </div>
            </div>
            
            <BigFadeUp delay={0.2}>
                <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.01] transition-transform duration-700 ease-out">
                    <ProjectImage src="/images/VR/Cover_VR.png" accentColor={ACCENT} />
                </div>
            </BigFadeUp>

            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview 
                        accentColor={ACCENT} 
                        description="CAVE OF COLORS is an interactive virtual reality (VR) art experience. Inspired by classical masters such as Leonardo da Vinci, the project reimagines the history of art in a playful, immersive format. Users engage with famous artworks (e.g., the Mona Lisa) by painting them following a sophisticated paint-by-numbers logic in a 3D space." 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= VIDEO SHOWCASE ================= */}
        <div className="max-w-[1440px] mx-auto relative px-5 md:px-12.5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3641A] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />
            
            <BigFadeUp>
                <section className="max-w-[1000px] mx-auto py-10 text-center relative z-10">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#888] mb-8">See it in action</h3>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                        <div className="absolute inset-0 bg-accent/10 blur-3xl -z-10" style={{ backgroundColor: ACCENT }} />
                        
                        <video 
                            src="/videos/VRtist.mp4" 
                            controls 
                            className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                </section>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= TRANSFORMATION SECTION (The 3 Images) ================= */}
        
        {/* Header */}
        <div className="max-w-[1440px] mx-auto">
            <TextReveal>
                <EditorialSplitSection 
                    number="01"
                    title="Transformation."
                    accentColor={ACCENT}
                    text={(
                        <>
                            The original image was simplified into numbered color fields, preserving key details while making it suitable for a paint-by-numbers VR experience.
                        </>
                    )}
                />
            </TextReveal>
        </div>

        {/* The 3-Image Layout */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mt-12 mb-24">
            <ParallaxSection speed={0.5}>
                <BigFadeUp>
                    {/* GRID LAYOUT: 12 Spalten System */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* 1. Bild (Schmal - 25% Breite) */}
                        <div className="md:col-span-3">
                            <div className="relative h-96 md:h-[600px] w-full group flex items-end">
                                <img 
                                    src="/images/VR/Mona_01.png" 
                                    alt="Original Artwork" 
                                    className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
                                />
                                {/* Label unten links auf dem Bild */}
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-widest text-white border border-white/10 pointer-events-none">
                                    Original
                                </div>
                            </div>
                        </div>

                        {/* 2. Bild (Schmal - 25% Breite) */}
                        <div className="md:col-span-3">
                            <div className="relative h-96 md:h-[600px] w-full group flex items-end">
                                <img 
                                    src="/images/VR/Mona_02.png" 
                                    alt="Pixelated Processing" 
                                    className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
                                    style={{ imageRendering: 'pixelated' }} 
                                />
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-widest text-white border border-white/10 pointer-events-none">
                                    Processed
                                </div>
                            </div>
                        </div>

                        {/* 3. Bild (Breit - 50% Breite) */}
                        <div className="md:col-span-6">
                            <div className="relative h-96 md:h-[600px] w-full group flex items-end">
                                <img 
                                    src="/images/VR/Mona_03.png" 
                                    alt="Logic and Wireframe" 
                                    className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-widest text-[#224697] border border-white/10 pointer-events-none">
                                    Logic
                                </div>
                            </div>
                        </div>

                    </div>
                </BigFadeUp>
            </ParallaxSection>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= INTERACTION SECTION ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
            
            {/* Header */}
            <div className="mb-16 md:mb-24">
                 <TextReveal>
                     <SectionHeader 
                        number="02" 
                        title="Interaction." 
                        text="Step inside the gallery and experience classic art in a new, playful way." 
                        accentColor={ACCENT} 
                     />
                 </TextReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* LINKS: Das CAVE Bild */}
                <BigFadeUp>
                    <div className="relative group">
                        {/* Glow Effekt hinter dem Bild */}
                        <div 
                            className="absolute -inset-4 bg-[#224697] opacity-20 blur-[50px] rounded-full group-hover:opacity-30 transition-opacity duration-700" 
                        />
                        
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080808] shadow-2xl">
                            <img 
                                src="/images/VR/Show.png"
                                alt="User inside the VR CAVE" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </BigFadeUp>

                {/* RECHTS: Die Steps (Überarbeitet & Transparent) */}
                <div className="flex flex-col gap-5">
                    {interactionSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            // HIER: items-center statt items-start für vertikale Zentrierung
                            className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-[#111] hover:border-[#224697]/30 transition-all duration-300 cursor-default group"
                        >
                            {/* Icon Box: Transparent & Rahmenlos */}
                            <div className="shrink-0">
                                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    {step.customIcon}
                                </span>
                            </div>

                            {/* Text: Vertikal zentriert */}
                            <div className="flex-1">
                                <p className="text-[#CCC] text-lg leading-relaxed font-light group-hover:text-white transition-colors">
                                    {step.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>

        {/* ================= FOOTER & CREDITS ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 pb-24">
           <SectionSpacer accentColor={ACCENT} />
           
           <BigFadeUp>
               <ProjectCredits items={creditsData} accentColor={ACCENT} number="03" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
               <ProjectOutcome 
                    accentColor={ACCENT} 
                    text="This VR installation bridges the gap between passive observation and active creation, allowing users to physically step into the structure of a masterpiece and understand its composition through interaction." 
               />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}