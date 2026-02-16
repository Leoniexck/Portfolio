import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function FeatureShowcase({ items, accentColor }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-center">
        
        {/* --- LEFT: Vertical Interactive Navigation --- */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative flex flex-col items-start text-left outline-none pl-6 py-2"
              >
                {/* Active Indicator Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full overflow-hidden">
                  {isActive && (
                    <motion.div 
                      layoutId="activeVerticalLine"
                      className="absolute inset-0 z-10"
                      style={{ backgroundColor: accentColor }}
                      initial={{ y: "-100%" }}
                      animate={{ y: 0 }}
                    />
                  )}
                </div>

                <h3 className={`text-xl md:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                  {item.caption}
                </h3>

                {/* Animated Description Text */}
                <AnimatePresence>
                  {isActive && item.text && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[#888] text-sm md:text-base leading-relaxed overflow-hidden max-w-md"
                    >
                      {item.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* --- RIGHT: Large Asset Display with Background Glow --- */}
        <div className="relative order-1 lg:order-2 w-full flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full blur-[100px] opacity-20 transition-all duration-1000 pointer-events-none"
            style={{ 
              background: accentColor,
              transform: `scale(${activeIndex % 2 === 0 ? 0.8 : 1})` 
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
              onClick={() => setIsOpen(true)}
              className="relative z-10 w-full cursor-zoom-in"
            >
              <img src={items[activeIndex].src} alt={items[activeIndex].caption} className="w-full h-auto max-h-125 lg:max-h-162.5 object-contain rounded-2xl shadow-2xl mx-auto" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Lightbox open={isOpen} index={activeIndex} close={() => setIsOpen(false)} slides={items.map(item => ({ src: item.src }))} />
    </div>
  );
}