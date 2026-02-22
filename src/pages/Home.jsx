import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// COMPONENTS
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import PageBackground from '../components/PageBackground';
import Spotlight from '../components/Spotlight';
import IconSystemCardVisual from '../components/IconSystemCardVisual';

const CategoryHeader = ({ title, number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-6 mb-16 md:mb-24"
  >
    <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm tracking-widest text-[#666]">{number}</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      className="h-px bg-white/10 grow" 
    />
  </motion.div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState('');

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
    return () => window.removeEventListener('scroll', handleScroll);
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
      <PageBackground accentColor="#333333" />
      <Spotlight />

      {/* --- HERO HEADER --- */}
      <header className="h-screen w-full flex flex-col justify-center items-center relative px-4 text-center z-10">
        <div className="flex flex-col items-center">
          <motion.span custom={0} variants={textVariant} initial="hidden" animate="visible" className="font-mono text-xs md:text-sm text-[#666] uppercase tracking-[0.3em] mb-6 block">
            Portfolio 2026
          </motion.span>
          
          <h1 className="text-[40px] md:text-[90px] font-bold leading-none mb-8 tracking-tight">
            <motion.div custom={1} variants={textVariant} initial="hidden" animate="visible">
              i am leonie <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block origin-bottom-right">😌</motion.span>
            </motion.div>
            <motion.div custom={2} variants={textVariant} initial="hidden" animate="visible" className="text-[#888]">
              i create meaningful
            </motion.div>
            <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">
              digital experiences.
            </motion.div>
          </h1>

          <motion.div custom={4} variants={textVariant} initial="hidden" animate="visible" className="flex flex-row items-center justify-center gap-3 text-[#666] text-[16px] md:text-[20px] mt-2">
            <span className="font-mono text-xs md:text-sm tracking-wide">previously at</span>
            <a href="https://www.rohde-schwarz.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity duration-300 relative group">
              <img src="/images/logo-rs.svg" alt="Rohde & Schwarz" className="h-4 md:h-5 w-auto" style={{ filter: 'invert(1) brightness(2)' }} />
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-12 flex flex-col items-center gap-3 cursor-pointer group">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#555] group-hover:text-white transition-colors font-mono">Selected Works</span>
          <div className="w-px h-10 bg-[#222] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[50%] bg-white animate-scrolldown" />
          </div>
        </motion.div>
      </header>

      {/* --- PROJECTS MAIN --- */}
      <main id="projects" className="w-full max-w-360 mx-auto px-5 md:px-12.5 pb-50 pt-25 relative z-10">
        
        <div className="flex flex-col gap-40">
          
          {/* ================= CATEGORY 1: DIGITAL PRODUCTS & UX ================= */}
          <section>
            <CategoryHeader number="01" title="Digital Products & UX" />
            
            <div className="flex flex-col gap-32 md:gap-40">
              <Reveal>
                <ProjectCard 
                    title="LMU App" 
                    description="Bachelor thesis exploring gamified learning environments. The project conceptualizes a web application that motivates students through game design principles, focusing on user retention and intrinsic motivation." 
                    image="/images/Edu/Edu_Mockup.png" 
                    tags={['Research', 'Concept', 'Design', 'Testing', 'Thesis']} 
                    link="/project/lmuapp" 
                    year="2025"
                    accentColor="#FFFFFF"
                />
              </Reveal>
              
              <Reveal>
                <ProjectCard 
                    title="MapMyWords" 
                    description="A digital workshop tool that visualizes spoken language in real-time. Designed for remote teams, it transforms verbal introductions into a collaborative visual grid to break the ice and create a lasting digital artifact." 
                    image="/images/MapMyWords/MapMyWords_Mockup.png" 
                    tags={['React', 'Audio Viz', 'Concept', 'Design', 'UI', 'Testing', 'Multimodal', 'Tooling']} 
                    link="/project/MapMyWords" 
                    year="2025/26" 
                    accentColor="#C3641A"
                />
              </Reveal>

              <Reveal>
                <ProjectCard 
                    title="HipHopInsight" 
                    description="An interactive learning platform designed to teach Hip-Hop culture through gamified elements. Features diverse question types, immediate feedback loops, and a progress tracking system to keep learners engaged." 
                    image="/images/hiphop/Hiphop_Mockup.png" 
                    tags={['Education', 'Gamification', 'Concept', 'Design']} 
                    link="/project/HipHopInsight" 
                    year="2024" 
                    accentColor="#6254B6"
                />
              </Reveal>

              <Reveal>
                <ProjectCard 
                    title="EduVenture" 
                    description="Bachelor thesis exploring gamified learning environments. The project conceptualizes a web application that motivates students through game design principles, focusing on user retention and intrinsic motivation." 
                    image="/images/Edu/Edu_Mockup.png" 
                    tags={['Research', 'Concept', 'Design', 'Testing', 'Thesis']} 
                    link="/project/eduventure" 
                    year="2023"
                    accentColor="#FFFFFF"
                />
              </Reveal>
            </div>
          </section>

           {/* ================= CATEGORY 2: VISUAL SYSTEMS & DATA ================= */}
          <section>
            <CategoryHeader number="03" title="Visual Systems & Data" />
            
            <div className="flex flex-col gap-32 md:gap-40">
              <Reveal>
                <ProjectCard 
                    title="Icon System" 
                    description="A comprehensive, pixel-perfect icon set designed for scalability and clarity. Includes three distinct styles—Filled, Outline, and Bold—optimized for various interface contexts and construction grids." 
                    customVisual={<IconSystemCardVisual accentColor="#397694" />}
                    tags={['System Design', 'Icons', 'Vector', 'UI']} 
                    link="/project/Icons" 
                    year="2026" 
                    accentColor="#397694"
                />
              </Reveal>

              <Reveal>
                <ProjectCard 
                    title="Financial Impact" 
                    description="A data visualization analyzing the financial impact of the COVID-19 pandemic on professional sports. Transforms complex datasets regarding revenue losses and sponsorship changes into a clear, narrative-driven poster format." 
                    image="/images/InformationViz/Poster_Mockup2.png" 
                    tags={['Research', 'Data Viz', 'Illustration', 'Poster']} 
                    link="/project/InformationVisualization" 
                    year="2020" 
                    accentColor="#009FE3"
                />
              </Reveal>
            </div>
          </section>

          {/* ================= CATEGORY 3: CREATIVE TECH & HCI ================= */}
          <section>
            <CategoryHeader number="02" title="Creative Tech & HCI" />
            
            <div className="flex flex-col gap-32 md:gap-40">
              <Reveal>
                <ProjectCard 
                    title="Bloomie" 
                    description="An interactive smart robotic lamp that uses computer vision to provide adaptive, gesture-controlled lighting. Built with a MyCobot 280, it transforms a desk accessory into a dynamic companion through real-time hand tracking and ROS-based logic." 
                    image="/images/Bloomie/Bloomie_Cover.png" 
                    tags={['Robotics', 'ROS', 'Computer Vision', 'HCI']} 
                    link="/project/Bloomie" 
                    year="2024/25"
                    accentColor="#50844F"
                />
              </Reveal>

              <Reveal>
                <ProjectCard 
                    title="VRtist" 
                    description="A virtual reality experience reimagining classical art. Users step inside a 3D gallery and paint masterpieces like the Mona Lisa using a sophisticated paint-by-numbers logic, bridging the gap between observation and creation." 
                    image="/images/VR/Cover_VR.png" 
                    tags={['Virtual Reality', 'CAVE', 'Unreal Engine', 'Interaction']} 
                    link="/project/VRtist" 
                    year="2024" 
                    accentColor="#224697"
                />
              </Reveal>
            </div>
          </section>

        </div>
      </main>

      <footer className="py-10 text-center border-t border-white/5 relative z-10">
        <p className="text-[#444] text-xs font-mono uppercase tracking-widest">© 2026 Leonie Kehlenbeck</p>
      </footer>
    </div>
  );
}