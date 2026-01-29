import React from 'react';
import { Zap, TrendingUp, Users, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card'; // Reutilizamos tu componente Premium
import { cn } from '../../lib/utils';

const pillars = [

    {
        icon: TrendingUp,
        title: "ROI Obsesivo",
        desc: "No vendemos humo. Construimos dashboards que te muestran exactamente cuánto dinero te está ahorrando el software."
    },
    {
        icon: Users,
        title: "Tu Brazo Tecnológico",
        desc: "Dejamos de ser 'proveedores' para ser socios. Nos integramos en tu Slack, en tus dailies y en tu visión."
    },
    {
        icon: HeartHandshake,
        title: "Escalabilidad Infinita",
        desc: "Código limpio y modular. Cuando tu negocio crezca x10, nuestro software no va a necesitar ser reescrito."
    },
    {
        icon: Zap,
        title: "Velocidad Extrema",
        title: "Velocidad Extrema",
        desc: "Sistemas optimizados para cargar en milisegundos. Porque cada segundo de espera es un cliente perdido."
    }
];

const Differential = () => {
    return (
        <section className="relative py-12">
            {/* Background Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EDF246]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="mb-24 md:text-center max-w-4xl mx-auto">


                    <h2 className="font-display text-5xl md:text-7xl text-white mb-8 leading-[0.9] tracking-tight">
                        No somos una agencia. <br />
                        <span className="inline-block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 40%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Somos ingeniería pura.</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto leading-relaxed">
                        El código es un commodity. La estrategia detrás del código es lo que te hace ganar mercado.
                    </p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {pillars.map((pillar, index) => (
                        <Card
                            key={index}
                            className="p-8 group h-full flex flex-col justify-between hover:border-[#EDF246]/30 transition-colors duration-500"
                            hover={true}
                        >
                            <div>
                                {/* Icon Container with Neon Glow on Hover */}
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#EDF246] group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_0_0_rgba(237,242,70,0)] group-hover:shadow-[0_0_20px_0_rgba(237,242,70,0.4)]">
                                    <pillar.icon size={32} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-display text-2xl text-white mb-4 group-hover:text-[#EDF246] transition-colors">
                                    {pillar.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                                    {pillar.desc}
                                </p>
                            </div>


                        </Card>
                    ))}
                </div>

                {/* Bottom CTA Disruptivo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >

                </motion.div>

            </div>
        </section>
    );
};

export default Differential;