import Reveal from './Reveal';
import DetailItem from './DetailItem';

export default function ProjectOverview({ description, details, accentColor }) {
  return (
    <Reveal once={true}>
      {/* Grid: 1.5fr for text gives the description more visual weight than the details sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-y-16 gap-x-25 mb-45">
        
        {/* Main Content Area */}
        <div>
          <h3 
            className="text-[12px] uppercase tracking-widest font-bold mb-6 font-mono"
            style={{ color: accentColor }}
          >
            The Project
          </h3>
          <p className="text-[#B0B0B0] text-[18px] md:text-[22px] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Sidebar: Details list with a vertical separator on desktop */}
        <div className="flex flex-col gap-6 md:gap-8 text-[16px] md:text-[18px] border-l border-white/10 pl-0 md:pl-10">
          {details.map((item, index) => (
            <DetailItem 
                key={index} 
                label={item.label} 
                value={item.value} 
                accentColor={accentColor} 
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}