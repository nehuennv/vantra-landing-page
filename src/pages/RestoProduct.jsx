import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowLeft, Flame, Zap, Activity, Cpu, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO'; // <--- IMPORTACIÓN AGREGADA

// --- PALETA INDUSTRIAL ---
const THEME = {
    orange: "#FD6A10",
    deepOrange: "#b33600",
    void: "#030303",
    metal: "#141415",
    rim: "#222224"
};

// ==========================================
// 1. MOTOR DE PARTÍCULAS (MAXIMIZADO)
// ==========================================
const InfernoParticles = ({ density = 100 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Protección por si se desmonta

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const isMobile = window.innerWidth < 768;
        // OPTIMIZACIÓN: Reducimos densidad en móviles para evitar bloqueo
        const count = isMobile ? density / 2 : density;
        const particles = [];

        const resize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        class Ember {
            constructor() { this.reset(true); }

            reset(initial = false) {
                this.x = Math.random() * canvas.width;
                this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = -(Math.random() * 4 + 2); // Suben rápido
                this.size = Math.random() * 3 + 0.5;
                this.life = Math.random() * 80 + 20;
                this.alpha = Math.random() * 0.8 + 0.2;
                this.color = Math.random() > 0.9 ? '#fff' : THEME.orange;
            }

            update() {
                this.x += this.vx + Math.sin(this.y * 0.01) * 0.5; // Movimiento ondulado
                this.y += this.vy;
                this.life--;
                this.alpha -= 0.01;
                if (this.life <= 0 || this.alpha <= 0) this.reset();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.shadowBlur = 15; // Mucho glow
                ctx.shadowColor = THEME.orange;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < count; i++) particles.push(new Ember());

        const render = () => {
            if (!canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Efecto de rastro para velocidad
            particles.forEach(p => { p.update(); p.draw(); });
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density]);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 mix-blend-screen" />;
};

// ==========================================
// 2. FILTROS SVG (DISTORSIÓN AGRESIVA)
// ==========================================
const ExtremeFilters = () => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
            <filter id="magma-flow">
                {/* OPTIMIZACIÓN: Bajamos numOctaves de 5 a 3 (visualmente igual, mucho más rápido) */}
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise">
                    <animate attributeName="baseFrequency" dur="20s" values="0.01;0.015;0.01" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
                <feGaussianBlur stdDeviation="1" /> {/* Suaviza el magma */}
            </filter>
            <filter id="heat-shimmer">
                <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" result="turbulence">
                    <animate attributeName="baseFrequency" dur="2s" values="0.02 0.05;0.02 0.08;0.02 0.05" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="4" />
            </filter>
        </defs>
    </svg>
);

// ==========================================
// 3. UI HUD TÉCNICO (ELEMENTOS FLOTANTES)
// ==========================================
const TechHUD = () => (
    <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Grid Polar */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-[15%] border border-white/5 rounded-full border-dashed animate-spin-slow" />

        {/* Marcadores de Ejes */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20" />

        {/* Data Points animados */}
        <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[20%] right-[20%] text-[8px] font-mono text-[#FD6A10]"
        >
            SYS.TEMP: 800°C
        </motion.div>
        <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-[20%] left-[20%] text-[8px] font-mono text-[#FD6A10]"
        >
            COMPILING...
        </motion.div>
    </div>
);

// ==========================================
// 4. LA OLLA ABISMAL (THE VESSEL)
// ==========================================
// Ahora recibe "ready" para saber si aplicar los filtros pesados o no
const TheAbyssPot = ({ ready }) => {

    // Si no está listo, usamos un estilo fallback ligero para que no trabe la animación de entrada
    const magmaStyle = ready ? {
        filter: 'url(#magma-flow)',
        opacity: 0.5,
        mixBlendMode: 'hard-light'
    } : {
        opacity: 0.3,
        mixBlendMode: 'overlay' // Modo de fusión simple mientras carga
    };

    const textStyle = ready ? { filter: 'url(#heat-shimmer)' } : {};

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ y: useSpring(0, { stiffness: 30, damping: 15 }) }}
            className="relative w-[95vw] h-[95vw] md:w-[800px] md:h-[800px] z-20 flex items-center justify-center"
        >
            {/* Animación de flotación lenta */}
            <motion.div
                animate={{ y: [-15, 15, -15], rotateX: [1, -1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full perspective-[1200px]"
            >
                {/* --- ASAS MASIVAS --- */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-20 w-10 md:w-28 h-24 md:h-40 bg-[#0e0e0f] rounded-l-2xl border-y border-l border-[#333] shadow-2xl flex items-center justify-center z-0">
                    <div className="w-1.5 md:w-6 h-16 bg-black rounded-full border border-white/5 shadow-[inset_0_0_10px_black]" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-20 w-10 md:w-28 h-24 md:h-40 bg-[#0e0e0f] rounded-r-2xl border-y border-r border-[#333] shadow-2xl flex items-center justify-center z-0">
                    <div className="w-1.5 md:w-6 h-16 bg-black rounded-full border border-white/5 shadow-[inset_0_0_10px_black]" />
                </div>

                {/* --- CUERPO PRINCIPAL --- */}
                <div className="absolute inset-0 rounded-full bg-[#050505] border-[12px] md:border-[30px] border-[#161618] shadow-[0_50px_150px_-30px_rgba(0,0,0,1),inset_0_0_150px_rgba(0,0,0,1)] overflow-hidden z-10">

                    {/* Brillo Metálico del Borde */}
                    <div className="absolute inset-0 rounded-full border border-white/5 opacity-30 pointer-events-none z-50" />

                    {/* --- MAGMA INTERIOR (FONDO) --- */}
                    <div className="absolute inset-0 bg-black">
                        {/* Textura de magma hirviendo */}
                        <div
                            className="absolute inset-[-20%]"
                            style={{
                                background: `radial-gradient(circle at 50% 60%, ${THEME.deepOrange}, transparent 60%), url('https://grainy-gradients.vercel.app/noise.svg')`,
                                ...magmaStyle // APLICACIÓN CONDICIONAL
                            }}
                        />
                        {/* Viñeta Oscura (Profundidad) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_90%)]" />
                    </div>

                    {/* --- HUD TÉCNICO --- */}
                    <TechHUD />

                    {/* --- CONTENIDO --- */}
                    <div className="relative z-40 flex flex-col items-center justify-center h-full text-center px-6 md:px-24">

                        {/* Badge Tech */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3 px-4 py-2 mb-8 rounded bg-black md:bg-black/50 border border-[#FD6A10]/20 md:backdrop-blur-xl"
                        >
                            <div className="flex gap-1">
                                <span className="w-1 h-3 bg-[#FD6A10] animate-pulse" />
                                <span className="w-1 h-3 bg-[#FD6A10]/50" />
                                <span className="w-1 h-3 bg-[#FD6A10]/20" />
                            </div>
                            <span className="text-[10px] md:text-xs font-mono font-bold text-[#FD6A10] tracking-widest uppercase">
                                Sistema Operativo v1.0
                            </span>
                        </motion.div>

                        {/* TÍTULO CON CALOR EXTREMO */}
                        <div className="relative">
                            <h1
                                className="font-display text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl"
                                style={textStyle} // APLICACIÓN CONDICIONAL
                            >
                                COCINANDO <br />
                                <span className="text-[#FD6A10]">EL FUTURO.</span>
                            </h1>
                        </div>

                        <p className="mt-8 text-base md:text-xl text-gray-400 font-light max-w-lg leading-relaxed mix-blend-plus-lighter border-l-2 border-[#FD6A10]/30 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
                            La evolución gastronómica es unificada. Un solo ecosistema para gestionar la complejidad sin fricción.
                        </p>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
};

// Mini componente para los módulos de estado
const StatusModule = ({ icon: Icon, label, status, active, blink }) => (
    <div className="flex flex-col items-center gap-2 p-2 rounded bg-white/5 border border-white/5">
        <Icon size={14} className={`text-zinc-500 ${active ? 'text-[#FD6A10]' : ''}`} />
        <div className="text-[9px] font-mono uppercase text-zinc-400">{label}</div>
        <div className={`text-[10px] font-bold ${active ? 'text-white' : 'text-zinc-600'} ${blink ? 'animate-pulse text-[#FD6A10]' : ''}`}>
            {status}
        </div>
    </div>
);

// ==========================================
// 5. COMPONENTE PRINCIPAL (ASSEMBLY)
// ==========================================
export default function RestoProduct() {
    // ESTADO DE CARGA DIFERIDA
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Esperamos 600ms (tiempo de la transición de página) antes de cargar lo pesado
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-[100dvh] bg-[#000] text-white overflow-hidden flex flex-col justify-center items-center font-sans selection:bg-[#FD6A10] selection:text-black">

            {/* --- AGREGADO SEO --- */}
            <SEO
                title="Gastronomía"
                description="Potencia tu restaurante con tecnología inteligente. Menús digitales, gestión de reservas y comandas ágiles para brindar una experiencia gastronómica superior."
                keywords="Software Restaurantes, Menú Digital QR, Reservas Online, Comandas Ágiles, Tecnología Gastronómica"
                url="https://vantradigital.com/resto"
            />
            {/* ------------------ */}

            {/* SOLO MONTAMOS LOS FILTROS SI YA TERMINÓ LA TRANSICIÓN */}
            {isReady && <ExtremeFilters />}

            {/* --- FONDO GLOBAL (The Void) --- */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[#020202]">
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)]" />
            </div>

            {/* --- CAPA DE FUEGO (CSS PURO, LIGERO) --- */}
            {/* Esta capa carga INMEDIATAMENTE para que no se vea vacío */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[1000px] md:h-[1000px] z-10 pointer-events-none opacity-40 mix-blend-screen">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-[10%] rounded-full bg-[#FD6A10] blur-[150px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-[25%] rounded-full bg-blue-700 blur-[100px]"
                />
            </div>

            {/* Partículas Traseras - DIFERIDAS */}
            {isReady && <InfernoParticles density={80} />}

            {/* --- LA OLLA GIGANTE --- */}
            {/* Le pasamos el estado para que active sus filtros internos a tiempo */}
            <TheAbyssPot ready={isReady} />

            {/* Partículas Delanteras - DIFERIDAS */}
            <div className="absolute inset-0 z-30 pointer-events-none mix-blend-screen">
                {isReady && <InfernoParticles density={40} />}
            </div>

            {/* --- ATMÓSFERA FINAL (HUMO) --- */}
            <div className="absolute inset-0 pointer-events-none z-40 opacity-20 mix-blend-screen overflow-hidden">
                <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-zinc-800 to-transparent blur-[120px]" />
            </div>

        </div>
    );
}