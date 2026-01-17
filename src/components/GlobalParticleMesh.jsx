import React, { useEffect, useRef } from 'react';

const GlobalParticleMesh = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let w, h;
        let particles = [];
        let mouse = { x: null, y: null };

        // Configuration for LIGHT background (White base)
        const config = {
            particleColor: 'rgba(234, 88, 12, 0.54)', // Tactical Orange - visible on white
            lineColor: 'rgba(249, 115, 22, 0.14)',    // Faint connection lines
            accentColor: 'rgba(255, 64, 0, 1)',
            particleAmount: 0, // Calculated dynamically
            defaultSpeed: 0.4,
            variantSpeed: 0.5,
            linkRadius: 170,
            mouseRadius: 220,
        };

        // Helper to check if a point is within the central content mask
        const isInMask = (x, y) => {
            const maskW = 1000;
            const maskH = 650;
            const centerX = w / 2;
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
                this.size = Math.random() * 2 + 1.5; // Slightly larger for visibility
                this.color = config.particleColor;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.mouseRadius - distance) / config.mouseRadius;
                        const directionX = forceDirectionX * force * 3; // Push strength
                        const directionY = forceDirectionY * force * 3;

                        this.x -= directionX;
                        this.y -= directionY;
                        this.color = config.accentColor;
                    } else {
                        this.color = config.particleColor;
                    }
                }
            }

            draw() {
                // Don't render particles inside the content mask
                if (isInMask(this.x, this.y)) return;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;

            // Adjust particle count based on screen area to keep density consistent
            // Hero had ~80-100 for a section, we need more for full screen but not too many
            const area = w * h;
            const density = 0.0001; // Particles per pixel squared
            const count = Math.floor(area * density) < 50 ? 50 : Math.floor(area * density * 0.6);

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw Connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.linkRadius) {
                        // Check if either particle is in the mask, if so, don't draw line
                        if (isInMask(particles[i].x, particles[i].y) || isInMask(particles[j].x, particles[j].y)) {
                            continue;
                        }

                        ctx.beginPath();
                        ctx.strokeStyle = config.lineColor;
                        ctx.lineWidth = 1; // Thicker lines for visibility
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[0] pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default GlobalParticleMesh;
