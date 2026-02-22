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
import ImmersiveScroll from '../components/ImmersiveScroll';
import ConceptMarquee from '../components/ConceptMarquee';
import EditorialSplitSection from '../components/EditorialSplitSection';
import FeatureShowcase from '../components/FeatureShowcase';
import ProjectBrowserHero from '../components/ProjectBrowserHero';

// --- CONSTANTS & DATA ---
const ACCENT = "#C3641A"; 

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
  { label: "Role", value: "UX/UI Designer, Frontend Developer" }, 
  { label: "Tools", value: "Figma, React, Google API" }, 
  { label: "Duration", value: "3 1/2 months" }, 
  { label: "Team", value: "Kaisa Larsen, Ehbal Ablimit" }, 
  { label: "Course", value: "Multimodal Interaction, Aarhus University" },
  { label: "Collab", value: "with Lego" }
];

const creditsData = [
  { title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Lead" }] }, 
  { title: "Engineering", people: [{ name: "Leonie Kehlenbeck", role: "Frontend" }, { name: "Kaisa Larsen", role: "Frontend" }, { name: "Ehbal Ablimit", role: "Frontend" }] }, 
  { title: "Motion & Video", people: [{ name: "Leonie Kehlenbeck", role: "Editor" }] }
];

const flowSteps = [
  {
    title: "Start Session",
    text: (<>The facilitator types a name into the input field and presses Enter to add them to the session. A live counter displays the current number of participants out of the maximum (e.g., 0/10). Once the limit is reached, a warning appears. The "Select Question" button activates only after at least one participant joins.</>),
    src: ['/images/MapMyWords/Participant_01.png', '/images/MapMyWords/Participant_02.png', '/images/MapMyWords/Participant_03.png'],
    caption: "Participant List Views"
  },
  {
    title: "Question Selection",
    text: (<>Once participants are set, the facilitator selects a question. Options include: "Randomize Question" for a suggestion, choosing from a predefined list, or typing a custom question. This ensures flexibility for every workshop context.</>),
    src: ['/images/MapMyWords/Questions.png', '/images/MapMyWords/RandomQuestions.png', '/images/MapMyWords/AddQuestion.png'],
    caption: ["Questions Overview", "Random Selection", "Add Own Question"]
  },
  {
    title: "Session",
    text: (<>In the recording session, the question is central. The facilitator selects a speaker (manually or randomly). The active speaker's circle pulses blue. Upon finishing, the system maps the answer to an emoji (Green = Success, Red = Fail). Results can only be viewed once everyone has answered.</>),
    src: ['/images/MapMyWords/MainScreen.png', '/images/MapMyWords/ChooseSpeaker.png', '/images/MapMyWords/Speaking.png', '/images/MapMyWords/WrongMapping.png', '/images/MapMyWords/SuccessMapping.png'],
    caption: ["Session Overview", "Speaker Selection", "Active Recording", "Error State", "Success State"]
  },
  {
    title: "View Results",
    text: (<>The results screen displays a summarizing grid with each participant's name, their mapped emoji, and the transcribed text. Options to "Ask Another Question" (keep group) or "Start New Session" (reset app) are available here.</>),
    src: '/images/MapMyWords/Summary.png', 
    caption: "Results Overview"
  }
];

const designProcess = [
  { src: '/images/MapMyWords/First/_00.png', label: "Start Screen" },
  { src: '/images/MapMyWords/First/_01.png', label: "Empty List" },
  { src: '/images/MapMyWords/First/_02.png', label: "Enter Part. 1" },
  { src: '/images/MapMyWords/First/_04.png', label: "Filled List" },
  { src: '/images/MapMyWords/First/_05.png', label: "Start Session" },
  { src: '/images/MapMyWords/First/_06.png', label: "Choose Speaker" },
  { src: '/images/MapMyWords/First/_12.png', label: "Recording" },
  { src: '/images/MapMyWords/First/_15.png', label: "Generating" },
  { src: '/images/MapMyWords/First/_final.png', label: "End Screen" },
];

const futureScreens = [
  { 
    src: '/images/MapMyWords/More/_01.png', 
    caption: "Saved Participant Lists", 
    text: "Quickly load recurring teams or classes without re-entering names." 
  }, 
  { 
    src: '/images/MapMyWords/More/_02.png', 
    caption: "Save As Option",
    text: "Export the current session setup as a template for future use." 
  },
  { 
    src: '/images/MapMyWords/More/_05.png', 
    caption: "End Session Modal",
    text: "A comprehensive dialog to confirm closure and offer export options." 
  },
  { 
    src: '/images/MapMyWords/More/_06.png', 
    caption: "Edit List",
    text: "Modify participants on the fly even after a list has been loaded." 
  },
  { 
    src: '/images/MapMyWords/More/_07.png', 
    caption: "Load Presets",
    text: "Browse and select from a library of previously saved group configurations." 
  },
];


export default function MapMyWords() {
  const containerRef = useRef(null);
  
  // --- PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  }); 
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- MOUSE SPOTLIGHT LOGIC ---
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
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#C3641A] selection:text-white"
    >
      
      {/* 1. TOP PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#C3641A] z-9999"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* 2. GLOBAL MOUSE SPOTLIGHT (Subtiler gemacht) */}
      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(195, 100, 26, 0.08), 
              transparent 80%
            )
          `
        }}
      />
      {/* ÄNDERUNGEN AM SPOTLIGHT:
         1. Radius: 600px -> 650px (Weicherer Verlauf)
         2. Opacity: 0.15 -> 0.08 (Nur noch 8% Deckkraft, sehr subtil)
      */}

      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full pt-20">
        
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5 relative">
            
            <div className="mb-12">
                <TextReveal>
                    <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 opacity-10 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                        CONNECT
                    </h1>
                </TextReveal>
                
                <div className="relative z-10">
                    <ProjectHero 
                        title1="MapMy" 
                        title2="Words." 
                        year="2025" 
                        subtitle={<>Gamifying the first five minutes of your meeting. <br/><span className="text-white">Because breaking the ice shouldn't be awkward.</span></>} 
                    />
                </div>
            </div>
            
            <BigFadeUp delay={0.2}>
                <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.01] transition-transform duration-700 ease-out">
                    <ProjectBrowserHero 
                        src="/images/MapMyWords/MainScreen.png" 
                        accentColor={ACCENT} 
                    />
                </div>
            </BigFadeUp>

            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview 
                        accentColor={ACCENT} 
                        description="Designed for hybrid workshops and semester kick-offs, MapMyWords combats the awkwardness of remote introductions. This interactive tool for 5–20 participants turns a routine formality into a gamified collaborative event. By translating voice into a visual grid, it creates a lasting 'digital artifact' of the group, ensuring that every participant is not just heard, but truly seen and remembered." 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= VIDEO SHOWCASE ================= */}
        <div className="max-w-360 mx-auto relative px-5 md:px-12.5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#C3641A] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />
            
            <BigFadeUp>
                <section className="max-w-250 mx-auto py-10 text-center relative z-10">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#888] mb-8">See it in action</h3>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                        <div className="absolute inset-0 bg-accent/10 blur-3xl -z-10" style={{ backgroundColor: ACCENT }} />
                        
                        <video 
                            src="/videos/MapMyWords.mp4" 
                            controls 
                            className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                </section>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= FINAL IMPLEMENTATION (Step 01) ================= */}
        <div className="max-w-360 mx-auto">
            <TextReveal>
                <EditorialSplitSection 
                    number="01"
                    title="Final Implementation."
                    accentColor={ACCENT}
                    text={(
                        <>
                            MapMyWords is built with React, TypeScript, and Tailwind CSS. The application guides a facilitator through setting up a participant list and selecting from predefined, random, or custom questions. In the main session, spoken answers are recorded and instantly mapped to representative emojis.
                        </>
                    )}
                />
            </TextReveal>
        </div>

        <SectionSpacer accentColor={ACCENT} />
        
        {/* 4. IMMERSIVE FLOW - Wrapped in Parallax Section */}
        <div className="relative">
            <ParallaxSection speed={0.5}>
                <ImmersiveScroll steps={flowSteps} accentColor={ACCENT} />
            </ParallaxSection>
        </div>
    
        <SectionSpacer accentColor={ACCENT} />

        {/* ================= CONCEPT & DESIGN (Step 02) ================= */}
        <BigFadeUp>
            <ConceptMarquee 
                stepNumber="02"
                title="First Concept & Design."
                text="These original Figma designs establish the foundational user flow and visual direction. The screens demonstrate the core concept, beginning with a clean interface for adding participants and leading to the main interactive session view."
                items={designProcess}
                accentColor={ACCENT}
            />    
        </BigFadeUp>

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= NOT IMPLEMENTED (Step 03) ================= */}
        <div className="max-w-360 mx-auto">
            <TextReveal>
                <EditorialSplitSection 
                    number="03"
                    title="Not Implemented Functions."
                    accentColor={ACCENT}
                    text={(
                        <>
                            These designs focus on facilitator efficiency features that didn't make the MVP. This includes "Saved participant lists" to quickly load recurring groups and advanced export options via a "Save as" or "End session" modal.
                        </>
                    )}
                />
            </TextReveal>
        </div>
        
        <BigFadeUp delay={0.2}>
            <FeatureShowcase items={futureScreens} accentColor={ACCENT} />
        </BigFadeUp>

        {/* ================= FOOTER & CREDITS ================= */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5 pb-24">
           <SectionSpacer accentColor={ACCENT} />
           
           <BigFadeUp>
               <ProjectCredits items={creditsData} accentColor={ACCENT} number="04" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
               <ProjectOutcome 
                    accentColor={ACCENT} 
                    text="By translating spoken language into a shared visual grid, MapMyWords transforms the friction of hybrid introductions into a playful, multimodal experience where participants feel instantly connected." 
               />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}