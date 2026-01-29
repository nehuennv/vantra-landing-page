import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Bell, MoreHorizontal, ArrowRight,
    Activity, Users
} from 'lucide-react';

// --- UTILIDADES ---

const Skeleton = ({ className, width, height, isDark }) => (
    <div
        className={`rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} ${className}`}
        style={{ width: width || '100%', height: height || '8px' }}
    />
);

// --- COMPONENTES ---

const Sidebar = ({ color, theme }) => {
    const isDark = theme === 'dark';
    const bg = isDark ? 'bg-[#0F0F10]' : 'bg-gray-50';
    const border = isDark ? 'border-white/5' : 'border-gray-200';
    const iconBg = isDark ? 'bg-white/5' : 'bg-gray-200';
    const iconFill = isDark ? 'bg-white/20' : 'bg-gray-400';

    return (
        <div className={`w-full h-full flex flex-col items-center py-6 gap-6 ${bg} border-r ${border}`}>
            {/* Logo */}
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white border border-gray-200'} flex items-center justify-center`}>
                <div className={`w-5 h-5 rounded-md ${iconFill}`} />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-6 w-full items-center mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${iconBg}`}>
                        <div className={`w-5 h-5 rounded ${iconFill}`} style={{ backgroundColor: i === 1 ? color : undefined, opacity: i === 1 ? 1 : (isDark ? 0.2 : 0.4) }} />
                    </div>
                ))}
            </div>

            {/* Avatar Bottom */}
            <div className={`mt-auto w-10 h-10 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
        </div>
    );
};

const DashboardContent = ({ color, theme }) => {
    const isDark = theme === 'dark';
    const [dataTick, setDataTick] = useState(0);

    // Simular datos en vivo
    useEffect(() => {
        const interval = setInterval(() => {
            setDataTick(t => t + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Paleta Dinámica
    const bgApp = isDark ? 'bg-[#050505]' : 'bg-white';
    const bgPanel = isDark ? 'bg-[#0A0A0B]' : 'bg-gray-50/50';
    const textMain = isDark ? 'text-white' : 'text-gray-900';
    const border = isDark ? 'border-white/5' : 'border-gray-200';

    // Cards
    const cardBg = isDark ? 'bg-[#121214]' : 'bg-white';
    const cardBorder = isDark ? 'border-white/5' : 'border-gray-200 shadow-sm';

    // Icons
    const iconBg = isDark ? 'bg-white/5' : 'bg-gray-100';
    const iconColor = isDark ? 'text-white/30' : 'text-gray-400';

    return (
        <div className={`flex h-full w-full font-sans ${bgApp} ${textMain} select-none overflow-hidden`}>

            {/* --- 1. SIDEBAR (Fixed) --- */}
            <div className="w-20 shrink-0 h-full">
                <Sidebar color={color} theme={theme} />
            </div>

            {/* --- 2. CONTENIDO PRINCIPAL (Fluid) --- */}
            <div className={`flex-1 h-full flex flex-col ${bgPanel} min-w-0`}>

                {/* Topbar Fija */}
                <div className={`h-16 w-full border-b ${border} flex items-center justify-between px-8 ${bgPanel}`}>
                    <div className="flex flex-col gap-2">
                        <Skeleton width="120px" height="10px" isDark={isDark} />
                        <Skeleton width="80px" height="6px" className="opacity-50" isDark={isDark} />
                    </div>
                    <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center border ${isDark ? 'border-white/5' : 'border-transparent'}`}>
                            <Bell size={18} className={iconColor} />
                        </div>
                    </div>
                </div>

                {/* SCROLL AREA */}
                <div className="flex-1 w-full overflow-y-auto p-4 scrollbar-hide">
                    <div className="w-full flex flex-col gap-4">

                        {/* --- FILA 1: 4 CUADRADOS ANIMADOS --- */}
                        <div className="w-full flex h-40">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-[25%] h-full p-2">
                                    <div
                                        className={`w-full h-full ${cardBg} border ${cardBorder} rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden`}
                                    >
                                        <div className="flex justify-between items-start z-10">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors`} style={{ backgroundColor: `${color}20` }}>
                                                <Activity size={16} style={{ color: color }} />
                                            </div>
                                            {/* Mini grafico barras Animado */}
                                            <div className="flex items-end gap-1 h-6">
                                                {[1, 2, 3].map(b => (
                                                    <motion.div
                                                        key={b}
                                                        className={`w-1.5 rounded-t-sm ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                                                        animate={{ height: `${Math.random() * 60 + 20}%` }}
                                                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: b * 0.2 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2 z-10 w-full">
                                            <Skeleton width="40%" height="6px" className="opacity-50" isDark={isDark} />
                                            <div className={`w-full h-3 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-100'} overflow-hidden`}>
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: color }}
                                                    initial={{ width: "50%" }}
                                                    animate={{ width: `${Math.random() * 40 + 40}%` }}
                                                    transition={{ duration: 3, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>
                                        {/* Background tint sutil */}
                                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: color }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- FILA 2: GRÁFICOS --- */}
                        <div className="w-full flex h-64">
                            {/* Gráfico 1 */}
                            <div className="w-[50%] h-full p-2">
                                <div className={`w-full h-full ${cardBg} border ${cardBorder} rounded-2xl p-5 flex flex-col relative overflow-hidden`}>
                                    <div className="flex justify-between mb-4">
                                        <Skeleton width="100px" isDark={isDark} />
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                                            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
                                        </div>
                                    </div>
                                    {/* Visual Chart Lineas Animadas */}
                                    <div className="flex-1 w-full relative">
                                        <div className={`absolute inset-0 flex flex-col justify-between pointer-events-none ${isDark ? 'opacity-10' : 'opacity-5'}`}>
                                            {[1, 2, 3].map(l => <div key={l} className={`w-full h-px ${isDark ? 'bg-white' : 'bg-black'}`} />)}
                                        </div>
                                        <HydratedChart color={color} />
                                    </div>
                                </div>
                            </div>

                            {/* Gráfico 2 (Dona) */}
                            <div className="w-[50%] h-full p-2">
                                <div className={`w-full h-full ${cardBg} border ${cardBorder} rounded-2xl p-5 flex flex-col items-center justify-center relative`}>
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="50%" cy="50%" r="40%" fill="none" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="8" />
                                            <HydratedCircle color={color} />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                            <HydratedPercentage />
                                            <Skeleton width="30px" height="4px" isDark={isDark} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- FILA 3: LISTAS --- */}

                        {/* --- FILA 3: LISTAS --- */}
                        <div className="w-full flex h-60 pb-4">
                            {[1, 2].map((listIdx) => (
                                <div key={listIdx} className="w-[50%] h-full p-2">
                                    <div className={`w-full h-full ${cardBg} border ${cardBorder} rounded-2xl p-5 flex flex-col`}>
                                        <div className="flex justify-between items-center mb-4">
                                            <Skeleton width="120px" height="8px" isDark={isDark} />
                                            <MoreHorizontal size={16} className={iconColor} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                                            {[1, 2, 3, 4].map(row => (
                                                <div key={row} className={`flex items-center gap-3 p-2 rounded transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                                    <div className={`w-8 h-8 rounded shrink-0 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />
                                                    <div className="flex-1 space-y-1.5">
                                                        <Skeleton width="60%" height="6px" isDark={isDark} />
                                                        <Skeleton width="40%" height="4px" className="opacity-50" isDark={isDark} />
                                                    </div>
                                                    <Skeleton width="20px" height="6px" className="opacity-30" isDark={isDark} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- WRAPPER PRINCIPAL ---

const EcosystemDashboard = ({ theme = 'dark', color = "#EDF246" }) => {
    const isDark = theme === 'dark';

    return (
        <div className="relative w-full h-full group perspective-[1000px]">

            {/* VENTANA DEL SISTEMA */}
            <div className={`w-full h-full border rounded-xl shadow-2xl flex flex-col overflow-hidden relative transition-transform duration-500 hover:scale-[1.005] ${isDark ? 'bg-[#0F0F10] border-white/10' : 'bg-white border-gray-200'}`}>

                {/* Barra de título */}
                <div className={`h-8 border-b flex items-center px-4 gap-2 shrink-0 z-30 ${isDark ? 'bg-[#1A1A1E] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>

                {/* Contenido + Blur Overlay */}
                <div className={`flex-1 relative overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>

                    {/* El Dashboard Real */}
                    <DashboardContent color={color} theme={theme} />

                    {/* OVERLAY DE BLUR (Invertido: Claro -> Oscuro al Hover) */}
                    <div className="absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-in-out
                        bg-transparent backdrop-blur-[5px]
                        group-hover:bg-black/40 group-hover:backdrop-blur-[5px]"
                    />

                    {/* Botón CTA */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="pointer-events-auto">
                            <button
                                className="flex items-center gap-2 px-8 py-4 text-white font-bold text-sm tracking-widest uppercase rounded-xl border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-105"
                                style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}60` }}
                            >
                                Explorar
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EcosystemDashboard;

// --- HYDRATION SAFE COMPONENTS ---

const HydratedChart = ({ color }) => {
    // Estado inicial ESTÁTICO y VÁLIDO para evitar "undefined" o mismatch
    const [pathD, setPathD] = useState("M0,30 Q25,10 50,30 T100,20");
    const [areaD, setAreaD] = useState("M0,30 Q25,10 50,30 T100,20 V40 H0 Z");

    useEffect(() => {
        // Generar valores aleatorios SOLO en el cliente (montaje)
        setPathD(`M0,${30 + Math.random() * 5} Q25,${10 + Math.random() * 5} 50,${30 - Math.random() * 5} T100,${20 + Math.random() * 5}`);
        setAreaD(`M0,${30 + Math.random() * 5} Q25,${10 + Math.random() * 5} 50,${30 - Math.random() * 5} T100,${20 + Math.random() * 5} V40 H0 Z`);
    }, []);

    return (
        <svg viewBox="0 0 100 40" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
            <motion.path
                // Short-circuit para asegurar string
                d={pathD || "M0,30 Q25,10 50,30 T100,20"}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, d: pathD }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.path
                d={areaD || "M0,30 Q25,10 50,30 T100,20 V40 H0 Z"}
                fill={color}
                fillOpacity="0.1"
                stroke="none"
                animate={{ d: areaD }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
        </svg>
    );
};

const HydratedCircle = ({ color }) => {
    return (
        <motion.circle
            cx="50%" cy="50%" r="40%"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray="180 300"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: [50, 0, 50] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
    );
};

const HydratedPercentage = () => {
    const [percentage, setPercentage] = useState(60);

    useEffect(() => {
        setPercentage(60 + Math.floor(Math.random() * 20));
    }, []);

    return (
        <motion.span
            className="text-2xl font-bold"
            key={percentage} // Animation triggers on change
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {percentage}%
        </motion.span>
    );
};
