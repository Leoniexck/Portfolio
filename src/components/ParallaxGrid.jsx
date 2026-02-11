import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxGrid({ items }) {
  const ref = useRef(null);
  
  // Track scroll position of the grid container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Starts when top of grid enters, ends when bottom leaves
  });

  // map scroll progress (0 to 1) to different pixel offsets for the 3 columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Fastest column
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);  // Slowest column

  // Distribute items into 3 columns using the modulo operator
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <div ref={ref} className="h-[120vh] overflow-hidden grid grid-cols-3 gap-4 md:gap-8 px-4">
      <Column images={col1} y={y1} />
      {/* Column 2 starts slightly shifted up for an asymmetric initial look */}
      <Column images={col2} y={y2} className="mt-[-10%]" /> 
      <Column images={col3} y={y3} />
    </div>
  );
}

const Column = ({ images, y, className = "" }) => (
  <motion.div style={{ y }} className={`flex flex-col gap-8 ${className}`}>
    {images.map((item, i) => (
      <div key={i} className="relative rounded-xl overflow-hidden group">
        <img 
            src={item.src} 
            alt={item.caption} 
            className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
        />
        {/* Subtle tooltip reveal on image hover */}
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {item.caption}
        </div>
      </div>
    ))}
  </motion.div>
);