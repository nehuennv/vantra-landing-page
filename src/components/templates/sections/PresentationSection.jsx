import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Database, Search, Clock, User, Server, FileText, Phone, Video, MoreVertical } from 'lucide-react';

// --- HELPER DATA ---
const NAMES = ["Ana", "Luz", "Sol", "Leo", "Teo", "Mar", "Pía", "Ian"];
const SURNAMES = ["Ríos", "Paz", "Gil", "Rey", "Cruz", "Sosa", "Luna", "Vera"];
const DAYS = ["Lunes", "Martes", "Miérc", "Jueves", "Viernes"];
const TIMES = ["09:00", "10:30", "14:00", "16:45", "18:15"];
const AVATAR_COLORS = ["#10B981", "#6366F1", "#F43F5E", "#F59E0B", "#8B5CF6", "#06B6D4", "#EC4899"];

// --- CONVERSATION STYLES (10) ---
const STYLES = [
    {   // 1. Estándar
        id: 'std',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Hola, quiero un turno.<br />Soy <strong className="text-white">{data.name}</strong>. Mi DNI es {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Hola {data.firstName}. Perfecto, te busqué en el sistema.<br />Tengo lugar este <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Dale, reservámelo.</p>
    },
    {   // 2. Formal
        id: 'formal',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Buenas tardes. Quisiera solicitar una cita.<br /><strong className="text-white">{data.name}</strong>. {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Estimado/a {data.firstName}. He verificado su ficha.<br />Le ofrezco disponibilidad para el <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Correcto. Confirmo la asistencia.</p>
    },
    {   // 3. Casual
        id: 'casual',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Hola!! 👋 Necesito ver al doc.<br />Soy <strong className="text-white">{data.name}</strong>, DNI {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Hola {data.firstName}! Todo en orden.<br />Te puedo agendar el <strong className="text-green-300">{data.day} {data.time}hs</strong>. Te sirve?</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Sisi, genial! Gracias ✨</p>
    },
    {   // 4. Apurado
        id: 'rushed',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Turno porfa. <strong className="text-white">{data.name}</strong>, {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">{data.firstName}, listo. Tengo <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Dale joya.</p>
    },
    {   // 5. Dubitativo
        id: 'hesitant',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Hola, te quería consultar x un turno...<br />Soy <strong className="text-white">{data.name}</strong> ({data.dni})</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Hola {data.firstName}, sí, no hay problema.<br />Mirá, encontré un lugar el <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Ah buenísimo, sí sí, anotalo.</p>
    },
    {   // 6. Entusiasta
        id: 'enthusiastic',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Buenas!! Quiero retomar el tratamiento!<br />Soy <strong className="text-white">{data.name}</strong> - {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Qué bueno {data.firstName}! Te estaba buscando.<br />Tengo un hueco ideal el <strong className="text-green-300">{data.day} {data.time}hs</strong>!</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Perfecto! Nos vemos ahí! 🚀</p>
    },
    {   // 7. Senior/Respetuoso
        id: 'senior',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Disculpe la molestia. Necesito ver al doctor.<br />Le paso mis datos: <strong className="text-white">{data.name}</strong>, {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">No es molestia {data.firstName}.<br />El doctor tiene disponibilidad este <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Muy amable. Estaré allí.</p>
    },
    {   // 8. Juvenil
        id: 'youth',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Che buenas, hay lugar?<br />Soy <strong className="text-white">{data.name}</strong>, dni {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Buenas {data.firstName}. Sí, saltó tu ficha.<br />Venite el <strong className="text-green-300">{data.day} {data.time}hs</strong> te parece?</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">De una. Reservalo.</p>
    },
    {   // 9. Profesional
        id: 'pro',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Solicitud de turno: Control anual.<br />Paciente: <strong className="text-white">{data.name}</strong>. ID: {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Recibido {data.firstName}. Procedo a agendar.<br />Próximo turno disponible: <strong className="text-green-300">{data.day} {data.time}hs</strong>.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Confirmo turno. Gracias.</p>
    },
    {   // 10. Minimalista
        id: 'min',
        p1: (data) => <p className="text-zinc-100 text-[15px] leading-snug">Turno. <strong className="text-white">{data.name}</strong>. {data.dni}</p>,
        p2: (data) => <p className="text-white text-[15px] leading-snug">Ok {data.firstName}. <strong className="text-green-300">{data.day} {data.time}hs</strong> libre.</p>,
        p3: () => <p className="text-zinc-100 text-[15px]">Si, voy.</p>
    }
];

// --- VISIT DATA VARIANTS (20) ---
const VISIT_VARIANTS = [
    { visit: "Hace 2 meses", reason: "Control Anual" },
    { visit: "Hace 6 meses", reason: "Limpieza" },
    { visit: "Hace 1 año", reason: "Consulta General" },
    { visit: "Primera visita", reason: "Derivación" },
    { visit: "Hace 3 semanas", reason: "Seguimiento" },
    { visit: "Ayer", reason: "Urgencia" },
    { visit: "Hace 5 días", reason: "Dolor Agudo" },
    { visit: "Hace 8 meses", reason: "Ortodoncia" },
    { visit: "Inasistente", reason: "Consulta Cancelada" },
    { visit: "Hace 1 mes", reason: "Blanqueamiento" },
    { visit: "Hace 4 meses", reason: "Chequeo" },
    { visit: "Hace 2 años", reason: "Retorno" },
    { visit: "Hace 3 meses", reason: "Prótesis" },
    { visit: "Hace 15 días", reason: "Curación" },
    { visit: "Hace 1 semana", reason: "Control Post-Op" },
    { visit: "Hace 9 meses", reason: "Implante" },
    { visit: "Hace 10 días", reason: "Extracción" },
    { visit: "Hace 1.5 años", reason: "Revisión" },
    { visit: "Hace 7 meses", reason: "Periodoncia" },
    { visit: "Hace 2 semanas", reason: "Ajuste" },
    { visit: "Hace 5 meses", reason: "Estética" }
];

const getRandomData = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
    const day = DAYS[Math.floor(Math.random() * DAYS.length)];
    const timeStr = TIMES[Math.floor(Math.random() * TIMES.length)];
    const dni = Math.floor(20000000 + Math.random() * 30000000).toLocaleString('es-AR');
    const dayNum = Math.floor(1 + Math.random() * 28);

    // Calculate prev and next hours
    const [hh, mm] = timeStr.split(':').map(Number);
    const prevH = (hh - 1 + 24) % 24;
    const nextH = (hh + 1) % 24;

    const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    const prevTime = formatTime(prevH, mm);
    const nextTime = formatTime(nextH, mm);

    // Select Random Style
    const style = STYLES[Math.floor(Math.random() * STYLES.length)];

    // Select Random Visit data
    const visitData = VISIT_VARIANTS[Math.floor(Math.random() * VISIT_VARIANTS.length)];
    const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const dataObj = {
        name: `${name} ${surname}`,
        avatarColor,
        firstName: name,
        dni,
        day,
        time: timeStr,
        prevTime,
        nextTime,
        dayNum,
        ...visitData
    };

    // Generate Bubbles
    const bubbles = [
        { id: 1, align: 'start', bg: 'bg-[#202c33]', rounded: 'rounded-tl-none origin-bottom-left', text: style.p1(dataObj) },
        { id: 2, align: 'end', bg: 'bg-[#005c4b]', rounded: 'rounded-tr-none origin-bottom-right', text: style.p2(dataObj) },
        { id: 3, align: 'start', bg: 'bg-[#202c33]', rounded: 'rounded-tl-none origin-bottom-left', text: style.p3(dataObj) }
    ];

    return { ...dataObj, bubbles };
};

// --- 1. SIMULADOR DE CHAT ---
const ChatSimulator = ({ data }) => {
    // Fallback if data.bubbles is undefined (initial load)
    const bubbles = data.bubbles || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Removed stagger to rely on individual bubble delays for "conversation" pacing
                when: "beforeChildren"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        }
    };

    const bubbleVariants = {
        hidden: (i) => ({ opacity: 0, x: i === 1 ? 10 : -10, y: 10 }),
        visible: (i) => ({
            opacity: 1, x: 0, y: 0,
            transition: {
                // Restore original scripted delays for realistic chat flow
                delay: i === 1 ? 2.0 : (i === 0 ? 0.5 : 3.5),
                duration: 0.4,
                ease: "easeOut"
            }
        }),
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            className="w-full h-full bg-[#0b141a] rounded-2xl overflow-hidden border border-white/10 flex flex-col relative shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] z-20"
            whileHover={{ rotate: -1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Header */}
            <div className="h-16 bg-[#202c33] flex items-center px-4 gap-3 border-b border-white/5 z-20 relative justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ backgroundColor: "#52525b" }} // zinc-600
                        animate={{ backgroundColor: data.avatarColor || "#52525b" }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                    >
                        <User size={24} className="text-white/80 mt-2" />
                    </motion.div>
                    <div className="flex flex-col justify-center">
                        <span className="text-zinc-200 font-bold text-sm">Paciente</span>
                        <span className="text-zinc-500 text-xs">en línea</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[#00a884]">
                    <Video size={20} />
                    <Phone size={18} />
                    <MoreVertical size={18} className="text-zinc-400" />
                </div>
            </div>

            {/* Mensajes con AnimatePresence */}
            <div className="flex-1 relative overflow-hidden bg-[#0b141a]">
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat z-0" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={data.dni} // CAMBIO CLAVE: El DNI fuerza el remount de la lista
                        className="p-5 flex flex-col gap-4 font-sans relative z-10 w-full h-full justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        exit="exit"
                    >
                        {bubbles.map((bubble, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={bubbleVariants}
                                whileHover={{ filter: "brightness(1.1)", transition: { duration: 0.1 } }}
                                layout // Para movimientos suaves
                                className={`self-${bubble.align} ${bubble.bg} p-4 rounded-xl ${bubble.rounded} max-w-[90%] shadow-lg border border-white/5 relative`}
                            >
                                {bubble.text}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="h-16 bg-[#202c33] flex items-center px-4 gap-3 z-20 border-t border-white/5 relative">
                <div className="h-10 flex-1 bg-[#2a3942] rounded-full border border-zinc-700/50" />
                <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm">➤</span>
                </div>
            </div>
        </motion.div>
    );
};

// --- 2. SIMULADOR DE AGENDA ---
const AgendaSimulator = ({ themeColor, data }) => {
    return (
        <motion.div
            className="w-full h-full bg-white rounded-2xl overflow-hidden border border-zinc-300 flex flex-col relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] z-20"
            whileHover={{ rotate: 1, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Header (ABSOLUTE to not take space) */}
            <div className="absolute top-0 left-0 w-full h-16 border-b border-zinc-200 flex items-center justify-between px-5 bg-zinc-50 z-20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-zinc-200 rounded-lg shadow-sm">
                        <Calendar size={18} className="text-zinc-700" />
                    </div>
                    <div className="flex flex-col relative h-8 justify-center min-w-[80px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={data.dni}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col"
                            >
                                <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">{data.day} {data.dayNum}</span>
                                <span className="text-zinc-500 text-xs">Vista Diaria</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="p-5 relative w-full h-full bg-white z-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={data.dni}
                        className="flex flex-col gap-4 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Prev Hour */}
                        <div className="flex gap-4 items-center opacity-40 grayscale group">
                            <div className="text-sm font-semibold text-zinc-600 w-12 text-right">{data.prevTime}</div>
                            <div className="h-14 flex-1 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center px-4 gap-3">
                                <div className="w-3 h-3 rounded-full bg-zinc-400" />
                                <div className="h-2.5 w-32 bg-zinc-300 rounded-full" />
                            </div>
                        </div>

                        {/* TARGET */}
                        <div className="flex gap-4 items-center relative z-10">
                            <div className="text-sm font-black text-zinc-900 w-12 text-right">{data.time}</div>
                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: "#fafafa", borderColor: "var(--theme-color)", transition: { duration: 0.1 } }}
                                className="relative flex-1 h-20 rounded-xl bg-white border border-zinc-200 overflow-visible flex items-center px-4 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)]"
                                style={{ '--theme-color': themeColor }}
                            >
                                <motion.div
                                    initial={{ height: "0%" }}
                                    whileInView={{ height: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 5.3 }}
                                    exit={{ height: "0%", transition: { duration: 0.3, delay: 0.2 } }}
                                    className="absolute left-0 top-0 bottom-0 w-2 rounded-l-xl"
                                    style={{ backgroundColor: themeColor }}
                                />
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 5.5 }}
                                    exit={{ opacity: 0, x: -10, transition: { duration: 0.2, delay: 0.1 } }}
                                    className="flex flex-col justify-center ml-3 min-w-0 flex-1"
                                >
                                    <span className="text-lg font-bold text-zinc-900 leading-tight truncate w-full">{data.name}</span>
                                    <div className="flex items-center gap-2 mt-1 whitespace-nowrap">
                                        <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-2 py-0.5 rounded shrink-0">DNI {data.dni}</span>
                                        <span className="text-[10px] text-green-700 font-bold bg-green-100 border border-green-200 px-2 py-0.5 rounded-full shrink-0">CONFIRMADO</span>
                                    </div>
                                </motion.div>

                                {/* POP-UP (GLASSMORPHISM) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 6.2 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    className="absolute right-0 top-full mt-4 w-64 z-50 origin-top-right"
                                >
                                    <div className="bg-zinc-800 text-white p-4 rounded-xl shadow-2xl border border-white/10">
                                        <div className="absolute -top-1.5 right-8 w-3 h-3 bg-zinc-800 transform rotate-45 border-l border-t border-white/10" />
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                                            <FileText size={14} className="text-green-400" />
                                            <span className="text-xs font-bold uppercase text-green-400 tracking-wider">Paciente Vinculado</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-400">Última Visita:</span>
                                                <span className="text-white font-medium">{data.visit}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-400">Motivo:</span>
                                                <span className="text-white font-medium">{data.reason}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Next Hour */}
                        <div className="flex gap-4 items-center opacity-40 pt-2">
                            <div className="text-sm font-semibold text-zinc-600 w-12 text-right">{data.nextTime}</div>
                            <div className="group p-4 rounded-xl bg-[#0A0A0B] md:bg-white/[0.02] border border-white/5 md:backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div >
    );
};

// --- 3. CONECTOR (DATA STREAM) - CORREGIDO Y CENTRADO ---
const DataStream = ({ themeColor, onReload, isLoading, isBlocked, simulationKey }) => {
    return (
        // Se comporta como un bloque en el layout, no como un elemento absoluto flotante
        <div className="relative w-24 h-48 md:w-32 md:h-24 lg:w-48 lg:h-24 xl:w-80 flex items-center justify-center z-0">

            {/* Cable Base - Rota en mobile (vertical) y recto en PC (horizontal) */}
            <div className="absolute w-[3px] h-full lg:w-full lg:h-[3px] bg-zinc-800 rounded-full" />

            {/* Idle Pulse */}
            <motion.div
                className="absolute w-[3px] h-full lg:w-full lg:h-[3px] bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* PAQUETE 1: Chat -> DB (Verde) */}
            <div className="absolute z-20 overflow-hidden w-[3px] h-1/2 top-0 left-1/2 -translate-x-1/2 lg:w-1/2 lg:h-[3px] lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:translate-x-0">
                <motion.div
                    // Animación condicional para vertical vs horizontal es compleja en CSS puro, 
                    // usamos una transición genérica que funciona visualmente en ambos sentidos si el contenedor rota.

                    // Nota: Para simplificar la animación responsive sin JS complejo de detección de ancho:
                    // Usamos Framer Motion simple sobre el eje correspondiente.
                    className="w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-[#25D366] to-transparent shadow-[0_0_15px_#25D366]"

                    // Animación hardcodeada para que "viaje" visualmente
                    key={`p1-${simulationKey}`}
                    initial={{ x: "-100%", y: "-100%", opacity: 0 }}
                    whileInView={{ x: "100%", y: "100%", opacity: [0, 1, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 3.8, ease: "linear" }}
                />
            </div>

            {/* PAQUETE 2: DB -> Agenda (Color Theme) */}
            <div className="absolute z-20 overflow-hidden w-[3px] h-1/2 bottom-0 left-1/2 -translate-x-1/2 lg:w-1/2 lg:h-[3px] lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:translate-x-0">
                <motion.div
                    key={`p2-${simulationKey}`}
                    initial={{ x: "-100%", y: "-100%" }}
                    whileInView={{ x: "100%", y: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 4.8, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-[var(--theme-color)] to-transparent shadow-[0_0_15px_var(--theme-color)]"
                    style={{ '--theme-color': themeColor }}
                />
            </div>

            {/* SERVER CENTRAL */}
            <div className={`relative z-30 interactive group`} onClick={onReload}>

                {/* ROTATING AURA (Loading State) */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.5, rotate: 360 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                            }}
                            style={{
                                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--theme-color) 60deg, transparent 120deg, transparent 360deg)`
                            }}
                            className="absolute inset-0 rounded-full blur-xl opacity-60 z-0 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    // Ripple effect (only when NOT loading)
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isLoading ? { opacity: 0 } : { opacity: [0, 0.4, 0], scale: 3 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 bg-[var(--theme-color)] blur-2xl rounded-full"
                    style={{ '--theme-color': themeColor }}
                />

                {/* Blocked SHOCKWAVE */}
                <AnimatePresence>
                    {isBlocked && (
                        <motion.div
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-red-500/30 border-2 border-red-500 z-10 blur-md pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ scale: 1, borderColor: "#27272a" }}
                    whileInView={{ scale: [1, 1.3, 1], borderColor: ["#27272a", themeColor, "#27272a"], backgroundColor: ["#09090b", "#18181b", "#09090b"] }}
                    viewport={{ once: true }}
                    whileHover={isLoading ? {} : { scale: 1.1, borderColor: themeColor }}
                    whileTap={isLoading ? {} : { scale: 0.95 }}
                    animate={
                        isBlocked
                            ? { x: [-5, 5, -5, 5, 0], borderColor: "#ef4444", boxShadow: "0 0 30px #ef4444" } // Shake/Red on block
                            : {
                                // Simple glow for idle, no crazy strobe when loading (Aura handles it)
                                boxShadow: ["0 0 0px var(--theme-color)", "0 0 20px var(--theme-color)", "0 0 0px var(--theme-color)"],
                                borderColor: isBlocked ? "#ef4444" : "#27272a",
                                x: 0
                            }
                    }
                    transition={{
                        default: { duration: 0.5 },
                        borderColor: { duration: 0.2 },
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 0.2 },
                        x: { duration: 0.4, ease: "easeInOut" } // Fast shake
                    }}
                    style={{ '--theme-color': themeColor }}
                    className="w-16 h-16 bg-[#09090b] border-[3px] rounded-full flex items-center justify-center relative shadow-2xl z-20 overflow-hidden box-border"
                >
                    {/* Cooldown Spinner */}
                    {isLoading && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                            <motion.circle
                                cx="50" cy="50" r="48" fill="none" stroke={themeColor} strokeWidth="8"
                                initial={{ pathLength: 0, opacity: 1 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 7.5, ease: "linear" }} // Duration matching logic
                            />
                        </svg>
                    )}

                    <Server size={24} className={`text-zinc-400 transition-all ${isLoading ? 'scale-75 opacity-50' : 'group-hover:text-white'}`} />

                </motion.div>

                {/* Replay Tooltip Helper */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out whitespace-nowrap font-medium pointer-events-none">
                    {isLoading ? "Simulando..." : "Click para simular"}
                </div>
            </div>
        </div>
    );
};

// --- MINI FEATURE ---
const MiniFeature = ({ icon: Icon, title, desc }) => (
    <div
        className="
            group relative h-full rounded-2xl overflow-hidden
            bg-black/30 backdrop-blur-md
            border border-white/10
            hover:border-[var(--theme-color)]/30 hover:bg-white/[0.05]
            transition-colors duration-500 ease-out
            flex flex-col p-6
        "
    >
        {/* 1. INNER GLOW (CYAN/THEME) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-color)]/0 via-[var(--theme-color)]/0 to-[var(--theme-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* 2. CONTENIDO */}
        <div className="relative z-10 flex flex-col h-full">
            <div className="mb-4">
                <div className="
                    w-12 h-12 rounded-xl flex items-center justify-center
                    bg-transparent border border-white/10 text-zinc-400
                    group-hover:bg-[var(--theme-color)] group-hover:text-white group-hover:border-[var(--theme-color)]
                    group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                    transition-all duration-300
                ">
                    <Icon size={22} strokeWidth={1.5} />
                </div>
            </div>

            <div className="mt-auto">
                <h4 className="text-lg font-medium text-zinc-100 mb-2 group-hover:text-white transition-colors">{title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light group-hover:text-zinc-200 transition-colors duration-300">{desc}</p>
            </div>
        </div>

        {/* 3. HOVER LINE (Barra theme color abajo) */}
        <div className="absolute bottom-0 left-0 h-1 bg-[var(--theme-color)] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
    </div>
);

const PresentationSection = ({ data, themeColor = '#06B6D4' }) => {
    const { title, subtitle, paragraph } = data || { title: "Título Default", subtitle: "Subtítulo", paragraph: "Texto de ejemplo." };
    const [simData, setSimData] = React.useState(() => getRandomData());
    const [simulationKey, setSimulationKey] = React.useState(0);
    // const [isExiting, setIsExiting] = React.useState(false); // Eliminado: ya no es necesario
    const [isLoading, setIsLoading] = React.useState(false);
    const [isBlocked, setIsBlocked] = React.useState(false);

    const handleReload = () => {
        if (isLoading) {
            setIsBlocked(true);
            setTimeout(() => setIsBlocked(false), 300);
            return;
        }

        setIsLoading(true);
        // Eliminamos la fase manual de "isExiting" + setTimeout.
        // Actualizamos los datos directamente y AnimatePresence (mode="wait") maneja la salida vieja -> entrada nueva.
        setSimData(getRandomData());
        setSimulationKey(prev => prev + 1);

        // Timer para resetear el estado de "Cargando" (Server spinner)
        // Ajustamos tiempos: Exit(~0.5s) + Enter(~2s) + DataStream + Agenda...
        setTimeout(() => {
            setIsLoading(false);
        }, 7500);
    };

    const deviceVariants = {
        hidden: (direction) => ({
            opacity: 0,
            x: direction === 'left' ? -50 : 50,
            scale: 0.95
        }),
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: {
            x: [0, -10, 10, -5, 5, 0],
            rotate: [0, -2, 2, -1, 1, 0],
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section
            className="py-24 md:py-32 px-6 relative bg-transparent overflow-hidden"
            style={{ '--theme-color': themeColor }}
        >
            <div className="container mx-auto max-w-6xl relative z-10">

                {/* 1. HEADER */}
                <div className="mb-12 md:mb-24 text-center max-w-3xl mx-auto">
                    {subtitle && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-color)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-color)]"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)]">
                                {subtitle}
                            </span>
                        </motion.div>
                    )}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-6xl font-display font-medium text-white mb-4 md:mb-6 leading-tight"
                    >
                        {title}
                    </motion.h2>
                    {paragraph && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-xl text-zinc-400 font-light leading-relaxed"
                        >
                            {paragraph}
                        </motion.p>
                    )}
                </div>

                {/* 2. EL ESCENARIO (LAYOUT FIX: FLEXBOX PURO) */}
                <div className="relative w-full flex flex-col lg:flex-row items-center justify-center mb-12 md:mb-24 min-h-[480px]">

                    {/* IZQUIERDA: WHATSAPP */}
                    <motion.div
                        custom="left"
                        variants={deviceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full max-w-[360px] z-20 shrink-0"
                    >
                        <div className="w-full h-[500px] md:aspect-[3.8/5]">
                            {/* REMOVED key={simulationKey} to avoid hard-unmount */}
                            <ChatSimulator data={simData} />
                        </div>
                    </motion.div>

                    {/* CENTRO: DATA STREAM (Ahora es un item flex, no absoluto) */}
                    <DataStream themeColor={themeColor} onReload={handleReload} isLoading={isLoading} isBlocked={isBlocked} simulationKey={simulationKey} />

                    {/* DERECHA: AGENDA */}
                    <motion.div
                        custom="right"
                        variants={deviceVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full max-w-[360px] z-20 shrink-0"
                    >
                        <div className="w-full h-[500px] md:aspect-[3.8/5]">
                            <AgendaSimulator themeColor={themeColor} data={simData} />
                        </div>
                    </motion.div>

                </div>

                {/* 3. FEATURE GRID */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3"
                >
                    <MiniFeature
                        icon={Database}
                        title="DNI como Llave Maestra"
                        desc="El sistema detecta el DNI en el chat, busca en tu base de datos y vincula la historia clínica."
                    />
                    <MiniFeature
                        icon={Search}
                        title="Contexto Inmediato"
                        desc="Antes de que el paciente llegue, ya tenés su historial, diagnósticos previos y tratamientos."
                    />
                    <MiniFeature
                        icon={Clock}
                        title="Turnos Confirmados"
                        desc="Cada 'Sí' en WhatsApp se convierte instantáneamente en un bloque ocupado en tu agenda."
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default PresentationSection;