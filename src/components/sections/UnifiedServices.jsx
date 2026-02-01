import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, TrendingUp, Users, HeartHandshake, ArrowRight,
    CheckCircle2, Cpu, Rocket, ShoppingBag, LayoutTemplate,
    ChevronRight, ChevronLeft, CreditCard, MousePointer2, MessageCircle
} from 'lucide-react';

// ==========================================
// 1. MACOS AUTO-SCROLL UI
// ==========================================

const MacOSWindow = ({ children, speed = 20 }) => (
    <div className="w-full h-full md:bg-[#1e1e20] relative overflow-hidden flex flex-col font-sans select-none rounded-t-xl group-hover:rounded-xl transition-all">

        {/* MacOS Header */}
        <div className="h-8 w-full bg-[#252529] border-b border-white/5 flex items-center px-4 gap-2 z-20 shrink-0 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm" /> {/* Red */}
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm" /> {/* Yellow */}
            <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm" /> {/* Green */}
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 relative overflow-hidden bg-[#0d0d0f]">
            {/* Mouse Cursor Simulation */}
            <motion.div
                animate={{
                    x: [40, 180, 120, 240, 60],
                    y: [100, 300, 200, 400, 150]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute z-30 pointer-events-none"
            >
                <MousePointer2 size={16} fill="white" className="drop-shadow-md text-black" />
            </motion.div>

            <motion.div
                animate={{ y: [0, -600] }}
                transition={{ duration: speed, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="w-full flex flex-col"
            >
                {children}
            </motion.div>

            {/* Fade Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0f] to-transparent z-10 pointer-events-none" />
        </div>
    </div>
);

const Block = ({ className, width = "100%", height = "100%" }) => (
    <div className={`bg-white/5 rounded-lg ${className}`} style={{ width, height }} />
);
const Line = ({ className, width = "100%" }) => (
    <div className={`h-2 rounded-full bg-white/5 ${className}`} style={{ width }} />
);

// --- 1. LANDING WIREFRAME (Service / SaaS) ---
// High-conversion landing page structure: Hero -> Logos -> Benefits -> CTA
const LandingWireframe = () => (
    <MacOSWindow speed={25}>
        {/* Navbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#121214] md:bg-[#121214]/50 md:backdrop-blur-sm">
            <Block width={30} height={30} className="rounded-lg bg-white/10" />
            <div className="flex gap-4">
                <Line width={60} />
                <Line width={60} />
                <div style={{ width: 80, height: 28 }} className="bg-[#EDF246] rounded-full" />
            </div>
        </div>

        {/* Hero Section */}
        <div className="py-16 px-8 flex flex-col items-center gap-6">
            <div className="space-y-3 flex flex-col items-center w-full">
                <Line width="70%" className="h-8 bg-white/10" />
                <Line width="50%" className="h-8 bg-white/10" />
            </div>
            <Line width="40%" className="h-4 bg-white/5" />

            <div className="flex gap-3 mt-4">
                <div style={{ width: 120, height: 40 }} className="bg-[#EDF246] rounded-lg" />
                <Block width={120} height={40} className="border border-white/10" />
            </div>
        </div>

        {/* Trust/Logos Strip */}
        <div className="h-16 border-y border-white/5 bg-white/[0.02] flex items-center justify-between px-8 opacity-60">
            {[1, 2, 3, 4].map(i => <Block key={i} width={60} height={20} className="rounded" />)}
        </div>

        {/* Value Props (3 Cols) - NOT generic squares */}
        <div className="grid grid-cols-3 gap-6 px-8 py-16">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col gap-3">
                    <Block width={40} height={40} className="rounded-xl bg-white/10 mb-2" />
                    <Line width="80%" className="h-4 bg-white/10" />
                    <Line width="100%" />
                    <Line width="90%" />
                </div>
            ))}
        </div>

        {/* Big Features Section (Left/Right) */}
        <div className="px-8 py-10 space-y-16">
            <div className="flex gap-8 items-center">
                <Block className="flex-1 aspect-[4/3] bg-white/5" />
                <div className="flex-1 space-y-4">
                    <Line width="90%" className="h-6 bg-white/10" />
                    <div className="space-y-2">
                        <Line width="100%" />
                        <Line width="95%" />
                        <Line width="85%" />
                    </div>
                </div>
            </div>
        </div>

        {/* Final CTA */}
        <div className="mx-8 mb-10 h-64 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex flex-col items-center justify-center gap-6">
            <Line width="50%" className="h-6 bg-white/20" />
            <div style={{ width: 140, height: 45 }} className="bg-[#EDF246] rounded-lg" />
        </div>
    </MacOSWindow>
);

// --- 2. ECOMMERCE WIREFRAME (Shopify-like) ---
const EcommerceWireframe = () => (
    <MacOSWindow speed={20}>
        {/* Promo Banner */}
        <div className="h-8 bg-[#EDF246] flex items-center justify-center">
            <Line width={150} className="h-2 bg-black/20" />
        </div>

        {/* Navbar */}
        <div className="h-16 border-b border-white/5 px-6 flex items-center justify-between">
            <Block width={30} height={30} className="rounded-full" />
            <div className="flex gap-4">
                <Line width={50} />
                <Line width={50} />
                <Line width={50} />
            </div>
            <Block width={30} height={30} className="rounded bg-white/10" />
        </div>

        {/* Hero Image */}
        <div className="h-[300px] w-full bg-white/5 relative">
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <Line width="30%" className="h-8 bg-white/20" />
                <Block width={100} height={36} className="bg-[#EDF246]" />
            </div>
        </div>

        {/* Product Carousel */}
        <div className="px-6 py-10 space-y-6">
            <Line width={120} className="h-4 bg-white/10 mx-auto" />

            <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="group">
                        <div className="aspect-[3/4] bg-white/5 rounded-xl mb-3 relative overflow-hidden">
                            <div className="absolute top-2 left-2 w-8 h-4 bg-white/20 rounded" />
                        </div>
                        <Line width="80%" className="h-3 mb-1" />
                        <Line width="40%" className="h-3 bg-white/10" />
                    </div>
                ))}
            </div>
        </div>
    </MacOSWindow>
);

// --- 3. DASHBOARD WIREFRAME (SaaS/Analytics) ---
const DashboardWireframe = () => (
    <MacOSWindow speed={15}>
        <div className="flex h-full min-h-[800px]">
            {/* Sidebar */}
            <div className="w-16 border-r border-white/5 py-6 flex flex-col items-center gap-6 bg-[#161618]">
                <Block width={24} height={24} className="rounded-lg bg-[#EDF246]" />
                {[1, 2, 3, 4].map(i => <Block key={i} width={20} height={20} className="rounded opacity-50" />)}
            </div>

            {/* Main */}
            <div className="flex-1 p-6 space-y-6 bg-[#0d0d0f]">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <Line width={120} className="h-5 bg-white/10" />
                    <div className="flex gap-2">
                        <Block width={30} height={30} className="rounded-full bg-white/5" />
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                            <Block width={20} height={20} className="rounded bg-white/10" />
                            <Line width="40%" className="h-4 bg-[#EDF246]/50" />
                        </div>
                    ))}
                </div>

                {/* Big Chart */}
                <div className="h-56 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <Line width={100} className="h-3" />
                        <Block width={80} height={20} className="rounded-full bg-white/5" />
                    </div>
                    <div className="flex-1 flex items-end gap-1.5 overflow-hidden">
                        {[30, 50, 40, 70, 50, 60, 80, 40, 90, 65, 85].map((h, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [`${h}%`, `${h + 10}%`, `${h}%`] }}
                                transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                                className="flex-1 bg-gradient-to-t from-[#EDF246]/10 to-[#EDF246] rounded-t-sm opacity-80"
                            />
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="space-y-3">
                    <Line width={100} className="h-3 mb-2" />
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 border-b border-white/5 flex items-center gap-4">
                            <Block width={20} height={20} className="rounded-full" />
                            <Line width="30%" />
                            <Line width="30%" className="ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </MacOSWindow>
);

// --- 4. AI / WHATSAPP BOT WIREFRAME (Operational) ---
const AIWireframe = () => (
    <MacOSWindow speed={18}>
        {/* WhatsApp/Chat Header */}
        <div className="h-16 bg-[#202c33] flex items-center px-4 gap-3 border-b border-white/5">
            <Block width={40} height={40} className="rounded-full bg-[#EDF246]" />
            <div className="space-y-1.5 ">
                <Line width={120} className="h-3 bg-white/20" />
                <Line width={60} className="h-2 bg-[#28C840]" /> {/* "Online" green text approx */}
            </div>
        </div>

        {/* Background Pattern Hint */}
        <div className="flex-1 p-6 space-y-6 bg-[#0b141a]"> {/* Dark WA bg */}

            {/* System Message */}
            <div className="flex justify-center">
                <div className="px-4 py-1.5 bg-[#182229] rounded-lg text-center">
                    <Line width={180} className="h-2 bg-[#EDF246]/20" />
                </div>
            </div>

            {/* Conversation */}
            {/* Bot Msg 1 */}
            <div className="flex justify-start">
                <div className="max-w-[80%] bg-[#202c33] rounded-xl rounded-tl-none p-3 border border-white/5 shadow-sm">
                    <Line width={160} className="h-2 mb-2 bg-white/20" />
                    <Line width={100} className="h-2 bg-white/10" />
                </div>
            </div>

            {/* User Msg 1 */}
            <div className="flex justify-end">
                <div className="max-w-[70%] bg-[#005c4b] rounded-xl rounded-tr-none p-3 shadow-sm text-right flex flex-col items-end">
                    <Line width={140} className="h-2 bg-white/40" />
                </div>
            </div>

            {/* Bot Msg 2 (Operational Block) */}
            <div className="flex justify-start w-full">
                <div className="max-w-[85%] bg-[#202c33] rounded-xl rounded-tl-none p-1 border border-white/5 overflow-hidden">
                    {/* Visual Card inside chat */}
                    <div className="bg-[#2a3942] p-3 rounded-lg space-y-3">
                        <div className="flex gap-3 items-center">
                            <div className="w-8 h-8 rounded bg-[#28C840]/20 flex items-center justify-center">
                                <CheckCircle2 size={16} className="text-[#28C840]" />
                            </div>
                            <div className="space-y-1.5 flex-1">
                                <Line width="100%" className="h-2.5 bg-white/20" />
                                <Line width="60%" className="h-2 bg-white/10" />
                            </div>
                        </div>
                        <div className="h-px w-full bg-white/5" />
                        <div className="flex justify-between items-center">
                            <Line width={60} className="h-2 bg-white/10" />
                            <Block width={60} height={20} className="rounded bg-[#005c4b]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* User Msg 2 */}
            <div className="flex justify-end">
                <div className="max-w-[60%] bg-[#005c4b] rounded-xl rounded-tr-none p-3 shadow-sm flex flex-col items-end">
                    <Line width={80} className="h-2 bg-white/40" />
                </div>
            </div>

            {/* Bot Typing */}
            <div className="flex justify-start">
                <div className="bg-[#202c33] rounded-xl rounded-tl-none p-4 w-16 flex items-center gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
            </div>

        </div>
    </MacOSWindow>
);

// ==========================================
// 2. COMPONENT LOGIC
// ==========================================

const pillars = [
    {
        id: "roi",
        icon: TrendingUp,
        title: "ROI Obsesivo",
        desc: "Dashboards en tiempo real. Cada peso invertido se traduce en métricas."
    },
    {
        id: "partners",
        icon: Users,
        title: "Tu Brazo Tecnológico",
        desc: "Nos integramos en tu Slack y en tu visión. Somos socios, no proveedores."
    },
    {
        id: "scale",
        icon: HeartHandshake,
        title: "Escalabilidad Infinita",
        desc: "Código modular preparado para escalar x10 sin reescribir nada."
    },
    {
        id: "speed",
        icon: Zap,
        title: "Velocidad Extrema",
        desc: "Optimización de milisegundos. Performance es conversión."
    }
];

const services = [
    {
        id: "landing",
        title: "Landing Page",
        subtitle: "Conversión Pura",
        desc: "Diseño estratégico enfocado en vender. Velocidad de carga instantánea y narrativa visual de alto impacto.",
        specs: ["Framer Motion + React", "SEO Técnico Avanzado", "Integración CRM", "A/B Testing Ready"],
        icon: Rocket,
        wireframe: <LandingWireframe />
    },
    {
        id: "ecommerce",
        title: "E-commerce",
        subtitle: "Sistema de Ventas",
        desc: "Infraestructura robusta para venta online. Shopify Plus o desarrollo Custom con gestión de inventario y logística.",
        specs: ["Shopify / Custom", "Pasarelas Multi-moneda", "Automatización Stock", "Recovery Funnels"],
        icon: ShoppingBag,
        wireframe: <EcommerceWireframe />
    },
    {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Gestión Operativa",
        desc: "Centraliza tu operación. Paneles de control para visualizar métricas, usuarios y automatizar decisiones.",
        specs: ["React + Node/Python", "Base de Datos SQL", "Roles (RBAC)", "WebSockets"],
        icon: LayoutTemplate,
        wireframe: <DashboardWireframe />
    },
    {
        id: "ai",
        title: "Inteligencia Artificial",
        subtitle: "Operaciones", // Changed subtitle
        desc: "Bots operativos para WhatsApp. Automatiza atención, ventas y procesos sin intervención humana.", // Updated description
        specs: ["WhatsApp API", "Asistentes 24/7", "Integración CRM", "Flujos de Venta"],
        icon: MessageCircle, // Changed icon
        wireframe: <AIWireframe />
    }
];

const UnifiedServices = () => {
    const [activeService, setActiveService] = useState(services[0]);

    const handleQuote = () => {
        const event = new CustomEvent('select-product', { detail: activeService.id });
        window.dispatchEvent(event);
        const section = document.getElementById('contacto');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    const nextService = () => {
        const currentIndex = services.findIndex(s => s.id === activeService.id);
        const nextIndex = (currentIndex + 1) % services.length;
        setActiveService(services[nextIndex]);
    };

    const prevService = () => {
        const currentIndex = services.findIndex(s => s.id === activeService.id);
        const prevIndex = (currentIndex - 1 + services.length) % services.length;
        setActiveService(services[prevIndex]);
    };

    return (
        <section className="relative py-24 md:py-32 text-white overflow-hidden" id="unified-services">

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* --- HEADER --- */}
                <div className="mb-10 md:mb-20 text-center max-w-4xl mx-auto">
                    <h2 className="font-display text-3xl md:text-6xl leading-[1.1] text-white tracking-tight mb-6 font-medium">
                        Ingeniería Digital <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)', WebkitBackgroundClip: 'text' }}>Unificada.</span>
                    </h2>
                    <p className="text-base md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Fusionamos estrategia de negocio y código de alto rendimiento en un solo ecosistema.
                    </p>
                </div>

                {/* --- THE MONOLITH CONTAINER --- */}
                {/* --- SEPARATED LAYOUT (Floating Modules) --- */}
                <div className="flex flex-col gap-6">



                    {/* BOTTOM: SERVICES MODULE */}
                    <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-[#EDF246]/10 bg-black/30 md:bg-[#08080A]/80 md:backdrop-blur-3xl min-h-[600px]">
                        <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-overlay" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                            {/* NAV SIDEBAR (Desktop) */}
                            <div className="hidden lg:flex lg:col-span-4 border-r border-white/5 bg-transparent flex-col">
                                <div className="flex-1 overflow-y-auto">
                                    {services.map((service) => {
                                        const isActive = activeService.id === service.id;
                                        const Icon = service.icon;
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => setActiveService(service)}
                                                className={`w-full text-left p-8 border-b border-white/5 relative group transition-all duration-500 ${isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}
                                            >
                                                {isActive && (
                                                    <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-[#EDF246]" />
                                                )}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-[#EDF246]' : 'text-gray-600'}`}>
                                                        {service.subtitle}
                                                    </span>
                                                    <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-700'}`} />
                                                </div>
                                                <div className={`font-display text-2xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                                    {service.title}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CONTENT AREA */}
                            <div className="lg:col-span-8 bg-transparent flex flex-col relative">

                                {/* MOBILE NAV (Restored Header) */}
                                <div className="flex lg:hidden items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 rounded-t-3xl">
                                    {/* Title Left */}
                                    <span className="text-sm font-bold uppercase tracking-widest text-[#EDF246]">
                                        {activeService.title}
                                    </span>

                                    {/* Arrows Right */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={prevService}
                                            className="p-2 rounded-full bg-white/[0.03] hover:bg-white/10 text-white transition-colors"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={nextService}
                                            className="p-2 rounded-full bg-white/[0.03] hover:bg-white/10 text-white transition-colors"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* MOBILE NAV (Arrows) */}


                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeService.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="bg-black/30 flex flex-col h-full relative z-10"
                                    >
                                        <div className="p-8 md:p-12 pb-0 flex-1  lg:bg-transparent rounded-b-3xl lg:rounded-none">
                                            {/* Unified Header Removed - Title is in Top Nav now */}
                                            <h3 className="hidden lg:block text-4xl md:text-5xl font-display text-white mb-6">
                                                {activeService.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl font-light">
                                                {activeService.desc}
                                            </p>

                                            <div className="hidden lg:flex flex-wrap gap-4 mb-10">
                                                {activeService.specs.map((spec, i) => (
                                                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                                        <CheckCircle2 size={14} className="text-[#EDF246]" />
                                                        <span className="text-sm text-gray-300">{spec}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={handleQuote}
                                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#EDF246] text-black rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(237,242,70,0.3)] transition-all duration-300"
                                            >
                                                Cotizar
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>

                                        {/* WIREFRAME MONITOR */}
                                        <div className="mt-auto h-[400px] relative group overflow-hidden flex items-end justify-center px-8 lg:px-12">
                                            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[#EDF246]/5 blur-[80px] pointer-events-none" />

                                            {/* Browser Container - No Borders/Rounded changes here, handled by MacOSWindow */}
                                            <div className="w-full h-full shadow-2xl relative overflow-hidden transform translate-y-4 group-hover:translate-y-2 transition-transform duration-700">
                                                {activeService.wireframe}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>


                    {/* TOP: PILLARS MODULE (Moved to Bottom & Hidden on Mobile) */}
                    <div className="hidden lg:block rounded-3xl overflow-hidden border border-[#EDF246]/10 bg-black/30 md:bg-[#08080A]/80 md:backdrop-blur-3xl shadow-2xl">
                        <div className="grid grid-cols-4 divide-x divide-white/5">
                            {pillars.map((pillar) => (
                                <div key={pillar.id} className="p-8 group hover:bg-white/[0.02] transition-colors duration-300">
                                    <div className="mb-4 text-gray-400 group-hover:text-[#EDF246] transition-colors duration-300">
                                        <pillar.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-display text-lg text-white mb-2">
                                        {pillar.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 leading-relaxed font-sans">
                                        {pillar.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default UnifiedServices;