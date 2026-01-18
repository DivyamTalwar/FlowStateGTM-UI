import React from 'react';

// === IMPORT ALL COMPONENTS ===
import GlobalParticleMesh from './components/GlobalParticleMesh';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import CourseFlow from './components/CourseFlow';
import VerticalTimeline from './components/VerticalTimeline';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import TestimonialsSection from './components/TestimonialsSection';
// import SaaSHeroBackground from './components/SaaSHeroBackground'; // Removed as per new design
import { NewsletterSection, Footer } from './components/Footer';
// ... other imports

export default function App() {
    return (
        <div className="min-h-screen w-full bg-white text-gray-900 font-sans relative selection:bg-orange-200 scroll-smooth">
            {/* === TACTICAL GRAIN OVERLAY === */}
            <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            {/* === GLOBAL HERO ANIMATION (PARTICLE MESH) === */}
            <Navbar />
            <GlobalParticleMesh />

            <div className="relative z-10 w-full">
                {/* === 1. HERO SECTION === */}
                {/* Scroll-driven 3D laptop with flying transaction cards */}
                <HeroSection />

                {/* === 2. BENEFITS SECTION === */}
                {/* Animated bento grid showcasing features */}
                <BenefitsSection />

                {/* === 3. COURSE FLOW === */}
                {/* Feature showcase with animated SVG arrows */}
                <CourseFlow />

                {/* === 4. VERTICAL TIMELINE === */}
                {/* Scroll-linked process steps with glowing progress */}
                <VerticalTimeline />

                {/* === 5. PRICING SECTION === */}
                {/* 3D tilt cards with spotlight hover */}
                <PricingSection />

                {/* === 6. TESTIMONIALS === */}
                {/* Founder hero + animated slider with thumbnails */}
                <TestimonialsSection />

                {/* === 7. FAQ SECTION === */}
                {/* Accordion cards with spring animations */}
                <FaqSection />

                {/* === 8. NEWSLETTER === */}
                {/* Email capture with tactical background */}
                <NewsletterSection />

                {/* === 9. FOOTER === */}
                {/* Navigation links + social icons */}
                <Footer />
            </div>
        </div>
    );
}
