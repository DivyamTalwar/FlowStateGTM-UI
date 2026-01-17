import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const faqData = [
    {
        id: 1,
        question: "What do I get from FlowScan?",
        answer: "A strategy-grade baseline: ICP + positioning clarity, competitive narrative, GTM friction map, and a 30/60/90 action plan."
    },
    {
        id: 2,
        question: "What is GTM Brain?",
        answer: "GTM Brain is the always-on signal layer. It tracks what changes and delivers a calm weekly brief with recommended moves."
    },
    {
        id: 3,
        question: "Is this a tool or a service?",
        answer: "It's productized intelligence. We start with FlowScan, then evolve the brain with you as signals prove value."
    },
    {
        id: 4,
        question: "What markets is FlowState built for?",
        answer: "Teams selling in complex environments: regulated markets, long cycles, security reviews, and enterprise procurement."
    },
    {
        id: 5,
        question: "Do you integrate with CRM and tools?",
        answer: "Yes. Early builds focus on light workflows. Integrations (Slack/HubSpot/Salesforce) can be enabled as needed."
    },
    {
        id: 6,
        question: "Can I cancel anytime?",
        answer: "Yes. Monthly plans are flexible. As usage and signal packs expand, pricing tiers can evolve with you."
    }
];

// --- COMPONENT: Tactical Background ---
const TacticalBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
            {/* 1. The Dot Grid Layer - Animated */}
            <motion.div
                className="absolute -inset-[100%]"
                style={{
                    // Tactical Orange Dark dots (#ea580c)
                    backgroundImage: 'radial-gradient(#ea580c 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px',
                    width: '300%',
                    height: '300%',
                    willChange: 'transform'
                }}
                animate={{
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
            {/* Blends into the off-white/pinkish background specified earlier */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf6f7]/50 to-[#fbf6f7]" />
        </div>
    );
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8
        }
    },
};

const springTransition = {
    type: "spring",
    stiffness: 220,
    damping: 25,
    mass: 1
};

// --- COMPONENT: Individual FAQ Card ---
const FaqItem = ({ item, isOpen, onClick }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            layout
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : {
                y: -8,
                rotate: -0.6,
                boxShadow: "16px 16px 0px 0px #000000, 0 6px 0 rgba(0,0,0,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className={`
        group relative w-full overflow-hidden
        bg-white border-4 border-black rounded-[2px]
        transition-colors duration-300
        ${isOpen ? 'z-10' : 'z-0'}
      `}
            style={{
                boxShadow: "10px 10px 0px 0px #000000, 0 6px 0 rgba(0,0,0,0.1)"
            }}
        >
            <button
                onClick={onClick}
                className="w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
            >
                <div className="flex items-center justify-between p-6 md:px-[28px] md:py-[24px]">
                    <span className="font-bold uppercase tracking-tight text-black text-[clamp(16px,2.2vw,20px)] leading-tight pr-4">
                        {item.question}
                    </span>

                    {/* Tactical Orange Chevron Button */}
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={springTransition}
                        className="flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-[#f97316] border-[3px] border-[#ea580c] shadow-sm group-hover:scale-105 group-hover:bg-[#FF4000] active:scale-95 transition-all duration-300"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: springTransition,
                                opacity: { duration: 0.3, delay: 0.1 }
                            }
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: { ...springTransition, stiffness: 250, damping: 30 },
                                opacity: { duration: 0.2 }
                            }
                        }}
                        className="overflow-hidden bg-white"
                    >
                        <div className="px-6 md:px-[28px] pb-8 pt-0">
                            <motion.div
                                initial={{ y: 12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                                className="text-[#404040] text-[15px] md:text-[16px] leading-relaxed font-[Poppins]"
                            >
                                {item.answer}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full py-12 px-4 md:px-8 overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600&display=swap');
        
        .font-display {
          font-family: 'Anton', 'Bebas Neue', sans-serif;
        }
      `}</style>


            <div className="relative max-w-7xl mx-auto flex flex-col items-center">

                {/* Header Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 20,
                        duration: 0.8
                    }}
                    className="flex flex-col items-center text-center mb-16 max-w-4xl"
                >
                    {/* Badge - Tactical Orange with Accent Shadow */}
                    <div className="mb-6 px-4 py-1 rounded-full border-2 border-black bg-[#f97316] shadow-[2px_2px_0px_0px_#FF4000]">
                        <span className="text-xs font-bold uppercase tracking-widest text-black">FAQ</span>
                    </div>

                    <h2 className="font-display text-black text-[clamp(36px,8vw,88px)] leading-[0.95] tracking-tight md:-tracking-[1px] uppercase drop-shadow-sm">
                        Frequently Asked<br />Questions
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-6 max-w-[720px] text-[#8e8e8e] font-[Poppins] text-base md:text-lg leading-relaxed"
                    >
                        Simple answers for a product that evolves with you.
                    </motion.p>
                </motion.div>

                {/* Cards Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full max-w-[860px] flex flex-col gap-[22px]"
                >
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={item.id}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </motion.div>

                <div className="h-20" />
            </div>
        </section>
    );
}
