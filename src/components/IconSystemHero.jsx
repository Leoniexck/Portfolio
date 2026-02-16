import { motion } from "framer-motion";

export default function IconSystemHero({ accentColor = "#397694" }) {
  
  const icons = [
    "/images/Icons/_01.png",
    "/images/Icons/_02.png",
    "/images/Icons/_03.png",
    "/images/Icons/_04.png",
    "/images/Icons/_05.png",
    "/images/Icons/_06.png",
  ];

  return (
    <div className="w-full py-10 relative">
      
      {/* Background Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] blur-[120px] opacity-20 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* --- BROWSER FRAME --- */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full aspect-16/10 bg-[#1a1a1a] rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col group"
      >
        
        {/* Header */}
        <div className="h-10 border-b border-white/10 bg-[#141414]/80 backdrop-blur-md flex items-center px-4 gap-2 shrink-0 z-20 absolute top-0 w-full">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
            </div>
        </div>

        {/* --- DESKTOP AREA --- */}
        <div className="flex-1 w-full h-full relative flex items-end justify-center pb-12 overflow-hidden">
            
            <div className="absolute inset-0 bg-[#0a0a0a]">
                
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[100px] opacity-40 mix-blend-screen"
                    style={{ backgroundColor: accentColor }}
                />
                
                <div 
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 bg-blue-900 mix-blend-screen"
                />

                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
                
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* --- DOCK --- */}
            <div className="relative z-10 flex flex-col items-center">
                
                <motion.div 
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl"
                >
                    {icons.map((src, i) => (
                        <div key={i} className="flex items-center">
                            <DockIcon src={src} index={i} accentColor={accentColor} />
                            { (i + 1) % 2 === 0 && i < icons.length - 1 && (
                                <div className="h-8 w-px bg-white/20 mx-2 md:mx-4 rounded-full" />
                            )}
                        </div>
                    ))}
                    
                    <div className="w-px h-10 bg-white/20 mx-2 md:mx-4" />
                    
                    <DockIcon src={icons[0]} index={99} isFolder={true} accentColor={accentColor} />

                </motion.div>
            </div>

        </div>
      </motion.div>
    </div>
  );
}

// --- ICON COMPONENT (Unverändert gut) ---
function DockIcon({ src, index, isFolder = false, accentColor }) {
    return (
        <motion.div
            className="relative group cursor-pointer"
            whileHover={{ y: -15, scale: 1.2, margin: "0 8px" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A1A] text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-lg z-20">
                {isFolder ? "System" : `Style ${(Math.floor(index/2) + 1)}`}
            </div>

            {/* Container */}
            <div className="relative w-12 h-12 md:w-16 md:h-16">
                
                {/* Base Shape */}
                <div className="absolute inset-0 bg-[#1A1A1A] rounded-[18px] shadow-lg overflow-hidden transition-colors">
                    
                    {/* Hover Glow */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ 
                            background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
                            filter: 'blur(15px)'
                        }}
                    />
                    
                    {/* Static Ambient Light */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-50" />
                </div>

                {/* Icon Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src={src} 
                        alt="Icon" 
                        className={`
                            w-[60%] h-[60%] object-contain z-10 drop-shadow-md transition-transform duration-300
                            ${isFolder ? 'opacity-40 grayscale' : 'group-hover:scale-105'}
                        `}
                    />
                </div>
            </div>

            {/* Active Dot */}
            {!isFolder && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </motion.div>
    );
}