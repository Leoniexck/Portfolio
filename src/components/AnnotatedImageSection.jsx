import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnnotatedImageSection({ accentColor = "#FFFFFF", imageSrc, annotations }) {
  const ref = useRef(null);
  // Detect if section is in viewport to trigger animations
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  if (!annotations || annotations.length === 0) return null;

  return (
    <section ref={ref} className="w-full max-w-360 mx-auto px-5 md:px-12.5 mb-32 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-20 relative w-full">
            
            {/* SPACER: Matches the 1/3 width of previous sections for perfect alignment */}
            <div className="hidden lg:block lg:w-1/3"></div>

            {/* MAIN CONTENT (3/5): Holds the image and the floating descriptions */}
            <div className="w-full lg:w-3/5 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start relative">
                
                {/* IMAGE: Aligned with the body text from the section above */}
                <div className="w-full lg:w-1/2 shrink-0">
                    <motion.img 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        src={imageSrc} 
                        alt="App Interface Detail" 
                        className="w-full h-auto drop-shadow-2xl rounded-3xl" 
                    />
                </div>

                {/* ANNOTATIONS: Positioned next to the image on desktop */}
                <div className="relative grow h-full flex flex-col gap-10 lg:block">
                    {annotations.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                            // lg:absolute uses topOffset to pin text to specific image heights
                            className="lg:absolute w-full"
                            style={{ top: item.topOffset }}
                        >
                            <div className="relative">
                                {/* Indicator Dot & Vertical Line */}
                                <div className="absolute -left-6 top-2.5 w-1.5 h-1.5 rounded-full" 
                                     style={{ backgroundColor: accentColor }} />
                                <div className="absolute -left-5.25 top-0 bottom-0 w-px bg-white/10" />
                                
                                <p className="text-[#B0B0B0] text-sm md:text-base leading-relaxed text-left">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
}