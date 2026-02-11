import { motion } from 'framer-motion';

export default function SectionHeader({ number, title, text, alignRight = false, accentColor = "#FFFFFF" }) {
  return (
    <div className={`flex flex-col mb-8 md:mb-12 ${alignRight ? 'items-end text-right' : 'items-start text-left'}`}>
      
      {/* Zeile mit Nummer und Titel */}
      <div className="flex items-baseline gap-4 mb-3">
        {/* Die Nummer (z.B. 01) */}
        <span className="font-mono text-sm md:text-base opacity-60 font-medium tracking-widest" style={{ color: accentColor }}>
          {number}
        </span>
        
        {/* Der Titel (z.B. Item Types) */}
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* Der Untertext / Beschreibung */}
      {text && (
        <p className="text-[#BDC0C3] text-lg md:text-xl max-w-xl leading-relaxed">
          {text}
        </p>
      )}
      
      {/* Optional: Ein kleiner dekorativer Strich */}
      <div className="w-12 h-[1px] bg-white/20 mt-6" />

    </div>
  );
}