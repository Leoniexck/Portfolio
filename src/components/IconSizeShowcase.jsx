export default function IconSizeShowcase({ groups }) {
  return (
    <div className="w-full max-w-250 mx-auto px-5 mb-24">
      {/* Card Wrapper with technical styling */}
      <div className="w-full rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
        {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="border-b border-white/10 last:border-0">
                
                {/* Variant Header (e.g. "Primary Variant") */}
                <div className="px-8 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/70">{group.label}</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                    </div>
                </div>

                {/* Grid Layout for actual pixel size comparison */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                    {group.items.map((item, i) => (
                        <div key={i} className="group relative flex flex-col items-center justify-center p-8 md:p-10 gap-6 hover:bg-white/5 transition-colors">
                            
                            {/* Icon Slot with hovering technical crosshairs */}
                            <div className="w-16 h-16 flex items-center justify-center relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="w-full h-px bg-[#C3641A]/20 absolute" />
                                    <div className="h-full w-px bg-[#C3641A]/20 absolute" />
                                </div>

                                {/* Rendered Icon at 1:1 scale */}
                                <img src={item.src} alt={`${item.size}px icon`} style={{ width: item.size, height: item.size }} className="relative z-10 object-contain drop-shadow-lg" />
                            </div>

                            {/* Metadata labels */}
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-mono text-sm font-medium text-white/90">{item.size}px</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-wider">Size</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}