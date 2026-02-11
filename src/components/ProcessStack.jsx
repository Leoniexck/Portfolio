import { motion } from "framer-motion";
import { useRef } from "react";

export default function ProcessStack({ items }) {
  return (
    <div className="w-full max-w-250 mx-auto px-5 pb-24">
      {items.map((item, index) => (
        <Card key={index} item={item} index={index} total={items.length} />
      ))}
    </div>
  );
}

const Card = ({ item, index, total }) => {
  const ref = useRef(null);
  
  // Vertical spacing: Each card stops 40px lower than the previous one
  const topOffset = index * 40; 

  return (
    /* The 'sticky' class makes the card stay in the viewport once it hits the 'top' value */
    <div 
        ref={ref}
        className="sticky top-0 mb-8 flex flex-col items-center"
        // 100px base margin from top + the offset to create the visible stack edge
        style={{ top: 100 + topOffset }} 
    >
      <motion.div
        // Reveal animation as the card scrolls into the viewport
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        
        className="relative w-full aspect-video rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#111]"
      >
         {/* Label overlay with a glassmorphism background */}
         <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-10 bg-linear-to-b from-black/80 to-transparent">
            <span className="font-mono text-xs md:text-sm text-white/50 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                Step 0{index + 1}
            </span>
         </div>

         <img 
            src={item.src} 
            alt={`Process step ${index + 1}`} 
            className="w-full h-full object-cover"
         />
      </motion.div>
    </div>
  );
};