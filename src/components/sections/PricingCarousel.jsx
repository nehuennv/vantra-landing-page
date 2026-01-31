import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Globe, Rocket, ShoppingBag, LayoutTemplate, MessageSquare, Zap } from 'lucide-react';
import Card from '../ui/Card';

// --- WIREFRAMES PREMIUM (ROBUSTOS & INTERACTIVOS) ---

// 1. Landing Page: Scroll fluido y estructura sólida
const LandingWireframe = () => (
    <div className="w-full h-full bg-[#1A1A1E] flex flex-col relative overflow-hidden font-sans">
        {/* Navbar Sticky */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#1A1A1E] md:bg-[#1A1A1E]/80 md:backdrop-blur-md z-10">
            <div className="w-6 h-6 rounded-md bg-white/20" />
            <div className="flex gap-2">
                <div className="w-16 h-2 rounded-full bg-white/10" />
                <div className="w-16 h-2 rounded-full bg-white/10" />
            </div>
        </div>

        {/* Scroll Content */}
        <div className="flex-1 relative overflow-hidden">
            <motion.div
                animate={{ y: [0, -120] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="space-y-6 p-4"
            >
                {/* Hero */}
                <div className="space-y-3 flex flex-col items-center pt-8 pb-4">
                    <div className="w-3/4 h-4 rounded-lg bg-gradient-to-r from-white/20 to-white/5" />
                    <div className="w-1/2 h-4 rounded-lg bg-white/10" />
                    <div className="w-32 h-8 rounded-lg bg-[#EDF246]/20 mt-4 border border-[#EDF246]/10" />
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 mb-2" />
                        <div className="w-full h-2 rounded bg-white/10" />
                    </div>
                    <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 mb-2" />
                        <div className="w-full h-2 rounded bg-white/10" />
                    </div>
                    <div className="col-span-2 h-24 rounded-xl bg-white/5 border border-white/5" />
                </div>

                {/* Testimonials */}
                <div className="flex gap-3 overflow-hidden opacity-50">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[150px] h-20 rounded-lg bg-white/5 border border-white/5" />
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Gradient Fade Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A1E] to-transparent pointer-events-none z-10" />
    </div>
);

// 2. E-commerce: Grid interactivo con hover simulation
const EcommerceWireframe = () => (
    <div className="w-full h-full bg-[#1A1A1E] flex flex-col font-sans">
        {/* Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-5">
            <div className="w-24 h-4 rounded bg-white/20" />
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5" />
                <div className="w-8 h-8 rounded-full bg-[#EDF246]/20" />
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Filters */}
            <div className="w-1/4 border-r border-white/5 p-4 space-y-4 hidden md:block bg-white/[0.01]">
                <div className="w-16 h-3 rounded bg-white/20 mb-6" />
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-2">
                        <div className="w-full h-2 rounded bg-white/5" />
                        <div className="w-2/3 h-2 rounded bg-white/5" />
                    </div>
                ))}
            </div>

            {/* Product Grid */}
            <div className="flex-1 p-5 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/5 aspect-[3/4] flex flex-col"
                        >
                            {/* Image Placeholder */}
                            <div className="flex-1 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors relative flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            {/* Info */}
                            <div className="p-3 space-y-2 bg-[#1A1A1E]">
                                <div className="w-3/4 h-3 rounded bg-white/20" />
                                <div className="flex justify-between items-center">
                                    <div className="w-12 h-3 rounded bg-white/10" />
                                    <div className="w-6 h-6 rounded bg-[#EDF246] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// 3. Dashboard: Gráficos vivos
const DashboardWireframe = () => (
    <div className="w-full h-full bg-[#1A1A1E] flex flex-col overflow-hidden font-sans">
        <div className="flex flex-1">
            {/* Sidebar Compact */}
            <div className="w-14 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-white/[0.01]">
                <div className="w-8 h-8 rounded-lg bg-[#EDF246]/20" />
                <div className="h-px w-8 bg-white/5" />
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 transition-colors" />
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-4">
                {/* Header Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                            <div className="w-6 h-6 rounded bg-white/10" />
                            <div className="w-12 h-3 rounded bg-white/20" />
                        </div>
                    ))}
                </div>

                {/* Big Chart Area */}
                <div className="h-48 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-end relative overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                        <div className="w-full h-px bg-white" />
                    </div>
                    {/* Bars */}
                    <div className="flex justify-between items-end h-32 gap-2 px-2 relative z-10">
                        {[40, 75, 50, 90, 60, 80, 45].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "10%" }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.1, ease: "easeInOut" }}
                                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#EDF246]/10 to-[#EDF246]/40 border-t border-[#EDF246]/50"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// 4. AI Chat: Typing fluido y mensajes
const AIWireframe = () => (
    <div className="w-full h-full bg-[#1A1A1E] flex flex-col p-4 relative font-sans">
        <div className="flex-1 space-y-6 overflow-hidden">
            {/* Mensajes Anteriores (Fade out top) */}
            <div className="opacity-30 space-y-4 filter blur-[1px]">
                <div className="flex gap-3 flex-row-reverse">
                    <div className="p-3 rounded-2xl rounded-tr-none bg-white/10 w-32 h-10" />
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 w-48 h-12" />
                </div>
            </div>

            {/* Mensaje Actual (Bot) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EDF246] to-orange-400 shrink-0 shadow-[0_0_15px_rgba(237,242,70,0.3)]" />
                <div className="space-y-2">
                    <div className="p-4 rounded-2xl rounded-tl-none bg-white/10 border border-white/5 w-64">
                        <div className="space-y-2">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                className="h-2 rounded bg-white/20 overflow-hidden"
                            />
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "80%" }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                className="h-2 rounded bg-white/10 overflow-hidden"
                            />
                        </div>
                    </div>

                    {/* Suggestion Chips */}
                    <div className="flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-white/5 border border-white/5" />
                        <div className="h-6 w-24 rounded-full bg-white/5 border border-white/5" />
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Input Area */}
        <div className="mt-4 relative">
            <div className="h-12 rounded-full bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                <div className="w-32 h-2 rounded bg-white/10" />
                <div className="w-8 h-8 rounded-full bg-[#EDF246] flex items-center justify-center">
                    <div className="w-3 h-3 border-t-2 border-r-2 border-black rotate-45" />
                </div>
            </div>
        </div>
    </div>
);

// 5. Corporate: Elegancia estática
const CorporateWireframe = () => (
    <div className="w-full h-full bg-[#1A1A1E] flex flex-col font-sans">
        {/* Massive Hero */}
        <div className="h-2/5 w-full bg-white/5 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1E]" />
            <div className="text-center space-y-3 relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full border border-white/10 flex items-center justify-center">
                    <Globe size={24} className="text-white/20" />
                </div>
                <div className="w-48 h-4 mx-auto rounded bg-white/20" />
            </div>
        </div>

        {/* Content Blocks */}
        <div className="flex-1 p-6 grid grid-cols-2 gap-4">
            <div className="space-y-3">
                <div className="w-12 h-12 rounded bg-white/5 mb-2" />
                <div className="w-full h-2 rounded bg-white/10" />
                <div className="w-2/3 h-2 rounded bg-white/10" />
                <div className="w-full h-2 rounded bg-white/5" />
            </div>
            <div className="space-y-3">
                <div className="w-12 h-12 rounded bg-white/5 mb-2" />
                <div className="w-full h-2 rounded bg-white/10" />
                <div className="w-2/3 h-2 rounded bg-white/10" />
                <div className="w-full h-2 rounded bg-white/5" />
            </div>
            <div className="col-span-2 mt-auto h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                <div className="w-32 h-2 rounded bg-white/10" />
            </div>
        </div>
    </div>
);


const servicesData = [
    {
        id: 1,
        title: "Landing Page",
        subtitle: "Conversión & Hype",
        icon: Rocket,
        description: "Diseño de alto impacto visual (Scrollytelling). Estructura persuasiva diseñada para convertir visitas en clientes.",
        features: ["Animaciones Scroll (Framer)", "Copywriting Persuasivo", "Formularios Integrados", "Carga Instantánea"],
        wireframe: <LandingWireframe />
    },
    {
        id: 2,
        title: "E-commerce",
        subtitle: "Ventas 24/7",
        icon: ShoppingBag,
        description: "Tiendas online robustas (Shopify o Custom). Gestión de inventario, pasarelas de pago y experiencia de compra fluida.",
        features: ["Catálogo Optimizado", "Carrito & Checkout", "Panel de Gestión", "Pagos Locales/Intl"],
        wireframe: <EcommerceWireframe />
    },
    {
        id: 3,
        title: "WebApp / SaaS",
        subtitle: "Plataformas Complejas",
        icon: LayoutTemplate,
        description: "Paneles de administración, gestión de usuarios, bases de datos y lógica de negocio a medida.",
        features: ["Dashboards en tiempo real", "Roles y Permisos", "Base de Datos SQL/NoSQL", "API Rest/GraphQL"],
        wireframe: <DashboardWireframe />
    },
    {
        id: 4,
        title: "Corporate Identity",
        subtitle: "Autoridad de Marca",
        icon: Globe,
        description: "Sitios institucionales que comunican solidez. Ideales para empresas que buscan posicionamiento y confianza.",
        features: ["Arquitectura de Información", "CMS Autogestionable", "Blog / Noticias", "Multilenguaje"],
        wireframe: <CorporateWireframe />
    },
    {
        id: 5,
        title: "AI Integration",
        subtitle: "El Futuro Hoy",
        icon: Cpu,
        description: "Chatbots inteligentes, automatización de procesos y asistentes virtuales entrenados con tu data.",
        features: ["Modelos LLM (GPT/Claude)", "Vectores & RAG", "Automatización de Tareas", "Análisis Predictivo"],
        wireframe: <AIWireframe />
    }
];

const PricingCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === servicesData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
    };

    const CurrentIcon = servicesData[currentIndex].icon;

    const handleQuote = () => {
        const map = ["landing", "ecommerce", "saas", "corporate", "ai"];
        const selected = map[currentIndex] || "other";

        // Dispatch custom event
        const event = new CustomEvent('select-product', { detail: selected });
        window.dispatchEvent(event);

        // Scroll
        const section = document.getElementById('contacto');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-12 relative overflow-hidden bg-transparent" id="servicios">

            {/* Soft Ambient Glow (Muy sutil, sin background duro) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#EDF246]/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Clean */}
                <div className="mb-20 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-display text-white mb-6 leading-[0.9] tracking-tight">
                        Arquitectura Digital <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)', WebkitBackgroundClip: 'text' }}>Escalable.</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto leading-relaxed">
                        Selecciona el tipo de proyecto para ver nuestra propuesta de valor.
                    </p>
                </div>

                {/* --- CAROUSEL MAIN CARD --- */}
                <Card className="max-w-6xl mx-auto min-h-[500px] border-white/10 bg-[#08080A]/40 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row h-full">

                        {/* LEFT PANEL: INFO (60%) */}
                        <div className="lg:w-[60%] p-8 md:p-12 flex flex-col justify-center relative z-10">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Top Meta */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EDF246] shadow-[0_0_15px_rgba(237,242,70,0.1)]">
                                            <CurrentIcon size={24} />
                                        </div>
                                        <span className="text-xl font-bold text-[#EDF246] tracking-wide font-sans">
                                            {servicesData[currentIndex].subtitle}
                                        </span>
                                    </div>

                                    {/* Title & Desc */}
                                    <h3 className="text-4xl md:text-5xl font-display text-white mb-6">
                                        {servicesData[currentIndex].title}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg font-sans">
                                        {servicesData[currentIndex].description}
                                    </p>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                                        {servicesData[currentIndex].features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 size={16} className="text-[#EDF246] shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button clean */}
                                    <div className="mt-auto pt-4">
                                        <button
                                            onClick={handleQuote}
                                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#EDF246] text-black font-bold rounded-full hover:bg-[#EDF246]/90 transition-all duration-300 shadow-[0_0_20px_rgba(237,242,70,0.3)] font-sans"
                                        >
                                            Cotizar proyecto
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav Buttons (Corner) */}
                            <div className="absolute bottom-12 right-12 flex gap-3 z-20">
                                <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                                <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT PANEL: VISUAL WIREFRAME (40%) */}
                        <div className="lg:w-[40%] bg-[#050505]/50 border-l border-white/5 relative overflow-hidden flex items-center justify-center p-8">

                            {/* Sin grid de fondo, solo pureza */}

                            {/* Device Frame */}
                            <div className="relative w-full aspect-[9/16] lg:aspect-[3/4] max-w-[320px] mx-auto">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full"
                                    >
                                        <div className="w-full h-full rounded-[2rem] border-4 border-[#2A2A2E] bg-[#1A1A1E] shadow-2xl overflow-hidden relative">
                                            {/* Dynamic Content */}
                                            {servicesData[currentIndex].wireframe}

                                            {/* Screen Reflection Overlay (Glassy) */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        </section>
    );
};

export default PricingCarousel;