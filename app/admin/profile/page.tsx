"use client";

import { useState, useEffect } from "react";
import { useDataStore } from "@/app/lib/DataStore";
import type { Profile } from "@/app/types";
import { Check, Plus, X } from "lucide-react";

export default function ProfileAdmin() {
    const { profile, updateProfile } = useDataStore();
    const [form, setForm] = useState<Profile>(profile);
    const [saved, setSaved] = useState(false);
    const [socialForm, setSocialForm] = useState({ name: "", url: "", icon: "" });

    useEffect(() => { setForm(profile); }, [profile]);

    const handleSave = async () => {
        await updateProfile(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addSocial = () => {
        if (!socialForm.name.trim() || !socialForm.url.trim()) return;
        setForm({ ...form, social_links: [...form.social_links, { ...socialForm, icon: socialForm.icon || socialForm.name.toLowerCase() }] });
        setSocialForm({ name: "", url: "", icon: "" });
    };

    const removeSocial = (index: number) => {
        setForm({ ...form, social_links: form.social_links.filter((_, i) => i !== index) });
    };

    const addInterest = (interest: string) => {
        if (interest.trim()) setForm({ ...form, interests: [...form.interests, interest.trim()] });
    };

    const removeInterest = (index: number) => {
        setForm({ ...form, interests: form.interests.filter((_, i) => i !== index) });
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Profile Settings</h1>
                    <p className="mt-1 text-sm text-text-secondary">Manage your personal information and social links.</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-accent text-text-inverse hover:bg-accent-hover"
                        }`}
                >
                    <Check size={14} />
                    {saved ? "Saved!" : "Save Changes"}
                </button>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <div className="rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-base font-semibold text-text-primary">Basic Information</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Name</label>
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Location</label>
                            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Email</label>
                            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Tagline</label>
                            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Bio</label>
                            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" />
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div className="rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-base font-semibold text-text-primary">Interests</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {form.interests.map((interest, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs font-medium text-text-secondary">
                                {interest}
                                <button onClick={() => removeInterest(i)} className="text-text-tertiary hover:text-red-400"><X size={10} /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            placeholder="Add interest..."
                            className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary outline-none focus:border-accent"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addInterest((e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).value = "";
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-base font-semibold text-text-primary">Social Links</h2>
                    <div className="space-y-3 mb-4">
                        {form.social_links.map((link, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-xl bg-bg-secondary p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent uppercase">{link.icon.charAt(0)}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-text-primary">{link.name}</p>
                                    <p className="truncate text-xs text-text-tertiary">{link.url}</p>
                                </div>
                                <button onClick={() => removeSocial(i)} className="flex h-7 w-7 items-center justify-center rounded text-text-tertiary hover:bg-red-500/10 hover:text-red-400"><X size={12} /></button>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <input value={socialForm.name} onChange={(e) => setSocialForm({ ...socialForm, name: e.target.value })} placeholder="Name (e.g. GitHub)" className="rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                        <input value={socialForm.url} onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })} placeholder="URL" className="rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                        <button onClick={addSocial} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-accent transition-colors">
                            <Plus size={14} /> Add Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
