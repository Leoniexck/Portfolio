import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import HipHopInsight from './pages/HipHopInsight';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Reset scroll position to top whenever the URL path changes */}
      <ScrollToTop />
      
      {/* The 'key' prop on Routes is a power-move: 
        It tells React to treat every route change as a unique instance, 
        which is necessary if you want to trigger entrance animations on every page.
      */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/HipHopInsight" element={<HipHopInsight />} />
      </Routes>
    </>
  );
}

export default App;