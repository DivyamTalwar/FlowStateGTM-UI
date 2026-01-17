import React, { useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * UPGRADED: Tactical Orange Edition with Animated Background
 * USAGE: Ensure framer-motion is installed.
 */

// --- Assets & Icons (Inline SVGs) ---

const IconCheck = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconGraph = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" />
        <path d="M7 16V12" strokeLinecap="round" />
        <path d="M12 16V8" strokeLinecap="round" />
        <path d="M17 16V10" strokeLinecap="round" />
    </svg>
);

const IconUsers = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21V19C22.9993 17.2118 21.832 15.6565 20.1428 15.1111" />
        <path d="M16 3.13C17.6896 3.67493 18.8569 5.23023 18.8576 7.01844C18.8569 8.80665 17.6896 10.362 16 10.9069" />
    </svg>
);

// --- Background Components ---

const TacticalBackground = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4F4F2]/40 to-[#F4F4F2]" />

            {/* 3. Subtle Animated Glows */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f97316] rounded-full blur-[120px] opacity-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// --- Internal Components ---

const WordReveal = ({ text, className = "", delay = 0 }) => {
    const words = text.split(" ");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className={`inline-block overflow-hidden pb-1 ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "110%", rotate: 2 }}
                    animate={isInView ? { y: "0%", rotate: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        ease: [0.2, 0.65, 0.3, 0.9],
                        delay: delay + i * 0.05,
                    }}
                    className="inline-block mr-[0.25em] origin-top-left"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const GaugeWidget = () => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-black/10 flex flex-col items-center justify-center w-32 h-32 relative overflow-hidden transform transition-transform duration-300" aria-label="Engagement Gauge showing 85%">
            <div className="absolute top-2 left-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Engagement</div>
            <div className="relative w-24 h-12 mt-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[10px] border-gray-100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                <motion.div
                    className="absolute top-0 left-0 w-24 h-24 rounded-full border-[10px] border-[#f97316]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', rotate: 180 }}
                    initial={{ rotate: 180 }}
                    whileInView={{ rotate: 180 + 150 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.4 }}
                />
            </div>
            <motion.div
                className="absolute bottom-[26px] left-1/2 w-1 h-10 origin-bottom"
                initial={{ rotate: -90, x: '-50%' }}
                whileInView={{ rotate: 60, x: '-50%' }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 30, damping: 10, delay: 0.6 }}
            >
                <motion.div
                    className="w-full h-full bg-black rounded-full"
                    animate={{ rotate: [0, 4, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
            </motion.div>
            <div className="absolute bottom-[22px] left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2" />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="mt-1 text-xl font-black font-anton"
            >
                85%
            </motion.div>
        </div>
    );
};

const PulsingBadge = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            variants={{ hover: { scale: 1.05, rotate: -2 } }}
        >
            <motion.div className="w-2 h-2 rounded-full bg-[#FF4000] relative">
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF4000]"
                    animate={shouldReduceMotion ? {} : { opacity: [0.5, 0], scale: [1, 2.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-wide">Live Now</span>
        </motion.div>
    );
};

// --- Main Card Component ---

const Card = ({ children, bgColor, className = "", delay = 0 }) => {
    const shouldReduceMotion = useReducedMotion();
    const floatParams = useMemo(() => ({
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 2,
        yOffset: -3 - Math.random() * 3,
    }), []);

    const cardVariants = {
        offscreen: { y: 60, opacity: 0, scale: 0.9, rotateX: 10 },
        onscreen: {
            y: 0, opacity: 1, scale: 1, rotateX: 0,
            transition: { type: "spring", stiffness: 60, damping: 18, mass: 1.2, delay: delay }
        },
        hover: {
            y: -12, rotate: -1, scale: 1.015,
            boxShadow: "14px 18px 0px #FF4000",
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, margin: "-10%" }}
            variants={cardVariants}
            className={`relative group flex flex-col justify-between border-[1.5px] border-black rounded-lg p-6 lg:p-8 overflow-hidden h-full ${className} transform-gpu perspective-1000`}
            style={{ backgroundColor: bgColor, boxShadow: "8px 8px 0px #0b0b0b" }}
        >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={shouldReduceMotion ? {} : { y: [0, floatParams.yOffset, 0] }}
                transition={{ duration: floatParams.duration, repeat: Infinity, ease: "easeInOut", delay: floatParams.delay }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
                <motion.div className="h-full flex flex-col justify-between" variants={{ hover: { y: -4, transition: { type: "spring", stiffness: 200 } } }}>
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- Main Layout Component ---

export default function BenefitsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative w-full py-12 lg:py-16 overflow-hidden selection:bg-[#f97316] selection:text-white" style={{ backgroundColor: 'transparent' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

            {/* Animated Background Layer */}
            <TacticalBackground />

            <div className="relative max-w-[1140px] mx-auto z-10 bg-[#F4F4F2] rounded-[40px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] px-6 py-12 lg:px-12 lg:py-16">
                <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mb-8 cursor-default"
                    >
                        <span className="relative inline-block px-5 py-1.5 bg-[#ffedd5] border border-black rounded-full text-xs font-extrabold tracking-widest uppercase shadow-[3px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                            <motion.div
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                                animate={{ translateX: ["150%", "-150%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                            Benefit
                        </span>
                    </motion.div>

                    <h2 className="font-anton text-[32px] leading-[0.95] md:text-5xl lg:text-[56px] text-[#0b0b0b] uppercase tracking-tight mb-4">
                        <div className="block"><WordReveal text="You don’t need more dashboards." /></div>
                        <div className="relative inline-block">
                            <WordReveal text="You need direction." delay={0.25} />
                            <motion.svg
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.8 }}
                                className="absolute -bottom-2 left-0 w-full h-3 text-[#FF4000] -z-10"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </motion.svg>
                        </div>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="font-body text-[#7a7a7a] text-base max-w-2xl mx-auto leading-relaxed"
                    >
                        FlowState turns market and compliance change into calm, actionable navigation — so GTM stays in flow even when the market isn't.
                    </motion.p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-fr">
                    <div className="col-span-1 lg:col-span-8">
                        <Card bgColor="#ffedd5" className="min-h-[260px]" delay={0.1}>
                            <div className="flex flex-col md:flex-row h-full justify-between gap-6">
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4"><PulsingBadge /></div>
                                        <h3 className="font-anton text-2xl lg:text-3xl text-black uppercase mb-3">Know what changed</h3>
                                        <p className="font-body text-[#5e5e5e] leading-relaxed">FlowState detects shifts across your GTM world and converts them into clear moves (messaging, enablement, targeting, deal risk plays).</p>
                                    </div>
                                    <div className="mt-8 flex gap-2">
                                        <motion.div variants={{ hover: { y: -5, scale: 1.1 } }} className="bg-black/5 p-2 rounded-lg cursor-pointer"><IconUsers /></motion.div>
                                        <motion.div variants={{ hover: { y: -5, scale: 1.1, transition: { delay: 0.05 } } }} className="bg-black/5 p-2 rounded-lg cursor-pointer"><IconCheck /></motion.div>
                                    </div>
                                </div>
                                <div className="hidden md:flex flex-1 items-center justify-center relative perspective-500">
                                    <motion.div animate={{ rotate: [2, 4, 2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-white/30 rounded-lg" />
                                    <motion.div className="relative bg-white border border-black rounded-lg p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] w-48" animate={{ rotate: [-2, -4, -2], y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} variants={{ hover: { rotate: 2, y: -10, scale: 1.02, transition: { type: "spring", stiffness: 200 } } }}>
                                        <div className="h-2 w-16 bg-gray-200 rounded mb-3" />
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-200" /><div className="h-2 w-24 bg-gray-100 rounded" /></div>
                                            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-green-100 border border-green-200" /><div className="h-2 w-20 bg-gray-100 rounded" /></div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <Card bgColor="#ffffff" className="min-h-[260px]" delay={0.2}>
                            <div className="h-full flex flex-col">
                                <motion.div className="w-12 h-12 bg-[#ffedd5] rounded-full border border-black flex items-center justify-center mb-6 shadow-[2px_2px_0px_#000]" variants={{ hover: { scale: 1.1, rotate: 15, transition: { type: "spring", stiffness: 300 } } }}><IconGraph /></motion.div>
                                <h3 className="font-anton text-2xl text-black uppercase mb-3">Calm &gt; chaos</h3>
                                <p className="font-body text-[#5e5e5e] flex-1 leading-relaxed">No noisy alert storms. Just the few signals that change decisions.</p>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <Card bgColor="#ffffff" className="min-h-[220px]" delay={0.25}>
                            <div className="flex flex-col h-full justify-between">
                                <div><h3 className="font-anton text-2xl text-black uppercase mb-3">Operator-grade</h3><p className="font-body text-[#5e5e5e] leading-relaxed">Concise, decisive briefs written for leaders who need clarity, fast.</p></div>
                                <div className="mt-6 border border-gray-200 rounded p-2 bg-gray-50 flex gap-1 shadow-sm">
                                    <div className="h-8 w-8 bg-purple-100 rounded border border-purple-200" />
                                    <div className="flex-1 space-y-1 py-1"><motion.div initial={{ width: "10%" }} whileInView={{ width: "75%" }} transition={{ duration: 1, delay: 0.5 }} className="h-2 bg-gray-200 rounded" /><div className="h-2 bg-gray-200 rounded w-1/2" /></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        <Card bgColor="#fed7aa" className="min-h-[220px]" delay={0.35}>
                            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                                <div className="flex-1"><h3 className="font-anton text-2xl lg:text-3xl text-black uppercase mb-3">Compliance-aware GTM</h3><p className="font-body text-[#5e5e5e] leading-relaxed">Bring compliance signals into GTM early — before they stall revenue.</p></div>
                                <div className="flex-none"><motion.div variants={{ hover: { scale: 1.05, y: -5 } }}><GaugeWidget /></motion.div></div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        <Card bgColor="#ffedd5" className="min-h-[220px]" delay={0.4}>
                            <div className="relative z-10">
                                <motion.div className="inline-block bg-black text-[#f97316] text-xs font-bold px-2 py-1 mb-4 uppercase tracking-wider" variants={{ hover: { scale: 1.05, x: 2 } }}>New Feature</motion.div>
                                <h3 className="font-anton text-2xl lg:text-3xl text-black uppercase mb-3">Signal Packs</h3>
                                <p className="font-body text-black max-w-md leading-relaxed font-medium">Turn on the signal types you care about: competitor moves, regulatory triggers, procurement friction, churn risk, and messaging drift.</p>
                            </div>
                            <motion.div className="absolute right-0 bottom-0 opacity-10" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} variants={{ hover: { scale: 1.1, opacity: 0.15 } }}>
                                <svg width="200" height="200" viewBox="0 0 200 200"><circle cx="150" cy="150" r="80" stroke="black" strokeWidth="40" fill="none" strokeDasharray="20 10" /></svg>
                            </motion.div>
                        </Card>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <Card bgColor="#ffffff" className="min-h-[220px]" delay={0.5}>
                            <div className="flex flex-col h-full justify-between">
                                <div><h3 className="font-anton text-2xl text-black uppercase mb-3">One shared truth</h3><p className="font-body text-[#5e5e5e] leading-relaxed">Sales, marketing, and leadership stay aligned on what’s happening.</p></div>
                                <div className="mt-4 flex -space-x-2 pl-2">
                                    {[1, 2, 3].map((i) => (<motion.div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold shadow-sm" whileHover={{ y: -8, x: 2, zIndex: 10, scale: 1.1 }}>{i === 3 ? '+' : ''}</motion.div>))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section >
    );
}
