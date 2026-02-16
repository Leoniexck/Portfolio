import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImmersiveScroll({ steps, accentColor = "#FFFFFF" }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-20 bg-transparent">
      <div className="flex flex-col gap-32 md:gap-48">
        {steps.map((step, index) => (
          <SingleFeatureBlock 
            key={index} 
            step={step} 
            index={index} 
            accentColor={accentColor} 
          />
        ))}
      </div>
    </section>
  );
}

// --- ANIMATION VARIANTS ---

const mainContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const textColumnVariants = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] } 
  }
};

const lineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: { 
    width: "60px",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// --- SINGLE BLOCK COMPONENT ---
function SingleFeatureBlock({ step, index, accentColor }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const images = Array.isArray(step.src) ? step.src : [step.src];
  const hasMultipleImages = images.length > 1;
  const activeImageSrc = images[currentImgIndex];

  // Dynamic Caption 
  const currentCaption = Array.isArray(step.caption) 
    ? step.caption[currentImgIndex] 
    : step.caption;

  // Navigation Logic
  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentImgIndex > 0) setCurrentImgIndex(prev => prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentImgIndex < images.length - 1) setCurrentImgIndex(prev => prev + 1);
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }} 
      variants={mainContainerVariants}
      className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24"
    >
      
      {/* --- Text --- */}
      <motion.div 
        variants={textColumnVariants} 
        className="w-full lg:w-1/3 flex flex-col order-2 lg:order-1 pt-4"
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-col items-start gap-2 mb-2">
            <span className="font-mono text-sm tracking-widest opacity-70" style={{ color: accentColor }}>
              Step 0{index + 1}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {step.title}
            </h3>
          </div>
        </motion.div>

        <motion.div 
          variants={lineVariants}
          className="h-px bg-white/30 mt-4 mb-8" 
        />

        {/* Text Body */}
        <motion.div variants={itemVariants} className="text-[#B0B0B0] text-lg leading-relaxed">
           {step.text}
        </motion.div>

      </motion.div>

      {/* --- Desktop --- */}
      <motion.div 
        variants={itemVariants} 
        className="w-full lg:w-2/3 order-1 lg:order-2"
      >
        
        <div className="relative w-full h-auto rounded-xl border border-white/10 bg-[#1A1A1A] shadow-2xl overflow-hidden flex flex-col group transition-transform duration-700 hover:scale-[1.005]">
            
            {/* Browser Header */}
            <div className="h-8 bg-[#222] border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-30 relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>

            {/* Container */}
            <div 
              className="relative w-full bg-black cursor-zoom-in min-h-62.5"
              onClick={() => setIsLightboxOpen(true)}
            >
                {/* Spacer*/}
                <img 
                  src={activeImageSrc} 
                  alt="Spacer" 
                  className="w-full h-auto opacity-0 pointer-events-none block" 
                />

                <div className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        <motion.img 
                            key={currentImgIndex}
                            src={activeImageSrc}
                            alt={step.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </AnimatePresence>
                </div>

                {/* Navigation (Hover) */}
                {hasMultipleImages && (
                  <>
                    {currentImgIndex > 0 && (
                        <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 z-20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                    )}
                    
                    {currentImgIndex < images.length - 1 && (
                        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 z-20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                    )}

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={(e) => e.stopPropagation()}>
                        {images.map((_, idx) => (
                            <button key={idx} onClick={() => setCurrentImgIndex(idx)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} />
                        ))}
                    </div>
                  </>
                )}
            </div>

            {/* Caption Overlay */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                 <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 shadow-lg">
                    <span className="text-[10px] md:text-xs font-mono text-white/90 tracking-wide">
                        {hasMultipleImages 
                          ? `${currentCaption} (${currentImgIndex + 1}/${images.length})` 
                          : currentCaption}
                    </span>
                 </div>
            </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={currentImgIndex}
          slides={images.map(src => ({ src }))}
          on={{ view: ({ index }) => setCurrentImgIndex(index) }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
        />
      </motion.div>

    </motion.div>
  );
}