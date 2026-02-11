import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import HipHopInsight from './pages/HipHopInsight';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Das hier sorgt dafür, dass das Fenster bei jedem Klick auf 0 springt */}
      <ScrollToTop />
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/HipHopInsight" element={<HipHopInsight />} />
      </Routes>
    </>
  );
}

export default App;