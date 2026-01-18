import React, { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- DATA & CONFIG ---

const PLANS = [
    {
        id: 'starter',
        name: 'FlowScan',
        desc: 'A strategy-grade diagnostic to map friction and define the next 30–90 days.',
        price: '3,000 one-time',
        bgBase: '#ffedd5',
        btnBg: 'bg-orange-400',
        features: ['ICP + positioning clarity', 'Competitive narrative + trap map', 'GTM friction diagnosis + priorities', '30/60/90 action plan', 'Leadership-ready readout'],
    },
    {
        id: 'pro',
        name: 'GTM Brain',
        desc: 'Always-on signals + calm weekly navigation, built and refined with early customers.',
        price: '2,000',
        bgBase: '#fed7aa',
        btnBg: 'bg-orange-600',
        popular: true,
        features: ['Weekly calm signal brief + recommended moves', 'Competitor + compliance + buyer signals', 'Signal Packs (choose 2)', 'Messaging + enablement updates', 'Iteration log + decision notes'],
    },
    {
        id: 'academy',
        name: 'Enterprise',
        desc: 'Custom signal packs, integrations, and multi-market coverage for scaling teams.',
        price: 'Custom',
        bgBase: '#fdba74',
        btnBg: 'bg-orange-700',
        features: ['Multi-market signal coverage', 'Custom packs + workflow triggers', 'Integration support (CRM / Slack)', 'Executive reporting + QBR format', 'Priority support'],
    },
];

// --- SUB-COMPONENTS ---

const TacticalCard = ({ plan, index }) => {
    const cardRef = useRef(null);
    const bounds = useRef(null);

    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // HIGH STIFFNESS SPRINGS (Removes the 'floaty' lag)
    const springConfig = { stiffness: 350, damping: 30, mass: 1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // 3D Tilt transforms
    const rotateX = useTransform(y, [-150, 150], [6, -6]);
    const rotateY = useTransform(x, [-150, 150], [-6, 6]);

    // Spotlight effect
    const spotlightBg = useMotionTemplate`radial-gradient(
    450px circle at ${x}px ${y}px,
    rgba(255, 255, 255, 0.45),
    transparent 80%
  )`;

    const handleMouseEnter = (e) => {
        bounds.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (!bounds.current) return;
        const rect = bounds.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Immediate mouse position updates
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const isMiddle = index === 1;

    return (
        <motion.div
            className={`relative h-full perspective-1000 ${isMiddle ? 'md:-mt-8 md:mb-8 z-20' : 'z-10'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <motion.div
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-full flex flex-col border-2 border-black rounded-3xl overflow-hidden transform-gpu will-change-transform"
                style={{
                    backgroundColor: plan.bgBase,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                }}
                whileHover={{
                    scale: 1.01,
                    boxShadow: "16px 16px 0px 0px #FF4000",
                }}
            >
                {/* Hardware-accelerated Spotlight */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 mix-blend-overlay transform-gpu"
                    style={{ background: spotlightBg }}
                />

                <div className="relative p-6 lg:p-8 flex flex-col h-full z-20 transform-gpu" style={{ transformStyle: "preserve-3d" }}>

                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                            {plan.name}
                        </h3>
                        {plan.popular && (
                            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                Recommended
                            </span>
                        )}
                    </div>

                    <p className="text-sm font-bold text-gray-800 leading-relaxed mb-8 opacity-90 min-h-[60px]">
                        {plan.desc}
                    </p>

                    {/* STATIC PRICE (No laggy counting) */}
                    <div className="mb-8 flex items-baseline flex-wrap gap-1">
                        <span className="text-5xl lg:text-6xl font-black tracking-tighter text-black">
                            {plan.price !== 'Custom' && '€'}
                            {plan.price}
                        </span>
                        <span className="text-sm lg:text-base font-extrabold text-gray-700 uppercase whitespace-nowrap">
                            {plan.price !== 'Custom' && plan.price !== '3,000 one-time' ? '/ MO' : ''}
                        </span>
                    </div>

                    {/* Tactical Divider */}
                    <div className="w-full h-[2px] bg-black/10 mb-8 relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Features */}
                    <ul className="flex-1 space-y-4 mb-10">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-900">
                                <div className="mt-0.5 min-w-[18px] p-[2px] rounded-sm bg-black text-white">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="leading-tight">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Mechanical Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`
              w-full py-4 relative group overflow-hidden
              ${plan.btnBg}
              border-2 border-black rounded-xl
              font-black uppercase tracking-widest text-sm text-white
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              active:shadow-none active:translate-y-[4px] active:translate-x-[4px]
              transition-all duration-75
              cursor-pointer
            `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {plan.name === 'FlowScan' ? 'Run a FlowScan' : plan.name === 'GTM Brain' ? 'Request access' : 'Talk to us'} <ArrowRight size={16} />
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN SECTION ---

export default function PricingSection() {
    return (
        <div className="relative min-h-[80vh] w-full flex flex-col justify-center py-12 lg:py-16 bg-stone-950 selection:bg-orange-500 selection:text-white overflow-hidden">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />


            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                {/* Header */}
                <div className="flex flex-col items-center mb-10 md:mb-12">
                    <div className="mb-6 px-5 py-2 bg-white border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#ea580c]">
                        <span className="text-xs font-black tracking-[0.2em] text-black uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4000] animate-pulse" />
                            Tactical Pricing
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center text-white uppercase leading-[0.9] tracking-tight mb-6 max-w-4xl">
                        Start serious. <span className="text-[#ea580c]">Stay in flow.</span>
                    </h1>

                    <p className="text-gray-400 text-center text-lg md:text-xl max-w-2xl font-bold leading-relaxed opacity-80">
                        FlowScan sets your baseline. GTM Brain adds calm signals and weekly navigation as you learn and scale.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-stretch max-w-6xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <TacticalCard key={plan.id} plan={plan} index={index} />
                    ))}
                </div>

            </div>
        </div>
    );
}
