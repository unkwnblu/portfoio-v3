"use client";

import { useState } from "react";
import { useDataStore } from "@/app/lib/DataStore";
import type { Project, ProjectCategory, ProjectStatus } from "@/app/types";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const categoryOptions: ProjectCategory[] = ["UI/UX", "Web Dev", "Mobile Apps", "IoT/Hardware"];
const statusOptions: ProjectStatus[] = ["Completed", "Ongoing"];
const gradientOptions = [
    "from-emerald-500 to-teal-600",
    "from-green-500 to-lime-600",
    "from-red-500 to-orange-600",
    "from-violet-500 to-purple-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-yellow-600",
    "from-cyan-500 to-blue-600",
    "from-indigo-500 to-blue-600",
];

const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    category: "Web Dev",
    status: "Ongoing",
    techStack: [],
    gradient: gradientOptions[0],
    icon: "🚀",
};

export default function ProjectsAdmin() {
    const { projects, addProject, updateProject, deleteProject } = useDataStore();
    const [editing, setEditing] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState(emptyProject);
    const [techInput, setTechInput] = useState("");

    const startCreate = () => {
        setCreating(true);
        setEditing(null);
        setForm(emptyProject);
        setTechInput("");
    };

    const startEdit = (project: Project) => {
        setEditing(project.id);
        setCreating(false);
        setForm(project);
        setTechInput("");
    };

    const handleSave = () => {
        if (!form.title.trim()) return;
        if (creating) {
            addProject({ ...form, id: `proj-${Date.now()}` } as Project);
        } else if (editing) {
            updateProject(editing, form);
        }
        setCreating(false);
        setEditing(null);
        setForm(emptyProject);
    };

    const handleCancel = () => {
        setCreating(false);
        setEditing(null);
        setForm(emptyProject);
    };

    const addTech = () => {
        if (!techInput.trim()) return;
        setForm({ ...form, techStack: [...form.techStack, techInput.trim()] });
        setTechInput("");
    };

    const removeTech = (index: number) => {
        setForm({ ...form, techStack: form.techStack.filter((_, i) => i !== index) });
    };

    const showForm = creating || editing;

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
                    <p className="mt-1 text-sm text-text-secondary">{projects.length} projects total</p>
                </div>
                {!showForm && (
                    <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-text-inverse transition-all hover:bg-accent-hover">
                        <Plus size={16} /> Add Project
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div className="mb-8 rounded-2xl border border-border bg-bg-card p-6">
                    <h2 className="mb-5 text-lg font-semibold text-text-primary">{creating ? "New Project" : "Edit Project"}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Title</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent" placeholder="Project title" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Description</label>
                            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent resize-none" placeholder="Brief description" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Category</label>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent">
                                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Status</label>
                            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent">
                                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Icon (emoji)</label>
                            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="🚀" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Gradient</label>
                            <select value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent">
                                {gradientOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Tech Stack</label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {form.techStack.map((tech, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 rounded-md border border-border bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary">
                                        {tech}
                                        <button onClick={() => removeTech(i)} className="text-text-tertiary hover:text-red-400"><X size={10} /></button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary outline-none focus:border-accent" placeholder="Add technology..." />
                                <button onClick={addTech} className="rounded-xl border border-border bg-bg-secondary px-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors">Add</button>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="sm:col-span-2 pt-2">
                            <h3 className="text-sm font-semibold text-text-primary border-t border-border pt-4">Case Study Details <span className="text-text-tertiary font-normal">(optional)</span></h3>
                            <p className="text-xs text-text-tertiary mt-0.5">These fields populate the full project detail page.</p>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Long Description</label>
                            <textarea value={form.longDescription || ""} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={4} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="Detailed overview of the project..." />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">The Challenge</label>
                            <textarea value={form.challenge || ""} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="What problem did this project solve?" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">The Solution</label>
                            <textarea value={form.solution || ""} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="How did you approach and solve it?" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Results & Impact</label>
                            <textarea value={form.results || ""} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent resize-none" placeholder="What were the measurable outcomes?" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Live URL</label>
                            <input value={form.liveUrl || ""} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Repo URL</label>
                            <input value={form.repoUrl || ""} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} className="w-full rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent" placeholder="https://github.com/..." />
                        </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-text-inverse hover:bg-accent-hover"><Check size={14} /> Save</button>
                        <button onClick={handleCancel} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Cancel</button>
                    </div>
                </div>
            )}

            {/* Projects list */}
            <div className="space-y-3">
                {projects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4 transition-all hover:border-accent/10">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} text-xl shrink-0`}>
                            {project.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate font-semibold text-text-primary">{project.title}</p>
                            <p className="truncate text-xs text-text-tertiary">{project.category} · {project.techStack.slice(0, 3).join(", ")}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                            {project.status}
                        </span>
                        <div className="flex shrink-0 gap-1">
                            <button onClick={() => startEdit(project)} className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-bg-secondary hover:text-accent transition-colors"><Pencil size={14} /></button>
                            <button onClick={() => deleteProject(project.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-red-500/10 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border bg-bg-card p-12 text-center">
                        <p className="text-sm text-text-tertiary">No projects yet. Click &quot;Add Project&quot; to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
