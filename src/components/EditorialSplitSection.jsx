import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EditorialSplitSection({ number, title, text, accentColor = "#FFFFFF" }) {
  const ref = useRef(null);
  // Trigger animation when 10% of the section is visible
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-24 bg-transparent">
      {/* Layout: Vertical on mobile, horizontal split on desktop */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
        
        {/* LEFT COLUMN: Header Info */}
        <div className="w-full lg:w-1/3 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          >
            {/* Index Number */}
            <span className="font-mono text-sm tracking-widest opacity-70 block mb-2" style={{ color: accentColor }}>
              {number}
            </span>
            {/* Section Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
          </motion.div>

          {/* Animated Editorial Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "60px" } : {}}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            className="h-px bg-white/20 mt-6"
          />
        </div>

        {/* RIGHT COLUMN: Body Content */}
        <div className="w-full lg:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1], delay: 0.2 }}
            className="text-[#B0B0B0] text-lg md:text-xl leading-relaxed text-left"
          >
            {text}
          </motion.div>
        </div>

      </div>
    </section>
  );
}