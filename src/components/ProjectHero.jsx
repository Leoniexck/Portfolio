import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import HeroParticles from './HeroParticles';

export default function ProjectHero({ title1, title2, year, subtitle, accentColor }) {
  const { scrollYProgress } = useScroll();
  
  // Fades out the bottom scroll indicator as the user begins to move down
  const opacityFade = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    /* min-h-screen ensures the hero always fills the initial viewport */
    <div className="min-h-screen flex flex-col justify-center pt-25 mb-12.5 relative overflow-hidden">
      
      {/* Visual Depth: Background particles that don't block clicks */}
      <HeroParticles accentColor={accentColor} />

      <div className="flex flex-col items-start mb-12 z-20 mix-blend-difference">
         {/* Top line of title using the masked reveal effect */}
         <MaskedText text={title1} delay={0.1} />
         
         <div className="flex items-center gap-4 md:gap-8">
           {/* Second line with a dynamic gradient transition to the project's accent color */}
           <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[130px] font-bold leading-[0.9] tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white to-accent"
                style={{ '--tw-gradient-to': accentColor }}
           >
               {title2}
           </motion.h1>

           {/* Decorative elements: Horizontal line and year timestamp */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ delay: 0.8, duration: 0.8 }}
             className="hidden md:block h-px w-20 bg-white/30 mt-4" 
           />
           <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.9, duration: 0.8 }}
              className="hidden md:block text-sm font-mono opacity-50 mt-4"
           >
             ({year})
           </motion.span>
         </div>
      </div>

      {/* Intro text: Revealed slightly after the main headings */}
      <div className="z-20">
        <Reveal delay={0.4} once={true}>
            <p className="text-[#B0B0B0] text-[20px] md:text-[24px] max-w-xl leading-relaxed">
              {subtitle}
            </p>
        </Reveal>
      </div>

      {/* Animated Scroll Indicator: Disappears on scroll via opacityFade */}
      <motion.div style={{ opacity: opacityFade }} className="absolute bottom-10 left-5 md:left-12.5 flex items-center gap-4 z-20">
         <div className="w-px h-10 bg-linear-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
         <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono text-white">Scroll</span>
      </motion.div>
    </div>
  );
}