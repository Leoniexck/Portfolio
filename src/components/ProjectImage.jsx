import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';

export default function ProjectImage({ src, accentColor = "#6254B6" }) {
  const containerRef = useRef(null);
  
  // Track scroll progress to drive parallax and scale effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax: Subtle vertical slide relative to the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  // Scale: Gives the asset a "growing" effect as it comes into view
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    /* -mt-[10vh] pulls the image into the section above for a seamless transition */
    <div ref={containerRef} className="w-full relative z-10 -mt-[10vh] mb-37.5">
       
       <Reveal delay={0.2} once={false} yOffset={50} margin="-10% 0px -10% 0px">
         
         {/* Container: Sized relative to viewport height */}
         <div className="relative w-full h-[50vh] md:h-[75vh] flex justify-center items-center">
            
            {/* AMBIENT GLOW: A blurred pulsing orb that adds color depth behind the image */}
            <div 
                className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-40 animate-pulse-slow"
                style={{ backgroundColor: accentColor }}
            />

            {/* GLASS BACKGROUND: Subtle structure with a highlighted top edge (border-t) */}
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-[30px] border-t border-white/10 backdrop-blur-[2px]" />

            {/* THE ASSET: Floating motion container for the specific project image */}
            <motion.div 
                style={{ y, scale }} 
                className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-16"
            >
              <img 
                src={src} 
                alt="Project Hero" 
                // drop-shadow is applied to the image pixels specifically, not the container box
                className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

         </div>
       </Reveal>
    </div>
  );
}