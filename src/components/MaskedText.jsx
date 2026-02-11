import { motion } from 'framer-motion';

export default function MaskedText({ text, delay = 0 }) {
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        className="text-[12vw] md:text-[130px] font-bold leading-[0.9] tracking-tighter text-white"
      >
        {text}
      </motion.h1>
    </div>
  );
}