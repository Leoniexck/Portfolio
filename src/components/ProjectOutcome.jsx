import Reveal from './Reveal';

export default function ProjectOutcome({ text, accentColor }) {
  return (
    <div className="mt-[200px] mb-[120px]">
      <Reveal once={true}>
         <div className="max-w-3xl mx-auto text-center px-4">
           <h3 className="text-[12px] uppercase tracking-widest font-bold mb-8 font-mono" style={{ color: accentColor }}>
             The Outcome
           </h3>
           <p className="text-[24px] md:text-[36px] text-white leading-tight font-light">
             "{text}"
           </p>
         </div>
      </Reveal>
    </div>
  );
}