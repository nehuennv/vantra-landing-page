import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';

import serafinImg from '../assets/team/Serafin Bastianelli - CEO & Founder.webp';
import pedroImg from '../assets/team/Pedro Reverendo - CTO & Ai Developer.webp';
import nehuenImg from '../assets/team/Nehuen Villavicencio - FrontEnd Developer.webp';
import noNameImg from '../assets/team/No Name Report - CMO & Video Editor.webp';
import martinaImg from '../assets/team/Martina Pasucci - Community Manager.webp';
import morenaImg from '../assets/team/Morena Sanchez - Community Manager.webp';
import tomasImg from '../assets/team/Tomás Actis - Graphic Designer.webp';

// --- DATA (9 Personas) ---
const TEAM = [
    {
        id: 1,
        name: 'Serafin Bastianelli',
        role: 'Founder & Paid Media Specialist',
        image: serafinImg,
        linkedin: 'https://www.linkedin.com/in/serafinbastianelli/'
    },
    {
        id: 2,
        name: 'Pedro Reverendo',
        role: 'CTO & Backend Developer',
        image: pedroImg,
        linkedin: 'https://www.linkedin.com/in/pedroreverendo/'
    },
    {
        id: 3,
        name: 'Nehuen Villavicencio',
        role: 'Frontend Developer',
        image: nehuenImg,
        linkedin: 'https://www.linkedin.com/in/nehuennv/'
    },
    {
        id: 5,
        name: 'Martina Pasucci',
        role: 'Community Manager',
        image: martinaImg
    },
    {
        id: 6,
        name: 'Morena Sanchez',
        role: 'Community Manager',
        image: morenaImg
    },
    {
        id: 7,
        name: 'Tomas Actis',
        role: 'Graphic Designer',
        image: tomasImg
    },
    {
        id: 4,
        name: 'No Name Report',
        role: 'CMO & Video Editor',
        image: noNameImg
    },

];

// --- CASCADA DE ENTRADA ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

import SEO from '../components/layout/SEO';

const Team = () => {
    return (
        <div className="w-full min-h-screen pt-32 relative bg-transparent">
            <SEO
                title="Equipo"
                description="¿Quiénes construyen el futuro? Conoce a las mentes inquietas detrás de Vantra. Fusión de diseño, código e innovación digital."
                keywords="Equipo Vantra, Desarrolladores Creativos, Agencia Digital, Cultura Tech, Diseño y Código"
                url="https://vantradigital.com/equipo"
            />


            {/* TEXTURA DE FONDO (Para que no se sienta vacío) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />

            <div className="container mx-auto px-6 max-w-6xl relative z-10 pb-40">

                {/* --- HEADER SIMPLE --- */}
                <div className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-display font-medium text-3xl md:text-6xl text-white mb-4"
                    >
                        El Equipo
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="h-1 w-20 bg-[#EDF246] mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-base md:text-xl font-light max-w-2xl"
                    >
                        Los que estamos detrás de la pantalla haciendo que Vantra funcione. Gente real haciendo software real.
                    </motion.p>
                </div>

                {/* --- GRID 3x3 --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    {TEAM.map((member) => (
                        <div key={member.id} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-sm">
                            <MemberCard member={member} />
                        </div>
                    ))}
                </motion.div>

            </div>

        </div >
    );
};

// --- SCRAMBLE TEXT EFFECT FOR MYSTERY CARD ---
const ScrambleText = ({ text, active }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const [display, setDisplay] = React.useState(text);

    React.useEffect(() => {
        if (!active) {
            setDisplay("ACCESS DENIED"); // Default state
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [active, text]);

    return <span className="font-mono">{display}</span>;
};

// --- LA CARD (DISEÑO REVERSIONADO) ---
const MemberCard = ({ member }) => {
    const isCMO = member.role.includes('CMO'); // Detectamos al CMO Misterioso
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef(null);

    // Detección de Mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Detectar si está en el centro del viewport (Solo para mobile)
    const isInView = useInView(ref, {
        margin: "-50% 0px -50% 0px", // Activa cuando el elemento está en el centro vertical
        amount: "some"
    });

    // Lógica principal: Activo si es mobile y está en vista, o si es desktop y tiene hover
    const isActive = isMobile ? isInView : isHovered;

    // --- DISEÑO 'TOP SECRET' PARA EL CMO ---
    if (isCMO) {
        return (
            <motion.div
                ref={ref}
                variants={cardVariants}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`group relative w-full aspect-square bg-black rounded-xl overflow-hidden interactive border transition-colors duration-300 ${isActive ? 'border-[#EDF246]' : 'border-[#EDF246]/30'}`}
            >
                {/* BACKGROUND GRID ANIMATION */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#EDF246 1px, transparent 1px), linear-gradient(90deg, #EDF246 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.5s ease'
                    }}
                />

                {/* IMAGEN (Solo visible en hover/active con efecto) */}
                <div className="absolute inset-0 bg-black transition-opacity duration-300">
                    <img
                        src={member.image}
                        alt="Restricted"
                        className={`w-full h-full object-cover grayscale contrast-150 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-40' : 'opacity-0'}`}
                    />
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* CENTER ICON (LOCK) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <motion.div
                        animate={{
                            scale: isActive ? 1.5 : 1,
                            opacity: isActive ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#EDF246] text-black p-4 rounded-full"
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </motion.div>
                </div>

                {/* INFO CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <div className="space-y-2">
                        {/* ROLE LABEL */}
                        <div className="inline-block bg-[#EDF246] px-2 py-0.5 transform -skew-x-12">
                            <p className="text-xs font-bold text-black font-mono tracking-tighter transform skew-x-12">
                                {member.role}
                            </p>
                        </div>

                        {/* NAME SCRAMBLER */}
                        <h3 className="text-2xl font-bold text-[#EDF246] font-mono tracking-tighter truncate">
                            <ScrambleText text="NO NAME REPORT" active={isActive} />
                        </h3>

                        {/* STATUS INDICATOR */}
                        <div className="flex items-center gap-2 pt-2">
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-xs text-white/60 font-mono">
                                {isActive ? "IDENTITY MATCH FOUND" : "AUTHENTICATION REQUIRED"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CORNER DECORATIONS */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-[#EDF246]" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-[#EDF246]" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-[#EDF246]" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-[#EDF246]" />

            </motion.div>
        );
    }

    // --- STANDARD CARD (Otras personas) ---
    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`group relative w-full aspect-square bg-[#050505] rounded-xl overflow-hidden interactive border transition-colors duration-300 ${isActive ? 'border-[#EDF246]/50' : 'border-white/10'}`}
        >
            {/* IMAGEN */}
            <div className="absolute inset-0 bg-black">
                <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isActive ? 'grayscale-0 scale-105' : 'grayscale'}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-80'}`} />
            </div>

            {/* INFO */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-30">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-[#EDF246] mb-2 font-medium">
                            {member.role}
                        </p>
                        <h3 className={`text-2xl font-display transition-colors ${isActive ? 'text-[#EDF246]' : 'text-white'}`}>
                            {member.name}
                        </h3>
                    </div>

                    {member.linkedin ? (
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg bg-white/10 text-white transition-all duration-300 ${isActive ? 'bg-[#EDF246] text-black' : 'hover:bg-[#EDF246] hover:text-black'}`}
                        >
                            <Linkedin size={20} />
                        </a>
                    ) : (
                        // Fallback para tarjetas normales sin linkedin
                        <div className="w-9 h-9" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Team;