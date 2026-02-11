import { useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Home from './pages/Home';
import HipHopInsight from './pages/HipHopInsight';

// WICHTIG: Kein ScrollToTop Import mehr nötig!

export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  // 1. GLOBALER LENIS SETUP
  useLayoutEffect(() => {
    // Browser-Restoration ausschalten
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smooth: true,
    });
    
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. BEI SEITENWECHSEL: HARD RESET
  useLayoutEffect(() => {
    if (!lenisRef.current) return;

    const lenis = lenisRef.current;

    // A) Lenis kurz anhalten
    lenis.stop();
    
    // B) Browser nativ zwingen
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    
    // C) Lenis internen Wert sofort überschreiben
    lenis.scrollTo(0, { immediate: true, force: true });
    
    // D) Kurz warten, dann wieder aktivieren
    // Das verhindert, dass der Browser während des Renderns zurückspringt
    const timer = setTimeout(() => {
      lenis.start(); 
      lenis.resize(); // Wichtig, falls die neue Seite eine andere Höhe hat
    }, 10);

    return () => clearTimeout(timer);

  }, [location.pathname]); 

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/project/HipHopInsight" element={<HipHopInsight />} />
    </Routes>
  );
}