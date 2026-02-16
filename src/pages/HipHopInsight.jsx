import { useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';

// --- UI COMPONENTS ---
import Navbar from '../components/Navbar';
import ImageGallery from '../components/ImageGallery';
import SectionHeader from '../components/SectionHeader';
import SectionSpacer from '../components/SectionSpacer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import SpotlightGrid from '../components/SpotlightGrid';
import MasonryGrid from '../components/MasonryGrid';
import FeatureShowcase from '../components/FeatureShowcase';
import FeedbackSwitcher from '../components/FeedbackSwitcher';
import PageBackground from '../components/PageBackground';
import ProjectHero from '../components/ProjectHero';
import ProjectImage from '../components/ProjectImage';
import ProjectOverview from '../components/ProjectOverview';
import ProjectCredits from '../components/ProjectCredits';
import ProjectOutcome from '../components/ProjectOutcome';
import ProjectFooter from '../components/ProjectFooter';

const ACCENT = "#6254B6"; 

// --- ANIMATION TOOLS ---

// 1. TEXT REVEAL (Mask animation for headers)
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

// 2. PARALLAX SECTION (Slower scroll speed for depth)
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

// 3. BIG FADE UP (Scale + Fade entry)
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

export default function HipHopInsight() {
  const containerRef = useRef(null);
  
  // Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // DATA
  const projectDetails = [{ label: "Role", value: "UX/UI Designer" }, { label: "Tools", value: "Figma" }, { label: "Duration", value: "4 months" }, { label: "Team", value: "Nicolas Käufl, Zahra Saremi, Nurislom Abdurasulov" }];
  const creditsData = [{ title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Lead" }] }, { title: "Engineering", people: [{ name: "Nicolas Käufl", role: "Frontend" }, { name: "Zahra Saremi", role: "Frontend" }, { name: "Nurislom Abdurasulov", role: "Backend" }] }];
  const galleryItems = [{ src: '/images/hiphop/Item_ClozeText.png', caption: 'Cloze Text' }, { src: '/images/hiphop/Item_DragDrop.png', caption: 'Drag & Drop' }, { src: '/images/hiphop/Item_LetterScramble.png', caption: 'Letter Scramble' }, { src: '/images/hiphop/Item_MultipleChoice.png', caption: 'Multiple Choice V01' }, { src: '/images/hiphop/Item_MultipleChoiceVideo.png', caption: 'Multiple Choice V02' }, { src: '/images/hiphop/Item_MultipleResponse.png', caption: 'Multiple Response' }, { src: '/images/hiphop/Item_Sequencing.png', caption: 'Sequencing' }, { src: '/images/hiphop/Item_ShortText.png', caption: 'Short Text' }, { src: '/images/hiphop/Item_TrueFalse.png', caption: 'True False' }];
  const feedbackItems = [{ src: '/images/hiphop/Item_Almost.png', caption: 'Almost' }, { src: '/images/hiphop/Item_Success.png', caption: 'Success' }, { src: '/images/hiphop/Item_Failed.png', caption: 'Failed' }];
  const generalScreens = [{ src: '/images/hiphop/Dashboard.png', caption: 'General Overview', text: "Overview over your study progress & learning analytics" }, { src: '/images/hiphop/Dashboard_Study.png', caption: 'Study Overview', text: "Overview over all categories & your study progress" }, { src: '/images/hiphop/Dashboard_Analytics.png', caption: 'Learning analytics Overview', text: "Overview over your learning analytics" }];
  const signScreens = [{ src: '/images/hiphop/SignUp.png', caption: 'Sign up' }, { src: '/images/hiphop/SignIn.png', caption: 'Sign in' }, { src: '/images/hiphop/Awareness.png', caption: 'Awareness' }];
  const processScreens = [{ src: '/images/hiphop/Process_01.png' }, { src: '/images/hiphop/Process_02.png' }, { src: '/images/hiphop/Process_03.png' }, { src: '/images/hiphop/Process_04.png' }, { src: '/images/hiphop/Process_05.png' }, { src: '/images/hiphop/Process_06.png' }];

  return (
    <div 
        ref={containerRef}
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#6254B6] selection:text-white group"
        // Global Spotlight Logic
        onMouseMove={(e) => {
            const spotlight = document.getElementById('global-spotlight');
            if(spotlight) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlight.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(98, 84, 182, 0.12), transparent 80%)`;
            }
        }}
    >
      {/* 1. TOP PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#6254B6] origin-left z-50 mix-blend-screen"
        style={{ scaleX }}
      />

      {/* 2. GLOBAL MOUSE SPOTLIGHT LAYER */}
      <div 
        id="global-spotlight"
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(98, 84, 182, 0.15), transparent 80%)' }}
      />

      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full pt-20">
        
        {/* HERO AREA */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 relative">
            
            {/* Background Typography */}
            <TextReveal>
                <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 opacity-10 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                    CULTURE
                </h1>
            </TextReveal>

            <div className="relative z-10">
                <ProjectHero title1="HipHop" title2="Insight." year="2024" subtitle={<>An interactive journey through culture and history. <br/><span className="text-white">Never stop learning, because life never stops teaching.</span></>} />
            </div>

            <BigFadeUp delay={0.2}>
               <div className="mt-8 mb-24 md:mb-32 relative z-20 hover:scale-[1.01] transition-transform duration-700 ease-out">
                   <ProjectImage src="/images/hiphop/hiphop-cover.png" accentColor={ACCENT} />
               </div>
            </BigFadeUp>

            <BigFadeUp delay={0.4}>
                <div className="mb-24">
                    <ProjectOverview accentColor={ACCENT} description="HipHopInsight is an interactive learning project designed to teach Hip-Hop culture and history through active engagement. Built to encourage exploration and continuous learning, the platform delivers a dynamic educational experience where users expand their knowledge while having fun." details={projectDetails} />
                </div>
            </BigFadeUp>
        </div>

        {/* --- 01: Item Types (Spotlight Grid) --- */}
        <SectionSpacer accentColor={ACCENT} />
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
           <TextReveal>
             <SectionHeader number="01" title="Item Types" text="A rich variety of question formats." accentColor={ACCENT} />
           </TextReveal>
        </div>
        
        <BigFadeUp>
            <SpotlightGrid items={galleryItems} />
        </BigFadeUp>


        {/* --- 02: Feedback (Switcher) --- */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
          <SectionSpacer accentColor={ACCENT} />
          <TextReveal>
            <SectionHeader 
                number="02" 
                title="Feedback" 
                text="Insights to guide your next move." 
                alignRight={false} 
                accentColor={ACCENT} 
            />
          </TextReveal>
          
          <BigFadeUp delay={0.2}>
            <FeedbackSwitcher accentColor={ACCENT} />
          </BigFadeUp>
        </div>


        {/* --- 03: Result Screen --- */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
           <SectionSpacer accentColor={ACCENT} />
           <TextReveal>
             <SectionHeader number="03" title="Result Screen" text="Concise wrap-up of your session." accentColor={ACCENT} />
           </TextReveal>

           <ParallaxSection speed={1.2}>
             <div className="relative mx-auto w-full max-w-[1000px] border-[#1A1A1A] border rounded-[20px] overflow-hidden shadow-2xl bg-[#050505] mt-12">
                <motion.img 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.7 }} 
                    src="/images/hiphop/EndScreen.png" 
                    alt="Result screen" 
                    className="w-full h-auto object-cover block opacity-90 hover:opacity-100 transition-all duration-500" 
                />
             </div>
           </ParallaxSection>
        </div>


        {/* 04: General Screens (Feature Showcase) */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
            <SectionSpacer accentColor={ACCENT} />
            <TextReveal>
                <SectionHeader number="04" title="General Screens" text="Analytics and progress tracking." alignRight={false} accentColor={ACCENT} />
            </TextReveal>
        </div>
        
        <BigFadeUp>
            <FeatureShowcase items={generalScreens} accentColor={ACCENT} />
        </BigFadeUp>


        {/* --- 05: Onboarding --- */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5">
           <SectionSpacer accentColor={ACCENT} />
           <TextReveal>
              <SectionHeader number="05" title="Onboarding" text="Start, return, and stay engaged." accentColor={ACCENT} />
           </TextReveal>
           <BigFadeUp delay={0.2}>
              <ImageGallery items={signScreens} />
           </BigFadeUp>
        </div>

      {/* --- 06: The Process (Masonry Grid) --- */}
       <SectionSpacer accentColor={ACCENT} />
       <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-8">
           <TextReveal>
             <SectionHeader number="06" title="The Process" text="From early sketches to final UI." alignRight={false} accentColor={ACCENT} />
           </TextReveal>
       </div>
       
       <BigFadeUp>
         <MasonryGrid items={processScreens} />
       </BigFadeUp>


        {/* --- Footer Area --- */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 pb-24">
           <SectionSpacer accentColor={ACCENT} />
           
           <BigFadeUp>
              <ProjectCredits items={creditsData} accentColor={ACCENT} number="07" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
             <ProjectOutcome accentColor={ACCENT} text="By combining gamification with clear analytics, HipHopInsight creates a learning environment where culture meets technology." />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}