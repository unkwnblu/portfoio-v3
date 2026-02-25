"use client";

import { useEffect, useRef } from "react";
import { Search, PenTool, Code, TestTube, Rocket } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discovery",
        description: "Understanding your goals, audience, and project scope through in-depth research and strategic planning.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        number: "02",
        icon: PenTool,
        title: "Design",
        description: "Wireframes, mockups, and interactive prototypes — iterating until every pixel feels right.",
        color: "from-pink-500 to-rose-500",
    },
    {
        number: "03",
        icon: Code,
        title: "Develop",
        description: "Clean, modular code with modern frameworks. Performance and accessibility baked in from day one.",
        color: "from-violet-500 to-purple-500",
    },
    {
        number: "04",
        icon: TestTube,
        title: "Test",
        description: "Rigorous cross-browser and device testing, bug fixes, and performance optimization.",
        color: "from-amber-500 to-orange-500",
    },
    {
        number: "05",
        icon: Rocket,
        title: "Launch",
        description: "Deployment, monitoring, and handoff — plus ongoing support to keep things running smoothly.",
        color: "from-emerald-500 to-green-500",
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header entrance
            gsap.from(".process-header", {
                x: -80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animated connector line draws itself
            gsap.from(".process-line", {
                scaleX: 0,
                duration: 1.5,
                ease: "power2.inOut",
                transformOrigin: "left center",
                scrollTrigger: {
                    trigger: ".process-line",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Step cards cascade in alternating from left/right
            const stepCards = sectionRef.current?.querySelectorAll(".process-step");
            stepCards?.forEach((card, i) => {
                gsap.from(card, {
                    y: 80,
                    x: i % 2 === 0 ? -40 : 40,
                    opacity: 0,
                    scale: 0.85,
                    rotation: i % 2 === 0 ? -5 : 5,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // Step numbers count up effect
            gsap.from(".step-number", {
                scale: 3,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Icons rotate in
            gsap.from(".step-icon", {
                rotation: -360,
                scale: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            });

            // Huge background number parallax
            gsap.to(".process-bg-num", {
                x: -100,
                rotation: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Huge background number */}
            <div className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 process-bg-num">
                <span
                    className="text-[20rem] font-black leading-none text-text-primary/[0.02] lg:text-[28rem]"
                    style={{ WebkitTextStroke: "1px var(--border)" }}
                >
                    05
                </span>
            </div>

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/4 blur-[130px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="process-header mb-16">
                    <span className="font-mono text-sm text-accent">How I Work</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        From Idea to Launch in{" "}
                        <span className="gradient-text">Five Steps</span>
                    </h2>
                    <p className="mt-3 max-w-lg text-text-secondary">
                        A streamlined, transparent process that keeps you in the loop at every stage.
                    </p>
                </div>

                {/* Connector line (desktop) */}
                <div className="hidden lg:block mb-8 px-8">
                    <div className="process-line h-px w-full bg-gradient-to-r from-accent/50 via-accent/20 to-accent/50" />
                </div>

                {/* Steps */}
                <div className="process-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="process-step glow-border group relative flex flex-col rounded-2xl bg-bg-card p-6 transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className={`step-number inline-block bg-gradient-to-r ${step.color} bg-clip-text text-3xl font-black text-transparent`}>
                                    {step.number}
                                </span>
                                {index < steps.length - 1 && (
                                    <div className="hidden h-px w-6 bg-border lg:block" />
                                )}
                            </div>
                            <div className="step-icon mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-secondary text-accent transition-colors group-hover:bg-accent/10">
                                <step.icon size={18} />
                            </div>
                            <h3 className="mb-2 text-base font-bold text-text-primary">{step.title}</h3>
                            <p className="text-xs leading-relaxed text-text-secondary">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
