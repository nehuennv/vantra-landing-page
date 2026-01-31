import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, Calendar, Clock, Stethoscope, User, ArrowDown } from 'lucide-react';

/**
 * VisualCapture (Refactorizado & Robusto)
 * Simula el proceso de NLP: Ingreso de mensaje -> Identificación de entidades -> Estructuración de datos.
 */
const VisualCapture = () => {
    // FASES DE LA ANIMACIÓN: 'idle' | 'typing' | 'message' | 'scanning' | 'extracted' | 'complete'
    const [phase, setPhase] = useState('idle');

    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            while (mounted) {
                setPhase('idle');
                await delay(500);

                setPhase('typing');
                await delay(1500);

                setPhase('message');
                await delay(1000);

                // Comienza el escaneo de palabras clave
                setPhase('scanning');
                await delay(2000);

                // Aparece la tarjeta y se llenan los datos
                setPhase('extracted');
                await delay(3000); // Muestra el resultado final

                setPhase('complete'); // Salida suave
                await delay(500);
            }
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="w-full h-full bg-zinc-900 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden font-sans shadow-2xl">

            {/* HEADER TIPO WHATSAPP BUSINESS */}
            <div className="h-14 border-b border-white/5 flex items-center px-5 bg-[#0A0A0B] md:bg-white/[0.02] z-20 md:backdrop-blur-sm">
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                        <MessageCircle size={18} />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
                </div>
                <div className="ml-3 flex flex-col">
                    <h3 className="text-base font-normal font-righteous text-white tracking-wide uppercase">Solicitudes Entrantes</h3>
                    <span className="text-xs text-emerald-400 font-medium">En línea</span>
                </div>
            </div>

            <div className="flex-1 p-5 flex flex-col relative z-10">

                {/* ÁREA DE CHAT */}
                <div className="flex-1 relative">
                    <AnimatePresence mode='wait'>
                        {phase === 'idle' ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest opacity-50">Esperando mensajes...</span>
                            </motion.div>
                        ) : phase === 'typing' ? (
                            <motion.div
                                key="typing"
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-zinc-800 self-start p-3 rounded-2xl rounded-tl-sm w-fit border border-white/5"
                            >
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75" />
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="message"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, y: -20 }} // Se va hacia arriba al reiniciar
                                className="bg-zinc-800 self-start p-4 rounded-2xl rounded-tl-sm max-w-[95%] border border-white/5 shadow-sm relative group"
                            >
                                <p className="text-[15px] text-zinc-300 leading-relaxed font-light">
                                    Hola, soy <Highlight active={phase === 'scanning' || phase === 'extracted'} delay={0}>Sofía Martinez</Highlight>.
                                    Necesito turno para <Highlight active={phase === 'scanning' || phase === 'extracted'} delay={0.6} color="blue">Dermatología</Highlight> el <Highlight active={phase === 'scanning' || phase === 'extracted'} delay={1.2} color="purple">martes a la mañana</Highlight>.
                                </p>
                                <div className="flex justify-end items-center gap-1 mt-1.5">
                                    <span className="text-xs text-zinc-500">09:15</span>
                                    <Check size={10} className="text-emerald-500" />
                                    <Check size={10} className="text-emerald-500 -ml-1.5" />
                                </div>

                                {/* SCANNER LINE EFFECT */}
                                {(phase === 'scanning') && (
                                    <motion.div
                                        className="absolute inset-0 border-b-2 border-emerald-500/50 z-20 pointer-events-none"
                                        initial={{ top: 0, opacity: 0 }}
                                        animate={{ top: "100%", opacity: [0, 1, 0] }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* TARJETA DE RESULTADO (EXTRAÍDO) */}
                <div className="relative h-[150px]">
                    <AnimatePresence>
                        {(phase === 'extracted' || phase === 'complete') && (
                            <motion.div
                                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                className="absolute inset-x-0 bottom-0 bg-zinc-900 border border-emerald-500/30 rounded-xl overflow-hidden shadow-2xl"
                            >
                                {/* Barra de Estado Superior */}
                                <div className="bg-emerald-500/10 px-3 py-2 flex justify-between items-center border-b border-emerald-500/10">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Datos Capturados</span>
                                    </div>
                                    <div className="bg-zinc-900/50 p-1 rounded-md">
                                        <ArrowDown size={10} className="text-emerald-500" />
                                    </div>
                                </div>

                                {/* Cuerpo de la Tarjeta */}
                                <div className="p-3 grid grid-cols-2 gap-3">
                                    {/* Campo: Paciente */}
                                    <div className="bg-zinc-800/50 p-2 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <User size={10} className="text-zinc-500" />
                                            <span className="text-[10px] text-zinc-500 uppercase">Paciente</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                            className="text-sm text-white font-medium truncate"
                                        >
                                            Sofía Martinez
                                        </motion.div>
                                    </div>

                                    {/* Campo: Especialidad */}
                                    <div className="bg-zinc-800/50 p-2 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Stethoscope size={10} className="text-blue-400" />
                                            <span className="text-[10px] text-zinc-500 uppercase">Especialidad</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                            className="text-sm text-white font-medium truncate"
                                        >
                                            Dermatología
                                        </motion.div>
                                    </div>

                                    {/* Campo: Fecha */}
                                    <div className="bg-zinc-800/50 p-2 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Calendar size={10} className="text-purple-400" />
                                            <span className="text-[10px] text-zinc-500 uppercase">Fecha</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                            className="text-sm text-white font-medium truncate"
                                        >
                                            Martes 24
                                        </motion.div>
                                    </div>

                                    {/* Campo: Hora */}
                                    <div className="bg-zinc-800/50 p-2 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Clock size={10} className="text-purple-400" />
                                            <span className="text-[10px] text-zinc-500 uppercase">Hora Pref.</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                            className="text-sm text-white font-medium truncate"
                                        >
                                            Mañana
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

/**
 * Componente Helper para resaltar texto animado
 */
const Highlight = ({ children, active, delay = 0, color = "emerald" }) => {
    const colors = {
        emerald: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
        blue: "bg-blue-500/20 text-blue-200 border-blue-500/30",
        purple: "bg-purple-500/20 text-purple-200 border-purple-500/30"
    };

    return (
        <motion.span
            className={`px-1 py-0.5 rounded border border-transparent transition-colors duration-500 inline-block
                ${active ? colors[color] : 'bg-transparent text-inherit'}
            `}
            animate={active ? { scale: [1, 1.05, 1] } : {}}
            transition={{ delay: delay, duration: 0.4 }}
        >
            {children}
        </motion.span>
    );
};

export default VisualCapture;