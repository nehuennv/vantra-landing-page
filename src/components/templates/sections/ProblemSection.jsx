import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XOctagon, FileWarning, ZapOff, Siren } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// --- CARD COMPONENT ---
const ProblemCard = ({ item, index }) => {
    // Iconos
    const icons = [AlertTriangle, FileWarning, ZapOff, XOctagon, Siren];
    const Icon = icons[index % icons.length];

    return (
        <motion.div
            variants={cardVariants}
            className="
                group relative h-full rounded-2xl overflow-hidden
                /* ESTILO BASE: Glassmorphism (Transparente + Blur) */
                bg-black/30 md:bg-white/[0.02] md:backdrop-blur-md
                /* BORDE: Unificado en el contenedor principal */
                border border-white/10
                /* HOVER: Borde rojo sutil y fondo un poco más claro (SOLO DESKTOP) */
                md:hover:border-red-500/30 md:hover:bg-white/[0.05]
                transition-colors duration-500 ease-out
                flex flex-col
            "
        >
            {/* 1. INNER GLOW (ROJO - SOLO DESKTOP) */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* 2. CONTENIDO */}
            <div className="relative p-8 flex flex-col h-full z-10">

                {/* Header: Icono */}
                <div className="mb-6">
                    <div className="
                        w-12 h-12 rounded-xl flex items-center justify-center
                        /* ESTADO NORMAL: Transparente + Borde sutil */
                        bg-transparent border border-white/10 text-zinc-400
                        /* HOVER: Rojo Sólido + Texto Blanco + Borde Rojo (SOLO DESKTOP) */
                        md:group-hover:bg-red-600 md:group-hover:text-white md:group-hover:border-red-600
                        md:group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
                        transition-all duration-300
                    ">
                        <Icon size={22} strokeWidth={1.5} />
                    </div>
                </div>

                <div className="mt-auto">
                    <h3 className="text-xl font-display font-medium text-zinc-100 mb-3 md:group-hover:text-white transition-colors">
                        {item.title || "Punto de Dolor"}
                    </h3>
                    <p className="text-base text-zinc-400 leading-relaxed font-light md:group-hover:text-zinc-200 transition-colors duration-300">
                        {item.description || item}
                    </p>
                </div>
            </div>

            {/* 3. HOVER LINE (Barra roja abajo) */}
            <div className="absolute bottom-0 left-0 h-1 bg-red-600 w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
        </motion.div>
    );
};

const ProblemSection = ({ data }) => {
    const { subtitle, paragraph, items, quote } = data;

    // Título corto fijo
    const shortTitle = "No es solo la agenda. Es la información.";

    return (
        <section className="py-24 md:py-32 px-6 relative bg-transparent overflow-hidden">

            {/* Fondo sutil rojo oscuro */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* --- HEADER --- */}
                <div className="mb-10 md:mb-20 text-center max-w-4xl mx-auto">

                    {subtitle && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                                {subtitle}
                            </span>
                        </motion.div>
                    )}

                    {/* TÍTULO CORTO + RESALTADO ROJO */}
                    {/* TÍTULO CORTO + RESALTADO ROJO */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-6xl font-display font-medium text-white mb-4 md:mb-6 leading-tight"
                    >
                        El problema no es la agenda. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-red-500 to-red-600">
                            Es la información.
                        </span>
                    </motion.h2>

                    {paragraph && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
                        >
                            {paragraph}
                        </motion.p>
                    )}
                </div>

                {/* --- GRID SIMÉTRICA (2 COLUMNAS) --- */}
                {/* Esto asegura que si hay 4 items, queden 2 arriba y 2 abajo.
                    Si hay 2 items, quedan uno al lado del otro.
                    Ocupan todo el ancho.
                */}
                {items && items.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
                    >
                        {items.map((item, idx) => (
                            <ProblemCard key={idx} item={item} index={idx} />
                        ))}
                    </motion.div>
                )}

                {/* --- QUOTE FINAL --- */}


            </div>
        </section>
    );
};

export default ProblemSection;