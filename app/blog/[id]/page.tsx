"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { blog, profile, projects } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const article = blog.find((a) => a.id === params.id);
    const relatedArticles = blog.filter((a) => !a.is_archived && a.id !== params.id).slice(0, 3);
    const latestProjects = projects.slice(0, 3);

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

            {/* Two-Column Content Layout */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-[1fr_320px] lg:gap-16 items-start">

                {/* Left Column: Article Body */}
                <div className="detail-content space-y-12 min-w-0">
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

                {/* Right Column: Sticky Sidebar */}
                <aside className="detail-sidebar hidden lg:flex flex-col gap-8 sticky top-32">

                    {/* Author Profile Block */}
                    <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-full border border-accent/20 bg-bg-secondary shrink-0">
                                <Image
                                    src="/profile.png"
                                    alt="Author"
                                    fill
                                    sizes="64px"
                                    className="object-cover object-top"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-text-primary">{profile.name}</h3>
                                <p className="text-sm text-accent">Author</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold tracking-wider text-text-tertiary uppercase">
                                Keep Reading
                            </h3>
                            <div className="flex flex-col gap-4">
                                {relatedArticles.map((rel) => (
                                    <button
                                        key={rel.id}
                                        onClick={() => router.push(`/blog/${rel.id}`)}
                                        className="group flex flex-col gap-1 text-left"
                                    >
                                        <h4 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-accent line-clamp-2">
                                            {rel.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-text-tertiary mt-1">
                                            <span>{rel.date}</span>
                                            <span className="h-1 w-1 rounded-full bg-border" />
                                            <span>{rel.read_time}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Latest Work */}
                    {latestProjects.length > 0 && (
                        <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold tracking-wider text-text-tertiary uppercase">
                                Latest Work
                            </h3>
                            <div className="flex flex-col gap-5">
                                {latestProjects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => router.push(`/projects/${project.id}`)}
                                        className="group relative block w-full overflow-hidden rounded-xl border border-border glow-border transition-transform hover:-translate-y-1"
                                    >
                                        <div className={`aspect-[16/9] w-full relative overflow-hidden flex items-center justify-center ${!project.banner_url ? `bg-gradient-to-br ${project.gradient}` : "bg-bg-secondary"}`}>
                                            {project.banner_url && (
                                                <Image
                                                    src={project.banner_url}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                            {project.banner_url && <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                                <span className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white shadow-lg">View Project</span>
                                            </div>}
                                            {!project.banner_url && <span className="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{project.icon}</span>}
                                            {!project.banner_url && <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm">
                                                <span className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white shadow-lg">View Project</span>
                                            </div>}
                                            <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                                {project.category}
                                            </div>
                                        </div>
                                        <div className="bg-bg-card p-4 text-left">
                                            <h4 className="text-sm font-bold text-text-primary truncate transition-colors group-hover:text-accent">{project.title}</h4>
                                            <p className="text-xs text-text-secondary truncate mt-1">{project.tech_stack.join(" • ")}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
