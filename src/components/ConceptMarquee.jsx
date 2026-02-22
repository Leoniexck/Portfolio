import { useState, useEffect, useRef } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ConceptMarquee({ title, text, stepNumber, items = [], accentColor = "#FFFFFF" }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the items to create a seamless infinite loop illusion
  const marqueeItems = [...items, ...items, ...items];

  // --- Infinite Scroll Logic ---
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    
    const loop = () => {
      // Move scroll position if not paused
      if (!isPaused) {
        container.scrollLeft += 0.8; 
      }
      
      const singleSetWidth = container.scrollWidth / 3;

      // Reset scroll position seamlessly to maintain infinite effect
      if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft = singleSetWidth;
      } 
      else if (container.scrollLeft <= 1) {
          container.scrollLeft = singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, items.length]);

  return (
    <section className="w-full py-24 bg-transparent overflow-hidden">
      
      {/* 1. Editorial Header Section */}
      <div className="max-w-360 mx-auto px-5 md:px-12.5 mb-16 flex flex-col items-start">
        
        <div className="flex flex-col items-start gap-2 mb-2">
            {/* Step Number (e.g., "02") */}
            {stepNumber && (
              <span className="font-mono text-sm tracking-widest opacity-70" style={{ color: accentColor }}>
                {stepNumber}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
        </div>

        {/* Decorative Divider Line */}
        <div className="h-px w-15 bg-white/20 mt-4 mb-8" />

        {/* Description Text */}
        <div className="text-[#B0B0B0] text-lg leading-relaxed max-w-2xl text-left">
          {text}
        </div>
      </div>

      {/* 2. Infinite Scroll Area */}
      <div className="relative w-full">
        <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto px-4 cursor-grab active:cursor-grabbing"
            style={{ 
                scrollbarWidth: 'none', // Hide scrollbar Firefox
                msOverflowStyle: 'none' // Hide scrollbar IE/Edge
            }}
            // Pause animation on user interaction
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            {marqueeItems.map((item, index) => {
              // Calculate real index (1-based) for display
              const realIndex = (index % items.length) + 1;
              const displayNum = realIndex < 10 ? `0${realIndex}` : realIndex;

              return (
                <div 
                    key={index}
                    className="relative shrink-0 h-75 md:h-112.5 w-auto max-w-none bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden group select-none cursor-pointer"
                    onClick={() => setLightboxIndex(index % items.length)}
                >
                    <img 
                      src={item.src} 
                      alt={item.caption}
                      className="h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      draggable="false"
                    />

                    {/* Background Number Decoration */}
                    <div className="absolute top-2 left-4 z-20 pointer-events-none">
                        <span className="font-mono text-5xl md:text-6xl text-white/5 font-bold group-hover:text-white/20 transition-colors">
                            {displayNum}
                        </span>
                    </div>

                    {/* Label Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 z-20">
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-wide text-white">
                          {item.label || "Concept"}
                      </span>
                    </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={items.map(item => ({ src: item.src }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
      />
    </section>
  );
}