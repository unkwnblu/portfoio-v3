"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { profile } from "@/app/data/profile";

const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
};

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Card entrance — scale up from small
            gsap.from(".contact-card", {
                scale: 0.85,
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            // Text stagger reveal
            gsap.from(".contact-text-line", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-card",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Social icons pop in
            gsap.from(".contact-social", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".contact-card",
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                },
            });

            // Background orbs pulsing
            gsap.to(".contact-orb", {
                scale: 1.3,
                opacity: 0.8,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: 0.5,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="contact-card relative overflow-hidden rounded-3xl border border-border bg-bg-card p-10 sm:p-16">
                    {/* Animated background orbs */}
                    <div className="pointer-events-none absolute -right-20 -top-20 contact-orb h-60 w-60 rounded-full bg-accent/8 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 contact-orb h-60 w-60 rounded-full bg-accent/5 blur-[80px]" />

                    <div className="relative flex flex-col items-center text-center">
                        <span className="contact-text-line font-mono text-sm text-accent">03 —</span>
                        <h2 className="contact-text-line mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
                            Let&apos;s work
                            <span className="gradient-text"> together</span>.
                        </h2>
                        <p className="contact-text-line mt-4 max-w-md text-text-secondary">
                            Have a project in mind, a collaboration idea, or just want to say
                            hello? I&apos;d love to hear from you.
                        </p>

                        {/* Email CTA */}
                        <motion.a
                            href={`mailto:${profile.email}`}
                            className="contact-text-line group mt-10 inline-flex items-center gap-3 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-text-inverse transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Mail size={18} />
                            {profile.email}
                            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </motion.a>

                        {/* Social links */}
                        <div className="mt-8 flex gap-3">
                            {profile.socialLinks.map((link) => {
                                const Icon = socialIcons[link.icon] || Github;
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-secondary text-text-secondary transition-all hover:border-accent/30 hover:text-accent"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={link.name}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
