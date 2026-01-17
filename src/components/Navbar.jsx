import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Spring Physics Configuration ---
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

// --- Helper Components ---

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

// --- Navbar Component ---

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
                    opacity: 1,
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
                        FlowStateGTM
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
                    FlowScan
                </motion.button>
            </motion.nav>
        </div>
    );
}

export default Navbar;
