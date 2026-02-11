import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function SpotlightGrid({ items }) {
  const [index, setIndex] = useState(-1); // -1 = closed

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-360 mx-auto px-5 md:px-12.5">
        {items.map((item, i) => (
          <SpotlightCard 
            key={i} 
            item={item} 
            onClick={() => setIndex(i)} // Opens lightbox at this specific index
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={items.map(item => ({ src: item.src }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </>
  );
}

function SpotlightCard({ item, onClick }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Calculates mouse position relative to the card's top-left corner
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="relative rounded-xl border border-white/10 bg-[#111] overflow-hidden group cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
    >
      {/* LOCAL SPOTLIGHT: A radial gradient that follows the mouse only within this card */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(98, 84, 182, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative h-full flex flex-col">
        {/* Visual Asset Area */}
        <div className="relative h-60 w-full overflow-hidden bg-black/50 p-6 flex items-center justify-center">
            <img 
                src={item.src} 
                alt={item.caption} 
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
        </div>

        {/* Caption Bar */}
        <div className="p-4 border-t border-white/5 bg-[#0A0A0A]">
            <p className="text-gray-400 text-sm font-mono tracking-wide group-hover:text-white transition-colors">
                {item.caption}
            </p>
        </div>
      </div>
    </div>
  );
}