import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function BrowserMockup({ src, alt = "Project Screenshot", className = "" }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Normalize src to array to handle single strings or lists
  const images = Array.isArray(src) ? src : [src];
  const hasMultipleImages = images.length > 1;
  const activeImageSrc = images[currentImgIndex];

  // Navigation handlers
  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentImgIndex > 0) setCurrentImgIndex(prev => prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentImgIndex < images.length - 1) setCurrentImgIndex(prev => prev + 1);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full h-auto rounded-xl border border-white/10 bg-[#1A1A1A] shadow-2xl overflow-hidden flex flex-col group transition-transform duration-700 hover:scale-[1.005]">
        
        {/* --- Browser Header (Mac Style) --- */}
        <div className="h-8 bg-[#222] border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-30 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>

        {/* --- Image Container --- */}
        <div 
          className="relative w-full bg-black cursor-zoom-in min-h-50"
          onClick={() => setIsLightboxOpen(true)}
        >
            {/* Invisible spacer to maintain aspect ratio/height */}
            <img 
              src={activeImageSrc} 
              alt="Spacer" 
              className="w-full h-auto opacity-0 pointer-events-none block" 
            />

            {/* Visible Animated Image */}
            <div className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    <motion.img 
                        key={currentImgIndex}
                        src={activeImageSrc}
                        alt={alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-contain"
                    />
                </AnimatePresence>
            </div>

            {/* --- Navigation Controls (Arrows & Dots) --- */}
            {hasMultipleImages && (
              <>
                {/* Prev Button */}
                {currentImgIndex > 0 && (
                    <button 
                      onClick={handlePrev} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    </button>
                )}
                
                {/* Next Button */}
                {currentImgIndex < images.length - 1 && (
                    <button 
                      onClick={handleNext} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                )}

                {/* Dots Indicator */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  onClick={(e) => e.stopPropagation()}
                >
                    {images.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setCurrentImgIndex(idx)} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} 
                        />
                    ))}
                </div>
              </>
            )}
        </div>
      </div>

      {/* --- Fullscreen Lightbox --- */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={currentImgIndex}
        slides={images.map(src => ({ src }))}
        on={{ view: ({ index }) => setCurrentImgIndex(index) }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
      />
    </div>
  );
}