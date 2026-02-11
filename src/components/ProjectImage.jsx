import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';

export default function ProjectImage({ src, accentColor = "#6254B6" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax: Bild bewegt sich leicht versetzt
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  // Scale: Bild kommt leicht auf einen zu
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <div ref={containerRef} className="w-full relative z-10 -mt-[10vh] mb-[150px]">
       
       <Reveal delay={0.2} once={false} yOffset={50} margin="-10% 0px -10% 0px">
         
         {/* CONTAINER */}
         <div className="relative w-full h-[50vh] md:h-[75vh] flex justify-center items-center">
            
            {/* 1. AMBIENT GLOW (Der "Wow"-Effekt) */}
            {/* Ein riesiger unscharfer Farbklecks in der Akzentfarbe hinter dem Bild */}
            <div 
                className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-40 animate-pulse-slow"
                style={{ backgroundColor: accentColor }}
            />

            {/* 2. GLASS BACKGROUND (Subtil) */}
            {/* Kaum sichtbar, gibt aber Struktur. Nur oben eine Lichtkante (border-t). */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[30px] border-t border-white/10 backdrop-blur-[2px]" />

            {/* 3. DAS BILD (Floating) */}
            <motion.div 
                style={{ y, scale }} 
                className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-16"
            >
              <img 
                src={src} 
                alt="Project Hero" 
                className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

         </div>
       </Reveal>
    </div>
  );
}