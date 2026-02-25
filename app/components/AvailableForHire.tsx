"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";

export default function AvailableForHire() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.from(".hire-card", {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            // Orbiting dots
            gsap.to(".orbit-dot", {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: "none",
                transformOrigin: "200px 200px",
            });

            // Pulsing glow
            gsap.to(".hire-glow", {
                scale: 1.2,
                opacity: 0.6,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Mirror reflection text
            gsap.from(".hire-mirror", {
                opacity: 0,
                y: 20,
                duration: 1.2,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="hire-card relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-bg-card to-accent/3 p-12 sm:p-16">
                    {/* Large animated background elements */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="hire-glow absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
                        <div className="hire-glow absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/8 blur-[80px]" />

                        {/* Orbiting dots */}
                        <div className="absolute right-10 top-10 sm:right-20 sm:top-20">
                            {[0, 90, 180, 270].map((deg) => (
                                <div
                                    key={deg}
                                    className="orbit-dot absolute h-2 w-2 rounded-full bg-accent/40"
                                    style={{
                                        transform: `rotate(${deg}deg) translateX(60px)`,
                                        transformOrigin: "0 0",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Grid dots */}
                        <div className="absolute bottom-8 right-8 grid grid-cols-6 gap-3 opacity-20">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <div key={i} className="h-1 w-1 rounded-full bg-accent" />
                            ))}
                        </div>
                    </div>

                    <div className="relative text-center">
                        {/* Status indicator */}
                        <div className="mb-8 flex justify-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                                </span>
                                Currently Available
                            </span>
                        </div>

                        {/* Main text */}
                        <h2 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                            Ready to bring your
                            <br />
                            <span className="gradient-text">next project</span> to life
                            <span className="text-accent">?</span>
                        </h2>

                        {/* Mirror reflection of text */}
                        <div className="hire-mirror mt-1 overflow-hidden" style={{ height: "60px" }}>
                            <h2
                                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl [transform:scaleY(-1)] opacity-[0.06] blur-[1px]"
                                aria-hidden
                            >
                                <span className="gradient-text">next project</span> to life?
                            </h2>
                        </div>

                        <p className="mx-auto mt-6 max-w-lg text-text-secondary">
                            I&apos;m open to freelance opportunities, collaborations, and exciting
                            projects. Let&apos;s create something extraordinary together.
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <motion.button
                                onClick={() =>
                                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-text-inverse transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent-glow"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Zap size={18} />
                                Hire Me
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </motion.button>
                            <motion.a
                                href="/resume.pdf"
                                className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-8 py-4 text-base font-bold text-text-primary transition-all hover:border-accent/30"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Download CV
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
