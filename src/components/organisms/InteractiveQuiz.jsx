import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Check, Clock, Users, Database, AlertCircle,
    Sparkles, BrainCircuit, ScanLine, BarChart3, Lock, CheckCircle2
} from 'lucide-react';
import Button from '../ui/Button';

// ==========================================
// 🧠 MOTOR DE CONOCIMIENTO (The Algorithm)
// ==========================================

// Definición de Perfiles de Solución
const SOLUTIONS = {
    A: {
        id: 'A',
        name: "Sistema Completo",
        tagline: "Automatización Integral + IA",
        matchText: "Tu consultorio necesita salir de la operación manual inmediatamente.",
        description: "La solución definitiva para escalar sin caos. Incluye todo lo necesario para automatizar la captación, gestión y retención de pacientes.",
        features: [
            "Agente IA de Ventas 24/7",
            "Agenda Inteligente con Seña",
            "Dashboard Financiero Avanzado",
            "Campaña de Reactivación de Pacientes",
            "Soporte Prioritario"
        ]
    },
    B: {
        id: 'B',
        name: "Automatización + Control",
        tagline: "Gestión de Turnos y Mensajería",
        matchText: "Tu prioridad es resolver el caos de WhatsApp y las ausencias.",
        description: "Ideal para consultorios con alto volumen que necesitan ordenar la entrada de pacientes y reducir el ausentismo.",
        features: [
            "Centralización de WhatsApp",
            "Agenda Digital Estructurada",
            "Recordatorios Automáticos",
            "Reportes de Ausentismo",
            "Base de Datos de Pacientes"
        ]
    },
    C: {
        id: 'C',
        name: "Gestión Interna",
        tagline: "Orden Administrativo y Datos",
        matchText: "Necesitas centralizar información antes de automatizar.",
        description: "El primer paso para digitalizar tu consultorio. Organizá tu base de datos y tené control total de tu agenda.",
        features: [
            "Agenda Centralizada Simple",
            "Ficha Digital de Pacientes",
            "Historial Clínico Básico",
            "Reportes de Actividad Semanal",
            "Acceso Multi-usuario"
        ]
    }
};

// Pasos del Wizard con Lógica de Puntuación
const QUIZ_STEPS = [
    {
        id: 'intro',
        type: 'cover',
        title: "Diagnóstico de Escalabilidad",
        subtitle: "Analizaremos 12 puntos de control de tu consultorio para detectar cuellos de botella.",
        buttonText: "Iniciar Análisis"
    },
    {
        id: 'pain_point',
        type: 'question',
        title: "¿Cuál es el síntoma más crítico hoy?",
        subtitle: "Seleccioná el que más te quita energía.",
        options: [
            {
                id: 'chaos',
                label: 'Desorden de información y papeles',
                icon: Database,
                weights: { A: 10, B: 5, C: 20 }
            },
            {
                id: 'delay',
                label: 'Demoras en responder pacientes',
                icon: Clock,
                weights: { A: 10, B: 20, C: 0 }
            },
            {
                id: 'dependency',
                label: 'Si no estoy yo, el consultorio no funciona',
                icon: AlertCircle,
                weights: { A: 30, B: 5, C: 0 }
            },
            {
                id: 'absent',
                label: 'Ausentismo y huecos en agenda',
                icon: Users,
                weights: { A: 10, B: 20, C: 5 }
            },
        ]
    },
    {
        id: 'volume',
        type: 'question',
        title: "¿Volumen mensual de consultas?",
        subtitle: "Para dimensionar la infraestructura necesaria.",
        options: [
            { id: 'low', label: 'Menos de 100', icon: BarChart3, weights: { A: 0, B: 5, C: 20 } },
            { id: 'mid', label: 'Entre 100 y 300', icon: BarChart3, weights: { A: 10, B: 20, C: 5 } },
            { id: 'high', label: 'Más de 300', icon: BarChart3, weights: { A: 30, B: 10, C: 0 } },
        ]
    },
    {
        id: 'goal',
        type: 'question',
        title: "¿Qué objetivo perseguís este trimestre?",
        subtitle: "Esto define la agresividad de la implementación.",
        options: [
            { id: 'organize', label: 'Solo quiero orden interno', icon: Lock, weights: { A: 0, B: 0, C: 50 } },
            { id: 'automate', label: 'Quiero resolver WhatsApp y Agenda', icon: Clock, weights: { A: 10, B: 50, C: 0 } },
            { id: 'scale', label: 'Quiero automatizar todo el negocio', icon: Sparkles, weights: { A: 50, B: 10, C: 0 } },
        ]
    }
];

// ==========================================
// 🧩 SUB-COMPONENTES (UI MODULES)
// ==========================================

const ProgressBar = ({ current, total }) => {
    const progress = ((current + 1) / total) * 100;
    return (
        <div className="w-full h-1 bg-zinc-900/50 overflow-hidden relative">
            <motion.div
                className="h-full bg-[var(--product-primary)] shadow-[0_0_15px_var(--product-primary)] relative z-10"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
            />
        </div>
    );
};

// Pantalla de "Simulación de IA"
const ProcessingScreen = ({ onComplete }) => {
    const [status, setStatus] = useState("Inicializando...");

    useEffect(() => {
        const sequence = [
            { text: "Conectando con base de conocimientos...", time: 800 },
            { text: "Analizando volumen de datos...", time: 1600 },
            { text: "Detectando patrones de ineficiencia...", time: 2400 },
            { text: "Calculando ROI proyectado...", time: 3200 },
            { text: "Generando estrategia personalizada...", time: 4000 }
        ];

        sequence.forEach(({ text, time }) => {
            setTimeout(() => setStatus(text), time);
        });

        setTimeout(onComplete, 4500);
    }, [onComplete]);

    return (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--product-primary-rgb),0.1)_0%,transparent_70%)] opacity-50" />

            <div className="relative w-32 h-32 mb-10">
                <motion.div
                    className="absolute inset-0 border-t-2 border-[var(--product-primary)] rounded-full opacity-50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-2 border-b-2 border-[var(--product-primary)] rounded-full opacity-30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--product-primary)]/5 blur-xl animate-pulse"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit className="text-[var(--product-primary)]" size={40} />
                </div>
            </div>

            <motion.h3
                key={status}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                className="text-2xl font-display font-medium text-white mb-3 tracking-wide"
            >
                {status}
            </motion.h3>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                VANTRA CORE PROCESSING
            </p>
        </div>
    );
};

const QuestionCard = ({ step, onSelect }) => (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-8 md:mb-10 text-center md:text-left">
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--product-primary)] bg-[var(--product-primary)]/10 px-3 py-1 rounded-full border border-[var(--product-primary)]/20 uppercase tracking-wider mb-4"
            >
                <Sparkles size={12} /> Paso Crítico
            </motion.span>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-3">{step.title}</h3>
            <p className="text-zinc-400 text-lg font-light">{step.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 pb-4 flex-1 content-start">
            {step.options.map((opt, idx) => (
                <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onSelect(opt)}
                    className="group relative flex flex-col items-start gap-4 p-6 rounded-2xl bg-[#121215] md:bg-[#121215]/50 border border-white/5 hover:border-[var(--product-primary)]/50 hover:bg-[var(--product-primary)]/5 transition-all duration-300 text-left md:backdrop-blur-sm"
                >
                    <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[var(--product-primary)] group-hover:scale-110 group-hover:border-[var(--product-primary)]/30 transition-all duration-300 shadow-lg">
                        <opt.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="relative z-10 w-full">
                        <span className="block text-zinc-200 font-medium group-hover:text-white transition-colors text-lg mb-1">
                            {opt.label}
                        </span>
                        <span className="text-xs text-zinc-600 block group-hover:text-zinc-500 transition-colors">Seleccionar esta opción &rarr;</span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <div className="w-6 h-6 rounded-full bg-[var(--product-primary)] flex items-center justify-center shadow-[0_0_10px_var(--product-primary)]">
                            <Check size={14} className="text-black" strokeWidth={3} />
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    </div>
);

// ==========================================
// 🚀 COMPONENTE PRINCIPAL
// ==========================================

const InteractiveQuiz = ({ onSchedule }) => {
    // Estado del Sistema
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    // Memoria del "Algoritmo"
    const [scores, setScores] = useState({ A: 0, B: 0, C: 0 });
    const [history, setHistory] = useState([]);

    const activeStep = QUIZ_STEPS[currentStepIndex];

    // --- LÓGICA DE PROCESAMIENTO ---

    const handleSelection = (option) => {
        // 1. Calcular Pesos (Algoritmo)
        const newScores = { ...scores };
        Object.keys(option.weights).forEach(key => {
            newScores[key] += option.weights[key];
        });
        setScores(newScores);

        // 2. Guardar Historial
        setHistory([...history, { stepId: activeStep.id, label: option.label, optionId: option.id }]);

        // 3. Navegación
        if (currentStepIndex < QUIZ_STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            // Fin del cuestionario, inicia procesamiento fake
            setIsProcessing(true);
        }
    };

    // --- DETERMINAR GANADOR ---
    const winnerResult = useMemo(() => {
        // Ordenamos por puntaje
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const winnerKey = sorted[0][0]; // 'A', 'B', o 'C'
        return SOLUTIONS[winnerKey];
    }, [scores]);

    // Generador de Texto Dinámico (Why Logic)
    const dynamicReason = useMemo(() => {
        const painPoint = history.find(h => h.stepId === 'pain_point')?.label || "tu situación actual";
        return `El análisis detectó fricción crítica en "${painPoint}". Tu estructura actual frenará el crecimiento si no se optimiza con ${winnerResult.id === 'A' ? 'automatización integral' : 'procesos estructurados'}.`;
    }, [history, winnerResult]);

    // Generador de Score Random (94 - 100)
    const matchScore = useMemo(() => {
        const score = (Math.random() * (100 - 94) + 94).toFixed(1);
        return score === "100.0" ? "100" : score;
    }, []);

    // --- NUEVA LÓGICA DE FINALIZACIÓN ---
    const handleFinish = () => {
        const painPointSelected = history.find(step => step.stepId === 'pain_point')?.label;

        onSchedule({
            plan: winnerResult.name,
            dolor: painPointSelected,
            nicho: "Medicina"
        });
    };

    // --- RENDERIZADO DE VISTAS ---

    if (isProcessing) {
        return <ProcessingScreen onComplete={() => { setIsProcessing(false); setQuizFinished(true); }} />;
    }

    if (quizFinished) {
        return (
            <div className="flex flex-col h-full animate-in zoom-in-95 duration-700 bg-gradient-to-br from-[#0c0c0e] to-[#09090b] relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--product-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10">

                    {/* Header: Match Score */}
                    <div className="flex justify-center mb-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="px-4 py-2 bg-[#0C0C0E] md:bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.15)] md:backdrop-blur-md">
                                <ScanLine size={16} className="text-green-400" />
                                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Compatibilidad: {matchScore}%</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                        {/* Columna Izquierda: Diagnóstico (2/5) */}
                        <div className="lg:col-span-2 space-y-6 text-center lg:text-left pt-4">
                            <div>
                                <h3 className="text-zinc-500 text-sm uppercase tracking-widest font-medium mb-2">Diagnóstico VANTRA</h3>
                                <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                                    "{dynamicReason}"
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles size={16} className="text-[var(--product-primary)]" />
                                    <span className="text-sm font-bold text-zinc-200">¿Por qué este plan?</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Basado en tu volumen de {scores.volume > 100 ? 'alta' : 'media'} demanda y la necesidad crítica de {winnerResult.id === 'A' ? 'escalar' : 'ordenar'}, esta arquitectura te dará el ROI más rápido.
                                </p>
                            </div>
                        </div>

                        {/* Columna Derecha: Plan Card (3/5) */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative rounded-[24px] bg-[#121215] md:bg-[#121215]/80 md:backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl group"
                            >
                                {/* Top Highlight Line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--product-primary)] to-transparent opacity-50" />

                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <span className="text-[10px] font-bold text-[var(--product-primary)] uppercase tracking-widest mb-1 block">
                                                Plan Recomendado
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                                                {winnerResult.name}
                                            </h2>
                                        </div>
                                        {/* Icono decorativo */}
                                        <div className="w-12 h-12 rounded-full bg-[var(--product-primary)]/10 flex items-center justify-center">
                                            <BrainCircuit size={24} className="text-[var(--product-primary)]" />
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 text-sm mb-8 border-l-2 border-zinc-700 pl-4">
                                        {winnerResult.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-4 mb-8">
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold border-b border-white/5 pb-2">
                                            Lo que incluye:
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {winnerResult.features.map((feat, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                    className="flex items-center gap-3 group/item"
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20 group-hover/item:bg-green-500/20 transition-colors">
                                                        <Check size={10} className="text-green-400" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-zinc-300 text-sm font-medium group-hover/item:text-white transition-colors">{feat}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-6 border-t border-white/5">
                                        <Button
                                            className="w-full h-14 text-base bg-white text-black border-none font-bold hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            onClick={handleFinish}
                                        >
                                            Agendar Demo
                                        </Button>
                                        <p className="mt-4 text-center text-xs text-zinc-500">
                                            Se pre-seleccionará el plan ideal para tu consultorio.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VISTA DE PREGUNTAS (WIZARD) ---
    return (
        <div className="flex flex-col min-h-[600px] md:min-h-[500px] bg-[#09090b] md:bg-[#09090b]/80 md:backdrop-blur-md rounded-[24px] overflow-hidden relative">

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Barra de Progreso Superior */}
            <div className="relative z-10">
                <ProgressBar current={currentStepIndex} total={QUIZ_STEPS.length} />
            </div>

            <div className="flex-1 p-6 md:p-10 relative overflow-hidden flex flex-col z-10">
                {/* Intro Screen */}
                {activeStep.type === 'cover' ? (
                    <div className="flex flex-col h-full justify-center items-center text-center animate-in fade-in zoom-in-95 duration-700 py-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-[var(--product-primary)]/20 blur-xl rounded-full" />
                            <div className="relative w-24 h-24 bg-[#121215] rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl skew-y-3">
                                <BrainCircuit size={48} className="text-[var(--product-primary)]" strokeWidth={1.5} />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-tight max-w-2xl mx-auto">
                            {activeStep.title}
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-400 font-light mb-12 leading-relaxed max-w-lg mx-auto">
                            {activeStep.subtitle}
                        </p>
                        <Button
                            onClick={() => setCurrentStepIndex(1)}
                            className="w-full md:w-auto px-12 h-14 text-base font-bold bg-white text-black border-none rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            {activeStep.buttonText} <ArrowRight className="ml-2" size={20} />
                        </Button>
                        <div className="mt-8 flex items-center gap-6 justify-center opacity-60">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Lock size={12} /> Privacidad Total
                            </span>
                            <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <BrainCircuit size={12} /> AI Powered
                            </span>
                        </div>
                    </div>
                ) : (
                    // Question Screens
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep.id}
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="h-full flex flex-col"
                        >
                            <QuestionCard step={activeStep} onSelect={handleSelection} />
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Footer sutil */}
            {activeStep.type !== 'cover' && (
                <div className="px-8 py-4 border-t border-white/5 flex justify-between items-center relative z-10 bg-black md:bg-black/20 md:backdrop-blur-sm mt-auto">
                    <button
                        onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                        className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"
                    >
                        <ArrowRight className="rotate-180" size={12} /> Anterior
                    </button>
                    <span className="text-[10px] text-[var(--product-primary)] font-mono tracking-widest bg-[var(--product-primary)]/10 px-2 py-1 rounded border border-[var(--product-primary)]/20">
                        ANALYZING NODE {currentStepIndex} / {QUIZ_STEPS.length - 1}
                    </span>
                </div>
            )}
        </div>
    );
};

export default InteractiveQuiz;