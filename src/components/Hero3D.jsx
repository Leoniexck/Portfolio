import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero3D({ title, subtitle, src, accentColor = "#FFFFFF" }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Scroll-driven 3D tilt and perspective scaling
  const rotateX = useTransform(scrollY, [0, 600], [0, 25]); 
  const scale = useTransform(scrollY, [0, 600], [1, 0.85]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]); 
  const y = useTransform(scrollY, [0, 600], [0, 100]);      

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-5 overflow-hidden" style={{ perspective: "1200px" }}>
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] blur-[150px] opacity-20 -z-10 pointer-events-none rounded-full" style={{ backgroundColor: accentColor }} />

      {/* Main Title Content */}
      <div className="text-center z-20 mb-16 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-[#888] font-light">
          {subtitle}
        </motion.p>
      </div>

      {/* Immersive 3D Interface Image */}
      <motion.div style={{ rotateX, scale, opacity, y, transformStyle: "preserve-3d" }} className="w-full max-w-6xl mx-auto relative z-10">
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#050505]">
            <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <div className="ml-4 h-5 w-64 bg-white/5 rounded-full" />
            </div>
            <img src={src} alt="Desktop Interface" className="w-full h-auto block" />
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}