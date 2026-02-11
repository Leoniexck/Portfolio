import Reveal from './Reveal';

export default function ProjectCredits({ items, accentColor }) {
  return (
    <Reveal once={true}>
       <div className="mb-16 flex flex-col md:flex-row gap-10 md:items-start md:justify-between">
          <div className="relative">
             <span className="absolute -top-6 left-0 text-[12px] font-mono" style={{ color: accentColor }}>07</span>
             <h2 className="text-[42px] md:text-[64px] font-bold leading-[0.9] tracking-tight text-white">
               Credits
             </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 md:text-right">
             {items.map((group, index) => (
                 <div key={index}>
                    <h4 className="text-[12px] font-mono uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                      {group.title}
                    </h4>
                    {group.people.map((person, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                            <p className="text-[20px] md:text-[24px] text-white font-medium">{person.name}</p>
                            {person.role && <p className="text-[#666] text-sm mt-1">{person.role}</p>}
                        </div>
                    ))}
                 </div>
             ))}
          </div>
       </div>
    </Reveal>
  );
}