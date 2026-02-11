import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Reveal({ 
  children, 
  delay = 0, 
  yOffset = 80, 
  once = true, 
  margin = "-10% 0px -10% 0px" // Triggers when the element is 10% into the viewport
}) {
  const ref = useRef(null);
  
  // Monitors if the element is currently visible in the browser window
  const isInView = useInView(ref, { once: once, margin: margin });

  return (
    <motion.div
      ref={ref}
      variants={{
        // "hidden" state: pushed down, slightly smaller, and transparent
        hidden: { opacity: 0, y: yOffset, scale: 0.98 },
        // "visible" state: snaps to natural position with a high-end cubic-bezier curve
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.9, delay: delay, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}