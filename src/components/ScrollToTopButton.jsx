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

      // Anzeigen ab 300px Scroll-Tiefe (etwas früher als vorher)
      const shouldShow = scrolled > 300;

      // Verstecken, wenn wir ganz unten beim Footer sind
      const isAtBottom = scrolled + viewportHeight >= fullHeight - 50;

      if (shouldShow && !isAtBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Elegantes Easing
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // --- NEUES DESIGN ---
          // Kleiner (w-10 h-10), Glass-Effekt (bg-black/30 + backdrop-blur), feiner Rand
          className="fixed bottom-8 right-6 md:right-8 z-[9999] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 border border-white/10 transition-all duration-300 group"
          style={{ 
            // Beim Hovern wird der Rand und der Hintergrund leicht eingefärbt
            borderColor: isHovered ? accentColor : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered ? `0 0 20px -5px ${accentColor}80` : 'none'
          }}
        >
          {/* Pfeil Icon: Feiner (strokeWidth={1.5}) und in Akzentfarbe */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            // Hier die Strichstärke auf 1.5 reduziert für einen cleaneren Look
            strokeWidth={1.5} 
            stroke="currentColor" 
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