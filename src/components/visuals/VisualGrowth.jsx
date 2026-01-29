import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertCircle, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';

/**
 * VisualGrowth (Fixed Layout & High Value Data)
 * Layout corregido: Usa Flex Column con alturas explícitas para evitar el "aplastamiento".
 * Datos: Enfocado en Dinero (Facturación) y Pérdidas (Ausentismo).
 */
const VisualGrowth = () => {
    return (
        <div className="w-full h-full bg-zinc-900 rounded-3xl border border-white/5 font-sans flex flex-col shadow-2xl overflow-hidden relative">

            {/* Header STANDARDIZED */}
            <div className="h-14 flex items-center justify-between px-5 border-b border-white/5 bg-white/[0.02] shrink-0 z-20">
                <div className="flex flex-col justify-center">
                    <h3 className="text-base font-normal font-righteous text-white uppercase tracking-wider">Tablero de Control</h3>
                    <span className="text-[10px] text-zinc-500 leading-none mt-0.5">Últimos 30 días</span>
                </div>
                <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-zinc-400">
                    Septiembre
                </div>
            </div>

            {/* GRID BENTO (Layout Robusto: Filas fijas + Flex) */}
            <div className="flex-1 flex flex-col gap-3 min-h-0 p-5">

                {/* FILA SUPERIOR: 2 KPIs Críticos (Altura fija para no aplastarse) */}
                <div className="h-[120px] grid grid-cols-2 gap-3 shrink-0">

                    {/* KPI 1: TASA DE AUSENTISMO (El dolor del médico) */}
                    <div className="bg-zinc-800/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-between group hover:bg-zinc-800/60 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1.5 text-zinc-400">
                                <AlertCircle size={12} />
                                <span className="text-xs font-medium uppercase">Ausentismo</span>
                            </div>
                            {/* Badge positivo porque bajó el ausentismo */}
                            <div className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-semibold flex items-center gap-1">
                                <ArrowDownRight size={10} /> -4%
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white tracking-tight">12.5%</div>
                            <div className="w-full h-1.5 bg-zinc-700 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: "12.5%" }} // Escala visual ajustada
                                    transition={{ duration: 1, delay: 0.2 }}
                                />
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Objetivo: &lt;15%</p>
                        </div>
                    </div>

                    {/* KPI 2: FACTURACIÓN / MIX (El dinero) */}
                    <div className="bg-zinc-800/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-between group hover:bg-zinc-800/60 transition-colors">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Wallet size={12} />
                            <span className="text-xs font-medium uppercase">Ingresos</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-500">Obras Sociales</span>
                                    <span className="text-sm font-semibold text-white">65%</span>
                                </div>
                                <div className="h-1 w-16 bg-zinc-700 rounded-full overflow-hidden mb-1.5">
                                    <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ delay: 0.4 }} />
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-500">Particulares</span>
                                    <span className="text-sm font-semibold text-white">35%</span>
                                </div>
                                <div className="h-1 w-16 bg-zinc-700 rounded-full overflow-hidden mb-1.5">
                                    <motion.div className="h-full bg-purple-500" initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ delay: 0.6 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILA INFERIOR: GRÁFICO GRANDE (Toma el resto del espacio) */}
                <div className="flex-1 bg-zinc-800/40 rounded-2xl border border-white/5 p-4 relative overflow-hidden flex flex-col min-h-[100px]">
                    <div className="flex justify-between items-start z-10 mb-2">
                        <div>
                            <span className="text-xs text-zinc-400 font-medium uppercase flex items-center gap-1.5">
                                <Users size={12} /> Pacientes Atendidos
                            </span>
                            <div className="text-3xl font-bold text-white mt-1">1,284</div>
                        </div>
                        <div className="text-right">
                            <div className="text-emerald-400 text-sm font-semibold flex items-center justify-end gap-1">
                                <ArrowUpRight size={12} /> +18.2%
                            </div>
                            <span className="text-xs text-zinc-500">vs mes anterior</span>
                        </div>
                    </div>

                    {/* Área del Gráfico (Se expande para llenar el hueco) */}
                    <div className="flex-1 w-full relative">
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines Sutiles */}
                            <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />

                            {/* La Curva */}
                            <motion.path
                                d="M0,40 C10,35 20,45 30,25 S50,10 60,15 S80,5 100,0 V50 H0 Z"
                                fill="url(#chartGrad)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            />
                            <motion.path
                                d="M0,40 C10,35 20,45 30,25 S50,10 60,15 S80,5 100,0"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Puntos destacados */}
                            <motion.circle cx="30" cy="25" r="2" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                            <motion.circle cx="60" cy="15" r="2" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
                            <motion.circle cx="100" cy="0" r="2" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VisualGrowth;