import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics: Damping and stiffness create a 'lagging' organic feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half the width/height (200px) to center the spotlight on the cursor
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-100 h-100 rounded-full pointer-events-none z-0 mix-blend-screen"
      style={{ 
        x, 
        y,
        // Radial gradient creates a soft falloff from the center
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}