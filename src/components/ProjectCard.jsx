import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, image, customVisual, tags, link, year, accentColor }) {
  return (
    <a href={link} className="group block w-full cursor-pointer">
      
      {/* Main visual container with various overlays (noise, glow, vignette) */}
      <div className="relative w-full aspect-video md:aspect-2/1 rounded-3xl overflow-hidden mb-8 md:mb-12 flex items-center justify-center">
        
        {/* Atmospheric layers for texture and lighting */}
        <div className="absolute inset-0 pointer-events-none z-0">
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[150px] opacity-15 group-hover:opacity-35 transition-opacity duration-1000 mix-blend-screen"
                style={{ backgroundColor: accentColor }}
            />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0E0E0E_90%)]" />
        </div>

        {/* Inner shadow to blend card edges with the background */}
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_80px_20px_#0E0E0E] rounded-3xl" />

        {/* Logic to render either a complex custom visual or a simple image */}
        {customVisual ? (
           <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]">
             {customVisual}
           </div>
        ) : (
          <motion.img 
            src={image} 
            alt={title} 
            className="relative z-10 w-full h-full object-contain p-4 md:p-8 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 drop-shadow-xl"
          />
        )}
        
      </div>

      {/* Project details area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
        <div className="md:col-span-8 flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F4F4F5] mb-4 transition-colors duration-300 group-hover:text-white">
            {title}
          </h2>
          <p className="text-[#888] text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Metadata: Year and Category Tags */}
        <div className="md:col-span-4 flex flex-col md:items-end gap-6 md:gap-4 mt-2 md:mt-0">
          <span className="font-mono text-sm tracking-widest text-[#555] group-hover:text-white/80 transition-colors duration-300">
            {year}
          </span>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {tags.map((tag, index) => (
              <span key={index} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#aaa] font-medium tracking-wide transition-colors duration-300 group-hover:border-white/20 group-hover:text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}