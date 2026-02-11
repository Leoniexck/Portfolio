import { motion } from 'framer-motion';
import { useLayoutEffect } from 'react';

// --- UI COMPONENTS ---
import Navbar from '../components/Navbar';
import ImageGallery from '../components/ImageGallery';
import Reveal from '../components/Reveal';
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
import EditorialTextSection from '../components/EditorialTextSection';
import { caption } from 'framer-motion/client';

const ACCENT = "#C3641A"; 

export default function MapMyWords() {
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // DATA ...
  const projectDetails = [{ label: "Role", value: "UX/UI Designer, Frontend Developer" }, { label: "Tools", value: "Figma, React, Google API" }, { label: "Duration", value: "3 1/2 months" }, { label: "Team", value: "Kaisa Larsen, Ehbal Ablimit" }];
  const creditsData = [{ title: "Concept & Design", people: [{ name: "Leonie Kehlenbeck", role: "UX/UI Lead" }] }, { title: "Engineering", people: [{ name: "Kaisa Larsen", role: "Frontend" }, { name: "Ehbal Ablimit", role: "Frontend" }, { name: "Leonie Kehlenbeck", role: "Frontend" }] }];
  const participantScreens = [{ src: '/images/MapMyWords/Participant_01.png', caption: 'Empty Participant List' }, { src: '/images/MapMyWords/Participant_02.png', caption: 'Entries in Participant List' }, { src: '/images/MapMyWords/Participant_03.png', caption: 'Full Participant List' }];
  const QuestionScreens = [{ src: '/images/MapMyWords/Questions.png', caption: 'Question Selection Options' }, { src: '/images/MapMyWords/RandomQuestions.png', caption: 'Use "Randomize Question"' }, { src: '/images/MapMyWords/AddQuestion.png', caption: 'Use "Add Your Own Question"' }];
  const SessionScreens = [{ src: '/images/MapMyWords/MainScreen.png', caption: 'Start Session' }, { src: '/images/MapMyWords/ChooseSpeaker.png', caption: 'Use “Pick Random Participant”' }, { src: '/images/MapMyWords/Speaking.png', caption: 'Recording of Participant' }, { src: '/images/MapMyWords/WrongMapping.png', caption: 'Success and Fail Recording' }, { src: '/images/MapMyWords/SuccessMapping.png', caption: 'All participants successful' } ];

  return (
    <div className="w-full bg-[#0E0E0E] text-[#F4F4F5] overflow-x-hidden relative selection:bg-[#C3641A] selection:text-white">
      <Navbar activeSection="projects" />
      <PageBackground accentColor={ACCENT} />
      <ScrollToTopButton accentColor={ACCENT} />

      <main className="relative z-10 w-full">
        {/* HERO AREA */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
           <ProjectHero title1="MapMy" title2="Words." year="2025" subtitle={<>An interactive journey through culture and history. <br/><span className="text-white">Never stop learning, because life never stops teaching.</span></>} />
           <ProjectImage src="/images/hiphop/hiphop-cover.png" accentColor={ACCENT} />
           <ProjectOverview accentColor={ACCENT} description="MapMyWords is a playful icebreaker designed for hybrid groups of 5–20 participants at the start of a semester, team project, or workshop. It transforms ordinary introductions into a shared, multimodal experience where participants’ spoken answers are instantly mapped to visual and auditory cues, making names, moods, and hobbies easier to remember." details={projectDetails} />
        </div>

        <EditorialTextSection 
        number="01"
        title="Final Implementation."
        accentColor={ACCENT}
        text="MapMyWords is an interactive icebreaker tool built with React, TypeScript, and Tailwind CSS, designed to help teams connect in a novel and visual way. The application guides a facilitator through setting up a participant list and selecting from predefined, random, or custom questions."
        />

        <EditorialTextSection number="02" title="Participant List" accentColor={ACCENT} text="The facilitator types a name into the input field and presses Enter to add them to the session. A live counter displays the current number of participants out of the maximum."/>
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
            <Reveal once={true}><ImageGallery items={participantScreens} /></Reveal>
         </div>

        <EditorialTextSection number="03" title="Question Selection" accentColor={ACCENT} text="Once the participants are set, the facilitator moves to the 'Select a Question' screen. This interface offers three flexible options: the user can click 'Randomize Question' to receive a 'Suggested Question' highlighted in a confirmation box, manually choose directly from the predefined list, or type their own custom question into the input field at the bottom and click 'Add & Select'." />
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
            <Reveal once={true}><ImageGallery items={QuestionScreens} /></Reveal>
         </div>

        <EditorialTextSection number="04" title="Session" accentColor={ACCENT} text="In the main recording session, the chosen question is displayed centrally. The facilitator can either click on a participant's icon directly or use the 'Pick Random Participant' button to randomly select a speaker.

When a participant is selected, their circle pulses blue to indicate they are actively recording, and all other participants are temporarily disabled. After speaking, the system maps their answer to a representative emoji. A successful mapping is indicated by a green circle and a checkmark, while a failed mapping is shown with a red circle, allowing the user to try again.

The 'View Results' button remains disabled until all participants have successfully answered the question (all circles are green). During the session, the facilitator can also 'Change Question', 'Reset Answers', or 'Cancel Session' using the navigation controls." />
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
            <Reveal once={true}><ImageGallery items={SessionScreens} /></Reveal>
         </div>

        
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
            <SectionSpacer accentColor={ACCENT} />
            <SectionHeader number="05" title="View Results" text="The results screen displays a grid summarizing the session, showing each participant's name, their mapped emoji, and the full text of their answer under the original question. From here, the facilitator can either click 'Ask Another Question' to run a new round with the same group or 'Start New Session' to reset the application." accentColor={ACCENT} />
            <Reveal once={true}>
                <div className="relative mx-auto w-full max-w-250 border-[#1A1A1A] border rounded-[20px] overflow-hidden shadow-2xl bg-[#050505]">
                    <motion.img whileHover={{ scale: 1.01 }} transition={{ duration: 0.7 }} src="/images/MapMyWords/Summary.png" alt="Result screen" className="w-full h-auto object-cover block opacity-90 hover:opacity-100 transition-opacity" />
                </div>
            </Reveal>
        </div>

        {/* --- Footer Area --- */}
        <div className="max-w-360 mx-auto px-5 md:px-12.5">
           <SectionSpacer accentColor={ACCENT} />
           <ProjectCredits items={creditsData} accentColor={ACCENT} />
           <ProjectOutcome accentColor={ACCENT} text="By combining gamification with clear analytics, HipHopInsight creates a learning environment where culture meets technology." />
           <ProjectFooter copyright="© 2026 Leonie Kehlenbeck" />
        </div>

      </main>
    </div>
  );
}