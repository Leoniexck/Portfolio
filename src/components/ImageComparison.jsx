import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Simple side-by-side grid for comparing design variations or grids
export default function ImageComparison({ items, accentColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {items.map((item, index) => (
                <div 
                    key={index}
                    className="group relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in bg-[#111] hover:border-white/20 transition-colors duration-500"
                    onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
                >
                    <img src={item.src} alt={item.alt} className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
                    
                    {/* Hover Zoom Prompt UI */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 border border-white/20 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                        </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.labelColor || accentColor }} />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/5">{item.label}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <Lightbox open={isOpen} close={() => setIsOpen(false)} index={photoIndex} slides={items.map(item => ({ src: item.src }))} />
    </section>
  );
}