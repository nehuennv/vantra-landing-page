import React from 'react';
import { ArrowUpRight, Code2, Cpu, Globe, LineChart } from 'lucide-react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Desarrollo Web",
    intro: "Conversión",
    description: "Landing pages y e-commerce en Shopify full custom con Liquid, diseñados para vender, transmitir confianza y escalar.",
    checklist: ["Shopify custom con Liquid", "Landing pages que convierten", "E-commerce optimizado", "Integración completa"],
    icon: Code2
  },
  {
    id: "02",
    title: "Publicidad Digital",
    intro: "Decisiones",
    description: "Meta, Google y TikTok Ads con estrategia + psicología de venta: no buscamos clics, buscamos decisiones.",
    checklist: ["Meta Ads estratégico", "Google Ads optimizado", "TikTok Ads creativo", "Psicología de venta"],
    icon: Globe
  },
  {
    id: "03",
    title: "Automatización + IA",
    intro: "Agilidad",
    description: "Procesos que se gestionan solos, respuestas inteligentes y datos en tiempo real para que tu negocio sea más ágil.",
    checklist: ["Procesos automatizados", "IA conversacional", "Datos en tiempo real", "Optimización continua"],
    icon: Cpu
  },
  {
    id: "04",
    title: "Estrategia Integral",
    intro: "Crecimiento",
    description: "Desde la competencia hasta tu equipo de ventas: trazamos el camino y lo recorremos juntos.",
    checklist: ["Análisis competitivo", "Estrategia de ventas", "Roadmap completo", "Acompañamiento total"],
    icon: LineChart
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50
    }
  }
};

const Services = () => {
  return (
    <section className="relative py-24" id="servicios">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12 mb-20 relative z-10"
      >
        <div className="relative max-w-5xl">
          {/* Decorative Glow */}
          <div className="absolute -left-20 -top-20 w-[600px] h-[400px] bg-[#EDF246]/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Visual Anchor Line */}
          <div className="relative border-l border-white/10 pl-8 md:pl-12">
            <div className="absolute left-[-1px] top-0 h-24 w-[2px] bg-[#EDF246]" />

            <h2 className="text-[#EDF246] text-sm tracking-[0.3em] uppercase mb-8 font-bold">
              QUE HACEMOS
            </h2>

            <h3 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8">
              No ofrecemos servicios <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #ffffff', color: 'rgba(255,255,255,0.05)' }}>
                aislados.
              </span>
            </h3>

            <p className="text-gray-400 max-w-3xl text-lg md:text-xl leading-relaxed">
              Construimos sistemas completos que hacen crecer tu negocio.
            </p>
          </div>
        </div>
      </motion.div>

      {/* BENTO GRID */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            // Logic for Bento Spans: 0 & 3 -> Span 7, 1 & 2 -> Span 5
            const isWide = index === 0 || index === 3;
            const colSpan = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`${colSpan} h-full`}
              >
                <Card className="relative h-full p-8 md:p-10 flex flex-col overflow-hidden group bg-[#08080A]/60 hover:bg-[#08080A]/90 transition-colors duration-500 border-white/5 hover:border-[#EDF246]/50">

                  {/* BACKGROUND WATERMARK ICON */}
                  <div className="absolute -right-8 -bottom-8 text-white opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none transform rotate-[-10deg] scale-150 group-hover:scale-[1.6] group-hover:rotate-0 ease-out">
                    <service.icon size={300} strokeWidth={1.5} />
                  </div>

                  {/* Top Row: Intro Tag & Icon */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="p-3 rounded-xl bg-white/5 text-[#EDF246] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={24} />
                    </div>

                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#EDF246]/10 text-[#EDF246] border border-[#EDF246]/20 group-hover:bg-[#EDF246] group-hover:text-black transition-colors duration-300">
                      {service.intro}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 mb-8">
                    <h4 className="font-display text-3xl md:text-4xl text-white mb-4 group-hover:text-[#EDF246] transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>

                  {/* Spec Tags (Pills) */}
                  <div className="relative z-10 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {service.checklist.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-gray-400 group-hover:bg-white/[0.08] group-hover:text-gray-200 transition-colors duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </section >
  );
};

export default Services;