import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopButton({ accentColor = "#FFFFFF" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Show button after 300px, but hide it if we reach the footer area
      const shouldShow = scrolled > 300;
      const isAtBottom = scrolled + viewportHeight >= fullHeight - 50;

      setIsVisible(shouldShow && !isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // Entry and exit animations using a sophisticated cubic-bezier
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // z-9999 ensures it floats above all project content and particles
          className="fixed bottom-8 right-6 md:right-8 z-9999 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 border border-white/10 transition-all duration-300 group"
          style={{ 
            // Dynamic styling that reacts to the specific project's accent color
            borderColor: isHovered ? accentColor : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered ? `0 0 20px -5px ${accentColor}80` : 'none'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            // Subtle upward nudge on hover to hint at the button's function
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ color: accentColor }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}