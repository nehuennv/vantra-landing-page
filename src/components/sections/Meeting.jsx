import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Mail, Phone, Layers, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
// 1. IMPORTAMOS EL CEREBRO
import { useSubmitLead } from '../../hooks/useSubmitLead';

const Meeting = () => {
    // 2. USAMOS EL HOOK (En lugar de estados locales sueltos para carga/éxito)
    const { submitLead, loading, success, error, reset } = useSubmitLead();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        product: ''
    });

    // Listener para eventos externos (se mantiene igual)
    useEffect(() => {
        const handleSelectProduct = (e) => {
            setFormState(prev => ({ ...prev, product: e.detail }));
        };
        window.addEventListener('select-product', handleSelectProduct);
        return () => window.removeEventListener('select-product', handleSelectProduct);
    }, []);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    // 3. FUNCIÓN DE ENVÍO CONECTADA
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mapeamos los datos para el Hook (Pixel Perfect Data)
        const payload = {
            nombre: formState.name,
            email: formState.email,
            celular: formState.phone,
            opcion: formState.product
        };

        await submitLead(payload);
    };

    return (
        <section className="relative py-24 md:py-32" id="contacto">

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EDF246]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto">

                    {/* Left Side: Copywriting */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EDF246]/20 bg-[#EDF246]/5 text-[#EDF246] text-xs font-bold tracking-widest uppercase mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#EDF246] animate-pulse" />
                                Contacto Directo
                            </div>
                            <h2 className="font-display text-3xl md:text-6xl text-white mb-8 leading-[0.9] -ml-1 font-medium">
                                <span className="text-transparent whitespace-nowrap block" style={{ WebkitTextStroke: '1px #ffffff', color: 'rgba(255,255,255,0.05)' }}>
                                    Hablemos de
                                </span>
                                <span className="text-transparent bg-clip-text block" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)', WebkitBackgroundClip: 'text' }}>Escalar.</span>
                            </h2>
                            <p className="text-base md:text-xl text-gray-400 mb-8 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                                No somos vendedores, somos ingenieros. Cuéntanos qué necesitas y nuestro sistema te asignará al especialista correcto.
                            </p>

                            <div className="hidden lg:flex flex-col gap-4 text-sm text-gray-400 font-sans">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#EDF246]" />
                                    <span>Consultoría estratégica bonificada</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#EDF246]" />
                                    <span>Roadmap técnico de escalabilidad</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#EDF246]" />
                                    <span>Respuesta prioritaria &lt; 15 min</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: The Form (CONECTADO) */}
                    <div className="flex-1 w-full max-w-xl relative">
                        {/* Glow detrás del formulario */}
                        <div className="absolute inset-0 bg-[#EDF246]/5 blur-[80px] rounded-full -z-10" />

                        <Card hover={false} className="group border-[#EDF246]/10 bg-black/30 md:bg-[#08080A]/80 md:backdrop-blur-3xl shadow-2xl relative overflow-hidden">

                            {/* Línea decorativa superior animada (Hover) */}
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#EDF246] transition-all duration-500 ease-out group-hover:w-full z-20" />

                            <div className="p-8 md:p-10">

                                <AnimatePresence mode="wait">
                                    {success ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8"
                                        >
                                            <div className="w-20 h-20 bg-[#EDF246]/10 rounded-full flex items-center justify-center mb-6 text-[#EDF246] shadow-[0_0_30px_rgba(237,242,70,0.2)]">
                                                <CheckCircle2 size={40} />
                                            </div>

                                            <h3 className="text-3xl font-display text-white mb-3">Solicitud Enviada</h3>
                                            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                                                Gracias por elegir Vantra. Hemos asignado prioridad alta a tu consulta y te contactaremos en breve.
                                            </p>

                                            <button
                                                onClick={reset}
                                                className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:border-[#EDF246]/30"
                                            >
                                                Volver
                                            </button>
                                        </motion.div>
                                    ) : (
                                        /* --- FORMULARIO --- */
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-6 relative z-10"
                                        >
                                            {/* Name Input */}
                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Nombre Completo</label>
                                                <div className="relative">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#EDF246] transition-colors duration-300">
                                                        <User size={20} />
                                                    </div>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="name"
                                                        placeholder="Tu Nombre o Empresa"
                                                        value={formState.name}
                                                        onChange={handleChange}
                                                        className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#EDF246]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                                                    />
                                                </div>
                                            </div>

                                            {/* Stacked: Email & Phone */}
                                            <div className="flex flex-col gap-6">
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Email</label>
                                                    <div className="relative">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#EDF246] transition-colors duration-300">
                                                            <Mail size={20} />
                                                        </div>
                                                        <input
                                                            required
                                                            type="email"
                                                            name="email"
                                                            placeholder="tu@email.com"
                                                            value={formState.email}
                                                            onChange={handleChange}
                                                            className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#EDF246]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="group">
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">WhatsApp</label>
                                                    <div className="relative">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#EDF246] transition-colors duration-300">
                                                            <Phone size={20} />
                                                        </div>
                                                        <input
                                                            required
                                                            type="tel"
                                                            name="phone"
                                                            placeholder="+54 9 11 1234 5678"
                                                            value={formState.phone}
                                                            onChange={handleChange}
                                                            className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#EDF246]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Select */}
                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Interés Principal</label>
                                                <div className="relative">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#EDF246] transition-colors duration-300">
                                                        <Layers size={20} />
                                                    </div>
                                                    <select
                                                        required
                                                        name="product"
                                                        value={formState.product}
                                                        onChange={handleChange}
                                                        className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-12 text-white focus:outline-none focus:border-[#EDF246]/50 focus:bg-white/[0.05] transition-all duration-300 font-medium text-base appearance-none"
                                                    >
                                                        <option value="" disabled className="bg-[#08080A] text-gray-500">Seleccionar Tipo de Proyecto...</option>

                                                        <option value="crear una Landing Page de Alta Conversión 🚀" className="bg-[#08080A]">
                                                            Landing Page (Conversión)
                                                        </option>

                                                        <option value="escalar tus ventas con una Tienda Online 🛍️" className="bg-[#08080A]">
                                                            E-commerce / Tienda
                                                        </option>

                                                        <option value="optimizar tu gestión con un Dashboard a medida 💻" className="bg-[#08080A]">
                                                            WebApp / Dashboard
                                                        </option>

                                                        <option value="innovar con Inteligencia Artificial y Chatbots 🤖" className="bg-[#08080A]">
                                                            IA Integration / Chatbots
                                                        </option>
                                                    </select>
                                                    {/* Custom Chevron */}
                                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                                                        <ArrowRight className="rotate-90" size={18} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ERROR MESSAGE (Si la API falla) */}
                                            {error && (
                                                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                                                    <AlertCircle size={18} />
                                                    <span>{error}</span>
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full group relative flex items-center justify-center gap-3 bg-[#EDF246] text-black font-bold text-lg h-16 rounded-2xl mt-auto transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#E5EA35] hover:shadow-[0_0_40px_-10px_rgba(237,242,70,0.5)]"
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
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Meeting;