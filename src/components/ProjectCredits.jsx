import Reveal from './Reveal';

export default function ProjectCredits({ items, accentColor }) {
  return (
    /* Wraps the entire section in a reveal animation (fades/slides in once) */
    <Reveal once={true}>
       <div className="mb-16 flex flex-col md:flex-row gap-10 md:items-start md:justify-between">
          
          {/* Section Heading with an absolute-positioned index number */}
          <div className="relative">
             <span className="absolute -top-6 left-0 text-[12px] font-mono" style={{ color: accentColor }}>
               07
             </span>
             <h2 className="text-[42px] md:text-[64px] font-bold leading-[0.9] tracking-tight text-white">
               Credits
             </h2>
          </div>

          {/* Credits Grid: Aligns right on desktop for a balanced layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 md:text-right">
             {items.map((group, index) => (
                 <div key={index}>
                    {/* Role/Category Label (e.g., "Photography" or "Special Thanks") */}
                    <h4 className="text-[12px] font-mono uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                      {group.title}
                    </h4>
                    
                    {/* List of people within this specific category */}
                    {group.people.map((person, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                            <p className="text-[20px] md:text-[24px] text-white font-medium">
                              {person.name}
                            </p>
                            {person.role && (
                              <p className="text-[#666] text-sm mt-1">{person.role}</p>
                            )}
                        </div>
                    ))}
                 </div>
             ))}
          </div>
       </div>
    </Reveal>
  );
}