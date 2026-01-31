import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  Globe,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';

// --- COMPONENTE: STATUS BAR ITEM (Limpio y Premium) ---
const StatusBarItem = ({ icon: Icon, value, label, color, active, className = "", hideIconOnMobile = false }) => {
  return (
    <div className={`relative flex items-center gap-5 px-6 py-4 md:px-8 md:py-5 group/item ${className}`}>
      {/* Icono minimalista - Se activa con Neon */}
      <div className={`transition-colors duration-500 ease-out ${active ? 'text-[#EDF246]' : 'text-gray-400 group-hover/item:text-[#EDF246]'} ${hideIconOnMobile ? 'hidden md:block' : ''}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col">
        {/* Value (Numero) - SIEMPRE BLANCO */}
        <div className="text-2xl font-display font-bold leading-none mb-1 text-white">
          {value}
        </div>

        {/* Label (Texto) - Se activa con Neon */}
        <div className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ease-out ${active ? 'text-[#EDF246]' : 'text-gray-500 group-hover/item:text-[#EDF246]'}`}>
          {label}
        </div>
      </div>

      {/* Separador Vertical Sutil (SOLO DESKTOP) */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10 group-last:hidden" />

      {/* Brillo de fondo muy sutil */}
      <div className={`absolute inset-0 bg-white/[0.02] transition-opacity duration-500 ease-out ${active ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`} />
    </div>
  );
};

// --- HERO PRINCIPAL ---

const Hero = () => {
  const containerRef = useRef(null);
  const [isMultiplicaActive, setIsMultiplicaActive] = useState(false);

  // Spotlight y background removidos para usar los globales (App.jsx)
  // Variants para entrada escalonada premium
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] md:h-[100dvh] md:min-h-[700px] flex flex-col justify-between md:justify-center md:overflow-hidden bg-transparent group"
    >
      {/* --- LAYER 0 y 1 REMOVIDOS para consistencia global --- */}

      {/* --- CONTENIDO --- */}
      <motion.div
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center pt-32 md:pt-0 md:h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* 2. TÍTULO PRINCIPAL (Multiplica Italic + Cursor Inclinado) */}
        <motion.div
          className="max-w-6xl text-center relative mb-10"
          variants={itemVariants}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
            <span className="block text-white font-medium">Tecnología que</span>

            {/* Bloque interactivo completo */}
            <div
              className="relative inline-flex items-center justify-center my-1 cursor-pointer"
              onMouseEnter={() => setIsMultiplicaActive(true)}
              onMouseLeave={() => setIsMultiplicaActive(false)}
            >

              {/* Corchete Izquierdo */}
              <motion.span
                className={`text-[#EDF246] text-4xl md:text-7xl font-light absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-2 transition-all duration-300 ${isMultiplicaActive ? 'opacity-100 -translate-x-4 -rotate-12 scale-110' : 'opacity-30'}`}
              >
                {`{`}
              </motion.span>

              {/* TEXTO ITALIC */}
              <span className={`relative z-10 font-bold lowercase italic text-transparent bg-clip-text bg-gradient-to-b from-white via-[#EDF246] to-[#EDF246] pr-2 md:pr-8 transition-all duration-300 ${isMultiplicaActive ? 'brightness-125 drop-shadow-[0_0_15px_rgba(237,242,70,0.5)]' : ''}`}>
                multiplica
              </span>

              {/* CURSOR INCLINADO (Italic Cursor) */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
                className="absolute right-0 top-2 md:top-6 h-10 md:h-20 w-[2px] md:w-[3px] bg-white -skew-x-12 origin-bottom"
              />

              {/* Corchete Derecho */}
              <motion.span
                className={`text-[#EDF246] text-4xl md:text-7xl font-light absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-auto md:bottom-2 transition-all duration-300 ${isMultiplicaActive ? 'opacity-100 translate-x-4 rotate-12 scale-110' : 'opacity-30'}`}
              >
                {`}`}
              </motion.span>
            </div>

            <span className="block text-white font-medium">tu crecimiento.</span>
          </h1>
        </motion.div>

        {/* 3. DESCRIPCIÓN & CTA */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 font-normal max-w-2xl text-center leading-relaxed mb-12"
        >
          Unimos <span className="text-white font-medium">desarrollo web</span>, <span className="text-white font-medium">automatización con IA</span> y <span className="text-white font-medium">estrategia digital</span> en un ecosistema integrado.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 mb-12 md:mb-24 w-full max-w-[340px] sm:w-auto sm:max-w-none"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contacto');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => setIsMultiplicaActive(true)}
            onMouseLeave={() => setIsMultiplicaActive(false)}
            className="group relative px-9 py-4 bg-[#EDF246] text-[#050507] font-bold text-sm uppercase tracking-widest rounded-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(237,242,70,0.3)] cursor-pointer w-full sm:w-auto"
          >
            <div className="relative z-10 flex items-center gap-3 justify-center">
              Configurar mi proyecto <ArrowRight size={18} />
            </div>
            {/* Brillo blanco al pasar */}
            <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('unified-services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-9 py-4 rounded-lg border border-white/10 bg-black/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center md:backdrop-blur-md shadow-[0_0_0_transparent] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer w-full sm:w-auto"
          >
            Conocer servicios
          </button>
        </motion.div>

      </motion.div>

      {/* --- 4. STATUS BAR (Datos Reales) --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 30 }}
        className="relative mt-auto pb-12 md:absolute md:bottom-12 md:pb-0 md:mt-0 left-0 w-full flex justify-center px-6 z-20"
      >
        {/* CONTAINER OPTIMIZATION: 2/1 Grid on mobile, Separate Cards on Desktop */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] md:flex md:flex-row md:items-center md:justify-center md:gap-5 md:w-auto md:max-w-none md:bg-transparent md:border-0 md:shadow-none">

          {/* ITEM 1: TRANSPARENCIA (Vertical Mobile / Horizontal Desktop) */}
          <StatusBarItem
            icon={ShieldCheck}
            value="100%"
            label="Transparencia"
            color="text-[#EDF246]"
            active={isMultiplicaActive}
            className="col-span-1 bg-black/30 md:bg-white/[0.03] md:backdrop-blur-md border border-white/10 rounded-xl w-full flex-col justify-center text-center p-3 md:border md:border-white/10 md:rounded-2xl md:w-auto md:flex-row md:text-left md:px-8 md:py-5 md:shadow-lg"
            hideIconOnMobile={true}
          />

          {/* ITEM 2: ALIANZAS (Vertical Mobile / Horizontal Desktop) */}
          <StatusBarItem
            icon={Globe}
            value="15+"
            label="Alianzas"
            color="text-[#EDF246]"
            active={isMultiplicaActive}
            className="col-span-1 bg-black/30 md:bg-white/[0.03] md:backdrop-blur-md border border-white/10 rounded-xl w-full flex-col justify-center text-center p-3 md:border md:border-white/10 md:rounded-2xl md:w-auto md:flex-row md:text-left md:px-8 md:py-5 md:shadow-lg"
            hideIconOnMobile={true}
          />

          {/* ITEM 3: ROAS (HORIZONTAL Mobile / Horizontal Desktop) */}
          <StatusBarItem
            icon={Zap}
            value="8x"
            label="ROAS Promedio"
            color="text-[#EDF246]"
            active={isMultiplicaActive}
            className="col-span-2 md:col-span-1 bg-black/30 md:bg-white/[0.03] md:backdrop-blur-md border border-white/10 rounded-xl w-full flex-row items-center justify-center px-6 py-4 md:border md:border-white/10 md:rounded-2xl md:w-auto md:flex-row md:justify-start md:text-left md:px-8 md:py-5 md:shadow-lg gap-4"
          />

        </div>
      </motion.div>

    </section>
  );
};

export default Hero;