import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExpandableGallery({ items }) {
  // Track which item is currently expanded
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5">
      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-150 w-full">
        
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              layout // Framer Motion handles the smooth width/height transition
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              // flex-3 for expanded, flex-1 for collapsed items
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out group ${
                isActive ? 'flex-[3]' : 'flex-1'
              }`}
              style={{ minHeight: '200px' }}
            >
              {/* Background image with slight zoom on hover */}
              <img
                src={item.src}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Darkening overlay for inactive items */}
              <div 
                className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
                  isActive ? 'opacity-0' : 'opacity-40 hover:opacity-0'
                }`} 
              />

              {/* Caption: Revealed with a slight delay when item expands */}
              <div 
                className={`absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/90 to-transparent flex flex-col justify-end transition-opacity duration-300 ${
                   isActive ? 'opacity-100 delay-200' : 'opacity-0'
                }`}
              >
                <span className="text-white/50 text-xs font-mono uppercase tracking-widest mb-1">
                    Step 0{index + 1}
                </span>
                <p className="text-white text-lg md:text-xl font-medium">
                  {item.caption || `Process Phase ${index + 1}`}
                </p>
              </div>

              {/* Floating index number: Hidden when item is active */}
              <div 
                 className={`absolute bottom-4 left-4 text-white/70 font-mono text-xl transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                 }`}
              >
                 0{index + 1}
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}