import { motion } from 'framer-motion';
import Reveal from './Reveal';

// Robust video wrapper with hover effects and optional editorial captions
export default function VideoContainer({ src, poster, caption }) {
  return (
    <div className="w-full max-w-360 mx-auto px-5 md:px-12.5 py-20">
      <Reveal once={true}>
        <div className="relative mx-auto w-full max-w-250 border border-[#1A1A1A] rounded-[20px] overflow-hidden shadow-2xl bg-[#050505]">
          <motion.video
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.7 }}
            className="w-full h-auto object-cover block shadow-lg cursor-pointer"
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </motion.video>
        </div>

        {caption && <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">{caption}</p>}
      </Reveal>
    </div>
  );
}