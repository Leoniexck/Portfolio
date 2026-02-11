// src/components/ProjectHero.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import MaskedText from './MaskedText'; // Hast du schon erstellt

export default function ProjectHero({ title1, title2, year, subtitle }) {
  const { scrollYProgress } = useScroll();
  const opacityFade = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="min-h-screen flex flex-col justify-center pt-[100px] mb-[50px] relative">
      <div className="flex flex-col items-start mb-12 z-20 mix-blend-difference">
         <MaskedText text={title1} delay={0.1} />
         <div className="flex items-center gap-4 md:gap-8">
           <MaskedText text={title2} delay={0.2} />
           <motion.div 
             initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
             className="hidden md:block h-[1px] w-[80px] bg-white/30 mt-4" 
           />
           <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
              className="hidden md:block text-sm font-mono opacity-50 mt-4"
           >
             ({year})
           </motion.span>
         </div>
      </div>

      <Reveal delay={0.4} once={true}>
        <p className="text-[#B0B0B0] text-[20px] md:text-[24px] max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </Reveal>

      <motion.div style={{ opacity: opacityFade }} className="absolute bottom-10 left-[20px] md:left-[50px] flex items-center gap-4">
         <div className="w-[1px] h-[40px] bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
         <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Scroll</span>
      </motion.div>
    </div>
  );
}