import { useLayoutEffect, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

// --- UI COMPONENTS ---
// Importing shared layout and specialized project components
import Navbar from '../components/Navbar';
import SectionSpacer from '../components/SectionSpacer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackground from '../components/PageBackground';
import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import ProjectCredits from '../components/ProjectCredits';
import ProjectOutcome from '../components/ProjectOutcome';
import ProjectFooter from '../components/ProjectFooter';
import ProjectImage from '../components/ProjectImage';
import KeyFeaturesSection from '../components/KeyFeaturesSection';
import EditorialSplitSection from '../components/EditorialSplitSection';
import FeatureSplit from '../components/FeatureSplit';
import VideoFeatureSplit from '../components/VideoFeatureSplit';
import DualTextSection from '../components/DualTextSection';

// --- CONSTANTS ---
// Project-specific accent color (Green)
const ACCENT = "#50844F"; 

// --- ANIMATION TOOLS ---
// Sliding text reveal effect used for headlines
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

// Scale and fade-up animation for section blocks
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
// Configuration for project metadata, credits, and features
const projectDetails = [
  { label: "Role", value: "Organisation, Implementation of mode and gesture control" }, 
  { label: "Tools", value: "MyCobot 280, ROS, Mediapipe, Python, OpenCV" },  
  { label: "Duration", value: "1 sprint week" }, 
  { label: "Team", value: "Peter Trenkle, Nina Binder, Timothy Summers" }, 
  { label: "Course", value: "Human Computer Interaction, LMU" }, 
];

const creditsData = [
  { 
    title: "Interaction & Robotics", 
    people: [
        { name: "Leonie Kehlenbeck", role: "Organization, Mode Control & Gesture Control Implementation" },
        { name: "Nina Binder", role: "Follow Mode Development" },
        { name: "Timothy Summers", role: "Posture Mode & Movement Integration" }
    ] 
  },
  { 
    title: "Hardware & Electronics", 
    people: [
      { name: "Peter Trenkle", role: "Lampshade Construction & LED Logic" }
    ] 
  }
];

const bloomieFeatures = [
    { icon: "✋", text: "Move robotic arm based on hand movement directions" },
    { icon: "🌈", text: "Toggle and change light modes using ROS topics" },
    { icon: "💡", text: "Set the robotic arm to predefined positions" }
];

const reflectionData = [
    {
        number: "05",
        title: "Challenges & Learnings.",
        text: "Key challenges included running ROS on an ARM MacBook, achieving precise gesture-based robotic motion, and controlling LEDs without direct GPIO access..."
    },
    {
        number: "06",
        title: "Future Work.",
        text: "Potential improvements include voice control, an on-arm camera for dynamic tracking..."
    }
];


export default function Bloomie() {
  const containerRef = useRef(null);
  
  // Tracking scroll progress for the top progress bar
  const { scrollYProgress } = useScroll(); 
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Tracking mouse coordinates for the interactive radial gradient spotlight
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

  // Reset scroll position to top when entering the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
        ref={containerRef}
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#50844F] selection:text-white"
    >
      
      {/* 1. TOP PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 z-[9999]"
        style={{ scaleX, transformOrigin: "0%", backgroundColor: ACCENT }}
      />

      {/* 2. GLOBAL MOUSE SPOTLIGHT: Moves with user's cursor */}
      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(80, 132, 79, 0.08),
              transparent 80%
            )
          `
        }}
      />

      {/* Layout components */}
      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full pt-20">
        
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 relative">
            
            <div className="mb-12">
                <TextReveal>
                    {/* Oversized background text for depth */}
                    <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 opacity-10 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                        BLOOM
                    </h1>
                </TextReveal>
                
                <div className="relative z-10">
                    <ProjectHero 
                        title1="Bloo" 
                        title2="mie." 
                        year="2026" 
                        subtitle={<>A smart robotic lamp. <br/><span className="text-white">Bringing light, personality, and interaction to your desk.</span></>} 
                    />
                </div>
            </div>
            
            <BigFadeUp delay={0.2}>
                <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.01] transition-transform duration-700 ease-out">
                    <ProjectImage src="/images/Bloomie/Bloomie_Cover.png" accentColor={ACCENT} />
                </div>
            </BigFadeUp>

            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview 
                        accentColor={ACCENT} 
                        description={
                            <div className="flex flex-col gap-8">
                                <p>Bloomie is an interactive smart lamp...</p>
                                
                                {/* Action buttons linking to GitHub and Documentation */}
                                <div className="flex flex-wrap gap-4 mt-2">
                                    <a href="https://github.com/dein-repo" target="_blank" rel="noopener noreferrer" className="...">
                                        <span className="text-sm font-medium">Source Code</span>
                                    </a>
                                    <a href="/documents/Report.pdf" target="_blank" rel="noopener noreferrer" className="...">
                                        <span className="text-sm font-medium">Project Report</span>
                                    </a>
                                </div>
                            </div>
                        } 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= VIDEO SHOWCASE: Dynamic lighting effect behind video ================= */}
        <div className="max-w-[1440px] mx-auto relative px-5 md:px-12.5 mb-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: ACCENT }} />
            
            <BigFadeUp>
                <section className="max-w-[1000px] mx-auto py-10 text-center relative z-10">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#888] mb-8">See it in action</h3>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                        <video src="/videos/Bloomie.MOV" controls className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </section>
            </BigFadeUp>
        </div>

        {/* ================= CONTENT SECTIONS: Features, Logic, and Results ================= */}
        <KeyFeaturesSection features={bloomieFeatures} accentColor={ACCENT} number="01" />

        <SectionSpacer accentColor={ACCENT} />

        <div className="max-w-[1440px] mx-auto">
             <TextReveal>
                <EditorialSplitSection 
                    number="02"
                    title="Overall implementation."
                    accentColor={ACCENT}
                    text={(<>Bloomie integrates a MyCobot 280 robotic arm...</>)}
                />
            </TextReveal>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* Technical Implementation details using split screen layouts */}
        <FeatureSplit 
            number= "03"
            title="ModeDetector Implementation."
            description="..."
            image="/images/Bloomie/bloomie_robot.png" 
            accentColor={ACCENT}
            githubLink="..."
        />

        <SectionSpacer accentColor={ACCENT} />

        <VideoFeatureSplit 
            number="04"
            title="GestureDetector Implementation."
            description="..."
            videoSrc="/videos/Bloomie_test.MP4" 
            accentColor={ACCENT}
            githubLink="..."
            status="Early Prototype"
        />

        <SectionSpacer accentColor={ACCENT} />

        <DualTextSection items={reflectionData} accentColor={ACCENT} />

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= FOOTER & CREDITS ================= */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 pb-24">
           <BigFadeUp>
               <ProjectCredits items={creditsData} accentColor={ACCENT} number="07" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
               <ProjectOutcome accentColor={ACCENT} text="..." />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>
      </main>
    </div>
  );
}