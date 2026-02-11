import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function EditorialTextSection({ number, title, text }) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[50px] py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* LINKE SEITE: Nummer (Orange), Titel und neutraler Strich */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <Reveal once={true}>
            <div className="flex items-start gap-3 mb-4">
              {number && (
                // Die Zahl jetzt in einem kräftigen Orange
                <span className="font-mono text-sm md:text-base text-[#FF8C00] mt-1 tracking-tighter">
                  {number}
                </span>
              )}
              {/* Titel-Größe konsistent zum SectionHeader */}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
                {title}
              </h2>
            </div>

            {/* Der Strich – dezent und neutral (leicht transparentes Weiß/Grau) */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[1px] bg-white/10" 
            />
          </Reveal>
        </div>

        {/* RECHTE SEITE: Der nach rechts verschobene Fließtext */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-start">
          <Reveal delay={0.2} once={true}>
            {/* Schriftgröße und Farbe wie in ProjectOverview */}
            <p className="text-[#B0B0B0] text-base md:text-lg leading-relaxed">
              {text}
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}