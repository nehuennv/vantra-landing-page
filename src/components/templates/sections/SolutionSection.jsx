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





// --- COMPONENTE PRINCIPAL ---
const SolutionSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleDotClick = (index) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const handleNext = () => {
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
        <section className="w-full font-sans relative overflow-hidden flex flex-col justify-center py-24 md:py-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 flex-grow flex flex-col justify-center">

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 lg:gap-24 items-center min-h-[600px]">

                    {/* TEXT CONTENT (HERO STYLE) */}
                    <div className="relative z-10 select-none flex flex-col justify-center h-full order-2 lg:order-1 py-4 md:py-12">
                        {/* MOBILE CARD CONTAINER */}
                        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-none w-full">

                            {/* Wrapper with fixed min-height to prevent jumping */}
                            <div className="relative w-full min-h-[150px] md:min-h-[300px] flex flex-col ">
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
                                            className="hidden md:flex p-3 w-fit rounded-xl items-center justify-center mb-4 md:mb-6 transition-colors duration-500"
                                            style={{ backgroundColor: `${currentFeature.color}15`, color: currentFeature.color }}
                                        >
                                            <currentFeature.icon size={32} strokeWidth={2} />
                                        </div>

                                        <h2 className="text-3xl md:text-6xl font-display font-medium text-white mb-2 md:mb-4 leading-tight tracking-tight truncate w-full">
                                            {currentFeature.title}
                                        </h2>
                                        <div className="h-auto md:h-auto overflow-hidden">
                                            <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-lg font-light">
                                                {currentFeature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* --- CONTROLS --- */}
                            <div className="mt-4 md:mt-6 flex flex-row items-center justify-between gap-4">

                                {/* PILL INDICATORS */}
                                <div className="flex-1 flex items-center gap-2 bg-white/5 md:bg-zinc-900/50 p-2 rounded-full border border-white/5">
                                    {features.map((feature, index) => {
                                        const isActive = activeIndex === index;
                                        return (
                                            <button
                                                key={feature.id}
                                                onClick={() => handleDotClick(index)}
                                                className="relative h-1.5 md:h-2 rounded-full overflow-hidden transition-all duration-500 ease-out flex-1"
                                                style={{
                                                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)'
                                                }}
                                                aria-label={`Go to slide ${index + 1}`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        className="h-full w-full absolute top-0 left-0"
                                                        style={{
                                                            backgroundColor: feature.color,
                                                            width: '100%'
                                                        }}
                                                        layoutId="active-pill-fill"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* ARROWS */}
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={handlePrev}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                                        aria-label="Next"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
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