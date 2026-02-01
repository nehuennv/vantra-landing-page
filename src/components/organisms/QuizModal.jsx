import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import InteractiveQuiz from './InteractiveQuiz';

const QuizModal = ({ isOpen, onClose, onSchedule }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prevent scrolling when modal is open (Targeting both html and body for broad support)
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-zinc-950 md:bg-zinc-950/90 md:backdrop-blur-md z-[99999]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[100000] flex flex-col md:items-center md:justify-center md:p-6"
                    >
                        {/* Content Wrapper - Full Screen Mobile / Card Desktop */}
                        <div className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl bg-[#09090b] md:rounded-[32px] overflow-hidden shadow-2xl relative border-0 md:border border-zinc-800 flex flex-col">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 rounded-full bg-black/40 md:bg-zinc-900/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 md:hover:bg-zinc-800 transition-all backdrop-blur-md group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Quiz Component */}
                            <div className="flex-1 w-full h-full relative overflow-y-auto custom-scrollbar">
                                <InteractiveQuiz onSchedule={onSchedule} />
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default QuizModal;
