import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TacticalBackground = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden rounded-[40px]">
            {/* 1. The Dot Grid Layer */}
            <motion.div
                className="absolute -inset-[100%]"
                style={{
                    // Tactical Orange Dark dots
                    backgroundImage: 'radial-gradient(#ea580c 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px',
                    width: '300%',
                    height: '300%',
                    willChange: 'transform'
                }}
                animate={shouldReduceMotion ? {} : {
                    x: ["0%", "-5%"],
                    y: ["0%", "-5%"]
                }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            />

            {/* 2. The Soft Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />

            {/* 3. Subtle Animated Glows */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f97316] rounded-full blur-[120px] opacity-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

export default TacticalBackground;
