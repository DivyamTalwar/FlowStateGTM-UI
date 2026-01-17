import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronDown,
    ArrowRight,
    Zap,
    ShieldCheck,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    MoreHorizontal,
    CreditCard,
    Layers,
    Activity,
    Play
} from 'lucide-react';

// --- Spring Physics Configuration (From Old Navbar) ---
const hoverTransition = {
    type: "spring",
    mass: 0.5,
    damping: 10,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

const navSpring = {
    type: "spring",
    damping: 20,
    stiffness: 120,
    mass: 0.8
};

// --- Helper Components (From Old Navbar) ---

const MenuItem = ({ setActive, active, item, children }) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative group h-full flex items-center">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-slate-600 group-hover:text-orange-600 font-bold text-sm tracking-wide px-4 py-2 uppercase"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={hoverTransition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={hoverTransition}
                                layoutId="active"
                                className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-500/20 ring-1 ring-orange-500/10"
                            >
                                <motion.div
                                    layout
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

const ProductItem = ({ title, description, href, src }) => {
    return (
        <a href={href} className="flex space-x-4 group p-3 rounded-xl hover:bg-orange-50 transition-colors">
            <div className="relative overflow-hidden rounded-lg h-20 w-32 shadow-sm border border-slate-200 group-hover:border-orange-500 transition-colors">
                <img
                    src={src}
                    alt={title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors" />
            </div>

            <div>
                <h4 className="text-base font-bold mb-1 text-slate-900 group-hover:text-orange-600 transition-colors">
                    {title}
                </h4>
                <p className="text-slate-500 text-xs max-w-[10rem] leading-relaxed group-hover:text-slate-600">
                    {description}
                </p>
            </div>
        </a>
    );
};

const HoveredLink = ({ children, ...rest }) => {
    return (
        <a
            {...rest}
            className="text-slate-500 hover:text-orange-600 transition-colors text-sm block py-1 font-semibold"
        >
            {children}
        </a>
    );
};

// --- Navbar Component (From Old Navbar) ---

const Navbar = () => {
    const [active, setActive] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                onMouseLeave={() => setActive(null)}
                initial={{ y: -100, width: "100%", opacity: 0 }}
                animate={{
                    y: scrolled ? 20 : 0,
                    width: scrolled ? "60%" : "100%",
                    borderRadius: scrolled ? "50px" : "0px",
                    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
                }}
                transition={navSpring}
                className={`
                pointer-events-auto
                relative flex items-center justify-between
                px-8 border border-transparent backdrop-blur-none
                ${scrolled
                        ? "shadow-[0_8px_30px_rgb(255,64,0,0.12)] border-orange-500/20 backdrop-blur-xl py-2"
                        : "py-6"
                    }
            `}
                style={{
                    maxWidth: "1400px",
                    minWidth: scrolled ? "fit-content" : "100%",
                }}
            >
                {/* Background Glow Animation for Scrolled State */}
                <motion.div
                    animate={{ opacity: scrolled ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-xl -z-10"
                />

                {/* --- Logo (Moved to the right with ml-6) --- */}
                <motion.a
                    href="#"
                    className="flex items-center gap-2 group ml-6"
                    layout
                >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f97316] to-[#FF4000] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <span className={`font-black text-xl tracking-tighter uppercase transition-colors duration-300 hidden sm:block ${scrolled ? "text-slate-900" : "text-slate-900"}`}>
                        Tactical<span className="text-[#f97316]">.</span>UI
                    </span>
                </motion.a>

                {/* --- Navigation Items --- */}
                <div className="flex items-center space-x-1">
                    <MenuItem setActive={setActive} active={active} item="Mission">
                        <div className="flex flex-col space-y-4 text-sm min-w-[180px]">
                            <HoveredLink href="#">Operations</HoveredLink>
                            <HoveredLink href="#">Tactical Gear</HoveredLink>
                            <HoveredLink href="#">Deployments</HoveredLink>
                            <HoveredLink href="#">Intelligence</HoveredLink>
                        </div>
                    </MenuItem>

                    <MenuItem setActive={setActive} active={active} item="Arsenal">
                        <div className="text-sm grid grid-cols-2 gap-8 p-4 w-[600px]">
                            <ProductItem
                                title="Command Center"
                                href="#"
                                src="https://assets.aceternity.com/demos/algochurn.webp"
                                description="Centralized control for all your tactical needs."
                            />
                            <ProductItem
                                title="Field Kit"
                                href="#"
                                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                                description="Essential components for rapid deployment."
                            />
                            <ProductItem
                                title="Recon AI"
                                href="#"
                                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                                description="Advanced scouting and data gathering."
                            />
                            <ProductItem
                                title="Secure Comms"
                                href="#"
                                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                                description="Encrypted channels for team coordination."
                            />
                        </div>
                    </MenuItem>

                    <MenuItem setActive={setActive} active={active} item="Briefing">
                        <div className="flex flex-col space-y-4 text-sm min-w-[150px]">
                            <HoveredLink href="#">Daily Report</HoveredLink>
                            <HoveredLink href="#">Status Check</HoveredLink>
                            <HoveredLink href="#">Team Roster</HoveredLink>
                        </div>
                    </MenuItem>
                </div>

                {/* --- CTA Button --- */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block text-sm font-bold bg-[#f97316] text-white px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/40 hover:bg-[#ea580c] transition-colors border-2 border-transparent hover:border-orange-300"
                >
                    ENGAGE
                </motion.button>
            </motion.nav>
        </div>
    );
}

// --- New Hero Section (Replacing App) ---

const HeroSection = () => {
    // Simple state to handle mobile menu toggle if we wanted to add it later
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Inject fonts
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // Tactical Mesh Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let w, h;
        let particles = [];
        let mouse = { x: null, y: null };

        // Configuration for LIGHT background
        const config = {
            // Darker Orange for visibility on white
            // Made ~1.3x lighter (0.7 -> 0.54)
            particleColor: 'rgba(234, 88, 12, 0.54)',

            // Faint lines
            // Made ~1.3x lighter (0.18 -> 0.14)
            lineColor: 'rgba(249, 115, 22, 0.14)',

            // Bright Red-Orange for interaction
            accentColor: 'rgba(255, 64, 0, 1)',

            particleAmount: 0,
            defaultSpeed: 0.4,
            variantSpeed: 0.5,
            linkRadius: 170,
            mouseRadius: 220,
        };

        // Helper to check if a point is within the central content mask
        const isInMask = (x, y) => {
            const maskW = 1000; // Increased from 700 to ensure wider clean area
            const maskH = 650;  // Increased from 500 to ensure taller clean area
            const centerX = w / 2;
            // Shift center slightly up to match hero text position
            const centerY = (h / 2) - 50;

            return (
                x > centerX - maskW / 2 &&
                x < centerX + maskW / 2 &&
                y > centerY - maskH / 2 &&
                y < centerY + maskH / 2
            );
        };

        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * config.defaultSpeed;
                this.vy = (Math.random() - 0.5) * config.defaultSpeed;
                this.size = Math.random() * 2.5 + 1.5;
                this.baseSize = this.size;
                this.pulseSpeed = 0.05;
                this.isPulsing = false;
                this.pulseTimer = 0;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.mouseRadius - distance) / config.mouseRadius;
                        const directionMultiplier = 0.6;

                        this.vx += forceDirectionX * force * directionMultiplier * 0.05;
                        this.vy += forceDirectionY * force * directionMultiplier * 0.05;
                        this.size = this.baseSize + (force * 2.5);
                    } else {
                        if (this.size > this.baseSize) this.size -= 0.1;

                        // Friction
                        const maxSpeed = 1.2;
                        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                        if (speed > maxSpeed) {
                            this.vx = (this.vx / speed) * maxSpeed;
                            this.vy = (this.vy / speed) * maxSpeed;
                        }
                    }
                }

                // Random Pulsing
                if (!this.isPulsing && Math.random() < 0.0015) {
                    this.isPulsing = true;
                    this.pulseTimer = 0;
                }

                if (this.isPulsing) {
                    this.pulseTimer += this.pulseSpeed;
                    const pulseScale = Math.sin(this.pulseTimer) * 2;
                    if (this.pulseTimer > Math.PI) {
                        this.isPulsing = false;
                        this.size = this.baseSize;
                    } else {
                        if (this.size <= this.baseSize + 0.1) {
                            this.size = this.baseSize + Math.max(0, pulseScale);
                        }
                    }
                }
            }

            draw() {
                // Don't render particles inside the content mask
                if (isInMask(this.x, this.y)) return;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                if (this.isPulsing) {
                    ctx.fillStyle = config.accentColor;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(255, 64, 0, 0.4)';
                } else {
                    ctx.fillStyle = config.particleColor;
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < config.particleAmount; i++) {
                particles.push(new Particle());
            }
        };

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const area = w * h;
            // Increased density slightly more to compensate for the hole
            config.particleAmount = Math.floor((area / 11000) * 1.3);
            initParticles();
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.linkRadius) {
                        // Check if either particle is in the mask, if so, don't draw line
                        // This creates a clean cut around the text area
                        if (isInMask(particles[i].x, particles[i].y) || isInMask(particles[j].x, particles[j].y)) {
                            continue;
                        }

                        ctx.beginPath();
                        let opacity = 1 - (distance / config.linkRadius);

                        let mouseDist = 9999;
                        if (mouse.x != null) {
                            let mx = (particles[i].x + particles[j].x) / 2 - mouse.x;
                            let my = (particles[i].y + particles[j].y) / 2 - mouse.y;
                            mouseDist = Math.sqrt(mx * mx + my * my);
                        }

                        if (mouseDist < 120) {
                            // Active connection near mouse
                            ctx.strokeStyle = `rgba(255, 64, 0, ${opacity})`;
                            ctx.lineWidth = 1.5;
                        } else {
                            // Passive connection
                            ctx.strokeStyle = `rgba(234, 88, 12, ${opacity * 0.20})`; // Slightly adjusted multiplier
                            ctx.lineWidth = 0.6;
                        }

                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };
        const handleTouchMove = (e) => {
            if (e.touches[0]) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };
        const handleTouchEnd = () => { mouse.x = null; mouse.y = null; };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="page">
            <style>{`
        :root{
          --orange: #f47b3a;
          --bg: #ffffff; /* Changed to pure white */
          --text: #151515;
          --muted: rgba(0,0,0,0.55);
          --border: rgba(0,0,0,0.08);
        }

        *{ box-sizing:border-box; }
        html,body{ height:100%; }
        body{
          margin:0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
        }

        .page{
          min-height:100vh;
          position:relative;
          overflow:hidden;
          background: var(--bg); /* Only pure white background, no central gradient */
        }

        /* Tactical Background Canvas */
        .tactical-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1; /* Low z-index to sit behind content */
            pointer-events: none; /* Let clicks pass through to content if needed, though we track mouse on window */
        }

        /* Inverted vignette for depth */
        .vignette {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* Increased transparent area to 70% to keep center cleaner */
            background: radial-gradient(circle at center, transparent 70%, rgba(249, 115, 22, 0.03) 100%);
            z-index: 2;
            pointer-events: none;
        }

        /* top beams (left / right) */
        .beam{
          position:absolute;
          top:-260px;
          width:560px;
          height:560px;
          pointer-events:none;
          z-index: 0; /* Behind the mesh */
          background:
            radial-gradient(circle at 50% 25%, rgba(253, 127, 44, 0.8) 0%, rgba(255, 179, 67, 0.6) 35%, transparent 65%),
            repeating-linear-gradient(
              90deg,
              rgba(253, 127, 44, 0.5) 0 18px,
              transparent 18px 70px
            );
          filter: blur(28px);
          opacity: 0.85;
          animation: beamDrift 7.5s ease-in-out infinite;
          mix-blend-mode: multiply;
        }
        .beamLeft{
          left:-210px;
          transform: rotate(-10deg);
        }
        .beamRight{
          right:-210px;
          transform: rotate(10deg) scaleX(-1);
          animation-delay: -1.7s;
        }

        /* Removed topGlow to ensure center is perfectly white */
        .topGlow{
          display: none;
        }

        @keyframes beamDrift{
          0%,100%{ transform: translateY(0) rotate(-10deg); }
          50%{ transform: translateY(14px) rotate(-10deg); }
        }
        .beamRight{
          animation-name: beamDriftRight;
        }
        @keyframes beamDriftRight{
          0%,100%{ transform: translateY(0) rotate(10deg) scaleX(-1); }
          50%{ transform: translateY(14px) rotate(10deg) scaleX(-1); }
        }

        .container{
          width:min(1200px, calc(100% - 64px));
          margin:0 auto;
          position: relative;
          z-index: 10;
        }

        .header{
          padding:22px 0 10px;
          position:relative;
          z-index:20;
          animation: fadeDown .7s ease both;
        }
        @keyframes fadeDown{
          from{ opacity:0; transform: translateY(-10px); }
          to{ opacity:1; transform: translateY(0); }
        }

        .nav{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:24px;
        }

        .brand{
          display:flex;
          align-items:center;
          gap:10px;
          text-decoration: none;
          color: inherit;
        }
        .logoMark{
          width:28px;
          height:28px;
          border-radius:10px;
          background: var(--orange);
          display:grid;
          place-items:center;
          color: white;
          box-shadow: 0 14px 32px rgba(244,123,58,0.24);
        }
        .brandName{
          font-family: "Plus Jakarta Sans", Inter, system-ui, sans-serif;
          font-weight:800;
          letter-spacing:-0.2px;
          font-size: 18px;
        }

        .menu{
          display:flex;
          align-items:center;
          gap:28px;
          font-size:13px;
          font-weight: 500;
          color: rgba(0,0,0,0.55);
        }
        .menu a{
          text-decoration:none;
          color:inherit;
          transition: color .2s ease, transform .2s ease;
        }
        .menu a:hover{ color: rgba(0,0,0,0.75); }
        .menuDrop{
          display:flex;
          gap:4px;
          align-items:center;
          cursor: pointer;
        }
        .menuDrop:hover{ color: rgba(0,0,0,0.75); }

        .navCta{
          text-decoration:none;
          color: rgba(0,0,0,0.72);
          font-size:13px;
          font-weight:600;
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:10px 14px;
          border-radius:999px;
          background: rgba(255,255,255,0.82);
          border:1px solid rgba(0,0,0,0.06);
          box-shadow: 0 16px 34px rgba(0,0,0,0.06);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .navCta:hover{
          transform: translateY(-1px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.08);
        }

        .hero{
          position:relative;
          padding: 24px 0 60px;
        }

        .heroContainer{
          position:relative;
          min-height: 740px;
        }

        .heroInner{
          position:relative;
          z-index:5;
          text-align:center;
          max-width: 860px;
          margin: 0 auto;
          padding-top: 80px;
          animation: fadeUp .85s ease both;
        }
        @keyframes fadeUp{
          from{ opacity:0; transform: translateY(10px); }
          to{ opacity:1; transform: translateY(0); }
        }

        .badgeRow{
          display:flex;
          justify-content:center;
          margin-bottom: 24px;
        }
        .badge{
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:5px 6px 5px 6px;
          border-radius:999px;
          border:1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.74);
          box-shadow: 0 16px 36px rgba(0,0,0,0.05);
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .badge:hover { transform: scale(1.02); }
        .badgeNew{
          font-size:13px;
          font-weight:700;
          padding:4px 10px;
          border-radius:999px;
          background: #f47b3a;
          color: white;
          letter-spacing: 0.2px;
        }
        .badgeText{
          font-size:16px;
          font-weight: 500;
          display:inline-flex;
          gap:6px;
          align-items:center;
          padding:2px 12px 2px 4px;
          color: rgba(0,0,0,0.65);
        }

        .title{
          font-family: "Plus Jakarta Sans", Inter, system-ui, sans-serif;
          font-weight:800;
          font-size: 86px;
          line-height: 1.05;
          letter-spacing: -2px;
          margin: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle{
          margin: 24px auto 0;
          font-size: 23px;
          line-height: 1.5;
          color: rgba(0,0,0,0.55);
          font-weight: 500;
          max-width: 640px; /* Slightly wider for the new text */
        }

        .featureRow{
          display:flex;
          justify-content:center;
          gap:34px;
          margin-top: 36px;
          font-size: 17px;
          font-weight: 500;
          color: rgba(0,0,0,0.78);
        }

        .featureItem{
          display:flex;
          align-items:center;
          gap:10px;
        }

        .featureIcon{
          width:28px;
          height:28px;
          border-radius:999px;
          display:grid;
          place-items:center;
          background: rgba(255,255,255,0.82);
          border:1px solid rgba(0,0,0,0.05);
          box-shadow: 0 16px 34px rgba(0,0,0,0.06);
          color: var(--orange);
        }

        .ctaRow{
          margin-top: 42px;
          display:flex;
          justify-content:center;
          gap:16px;
        }

        .btn{
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:12px;
          padding: 14px 24px;
          border-radius:999px;
          border:1px solid rgba(0,0,0,0.07);
          font-size:18px;
          font-weight:600;
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
        }

        .btnPrimary{
          color:white;
          background: #151515;
          border-color: rgba(255,255,255,0.10);
          box-shadow: 0 22px 46px rgba(0,0,0,0.22);
          position:relative;
          overflow: hidden;
        }
        .btnPrimary::after{
          content:"";
          position:absolute;
          inset:-10px -14px;
          border-radius:999px;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%);
          filter: blur(14px);
          z-index:0;
        }
        .btnContent { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }
        
        .btnSecondary{
          background: rgba(255,255,255,0.82);
          color: rgba(0,0,0,0.82);
          box-shadow: 0 16px 34px rgba(0,0,0,0.06);
        }

        .btn:hover{
          transform: translateY(-2px);
          box-shadow: 0 24px 54px rgba(0,0,0,0.15);
        }

        .brands{
          margin-top: 80px;
          text-align:center;
        }
        .brandsText{
          font-size:15px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(0,0,0,0.4);
        }
        .brandRow{
          display:flex;
          justify-content:center;
          gap:42px;
          margin-top: 24px;
          opacity: .5;
          transition: opacity 0.3s;
        }
        .brandRow:hover { opacity: 0.8; }
        .brandLogo{
          display:flex;
          align-items:center;
          gap:8px;
          color: rgba(0,0,0,0.8);
          font-weight:700;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 18px;
        }


        /* responsive */
        @media (max-width: 980px){
          .menu{ display:none; }
          .title{ font-size: 48px; }
          .revenueCard, .usersCard{ display:none; }
          .heroContainer{ min-height: auto; padding-bottom: 60px; }
          .featureRow{ flex-wrap:wrap; gap:14px 26px; }
          .heroInner { padding-top: 40px; }
          .beam { opacity: 0.3; }
        }
      `}</style>

            {/* Background Elements */}
            {/* <canvas ref={canvasRef} className="tactical-canvas"></canvas> */}
            <div className="vignette"></div>
            <div className="beam beamLeft"></div>
            <div className="beam beamRight"></div>
            <div className="topGlow"></div>

            {/* New Animated Navbar (Replaced the static header from new code) */}
            <Navbar />

            <div className="container">

                {/* Navigation - REMOVED since we are using Navbar above */}
                {/*
        <header className="header">
          ...
        </header>
        */}

                {/* Hero Section */}
                <section className="hero">
                    <div className="heroContainer">

                        <div className="heroInner">
                            <div className="badgeRow">
                                <div className="badge">
                                    <span className="badgeNew">New</span>
                                    <span className="badgeText">
                                        FlowStateGTM is live <ArrowRight size={13} />
                                    </span>
                                </div>
                            </div>

                            <h1 className="title">
                                Calm signals guiding<br />
                                modern revenue teams
                            </h1>

                            <p className="subtitle">
                                <strong>Your Waze for smarter GTM decisions.</strong> FlowState guides revenue teams with clarity. FlowStateGTM helps teams selling in complex or regulated markets spot GTM friction early - and make the next move clear.
                            </p>

                            <div className="featureRow">
                                <div className="featureItem">
                                    <div className="featureIcon"><ShieldCheck size={14} strokeWidth={2.5} /></div>
                                    Enterprise Security
                                </div>
                                <div className="featureItem">
                                    <div className="featureIcon"><BarChart3 size={14} strokeWidth={2.5} /></div>
                                    Real-time Analytics
                                </div>
                                <div className="featureItem">
                                    <div className="featureIcon"><Zap size={14} strokeWidth={2.5} /></div>
                                    Instant Setup
                                </div>
                            </div>

                            <div className="ctaRow">
                                <a href="#" className="btn btnPrimary">
                                    <span className="btnContent">Run a FlowScan <ArrowRight size={16} /></span>
                                </a>
                                <a href="#" className="btn btnSecondary">
                                    <Play size={16} style={{ marginRight: -4 }} /> See How It Works
                                </a>
                            </div>

                            <div className="brands">
                                <div className="brandsText">Trusted by teams at</div>
                                <div className="brandRow">
                                    <div className="brandLogo"><Layers size={18} /> Stack</div>
                                    <div className="brandLogo"><Activity size={18} /> Pulse</div>
                                    <div className="brandLogo"><CreditCard size={18} /> PayFlow</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default HeroSection;
