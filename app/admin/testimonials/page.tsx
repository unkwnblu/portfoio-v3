"use client";

import { useState } from "react";
import { useDataStore } from "@/app/lib/DataStore";
import type { Testimonial } from "@/app/types";
import { Plus, Pencil, Trash2, Check, Star, Quote } from "lucide-react";
import ConfirmModal from "@/app/admin/components/ConfirmModal";

const gradientOptions = [
    "from-emerald-500/10 to-teal-500/10", "from-blue-500/10 to-indigo-500/10",
    "from-violet-500/10 to-purple-500/10", "from-pink-500/10 to-rose-500/10",
    "from-amber-500/10 to-yellow-500/10", "from-cyan-500/10 to-blue-500/10",
];

const emptyTestimonial: Omit<Testimonial, "id"> = {
    name: "", role: "", content: "", rating: 5, gradient: gradientOptions[0],
};

export default function TestimonialsAdmin() {
    const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useDataStore();
    const [editing, setEditing] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState(emptyTestimonial);
    const [itemToDelete, setItemToDelete] = useState<{ id: string, name?: string } | null>(null);

    const startCreate = () => { setCreating(true); setEditing(null); setForm(emptyTestimonial); };
    const startEdit = (t: Testimonial) => { setEditing(t.id); setCreating(false); setForm(t); };
    const handleCancel = () => { setCreating(false); setEditing(null); setForm(emptyTestimonial); };

    const handleSave = async () => {
        if (!form.name.trim() || !form.content.trim()) return;
        if (creating) await addTestimonial(form);
        else if (editing) await updateTestimonial(editing, form);
        handleCancel();
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Testimonials</h1>
                    <p className="mt-1 text-sm text-text-secondary">{testimonials.length} testimonials</p>
                </div>
                {!creating && !editing && (
                    <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-text-inverse hover:bg-accent-hover">
                        <Plus size={16} /> Add Testimonial
                    </button>
                )}
            </div>

            {(creating || editing) && (
                <div className="mb-8 rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-lg font-semibold text-text-primary">{creating ? "New Testimonial" : "Edit Testimonial"}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Name</label>
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="Client name" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Role</label>
                            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="CEO, Company" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Quote</label>
                            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="What they said..." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <button key={r} onClick={() => setForm({ ...form, rating: r })} className="transition-transform hover:scale-110">
                                        <Star size={20} className={r <= form.rating ? "fill-amber-400 text-amber-400" : "text-text-tertiary"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Gradient</label>
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                    <div key={t.id} className={`rounded-2xl border border-border bg-bg-card p-5 transition-all hover:border-accent/10`}>
                        <Quote size={18} className="text-accent/30 mb-3" />
                        <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-xs leading-relaxed text-text-secondary mb-4">&ldquo;{t.content}&rdquo;</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{t.name.charAt(0)}</div>
                                <div>
                                    <p className="text-xs font-semibold text-text-primary">{t.name}</p>
                                    <p className="text-[10px] text-text-tertiary">{t.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => startEdit(t)} className="flex h-7 w-7 items-center justify-center rounded text-text-tertiary hover:bg-bg-secondary hover:text-accent"><Pencil size={12} /></button>
                                <button onClick={() => setItemToDelete({ id: t.id, name: t.name })} className="flex h-7 w-7 items-center justify-center rounded text-text-tertiary hover:bg-red-500/10 hover:text-red-400"><Trash2 size={12} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {testimonials.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-bg-card p-12 text-center">
                    <p className="text-sm text-text-tertiary">No testimonials yet.</p>
                </div>
            )}

            <ConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={() => {
                    if (itemToDelete) deleteTestimonial(itemToDelete.id);
                }}
                title="Delete Testimonial"
                message={`Are you sure you want to delete this testimonial from ${itemToDelete?.name}?`}
            />
        </div>
    );
}
