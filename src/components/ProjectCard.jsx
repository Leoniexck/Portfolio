import { Link } from 'react-router-dom';

function ProjectCard({ title, category, description, image, tags, link }) {
  return (
    <div className="w-full mb-20">
      
      {/* 1. INTERACTIVE IMAGE CARD */}
      <Link to={link} className="block group cursor-pointer">
        
        {/* Container uses a custom background and subtle scale effect on hover */}
        <div className="bg-project-bg rounded-[15px] w-full pt-15 pb-10 px-4 flex flex-col items-center relative transition-transform duration-500 hover:scale-[1.01]">
          
          {/* Visual Asset: Centers the image with a heavy drop shadow for depth */}
          <div className="w-full flex justify-center mb-12">
            <img 
              src={image} 
              alt={title} 
              /* max-h limits prevent vertical bloat; object-contain maintains aspect ratio */
              className="w-auto h-auto max-h-100 md:max-h-112.5 max-w-full object-contain drop-shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>

          {/* Tag Cloud: Centered pill-style labels */}
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-black/5 text-tag-text font-sans text-[13px] md:text-[14px] px-3 py-1.5 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </Link>

      {/* 2. EXTERNAL METADATA: Title and description placed below the card */}
      <div className="mt-7.5 w-full px-0">
        
        <div className="flex items-start justify-between mb-1">
            <h2 className="text-white text-[28px] md:text-[32px] font-bold leading-none">
              {title} 
            </h2>
        </div>

        <p className="text-text-secondary text-[16px] md:text-[18px] leading-relaxed w-full">
          {description}
        </p>
      </div>

    </div>
  );
}

export default ProjectCard;