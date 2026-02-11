import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ activeSection }) {
  const location = useLocation();

  // Logic to handle smooth scrolling if we are already on the homepage
  const scrollToProjects = (e) => {
    if (location.pathname === '/') {
      e.preventDefault(); // Stop the router from "navigating"
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If we aren't on '/', the default <Link> behavior takes us home to the #projects ID
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      
      {/* Visual Fade: Ensures text remains readable over varying background content */}
      <div className="absolute top-0 left-0 w-full h-25 bg-linear-to-b from-black via-black/60 to-transparent pointer-events-none" />

      {/* Main Container: max-w-360 aligns this with your other page sections (1440px) */}
      <div className="relative w-full max-w-360 mx-auto px-5 md:px-12.5 pt-10 flex justify-between items-start">
        
        {/* Brand Logo */}
        <Link to="/" className="text-white font-bold text-[24px] hover:opacity-80 transition-opacity">
          leoniekehlenbeck
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-7.5 md:gap-12.5 text-[18px] md:text-[24px] font-bold">
          
          <Link 
            to="/#projects" 
            onClick={scrollToProjects}
            // Dynamic highlighting based on the scroll position (passed from parent)
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