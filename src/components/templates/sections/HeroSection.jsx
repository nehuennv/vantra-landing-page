import React, { useRef } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Users, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroMedicalPhoto from '../../../assets/medical-web/hero-medical-photo.webp';

// --- COMPONENTE FILA DE DATOS (Para el Dashboard estático de la derecha) ---
const DataRow = ({ icon: Icon, label, value, color = "text-white", delay = 0 }) => (
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
    >
        <div className={`p-2 rounded-lg bg-[var(--product-primary)]/10 ${color}`}>
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{label}</div>
            <div className="text-sm font-medium text-white">{value}</div>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
    </motion.div>
);

// --- COMPONENTE RADAR (Reutilizable) ---
const RadarBackground = () => (
    <div className="relative w-[800px] h-[800px] flex items-center justify-center pointer-events-none select-none">

        {/* Static Rings (Base) - Low Opacity */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />

        {/* Moving Ring 1 - Slow Rotation */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[700px] h-[700px] border border-dashed border-white/10 rounded-full opacity-50 will-change-transform"
        />

        {/* Moving Ring 2 - Counter Rotation */}
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] rounded-full border border-transparent border-t-white/10 border-b-white/5 will-change-transform"
        />

        {/* High-Tech Scanner Effect (Gradient Sweep) */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full mix-blend-screen will-change-transform"
            style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, var(--product-primary) 360deg)',
                maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                opacity: 0.15
            }}
        />

        {/* Digital Pulse Waves (Outgoing) */}
        <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-[200px] h-[200px] border border-[var(--product-primary)] rounded-full will-change-transform"
        />

        {/* Core Glow */}
        <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[150px] h-[150px] bg-[var(--product-primary)] rounded-full blur-[80px] will-change-opacity"
        />
    </div>
);

const HeroSection = ({ data }) => {
    const { title, subtitle, cta, badge } = data;
    const containerRef = useRef(null);
    const [isHighlighted, setIsHighlighted] = React.useState(false);
    const lenis = useLenis();

    const handleScroll = (e, href) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(href);
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Variants originales que te gustaban
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 40, damping: 15 }
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] pt-0 flex flex-col justify-center overflow-hidden bg-transparent perspective-1000"
        >

            {/* MOBILE ONLY RADAR (Centered Background) */}
            <div className="absolute inset-0 w-full h-full flex lg:hidden items-center justify-center z-0 overflow-hidden pointer-events-none">
                <div className="scale-75 sm:scale-90 opacity-40">
                    <RadarBackground />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">

                {/* --- COLUMNA 1: TU CÓDIGO ORIGINAL (INTACTO) --- */}
                <motion.div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 relative z-30 lg:-mt-32"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge de estado (Modularizado) */}
                    {badge && (
                        <motion.div
                            variants={itemVariants}
                            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 md:bg-white/5 border border-white/10 md:backdrop-blur-md cursor-default transition-colors duration-300 hover:bg-white/10"
                            onMouseEnter={() => setIsHighlighted(true)}
                            onMouseLeave={() => setIsHighlighted(false)}
                        >
                            <motion.span
                                initial={false}
                                animate={{
                                    width: isHighlighted ? "auto" : 0,
                                    marginRight: isHighlighted ? 8 : 0,
                                    opacity: isHighlighted ? 1 : 0
                                }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="relative flex items-center h-2 overflow-hidden whitespace-nowrap"
                            >
                                <span className="relative flex h-2 w-2 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--product-primary)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--product-primary)]"></span>
                                </span>
                            </motion.span>
                            <span className="text-xs font-bold text-[var(--product-primary)] tracking-widest uppercase">
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    {/* 1. TÍTULO H1 (Tu código original) */}
                    <motion.div className="max-w-2xl relative mb-4 md:mb-6" variants={itemVariants}>
                        <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white drop-shadow-2xl">
                            {(() => {
                                const parts = title.split(/<span[^>]*>|<\/span>/);
                                if (parts.length < 2) return <div dangerouslySetInnerHTML={{ __html: title }} />;

                                return (
                                    <>
                                        <span className="[&>b]:text-transparent [&>b]:bg-clip-text [&>b]:bg-gradient-to-r [&>b]:from-[color:var(--product-primary)] [&>b]:to-white [&>b]:font-bold">
                                            {parts[0]}
                                        </span>
                                        <span
                                            className={`transition-all duration-700 ease-out italic font-bold will-change-[filter] inline-block tracking-wide bg-gradient-to-b from-white via-[color:var(--product-primary)] to-[color:var(--product-primary)] text-transparent bg-clip-text ${isHighlighted ? 'brightness-125 drop-shadow-[0_0_25px_rgba(14,165,233,0.8)]' : 'brightness-100 drop-shadow-none'}`}
                                        >
                                            {parts[1]}
                                        </span>
                                    </>
                                );
                            })()}
                        </h1>
                    </motion.div>

                    {/* 2. DESCRIPCIÓN (Tu código original) */}
                    <motion.div
                        variants={itemVariants}
                        className="text-base md:text-xl text-zinc-400 font-light max-w-lg leading-relaxed mb-6 md:mb-8"
                    >
                        {/* Mobile Subtitle */}
                        {data.mobileSubtitle && (
                            <div className="lg:hidden" dangerouslySetInnerHTML={{ __html: data.mobileSubtitle }} />
                        )}
                        {/* Desktop Subtitle */}
                        <div
                            className={data.mobileSubtitle ? "hidden lg:block" : "block"}
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    </motion.div>

                    {/* 3. CTAS (BOTONES) (Tu código original: los dos botones) */}
                    {cta && (
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            {/* Primary Button */}
                            {cta.primary && (
                                cta.primary.href ? (
                                    <a
                                        href={cta.primary.href}
                                        onClick={(e) => handleScroll(e, cta.primary.href)}
                                        onMouseEnter={() => setIsHighlighted(true)}
                                        onMouseLeave={() => setIsHighlighted(false)}
                                        className="group relative px-8 py-4 bg-[color:var(--product-primary)] text-[color:var(--product-on-primary,#18181b)] font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)] flex items-center justify-center cursor-pointer"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {cta.primary.text} <ArrowRight size={18} />
                                        </div>
                                    </a>
                                ) : (
                                    <button
                                        onClick={cta.primary.action}
                                        onMouseEnter={() => setIsHighlighted(true)}
                                        onMouseLeave={() => setIsHighlighted(false)}
                                        className="group relative px-8 py-4 bg-[color:var(--product-primary)] text-[color:var(--product-on-primary,#18181b)] font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)]"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {cta.primary.text} <ArrowRight size={18} />
                                        </div>
                                    </button>
                                )
                            )}

                            {/* Secondary Button */}
                            {cta.secondary && (
                                <a
                                    href={cta.secondary.href || "#"}
                                    onClick={(e) => {
                                        if (cta.secondary.href && cta.secondary.href.startsWith('#')) {
                                            handleScroll(e, cta.secondary.href);
                                        }
                                    }}
                                    className="px-8 py-4 rounded-xl bg-black/30 md:bg-white/5 border border-white/10 text-white font-semibold md:backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] flex items-center justify-center cursor-pointer"
                                >
                                    {cta.secondary.text}
                                </a>
                            )}
                        </motion.div>
                    )}
                </motion.div>


                {/* --- COLUMNA 2: DERECHA NUEVA (SIN COSAS FLOTANDO CUTRES) --- */}
                {/* Usamos el concepto "Sidebar Dashboard" que se siente UI Real, no marketing */}
                {/* HIDDEN ON MOBILE (BELOW LG) */}
                <div className="relative hidden w-full h-[45vh] min-h-[350px] lg:min-h-0 lg:h-[95vh] lg:flex items-end justify-center lg:justify-end order-2 mt-8 lg:mt-0">

                    {/* 1. Radar Sutil de Fondo (Tecnológico) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                        <RadarBackground />
                    </div>

                    {/* 2. Personaje con Mascara Fade-Out y Floating Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -10, 0] // Floating breathing effect
                        }}
                        transition={{
                            opacity: { duration: 1, ease: "easeOut" },
                            scale: { duration: 1, ease: "easeOut" },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative z-10 h-full w-full flex items-end justify-center lg:justify-end lg:pr-8"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                        }}
                    >
                        <img
                            src={HeroMedicalPhoto}
                            alt="Profesional Médico"
                            className="h-full w-auto overflow-visible object-cover object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        />
                    </motion.div>

                    {/* 3. DASHBOARD PANEL (A la derecha, firme, limpio, sin lag) */}
                    <div className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 w-64">

                        {/* Panel Principal Flotante */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                y: [0, -8, 0] // Gentle float
                            }}
                            transition={{
                                x: { delay: 0.5, duration: 0.6 },
                                opacity: { delay: 0.5, duration: 0.6 },
                                y: { delay: 1, duration: 5, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="bg-[#09090b]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl will-change-transform"
                        >
                            {/* Header Panel */}
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Live Metrics</span>
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                            </div>

                            {/* Filas de Datos (DataRows) */}
                            <div className="flex flex-col gap-3">
                                <DataRow icon={Users} label="Pacientes Hoy" value="48 Turnos" color="text-blue-400" delay={0.6} />
                                <DataRow icon={CheckCircle2} label="Confirmados" value="98.5%" color="text-[var(--product-primary)]" delay={0.7} />
                                <DataRow icon={Activity} label="Eficiencia" value="+24%" color="text-purple-400" delay={0.8} />
                            </div>

                            {/* Footer Panel */}
                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600">
                                <span>Updated: Now</span>
                                <Zap size={10} className="text-[var(--product-primary)]" />
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;