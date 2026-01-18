import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Twitter, Instagram, Linkedin, Zap, Heart } from 'lucide-react';

// --- FOOTER-SPECIFIC STYLES ---
const FooterStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    .footer-root {
      font-family: 'Inter', sans-serif;
    }

    .hard-shadow-white {
      box-shadow: 4px 4px 0px 0px #ffffff;
    }

    .hard-shadow-black {
      box-shadow: 4px 4px 0px 0px #000000;
    }
    
    /* Selection Color Override */
    .footer-root ::selection {
      background-color: #000;
      color: #FFF;
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
          bg-[#F4F4F2] 
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
  const { scrollYProgress } = useScroll();
  return (
    <footer className="footer-root relative w-full bg-[#FED7AA] border-t-4 border-black text-black pt-12 pb-8 overflow-hidden" style={{ zoom: 0.85 }}>
      <FooterStyles />

      {/* Texture Overlay (Switched to Black for contrast on Orange) */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg%3E%3Cg fill=\'none\' fill-rule=\'evenodd%3E%3Cg fill=\'%23000000\' fill-opacity=\'1%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">

          {/* LEFT: Newsletter Section */}
          <div className="max-w-md w-full">
            <h2 className="text-3xl md:text-4xl font-[900] uppercase tracking-tighter text-black mb-4">
              Join the GTM Signal
            </h2>
            <p className="text-stone-900 text-base md:text-lg mb-6 leading-relaxed font-medium">
              A weekly calm brief on GTM patterns in regulated and complex markets. Signals. Plays. No noise.
            </p>

            <form className="flex gap-2 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-white border-2 border-black text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full text-base placeholder-stone-500 transition-shadow hard-shadow-black"
              />
              <button className="bg-black text-white border-2 border-black px-5 py-3 rounded-lg font-bold hover:bg-stone-800 transition-transform active:translate-y-1 flex items-center justify-center hard-shadow-white">
                →
              </button>
            </form>
          </div>

          {/* RIGHT: Brand & Navigation */}
          <div className="flex flex-col items-start lg:items-end gap-8 w-full lg:w-auto">

            {/* Brand Logo */}
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 bg-black border-2 border-black rounded flex items-center justify-center hard-shadow-white">
                <Zap className="w-6 h-6 text-[#FED7AA] fill-[#FED7AA]" />
              </div>
              <span className="text-3xl font-[900] tracking-tighter uppercase text-black">FlowStateGTM</span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-6 md:gap-8 text-black font-bold text-lg md:text-xl">
              {['Benefits', 'How it works', 'Testimonials', 'Pricing'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full group-hover:bg-white" />
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-800 text-sm font-bold">
            © 2026 FlowStateGTM. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-black hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Twitter size={20} /></a>
            <a href="#" className="text-black hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Instagram size={20} /></a>
            <a href="#" className="text-black hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>

      {/* Decorative Kinetic Text */}
      <div className="w-full overflow-hidden leading-none select-none opacity-[0.15] pointer-events-none absolute bottom-0 left-0 flex justify-center items-end">
        <motion.div
          className="text-[9.5vw] md:text-[160px] font-black text-black whitespace-nowrap tracking-tighter"
          style={{ x: useTransform(scrollYProgress, [0.8, 1], ["10%", "0%"]) }}
        >
          FLOW STATE
        </motion.div>
      </div>
    </footer >
  );
};

// --- APP COMPONENT ---

export default function FooterApp() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col justify-between overflow-x-hidden">
      <FooterStyles />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
