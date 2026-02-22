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
import ProjectImage from '../components/ProjectImage';
import DesignConceptGrid from '../components/DesignConceptGrid'; 
import EditorialSplitSection from '../components/EditorialSplitSection';
import AnnotatedImageSection from '../components/AnnotatedImageSection';
import GradeCalculatorSection from '../components/GradeCalculatorSection';

// --- CONSTANTS ---
const ACCENT = "#32BB58"; 

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

// --- DATA ---
const projectDetails = [
  { label: "Role", value: "UX/UI Designer for the section courses and grades" }, 
  { label: "My Tools", value: "Balsamiq (low-fidelity prototypes and concepts), Figma (high-fidelity prototypes and UI design)" },  
  { label: "Duration", value: "3 Months" }, 
  { label: "Course", value: "LMU Developers, LMU" }, 
];

const creditsData = [
  { title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Design" }] }, 
];

const conceptData = {
    block1: {
        title: "What is New?",
        text: "New BottomNav: 'Study' with 'Study Plan' and 'Courses'. Combines course overview, grade management & study progress.",
        image: "/images/LMU/New.png"
    },
    block2: {
        title: "Why 01",
        text: "No central overview of current study status, courses, planned & completed courses & grades, including hypothetical scenarios.",
    },
    block3: {
        title: "Why 02",
        text: "Students wish for these features, according to the number of likes.",
        image: "/images/LMU/Why02.png"
    },
    block4: {
        title: "Benefit",
        text: "Creates a centralized, intuitive hub for all study-related tracking, eliminating the cognitive load of navigating multiple legacy platforms."
    }
};

const annotatedData = [
    {
        // 12% von oben - passt zum "Gesamt-ECTS" Bereich
        topOffset: "12%", 
        text: "The top section summarizes key metrics like total ECTS (e.g., 60/120) and the student's current grade average (e.g., 1,3)."
    },
    {
        // 35% von oben - passt genau auf die Höhe des "Füge einen Kurs hinzu" Buttons
        topOffset: "23%", 
        text: "A prominent 'Füge einen Kurs hinzu' (Add a course) button allows students to easily add new courses."
    },
    {
        // 55% von oben - passt zur Kurs-Liste
        topOffset: "35%", 
        text: "Once added, courses are clearly organized by semester (e.g., 'Winter 24/25') and categorized as mandatory ('Pflicht') or elective ('Wahlpflicht'), with each entry displaying its current status (e.g., 'Bestanden', 'Im Gange') and grade."
    }
];

export default function LmuApp() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll(); 
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
        className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#32BB58] selection:text-white"
    >
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 z-9999"
        style={{ scaleX, transformOrigin: "0%", backgroundColor: ACCENT }}
      />

      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(50, 187, 88, 0.08), 
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
            <div className="mb-12">
                <TextReveal>
                    <h1 className="text-[120px] md:text-[180px] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 opacity-10 select-none pointer-events-none absolute -top-20 -left-10 z-0">
                        LMU
                    </h1>
                </TextReveal>
                <div className="relative z-10">
                    <ProjectHero 
                        title1="LMU" 
                        title2="Students." 
                        year="2025" 
                        subtitle={<>From students, for students. <br/><span className="text-white">A unified app experience for grading, planning, and campus life.</span></>} 
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
                        description="The LMU Students app redesign focuses on unifying the scattered digital landscape of university life. By creating a centralized hub for course management, grades, and study progress, the app empowers students to seamlessly track their academic journey without switching between multiple legacy platforms." 
                        details={projectDetails} 
                    />
                </div>
            </BigFadeUp>
        </div>

        <SectionSpacer accentColor={ACCENT} />

        <DesignConceptGrid 
            number="01" 
            title="Concept & Rationale." 
            accentColor={ACCENT} 
            data={conceptData} 
        />

        <SectionSpacer accentColor={ACCENT} />

        <div className="max-w-360 mx-auto">
            <TextReveal>
                <EditorialSplitSection 
                    number="01"
                    title="Study Plan."
                    accentColor={ACCENT}
                    text={(
                        <>
                            The 'Study Plan' (Studienplan) tab provides a clear, at-a-glance dashboard for students in their study programm. 
                        </>
                    )}
                />
            </TextReveal>
        </div> 

{       /* ================= ANNOTATED IMAGE SECTION ================= */}
        <AnnotatedImageSection 
            number="02"
            title="Study Plan Overview."
            accentColor={ACCENT}
            imageSrc="/images/LMU/StudyPlan.png" // <--- Hier den Pfad anpassen!
            annotations={annotatedData}
        />

        <SectionSpacer accentColor={ACCENT} />

        {/* ================= GRADE CALCULATOR SECTION ================= */}
        <GradeCalculatorSection 
            number="03"
            title="Grade Calculator"
            accentColor={ACCENT}
            description='The "Notenrechner" (Grade Calculator) allows students to see their current grade average ("Dein Schnitt") based on registered courses ("Eingetragene Noten"), which are neatly organized by semester. Its key feature is the ability to add "Hypothetische Note" (hypothetical grades), enabling students to instantly see how future course results would impact their overall average before they are finalized.'
            snippetImage="/images/LMU/snippet.png"
            mockupsImage="/images/LMU/grade-phones.png"
        />

        <SectionSpacer accentColor={ACCENT} />     

        {/* ================= FOOTER & CREDITS ================= */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5 pb-24">
           
           <BigFadeUp>
               <ProjectCredits items={creditsData} accentColor={ACCENT} number="02" />
           </BigFadeUp>
           
           <BigFadeUp delay={0.2}>
               <ProjectOutcome 
                    accentColor={ACCENT} 
                    text="By consolidating crucial academic information into a single interface, the redesign significantly improves the digital student experience." 
               />
           </BigFadeUp>
           
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}