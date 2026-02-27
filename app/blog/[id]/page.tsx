"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { blog } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const article = blog.find((a) => a.id === params.id);

    useEffect(() => {
        if (!sectionRef.current || !article) return;

        const ctx = gsap.context(() => {
            gsap.from(".detail-header", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
            gsap.from(".detail-content", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [article]);

    if (!article) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-primary">
                <div className="text-center">
                    <p className="text-6xl mb-4">📝</p>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                        Article not found
                    </h1>
                    <p className="text-text-secondary mb-6">
                        This article may have been removed or the link is incorrect.
                    </p>
                    <button
                        onClick={() => router.push("/#blog")}
                        className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-text-inverse hover:bg-accent-hover"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: url,
                });
            } catch (err) {
                console.error("Error sharing", err);
            }
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div ref={sectionRef} className="min-h-screen bg-bg-primary">
            {/* Hero banner */}
            <div className={`relative flex min-h-[40vh] items-end pb-12 pt-32 bg-gradient-to-br ${article.gradient}`}>
                {/* Back button */}
                <motion.button
                    onClick={() => router.push("/#blog")}
                    className="absolute left-6 top-8 z-10 flex items-center gap-2 rounded-xl bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-black/40"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={16} />
                    Back
                </motion.button>

                {/* Back button fallback for mobile */}
                <div className="absolute inset-0 bg-black/20" />

                <div className="detail-header relative mx-auto w-full max-w-4xl px-6 z-10">
                    <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {article.tag}
                    </span>
                    <h1 className="text-3xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
                        {article.title}
                    </h1>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-white/90">
                        <span className="text-sm font-medium">{article.date}</span>
                        <span className="h-1 w-1 rounded-full bg-white/50" />
                        <span className="flex items-center gap-1.5 text-sm font-medium">
                            <Clock size={14} />
                            {article.read_time}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className="mx-auto max-w-3xl px-6 py-16">
                <div className="detail-content space-y-12">
                    {/* Share bar */}
                    <div className="flex items-center justify-between border-b border-border pb-6">
                        <p className="text-sm text-text-tertiary">Share this article</p>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 rounded-xl bg-bg-secondary px-4 py-2.5 text-sm font-medium text-text-secondary transition-all hover:bg-accent hover:text-white"
                        >
                            {copied ? <Check size={16} /> : <Share2 size={16} />}
                            {copied ? "Link Copied!" : "Share"}
                        </button>
                    </div>

                    {/* Excerpt context */}
                    <p className="text-xl font-medium leading-relaxed text-text-primary border-l-2 border-accent pl-6">
                        {article.excerpt}
                    </p>

                    {/* Main content body with pre-wrap */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-base leading-relaxed text-text-secondary whitespace-pre-wrap">
                            {article.content || "Full article content coming soon."}
                        </p>
                    </div>

                    {/* Footer Share & Back */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border pt-8">
                        <button
                            onClick={() => router.push("/#blog")}
                            className="flex items-center gap-2 rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary"
                        >
                            <ArrowLeft size={16} />
                            Back to Articles
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-text-inverse transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
                        >
                            <Share2 size={16} />
                            Share Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
