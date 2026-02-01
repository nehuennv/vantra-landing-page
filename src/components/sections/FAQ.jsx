import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight } from 'lucide-react';

const faqItems = [
    {
        id: "01",
        q: "¿Qué es Vantra y qué hacemos?",
        a: "Somos una firma de ingeniería de software y estrategia digital. Construimos ecosistemas digitales (SaaS, E-commerce, IA) diseñados para escalar facturación y automatizar procesos operativos. No vendemos webs, vendemos herramientas de negocio."
    },
    {
        id: "02",
        q: "¿Usan plantillas o desarrollan a medida?",
        a: "Modelo Híbrido. Usamos nuestro propio 'Vantra Core' para la base técnica (seguridad, servidores, autenticación) lo que ahorra meses de trabajo. Sobre eso, diseñamos y programamos la experiencia visual y lógica de negocio 100% a medida para tu marca."
    },
    {
        id: "03",
        q: "¿Qué pasa si mi negocio crece?",
        a: "Nuestro software es elástico. Diseñamos arquitectura en la nube que escala automáticamente. Si pasas de 100 a 1 millón de visitas, el sistema aguanta sin que tengas que reescribir código."
    },
    {
        id: "04",
        q: "¿Cuánto tarda un proyecto?",
        a: "Velocidad de ejecución crítica. Una Landing Page de alto impacto: 7-10 días. Un E-commerce o Dashboard complejo: 4-6 semanas. Trabajamos por Sprints semanales para que veas avances reales desde el día 1."
    },
    {
        id: "05",
        q: "¿Dan soporte post-lanzamiento?",
        a: "Siempre. Nos convertimos en tu brazo técnico. Incluimos monitoreo 24/7, actualizaciones de seguridad y reuniones mensuales de optimización. Tu software evoluciona constantemente."
    }
];

const FAQCard = ({ item, isOpen, onClick }) => {
    return (
        <motion.div
            initial={false}
            animate={{
                borderColor: isOpen ? "rgba(237, 242, 70, 0.5)" : "rgba(255, 255, 255, 0.08)"
            }}
            transition={{ duration: 0.3 }}
            className={`
                group relative overflow-hidden rounded-2xl border
                md:backdrop-blur-md transition-all duration-300
                ${isOpen ? 'bg-black/30 md:bg-[#0A0A0B] shadow-[0_0_40px_-10px_rgba(237,242,70,0.15)]' : 'bg-black/30 md:bg-[#0A0A0B]/60 hover:border-white/20'}
            `}
        >
            <button
                onClick={onClick}
                className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-6 text-left relative z-10"
            >
                <div className="flex gap-6 md:items-center">

                    {/* Question */}
                    <h3 className={`
                        text-xl md:text-2xl font-display font-medium leading-snug transition-colors duration-300
                        ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                    `}>
                        {item.q}
                    </h3>
                </div>

                {/* Animated Icon Box */}
                <div className={`
                    shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300
                    ${isOpen
                        ? 'bg-[#EDF246] border-[#EDF246] text-black rotate-0'
                        : 'bg-black/20 border-white/5 text-white group-hover:bg-white/10'
                    }
                `}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-6 md:px-8 pb-8">
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light border-l-2 border-[#EDF246]/20 pl-6">
                                {item.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Noise Texture (Opcional, para darle textura física) */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        </motion.div>
    );
};

const FAQ = () => {
    const [openId, setOpenId] = useState(null); // Ninguno abierto por defecto

    return (
        <section className="relative py-24 md:py-32" id="faq">

            {/* Spotlights Ambientales */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EDF246]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">

                {/* Header */}
                <div className="mb-10 md:mb-20 md:text-center">
                    <h2 className="font-display text-3xl md:text-6xl text-white mb-6 font-medium">
                        Despejamos <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)', WebkitBackgroundClip: 'text' }}>dudas.</span>
                    </h2>
                    <p className="text-base md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Entendemos que contratar tecnología puede ser complejo. Aquí lo hacemos simple.
                    </p>
                </div>

                {/* Stack de Tarjetas */}
                <div className="flex flex-col gap-4">
                    {faqItems.map((item) => (
                        <FAQCard
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        />
                    ))}
                </div>

                {/* CTA Final */}
                <div className="mt-20 text-center">
                    <p className="text-gray-300 mb-6">¿Tu duda es más específica?</p>
                    <a
                        href="https://wa.me/5491138830925?text=Hola!%20Me%20interesa%20conocer%20sus%20servicios"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#EDF246] text-black font-bold transition-all duration-300 shadow-[0_0_20px_rgba(237,242,70,0.3)] hover:shadow-[0_0_40px_rgba(237,242,70,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Hablar por WhatsApp
                        <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQ;