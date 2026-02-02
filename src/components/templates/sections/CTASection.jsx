import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, User, Mail, Phone, Layers, Loader2, ArrowRight, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

import QuizIntro from '../../organisms/QuizIntro';
import QuizModal from '../../organisms/QuizModal';

// 1. Importamos el Cerebro (Hook)
import { useSubmitLead } from '../../../hooks/useSubmitLead';

const CTASection = ({ data, theme, preSelectedPlan }) => {
    const [activeView, setActiveView] = useState('form');
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    // Estado para guardar datos enriquecidos (Plan + Datos del Quiz)
    const [leadContext, setLeadContext] = useState({
        plan: preSelectedPlan || '',
        dolor: null,
        nicho: null
    });

    // Sincronizar selección externa (ej. desde Pricing)
    useEffect(() => {
        if (preSelectedPlan) {
            setLeadContext(prev => ({ ...prev, plan: preSelectedPlan }));
            setActiveView('form');
        }
    }, [preSelectedPlan]);

    // 2. Manejador Inteligente
    const handleSchedule = (incomingData) => {
        if (typeof incomingData === 'object' && incomingData !== null) {

            setLeadContext({
                plan: incomingData.plan,
                dolor: incomingData.dolor,
                nicho: incomingData.nicho || 'Medicina'
            });
        } else {

            setLeadContext(prev => ({ ...prev, plan: incomingData }));
        }

        setIsQuizOpen(false);
        setActiveView('form');
    };

    const { title, subtitle } = data || {
        title: "Empezá a escalar hoy.",
        subtitle: "Dejá de perder tiempo en tareas operativas y enfocate en tus pacientes."
    };

    const benefits = [
        { icon: Zap, text: "Implementación rápida en 48hs" },
        { icon: ShieldCheck, text: "Seguridad de datos grado médico" },
        { icon: BarChart3, text: "Reportes de crecimiento mensual" },
    ];

    return (
        <section className="pt-24 md:pt-32 pb-56 px-6 relative overflow-hidden" id="cta-section">

            <QuizModal
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                onSchedule={handleSchedule}
            />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* --- COLUMNA IZQUIERDA --- */}
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--product-primary)] text-xs font-bold tracking-widest uppercase mb-6">
                                <span className="w-2 h-2 rounded-full bg-[var(--product-primary)] animate-pulse" />
                                RESPUESTA RÁPIDA
                            </div>
                            <h2 className="text-3xl md:text-7xl font-display font-medium text-white mb-4 md:mb-6 tracking-tight leading-[0.9]">
                                {title}
                            </h2>
                            <p className="text-base md:text-xl text-gray-400 font-light mb-6 md:mb-10 max-w-xl leading-relaxed">
                                {subtitle}
                            </p>

                            <div className="space-y-6 mb-6 md:mb-10">
                                {benefits.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="w-12 h-12 rounded-xl bg-black/30 border border-white/5 flex items-center justify-center text-[var(--product-primary)] group-hover/item:scale-110 transition-transform duration-300">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-gray-300 font-medium text-base md:text-lg">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-sm text-gray-500 border-l-2 border-[var(--product-primary)]/20 pl-4">
                                * Cupos limitados para implementaciones mensuales.
                            </p>
                        </motion.div>
                    </div>

                    {/* --- COLUMNA DERECHA: Panel --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-[var(--product-primary)]/20 to-transparent rounded-[26px] opacity-30 blur-sm" />
                        {/* CARD PRINCIPAL (Formulario) -> Glassmorphism */}
                        <div className="relative z-10 w-full max-w-lg mx-auto bg-black/30 backdrop-blur-3xl rounded-[32px] p-8 md:p-12 border border-white/10 shadow-[0_0_50px_-10px_rgba(var(--product-primary-rgb),0.1)] overflow-hidden">
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-[var(--product-primary)] transition-all duration-500 ease-out group-hover:w-full z-20" />

                            {/* Switch Header */}
                            <div className="p-2 border-b border-white/5 relative z-10">
                                <div className="relative bg-black/40 p-1 rounded-xl flex items-center justify-between">
                                    {['form', 'quiz'].map((view) => {
                                        const isActive = activeView === view;
                                        return (
                                            <button
                                                key={view}
                                                onClick={() => setActiveView(view)}
                                                className={`relative w-1/2 py-3 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="liquid-switch-bg"
                                                        className="absolute inset-0 bg-[var(--product-primary)] rounded-lg shadow-sm"
                                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                    />
                                                )}
                                                <span className={`relative z-10 flex items-center justify-center gap-2 ${isActive ? 'text-black font-bold' : ''}`}>
                                                    {view === 'form' ? (
                                                        <>
                                                            <span className="md:hidden">Demo</span>
                                                            <span className="hidden md:inline">Agendar Demo</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="md:hidden">Test</span>
                                                            <span className="hidden md:inline">Test de Elegibilidad</span>
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Body: Sin scroll forzado, altura dinámica */}
                            <div className="flex flex-col relative w-full min-h-[640px]">
                                <AnimatePresence mode="wait">
                                    {activeView === 'form' ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-1 flex flex-col w-full mt-6 md:mt-8"
                                        >
                                            <ConsultationFormInlined leadContext={leadContext} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="quiz"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col w-full min-h-[640px]"
                                        >
                                            <div className="flex-1 flex flex-col h-full">
                                                <QuizIntro onStart={() => setIsQuizOpen(true)} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// 📝 FORMULARIO FUNCIONAL OPTIMIZADO
// ==========================================

const ConsultationFormInlined = ({ leadContext }) => {
    const { submitLead, loading, success, error, reset } = useSubmitLead();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        product: leadContext?.plan || ''
    });

    useEffect(() => {
        if (leadContext?.plan) {
            setFormState(prev => ({ ...prev, product: leadContext.plan }));
        }
    }, [leadContext]);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            nombre: formState.name,
            email: formState.email,
            celular: formState.phone,
            opcion_interes: formState.product,
            dolor_principal: leadContext?.dolor || null,
            nicho: leadContext?.nicho || "Medicina"
        };



        await submitLead(payload);
    };

    if (success) {
        return (
            <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10"
            >
                <div className="w-24 h-24 rounded-full bg-[var(--product-primary)]/10 flex items-center justify-center text-[var(--product-primary)] shadow-[0_0_30px_rgba(var(--product-primary-rgb),0.2)]">
                    <CheckCircle2 size={48} />
                </div>
                <div>
                    <h3 className="text-3xl font-display text-white mb-3">¡Datos Recibidos!</h3>
                    <p className="text-gray-400 max-w-xs mx-auto text-lg">
                        Tu diagnóstico ha sido guardado exitosamente.
                    </p>
                </div>
                {/* SIN BORDE Y LETRA MAS GRANDE */}
                <div className="p-4 bg-white/5 rounded-lg text-base text-zinc-300">
                    Un especialista analizará tu caso: <br />
                    <span className="text-[var(--product-primary)] font-bold">"{leadContext.dolor || 'General'}"</span>
                </div>
                <button
                    onClick={reset}
                    className="text-sm text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 transition-colors"
                >
                    Enviar otra consulta
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col h-full relative z-10"
        >
            <div className="flex-1 space-y-6">
                {/* SIN BORDE BLANCO EN EL ANÁLISIS */}
                {leadContext?.dolor && (
                    <div className="bg-[var(--product-primary)]/10 p-3 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                        <Sparkles className="text-[var(--product-primary)] shrink-0 mt-0.5" size={16} />
                        <div className="text-xs text-zinc-300">
                            <span className="block font-bold text-[var(--product-primary)] mb-0.5">Diagnóstico Adjunto:</span>
                            Optimizando para resolver: <span className="text-white italic">"{leadContext.dolor}"</span>
                        </div>
                    </div>
                )}

                {/* Nombre Completo */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Nombre Completo</label>
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--product-primary)] transition-colors duration-300">
                            <User size={20} />
                        </div>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Tu Nombre o Empresa"
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--product-primary)]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                        />
                    </div>
                </div>

                {/* DOS COLUMNAS: Email y Teléfono */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Email</label>
                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--product-primary)] transition-colors duration-300">
                                <Mail size={20} />
                            </div>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--product-primary)]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">WhatsApp</label>
                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--product-primary)] transition-colors duration-300">
                                <Phone size={20} />
                            </div>
                            <input
                                required
                                type="tel"
                                name="phone"
                                placeholder="+54 9 11..."
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--product-primary)]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Selección de Plan */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Interés Principal</label>
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--product-primary)] transition-colors duration-300">
                            <Layers size={20} />
                        </div>
                        <select
                            required
                            name="product"
                            value={formState.product}
                            onChange={handleChange}
                            className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-12 text-white focus:outline-none focus:border-[var(--product-primary)]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base appearance-none"
                        >
                            <option value="" disabled className="bg-[#08080A] text-gray-500">Seleccionar...</option>
                            <option value="Sistema Completo" className="bg-[#08080A]">Sistema Completo</option>
                            <option value="Automatización + Control" className="bg-[#08080A]">Automatización + Control</option>
                            <option value="Gestión Interna" className="bg-[#08080A]">Gestión Interna</option>
                            <option value="Consulta General" className="bg-[#08080A]">Otro / Consulta General</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                            <ArrowRight className="rotate-90" size={18} />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in">
                        <AlertCircle size={14} />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            <div className="mt-auto">
                <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: 'var(--product-primary)' }}
                    className="w-full group relative flex items-center justify-center gap-3 text-black font-bold text-lg h-16 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[var(--product-primary)] hover:brightness-110 hover:shadow-[0_0_40px_-10px_rgba(var(--product-primary-rgb),0.5)]"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={24} />
                            <span className="tracking-wide">Procesando...</span>
                        </>
                    ) : (
                        <>
                            <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="tracking-wide">Enviar Solicitud</span>
                        </>
                    )}
                </button>
            </div>
        </motion.form>
    );
};

export default CTASection;