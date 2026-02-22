import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Configuration for state-specific assets and branding colors
const states = [
  { 
    id: 'success', 
    label: 'Success', 
    color: '#4ADE80', 
    src: '/images/hiphop/Item_Success.png', 
    desc: 'Displayed when a task has been solved correctly.' 
  },
  { 
    id: 'almost', 
    label: 'Almost', 
    color: '#FACC15', 
    src: '/images/hiphop/Item_Almost.png', 
    desc: 'Motivating feedback when the solution is almost correct.' 
  },
  { 
    id: 'failed', 
    label: 'Failed', 
    color: '#F87171', 
    src: '/images/hiphop/Item_Failed.png', 
    desc: 'Clear feedback when an answer is incorrect.' 
  }
];

export default function FeedbackSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const activeState = states[activeIndex];

  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 md:gap-20 items-center">
        
        {/* --- DISPLAY AREA: Left-aligned visual with dynamic glow --- */}
        <div className="relative aspect-video w-full">
          
          {/* Pulsing/Scaling background glow tied to the state's theme color */}
          <div 
            className="absolute inset-0 rounded-full blur-[120px] opacity-20 transition-all duration-1000"
            style={{ 
              background: activeState.color,
              transform: `scale(${activeIndex % 2 === 0 ? 0.9 : 1.1})` 
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsOpen(true)}
              className="relative z-10 w-full h-full flex items-center justify-center cursor-zoom-in group"
            >
              {/* HIER GEÄNDERT: scale-[1.05] als Basis hinzugefügt und Hover auf scale-[1.08] erhöht */}
              <img
                src={activeState.src}
                alt={activeState.label}
                className="max-w-full max-h-full object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-1000 scale-[1.08] group-hover:scale-[1.08]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- NAVIGATION: Right-aligned buttons with color-coded indicators --- */}
        <div className="flex flex-col gap-10">
          {states.map((state, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={state.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative flex flex-col items-end text-right outline-none"
              >
                {/* Right-side vertical indicator line */}
                <div className="absolute -right-6 top-0 bottom-0 w-0.5 bg-white/5 overflow-hidden">
                  {isActive && (
                    <motion.div 
                      layoutId="activeFeedbackLine"
                      className="absolute inset-0 z-10"
                      style={{ backgroundColor: state.color }}
                      initial={{ y: "-100%" }}
                      animate={{ y: 0 }}
                    />
                  )}
                </div>

                <h3 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
                  isActive ? 'text-white -translate-x-2' : 'text-white/20 group-hover:text-white/50 group-hover:-translate-x-1'
                }`}>
                  {state.label}
                </h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[#888] text-sm md:text-base leading-relaxed pr-2"
                    >
                      {state.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={isOpen}
        index={activeIndex}
        close={() => setIsOpen(false)}
        slides={states.map(state => ({ src: state.src }))}
        on={{ view: ({ index }) => setActiveIndex(index) }} 
      />
    </div>
  );
}