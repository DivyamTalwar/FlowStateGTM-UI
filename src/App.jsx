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
            {/* === GLOBAL BACKGROUND (TEMPORARILY DISABLED) === */}
            {/* <div className="fixed inset-0 z-0 pointer-events-none"> */}
            {/* The Dot Grid */}
            {/* <div className="absolute inset-0 bg-tactical-dot w-[200%] h-[200%] -top-1/2 -left-1/2"></div> */}

            {/* The Vignette: Crucial for blending edges so it doesn't look like a "box" */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ffedd5_120%)]"></div> */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffedd5]/50 to-[#ffedd5]"></div> */}
            {/* </div> */}

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
