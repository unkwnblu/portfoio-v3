"use client";

import { useEffect, useRef } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function Blog() {
    const { blog: articles } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header entrance
            gsap.from(".blog-header", {
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

            // Cards rotate and scale in from below
            gsap.from(".blog-card", {
                y: 100,
                opacity: 0,
                rotateY: -10,
                scale: 0.85,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".blog-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Tag badges pop in
            gsap.from(".blog-tag", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".blog-grid",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="blog-header mb-16">
                    <span className="font-mono text-sm text-accent">Blog</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Recent Updates
                    </h2>
                </div>

                {/* Articles grid */}
                <div className="blog-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
                    {articles.map((article) => (
                        <article
                            key={article.title}
                            className="blog-card glow-border group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-bg-card transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className={`relative flex h-36 items-end bg-gradient-to-br ${article.gradient} p-5`}>
                                <span className="blog-tag rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                    {article.tag}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="mb-2 text-base font-bold leading-snug text-text-primary group-hover:text-accent transition-colors">
                                    {article.title}
                                </h3>
                                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                                        <span>{article.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {article.read_time}
                                        </span>
                                    </div>
                                    <ArrowUpRight size={14} className="text-text-tertiary transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
