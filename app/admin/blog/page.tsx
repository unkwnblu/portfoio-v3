"use client";

import { useState } from "react";
import { useDataStore, BlogArticle } from "@/app/lib/DataStore";
import { Plus, Pencil, Trash2, Check, Clock } from "lucide-react";

const gradientOptions = [
    "from-rose-500/20 to-pink-600/20", "from-blue-500/20 to-indigo-600/20",
    "from-amber-500/20 to-orange-600/20", "from-emerald-500/20 to-green-600/20",
    "from-violet-500/20 to-purple-600/20", "from-cyan-500/20 to-teal-600/20",
];

const emptyArticle: Omit<BlogArticle, "id"> = {
    title: "", excerpt: "", date: "", readTime: "", gradient: gradientOptions[0], tag: "",
};

export default function BlogAdmin() {
    const { blog, addBlogArticle, updateBlogArticle, deleteBlogArticle } = useDataStore();
    const [editing, setEditing] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState(emptyArticle);

    const startCreate = () => { setCreating(true); setEditing(null); setForm(emptyArticle); };
    const startEdit = (a: BlogArticle) => { setEditing(a.id); setCreating(false); setForm(a); };
    const handleCancel = () => { setCreating(false); setEditing(null); setForm(emptyArticle); };

    const handleSave = () => {
        if (!form.title.trim()) return;
        if (creating) addBlogArticle({ ...form, id: `blog-${Date.now()}` });
        else if (editing) updateBlogArticle(editing, form);
        handleCancel();
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Blog Articles</h1>
                    <p className="mt-1 text-sm text-text-secondary">{blog.length} articles total</p>
                </div>
                {!creating && !editing && (
                    <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-text-inverse hover:bg-accent-hover">
                        <Plus size={16} /> Add Article
                    </button>
                )}
            </div>

            {(creating || editing) && (
                <div className="mb-8 rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-lg font-semibold text-text-primary">{creating ? "New Article" : "Edit Article"}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Title</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="Article title" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Excerpt</label>
                            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="Brief excerpt..." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Tag</label>
                            <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="Design, Engineering, etc." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Date</label>
                            <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="Jan 2026" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Read Time</label>
                            <input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="5 min read" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Gradient</label>
                            <div className="flex flex-wrap gap-2">
                                {gradientOptions.map((g) => (
                                    <button key={g} onClick={() => setForm({ ...form, gradient: g })} className={`h-8 w-12 rounded-lg bg-gradient-to-br ${g} transition-all ${form.gradient === g ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-card" : "opacity-50 hover:opacity-100"}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-text-inverse hover:bg-accent-hover"><Check size={14} /> Save</button>
                        <button onClick={handleCancel} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary">Cancel</button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {blog.map((article) => (
                    <div key={article.id} className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4 transition-all hover:border-accent/10">
                        <div className={`flex h-12 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${article.gradient} text-[9px] font-bold uppercase text-white/70 shrink-0`}>
                            {article.tag}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate font-semibold text-sm text-text-primary">{article.title}</p>
                            <p className="flex items-center gap-2 text-xs text-text-tertiary">
                                {article.date} <Clock size={10} /> {article.readTime}
                            </p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                            <button onClick={() => startEdit(article)} className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-bg-secondary hover:text-accent"><Pencil size={14} /></button>
                            <button onClick={() => deleteBlogArticle(article.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-red-500/10 hover:text-red-400"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
                {blog.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border bg-bg-card p-12 text-center">
                        <p className="text-sm text-text-tertiary">No articles yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
