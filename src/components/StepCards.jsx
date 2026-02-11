import { motion } from "framer-motion";

export default function StepCards({ items, accentColor }) {
  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5">
      
      {/* Container: Stacks vertically on mobile, 3-column grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* Connection Line: Subtle horizontal thread behind the cards (Desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent -z-10" />

        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative flex flex-col items-center"
          >
            {/* Background Index: Large, low-opacity number for "Big Typography" style */}
            <span 
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] font-bold opacity-[0.03] select-none pointer-events-none"
                style={{ color: "white" }}
            >
                {index + 1}
            </span>

            {/* Phone Frame: aspect-9/19 mimics modern mobile screen dimensions */}
            <div className="relative z-10 w-full max-w-75 aspect-[9/19] bg-[#111] rounded-[30px] border border-white/10 overflow-hidden shadow-2xl group hover:border-white/20 transition-colors duration-500">
               {/* Inner glow/shadow to make the image appear "sunken" into the frame */}
               <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-20 rounded-[30px]" />
               
               <img 
                 src={item.src} 
                 alt={item.caption} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />

               {/* Caption: Dark gradient overlay ensures readability over the image */}
               <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent z-30">
                 <p className="text-center text-sm font-medium text-white/80">{item.caption}</p>
               </div>
            </div>

            {/* Terminal Point: Represents a "node" in the process timeline */}
            <div className="mt-8 w-2 h-2 rounded-full bg-[#333] ring-4 ring-[#0E0E0E]" />
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}