import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function StickyScrollGallery({ items }) {
  const targetRef = useRef(null);
  
  // Tracks scroll progress over a container that is 300% of the viewport height
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  /* Maps vertical scroll (0 to 1) to horizontal movement (-1% to -65%)
     Adjust the -65% value based on the total number of items in your gallery */
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    /* The container height (h-[300vh]) determines how long the user must scroll 
       vertically before the horizontal animation finishes. */
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900/50">
      
      {/* Sticky wrapper stays pinned to the screen during the scroll duration */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* The motion div moves horizontally based on the calculated 'x' value */}
        <motion.div style={{ x }} className="flex gap-10 pl-[5vw]">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="group relative h-[60vh] w-[80vw] md:w-[40vw] overflow-hidden rounded-3xl bg-neutral-800 border border-white/5"
            >
              <img
                src={item.src}
                alt={`Process ${index}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay revealed only on hover to show step metadata */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                 <span className="text-xl font-mono text-white">Step 0{index + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}