"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { Project, ProjectCategory, ProjectStatus } from "@/app/types";

// ── Extended Types for Admin ──
export interface VideoItem {
    id: string;
    title: string;
    views: string;
    likes: string;
    gradient: string;
    tag: string;
    duration: string;
}

export interface InstagramPost {
    id: string;
    gradient: string;
    likes: string;
    caption: string;
}

export interface BlogArticle {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    gradient: string;
    tag: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    gradient: string;
}

export interface ProfileData {
    name: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    interests: string[];
    socialLinks: { name: string; url: string; icon: string }[];
}

interface DataStore {
    projects: Project[];
    videos: VideoItem[];
    instagram: InstagramPost[];
    blog: BlogArticle[];
    testimonials: Testimonial[];
    profile: ProfileData;
    // CRUD operations
    setProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    setVideos: (videos: VideoItem[]) => void;
    addVideo: (video: VideoItem) => void;
    updateVideo: (id: string, video: Partial<VideoItem>) => void;
    deleteVideo: (id: string) => void;
    setInstagram: (posts: InstagramPost[]) => void;
    addInstagramPost: (post: InstagramPost) => void;
    updateInstagramPost: (id: string, post: Partial<InstagramPost>) => void;
    deleteInstagramPost: (id: string) => void;
    setBlog: (articles: BlogArticle[]) => void;
    addBlogArticle: (article: BlogArticle) => void;
    updateBlogArticle: (id: string, article: Partial<BlogArticle>) => void;
    deleteBlogArticle: (id: string) => void;
    setTestimonials: (testimonials: Testimonial[]) => void;
    addTestimonial: (testimonial: Testimonial) => void;
    updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
    deleteTestimonial: (id: string) => void;
    setProfile: (profile: ProfileData) => void;
}

// ── Default Data ──
import { projects as defaultProjects } from "@/app/data/projects";
import { profile as defaultProfile } from "@/app/data/profile";

const defaultVideos: VideoItem[] = [
    { id: "v1", title: "Urban Night Cinematography", views: "12.4K", likes: "1.8K", gradient: "from-violet-600 to-indigo-800", tag: "Cinematic", duration: "0:32" },
    { id: "v2", title: "Product Reveal — Tech Gadget", views: "8.7K", likes: "956", gradient: "from-rose-600 to-pink-800", tag: "Product", duration: "0:45" },
    { id: "v3", title: "Anime Edit — Jujutsu Kaisen AMV", views: "34.2K", likes: "5.1K", gradient: "from-cyan-600 to-blue-800", tag: "Anime Edit", duration: "1:12" },
    { id: "v4", title: "Street Photography Montage", views: "6.3K", likes: "743", gradient: "from-amber-600 to-orange-800", tag: "Photography", duration: "0:58" },
];

const defaultInstagram: InstagramPost[] = [
    { id: "ig1", gradient: "from-amber-400 to-orange-600", likes: "2.4K", caption: "Golden hour at the lake 🌅" },
    { id: "ig2", gradient: "from-blue-400 to-indigo-600", likes: "1.8K", caption: "Architecture details 🏛️" },
    { id: "ig3", gradient: "from-pink-400 to-rose-600", likes: "3.1K", caption: "Street photography walk 📸" },
    { id: "ig4", gradient: "from-emerald-400 to-teal-600", likes: "956", caption: "Nature macro shots 🌿" },
    { id: "ig5", gradient: "from-violet-400 to-purple-600", likes: "4.2K", caption: "Night city vibes 🌃" },
    { id: "ig6", gradient: "from-cyan-400 to-blue-600", likes: "1.5K", caption: "Studio portrait session 🎭" },
    { id: "ig7", gradient: "from-red-400 to-rose-600", likes: "2.7K", caption: "Behind the scenes 🎬" },
    { id: "ig8", gradient: "from-yellow-400 to-amber-600", likes: "1.1K", caption: "Sunset silhouettes 🌇" },
];

const defaultBlog: BlogArticle[] = [
    { id: "b1", title: "Every Pixel is a Storyteller: Why Details Matter in UI Design", excerpt: "Small design choices — spacing, color, micro-interactions — can make or break user trust.", date: "Jan 2026", readTime: "5 min read", gradient: "from-rose-500/20 to-pink-600/20", tag: "Design" },
    { id: "b2", title: "Building Real-time Apps: From WebSockets to Production", excerpt: "A deep dive into architecting real-time collaborative tools using Socket.io and WebRTC.", date: "Dec 2025", readTime: "8 min read", gradient: "from-blue-500/20 to-indigo-600/20", tag: "Engineering" },
    { id: "b3", title: "Photography & Design: Finding the Right Perspective", excerpt: "How my passion for photography informs my approach to composition and visual hierarchy.", date: "Nov 2025", readTime: "4 min read", gradient: "from-amber-500/20 to-orange-600/20", tag: "Creative" },
];

const defaultTestimonials: Testimonial[] = [
    { id: "t1", name: "Adaeze O.", role: "Founder, Bloom Studios", content: "Dwayne completely transformed our digital presence. His eye for design combined with solid engineering skills is rare.", rating: 5, gradient: "from-emerald-500/10 to-teal-500/10" },
    { id: "t2", name: "Michael K.", role: "CTO, InnovateTech", content: "Working with Dwayne was seamless. He understood the vision on day one and delivered ahead of schedule.", rating: 5, gradient: "from-blue-500/10 to-indigo-500/10" },
    { id: "t3", name: "Fatima B.", role: "Product Manager, EduLeap", content: "The mobile app Dwayne built for us is beautiful and lightning-fast. Engagement jumped 40% in the first month.", rating: 5, gradient: "from-violet-500/10 to-purple-500/10" },
];

const DataStoreContext = createContext<DataStore | null>(null);

export function useDataStore() {
    const ctx = useContext(DataStoreContext);
    if (!ctx) throw new Error("useDataStore must be used within DataProvider");
    return ctx;
}

function loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const stored = localStorage.getItem(`portfolio_${key}`);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function saveToStorage(key: string, value: unknown) {
    if (typeof window === "undefined") return;
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
}

export function DataProvider({ children }: { children: ReactNode }) {
    const [projects, _setProjects] = useState<Project[]>([]);
    const [videos, _setVideos] = useState<VideoItem[]>([]);
    const [instagram, _setInstagram] = useState<InstagramPost[]>([]);
    const [blog, _setBlog] = useState<BlogArticle[]>([]);
    const [testimonials, _setTestimonials] = useState<Testimonial[]>([]);
    const [profile, _setProfile] = useState<ProfileData>(defaultProfile);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        _setProjects(loadFromStorage("projects", defaultProjects));
        _setVideos(loadFromStorage("videos", defaultVideos));
        _setInstagram(loadFromStorage("instagram", defaultInstagram));
        _setBlog(loadFromStorage("blog", defaultBlog));
        _setTestimonials(loadFromStorage("testimonials", defaultTestimonials));
        _setProfile(loadFromStorage("profile", defaultProfile));
        setLoaded(true);
    }, []);

    // Persist helpers
    const setProjects = useCallback((v: Project[]) => { _setProjects(v); saveToStorage("projects", v); }, []);
    const setVideos = useCallback((v: VideoItem[]) => { _setVideos(v); saveToStorage("videos", v); }, []);
    const setInstagram = useCallback((v: InstagramPost[]) => { _setInstagram(v); saveToStorage("instagram", v); }, []);
    const setBlog = useCallback((v: BlogArticle[]) => { _setBlog(v); saveToStorage("blog", v); }, []);
    const setTestimonials = useCallback((v: Testimonial[]) => { _setTestimonials(v); saveToStorage("testimonials", v); }, []);
    const setProfile = useCallback((v: ProfileData) => { _setProfile(v); saveToStorage("profile", v); }, []);

    // CRUD helpers
    const addProject = useCallback((p: Project) => setProjects([...projects, p]), [projects, setProjects]);
    const updateProject = useCallback((id: string, data: Partial<Project>) => setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p)), [projects, setProjects]);
    const deleteProject = useCallback((id: string) => setProjects(projects.filter(p => p.id !== id)), [projects, setProjects]);

    const addVideo = useCallback((v: VideoItem) => setVideos([...videos, v]), [videos, setVideos]);
    const updateVideo = useCallback((id: string, data: Partial<VideoItem>) => setVideos(videos.map(v => v.id === id ? { ...v, ...data } : v)), [videos, setVideos]);
    const deleteVideo = useCallback((id: string) => setVideos(videos.filter(v => v.id !== id)), [videos, setVideos]);

    const addInstagramPost = useCallback((p: InstagramPost) => setInstagram([...instagram, p]), [instagram, setInstagram]);
    const updateInstagramPost = useCallback((id: string, data: Partial<InstagramPost>) => setInstagram(instagram.map(p => p.id === id ? { ...p, ...data } : p)), [instagram, setInstagram]);
    const deleteInstagramPost = useCallback((id: string) => setInstagram(instagram.filter(p => p.id !== id)), [instagram, setInstagram]);

    const addBlogArticle = useCallback((a: BlogArticle) => setBlog([...blog, a]), [blog, setBlog]);
    const updateBlogArticle = useCallback((id: string, data: Partial<BlogArticle>) => setBlog(blog.map(a => a.id === id ? { ...a, ...data } : a)), [blog, setBlog]);
    const deleteBlogArticle = useCallback((id: string) => setBlog(blog.filter(a => a.id !== id)), [blog, setBlog]);

    const addTestimonial = useCallback((t: Testimonial) => setTestimonials([...testimonials, t]), [testimonials, setTestimonials]);
    const updateTestimonial = useCallback((id: string, data: Partial<Testimonial>) => setTestimonials(testimonials.map(t => t.id === id ? { ...t, ...data } : t)), [testimonials, setTestimonials]);
    const deleteTestimonial = useCallback((id: string) => setTestimonials(testimonials.filter(t => t.id !== id)), [testimonials, setTestimonials]);

    if (!loaded) return null;

    return (
        <DataStoreContext.Provider value={{
            projects, videos, instagram, blog, testimonials, profile,
            setProjects, addProject, updateProject, deleteProject,
            setVideos, addVideo, updateVideo, deleteVideo,
            setInstagram, addInstagramPost, updateInstagramPost, deleteInstagramPost,
            setBlog, addBlogArticle, updateBlogArticle, deleteBlogArticle,
            setTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
            setProfile,
        }}>
            {children}
        </DataStoreContext.Provider>
    );
}
