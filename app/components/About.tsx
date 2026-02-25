"use client";

import { useEffect, useRef } from "react";
import { Camera, Tv, Video, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { profile } from "@/app/data/profile";

const interests = [
    { label: "Photography", emoji: "📸", color: "from-orange-500 to-amber-500" },
    { label: "Anime", emoji: "🎬", color: "from-pink-500 to-rose-500" },
    { label: "Videography", emoji: "🎥", color: "from-blue-500 to-cyan-500" },
];

const stats = [
    { value: "20+", label: "Projects built" },
    { value: "2+", label: "Years experience" },
    { value: "15+", label: "Happy clients" },
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Section header reveal
            gsap.from(".about-header", {
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

            // Bio card — slide in from left with slight rotation
            gsap.from(".about-bio", {
                x: -120,
                opacity: 0,
                rotateY: -8,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-bio",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Stats card — slide in from right
            gsap.from(".about-stats", {
                x: 120,
                opacity: 0,
                rotateY: 8,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-stats",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Interest tiles — burst from center
            gsap.from(".about-interest", {
                scale: 0,
                opacity: 0,
                rotation: -15,
                duration: 0.7,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".about-interests-row",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            // Stat counters count up
            const statEls = sectionRef.current?.querySelectorAll(".stat-value");
            statEls?.forEach((el) => {
                const target = parseInt(el.textContent || "0");
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val) + "+";
                    },
                });
            });

            // Parallax big decorative element
            gsap.to(".about-decor", {
                y: -100,
                rotation: 45,
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
        <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
            {/* Large decorative element */}
            <div className="pointer-events-none absolute -left-32 top-20 about-decor">
                <div className="h-64 w-64 rounded-3xl border border-accent/10 bg-accent/3 rotate-12" />
            </div>
            <div className="pointer-events-none absolute -right-20 bottom-20 about-decor">
                <div className="h-40 w-40 rounded-full border border-accent/8 bg-accent/2" />
            </div>

            <div className="mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="about-header mb-16">
                    <span className="font-mono text-sm text-accent">01 —</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        About Me
                    </h2>
                </div>

                {/* Bento grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
                    {/* Bio card */}
                    <div className="about-bio glow-border rounded-2xl bg-bg-card p-8 sm:col-span-2">
                        <p className="text-base leading-relaxed text-text-secondary lg:text-lg">
                            {profile.bio}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs font-medium text-text-secondary">
                                <MapPin size={12} className="text-accent" />
                                {profile.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs font-medium text-text-secondary">
                                <Briefcase size={12} className="text-accent" />
                                Freelancer
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs font-medium text-text-secondary">
                                <GraduationCap size={12} className="text-accent" />
                                Student
                            </span>
                        </div>
                    </div>

                    {/* Stats card */}
                    <div className="about-stats glow-border flex flex-col justify-between rounded-2xl bg-bg-card p-8">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                            By the Numbers
                        </h3>
                        <div className="mt-6 flex flex-col gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <span className="stat-value text-2xl font-bold text-text-primary">
                                        {stat.value}
                                    </span>
                                    <p className="text-sm text-text-tertiary">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interest tiles */}
                    <div className="about-interests-row contents">
                        {interests.map((interest) => (
                            <div
                                key={interest.label}
                                className="about-interest glow-border group relative overflow-hidden rounded-2xl bg-bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]`}
                                />
                                <div className="relative flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary text-xl">
                                        {interest.emoji}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-text-primary">{interest.label}</p>
                                        <p className="text-xs text-text-tertiary">Passion project</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
