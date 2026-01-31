import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Check, Clock, MoreVertical, Plus, User } from 'lucide-react';

// --- DATOS INICIALES ---
const initialSlots = [
    { id: 1, time: "09:00", name: "Ana Silva", type: "Primera Consulta", status: "finished", duration: 30 },
    { id: 2, time: "09:30", name: "Jorge M.", type: "Control", status: "in-progress", duration: 30 },
    { id: 'gap', time: "10:00", type: "gap", duration: 30 }, // EL HUECO VACÍO
    { id: 4, time: "10:30", name: "Marcos R.", type: "Consulta", status: "pending", duration: 30 },
];

const newPatientData = {
    id: 3,
    time: "10:00",
    name: "Lucía P.",
    type: "Estudios",
    status: "confirmed",
    duration: 30
};

/**
 * VisualAction (Refactorizado)
 * Simula la llegada de una solicitud y la asignación inteligente en un hueco libre.
 */
const VisualAction = () => {
    const [slots, setSlots] = useState(initialSlots);
    const [showToast, setShowToast] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // SECUENCIA DE ANIMACIÓN AUTOMÁTICA
    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            while (mounted) {
                // 1. Reset inicial
                setSlots(initialSlots);
                setShowToast(false);
                setIsProcessing(false);

                await delay(1000); // Espera inicial

                // 2. Entra notificación
                setShowToast(true);

                await delay(2000); // Leyendo notificación

                // 3. Procesando
                setIsProcessing(true); // Cambia el estado del toast a "Buscando hueco..."

                await delay(1500);

                // 4. INSERCIÓN MÁGICA (Reemplazamos el hueco con el paciente)
                setSlots(prev => prev.map(slot =>
                    slot.id === 'gap' ? newPatientData : slot
                ));
                setShowToast(false); // Se va el toast porque ya se agendó

                await delay(4000); // Dejar ver el resultado final antes de reiniciar
            }
        };

        runSequence();

        return () => { mounted = false; };
    }, []);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="w-full h-full bg-zinc-900 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden font-sans shadow-2xl">

            {/* --- HEADER --- */}
            <div className="h-14 flex items-center justify-between px-5 border-b border-white/5 bg-zinc-900 md:bg-zinc-800/30 md:backdrop-blur-sm z-20">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                        <h3 className="text-base font-normal font-righteous text-white tracking-wide uppercase">Agenda en Vivo</h3>
                        <span className="text-xs text-zinc-500 block">Dr. Alejandro</span>
                    </div>
                </div>
                <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono">
                    HOY, 24 SEP
                </div>
            </div>

            {/* --- CUERPO DE LA AGENDA --- */}
            <div className="flex-1 p-4 overflow-hidden relative">

                {/* Línea de Tiempo Decorativa (Vertical) */}
                <div className="absolute top-0 bottom-0 left-[3.5rem] w-[1px] bg-white/5 z-0" />

                {/* Línea de "Hora Actual" (Animada) */}
                <motion.div
                    className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
                    initial={{ top: "35%" }}
                    animate={{ top: "38%" }}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                >
                    <div className="w-[3.5rem] text-[10px] text-red-400 font-bold text-right pr-2">09:42</div>
                    <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <div className="flex-1 h-[1px] bg-red-500/50" />
                </motion.div>

                {/* LISTA DE ITEMS CON FÍSICA DE REORDENAMIENTO */}
                <LayoutGroup>
                    <div className="space-y-2 relative z-0">
                        <AnimatePresence mode='popLayout'>
                            {slots.map((slot) => (
                                <AgendaItem key={slot.id} data={slot} />
                            ))}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>

            </div>

            {/* --- NOTIFICACIÓN FLOTANTE (TOAST) --- */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute bottom-4 left-4 right-4 z-50"
                    >
                        <div className="bg-zinc-900 md:bg-zinc-800 border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3 md:backdrop-blur-md">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isProcessing ? 'bg-violet-500/20 text-violet-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {isProcessing ? (
                                    <Clock size={16} className="animate-spin" />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm font-bold text-white">
                                        {isProcessing ? "Buscando hueco..." : "Nueva Solicitud"}
                                    </span>
                                    <span className="text-xs text-zinc-500">Ahora</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-tight">
                                    {isProcessing
                                        ? "Optimizando agenda del día..."
                                        : "Lucía P. solicita turno para Estudios."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- SUB-COMPONENTE: ITEMS DE LA LISTA ---
const AgendaItem = ({ data }) => {
    const isGap = data.type === 'gap';
    const isFinished = data.status === 'finished';
    const isInProgress = data.status === 'in-progress';
    const isConfirmed = data.status === 'confirmed';

    return (
        <motion.div
            layout // IMPORTANTE: Esto permite que los items se muevan suavemente si cambia el orden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`
                flex items-center p-2.5 rounded-xl border relative overflow-hidden group
                ${isGap
                    ? 'border-dashed border-white/5 bg-white/[0.01]'
                    : isInProgress
                        ? 'bg-zinc-800/80 border-violet-500/30 shadow-lg'
                        : 'bg-transparent border-transparent hover:bg-white/[0.03] border-b-white/[0.02]'
                }
            `}
        >
            {/* Efecto de Highlight para items nuevos (Confirmed) */}
            {isConfirmed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1, repeat: 1 }}
                    className="absolute inset-0 bg-green-500/20 pointer-events-none"
                />
            )}

            {/* Columna Hora */}
            <div className={`w-12 text-xs font-mono font-medium ${isGap ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {data.time}
            </div>

            {/* Contenido Principal */}
            {isGap ? (
                // SLOT VACÍO
                <div className="flex-1 flex items-center gap-2 opacity-40">
                    <div className="w-8 h-8 rounded-full border border-dashed border-zinc-500 flex items-center justify-center">
                        <Plus size={12} className="text-zinc-500" />
                    </div>
                    <span className="text-xs text-zinc-500 italic">Disponible</span>
                </div>
            ) : (
                // SLOT OCUPADO
                <>
                    <div className="flex-1 flex items-center gap-3">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-inset
                            ${isInProgress ? 'bg-violet-500 text-white ring-violet-400' : 'bg-zinc-800 text-zinc-400 ring-white/5'}
                            ${isConfirmed ? 'bg-green-500/20 text-green-400 ring-green-500/30' : ''}
                        `}>
                            {data.name.charAt(0)}
                        </div>
                        <div>
                            <div className={`text-base font-medium leading-none mb-1 ${isInProgress ? 'text-white' : 'text-zinc-200'}`}>
                                {data.name}
                            </div>
                            <div className="text-xs text-zinc-500">{data.type}</div>
                        </div>
                    </div>

                    {/* Estado / Acción */}
                    <div className="w-20 flex justify-end">
                        {isConfirmed && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[9px] font-bold text-green-400 flex items-center gap-1"
                            >
                                <Check size={8} /> OK
                            </motion.div>
                        )}
                        {isInProgress && (
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                                </span>
                            </div>
                        )}
                        {isFinished && <Check size={14} className="text-zinc-700" />}
                        {!isFinished && !isInProgress && !isConfirmed && <MoreVertical size={14} className="text-zinc-700" />}
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default VisualAction;