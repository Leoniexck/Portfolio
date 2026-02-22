import { useLayoutEffect, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

// --- UI COMPONENTS ---
import Navbar from '../components/Navbar';
import SectionSpacer from '../components/SectionSpacer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackground from '../components/PageBackground';
import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import ProjectCredits from '../components/ProjectCredits';
import ProjectOutcome from '../components/ProjectOutcome';
import ProjectFooter from '../components/ProjectFooter';
import EditorialSplitSection from '../components/EditorialSplitSection';
import ImageComparison from '../components/ImageComparison';
import IconSizeShowcase from '../components/IconSizeShowcase';
import IconSystemHero from '../components/IconSystemHero';

// --- CONSTANTS ---
const ACCENT = "#397694"; 

// --- ANIMATION TOOLS ---

// 1. TEXT REVEAL
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

// 2. PARALLAX SECTION
const ParallaxSection = ({ children, speed = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
      target: ref, 
      offset: ["start end", "end start"] 
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]); 
  
  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

// 3. BIG FADE UP
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

// --- DATA ---
const projectDetails = [
  { label: "Role", value: "UX/UI Designer" }, 
  { label: "Tools", value: "Illustrator, Figma" }
];

const creditsData = [
  { title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Lead" }] }, 
];

export default function Icons() {
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
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#397694] selection:text-white"
    >
      
      {/* 1. TOP PROGRESS BAR (Fixed Z-Index 9999) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#397694] origin-left z-9999 mix-blend-screen"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* 2. GLOBAL MOUSE SPOTLIGHT (Fixed Position + Subtle 8%) */}
      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{ 
            background: useMotionTemplate`
                radial-gradient(
                    650px circle at ${mouseX}px ${mouseY}px,
                    rgba(57, 118, 148, 0.08),
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
        <div className="max-w-360 mx-auto px-5 md:px-12.5 relative">
            
            {/* Large background typography (SYSTEM) */}
            <div className="mb-12">
                <TextReveal>
                    <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 opacity-20 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                        SYSTEM
                    </h1>
                </TextReveal>
                
                <div className="relative z-10">
                    <ProjectHero 
                        title1="Icon" 
                        title2="System." 
                        year="2026" 
                        subtitle={<>Mastering clarity and precision at every scale. <br/><span className="text-white">Great design lives in the smallest details.</span></>} 
                    />
                </div>
            </div>
            
            {/* The 3D Dock Component */}
            <BigFadeUp delay={0.2}>
                <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.02] transition-transform duration-700 ease-out">
                    <IconSystemHero accentColor={ACCENT} />
                </div>
            </BigFadeUp>

            {/* Project Stats/Description */}
            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview 
                        accentColor={ACCENT} 
                        description="Good icon design is about instant communication. These sets were developed to be intuitive, clean, and highly legible at all standard interface sizes. Each icon is pixel-perfect, guaranteeing a crisp, professional look and a seamless user experience." 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= STYLE 1: FILLED ================= */}
        <div className="relative py-10">
            <div className="absolute top-[20%] right-0 w-100 h-100 bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-360 mx-auto">
                <TextReveal>
                     <EditorialSplitSection 
                        number="01"
                        title="Filled Style."
                        accentColor={ACCENT}
                        text={(<>A set of solid, high-contrast icons for primary navigation and location.</>)}
                    />
                </TextReveal>
            </div>

            {/* Parallax Image Comparison */}
            <ParallaxSection speed={1.5}>
                <div className="mt-12 mb-12">
                    <ImageComparison 
                        accentColor={ACCENT}
                        items={[
                            { src: "/images/Icons/Pixel_011.png", alt: "Construction", label: "Construction Grid", labelColor: "#C3641A" },
                            { src: "/images/Icons/Clean_011.png", alt: "Optical Output", label: "Optical Output", labelColor: "#4ADE80" }
                        ]}
                    />
                </div>
            </ParallaxSection>

            {/* Grid of Icons */}
            <BigFadeUp>
                <IconSizeShowcase 
                    groups={[
                        {
                            label: "Primary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Filled_02.png" },
                                { size: 24, src: "/images/Icons/24x24_Filled_02.png" },
                                { size: 32, src: "/images/Icons/32x32_Filled_02.png" },
                                { size: 48, src: "/images/Icons/48x48_Filled_02.png" },
                            ]
                        },
                        {
                            label: "Secondary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Filled_01.png" },
                                { size: 24, src: "/images/Icons/24x24_Filled_01.png" },
                                { size: 32, src: "/images/Icons/32x32_Filled_01.png" },
                                { size: 48, src: "/images/Icons/32x32_Filled_01.png" },
                            ]
                        }
                    ]}
                />
            </BigFadeUp>
        </div>
    
        <SectionSpacer accentColor={ACCENT} />

        {/* ================= STYLE 2: OUTLINE ================= */}
        <div className="relative py-10">
            
            <div className="max-w-360 mx-auto">
                <TextReveal>
                    <EditorialSplitSection 
                        number="02"
                        title="Outline Style."
                        accentColor={ACCENT}
                        text={(<>A clean, modern outline style used for informational or secondary icons.</>)}
                    />
                </TextReveal>
            </div>

            <ParallaxSection speed={1.5}>
                <div className="mt-12 mb-12">
                    <ImageComparison 
                        accentColor={ACCENT}
                        items={[
                            { src: "/images/Icons/Outline_Pixel.png", alt: "Construction", label: "Construction Grid", labelColor: "#C3641A" },
                            { src: "/images/Icons/Outline_Clean.png", alt: "Output", label: "Optical Output", labelColor: "#4ADE80" }
                        ]}
                    />
                </div>
            </ParallaxSection>

            <BigFadeUp>
                <IconSizeShowcase 
                    groups={[
                        {
                            label: "Primary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Outline_01.png" },
                                { size: 24, src: "/images/Icons/24x24_Outline_01.png" },
                                { size: 32, src: "/images/Icons/32x32_Outline_01.png" },
                                { size: 48, src: "/images/Icons/48x48_Outline_01.png" },
                            ]
                        },
                        {
                            label: "Secondary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Outline_02.png" },
                                { size: 24, src: "/images/Icons/24x24_Outline_02.png" },
                                { size: 32, src: "/images/Icons/32x32_Outline_02.png" },
                                { size: 48, src: "/images/Icons/48x48_Outline_02.png" },
                            ]
                        }
                    ]}
                />
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= STYLE 3: BOLD ================= */}
        <div className="relative py-10">
            <div className="max-w-360 mx-auto">
                <TextReveal>
                    <EditorialSplitSection 
                        number="03"
                        title="Bold Style."
                        accentColor={ACCENT}
                        text={(<>Robust, solid icons designed for key user actions. Built for maximum clarity.</>)}
                    />
                </TextReveal>
            </div>

            <ParallaxSection speed={1.5}>
                <div className="mt-12 mb-12">
                    <ImageComparison 
                        accentColor={ACCENT}
                        items={[
                            { src: "/images/Icons/Bold_Pixel.png", alt: "Construction", label: "Construction Grid", labelColor: "#C3641A" },
                            { src: "/images/Icons/Bold_Clean.png", alt: "Output", label: "Optical Output", labelColor: "#4ADE80" }
                        ]}
                    />
                </div>
            </ParallaxSection>

            <BigFadeUp>
                <IconSizeShowcase 
                    groups={[
                        {
                            label: "Primary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Bold_01.png" },
                                { size: 24, src: "/images/Icons/24x24_Bold_01.png" },
                                { size: 32, src: "/images/Icons/32x32_Bold_01.png" },
                                { size: 48, src: "/images/Icons/48x48_Bold_01.png" },
                            ]
                        },
                        {
                            label: "Secondary Variant",
                            items: [
                                { size: 16, src: "/images/Icons/16x16_Bold_02.png" },
                                { size: 24, src: "/images/Icons/24x24_Bold_02.png" },
                                { size: 32, src: "/images/Icons/32x32_Bold_02.png" },
                                { size: 48, src: "/images/Icons/48x48_Bold_02.png" },
                            ]
                        }
                    ]}
                />
            </BigFadeUp>
        </div>

        {/* FOOTER */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5 pb-24">
           <SectionSpacer accentColor={ACCENT} />
           
           <BigFadeUp>
             <ProjectCredits items={creditsData} accentColor={ACCENT} number="04" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
             <ProjectOutcome 
                  accentColor={ACCENT} 
                  text="From robust bold shapes to refined outlines, this system bridges the gap between aesthetic character and functional clarity. It showcases a mastery of grid-based design, ensuring that every icon is not just a vector, but a pixel-perfect interface element optimized for instant recognition at any scale." 
              />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}