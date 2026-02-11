import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ activeSection }) {
  const location = useLocation();

  const scrollToProjects = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      
      {/* --- BACKGROUND GRADIENT (Bleibt volle Breite) --- */}
      {/* Das sieht meistens besser aus, wenn der Schatten über den ganzen Screen geht.
          Wenn der Schatten AUCH abgeschnitten sein soll, sag Bescheid! */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />

      {/* --- CONTENT CONTAINER (Begrenzte Breite) --- */}
      {/* Hier ist der Trick: max-w-[1440px] und mx-auto zentrieren den Inhalt */}
      <div className="relative w-full max-w-[1440px] mx-auto px-[20px] md:px-[50px] pt-[40px] flex justify-between items-start">
        
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-[24px] hover:opacity-80 transition-opacity">
          leoniekehlenbeck
        </Link>

        {/* Menü */}
        <div className="flex gap-[30px] md:gap-[50px] text-[18px] md:text-[24px] font-bold">
          
          <Link 
            to="/#projects" 
            onClick={scrollToProjects}
            className={`transition-colors duration-300 ${
              activeSection === 'projects' ? 'text-white' : 'text-nav-text hover:text-white'
            }`}
          >
            projects
          </Link>

          <Link to="/about" className="text-nav-text hover:text-white transition-colors">about</Link>
          <Link to="/contact" className="text-nav-text hover:text-white transition-colors">contact</Link>
        </div>

      </div>
    </nav>
  );
}