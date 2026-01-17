import React from 'react';

const SaaSHeroBackground = () => {
    return (
        <div className="relative w-full h-screen bg-white overflow-hidden isolate font-sans selection:bg-orange-100">

            {/* Custom Styles for organic animations 
        Using inline styles to ensure self-contained file with complex keyframes
      */}
            <style>{`
        @keyframes flowLeft {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, 20px) scale(1.1) rotate(5deg); }
          66% { transform: translate(20px, 60px) scale(0.95) rotate(-5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        
        @keyframes flowRight {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-30px, 40px) scale(1.15) rotate(-8deg); }
          66% { transform: translate(-50px, 10px) scale(0.9) rotate(4deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }

        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }

        .animate-flow-left {
          animation: flowLeft 18s ease-in-out infinite;
        }

        .animate-flow-right {
          animation: flowRight 22s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 8s ease-in-out infinite;
        }
        
        /* Ensures the blur looks high-quality and smooth */
        .glass-blur {
          filter: blur(80px);
          opacity: 0.9;
        }
      `}</style>

            {/* =========================================
          TOP LEFT LIGHT FORM 
          Updated with Tactical Orange Palette (#f97316, #ea580c, #FF4000)
      ========================================= */}
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] z-10 pointer-events-none">

                {/* Core Intensity - Darkened by ~30% */}
                <div
                    className="absolute top-10 left-10 w-[60%] h-[50%] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-flow-left mix-blend-multiply glass-blur"
                    style={{
                        // Shifted to darker orange (Orange-600/700) and increased opacity
                        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.95), rgba(194, 65, 12, 0.6))',
                        filter: 'blur(100px)'
                    }}
                />

                {/* Outer Wash - Softer Orange to Primary */}
                <div
                    className="absolute top-0 left-0 w-[80%] h-[70%] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] animate-flow-left"
                    style={{
                        // Darkened gradients: #fb923c (Orange-400) to #ea580c (Orange-600)
                        background: 'linear-gradient(90deg, #fb923c, #ea580c)',
                        filter: 'blur(120px)',
                        opacity: 0.7, // Increased from 0.5
                        animationDelay: '-5s'
                    }}
                />

                {/* Secondary Highlight - Tactical Accent Glow (#FF4000) */}
                <div
                    className="absolute top-[20%] left-[10%] w-[50%] h-[40%] rounded-[50%_50%_30%_70%_/_50%_50%_70%_30%] animate-flow-left animate-shimmer"
                    style={{
                        // Darkened center stops
                        background: 'conic-gradient(from 90deg at 50% 50%, #fdba74, #FF4000, #fdba74)',
                        filter: 'blur(90px)',
                        opacity: 0.8, // Increased from 0.6
                        animationDelay: '-2s'
                    }}
                />
            </div>


            {/* =========================================
          TOP RIGHT LIGHT FORM
          Balanced with the new darker palette
      ========================================= */}
            <div className="absolute -top-[15%] -right-[5%] w-[55vw] h-[55vw] z-10 pointer-events-none">

                {/* Core Intensity - Primary Dark (#ea580c) base */}
                <div
                    className="absolute top-10 right-10 w-[55%] h-[55%] rounded-[60%_40%_30%_70%_/_60%_40%_70%_30%] animate-flow-right mix-blend-multiply glass-blur"
                    style={{
                        // Darkened & Increased opacity
                        background: 'linear-gradient(225deg, rgba(234, 88, 12, 0.9), rgba(194, 65, 12, 0.4))',
                        filter: 'blur(110px)'
                    }}
                />

                {/* Outer Wash - Orange-200 to Orange-100 */}
                <div
                    className="absolute top-0 right-0 w-[85%] h-[75%] rounded-[70%_30%_30%_70%_/_70%_70%_30%_30%] animate-flow-right"
                    style={{
                        // Slightly darker wash
                        background: 'linear-gradient(180deg, #fb923c, #ffedd5)',
                        filter: 'blur(130px)',
                        opacity: 0.65, // Increased from 0.5
                        animationDelay: '-7s'
                    }}
                />

                {/* Secondary Highlight - Pop of #FF4000 */}
                <div
                    className="absolute top-[15%] right-[15%] w-[45%] h-[45%] rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] animate-flow-right animate-shimmer"
                    style={{
                        background: 'radial-gradient(circle at center, #FF4000, transparent)',
                        filter: 'blur(80px)',
                        opacity: 0.5, // Increased from 0.35
                        animationDelay: '-3s'
                    }}
                />
            </div>


            {/* =========================================
          SUBTLE DIAGONAL RAYS
          Slightly warmer to match new intensity
      ========================================= */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Left Ray */}
                <div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-gradient-to-br from-orange-200/40 via-transparent to-transparent"
                    style={{ transform: 'rotate(15deg)', filter: 'blur(60px)' }}
                />
                {/* Right Ray */}
                <div
                    className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-gradient-to-bl from-orange-50/30 via-transparent to-transparent"
                    style={{ transform: 'rotate(-15deg)', filter: 'blur(60px)' }}
                />
            </div>

            {/* =========================================
          CONTENT PLACEHOLDER (Demonstration Only)
          To show contrast with center
      ========================================= */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-7xl mx-auto px-6 text-center">
                {/* This area is intentionally left minimal to demonstrate the background's negative space */}
            </div>

        </div>
    );
};

export default SaaSHeroBackground;
