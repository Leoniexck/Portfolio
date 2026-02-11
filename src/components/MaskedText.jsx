import { motion } from 'framer-motion';

export default function MaskedText({ text, delay = 0 }) {
  return (
    /* The 'overflow-hidden' container acts as the mask */
    <div className="overflow-hidden">
      <motion.h1
        // Starts below the mask (y: "110%" ensures it is fully hidden)
        initial={{ y: "110%" }}
        // Animates up into its natural position
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        // tracking-tighter and tight leading create the modern 'editorial' aesthetic
        className="text-[12vw] md:text-[130px] font-bold leading-[0.9] tracking-tighter text-white"
      >
        {text}
      </motion.h1>
    </div>
  );
}