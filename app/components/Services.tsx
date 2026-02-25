"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Palette, Globe, Smartphone, Cpu } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";

const services = [
    {
        icon: Palette,
        title: "UI/UX Design",
        description:
            "Crafting intuitive, user-centered interfaces through research, wireframing, prototyping, and polished design systems.",
        skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Figma"],
        gradient: "from-pink-500/10 to-rose-500/10",
        iconColor: "text-pink-400",
    },
    {
        icon: Globe,
        title: "Web Development",
        description:
            "Building performant, SEO-friendly web applications with modern frameworks, clean architecture, and responsive layouts.",
        skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
        gradient: "from-blue-500/10 to-cyan-500/10",
        iconColor: "text-blue-400",
    },
    {
        icon: Smartphone,
        title: "Mobile Development",
        description:
            "Creating cross-platform mobile apps with fluid animations, offline support, and native-level performance.",
        skills: ["React Native", "Flutter", "Expo", "Firebase", "App Store"],
        gradient: "from-violet-500/10 to-purple-500/10",
        iconColor: "text-violet-400",
    },
    {
        icon: Cpu,
        title: "IoT & Hardware",
        description:
            "Designing embedded systems and IoT solutions — from sensor integration to real-time dashboards and ML models.",
        skills: ["Arduino", "Raspberry Pi", "Python", "MQTT", "TensorFlow"],
        gradient: "from-emerald-500/10 to-green-500/10",
        iconColor: "text-emerald-400",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header slide in
            gsap.from(".services-header", {
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

            // Cards entrance — staggered with 3D rotation
            gsap.from(".service-card", {
                y: 100,
                opacity: 0,
                rotateX: -12,
                scale: 0.9,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Icon spin on entrance
            gsap.from(".service-icon", {
                rotation: -180,
                scale: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Floating orb parallax
            gsap.to(".services-orb", {
                y: -80,
                x: 40,
                rotation: 90,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            });

            // Skill tags wave in
            gsap.from(".skill-tag", {
                opacity: 0,
                y: 10,
                duration: 0.3,
                stagger: 0.03,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative py-32 overflow-hidden">
            {/* Large floating orb */}
            <div className="pointer-events-none absolute -right-40 top-20 services-orb">
                <div className="h-[400px] w-[400px] rounded-full border border-accent/10 bg-accent/3 blur-sm" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="services-header mb-16 text-center">
                    <span className="font-mono text-sm text-accent">What I Do</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Services & Capabilities
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-text-secondary">
                        From concept to deployment — I cover the full spectrum of digital product creation.
                    </p>
                </div>

                {/* Services grid */}
                <div className="services-grid grid gap-5 sm:grid-cols-2" style={{ perspective: "1200px" }}>
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="service-card glow-border group relative overflow-hidden rounded-2xl bg-bg-card p-7 transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                            <div className="relative">
                                <div className={`service-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary ${service.iconColor} transition-colors group-hover:bg-accent/10`}>
                                    <service.icon size={22} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-text-primary">{service.title}</h3>
                                <p className="mb-5 text-sm leading-relaxed text-text-secondary">{service.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {service.skills.map((skill) => (
                                        <span key={skill} className="skill-tag rounded-md border border-border bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-text-tertiary">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
