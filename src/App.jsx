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

  // 2. ABSOLUTER RESET BEI JEDEM SEITENWECHSEL
  useLayoutEffect(() => {
    if (!lenisRef.current) return;
    const lenis = lenisRef.current;

    // A) Lenis stoppen
    lenis.stop();

    // B) Funktion zum Erzwingen der Top-Position
    const forceTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    // Sofort ausführen
    forceTop();

    // C) Warten bis React & Partikel fertig sind (Timing ist hier alles)
    // Wir feuern den Reset nach 10ms, 50ms und 150ms nochmal, 
    // um gegen die Ladezeit der Partikel zu gewinnen.
    const t1 = setTimeout(forceTop, 10);
    const t2 = setTimeout(forceTop, 50);
    const t3 = setTimeout(() => {
      forceTop();
      lenis.start();
      lenis.resize(); // Berechnet die neue Seitenhöhe korrekt
    }, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/project/HipHopInsight" element={<HipHopInsight />} />
    </Routes>
  );
}