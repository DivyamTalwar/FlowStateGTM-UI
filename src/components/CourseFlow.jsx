import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * CourseFlow Section - SaaS Feature Showcase
 * Animated arrows connecting feature cards with tactical orange theme
 * Added "Runtime" Animations to static mockups
 */

// --- Tactical Background Component ---
const TacticalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
            {/* Animated Dot Grid */}
            <motion.div
                className="absolute -inset-1/2"
                style={{
                    backgroundImage: 'radial-gradient(#ea580c 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px',
                    width: '300%',
                    height: '300%',
                }}
                animate={{
                    x: ["0%", "-10%"],
                    y: ["0%", "-10%"]
                }}
                transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF7ED]/50 to-[#FFF7ED]" />
        </div>
    );
};

// --- Sketch Arrow SVG Component ---
const SketchArrow = ({ path, id, isVisible }) => {
    return (
        <motion.path
            d={path}
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd={`url(#${id})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? {
                pathLength: 1,
                opacity: 0.9,
            } : {}}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{
                filter: "drop-shadow(0px 0px 4px rgba(249, 115, 22, 0.4))"
            }}
        />
    );
};

// --- RUNTIME ANIMATION OVERLAYS ---

// 1. Diagnostic Map: Circular Radar Sweep (Looking for stuck points)
const DiagnosticRadarOverlay = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
        <motion.div
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 origin-center"
            style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 340deg, rgba(234,88,12, 0.1) 360deg)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Central Pulse */}
        <motion.div
            className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/30"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
    </div>
);

// 2. Route Risk: Warning Pulse (Alerting user to risk)
const RiskPulseOverlay = () => (
    <div className="absolute inset-0 pointer-events-none rounded-3xl z-20">
        {/* Warning Pulse Vignette */}
        <motion.div
            className="absolute inset-0 bg-orange-500/10 mix-blend-overlay"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Dashed Path (Simulated) */}
        <div className="absolute top-[55%] left-[10%] right-[10%] h-[2px] overflow-hidden">
            <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </div>
    </div>
);

// 3. Weekly Signals: Focus/Execution Check
const ExecutionShimmerOverlay = () => (
    <div className="absolute inset-0 pointer-events-none rounded-3xl z-20 overflow-hidden">
        {/* Button Shimmer (Stronger) */}
        <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[12%] rounded-md overflow-hidden">
            <motion.div
                className="w-full h-full bg-white/40 -skew-x-12"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />
        </div>

        {/* "Success" Particles (Subtle float up) */}
        <motion.div
            className="absolute bottom-[20%] right-[20%] w-2 h-2 bg-green-400 rounded-full"
            animate={{ y: -50, opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
            className="absolute bottom-[25%] right-[25%] w-1.5 h-1.5 bg-orange-400 rounded-full"
            animate={{ y: -40, opacity: [1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
        />
    </div>
);


// --- Main Component ---
export default function CourseFlow() {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const row3Ref = useRef(null);

    const row1InView = useInView(row1Ref, { once: true, margin: "-25%" });
    const row2InView = useInView(row2Ref, { once: true, margin: "-25%" });

    return (
        <section className="relative py-12 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&family=Plus+Jakarta+Sans:wght@400;600&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

            <TacticalBackground />

            <main className="relative z-10 w-full max-w-6xl px-6 py-12 lg:px-12 lg:py-16 mx-auto bg-[#F8D6B3] rounded-[40px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">

                {/* ROW 1: DIAGNOSTIC MAP (UNLOCK MOMENTUM) */}
                <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1 space-y-4 max-w-md"
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-[1.1]">
                            How FlowState <br />
                            <span className="text-orange-500">Works</span>
                        </h2>
                        <p className="font-body text-gray-600 text-base leading-relaxed">
                            A strategy-grade diagnostic that maps what’s working, what’s stuck, and the few moves that unlock momentum.
                        </p>
                        <div className="pt-2">
                            <motion.button
                                whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(255, 64, 0, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                className="font-bold text-sm px-8 py-3 rounded-full bg-orange-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.3)] transition-all"
                            >
                                Run a FlowScan →
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative rounded-3xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] group bg-white"
                        >
                            {/* ANIMATION: Radar Sweep for Diagnostic */}
                            <DiagnosticRadarOverlay />

                            <img
                                src="/images/ui_diagnostic_map.png"
                                alt="GTM Diagnostic Map Network Graph"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-500 mix-blend-overlay" />
                        </motion.div>
                    </div>
                </div>

                {/* ARROW 1 */}
                <div className="absolute inset-x-0 top-[12%] hidden md:block h-[600px] pointer-events-none z-30">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg viewBox="0 0 1200 600" className="w-full h-full overflow-visible">
                            <defs>
                                <marker id="arrowhead1" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                                    <polygon points="0 0, 12 4, 0 8" fill="#ea580c" />
                                </marker>
                            </defs>
                            <SketchArrow
                                path="M 880,140 C 780,140 700,50 600,150 C 500,250 250,150 350,300 C 400,380 520,380 480,440 C 460,470 440,480 420,490"
                                id="arrowhead1"
                                isVisible={row1InView}
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* ROW 2: ROUTE RISK (SIGNAL LAYER) */}
                <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                    <div className="order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative rounded-3xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] group bg-white"
                        >
                            {/* ANIMATION: Risk Warning Pulse */}
                            <RiskPulseOverlay />

                            <img
                                src="/images/ui_route_risk.png"
                                alt="GTM Route Timeline with Risk Alert"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-500 mix-blend-overlay" />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 space-y-4 max-w-md md:pl-8"
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-[1.1]">
                            Signal.<br />Decide.<br />
                            <span className="text-orange-500">Move.</span>
                        </h2>
                        <p className="font-body text-gray-600 text-base leading-relaxed">
                            Your GTM route updates in real time. FlowState highlights delays, detours, and risk ahead — without drowning you in noise.
                        </p>
                    </motion.div>
                </div>

                {/* ARROW 2 */}
                <div className="absolute inset-x-0 top-[52%] hidden md:block h-[500px] pointer-events-none z-30">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg viewBox="0 0 1200 500" className="w-full h-full overflow-visible">
                            <defs>
                                <marker id="arrowhead2" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                                    <polygon points="0 0, 12 4, 0 8" fill="#ea580c" />
                                </marker>
                            </defs>
                            <SketchArrow
                                path="M 350,80 C 350,250 500,150 550,220 C 580,260 480,300 520,350 C 560,400 680,150 700,180 C 720,210 730,220 740,240"
                                id="arrowhead2"
                                isVisible={row2InView}
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* ROW 3: WEEKLY SIGNALS (NAVIGATION) */}
                <div ref={row3Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1 space-y-4 max-w-md"
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-[1.1]">
                            Stay ahead with <br />
                            <span className="text-orange-500">Calm signals</span>
                        </h2>
                        <p className="font-body text-gray-600 text-base leading-relaxed">
                            You don’t need 40 alerts a day. You need 3–5 signals a week that keep you aligned on focus, risk, and next moves.
                        </p>
                    </motion.div>
                    <div className="order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative rounded-3xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] group bg-white"
                        >
                            {/* ANIMATION: Execution Shimmer */}
                            <ExecutionShimmerOverlay />

                            <img
                                src="/images/ui_weekly_signals.png"
                                alt="Weekly Signals Card with 3 Focus Items"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-500 mix-blend-overlay" />
                        </motion.div>
                    </div>
                </div>

            </main>
        </section>
    );
}
