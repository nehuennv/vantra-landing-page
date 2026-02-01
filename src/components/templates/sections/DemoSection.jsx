import React from 'react';
import { motion } from 'framer-motion';

const DemoSection = ({ data }) => {
    const { title, subtitle, component: Component } = data;

    return (
        <section className="relative py-24 md:py-32 px-4 overflow-visible">

            {/* 1. Ambient Glow (Luz de fondo para dar profundidad) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-[var(--product-primary)]/20 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto relative z-10 flex flex-col items-center">

                {/* Header Typography - Más limpio y centrado */}
                <div className="text-center max-w-4xl mb-10 md:mb-16 space-y-4 md:space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-6xl font-display font-medium text-white tracking-tight leading-tight"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Dashboard Container - Sin barra de navegador, estilo "Floating Glass" */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    className="w-full max-w-7xl relative group perspective-1000"
                >
                    {/* Borde Brillante Sutil */}
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] blur-[1px] pointer-events-none" />

                    {/* El Componente Real (Wrapper) */}
                    <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 bg-slate-950 border border-white/10">
                        {Component ? Component : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                Componente no cargado
                            </div>
                        )}
                    </div>

                    {/* Reflejo en el piso (Opcional, da efecto 3D muy premium) */}
                    <div className="absolute top-full left-0 right-0 h-24 bg-gradient-to-b from-[var(--product-primary)]/10 to-transparent blur-xl opacity-30 transform scale-x-90" />
                </motion.div>

            </div>
        </section>
    );
};

export default DemoSection;