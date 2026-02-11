import { Link } from 'react-router-dom';

function ProjectCard({ title, category, description, image, tags, link }) {
  return (
    <div className="w-full mb-[80px]"> {/* Abstand nach unten etwas verringert */}
      
      {/* 1. LINK & KACHEL */}
      <Link to={link} className="block group cursor-pointer">
        
        {/* Kachel-Container */}
        {/* pt-[60px]: Weniger "Luft" oben, wirkt kompakter */}
        <div className="bg-project-bg rounded-[15px] w-full pt-[60px] pb-[40px] px-4 flex flex-col items-center relative transition-transform duration-500 hover:scale-[1.01]">
          
          {/* Bild */}
          {/* max-h-[450px]: Begrenzt die Höhe, damit es nicht den Screen sprengt */}
          <div className="w-full flex justify-center mb-12">
            <img 
              src={image} 
              alt={title} 
              className="w-auto h-auto max-h-[400px] md:max-h-[450px] max-w-full object-contain drop-shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                // Schriftgröße auf 13px/14px verkleinert
                className="bg-black/5 text-tag-text font-sans text-[13px] md:text-[14px] px-3 py-1.5 rounded-[8px]"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </Link>

      {/* 2. TEXT UNTERHALB */}
      {/* mt-[30px]: Näher an der Kachel */}
      <div className="mt-[30px] w-full px-0">
        
        {/* Titel Zeile */}
        <div className="flex items-start justify-between mb-1">
            {/* Titel auf 32px verkleinert */}
            <h2 className="text-white text-[28px] md:text-[32px] font-bold leading-none">
            {title} 
            </h2>
        </div>
        
        {/* Kategorie (Subline) auf 18px verkleinert */}
        <p className="text-white text-[18px] font-bold opacity-80 mb-4">
           {category}
        </p>

        {/* Beschreibung auf 18px verkleinert (Standard Lesegröße im Web) */}
        <p className="text-text-secondary text-[16px] md:text-[18px] leading-relaxed w-full">
          {description}
        </p>
      </div>

    </div>
  );
}

export default ProjectCard;