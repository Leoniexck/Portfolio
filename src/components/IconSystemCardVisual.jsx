import { motion } from "framer-motion";

export default function IconSystemCardVisual({ accentColor = "#397694" }) {
  const icons = [
    "/images/Icons/_01.png",
    "/images/Icons/_02.png",
    "/images/Icons/_03.png",
    "/images/Icons/_04.png",
    "/images/Icons/_05.png",
    "/images/Icons/_06.png",
  ];

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      
      {/* Background glow using the accent color */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] blur-[100px] opacity-20 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Main Browser Frame with entrance animation */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[85%] md:w-[75%] lg:w-[65%] aspect-[16/10] md:aspect-video bg-[#1a1a1a] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
      >
        
        {/* Browser Header (Mac-style traffic lights) */}
        <div className="h-10 border-b border-white/10 bg-[#141414]/80 backdrop-blur-md flex items-center px-4 md:px-5 gap-2 shrink-0 z-20 absolute top-0 w-full">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
            </div>
        </div>

        {/* Desktop Workspace with grid and grain textures */}
        <div className="flex-1 w-full h-full relative flex items-end justify-center pb-8 md:pb-12 overflow-hidden mt-10">
            
            <div className="absolute inset-0 bg-[#0a0a0a]">
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[100px] opacity-40 mix-blend-screen"
                    style={{ backgroundColor: accentColor }}
                />

                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* The Dock: Houses individual animated icons */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10"
                >
                    {icons.map((src, i) => (
                        <div key={i} className="flex items-center">
                            <CardDockIcon src={src} index={i} accentColor={accentColor} />
                            {/* Visual separators between icon pairs */}
                            { (i + 1) % 2 === 0 && i < icons.length - 1 && (
                                <div className="h-8 md:h-10 w-px bg-white/20 mx-1 md:mx-3 rounded-full" />
                            )}
                        </div>
                    ))}
                    
                    <div className="w-px h-10 md:h-10 bg-white/20 mx-1 md:mx-3" />
                    <CardDockIcon src={icons[0]} index={99} isFolder={true} accentColor={accentColor} />
                </motion.div>
            </div>

        </div>
      </motion.div>
    </div>
  );
}

// Sub-component for individual Dock Icons with hover effects
function CardDockIcon({ src, index, isFolder = false, accentColor }) {
    return (
        <motion.div
            className="relative group cursor-pointer"
            whileHover={{ y: -15, scale: 1.2, margin: "0 8px" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Tooltip visible on hover */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A1A] text-white text-[10px] md:text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-lg z-20">
                {isFolder ? "System" : `Style ${(Math.floor(index/2) + 1)}`}
            </div>

            <div className="relative w-11 h-11 md:w-[60px] md:h-[60px]">
                <div className="absolute inset-0 bg-[#1A1A1A] rounded-[14px] md:rounded-[18px] shadow-lg overflow-hidden transition-colors border border-white/5">
                    {/* Inner glow on hover */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)`, filter: 'blur(15px)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src={src} 
                        alt="Icon" 
                        className={`w-[60%] h-[60%] object-contain z-10 drop-shadow-md transition-transform duration-300 ${isFolder ? 'opacity-40 grayscale' : 'group-hover:scale-105'}`}
                    />
                </div>
            </div>

            {/* Active app indicator dot */}
            {!isFolder && (
                <div className="absolute -bottom-2 md:-bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </motion.div>
    );
}