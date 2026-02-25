"use client";

import { useDataStore } from "@/app/lib/DataStore";
import {
    FolderKanban,
    Video,
    Instagram,
    FileText,
    MessageSquareQuote,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";

const statIconMap: Record<string, React.ElementType> = {
    projects: FolderKanban,
    videos: Video,
    instagram: Instagram,
    blog: FileText,
    testimonials: MessageSquareQuote,
};

export default function AdminDashboard() {
    const store = useDataStore();

    const stats = [
        { key: "projects", label: "Projects", count: store.projects.length, href: "/admin/projects", color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { key: "videos", label: "Videos", count: store.videos.length, href: "/admin/videos", color: "text-blue-400", bg: "bg-blue-400/10" },
        { key: "instagram", label: "IG Posts", count: store.instagram.length, href: "/admin/instagram", color: "text-pink-400", bg: "bg-pink-400/10" },
        { key: "blog", label: "Articles", count: store.blog.length, href: "/admin/blog", color: "text-amber-400", bg: "bg-amber-400/10" },
        { key: "testimonials", label: "Testimonials", count: store.testimonials.length, href: "/admin/testimonials", color: "text-violet-400", bg: "bg-violet-400/10" },
    ];

    const recentProjects = store.projects.slice(0, 5);
    const ongoingCount = store.projects.filter((p) => p.status === "Ongoing").length;
    const completedCount = store.projects.filter((p) => p.status === "Completed").length;

    return (
        <div>
            {/* Page header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
                <p className="mt-1 text-sm text-text-secondary">
                    Welcome back, {store.profile.name}. Here&apos;s your content overview.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-10">
                {stats.map((stat) => {
                    const Icon = statIconMap[stat.key] || FolderKanban;
                    return (
                        <Link
                            key={stat.key}
                            href={stat.href}
                            className="group rounded-2xl border border-border bg-bg-card p-5 transition-all hover:border-accent/20 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg}`}>
                                    <Icon size={16} className={stat.color} />
                                </div>
                                <TrendingUp size={14} className="text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <p className="mt-4 text-2xl font-bold text-text-primary">{stat.count}</p>
                            <p className="text-xs text-text-tertiary">{stat.label}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Content cards */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent projects */}
                <div className="rounded-2xl border border-border bg-bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold text-text-primary">Recent Projects</h2>
                        <Link href="/admin/projects" className="text-xs font-medium text-accent hover:underline">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center gap-3 rounded-xl bg-bg-secondary p-3"
                            >
                                <span className="text-xl">{project.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-text-primary">
                                        {project.title}
                                    </p>
                                    <p className="text-xs text-text-tertiary">{project.category}</p>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${project.status === "Completed"
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-amber-500/10 text-amber-400"
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </div>
                        ))}
                        {recentProjects.length === 0 && (
                            <p className="text-sm text-text-tertiary text-center py-4">No projects yet</p>
                        )}
                    </div>
                </div>

                {/* Project status breakdown */}
                <div className="rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-4 font-semibold text-text-primary">Project Status</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="mb-1 flex justify-between text-xs">
                                <span className="text-text-secondary">Completed</span>
                                <span className="font-mono text-emerald-400">{completedCount}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                                <div
                                    className="h-full rounded-full bg-emerald-400 transition-all"
                                    style={{
                                        width: store.projects.length
                                            ? `${(completedCount / store.projects.length) * 100}%`
                                            : "0%",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-1 flex justify-between text-xs">
                                <span className="text-text-secondary">Ongoing</span>
                                <span className="font-mono text-amber-400">{ongoingCount}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                                <div
                                    className="h-full rounded-full bg-amber-400 transition-all"
                                    style={{
                                        width: store.projects.length
                                            ? `${(ongoingCount / store.projects.length) * 100}%`
                                            : "0%",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick profile info */}
                    <div className="mt-8 rounded-xl border border-border bg-bg-secondary p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">Profile</p>
                        <p className="text-sm font-semibold text-text-primary">{store.profile.name}</p>
                        <p className="text-xs text-text-secondary">{store.profile.email}</p>
                        <p className="text-xs text-text-tertiary mt-1">{store.profile.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
