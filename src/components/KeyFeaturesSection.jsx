import { motion } from 'framer-motion';

// Helper for sliding text reveal animations
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

export default function KeyFeaturesSection({ features, accentColor, number }) {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-24">
      
      {/* Editorial Section Header */}
      <div className="mb-12 md:mb-16 flex flex-col items-start w-full">
        <TextReveal>
            {number && (
              <span className="font-mono text-sm tracking-widest opacity-70 block mb-2" style={{ color: accentColor }}>
                {number}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Key Features.
            </h2>
        </TextReveal>
        
        {/* Animated Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="h-px bg-white/20 mt-6" 
        />
      </div>

      {/* Vertical list of feature cards with staggered animation */}
      <div className="flex flex-col gap-4">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-center gap-6 p-6 md:p-8 rounded-[24px] bg-white/[0.03] backdrop-blur-md border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors shadow-lg"
          >
            <div className="text-3xl md:text-4xl shrink-0">
                {feature.icon}
            </div>
            <p className="text-[#E0E0E0] text-lg md:text-xl leading-relaxed font-medium">
                {feature.text}
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}