import { Project } from "@/app/types";

export const projects: Project[] = [
    {
        id: "password-vault",
        title: "Password Vault",
        description:
            "A secure, end-to-end encrypted password manager with biometric authentication, auto-fill capabilities, and cross-device sync.",
        category: "Web Dev",
        status: "Completed",
        tech_stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
        gradient: "from-emerald-500 to-teal-600",
        icon: "🔐",
    },
    {
        id: "smart-irrigation",
        title: "Smart Irrigation System",
        description:
            "IoT-powered agricultural system using soil moisture sensors and weather API data to automate crop watering schedules in real-time.",
        category: "IoT/Hardware",
        status: "Ongoing",
        tech_stack: ["Arduino", "Python", "MQTT", "React Dashboard"],
        gradient: "from-green-500 to-lime-600",
        icon: "🌱",
    },
    {
        id: "traffic-ai",
        title: "Deep Learning Traffic System",
        description:
            "Computer vision model for real-time traffic analysis and congestion prediction using YOLO object detection and LSTM networks.",
        category: "IoT/Hardware",
        status: "Ongoing",
        tech_stack: ["Python", "TensorFlow", "OpenCV", "Raspberry Pi"],
        gradient: "from-red-500 to-orange-600",
        icon: "🚦",
    },
    {
        id: "fintrack",
        title: "FinTrack Mobile",
        description:
            "Expense tracking app with AI-powered spending insights, receipt scanning via OCR, and beautiful data visualizations.",
        category: "Mobile Apps",
        status: "Completed",
        tech_stack: ["React Native", "Expo", "Firebase", "TensorFlow Lite"],
        gradient: "from-violet-500 to-purple-600",
        icon: "💰",
    },
    {
        id: "wellness-app",
        title: "Wellness Companion",
        description:
            "Mental health and wellness app featuring guided meditation, mood tracking, and personalized activity recommendations.",
        category: "Mobile Apps",
        status: "Ongoing",
        tech_stack: ["Flutter", "Dart", "Supabase", "Riverpod"],
        gradient: "from-pink-500 to-rose-600",
        icon: "🧘",
    },
    {
        id: "ecommerce-redesign",
        title: "Luxe E-Commerce Redesign",
        description:
            "Complete UX overhaul of a luxury fashion e-commerce platform—user research, wireframes, prototyping, and a full design system.",
        category: "UI/UX",
        status: "Completed",
        tech_stack: ["Figma", "Prototyping", "User Research", "Design System"],
        gradient: "from-amber-500 to-yellow-600",
        icon: "🛍️",
    },
    {
        id: "health-dashboard",
        title: "Health Analytics Dashboard",
        description:
            "Data-rich dashboard UI for a healthcare startup—patient metrics, appointment scheduling, and role-based access designed from the ground up.",
        category: "UI/UX",
        status: "Completed",
        tech_stack: ["Figma", "Wireframing", "Accessibility", "Data Viz"],
        gradient: "from-cyan-500 to-blue-600",
        icon: "📊",
    },
    {
        id: "collab-workspace",
        title: "CollabSpace",
        description:
            "Real-time collaborative workspace with document editing, video chat, whiteboard, and project management features.",
        category: "Web Dev",
        status: "Ongoing",
        tech_stack: ["Next.js", "Socket.io", "PostgreSQL", "WebRTC"],
        gradient: "from-indigo-500 to-blue-600",
        icon: "🤝",
    },
];

export const categories = ["All", "UI/UX", "Web Dev", "Mobile Apps", "IoT/Hardware"] as const;
