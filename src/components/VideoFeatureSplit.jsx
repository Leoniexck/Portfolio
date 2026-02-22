import { motion } from 'framer-motion';

export default function VideoFeatureSplit({ number, title, description, videoSrc, accentColor, githubLink, status }) {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Visual Column: Video Player with glow effect and status badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-1 relative w-full flex flex-col items-center group"
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-[120px] opacity-15 pointer-events-none transition-opacity duration-700 group-hover:opacity-30"
            style={{ backgroundColor: accentColor }}
          />

          <video 
            src={videoSrc} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="relative z-10 w-auto max-w-full h-auto max-h-[500px] object-contain rounded-[24px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.01] border border-white/5"
          />

          {status && (
            <div className="mt-5 relative z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100">
              <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#aaa] border border-white/10 rounded-full bg-white/5 shadow-sm">
                {status}
              </span>
            </div>
          )}
        </motion.div>

        {/* Content Column: Editorial text aligned with the project's header style */}
        <div className="order-2 lg:order-2 flex flex-col items-start lg:items-end lg:text-right w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:items-end w-full"
          >
            {number && (
              <span className="font-mono text-sm tracking-widest opacity-70 block mb-2" style={{ color: accentColor }}>
                {number}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              className="h-px bg-white/20 mt-6 mb-8" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-start lg:items-end w-full"
          >
            <div className="text-[#B0B0B0] text-lg md:text-xl leading-relaxed text-left lg:text-right mb-10">
              {description}
            </div>

            {/* Link button to Github or project repository */}
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium text-white tracking-wide">View Source Code</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)` }}
                />
              </a>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}