"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel"
}: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-bg-card p-6 shadow-2xl"
                    >
                        <div className="mb-6 flex items-start gap-4">
                            <div className="flex shrink-0 items-center justify-center rounded-full bg-red-500/10 p-3 text-red-500">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="mb-2 text-lg font-bold text-text-primary">{title}</h3>
                                <p className="text-sm leading-relaxed text-text-secondary">{message}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="shrink-0 text-text-tertiary transition-colors hover:text-text-primary"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
                            <button
                                onClick={onClose}
                                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600 hover:shadow-red-500/30"
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
