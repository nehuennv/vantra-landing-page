import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

const PricingSection = ({ data, onPlanSelect }) => {
    const { title, subtitle, plans } = data;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Variantes para orquestar la animación de entrada perfecta
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden">

            {/* Fondo limpio y oscuro */}
            <div className="absolute inset-0 pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-normal text-white mb-6 tracking-tight leading-tight"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-400 font-light"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Grid con Stagger Animation */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {plans.map((plan, idx) => {
                        const isHighlight = plan.highlight === true;
                        const isHovered = hoveredIndex === idx;

                        return (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                                    group relative flex flex-col h-full rounded-[24px] overflow-hidden transition-all duration-500 ease-out
                                    /* ESTILO BASE: Glassmorphism (Transparente + Blur) */
                                    bg-zinc-900/60 backdrop-blur-2xl
                                    /* BORDE: Unificado */
                                    border border-white/10
                                    /* HOVER BASE (Sutil aclarado) */
                                    hover:bg-zinc-900/60
                                `}
                                style={{
                                    // Borde highlight en hover o si es destacado
                                    borderColor: isHighlight || isHovered
                                        ? 'var(--product-primary-opacity-50, rgba(255,255,255,0.2))'
                                        : 'rgba(255,255,255,0.1)',
                                }}
                            >
                                {/* 1. INNER GLOW (Variable Color) */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom right, transparent 0%, transparent 40%, var(--product-primary-opacity-10, rgba(255,255,255,0.05)) 100%)`
                                    }}
                                />

                                {/* 2. CONTENIDO */}
                                <div className="p-8 flex flex-col h-full relative z-10">

                                    {/* Header + Badge */}
                                    <div className="flex justify-between items-start mb-6 h-8">
                                        <h3 className="text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--product-primary)]">
                                            {plan.title}
                                        </h3>

                                        {isHighlight && (
                                            <div
                                                className="px-3 py-1 rounded-full flex items-center gap-1.5"
                                                style={{
                                                    backgroundColor: 'var(--product-primary-opacity-10, rgba(14, 165, 233, 0.1))',
                                                    border: '1px solid var(--product-primary)',
                                                    color: 'var(--product-primary)',
                                                }}
                                            >
                                                <Star size={10} fill="currentColor" strokeWidth={0} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                                    Recomendado
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 min-h-[48px] transition-colors duration-300 group-hover:text-zinc-300">
                                        {plan.description}
                                    </p>

                                    {/* Separador */}
                                    <div
                                        className="w-full h-px mb-8 transition-colors duration-300"
                                        style={{ backgroundColor: isHighlight ? 'var(--product-primary-opacity-30, rgba(14,165,233,0.3))' : 'rgba(255,255,255,0.1)' }}
                                    />

                                    {/* Features List */}
                                    <div className="flex-1 space-y-6 mb-10">
                                        {plan.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-4 group/item">
                                                {/* Check Personalizado */}
                                                <div
                                                    className="mt-0.5 relative flex items-center justify-center shrink-0 rounded-full transition-all duration-300"
                                                    style={{
                                                        color: isHighlight || isHovered ? 'var(--product-primary)' : '#52525b',
                                                    }}
                                                >
                                                    <Check
                                                        size={16}
                                                        strokeWidth={isHighlight || isHovered ? 3 : 2}
                                                    />
                                                </div>
                                                <span
                                                    className={`text-sm transition-colors duration-300 ${isHighlight || isHovered ? 'text-zinc-100' : 'text-zinc-400'}`}
                                                >
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Botón CTA */}
                                    <div className="mt-auto">
                                        <Button
                                            className="w-full h-12 text-sm rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                                            onClick={() => onPlanSelect && onPlanSelect(plan.title)}
                                            style={{
                                                backgroundColor: isHighlight
                                                    ? 'var(--product-primary)'
                                                    : (isHovered ? 'white' : 'transparent'),

                                                color: isHighlight
                                                    ? 'var(--product-on-primary, #18181b)'
                                                    : (isHovered ? 'black' : 'white'),

                                                border: '1px solid',
                                                borderColor: isHighlight
                                                    ? 'var(--product-primary)'
                                                    : (isHovered ? 'white' : 'rgba(255,255,255,0.2)'),

                                                cursor: 'pointer'
                                            }}
                                        >
                                            <span>Consultar</span>
                                            <ArrowRight
                                                size={16}
                                                className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                                            />
                                        </Button>
                                    </div>
                                </div>

                                {/* 3. HOVER LINE (La barra inferior que se expande) */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-in-out"
                                    style={{ backgroundColor: 'var(--product-primary)' }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section >
    );
};

export default PricingSection;