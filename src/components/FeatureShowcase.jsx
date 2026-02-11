import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function FeatureShowcase({ items, accentColor }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Helper to map index to specific feature titles
  const getTitle = (index) => {
    const titles = ["Dashboard Overview", "Study Progress", "Learning Analytics"];
    return titles[index] || `Feature ${index + 1}`;
  };

  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 md:gap-20 items-center">
        
        {/* --- NAVIGATION: Interactive list of features --- */}
        <div className="flex flex-col gap-10 order-2 lg:order-1">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative flex flex-col items-start text-left outline-none"
              >
                {/* Active indicator: A vertical line that slides into view */}
                <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-white/5 overflow-hidden">
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

                <h3 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
                  isActive ? 'text-white translate-x-2' : 'text-white/20 group-hover:text-white/50'
                }`}>
                  {getTitle(index)}
                </h3>

                {/* Animated description: Only visible when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[#888] text-sm md:text-base leading-relaxed pl-2"
                    >
                      {item.caption}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* --- DISPLAY AREA: Animated screenshot preview --- */}
        <div className="relative order-1 lg:order-2 aspect-video w-full">
          
          {/* Dynamic background glow that scales based on active index */}
          <div 
            className="absolute inset-0 rounded-full blur-[100px] opacity-15 transition-all duration-1000"
            style={{ 
              background: accentColor,
              transform: `scale(${activeIndex % 2 === 0 ? 0.9 : 1.1})` 
            }}
          />

          {/* Screenshot container with entrance/exit transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsOpen(true)}
              className="relative z-10 w-full h-full rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden group cursor-zoom-in"
            >
              <img
                src={items[activeIndex].src}
                alt={items[activeIndex].caption}
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/3 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-screen Lightbox: Triggered on image click */}
      <Lightbox
        open={isOpen}
        index={activeIndex}
        close={() => setIsOpen(false)}
        slides={items.map(item => ({ src: item.src }))}
        on={{ view: ({ index }) => setActiveIndex(index) }} 
      />
    </div>
  );
}