import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Utensils, HeartPulse, Layers, Sparkles, Home, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Importamos el hook de Lenis para usar el mismo motor de scroll
import { useLenis } from 'lenis/react';

// Asegúrate de que esta ruta sea correcta
import LogoCompleto from '../../assets/logo/logo-completo.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const location = useLocation();
  const lenis = useLenis(); // Instancia del scroll suave

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LÓGICA DE NAVEGACIÓN CORREGIDA ---
  const handleNavigation = (e, targetPath) => {
    setMobileMenuOpen(false); // Siempre cerrar menú móvil

    // Separamos ruta y hash (ej: "/#unified-services" -> ["/", "unified-services"])
    const [pathOnly, hash] = targetPath.split('#');

    // Normalizamos: si target es "" es raíz "/"
    const cleanTarget = pathOnly === '' ? '/' : pathOnly;

    // ¿Estamos ya en la página destino?
    const isSamePage = location.pathname === cleanTarget;

    if (isSamePage) {
      // CASO 1: MISMA PÁGINA -> Hacemos scroll manual y prevenimos recarga
      e.preventDefault();

      if (hash) {
        // Scroll a sección específica usando Lenis
        lenis?.scrollTo(`#${hash}`, { offset: 0, duration: 1.2 });
      } else {
        // Scroll al inicio (Top)
        lenis?.scrollTo(0, { duration: 1.2 });
      }
    }
    // CASO 2: OTRA PÁGINA -> No hacemos NADA.
    // Dejamos que el <Link> navegue normalmente. 
    // El componente SmoothScroll.jsx detectará el cambio de ruta y reseteará el scroll a 0.
  };

  const navLinks = [
    { name: 'Inicio', path: '/', icon: Home, type: 'link' },
    { name: 'Servicios', path: '/#unified-services', icon: Sparkles, type: 'link' },
    {
      name: 'Ecosistema',
      type: 'dropdown',
      icon: Layers,
      items: [
        { name: 'Gastronomía', path: '/resto', icon: Utensils, desc: 'Gestión moderna y eficiente' },
        { name: 'Medicina', path: '/med', icon: HeartPulse, desc: 'Salud digital avanzada' }
      ]
    },
    { name: 'Equipo', path: '/equipo', icon: Users, type: 'link' },
  ];

  return (
    <>
      {/* =======================================
          MOBILE NAVBAR (Visible < md - 768px)
         ======================================= */}
      <motion.div
        className="fixed top-4 left-0 right-0 z-[9999] flex md:hidden justify-between items-center px-4 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LOGO MÓVIL */}
        <Link
          to="/"
          className="pointer-events-auto px-4 py-2 rounded-full bg-black/60 md:bg-[#08080A]/60 md:backdrop-blur-xl border border-white/[0.08] shadow-lg active:scale-95 transition-transform flex items-center cursor-none"
          onClick={(e) => handleNavigation(e, '/')}
        >
          <img src={LogoCompleto} alt="Vantra" className="h-6 w-auto drop-shadow-lg" />
        </Link>

        {/* HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="pointer-events-auto p-2.5 rounded-full bg-black/60 md:bg-[#08080A]/60 md:backdrop-blur-xl border border-white/[0.08] shadow-lg text-white active:scale-95 transition-transform cursor-none"
        >
          <Menu size={20} />
        </button>
      </motion.div>

      {/* =======================================
          MOBILE MENU OVERLAY
         ======================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-[#050508] flex flex-col" // Fondo sólido oscuro para mejor performance móvil
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gradient Ambience */}
            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[40%] bg-[#EDF246]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 pt-6 pb-4">
              <Link to="/" onClick={(e) => handleNavigation(e, '/')}>
                <img src={LogoCompleto} alt="Vantra" className="h-7 w-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform cursor-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    {link.type === 'dropdown' ? (
                      <div className="flex flex-col gap-3 my-2">
                        <div className="text-gray-500 text-[10px] font-bold tracking-widest uppercase pl-1">
                          {link.name}
                        </div>
                        {link.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={(e) => handleNavigation(e, subItem.path)}
                            className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] active:bg-white/[0.08] transition-colors cursor-none"
                          >
                            <div className="p-2.5 rounded-full bg-[#EDF246]/10 text-[#EDF246] group-active:scale-110 transition-transform">
                              <subItem.icon size={18} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-base text-white">{subItem.name}</div>
                              <div className="text-xs text-gray-400">{subItem.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={(e) => handleNavigation(e, link.path)}
                        className="flex items-center justify-between p-3 rounded-xl text-xl font-medium text-white hover:text-[#EDF246] transition-colors cursor-none"
                      >
                        {link.name}
                        <ArrowRight size={18} className="text-white/20 -rotate-45" />
                      </Link>
                    )}
                    {index !== navLinks.length - 1 && link.type !== 'dropdown' && <div className="h-px bg-white/[0.05] my-1" />}
                  </div>
                ))}
              </nav>
            </div>

            {/* FOOTER CTA */}
            <div className="p-6 border-t border-white/[0.05] pb-10">
              <Link
                to="/#contacto"
                onClick={(e) => handleNavigation(e, '/#contacto')}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#EDF246] text-black font-bold text-lg active:scale-[0.98] transition-transform cursor-none"
              >
                Empezar Proyecto
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================
          DESKTOP ISLAND (Visible >= md)
         ======================================= */}
      <motion.div
        className="fixed top-6 left-1/2 hidden md:flex flex-col w-max"
        style={{ zIndex: 9999, transform: 'translateX(-50%)' }}
        onMouseLeave={() => {
          setHoveredTab(null);
          setHoveredSubItem(null);
        }}
      >
        <div
          className={`
              relative flex flex-col
              rounded-xl
              transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
              will-change-transform transform-gpu border
              ${scrolled
              ? 'bg-[#08080A]/85 backdrop-blur-md border-white/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.05]'
              : 'bg-transparent border-transparent shadow-none backdrop-blur-none ring-0'
            }
          `}
          style={{ borderRadius: 12 }}
        >

          <div className="relative z-10">

            {/* --- CONTROL ROW (HEADER) --- */}
            {/* RESPONSIVE PADDING: px-3 en md, px-6 en lg */}
            <div className="flex items-center md:gap-4 lg:gap-6 md:px-4 lg:px-6 py-2.5">

              {/* 1. LOGO */}
              <Link to="/" className="shrink-0 block cursor-none" onClick={(e) => handleNavigation(e, '/')}>
                <motion.img
                  src={LogoCompleto}
                  alt="Vantra"
                  // RESPONSIVE SIZE: h-7 en md, h-9 en lg
                  className="md:h-7 lg:h-9 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </Link>

              {/* SEPARATOR */}
              <div className="w-px h-6 bg-white/[0.08]" />

              {/* 2. NAVEGACIÓN */}
              <nav className="flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isDropdown = link.type === 'dropdown';
                  const isActive = location.pathname === link.path && link.name !== 'Inicio';
                  const isHovered = hoveredTab === link.name;
                  const isEcosistemaTrigger = hoveredTab === 'Ecosistema' && link.name === 'Ecosistema';

                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setHoveredTab(link.name)}
                    >
                      {/* WRAPPER DEL LINK/BUTTON */}
                      {isDropdown ? (
                        <button className="relative px-3 lg:px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-none outline-none group">
                          <span className={`${(isHovered || isEcosistemaTrigger) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {link.name}
                          </span>
                          <ChevronDown
                            size={12}
                            className={`text-gray-400 group-hover:text-white transition-transform duration-300 lg:w-3.5 lg:h-3.5 ${isHovered || isEcosistemaTrigger ? 'rotate-180' : ''}`}
                          />

                          {/* Hover Background */}
                          {(isHovered || isEcosistemaTrigger) && (
                            <motion.div
                              layoutId="nav-bg"
                              className="absolute inset-0 bg-white/[0.08] rounded-xl -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={(e) => handleNavigation(e, link.path)}
                          className={`
                            relative px-3 lg:px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-none
                            ${(isHovered || isActive) ? 'text-white' : 'text-gray-400 hover:text-white'}
                          `}
                        >
                          {link.name}

                          {/* Hover/Active Background Logic - INSIDE LINK NOW */}
                          {(isHovered) && !isActive && (
                            <motion.div
                              layoutId="nav-bg"
                              className="absolute inset-0 bg-white/[0.08] rounded-xl -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          {isActive && (
                            <motion.div
                              layoutId="nav-active"
                              className="absolute inset-0 bg-white/[0.06] border border-white/[0.05] rounded-xl -z-10"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* SEPARATOR */}
              <div className="w-px h-6 bg-white/[0.08]" />

              {/* 3. CTA BUTTON - RESPONSIVE */}
              <Link to="/#contacto" onClick={(e) => handleNavigation(e, '/#contacto')} className="cursor-none">
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#F5F876", boxShadow: "0 0 25px rgba(237, 242, 70, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="
                    flex items-center justify-center gap-2 
                    md:w-9 md:h-9 lg:w-auto lg:h-auto
                    md:p-0 lg:px-6 md:py-2.5 lg:py-3 rounded-xl 
                    bg-[#EDF246] text-black 
                    font-bold md:text-xs lg:text-sm tracking-wide
                    cursor-none
                  "
                >
                  {/* TEXTO OCULTO EN TABLET, VISIBLE EN DESKTOP */}
                  <span className="hidden lg:inline">Empezar</span>
                  <ArrowRight size={16} className="text-black/70" />
                </motion.div>
              </Link>

            </div>

            {/* --- EXPANSION ROW (DRAWER) --- */}
            <AnimatePresence>
              {hoveredTab === 'Ecosistema' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    borderRadius: scrolled ? "0px 0px 16px 16px" : "16px"
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`
                    w-full bg-black/20 overflow-hidden transition-colors duration-300
                    ${scrolled ? 'border-t border-white/[0.05]' : 'border border-white/10'}
                  `}
                >
                  <div
                    className="flex flex-col md:flex-row items-stretch justify-center gap-2 p-2 lg:p-3"
                    onMouseLeave={() => setHoveredSubItem(null)}
                  >
                    {navLinks.find(l => l.name === 'Ecosistema')?.items.map((item) => {
                      const isHovered = hoveredSubItem === item.name;

                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onMouseEnter={() => setHoveredSubItem(item.name)}
                          onClick={(e) => handleNavigation(e, item.path)}
                          className="relative flex-1 flex items-center gap-3 p-3 lg:p-4 rounded-xl transition-colors md:min-w-[200px] lg:min-w-[240px] group/item"
                        >
                          {/* Hover Background */}
                          {isHovered && (
                            <motion.div
                              layoutId="submenu-hover-bg"
                              className="absolute inset-0 bg-white/[0.05] rounded-xl -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}

                          {/* Icon Circle */}
                          <div className={`
                                p-2.5 rounded-full border transition-all duration-300
                                ${isHovered ? 'bg-[#EDF246] border-[#EDF246] text-black scale-110 shadow-[0_0_15px_rgba(237,242,70,0.3)]' : 'bg-white/5 border-white/10 text-white'}
                              `}>
                            <item.icon size={18} />
                          </div>

                          <div>
                            <div className={`font-bold text-xs lg:text-sm transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                              {item.name}
                            </div>
                            <div className="text-[10px] lg:text-xs text-gray-400 mt-0.5 whitespace-nowrap">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;