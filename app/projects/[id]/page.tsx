"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Tag,
    Layers,
} from "lucide-react";
import { gsap } from "@/app/hooks/useGsap";
import { useDataStore } from "@/app/lib/DataStore";

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { projects } = useDataStore();
    const sectionRef = useRef<HTMLDivElement>(null);

    const project = projects.find((p) => p.id === params.id);

    useEffect(() => {
        if (!sectionRef.current || !project) return;

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
            gsap.from(".detail-sidebar", {
                x: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [project]);

    if (!project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-primary">
                <div className="text-center">
                    <p className="text-6xl mb-4">🔍</p>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                        Project not found
                    </h1>
                    <p className="text-text-secondary mb-6">
                        This project may have been removed or the link is incorrect.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-text-inverse hover:bg-accent-hover"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="min-h-screen bg-bg-primary">
            {/* Hero banner */}
            <div
                className={`relative flex h-[40vh] min-h-[320px] items-end ${!project.banner_url ? `bg-gradient-to-br ${project.gradient}` : "bg-bg-secondary"}`}
            >
                {project.banner_url && (
                    <div className="absolute inset-0 z-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.banner_url} alt={`${project.title} Banner`} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                )}
                {/* Subtle overlay */}
                {!project.banner_url && <div className="absolute inset-0 bg-black/20" />}

                {/* Back button */}
                <motion.button
                    onClick={() => router.push("/#projects")}
                    className="absolute left-6 top-8 z-10 flex items-center gap-2 rounded-xl bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-black/40"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={16} />
                    Back
                </motion.button>

                {/* Icon & title */}
                <div className="detail-header relative mx-auto w-full max-w-7xl px-6 pb-10 z-10">
                    {!project.banner_url && (
                        <span className="mb-4 block text-6xl drop-shadow-lg lg:text-7xl">
                            {project.icon}
                        </span>
                    )}
                    <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        {project.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${project.status === "Completed"
                                ? "bg-emerald-500/30 text-emerald-100"
                                : "bg-amber-500/30 text-amber-100"
                                }`}
                        >
                            {project.status}
                        </span>
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="detail-content lg:col-span-2 space-y-10">
                        {/* Overview */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-text-primary">
                                Overview
                            </h2>
                            <p className="text-base leading-relaxed text-text-secondary">
                                {project.long_description || project.description}
                            </p>
                        </section>

                        {/* Challenge */}
                        {project.challenge && (
                            <section>
                                <h2 className="mb-4 text-xl font-bold text-text-primary">
                                    The Challenge
                                </h2>
                                <div className="rounded-2xl border border-border bg-bg-card p-6">
                                    <p className="text-sm leading-relaxed text-text-secondary">
                                        {project.challenge}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <section>
                                <h2 className="mb-4 text-xl font-bold text-text-primary">
                                    The Solution
                                </h2>
                                <div className="rounded-2xl border border-border bg-bg-card p-6">
                                    <p className="text-sm leading-relaxed text-text-secondary">
                                        {project.solution}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Results */}
                        {project.results && (
                            <section>
                                <h2 className="mb-4 text-xl font-bold text-text-primary">
                                    Results & Impact
                                </h2>
                                <div className="rounded-2xl border border-accent/10 bg-accent/5 p-6">
                                    <p className="text-sm leading-relaxed text-text-secondary">
                                        {project.results}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Images gallery */}
                        {project.images && project.images.length > 0 && (
                            <section>
                                <h2 className="mb-4 text-xl font-bold text-text-primary">
                                    Gallery
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {project.images.map((img, i) => (
                                        <div
                                            key={i}
                                            className="aspect-video overflow-hidden rounded-2xl border border-border bg-bg-card"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Default: no detail content yet */}
                        {!project.long_description &&
                            !project.challenge &&
                            !project.solution && (
                                <div className="rounded-2xl border border-dashed border-border bg-bg-card p-10 text-center">
                                    <p className="text-4xl mb-3">🎨</p>
                                    <p className="text-sm text-text-tertiary">
                                        Full case study coming soon. Check back later or visit the
                                        admin panel to add detailed content.
                                    </p>
                                </div>
                            )}
                    </div>

                    {/* Sidebar */}
                    <div className="detail-sidebar space-y-6">
                        {/* Tech stack */}
                        <div className="rounded-2xl border border-border bg-bg-card p-6">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                                <Layers size={14} />
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs font-medium text-text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project info */}
                        <div className="rounded-2xl border border-border bg-bg-card p-6 space-y-4">
                            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                                <Tag size={14} />
                                Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-tertiary">Category</span>
                                    <span className="text-xs font-medium text-text-primary">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="h-px bg-border" />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-tertiary">Status</span>
                                    <span
                                        className={`text-xs font-medium ${project.status === "Completed"
                                            ? "text-emerald-400"
                                            : "text-amber-400"
                                            }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        {(project.live_url || project.repo_url) && (
                            <div className="space-y-3">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-text-inverse transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
                                    >
                                        <ExternalLink size={16} />
                                        View Live Site
                                    </a>
                                )}
                                {project.repo_url && (
                                    <a
                                        href={project.repo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent/30"
                                    >
                                        <Github size={16} />
                                        Source Code
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Back to all projects */}
                        <button
                            onClick={() => router.push("/#projects")}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary"
                        >
                            <ArrowLeft size={14} />
                            All Projects
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
