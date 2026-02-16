import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Side-by-side sticky interaction: Text scrolls while images crossfade in place
export default function StickyFeatureSection({ features, accentColor }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full max-w-360 mx-auto px-5 md:px-12.5 py-20 md:py-40">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        
        {/* LEFT: Scrollable Text Flow */}
        <div className="w-full lg:w-1/2 flex flex-col gap-[50vh] pb-[20vh]">
          {features.map((feature, index) => (
            <TextBlock key={index} feature={feature} index={index} setIndex={setActiveIndex} accentColor={accentColor} />
          ))}
        </div>

        {/* RIGHT: Sticky Media Hub */}
        <div className="hidden lg:block w-1/2 relative h-[80vh]">
          <div className="sticky top-[15vh] w-full h-150 bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {features.map((feature, index) => (
              <motion.img
                key={index}
                src={feature.src}
                alt={feature.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1 : 1.1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TextBlock({ feature, index, setIndex, accentColor }) {
  const ref = useRef(null);
  // Detects when text block hits center of viewport to switch sticky image
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => { if (isInView) setIndex(index); }, [isInView, index, setIndex]);

  return (
    <div ref={ref} className="min-h-[50vh] flex flex-col justify-center">
      <span className="font-mono text-xl mb-4 opacity-60" style={{ color: accentColor }}>0{index + 1}</span>
      <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{feature.title}</h3>
      <p className="text-[#B0B0B0] text-lg md:text-xl leading-relaxed max-w-md">{feature.text}</p>
      
      {/* Mobile Inline Image Fallback */}
      <div className="lg:hidden mt-8 w-full rounded-xl overflow-hidden border border-white/10">
        <img src={feature.src} alt={feature.title} className="w-full h-auto" />
      </div>
    </div>
  );
}