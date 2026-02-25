"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Video,
    Instagram,
    FileText,
    MessageSquareQuote,
    User,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Videos", href: "/admin/videos", icon: Video },
    { label: "Instagram", href: "/admin/instagram", icon: Instagram },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Profile", href: "/admin/profile", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-bg-primary">
            {/* Sidebar */}
            <aside
                className={`sticky top-0 flex h-screen flex-col border-r border-border bg-bg-card transition-all duration-300 ${collapsed ? "w-16" : "w-64"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between border-b border-border p-4">
                    {!collapsed && (
                        <div>
                            <h1 className="text-base font-bold text-text-primary">
                                <span className="gradient-text">D</span>wayne
                                <span className="gradient-text">.</span>
                            </h1>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                                Admin Portal
                            </p>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary"
                    >
                        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto p-2">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                            ? "bg-accent/10 text-accent"
                                            : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                                        }`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <item.icon size={18} className={isActive ? "text-accent" : ""} />
                                    {!collapsed && <span>{item.label}</span>}
                                    {isActive && !collapsed && (
                                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Back to site */}
                <div className="border-t border-border p-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-text-tertiary transition-all hover:bg-bg-secondary hover:text-text-primary"
                    >
                        <ArrowLeft size={16} />
                        {!collapsed && <span>Back to Site</span>}
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
