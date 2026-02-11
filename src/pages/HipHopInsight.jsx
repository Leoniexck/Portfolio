import { motion } from 'framer-motion';

// --- UI COMPONENTS ---
import Navbar from '../components/Navbar';
import ImageGallery from '../components/ImageGallery';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SectionSpacer from '../components/SectionSpacer';
import ScrollToTopButton from '../components/ScrollToTopButton'; // <--- 1. IMPORTIEREN

// --- PROJECT SPECIFIC COMPONENTS ---
import PageBackground from '../components/PageBackground';
import ProjectHero from '../components/ProjectHero';
import ProjectImage from '../components/ProjectImage';
import ProjectOverview from '../components/ProjectOverview';
import ProjectCredits from '../components/ProjectCredits';
import ProjectOutcome from '../components/ProjectOutcome';
import ProjectFooter from '../components/ProjectFooter';

const ACCENT = "#6254B6"; 

export default function HipHopInsight() {
  
  // --- DATEN ---
  const projectDetails = [{ label: "Role", value: "UX/UI Designer" }, { label: "Tools", value: "Figma" }, { label: "Duration", value: "4 months" }, { label: "Team", value: "Nicolas Käufl, Zahra Saremi, Nurislom Abdurasulov" }];
  const creditsData = [{ title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Lead" }] }, { title: "Engineering", people: [{ name: "Nicolas Käufl", role: "FrontEnd" }, { name: "Zahra Saremi", role: "FrontEnd" }, { name: "Nurislom Abdurasulov", role: "BackEnd" }] }];
  const galleryItems = [{ src: '/images/hiphop/Item_ClozeText.png', caption: 'Cloze Text' }, { src: '/images/hiphop/Item_DragDrop.png', caption: 'Drag & Drop' }, { src: '/images/hiphop/Item_LetterScramble.png', caption: 'Letter Scramble' }, { src: '/images/hiphop/Item_MultipleChoice.png', caption: 'Multiple Choice V01' }, { src: '/images/hiphop/Item_MultipleChoiceVideo.png', caption: 'Multiple Choice V02' }, { src: '/images/hiphop/Item_MultipleResponse.png', caption: 'Multiple Response' }, { src: '/images/hiphop/Item_Sequencing.png', caption: 'Sequencing' }, { src: '/images/hiphop/Item_ShortText.png', caption: 'Short Text' }, { src: '/images/hiphop/Item_TrueFalse.png', caption: 'True False' }];
  const feedbackItems = [{ src: '/images/hiphop/Item_Almost.png', caption: 'Almost' }, { src: '/images/hiphop/Item_Success.png', caption: 'Success' }, { src: '/images/hiphop/Item_Failed.png', caption: 'Failed' }];
  const generalScreens = [{ src: '/images/hiphop/Dashboard.png', caption: 'Overview over your study progress & learning analytics' }, { src: '/images/hiphop/Dashboard_Study.png', caption: 'Overview over all categories & your study progress' }, { src: '/images/hiphop/Dashboard_Analytics.png', caption: 'Overview over your learning analytics' }];
  const signScreens = [{ src: '/images/hiphop/SignUp.png', caption: 'Sign up' }, { src: '/images/hiphop/SignIn.png', caption: 'Sign in' }, { src: '/images/hiphop/Awareness.png', caption: 'Awareness' }];
  const processScreens = [{ src: '/images/hiphop/Process_01.png' }, { src: '/images/hiphop/Process_02.png' }, { src: '/images/hiphop/Process_03.png' }, { src: '/images/hiphop/Process_04.png' }, { src: '/images/hiphop/Process_05.png' }, { src: '/images/hiphop/Process_06.png' }];

  return (
    <div className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#6254B6] selection:text-white">
      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />

      {/* --- 2. HIER EINFÜGEN --- */}
      {/* Der Button wird automatisch positioniert (fixed bottom right) */}
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-[20px] md:px-[50px]">
        <ProjectHero title1="HipHop" title2="Insight." year="2024" subtitle={<>An interactive journey through culture and history. <br/><span className="text-white">Never stop learning.</span></>} />
        <ProjectImage src="/images/hiphop/hiphop-cover.png" accentColor={ACCENT} />
        <ProjectOverview accentColor={ACCENT} description="HipHopInsight is an interactive learning project designed to teach Hip-Hop culture and history through active engagement." details={projectDetails} />

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="01" title="Item Types" text="A rich variety of question formats." accentColor={ACCENT} />
        <Reveal once={true}><ImageGallery items={galleryItems} /></Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="02" title="Feedback" text="Insights to guide your next move." alignRight={false} accentColor={ACCENT} />
        <Reveal once={true}><ImageGallery items={feedbackItems} /></Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="03" title="Result Screen" text="Concise wrap-up of your session." accentColor={ACCENT} />
        <Reveal once={true}>
          <div className="relative mx-auto w-full max-w-[1000px] border-[#1A1A1A] border-[1px] rounded-[20px] overflow-hidden shadow-2xl bg-[#050505]">
             <motion.img whileHover={{ scale: 1.01 }} transition={{ duration: 0.7 }} src="/images/hiphop/EndScreen.png" alt="Result screen" className="w-full h-auto object-cover block opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="04" title="General Screens" text="Analytics and progress tracking." alignRight={false} accentColor={ACCENT} />
        <Reveal once={true}><ImageGallery items={generalScreens} /></Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="05" title="Onboarding" text="Start, return, and stay engaged." accentColor={ACCENT} />
        <Reveal once={true}><ImageGallery items={signScreens} /></Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <SectionHeader number="06" title="The Process" text="From research to final design." alignRight={false} accentColor={ACCENT} />
        <Reveal once={true}><ImageGallery items={processScreens} /></Reveal>

        <SectionSpacer accentColor={ACCENT} />
        <ProjectCredits items={creditsData} accentColor={ACCENT} />
        <ProjectOutcome accentColor={ACCENT} text="By combining gamification with clear analytics, HipHopInsight creates a learning environment where culture meets technology." />
        <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
      </main>
    </div>
  );
}