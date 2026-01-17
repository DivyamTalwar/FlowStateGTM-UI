import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, PenTool, Video, Users, Trophy, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * CourseFlow Section - SaaS Feature Showcase
 * Animated arrows connecting feature cards with tactical orange theme
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

// --- Feature Card Component ---
const FeatureCard = ({ children, className = "", bgColor = "bg-white" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
                y: -8,
                scale: 1.01,
                boxShadow: "12px 12px 0px rgba(0,0,0,0.08)"
            }}
            className={`
        border-[3px] border-black rounded-3xl overflow-hidden
        shadow-[6px_6px_0px_rgba(0,0,0,0.06)]
        transition-all duration-500
        ${bgColor}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

// --- UI Tile Component (Floating Cards) ---
const UITile = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            animate={{
                y: [0, -6, 4, -3, 0],
                rotate: [0, 1, -0.5, 0.5, 0],
                x: [0, 2, -1, 1, 0]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className={`
        bg-white border-2 border-gray-200 rounded-2xl
        shadow-[0_4px_12px_rgba(0,0,0,0.03)]
        transition-transform duration-500
        ${className}
      `}
        >
            {children}
        </motion.div>
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

// --- Bar Chart Component ---
const BarChart = ({ isVisible }) => {
    const bars = [
        { height: "40%", label: "Jan" },
        { height: "65%", label: "Feb" },
        { height: "85%", label: "Mar", highlight: true },
        { height: "55%", label: "Apr" },
        { height: "70%", label: "May" },
    ];

    return (
        <div className="flex items-end justify-between h-32 gap-3 px-2">
            {bars.map((bar, i) => (
                <div key={i} className="w-full bg-gray-100 rounded-t-lg relative group h-full flex items-end">
                    {bar.highlight && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap z-20 shadow-lg border-b-2 border-orange-500">
                            $12.5k
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        </div>
                    )}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isVisible ? { height: bar.height } : {}}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className={`
              w-full rounded-t-lg transition-colors
              ${bar.highlight
                                ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                                : 'bg-orange-200/60 group-hover:bg-orange-500/40'
                            }
            `}
                    />
                    <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs ${bar.highlight ? 'font-bold text-gray-800' : 'text-gray-400'}`}>
                        {bar.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

// --- Leaderboard Row Component ---
const LeaderboardRow = ({ rank, name, avatar, change, delay }) => {
    const ChangeIcon = change > 0 ? ArrowUp : change < 0 ? ArrowDown : null;
    const changeColor = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-500' : 'text-gray-400';

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                <span className="font-bold text-gray-400 w-4">{rank}</span>
                <img src={avatar} alt={name} className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200" />
                <span className="font-semibold text-sm">{name}</span>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${changeColor}`}>
                {ChangeIcon && <ChangeIcon className="w-3 h-3" />}
                {change !== 0 ? Math.abs(change) : '-'}
            </div>
        </motion.div>
    );
};

// --- Main Component ---
export default function CourseFlow() {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const row3Ref = useRef(null);

    const row1InView = useInView(row1Ref, { once: true, margin: "-25%" });
    const row2InView = useInView(row2Ref, { once: true, margin: "-25%" });
    const row3InView = useInView(row3Ref, { once: true, margin: "-25%" });

    return (
        <section className="relative py-12 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&family=Plus+Jakarta+Sans:wght@400;600&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

            <TacticalBackground />

            <main className="relative z-10 w-full max-w-6xl px-6 py-12 lg:px-12 lg:py-16 mx-auto bg-[#F8D6B3] rounded-[40px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">

                {/* ROW 1: BUILD COURSES */}
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
                        <FeatureCard bgColor="bg-[#fff7ed]" className="p-6 aspect-[4/3] flex items-center justify-center relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-60 -mr-10 -mt-10" />
                            <div className="grid grid-cols-1 gap-4 w-full max-w-xs relative z-10">
                                <UITile delay={0} className="p-4 flex items-center gap-4 -rotate-2">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 border border-orange-200">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">01. FlowScan</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <Video className="w-3 h-3" /> Establish Baseline
                                        </div>
                                    </div>
                                </UITile>
                                <UITile delay={2} className="p-4 flex items-center gap-4 rotate-2 ml-8">
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 border border-orange-100">
                                        <PenTool className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">02. Signal Layer</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <Users className="w-3 h-3" /> Turn on calm signals
                                        </div>
                                    </div>
                                </UITile>
                            </div>
                        </FeatureCard>
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

                {/* ROW 2: ANALYTICS */}
                <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                    <div className="order-1">
                        <FeatureCard bgColor="bg-[#f0fdf4]" className="p-6 aspect-[4/3] flex items-end justify-center">
                            <UITile delay={5} className="w-full max-w-sm p-6 pb-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-gray-800">Weekly Clarity</h4>
                                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-md">+24%</span>
                                </div>
                                <BarChart isVisible={row2InView} />
                            </UITile>
                        </FeatureCard>
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

                {/* ROW 3: LEADERBOARD */}
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
                        <FeatureCard bgColor="bg-[#f5f3ff]" className="p-6 aspect-[4/3] flex items-center justify-center">
                            <UITile delay={0} className="w-full max-w-xs overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <h4 className="font-bold text-gray-900">Top Signals This Week</h4>
                                    <Trophy className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="p-2">
                                    <LeaderboardRow
                                        rank={1}
                                        name="Sarah Jenkins"
                                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                        change={2}
                                        delay={0.1}
                                    />
                                    <LeaderboardRow
                                        rank={2}
                                        name="Competitor Repositioned"
                                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                                        change={0}
                                        delay={0.2}
                                    />
                                    <LeaderboardRow
                                        rank={3}
                                        name="Procurement Clause Trending"
                                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack"
                                        change={-1}
                                        delay={0.3}
                                    />
                                </div>
                            </UITile>
                        </FeatureCard>
                    </div>
                </div>

            </main>
        </section>
    );
}
