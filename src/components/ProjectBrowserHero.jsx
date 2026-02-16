import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import BrowserMockup from './BrowserMockup';

// Main Hero asset showing a parallaxing browser frame on top of a soft glow
export default function ProjectBrowserHero({ src, accentColor = "#6254B6" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax offsets for subtle motion depth
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <div ref={containerRef} className="w-full relative z-10 -mt-[10vh] mb-37.5">
       <Reveal delay={0.2} once={false} yOffset={50} margin="-10% 0px -10% 0px">
         <div className="relative w-full min-h-[50vh] md:h-[85vh] flex justify-center items-center">
            
            {/* Visual background atmospheric layers */}
            <div className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-40 animate-pulse-slow" style={{ backgroundColor: accentColor }} />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[30px] border-t border-white/10 backdrop-blur-[2px]" />

            <motion.div style={{ y, scale }} className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-16">
              <div className="w-full max-w-6xl">
                 <BrowserMockup src={src} />
              </div>
            </motion.div>
         </div>
       </Reveal>
    </div>
  );
}