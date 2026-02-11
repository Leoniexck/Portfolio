import Reveal from './Reveal';

export default function ProjectOutcome({ text, accentColor }) {
  return (
    /* Large vertical margins (mt-50, mb-30) give the outcome room to breathe */
    <div className="mt-50 mb-30">
      <Reveal once={true}>
         <div className="max-w-3xl mx-auto text-center px-4">
           
           {/* Section Label: Small, bold, and color-coded for categorization */}
           <h3 className="text-[12px] uppercase tracking-widest font-bold mb-8 font-mono" style={{ color: accentColor }}>
             The Outcome
           </h3>

           {/* The Core Message: Large, light-weight typography for a premium feel */}
           <p className="text-[24px] md:text-[36px] text-white leading-tight font-light">
             "{text}"
           </p>
         </div>
      </Reveal>
    </div>
  );
}