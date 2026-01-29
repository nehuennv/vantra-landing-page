import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { useSubmitLead } from '../../hooks/useSubmitLead';

const ConsultationForm = ({ preSelectedPlan }) => {
    const { submitLead, loading, success, error, reset } = useSubmitLead();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Mapeo limpio de datos
        const payload = {
            opcion: formData.get('service'),
            nombre: formData.get('name'),
            email: formData.get('email'),
            celular: formData.get('phone')
        };

        await submitLead(payload);
    };

    // Estilos de Inputs: Sobrios, oscuros y legibles
    const inputClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none transition-all placeholder:text-zinc-600 font-light";
    const labelClasses = "block text-xs font-medium text-zinc-500 mb-1.5 ml-1 uppercase tracking-wide";

    return (
        <motion.div
            key={preSelectedPlan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full min-h-[500px] flex flex-col relative bg-zinc-950/30 rounded-2xl border border-white/5 p-6 md:p-8"
        >
            <AnimatePresence mode="wait">
                {success ? (
                    /* --- ESTADO DE ÉXITO (PROFESIONAL) --- */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-zinc-950 rounded-2xl"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                            <Check className="w-8 h-8 text-green-500" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-2xl font-semibold text-white mb-3">Solicitud enviada</h3>

                        <p className="text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
                            Gracias por tu interés en Vantra. Hemos recibido tu información correctamente y nos pondremos en contacto contigo a la brevedad.
                        </p>

                        <Button
                            onClick={reset}
                            className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 px-6 py-2 rounded-lg text-sm transition-colors"
                        >
                            Volver al formulario
                        </Button>
                    </motion.div>
                ) : (
                    /* --- FORMULARIO DE CONSULTA --- */
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="mb-8">
                            <h3 className="text-xl font-medium text-white mb-1">Agenda tu Consultoría</h3>
                            <p className="text-zinc-500 text-sm">Déjanos tus datos para analizar tu caso.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
                            {/* Selector de Servicio */}
                            <div>
                                <label className={labelClasses}>Servicio de Interés</label>
                                <div className="relative">
                                    <select
                                        name="service"
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                        defaultValue={preSelectedPlan || ""}
                                        required
                                    >
                                        <option value="" disabled hidden>Selecciona una opción...</option>
                                        <option value="Gestión Interna">Gestión Interna</option>
                                        <option value="Sistema Completo">Sistema Completo</option>
                                        <option value="Automatización">Automatización + IA</option>
                                    </select>
                                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 rotate-90 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Nombre */}
                            <div>
                                <label className={labelClasses}>Nombre Completo</label>
                                <input name="name" type="text" placeholder="Ej. Juan Pérez" className={inputClasses} required />
                            </div>

                            {/* Email y Teléfono */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClasses}>Email Corporativo</label>
                                    <input name="email" type="email" placeholder="nombre@empresa.com" className={inputClasses} required />
                                </div>
                                <div>
                                    <label className={labelClasses}>Teléfono</label>
                                    <input name="phone" type="tel" placeholder="+54 9 11..." className={inputClasses} required />
                                </div>
                            </div>

                            {/* Mensaje de Error Discreto */}
                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex-grow" />

                            {/* Botón de Acción Principal */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 text-sm font-semibold text-white bg-[var(--product-primary)] hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed rounded-lg mt-4"
                                style={{ backgroundColor: 'var(--product-primary)' }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            <span>Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Solicitar Consultoría</span>
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </div>
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ConsultationForm;