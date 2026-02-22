import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function GradeCalculatorSection({ number, title, description, accentColor = "#FFFFFF", snippetImage, mockupsImage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="w-full max-w-[1440px] mx-auto px-5 md:px-12.5 mb-32 mt-24 relative z-10">
      
      {/* Top Part: Text & Snippet image */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
        
        {/* Left column (1/3 width) */}
        <div className="w-full lg:w-1/3 flex flex-col items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            {number && <span className="font-mono text-sm tracking-widest block mb-2 opacity-70" style={{ color: accentColor }}>{number}</span>}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
          </motion.div>

          <motion.div initial={{ width: 0 }} animate={isInView ? { width: "60px" } : {}} transition={{ duration: 1 }} className="h-px bg-white/20 mt-6 mb-12" />

          {/* Smaller preview snippet image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="w-full">
            <img src={snippetImage} alt="Snippet" className="w-full max-w-[380px] h-auto rounded-xl" />
          </motion.div>
        </div>

        {/* Right column (3/5 width) for main description */}
        <div className="w-full lg:w-3/5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-[#B0B0B0] text-lg md:text-xl leading-relaxed text-left lg:pt-2">
            {description}
          </motion.div>
        </div>
      </div>

      {/* Bottom Part: Large mockups */}
      {/* This layout uses an empty 1/3 spacer div on desktop to force the image to align perfectly with the description text above */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20 mt-10 md:-mt-12 lg:-mt-20 relative z-0">
        <div className="hidden lg:block w-full lg:w-1/3"></div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="w-full lg:w-3/5 flex justify-start">
          <img src={mockupsImage} alt="Mockups with Arrow" className="w-full max-w-[750px] h-auto drop-shadow-2xl" />
        </motion.div>
      </div>

    </section>
  );
}