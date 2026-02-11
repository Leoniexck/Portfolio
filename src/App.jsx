import { useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Home from './pages/Home';
import HipHopInsight from './pages/HipHopInsight';
import MapMyWords from './pages/MapMyWords';

export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  // 1. GLOBAL LENIS SETUP: Initializes the smooth scroll engine
  useLayoutEffect(() => {
    // Prevent the browser from trying to jump back to old scroll positions
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2, // Time it takes to reach the target scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for smoothness
      smoothWheel: true,
      orientation: 'vertical',
    });
    
    lenisRef.current = lenis;

    // The Request Animation Frame (RAF) loop: Keeps the scroll engine running
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  // 2. NAVIGATION RESET: Ensures every page starts at the top without visual jumps
  useLayoutEffect(() => {
    if (!lenisRef.current) return;
    const lenis = lenisRef.current;

    // A) Temporarily disable scrolling to prevent interference
    lenis.stop();

    const forceTop = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    forceTop();

    /* B) The "Safety" Timers: React and Framer Motion might take a few ms 
       to render the new page. These timeouts ensure the scroll stays 
       at 0 while components mount. */
    const t1 = setTimeout(forceTop, 10);
    const t3 = setTimeout(() => {
      forceTop();
      lenis.start(); // Re-enable smooth scrolling
      lenis.resize(); // Recalculate page height for the new route
    }, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/project/HipHopInsight" element={<HipHopInsight />} />
      <Route path="/project/MapMyWords" element={<MapMyWords />} />
    </Routes>
  );
}