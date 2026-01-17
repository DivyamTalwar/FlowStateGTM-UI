import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Zap,
    Quote
} from 'lucide-react';

/**
 * HIGH-FIDELITY TACTICAL ORANGE TESTIMONIALS PAGE
 * Features:
 * 1. Founder Hero (Top Impact)
 * 2. Animated Testimonial Slider (Center Logic)
 * 3. Drifting Tactical Dot Grid Background
 */

// --- Design Tokens (THEME ACCURACY) ---
const COLORS = {
    primary: '#f97316',      // Tactical Orange 500
    primaryDark: '#ea580c',  // Tactical Orange 600
    accent: '#FF4000',       // Tactical Accent (Glow)
    bg: '#FFF7ED',           // Warm Cream Background
    textDark: '#1c1917',     // Stone 900
};

// --- Data ---
const REVIEWS = [
    {
        id: 1,
        name: "Sarah Chen",
        affiliation: "Operator at B2B SaaS",
        quote: "FlowState cut through weeks of uncertainty. We got a clear GTM plan — and a weekly signal loop that keeps us from drifting.",
        imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        thumbnailSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },

    {
        id: 2,
        name: "Marcus Thorne",
        affiliation: "Product Lead at CloudScale",
        quote: "Finding a team that understands both high-level UX and deep system architecture is rare. This team is that rarity.",
        imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        thumbnailSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        affiliation: "Founder of Nexus Labs",
        quote: "Rapid growth requires rapid automation. We wouldn't have scaled to 10M users without these tactical solutions.",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        thumbnailSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    }
];

// --- Sub-Components ---

const TacticalBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#FFF7ED]" />

            {/* Drifting Dot Grid (EXACT SPECS: 32px, 20% Opacity, 60s Drift) */}
            <motion.div
                initial={{ backgroundPosition: '0% 0%' }}
                animate={{ backgroundPosition: ['0% 0%', '-10% -10%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                    backgroundImage: `radial-gradient(${COLORS.primaryDark}33 1.5px, transparent 0)`,
                    backgroundSize: '32px 32px',
                }}
                className="absolute inset-0 w-full h-full"
            />

            {/* Living Floating Blobs */}
            <motion.div
                animate={{ x: [0, 50, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-200/40 blur-[120px] rounded-full"
            />

            {/* Mouse Reactive Glow */}
            <motion.div
                animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }}
                transition={{ type: "spring", damping: 40, stiffness: 60 }}
                className="absolute w-[800px] h-[800px] bg-orange-400/10 blur-[100px] rounded-full opacity-60"
            />

            {/* Tactical Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7ED] via-transparent to-[#FFF7ED]" />
        </div>
    );
};

const TestimonialSlider = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("right");

    const activeReview = reviews[currentIndex];

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleThumbnailClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    const thumbnailReviews = reviews.filter((_, i) => i !== currentIndex).slice(0, 3);

    const imageVariants = {
        enter: (dir) => ({ y: dir === "right" ? "100%" : "-100%", opacity: 0 }),
        center: { y: 0, opacity: 1 },
        exit: (dir) => ({ y: dir === "right" ? "-100%" : "100%", opacity: 0 }),
    };

    const textVariants = {
        enter: (dir) => ({ x: dir === "right" ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir === "right" ? -50 : 50, opacity: 0 }),
    };

    return (
        <div className="relative w-full min-h-[600px] overflow-hidden bg-white/70 backdrop-blur-lg rounded-[48px] border-2 border-black p-8 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 h-full items-center">

                {/* === Meta & Thumbnails === */}
                <div className="md:col-span-2 flex flex-col justify-between h-full order-2 md:order-1">
                    <div className="flex flex-row md:flex-col justify-between items-start md:space-y-6">
                        <span className="text-sm font-black text-[#f97316] tracking-widest font-mono">
                            {String(currentIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                        </span>
                        <h2 className="text-[10px] font-black tracking-[0.5em] uppercase md:[writing-mode:vertical-rl] md:rotate-180 hidden md:block text-stone-400">
                            Reviews
                        </h2>
                    </div>

                    <div className="flex space-x-2 mt-8 md:mt-0">
                        {thumbnailReviews.map((review) => {
                            const originalIndex = reviews.findIndex((r) => r.id === review.id);
                            return (
                                <button
                                    key={review.id}
                                    onClick={() => handleThumbnailClick(originalIndex)}
                                    className="overflow-hidden rounded-xl w-14 h-18 opacity-60 hover:opacity-100 transition-all duration-300 border-2 border-transparent hover:border-[#f97316] shadow-sm"
                                >
                                    <img src={review.thumbnailSrc} alt={review.name} className="w-full h-full object-cover" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* === Main Image Column === */}
                <div className="md:col-span-4 relative h-[400px] md:h-[500px] order-1 md:order-2 overflow-hidden rounded-[32px] shadow-2xl">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={activeReview.imageSrc}
                            alt={activeReview.name}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ea580c]/30 to-transparent" />
                </div>

                {/* === Text Content Column === */}
                <div className="md:col-span-6 flex flex-col justify-between md:pl-8 h-full order-3 md:order-3">
                    <div className="relative overflow-hidden pt-4 md:pt-12">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[2px] bg-[#f97316]" />
                                    <p className="text-[11px] font-black text-[#f97316] uppercase tracking-[0.3em]">
                                        {activeReview.affiliation}
                                    </p>
                                </div>
                                <h3 className="text-3xl font-black text-stone-900 tracking-tight">
                                    {activeReview.name}
                                </h3>
                                <blockquote className="mt-8 text-2xl md:text-4xl font-bold leading-[1.2] text-stone-800 tracking-tighter italic">
                                    "{activeReview.quote}"
                                </blockquote>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center space-x-4 mt-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            className="rounded-full w-14 h-14 border-2 border-stone-200 bg-white flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-6 h-6 text-stone-700" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: COLORS.primaryDark, boxShadow: "0px 0px 30px rgba(255, 64, 0, 0.4)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            className="rounded-full w-14 h-14 bg-[#f97316] text-white flex items-center justify-center shadow-xl shadow-orange-500/30"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Founder Hero Component (Exportable) ---
export const FounderHero = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-32">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative group"
            >
                <div className="absolute -inset-4 bg-[#FF4000]/10 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full aspect-[4/5] lg:aspect-auto lg:h-[650px] rounded-[48px] overflow-hidden border-[12px] border-white shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200"
                        alt="Founder"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md p-8 rounded-[32px] shadow-2xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.3em] mb-1">Founder & Operator</p>
                            <p className="text-2xl font-black text-stone-900 tracking-tight">SK Karanam</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#f97316] flex items-center justify-center text-white shadow-lg">
                            <Zap size={24} fill="currentColor" />
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center lg:pl-16"
            >
                <div className="mb-8 inline-flex items-center gap-4">
                    <div className="w-16 h-[2px] bg-[#f97316]" />
                    <p className="text-stone-500 font-black uppercase text-[10px] tracking-[0.4em]">Strategic Mission</p>
                </div>

                <h1 className="text-stone-900 text-5xl md:text-[84px] font-black leading-[0.9] mb-12 tracking-tighter">
                    We build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#FF4000] drop-shadow-sm">calm signals</span> for GTM.
                </h1>

                <p className="text-stone-800 text-2xl md:text-4xl font-bold leading-tight mb-16 tracking-tighter italic">
                    “Most teams don’t need more data. They need a calm signal layer — and direction they can trust.”
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(255, 64, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-black tracking-widest uppercase text-xs shadow-xl"
                    >
                        Why FlowState
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: COLORS.textDark }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 rounded-2xl bg-stone-900 text-white font-black tracking-widest uppercase text-xs shadow-xl transition-colors"
                    >
                        Talk to SK
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Testimonials Section ---
export default function TestimonialsSection() {
    return (
        <div className="relative min-h-[80vh] w-full flex flex-col justify-center items-center py-12 px-6 md:px-12 selection:bg-[#f97316] selection:text-white overflow-hidden font-sans">

            <div className="relative z-10 max-w-[1300px] mx-auto w-full">

                {/* === SECTION 1: FOUNDER HERO === */}
                <FounderHero />

                {/* === SECTION 2: THE TESTIMONY SLIDER === */}
                <div className="relative mb-12">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-orange-200 flex items-center justify-center text-[#f97316] shadow-sm">
                                <Quote size={24} fill="currentColor" />
                            </div>
                            <h2 className="text-3xl font-black text-stone-900 tracking-tight uppercase">Proven Success</h2>
                        </div>
                        <div className="hidden md:block h-[1px] flex-1 bg-stone-100 mx-10" />
                    </div>
                    <TestimonialSlider reviews={REVIEWS} />
                </div>

            </div>
        </div>
    );
}

// Export individual components for flexibility
export { TacticalBackground, TestimonialSlider, REVIEWS, COLORS };
