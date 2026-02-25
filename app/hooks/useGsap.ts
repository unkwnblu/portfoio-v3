"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScrollReveal(
    selector: string,
    options?: {
        y?: number;
        x?: number;
        stagger?: number;
        duration?: number;
        start?: string;
        delay?: number;
        scale?: number;
    }
) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(selector, {
                y: options?.y ?? 60,
                x: options?.x ?? 0,
                opacity: 0,
                scale: options?.scale ?? 1,
                duration: options?.duration ?? 1,
                stagger: options?.stagger ?? 0.15,
                delay: options?.delay ?? 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: options?.start ?? "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [selector, options]);

    return containerRef;
}

export function useParallax(selector: string, speed: number = 50) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(selector, {
                y: speed,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [selector, speed]);

    return containerRef;
}

export { gsap, ScrollTrigger };
