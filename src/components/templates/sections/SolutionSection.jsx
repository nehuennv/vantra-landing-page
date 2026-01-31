import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Database, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// --- LAZY LOADED COMPONENTS ---
const VisualCapture = lazy(() => import('../../visuals/VisualCapture'));
const VisualContext = lazy(() => import('../../visuals/VisualContext'));
const VisualAction = lazy(() => import('../../visuals/VisualAction'));
const VisualGrowth = lazy(() => import('../../visuals/VisualGrowth'));

// --- FEATURES DATA ---
const features = [
    {
        id: 'capture',
        title: "Captura Inteligente",
        description: "El sistema lee el chat de WhatsApp y extrae los datos del paciente automáticamente. Sin formularios manuales, sin errores de tipeo.",
        icon: MessageCircle,
        color: "#10B981", // Emerald soft
        Component: VisualCapture
    },
    {
        id: 'context',
        title: "Historial 360°",
        description: "Antes de que el paciente llegue, ya sabes todo. Visualiza visitas anteriores, cobertura médica y notas clínicas en un solo vistazo.",
        icon: Database,
        color: "#3B82F6", // Blue soft
        Component: VisualContext
    },
    {
        id: 'action',
        title: "Agenda Dinámica",
        description: "Visualiza tu día en una lista clara. El sistema organiza los turnos, marca confirmaciones y detecta huecos automáticamente.",
        icon: Calendar,
        color: "#8B5CF6", // Violet soft
        Component: VisualAction
    },
    {
        id: 'growth',
        title: "Métricas Operativas",
        description: "Entiende tu clínica. Analiza tasas de ausentismo y descubre por qué canal llegan tus pacientes (Instagram, Google, Recomendación).",
        icon: TrendingUp,
        color: "#F59E0B", // Amber soft
        Component: VisualGrowth
    }
];

const AUTOPLAY_DURATION = 10000;
const MANUAL_PAUSE_DURATION = 60000;

// --- TIMER HOOK ---
const useCarouselTimer = (duration, activeIndex, onComplete, isManualOverride) => {
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(new Date().getTime());
    const pausedRef = useRef(false);
    const elapsedRef = useRef(0);
    const reqRef = useRef(null);

    useEffect(() => {
        setProgress(0);
        elapsedRef.current = 0;
        startTimeRef.current = new Date().getTime();
        pausedRef.current = false;
    }, [activeIndex, isManualOverride]);

    useEffect(() => {
        if (isManualOverride) return;

        const animate = () => {
            if (pausedRef.current) {
                startTimeRef.current = new Date().getTime() - elapsedRef.current;
                reqRef.current = requestAnimationFrame(animate);
                return;
            }

            const now = new Date().getTime();
            elapsedRef.current = now - startTimeRef.current;
            const newProgress = Math.min((elapsedRef.current / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                reqRef.current = requestAnimationFrame(animate);
            } else {
                onComplete();
            }
        };

        reqRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(reqRef.current);
    }, [duration, onComplete, isManualOverride, activeIndex]);

    return {
        progress,
        setPaused: (p) => { pausedRef.current = p; }
    };
};

// --- COMPONENTE PRINCIPAL ---
const SolutionSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isManualOverride, setIsManualOverride] = useState(false);

    // Auto-advance Logic
    const nextSlide = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % features.length);
    }, []);

    // Timer Hook
    const timer = useCarouselTimer(AUTOPLAY_DURATION, activeIndex, nextSlide, isManualOverride);

    // Manual Controls
    const activateManual = () => {
        setIsManualOverride(true);
        setTimeout(() => setIsManualOverride(false), MANUAL_PAUSE_DURATION);
    };

    const handleDotClick = (index) => {
        activateManual();
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const handlePrev = () => {
        activateManual();
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const handleNext = () => {
        activateManual();
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % features.length);
    };

    // Keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex]);

    const currentFeature = features[activeIndex];

    // Variants refined for elegance
    const textVariants = {
        enter: { opacity: 0, y: 10 },
        center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
    };

    const visualVariants = {
        enter: { opacity: 0, scale: 0.98 },
        center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3, ease: "easeIn" } }
    };

    return (
        <section
            className="w-full font-sans relative overflow-hidden flex flex-col justify-center py-0"
            onMouseEnter={() => timer.setPaused(true)}
            onMouseLeave={() => timer.setPaused(false)}
            onTouchStart={() => timer.setPaused(true)}
            onTouchEnd={() => timer.setPaused(false)}
        >
            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 flex-grow flex flex-col justify-center">

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 lg:gap-24 items-center min-h-[600px]">

                    {/* TEXT CONTENT (HERO STYLE) */}
                    <div className="relative z-10 select-none flex flex-col justify-between h-full order-2 lg:order-1 py-2 md:py-12"
                        onMouseDown={() => timer.setPaused(true)}
                        onMouseUp={() => timer.setPaused(false)}
                    >
                        {/* Wrapper with fixed min-height to prevent jumping */}
                        <div className="relative w-full min-h-0 md:min-h-[300px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentFeature.id}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="w-full"
                                >
                                    <div
                                        className="hidden md:flex p-3 w-fit rounded-xl items-center justify-center mb-8 transition-colors duration-500"
                                        style={{ backgroundColor: `${currentFeature.color}15`, color: currentFeature.color }}
                                    >
                                        <currentFeature.icon size={32} strokeWidth={2} />
                                    </div>

                                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-[1.1] tracking-tight truncate w-full">
                                        {currentFeature.title}
                                    </h2>
                                    <div className="h-[120px] md:h-auto overflow-hidden">
                                        <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed max-w-lg font-light line-clamp-4 md:line-clamp-none">
                                            {currentFeature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* --- CONTROLS (Pinned to bottom of flex col) --- */}
                        <div className="mt-4 md:mt-8 flex items-center justify-between lg:justify-start gap-8">

                            {/* PILL INDICATORS */}
                            <div className="flex items-center gap-2 bg-[#0A0A0B] md:bg-zinc-900/50 p-2 rounded-full md:backdrop-blur-sm border border-white/5">
                                {features.map((feature, index) => {
                                    const isActive = activeIndex === index;
                                    return (
                                        <button
                                            key={feature.id}
                                            onClick={() => handleDotClick(index)}
                                            className="relative h-2 rounded-full overflow-hidden transition-all duration-500 ease-out"
                                            style={{
                                                width: isActive ? '40px' : '8px',
                                                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'
                                            }}
                                            aria-label={`Go to slide ${index + 1}`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    className="h-full w-full absolute top-0 left-0"
                                                    style={{
                                                        backgroundColor: feature.color,
                                                        width: `${timer.progress}%`
                                                    }}
                                                    layoutId="active-pill-fill"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* ARROWS */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrev}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                    aria-label="Next"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* VISUAL CONTENT (Static Position, Crossfade) */}
                    <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin text-zinc-800" /></div>}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentFeature.id}
                                    variants={visualVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ zIndex: 1 }}
                                >
                                    <currentFeature.Component />
                                </motion.div>
                            </AnimatePresence>
                        </Suspense>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default SolutionSection;