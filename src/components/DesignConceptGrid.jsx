import { motion } from 'framer-motion';

// Helper component for "sliding" text reveal animations
const TextReveal = ({ children, delay = 0 }) => (
  <div className="overflow-hidden relative">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay }}
    >
      {children}
    </motion.div>
  </div>
);

export default function DesignConceptGrid({ number, title, accentColor, data }) {
  if (!data) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-32">
        {/* SECTION HEADER: Title, index number, and animated divider */}
        <div className="mb-16 md:mb-24 flex flex-col items-start w-full">
            <TextReveal>
                {number && (
                    <span className="font-mono text-sm tracking-widest opacity-70 block mb-2" style={{ color: accentColor }}>
                        {number}
                    </span>
                )}
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {title}
                </h2>
            </TextReveal>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                className="h-px bg-white/20 mt-6" 
            />
        </div>

        {/* MAIN GRID: 2-column layout for conceptual blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-20 items-start w-full">

            {/* BLOCK 1: Text followed by a vertical image */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight">{data.block1.title}</h3>
                    <p className="text-[#B0B0B0] text-lg leading-relaxed">
                        {data.block1.text}
                    </p>
                </div>
                {data.block1.image && (
                    <img 
                        src={data.block1.image} 
                        alt={data.block1.title} 
                        className="w-full max-w-[380px] h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-xl" 
                    />
                )}
            </motion.div>

            {/* BLOCK 2: Standard text block */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight">{data.block2.title}</h3>
                <p className="text-[#B0B0B0] text-lg leading-relaxed">
                    {data.block2.text}
                </p>
            </motion.div>

            {/* BLOCK 3: Horizontal layout with image alongside text on large screens */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">
                <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight">{data.block3.title}</h3>
                    <p className="text-[#B0B0B0] text-lg leading-relaxed">
                        {data.block3.text}
                    </p>
                </div>
                {data.block3.image && (
                    <div className="shrink-0 w-full max-w-[280px] xl:max-w-[320px]">
                        <img 
                            src={data.block3.image} 
                            alt={data.block3.title} 
                            className="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl" 
                        />
                    </div>
                )}
            </motion.div>

            {/* BLOCK 4: Final summary/benefit text block */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight">{data.block4.title}</h3>
                <p className="text-[#B0B0B0] text-lg leading-relaxed">
                    {data.block4.text}
                </p>
            </motion.div>

        </div>
    </div>
  );
}