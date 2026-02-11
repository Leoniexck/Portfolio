import { motion } from 'framer-motion';

export default function SectionHeader({ number, title, text, alignRight = false, accentColor = "#FFFFFF" }) {
  return (
    /* Dynamic alignment: Allows you to 'zigzag' the layout by switching between left and right */
    <div className={`flex flex-col mb-8 md:mb-12 ${alignRight ? 'items-end text-right' : 'items-start text-left'}`}>
      
      {/* Container for the Index and Main Heading */}
      <div className="flex items-baseline gap-4 mb-3">
        {/* Index Number: Styled in Mono to look like technical metadata */}
        <span className="font-mono text-sm md:text-base opacity-60 font-medium tracking-widest" style={{ color: accentColor }}>
          {number}
        </span>
        
        {/* Main Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* Description: Constrained width (max-w-xl) to prevent long, unreadable lines */}
      {text && (
        <p className="text-text-secondary text-lg md:text-xl max-w-xl leading-relaxed">
          {text}
        </p>
      )}
      
      {/* Visual Separator: Grounds the header before the main content begins */}
      <div className="w-12 h-px bg-white/20 mt-6" />

    </div>
  );
}