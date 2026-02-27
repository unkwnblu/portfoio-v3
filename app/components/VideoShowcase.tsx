"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function VideoShowcase() {
    const { videos } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".video-card", {
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Parallax on the large background text
            gsap.to(".video-bg-text", {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="videos" className="relative py-32 overflow-hidden">
            {/* Huge background text */}
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 video-bg-text">
                <span
                    className="text-[12rem] font-black tracking-tighter leading-none whitespace-nowrap sm:text-[16rem] text-text-primary/[0.02]"
                    style={{ WebkitTextStroke: "1px var(--border)" }}
                >
                    VIDEO REEL
                </span>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="font-mono text-sm text-accent">Creative Reel</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Video & Motion Work
                    </h2>
                    <p className="mt-3 max-w-lg text-text-secondary">
                        Edits, cinematography, and motion pieces — from anime AMVs
                        to product reveals.
                    </p>
                </motion.div>

                {/* Video grid */}
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:h-[500px] grid-flow-row-dense">
                    {videos.map((video) => {
                        const isPortrait = video.orientation === "portrait";
                        return (
                            <div
                                key={video.title}
                                className={`video-card glow-border group relative flex flex-col overflow-hidden rounded-2xl bg-bg-card ${isPortrait
                                    ? "md:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[400px] lg:min-h-0"
                                    : "md:col-span-1 lg:col-span-2 lg:row-span-1 min-h-[250px] lg:min-h-0"
                                    }`}
                            >
                                {/* Video thumbnail */}
                                <div
                                    className={`relative flex items-center justify-center overflow-hidden flex-1 ${!video.video_url ? `bg-gradient-to-br ${video.gradient}` : "bg-black"} h-full w-full`}
                                >
                                    {video.video_url && (
                                        <video src={video.video_url} className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline />
                                    )}
                                    {/* Play button - Only show if no video plays natively */}
                                    {!video.video_url && (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-transform group-hover:scale-110 z-10">
                                            <Play size={20} fill="white" />
                                        </div>
                                    )}

                                    {/* Duration badge */}
                                    <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-mono font-bold text-white backdrop-blur-sm z-20">
                                        {video.duration}
                                    </span>

                                    {/* Tag */}
                                    <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md z-20">
                                        {video.tag}
                                    </span>

                                    {/* Gradient overlay for text if portrait or fallback shadow for video readability */}
                                    {isPortrait ? (
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 z-10 pointer-events-none" />
                                    ) : video.video_url && (
                                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20 z-10 pointer-events-none" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className={`p-5 flex flex-col justify-end ${isPortrait ? "absolute bottom-0 left-0 right-0 z-20" : ""}`}>
                                    <h3 className={`mb-3 font-bold transition-colors ${isPortrait ? "text-white group-hover:text-accent" : "text-text-primary group-hover:text-accent"}`}>
                                        {video.title}
                                    </h3>
                                    <div className={`flex items-center gap-4 text-xs ${isPortrait ? "text-white/80" : "text-text-tertiary"}`}>
                                        <span className="flex items-center gap-1">
                                            <Play size={10} />
                                            {video.views} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart size={10} />
                                            {video.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle size={10} />
                                            Reply
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View more */}
                <div className="mt-8 flex justify-center">
                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent/30 hover:bg-bg-card-hover"
                    >
                        View Full Reel on TikTok
                        <ExternalLink size={14} className="text-accent transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
