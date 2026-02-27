"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function InstagramFeed() {
    const { instagram: igPosts } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".ig-card", {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: {
                    each: 0.08,
                    from: "center",
                },
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 font-mono text-sm text-accent">
                        <Instagram size={14} />
                        Instagram
                    </span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Through My Lens
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-text-secondary">
                        Photography, street shots, and behind-the-scenes moments from my creative life.
                    </p>
                </motion.div>

                {/* IG Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {igPosts.map((post, i) => (
                        <div
                            key={i}
                            className="ig-card group relative aspect-square cursor-pointer overflow-hidden rounded-2xl"
                        >
                            {/* Placeholder image (gradient) */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-500 group-hover:scale-110`}
                            />

                            {/* Camera overlay pattern */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="flex items-center gap-2 text-white">
                                    <Heart size={18} fill="white" />
                                    <span className="text-sm font-bold">{post.likes}</span>
                                </div>
                                <p className="mt-2 px-4 text-center text-xs text-white/80">
                                    {post.caption}
                                </p>
                            </div>

                            {/* Corner gradient */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                {/* Follow CTA */}
                <div className="mt-10 flex justify-center">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent/30 hover:bg-bg-card-hover"
                    >
                        <Instagram size={16} className="text-accent" />
                        Follow on Instagram
                        <ExternalLink size={14} className="text-text-tertiary transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
