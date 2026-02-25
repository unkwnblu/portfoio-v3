"use client";

import { useState } from "react";
import { useDataStore, InstagramPost } from "@/app/lib/DataStore";
import { Plus, Pencil, Trash2, Check, Heart } from "lucide-react";

const gradientOptions = [
    "from-amber-400 to-orange-600", "from-blue-400 to-indigo-600",
    "from-pink-400 to-rose-600", "from-emerald-400 to-teal-600",
    "from-violet-400 to-purple-600", "from-cyan-400 to-blue-600",
    "from-red-400 to-rose-600", "from-yellow-400 to-amber-600",
];

const emptyPost: Omit<InstagramPost, "id"> = { gradient: gradientOptions[0], likes: "0", caption: "" };

export default function InstagramAdmin() {
    const { instagram, addInstagramPost, updateInstagramPost, deleteInstagramPost } = useDataStore();
    const [editing, setEditing] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState(emptyPost);

    const startCreate = () => { setCreating(true); setEditing(null); setForm(emptyPost); };
    const startEdit = (p: InstagramPost) => { setEditing(p.id); setCreating(false); setForm(p); };
    const handleCancel = () => { setCreating(false); setEditing(null); setForm(emptyPost); };

    const handleSave = () => {
        if (!form.caption.trim()) return;
        if (creating) addInstagramPost({ ...form, id: `ig-${Date.now()}` });
        else if (editing) updateInstagramPost(editing, form);
        handleCancel();
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Instagram Posts</h1>
                    <p className="mt-1 text-sm text-text-secondary">{instagram.length} posts total</p>
                </div>
                {!creating && !editing && (
                    <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-text-inverse hover:bg-accent-hover">
                        <Plus size={16} /> Add Post
                    </button>
                )}
            </div>

            {(creating || editing) && (
                <div className="mb-8 rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-lg font-semibold text-text-primary">{creating ? "New Post" : "Edit Post"}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Caption</label>
                            <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="Photo caption..." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Likes</label>
                            <input value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="2.4K" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Color Theme</label>
                            <div className="flex flex-wrap gap-2">
                                {gradientOptions.map((g) => (
                                    <button key={g} onClick={() => setForm({ ...form, gradient: g })} className={`h-8 w-8 rounded-lg bg-gradient-to-br ${g} transition-all ${form.gradient === g ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-card" : "opacity-50 hover:opacity-100"}`} />
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

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {instagram.map((post) => (
                    <div key={post.id} className="group relative aspect-square overflow-hidden rounded-2xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                <div className="flex items-center gap-1 text-white text-xs"><Heart size={12} fill="white" /> {post.likes}</div>
                                <p className="text-white/80 text-[10px] px-3 text-center">{post.caption}</p>
                                <div className="flex gap-1 mt-2">
                                    <button onClick={() => startEdit(post)} className="flex h-7 w-7 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30"><Pencil size={12} /></button>
                                    <button onClick={() => deleteInstagramPost(post.id)} className="flex h-7 w-7 items-center justify-center rounded bg-white/20 text-white hover:bg-red-500/50"><Trash2 size={12} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {instagram.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-bg-card p-12 text-center">
                    <p className="text-sm text-text-tertiary">No posts yet.</p>
                </div>
            )}
        </div>
    );
}
