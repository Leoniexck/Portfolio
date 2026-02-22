import { motion } from 'framer-motion';

export default function DualTextSection({ items, accentColor }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-12.5 mb-32">
      {/* 2-column grid that collapses to 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-start"
          >
            {/* Index number with subtle transparency for editorial look */}
            {item.number && (
              <span className="font-mono text-sm tracking-widest opacity-70 block mb-2" style={{ color: accentColor }}>
                {item.number}
              </span>
            )}
            
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
              {item.title}
            </h3>

            {/* Horizontal divider that expands when scrolled into view */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 + (index * 0.2) }}
              className="h-px bg-white/20 mt-4 mb-8"
            />
            
            <p className="text-[#B0B0B0] text-lg leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}