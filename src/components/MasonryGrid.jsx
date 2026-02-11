import { useState } from 'react';
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function MasonryGrid({ items }) {
  // -1 means closed, any positive integer is the current image index
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="w-full max-w-360 mx-auto px-5 md:px-12.5">
        {/* CSS Multi-column layout: Automatically flows items into columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // Animation triggers only the first time it enters view
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setIndex(i)}
              /* break-inside-avoid: Essential for multi-column to prevent cards splitting between columns */
              className="break-inside-avoid relative group rounded-xl overflow-hidden bg-[#1A1A1A] border border-white/5 cursor-zoom-in"
            >
              {/* Image Container with Grayscale-to-Color hover transition */}
              <div className="relative overflow-hidden">
                 <img 
                   src={item.src} 
                   alt={`Draft ${i}`} 
                   className="w-full h-full object-cover opacity-80 grayscale-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-[1.02]"
                 />
                 
                 {/* Decorative Overlay Label */}
                 <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-white/50 px-2 py-1 rounded border border-white/10 pointer-events-none">
                    Draft
                 </div>
              </div>
              
              {/* Footer: Only renders if a caption exists */}
              {item.caption && (
                 <div className="p-4 border-t border-white/5 bg-[#111]">
                    <p className="text-sm text-[#888] font-mono transition-colors group-hover:text-white">
                      {item.caption}
                    </p>
                 </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-screen viewing experience */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={items.map(item => ({ src: item.src }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
      />
    </>
  );
}