"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";

const testimonials = [
    {
        name: "Adaeze O.",
        role: "Founder, Bloom Studios",
        content:
            "Dwayne completely transformed our digital presence. His eye for design combined with solid engineering skills is rare — the final product exceeded every expectation.",
        rating: 5,
        gradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
        name: "Michael K.",
        role: "CTO, InnovateTech",
        content:
            "Working with Dwayne was seamless. He understood the vision on day one and delivered a robust, scalable system ahead of schedule. Highly recommended.",
        rating: 5,
        gradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
        name: "Fatima B.",
        role: "Product Manager, EduLeap",
        content:
            "The mobile app Dwayne built for us is beautiful and lightning-fast. Our users love it — engagement metrics jumped 40% in the first month.",
        rating: 5,
        gradient: "from-violet-500/10 to-purple-500/10",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header entrance
            gsap.from(".testi-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            // Cards flip in with 3D perspective
            gsap.from(".testimonial-card", {
                rotateX: -20,
                y: 100,
                opacity: 0,
                scale: 0.8,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testi-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Stars pop in sequentially
            gsap.from(".testi-star", {
                scale: 0,
                rotation: 180,
                duration: 0.4,
                stagger: 0.04,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".testi-grid",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            // Avatars pop in
            gsap.from(".testi-avatar", {
                scale: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: ".testi-grid",
                    start: "top 72%",
                    toggleActions: "play none none reverse",
                },
            });

            // Large quote parallax
            gsap.to(".testi-quote-bg", {
                y: -60,
                rotation: 20,
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
            {/* Huge background quote */}
            <div className="pointer-events-none absolute -left-10 top-20 testi-quote-bg">
                <Quote size={300} className="text-accent/[0.03]" strokeWidth={0.5} />
            </div>

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/3 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="testi-header mb-16 text-center">
                    <span className="font-mono text-sm text-accent">Testimonials</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        What Kind of Impression
                        <br />
                        <span className="gradient-text">Do I Make?</span>
                    </h2>
                </div>

                {/* Testimonial cards */}
                <div className="testi-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="testimonial-card glow-border group relative overflow-hidden rounded-2xl bg-bg-card p-7 transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                            <div className="relative">
                                <Quote size={24} className="mb-4 text-accent/30" />
                                <div className="mb-4 flex gap-0.5">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={14} className="testi-star fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="testi-avatar flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                                        <p className="text-xs text-text-tertiary">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
