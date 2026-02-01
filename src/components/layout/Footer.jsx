import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import LogoSimple from '../../assets/logo/logo-simple.svg';
import LogoFull from '../../assets/logo/logo-completo.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const lenis = useLenis();
    const location = useLocation();

    const handleNavigation = (e, targetPath) => {
        const [pathOnly, hash] = targetPath.split('#');
        const cleanTarget = pathOnly === '' ? '/' : pathOnly;
        const isSamePage = location.pathname === cleanTarget;

        if (isSamePage) {
            e.preventDefault();
            if (hash) {
                lenis?.scrollTo(`#${hash}`, { offset: 0, duration: 1.2 });
            } else {
                lenis?.scrollTo(0, { duration: 1.2 });
            }
        }
    };

    return (
        <footer className="relative pt-32 pb-12 -mt-12 z-20">

            {/* --- SHEET CONTAINER (Glass Effect) --- */}
            <div className="absolute inset-0 bg-[#08080A] md:bg-[#08080A]/80 md:backdrop-blur-2xl border-t border-white/5 rounded-t-[30px] md:rounded-t-[80px] overflow-hidden shadow-2xl">

                {/* 1. Background Logo Texture */}
                {/* 1. Background Logo Texture (Desktop Only) */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none opacity-[0.03]">
                    <img src={LogoFull} alt="" className="w-[80%] max-w-4xl grayscale brightness-150" />
                </div>

                {/* 2. Ambient Glows */}
                <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-vantra-neon/5 rounded-full blur-[80px] md:blur-[150px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-vantra-ice/5 rounded-full blur-[80px] md:blur-[150px] translate-y-1/3 -translate-x-1/4" />

                {/* 3. Noise Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* --- TOP SECTION: BRAND & CTA --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">

                    {/* Left: Brand Voice */}
                    <div className="flex flex-col justify-between space-y-12">
                        <div>
                            <img src={LogoSimple} alt="Vantra" className="w-12 h-12 invert brightness-0 opacity-80 mb-8" />
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-[1.1] tracking-tight">
                                Construimos el <br />
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)', WebkitBackgroundClip: 'text' }}>futuro digital</span>
                                <br /> de tu negocio.
                            </h2>
                        </div>

                        <div className="flex gap-4">
                            <SocialIcon icon={Instagram} href="https://instagram.com/vantradigital" />
                            <SocialIcon icon={Linkedin} href="https://linkedin.com/company/vantradigital" />
                            <SocialIcon icon={Mail} href="mailto:vantradigital@gmail.com" />
                        </div>
                    </div>

                    {/* Right: Navigation & Action */}
                    <div className="flex flex-col gap-8 lg:pl-12 lg:border-none">

                        {/* Navigation Links Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white text-sm uppercase tracking-widest font-normal border-b border-white/10 pb-3 mb-2">Explorar</h4>
                                <NavLink to="/">Inicio</NavLink>
                                <Link
                                    to="/#unified-services"
                                    onClick={(e) => handleNavigation(e, '/#unified-services')}
                                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 w-fit text-left"
                                >
                                    <span className="text-lg font-light">Servicios</span>
                                </Link>
                                <NavLink to="/equipo">Equipo</NavLink>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white text-sm uppercase tracking-widest font-normal border-b border-white/10 pb-3 mb-2">Vantra</h4>
                                <NavLink to="/resto">Gastronomía</NavLink>
                                <NavLink to="/med">Medicina</NavLink>

                            </div>
                        </div>

                        {/* Direct Contact Card */}
                        <Link
                            to="/#contacto"
                            onClick={(e) => handleNavigation(e, '/#contacto')}
                            className="mt-auto p-8 rounded-2xl bg-black/30 md:bg-white/[0.02] border border-white/5 md:backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer block"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white/60 text-sm font-light">¿Tenés un proyecto?</span>
                                <ArrowUpRight className="text-vantra-neon group-hover:rotate-45 transition-transform duration-500" size={20} />
                            </div>
                            <p className="text-2xl text-white font-medium group-hover:text-vantra-neon transition-colors duration-300">Escríbenos</p>
                        </Link>

                    </div>
                </div>

                {/* --- DIVIDER --- */}
                <div className="w-full h-px bg-white/10 mb-8" />

                {/* --- BOTTOM SECTION: COPYRIGHT & LEGAL --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30 font-light">
                    <p>© {currentYear} Vantra Inc. All rights reserved.</p>

                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-vantra-neon/50" />
                        <span>Buenos Aires • Global</span>
                    </div>
                </div>

            </div>
        </footer >
    );
};

// --- HELPER COMPONENTS ---

const NavLink = ({ to, children }) => (
    <Link to={to} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 w-fit">
        <span className="text-lg font-light">{children}</span>
        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-vantra-neon" />
    </Link>
);

const SocialIcon = ({ icon: Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-black hover:bg-vantra-neon hover:border-vantra-neon transition-all duration-300"
    >
        <Icon size={20} />
    </a>
);

export default Footer;