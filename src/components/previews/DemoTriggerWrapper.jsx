import React, { useState, useEffect, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Loader2, MousePointer2 } from 'lucide-react';

// Lazy load del componente pesado
const MedDashboardPreview = lazy(() => import('./MedDashboardPreview'));

// Color Vantra exacto
const VANTRA_BLUE = "hsl(199, 89%, 48%)";

export default function DemoTriggerWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Scroll Lock Logic
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        import('./MedDashboardPreview');
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // --- LOGICA DE ANIMACIÓN SEGMENTADA ---
    const [buttonState, setButtonState] = useState("breathing");

    useEffect(() => {
        if (isHovered) {
            setButtonState("hover");
        } else {
            // 1. Primero volvemos a "idle" (normal) para que la transición de scale/rotate corra limpia
            setButtonState("idle");
            // 2. Después de que termina la transición de vuelta (0.5s), activamos el breathing
            const timer = setTimeout(() => {
                setButtonState("breathing");
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isHovered]);

    // --- ANIMACIONES CORREGIDAS ---

    // 1. Cursor Fantasma: Rápido, Amplio y Boomerang
    const ghostCursorVariants = {
        idle: {
            // Coordenadas agresivas para que recorra todo el ancho/alto visible
            x: [0, 240, -220, 180, -100, 0],
            y: [0, -120, 100, -80, 120, 0],
            scale: [1, 1, 0.9, 1, 0.9, 1], // Clicks marcados
            opacity: 1,
            transition: {
                duration: 4.5, // Más rápido para que se note el movimiento
                repeat: Infinity,
                repeatType: "mirror", // <--- BOOMERANG REAL: Va y vuelve por el mismo camino
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }
        },
        hover: {
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" } // Desaparece rápido pero suave
        }
    };

    // 2. Parallax del Skeleton
    const skeletonVariants = {
        idle: {
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" } // Vuelve suave al centro
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
        }
    };

    // 3. Botón Principal (FIX GLITCH)
    const buttonVariants = {
        // Estado 1: La vuelta a la normalidad (Cuando sacas el mouse)
        idle: {
            scale: 1,
            rotate: 0,
            boxShadow: `0 0 0 0px ${VANTRA_BLUE}00`,
            transition: {
                // Forzamos explícitamente la transición de cada propiedad para evitar el "snap"
                scale: { duration: 0.5, ease: "easeInOut" },
                rotate: { duration: 0.5, ease: "easeInOut" },
                boxShadow: { duration: 0.5, ease: "easeInOut" }
            }
        },
        // Estado 2: La respiración (Arranca DESPUÉS de idle)
        // Estado 2: La respiración (Arranca DESPUÉS de idle, controlado por el useEffect)
        breathing: {
            scale: [1, 1.05, 1],
            boxShadow: [
                `0 0 0 0px ${VANTRA_BLUE}00`,
                `0 0 25px 2px ${VANTRA_BLUE}40`,
                `0 0 0 0px ${VANTRA_BLUE}00`
            ],
            transition: {
                // delay: 0.5, // ELIMINADO: El delay ya lo maneja el setTimeout
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        // Estado 3: Hover activo
        hover: {
            scale: 1.3,
            rotate: -3,
            boxShadow: `0 20px 50px -10px ${VANTRA_BLUE}70`,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }
    };

    return (
        <>
            {/* ==============================================
                TRIGGER AREA
               ============================================== */}
            <motion.div
                className="relative w-full aspect-[4/3] md:aspect-video rounded-[2rem] overflow-hidden cursor-pointer group bg-white shadow-2xl border border-slate-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsOpen(true)}
                initial="idle"
                animate={isHovered ? "hover" : "idle"} // El botón maneja su propia lógica abajo
                whileTap={{ scale: 0.99 }}
            >
                {/* 1. SKELETON BENTO */}
                <motion.div
                    className="absolute inset-0 p-5 md:p-8 bg-slate-50 flex gap-6"
                    variants={skeletonVariants}
                >
                    {/* Sidebar */}
                    <div className="hidden sm:flex flex-col gap-4 w-20 md:w-64 h-full bg-white rounded-[1.5rem] p-5 shadow-sm">
                        <div className="w-10 h-10 bg-slate-200 rounded-full mb-2" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-full h-8 bg-slate-100 rounded-xl" style={{ opacity: 1 - (i * 0.1) }} />
                        ))}
                        <div className="mt-auto w-full h-16 bg-slate-100 rounded-2xl" />
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                        {/* Header */}
                        <div className="h-20 w-full bg-white rounded-[1.5rem] shadow-sm flex items-center px-8 justify-between">
                            <div className="w-48 h-6 bg-slate-200 rounded-full" />
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full" />
                                <div className="w-10 h-10 bg-slate-100 rounded-full" />
                            </div>
                        </div>

                        {/* Bento Grid */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Columna Izq */}
                            <div className="sm:col-span-2 flex flex-col gap-6 h-full">
                                <div className="grid grid-cols-2 gap-6 h-32">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-[1.5rem] shadow-sm p-5 flex flex-col justify-between">
                                            <div className="w-8 h-8 bg-sky-100 rounded-lg" />
                                            <div className="w-24 h-8 bg-slate-200 rounded-md" />
                                        </div>
                                    ))}
                                </div>

                                {/* GRÁFICO PRINCIPAL (Con transición suavizada) */}
                                <motion.div
                                    className="flex-1 bg-white rounded-[1.5rem] shadow-sm p-6 flex flex-col gap-4 relative overflow-hidden"
                                    variants={{
                                        idle: { scale: 1, transition: { duration: 0.5 } },
                                        hover: { scale: 1.03, transition: { duration: 0.5, ease: "easeOut" } }
                                    }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <div className="w-32 h-6 bg-slate-200 rounded-full" />
                                        <div className="w-20 h-6 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="flex-1 flex items-end gap-3">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-slate-100 rounded-t-xl transition-all duration-500 hover:bg-sky-100"
                                                style={{ height: `${20 + Math.random() * 70}%` }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Columna Der */}
                            <div className="hidden sm:flex flex-col gap-6 h-full">
                                <div className="h-1/2 bg-white rounded-[1.5rem] shadow-sm p-5 flex flex-col gap-4">
                                    <div className="w-24 h-5 bg-slate-200 rounded-full" />
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full" />
                                            <div className="w-full h-4 bg-slate-50 rounded-md" />
                                        </div>
                                    ))}
                                </div>
                                <div className="h-1/2 bg-white rounded-[1.5rem] shadow-sm p-5" />
                            </div>
                        </div>
                    </div>

                    {/* --- CURSOR FANTASMA (BOOMERANG NEGRO) --- */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 z-10 pointer-events-none"
                        variants={ghostCursorVariants}
                        // Animate condicional: si no hay hover, ejecuta "idle"
                        animate={isHovered ? "hover" : "idle"}
                    >
                        {/* Cursor Negro Puro con Borde Blanco */}
                        <MousePointer2
                            className="w-14 h-14 text-black fill-black stroke-white stroke-[2px] drop-shadow-xl"
                        />
                    </motion.div>

                </motion.div>

                {/* 2. OVERLAY SUAVE */}
                <motion.div
                    className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"
                    variants={{
                        idle: { opacity: 0, transition: { duration: 0.3 } },
                        hover: { opacity: 1, transition: { duration: 0.3 } }
                    }}
                />

                {/* 3. BOTÓN PRINCIPAL */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.div className="relative">
                        <motion.button
                            className="
                                relative group/btn flex items-center gap-4 pl-8 pr-10 py-5 
                                rounded-full 
                                text-white
                                overflow-visible
                            "
                            style={{ backgroundColor: VANTRA_BLUE }}
                            // Usamos el estado explícito controlado por useEffect
                            animate={buttonState}
                            variants={buttonVariants}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#0ea5e9] shadow-sm">
                                <Play className="w-5 h-5 fill-current ml-1" />
                            </div>

                            <div className="text-left flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-sky-100/90">Visual Demo</span>
                                <span className="text-lg font-bold text-white leading-none tracking-tight">Probar Ahora</span>
                            </div>

                            {/* --- CURSOR USUARIO (APARECE EN HOVER) --- */}
                            <motion.div
                                className="absolute -right-8 top-10 drop-shadow-xl z-30 pointer-events-none"
                                variants={{
                                    idle: { opacity: 0, scale: 0.5, x: 20, y: 20, transition: { duration: 0.2 } },
                                    hover: { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                                }}
                            >
                                <MousePointer2 className="w-10 h-10 text-black fill-black stroke-white stroke-[1.5px]" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                </div>

            </motion.div>

            {/* ==============================================
                MODAL (Full Screen Responsive) - Sin cambios
               ============================================== */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center isolate">
                            <motion.div
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                className="absolute inset-0 md:inset-6 lg:inset-10 bg-[#F8FAFC] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-0 md:border border-white/20"
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            >
                                <div className="absolute top-4 right-4 z-50">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="group w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-red-500 hover:rotate-90 transition-all shadow-lg shadow-black/20"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="flex-1 w-full h-full relative">
                                    <Suspense fallback={<LoadingSplashScreen />}>
                                        <MedDashboardPreview />
                                    </Suspense>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

function LoadingSplashScreen() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-40">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#0ea5e9] blur-3xl opacity-20 rounded-full animate-pulse" />
                <div className="relative bg-white p-4 rounded-2xl shadow-xl shadow-sky-100 border border-slate-100">
                    <Loader2 className="w-10 h-10 text-[#0ea5e9] animate-spin" />
                </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Cargando Entorno...</h3>
            <p className="text-sm text-slate-400">Preparando datos de prueba</p>
        </div>
    );
}