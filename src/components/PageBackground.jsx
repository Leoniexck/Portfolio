import { motion } from 'framer-motion';

export default function PageBackground({ accentColor = "#6254B6" }) {
  return (
    /* fixed inset-0 ensures the background stays pinned while the page scrolls */
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0E0E0E]">
      
      {/* Primary Ambient Light: Pulses slowly in the top right corner */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] blur-[150px] rounded-full" 
        style={{ backgroundColor: accentColor }}
      />

      {/* Secondary Counter-Light: Provides a subtle balance in the bottom left */}
      <motion.div 
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] blur-[120px] rounded-full" 
        style={{ backgroundColor: accentColor }}
      />

      {/* Noise Grain: Breaks up color banding and adds a "tactile" film-like feel */}
      <div 
        className="absolute inset-0 z-1 opacity-[0.03] mix-blend-screen"
        style={{ 
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          filter: 'contrast(150%) brightness(100%)'
        }} 
      />

      {/* Vignette: Darkens the bottom of the screen to ground the page content */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0E0E0E] z-2" />
    </div>
  );
}