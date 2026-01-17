import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import TacticalBackground from './TacticalBackground';

// --- Utility Helper ---
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Configuration ---
const STEPS = [
    {
        id: 1,
        pill: "FlowScan",
        title: "Establish your GTM baseline",
        body: "A strategy-grade diagnostic that maps what’s working, what’s stuck, and the few moves that unlock momentum.",
        cta: "Run a FlowScan →"
    },
    {
        id: 2,
        pill: "Signal Layer",
        title: "Turn on calm signals",
        body: "We monitor the changes that matter to your GTM — market, competitive, buyer, and compliance signals — and filter to what’s actionable.",
        cta: "Request access →"
    },
    {
        id: 3,
        pill: "Weekly Navigation",
        title: "Get the next move",
        body: "A calm weekly brief: what changed → what it means → what to do next. Written for operators, not dashboards.",
        cta: "See example brief →"
    },
    {
        id: 4,
        pill: "Iteration",
        title: "Improve GTM in flow",
        body: "Adjust weekly, learn fast, and miss less. FlowState keeps your GTM system aligned as reality changes.",
        cta: "Optimize GTM →"
    }
];

// --- Living Aura Component ---
const LivingAura = ({ active }) => (
    <AnimatePresence>
        {active && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 0.1,
                    scale: [1, 1.1, 1],
                    x: [0, 10, 0],
                    y: [0, -5, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -left-10 -top-10 w-48 h-48 bg-orange-400 rounded-full blur-[80px] pointer-events-none z-0"
            />
        )}
    </AnimatePresence>
);

// --- Sub-Components ---

const TimelineStep = ({ data, index, isLast }) => {
    const containerRef = useRef(null);
    const [hasTriggered, setHasTriggered] = useState(false);

    const isInView = useInView(containerRef, {
        margin: "-50% 0px -50% 0px"
    });

    useEffect(() => {
        if (isInView && !hasTriggered) {
            setHasTriggered(true);
        }
    }, [isInView, hasTriggered]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["center center", "end center"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.5,
        restDelta: 0.001
    });

    const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
    const yContent = useTransform(smoothProgress, [0, 1], [0, -10]);

    return (
        <div
            ref={containerRef}
            className="relative grid grid-cols-[30px_1fr] md:grid-cols-[50px_1fr] gap-6 md:gap-10 min-h-[30vh] last:min-h-0"
        >
            <div className="flex flex-col items-center relative">
                <div className="relative z-20">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#CC3300]"
                        initial={false}
                        animate={hasTriggered ? { scale: [1, 1.8], opacity: [0.4, 0] } : { scale: 1, opacity: 0 }}
                        transition={hasTriggered ? { duration: 2, repeat: Infinity, ease: "easeOut" } : {}}
                    />

                    <div className="relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-zinc-200 bg-white overflow-hidden shadow-lg">
                        <motion.div
                            className="absolute inset-0 bg-orange-600 z-0"
                            initial={{ scale: 0 }}
                            animate={hasTriggered ? { scale: 1 } : { scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ borderRadius: "50%" }}
                        />

                        <motion.span
                            className="relative z-10 text-[11px] md:text-base font-black font-mono tracking-tighter"
                            animate={hasTriggered ? "active" : "inactive"}
                            variants={{
                                inactive: { color: "#94A3B8" },
                                active: { color: "#FFFFFF" }
                            }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </motion.span>
                    </div>
                </div>

                {!isLast && (
                    <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+8vh)] bg-zinc-50 z-0 rounded-full overflow-hidden">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full relative"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-orange-600 via-[#CC3300] to-orange-600 shadow-[0_0_15px_rgba(204,51,0,0.5)]" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-white via-orange-400 to-transparent blur-[10px] opacity-90" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-white rounded-full z-10 shadow-[0_0_20px_white]" />
                        </motion.div>
                    </div>
                )}
            </div>

            <motion.div
                style={{ y: yContent }}
                className="relative flex flex-col items-start pt-1 pb-12 px-4 md:px-6"
            >
                <motion.div
                    className="relative z-10"
                    initial="hidden"
                    animate={hasTriggered ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -20, filter: "blur(10px)" },
                            visible: {
                                opacity: 1, x: 0, filter: "blur(0px)",
                                transition: { type: "spring", stiffness: 200, damping: 15 }
                            }
                        }}
                        className="mb-3"
                    >
                        <span className="px-3 py-1 text-[8px] md:text-[10px] font-bold tracking-[0.25em] text-[#CC3300] uppercase bg-zinc-950 border border-zinc-800 rounded-full shadow-lg">
                            {data.pill}
                        </span>
                    </motion.div>

                    <h3 className="text-2xl md:text-4xl font-black text-zinc-900 mb-4 tracking-tighter leading-[1.1] perspective-1000">
                        {data.title.split(" ").map((word, i) => (
                            <span key={i} className="inline-block mr-2 pb-1">
                                <motion.span
                                    className="inline-block origin-bottom-left"
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 30,
                                            rotateX: 80,
                                            scale: 0.9,
                                            filter: "blur(12px)"
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            rotateX: 0,
                                            scale: 1,
                                            filter: "blur(0px)",
                                            transition: {
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 18,
                                                mass: 1.2
                                            }
                                        }
                                    }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h3>

                    <motion.p
                        className="text-sm md:text-base leading-relaxed text-zinc-700 max-w-sm mb-6 font-medium"
                        variants={{
                            hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                            visible: {
                                y: 0, opacity: 1, filter: "blur(0px)",
                                transition: { duration: 0.6, ease: "easeOut" }
                            }
                        }}
                    >
                        {data.body}
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { scale: 0.8, opacity: 0, y: 10 },
                            visible: {
                                scale: 1, opacity: 1, y: 0,
                                transition: { type: "spring", stiffness: 400, damping: 20 }
                            }
                        }}
                    >
                        <button className="relative group flex items-center gap-2 px-6 py-3 text-[10px] md:text-[13px] bg-orange-600 text-white font-bold rounded-full overflow-hidden shadow-lg hover:bg-orange-700 transition-all active:scale-95">
                            <span className="relative z-10 uppercase tracking-widest">{data.cta}</span>
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default function VerticalTimeline() {
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-transparent py-20 px-4 md:px-8 overflow-hidden font-sans selection:bg-orange-200 selection:text-orange-900"
        >

            <div className="max-w-2xl mx-auto relative">

                {/* ONE COMPLETE RETRACTABLE BOX BACKGROUND (#FFEDEF) */}
                {/* Starts from the header till the end of the content */}
                <div
                    className="absolute right-0 left-10 md:left-14 top-[-40px] bottom-[-40px] bg-[#ffedd5] rounded-[40px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-0 origin-left"
                >
                    <TacticalBackground />
                </div>

                <div className="relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        >
                            <h2 className="text-[9px] md:text-[12px] font-bold tracking-[0.6em] text-[#CC3300] uppercase mb-2">The Process.</h2>
                            <p className="text-[34px] md:text-[54px] font-black tracking-tighter text-zinc-900 leading-tight">
                                FlowState System<span className="text-orange-600">.</span>
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative pb-24 space-y-4">
                        {STEPS.map((step, index) => (
                            <TimelineStep
                                key={step.id}
                                data={step}
                                index={index}
                                isLast={index === STEPS.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </section>
    );
}
