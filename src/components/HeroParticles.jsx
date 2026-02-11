import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function HeroParticles({ accentColor = "#FFFFFF" }) {
    const particles = useMemo(() => {
        // Generates 40 particle objects with randomized properties
        return Array.from({ length: 40 }).map((_, i) => {
            const size = Math.random() * 2 + 0.5;
            const baseOpacity = Math.random() * 0.4 + 0.1;
            const duration = Math.random() * 20 + 20;
            
            return {
                id: i,
                x: Math.random() * 100, // Horizontal start position (%)
                y: Math.random() * 100, // Vertical start position (%)
                size: size,
                baseOpacity: baseOpacity,
                duration: duration,
                // Negative delay makes particles appear mid-animation on mount
                delay: Math.random() * -duration, 
            };
        });
    }, []); // useMemo prevents re-generating particles on every re-render

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: accentColor,
                        // Creates a glowing "soft light" effect around each dot
                        boxShadow: `0 0 ${particle.size * 4}px ${accentColor}`,
                        opacity: particle.baseOpacity,
                        willChange: "transform, opacity" // Performance optimization for animations
                    }}
                    animate={{
                        y: [0, -120, 0], // Continuous vertical float loop
                        opacity: [particle.baseOpacity, particle.baseOpacity * 1.3, particle.baseOpacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}