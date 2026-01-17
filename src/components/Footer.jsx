import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Instagram, Linkedin, Zap } from 'lucide-react';

// --- STYLES & CONFIGURATION ---

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: #FFF7ED;
    }
    
    .hard-shadow {
      box-shadow: 8px 8px 0px 0px #000000;
    }
    
    @media (max-width: 768px) {
      .hard-shadow {
        box-shadow: 4px 4px 0px 0px #000000;
      }
    }
  `}</style>
);

// --- TACTICAL BACKGROUND COMPONENT ---

const TacticalBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
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
        animate={{
          x: ["0%", "-5%"],
          y: ["0%", "-5%"]
        }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      {/* 2. The Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF7ED]/40 to-[#FFF7ED]" />
    </div>
  );
};

// --- ANIMATION VARIANTS ---

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// --- COMPONENTS ---

export const NewsletterSection = () => {
  return (
    <section className="relative w-full flex justify-center items-center py-12 px-4 md:px-8 overflow-hidden">

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="
          relative z-10 w-full max-w-[1200px] 
          bg-[#FBFF9A] 
          border-2 border-black 
          rounded-lg 
          hard-shadow
          px-6 py-16 md:px-24 md:py-[72px]
          flex flex-col items-center text-center
        "
      >
        {/* Label */}
        <motion.div variants={itemVariants} className="mb-5">
          <span className="inline-block bg-white border border-black rounded-full px-[14px] py-[6px] text-[11px] md:text-xs font-medium tracking-[0.12em] uppercase text-black">
            Newsletter
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-[56px] font-[900] leading-[1.05] tracking-tight text-black max-w-4xl"
        >
          JOIN THE GTM SIGNAL
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base md:text-lg text-[#333] max-w-[520px] font-normal leading-relaxed"
        >
          A weekly calm brief on GTM patterns in regulated and complex markets. Signals. Plays. No noise.
        </motion.p>

        {/* Input Container */}
        <motion.div
          variants={itemVariants}
          className="mt-10 w-full flex justify-center"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              group
              relative flex items-center justify-between
              w-full max-w-[420px] h-14 
              bg-white 
              border-2 border-black 
              rounded-full 
              pl-6 pr-2
              transition-all duration-200
              hover:border-[3px]
            "
          >
            <input
              type="email"
              placeholder="example@mail.com"
              className="
                flex-1 
                bg-transparent 
                border-none 
                outline-none 
                text-black 
                placeholder-gray-400 
                font-medium
                text-base
              "
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="
                flex items-center justify-center 
                w-10 h-10 
                bg-black 
                rounded-full 
                text-white
                cursor-pointer
              "
              aria-label="Subscribe"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {

  return (
    <footer className="w-full bg-[#EAF7F3] pt-12 pb-8 border-t border-black/5" style={{ zoom: 0.5 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Top Row: 3 Columns */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-20 gap-10">
          <div className="max-w-md">
            <h2 className="text-7xl font-black uppercase text-white tracking-tighter mb-6">
              Join the GTM Signal
            </h2>
            <p className="text-stone-400 text-4xl mb-8 leading-relaxed">
              A weekly calm brief on GTM patterns in regulated and complex markets. Signals. Plays. No noise.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-stone-900 border border-stone-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f97316] w-full"
              />
              <button className="bg-[#f97316] text-white px-6 py-3 rounded-lg font-bold text-2xl hover:bg-[#ea580c] transition-colors">
                →
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-5xl font-black text-white tracking-tighter">FlowStateGTM</span>
            </div>
            <div className="flex gap-8 text-stone-400 font-medium text-2xl">
              <a href="#" className="hover:text-[#f97316] transition-colors">Benefits</a>
              <a href="#" className="hover:text-[#f97316] transition-colors">How it works</a>
              <a href="#" className="hover:text-[#f97316] transition-colors">Testimonials</a>
              <a href="#" className="hover:text-[#f97316] transition-colors">Pricing</a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xl">© 2026 FlowStateGTM. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-stone-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- APP COMPONENT ---

export default function FooterApp() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col justify-between overflow-x-hidden">
      <FontStyles />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
