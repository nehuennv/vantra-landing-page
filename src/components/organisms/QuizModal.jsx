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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6 pointer-events-none overflow-y-auto"
                    >
                        {/* Content Wrapper */}
                        {/* Changed h-[90vh] to max-h-[90vh] and h-auto to fix empty space issue */}
                        <div className="w-full max-w-5xl max-h-[90vh] bg-[#09090b] rounded-[32px] overflow-hidden shadow-2xl relative border border-zinc-800 pointer-events-auto flex flex-col my-auto">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-900 md:bg-zinc-900/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all md:backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Quiz Component */}
                            <div className="flex-1 w-full relative overflow-y-auto custom-scrollbar">
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
