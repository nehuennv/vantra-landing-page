import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Megaphone, Bot, Compass, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const services = [
    {
        id: "dev",
        title: "Desarrollo Web",
        subtitle: "Conversión",
        desc: "Landing pages y e-commerce en Shopify full custom con Liquid. Diseñados para vender y escalar.",
        icon: Globe,
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", // Placeholder tech
        color: "bg-blue-500"
    },
    {
        id: "ads",
        title: "Publicidad Digital",
        subtitle: "Decisiones",
        desc: "Meta, Google y TikTok Ads con psicología de venta. No buscamos clics, buscamos decisiones.",
        icon: Megaphone,
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "bg-purple-500"
    },
    {
        id: "ai",
        title: "Automatización + IA",
        subtitle: "Agilidad",
        desc: "Procesos que se gestionan solos. IA conversacional y datos en tiempo real.",
        icon: Bot,
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        color: "bg-vantra-neon"
    },
    {
        id: "strat",
        title: "Estrategia Integral",
        subtitle: "Crecimiento",
        desc: "Desde el análisis competitivo hasta tu equipo de ventas. Trazamos el camino juntos.",
        icon: Compass,
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        color: "bg-orange-500"
    },
];

const ServicesDisruptive = () => {
    const [active, setActive] = useState(services[0].id);

    return (
        <section className="py-24 bg-vantra-bg overflow-hidden">
            <div className="container mx-auto px-4 h-[600px] flex flex-col md:flex-row gap-4">

                {/* Encabezado Mobile (Solo visible en pantallas chicas) */}
                <div className="md:hidden mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Nuestros Servicios</h2>
                    <p className="text-gray-400">Toca para explorar.</p>
                </div>

                {services.map((service) => {
                    const isActive = active === service.id;

                    return (
                        <motion.div
                            key={service.id}
                            layout
                            onClick={() => setActive(service.id)}
                            onMouseEnter={() => setActive(service.id)}
                            className={cn(
                                "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-white/10",
                                isActive ? "md:flex-[3] flex-[5]" : "md:flex-[1] flex-[1] hover:flex-[1.5]"
                            )}
                        >
                            {/* IMAGEN DE FONDO (Oscurecida) */}
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                                style={{ backgroundImage: `url(${service.img})` }}
                            />
                            <div className={cn(
                                "absolute inset-0 transition-opacity duration-300",
                                isActive ? "bg-black/40" : "bg-black/70 hover:bg-black/60"
                            )} />

                            {/* CONTENIDO */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">

                                {/* Top: Icono y Subtitulo */}
                                <div className="flex items-start justify-between">
                                    <div className={cn(
                                        "p-3 rounded-xl backdrop-blur-md border border-white/20 text-white transition-colors duration-300",
                                        isActive ? "bg-vantra-neon text-black" : "bg-white/10"
                                    )}>
                                        <service.icon size={24} />
                                    </div>

                                    {/* Flecha solo visible cuando activo */}
                                    <ArrowUpRight
                                        className={cn(
                                            "text-white transition-all duration-300",
                                            isActive ? "opacity-100 rotate-45" : "opacity-0"
                                        )}
                                    />
                                </div>

                                {/* Bottom: Texto */}
                                <div>
                                    <motion.span
                                        layout="position"
                                        className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-xs text-white mb-2 uppercase tracking-widest"
                                    >
                                        {service.subtitle}
                                    </motion.span>

                                    <motion.h3
                                        layout="position"
                                        className={cn(
                                            "font-bold text-white leading-tight mb-2 origin-left",
                                            isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl rotate-0 md:-rotate-90 md:translate-y-24 md:whitespace-nowrap"
                                        )}
                                    >
                                        {service.title}
                                    </motion.h3>

                                    {/* Descripción solo visible si está activo */}
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-200 text-lg max-w-lg leading-relaxed pt-4 border-t border-white/20 mt-4">
                                            {service.desc}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section >
    );
};

export default ServicesDisruptive;