import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageGallery({ items }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Buttons für Navigation
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!items || items.length === 0) {
    return null;
  }

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    // 'touch-action-pan-y' sagt dem Browser: Hier darf vertikal gescrollt werden!
    <div className="w-full mt-10 relative group touch-pan-y">
      
      {/* --- BUTTON LINKS --- */}
      <button 
        ref={setPrevEl}
        className="absolute left-2 md:left-4 top-[45%] z-20 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 cursor-pointer disabled:opacity-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* --- BUTTON RECHTS --- */}
      <button 
        ref={setNextEl}
        className="absolute right-2 md:right-4 top-[45%] z-20 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 cursor-pointer disabled:opacity-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <Swiper
        modules={[Pagination, Mousewheel, Navigation]}
        navigation={{ prevEl, nextEl }}
        
        // --- HIER IST DER FIX FÜR DAS SCROLL-PROBLEM ---
        threshold={20}             // Ignoriert Wischen unter 20px (verhindert versehentliches Wackeln)
        touchAngle={45}            // Erlaubt vertikales Scrollen, wenn der Winkel > 45 Grad ist
        touchStartPreventDefault={false} // WICHTIG: Lässt den Browser entscheiden, ob gescrollt wird
        shortSwipes={false}        // Verhindert zu schnelles Auslösen bei kurzem Tippen
        longSwipes={true}
        longSwipesRatio={0.1}
        // ----------------------------------------------

        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={false}
        slidesPerView={1.1}
        spaceBetween={15}
        
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          1024: { slidesPerView: 2.5, spaceBetween: 40 },
          1400: { slidesPerView: 1.6, spaceBetween: 50 }
        }}

        speed={600}
        mousewheel={{ forceToAxis: true }} // Mausrad scrollt nur Galerie, wenn man wirklich horizontal scrollt
        grabCursor={true}
        
        pagination={{ clickable: true, dynamicBullets: false }}
        
        style={{
          "--swiper-pagination-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-color": "#5F5F5F",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          paddingBottom: "50px"
        }}
        
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col transition-opacity duration-300">
            <div 
              className="w-full rounded-[20px] overflow-hidden mb-[15px] shadow-2xl relative group/image cursor-zoom-in"
              onClick={() => handleImageClick(index)}
            >
               <img 
                  src={item.src} 
                  alt={item.caption} 
                  className="w-full h-auto transition-transform duration-500 group-hover/image:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-white/5 transition-colors duration-300 pointer-events-none" />
            </div>
            {item.caption && (
              <p className="text-[#BDC0C3] text-[14px] text-center leading-tight px-2 font-medium">
                {item.caption}
              </p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={items.map(item => ({ src: item.src }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </div>
  );
}