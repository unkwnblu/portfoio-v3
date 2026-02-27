"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function InstagramFeed() {
    const { instagram: igPosts, profile } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);

    const igLink = profile.social_links.find(l =>
        l.name.toLowerCase().includes('instagram') || l.url.includes('instagram')
    )?.url || "https://instagram.com";

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
                            key={post.id || i}
                            className="ig-card group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-bg-secondary"
                        >
                            {/* Render image if exists, else fallback gradient */}
                            {post.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={post.image_url}
                                    alt={`Instagram post ${i + 1}`}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-500 group-hover:scale-105`} />
                            )}

                            {/* Hover dark overlay */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <a
                        href={igLink}
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
