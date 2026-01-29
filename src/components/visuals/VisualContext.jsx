import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Clock, Shield, FileText, Check, Search, Database as DbIcon, Activity } from 'lucide-react';

/**
 * VisualContext (Fixed & Polished)
 * Arquitectura corregida: Usa un SVG global para las líneas de conexión 
 * asegurando coordenadas perfectas entre el centro y los satélites.
 */
const VisualContext = () => {
    const [phase, setPhase] = useState('searching');

    // DATOS DE LOS NODOS (Posiciones X/Y en porcentajes para que sea responsive)
    const nodes = [
        { id: 1, title: "Historial", val: "3 Visitas Previas", icon: Clock, x: 80, y: 25, delay: 0 },
        { id: 2, title: "Cobertura", val: "OSDE 410", icon: Shield, x: 20, y: 30, delay: 0.2 },
        { id: 3, title: "Estudios", val: "Lab: Pendiente", icon: Activity, x: 75, y: 75, delay: 0.4 },
        { id: 4, title: "Notas", val: "Alergia: Penicilina", icon: FileText, x: 25, y: 70, delay: 0.6 },
    ];

    useEffect(() => {
        let mounted = true;
        const loop = async () => {
            while (mounted) {
                setPhase('searching');
                await delay(2000);
                setPhase('found');
                await delay(800);
                setPhase('fetching');
                await delay(2500);
                setPhase('complete');
                await delay(4000);
            }
        };
        loop();
        return () => { mounted = false; };
    }, []);

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const isLinesActive = phase === 'fetching' || phase === 'complete';

    return (
        <div className="w-full h-full bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col font-sans shadow-2xl">

            {/* HEADER */}
            <div className="h-14 border-b border-white/5 bg-white/[0.01] flex items-center justify-between px-5 z-30 backdrop-blur-sm relative">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${phase === 'searching' ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'}`} />
                    <span className="text-base font-normal font-righteous text-white uppercase tracking-wider">
                        {phase === 'searching' ? 'Buscando...' : 'Vantra Cloud'}
                    </span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-black/20 border border-white/5">
                    <Search size={10} className="text-zinc-500" />
                    <span className="text-xs text-zinc-500 font-mono">ID: 44.592.102</span>
                </div>
            </div>

            <div className="flex-1 relative w-full h-full">

                {/* 1. FONDO GRID */}
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />

                {/* 2. CAPA DE LÍNEAS (SVG GLOBAL) - Z-INDEX 10 */}
                {/* Esta capa dibuja las líneas desde el centro (50%, 50%) hacia las coordenadas de cada nodo */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {nodes.map((node) => (
                        <motion.line
                            key={node.id}
                            x1="50%" y1="50%"
                            x2={`${node.x}%`} y2={`${node.y}%`}
                            stroke="url(#line-gradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isLinesActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 0.8, delay: node.delay }}
                        />
                    ))}
                </svg>

                {/* 3. NODO CENTRAL - Z-INDEX 20 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                    {/* Anillos de búsqueda */}
                    <AnimatePresence>
                        {phase === 'searching' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-500/20"
                                    animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Avatar */}
                    <motion.div
                        animate={{
                            scale: phase === 'searching' ? 0.9 : 1,
                            borderColor: phase === 'searching' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.6)'
                        }}
                        className="w-20 h-20 bg-zinc-900 rounded-full border-2 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)] mb-3 relative"
                    >
                        <AnimatePresence mode="wait">
                            {phase === 'searching' ? (
                                <motion.div key="db" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <DbIcon size={28} className="text-blue-500/50 animate-pulse" />
                                </motion.div>
                            ) : (
                                <motion.div key="user" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
                                    <User size={36} className="text-blue-400" />
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-zinc-900 flex items-center justify-center"
                                    >
                                        <Check size={12} className="text-white" />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Nombre (Siempre pegado al avatar) */}
                    <motion.div
                        className="text-center w-40"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: phase !== 'searching' ? 1 : 0, y: phase !== 'searching' ? 0 : -10 }}
                    >
                        <div className="text-lg font-normal font-righteous text-white">Carlos Ruiz</div>

                    </motion.div>
                </div>

                {/* 4. NODOS SATÉLITE - Z-INDEX 30 */}
                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className="absolute z-30"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }} // Posicionamiento exacto
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isLinesActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: node.delay + 0.2 }}
                    >
                        {/* Translate -50% para centrar el nodo en la coordenada exacta */}
                        <div className="-translate-x-1/2 -translate-y-1/2 bg-zinc-800/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 w-max min-w-[140px]">
                            <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20 shrink-0">
                                <node.icon size={14} className="text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase font-medium tracking-wider mb-0.5">
                                    {node.title}
                                </div>
                                <div className="text-sm font-medium text-white whitespace-nowrap">
                                    {node.val}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    );
};

export default VisualContext;