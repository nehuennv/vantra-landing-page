import React, { useState, useEffect, useMemo } from 'react';
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    Activity,
    Search,
    Bell,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Plus,
    Stethoscope,
    TrendingUp,
    Menu,
    X,
    Save,
    Loader2,
    AlertCircle,
    FileText,
    Image as ImageIcon,
    ActivitySquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. DATA CENTER & TYPES
// ==========================================

const USER_IDENTITY = {
    name: "Dr. Pascual",
    role: "Cardiólogo Intervencionista",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150",
    clinic: "CardioMed Premium"
};

const INITIAL_PATIENTS = [
    { id: 1, name: "Mariana López", age: 34, history: "HC-9921", status: "Activo", lastVisit: "2024-01-20", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Carlos Ruiz", age: 58, history: "HC-9922", status: "Activo", lastVisit: "2024-01-22", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Elena Gómez", age: 29, history: "HC-9923", status: "Inactivo", lastVisit: "2023-11-15", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 4, name: "Roberto Diaz", age: 45, history: "HC-9924", status: "Activo", lastVisit: "2024-01-23", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 5, name: "Sofia Martens", age: 62, history: "HC-9925", status: "Activo", lastVisit: "2024-01-18", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];

const INITIAL_APPOINTMENTS = [
    { id: 101, patientId: 1, patientName: "Mariana López", type: "Primera Consulta", time: "09:00", date: "2025-01-24", status: "En curso", tags: ["OSDE", "Prioridad"] },
    { id: 102, patientId: 2, patientName: "Carlos Ruiz", type: "Control Post-Op", time: "10:30", date: "2025-01-24", status: "Confirmado", tags: ["Swiss Medical"] },
    { id: 103, patientId: 3, patientName: "Elena Gómez", type: "Ergometría", time: "11:15", date: "2025-01-24", status: "Pendiente", tags: ["Particular"] },
    { id: 102, patientId: 2, patientName: "Carlos Ruiz", type: "Control Post-Op", time: "10:30", date: "2025-01-24", status: "Confirmado", tags: ["Swiss Medical"] },
    { id: 103, patientId: 3, patientName: "Elena Gómez", type: "Ergometría", time: "11:15", date: "2025-01-24", status: "Pendiente", tags: ["Particular"] },
    { id: 104, patientId: 4, patientName: "Roberto Diaz", type: "Chequeo General", time: "14:00", date: "2025-01-24", status: "Confirmado", tags: ["Galeno"] },
];

const MOCK_HISTORY = [
    { date: "2023-11-15", type: "Consulta", note: "Paciente refiere dolor torácico leve al esfuerzo. Se solicita ECG y Ergometría.", doctor: "Dr. Vantra" },
    { date: "2023-11-20", type: "Estudio", note: "Ergometría s/p. Protocolo de Bruce. Detenida por fatiga al 7mo minuto. Sin cambios isquémicos.", doctor: "Dra. Sola" },
    { date: "2024-01-20", type: "Control", note: "Trae estudios. Se ajusta medicación antihipertensiva. Próximo control en 6 meses.", doctor: "Dr. Vantra" },
];

// ==========================================
// 2. VISUAL UTILS (STYLES)
// ==========================================

const UI = {
    // Aumentamos la opacidad del bg-white/90 para evitar que se vea oscuro si el fondo de atrás es negro
    glass: "bg-white md:bg-white/90 md:backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50",
    glassHover: "hover:bg-white transition-all duration-300",
    card: "bg-white rounded-[1.5rem] border border-slate-100 shadow-sm",
    primaryText: "text-[hsl(199,89%,48%)]",
    primaryBg: "bg-[hsl(199,89%,48%)]",
    islandContainer: "bg-slate-50/95 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden",
};

// ==========================================
// 3. TOAST SYSTEM
// ==========================================

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="absolute top-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        layout
                        className="bg-white text-slate-700 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 min-w-[300px] pointer-events-auto border border-slate-100"
                    >
                        {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 w-5 h-5" /> : <AlertCircle className="text-rose-500 w-5 h-5" />}
                        <div className="flex-1">
                            <p className="text-sm font-medium">{toast.title}</p>
                            {toast.message && <p className="text-xs text-slate-400">{toast.message}</p>}
                        </div>
                        <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// ==========================================
// 4. HOOKS
// ==========================================

const useSimulatedAction = (addToast) => {
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (actionFn, successMessage) => {
        setIsLoading(true);
        const delay = Math.random() * (1000 - 500) + 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        const result = actionFn();
        setIsLoading(false);
        if (addToast && successMessage) {
            addToast({ title: "Acción completada", message: successMessage, type: 'success' });
        }
        return result;
    };
    return { isLoading, execute };
};

// ==========================================
// 5. SUB-COMPONENTS
// ==========================================

const SidebarItem = ({ icon: Icon, label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
        ${active ? "text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-700"}
      `}
        >
            {active && (
                <motion.div
                    layoutId="activePill"
                    className={`absolute inset-0 ${UI.primaryBg} rounded-xl shadow-lg shadow-sky-500/20`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <Icon className={`relative z-10 w-4 h-4 transition-transform duration-300 ${active ? "scale-105" : "group-hover:scale-105"}`} />
            <span className="relative z-10 font-medium text-sm">{label}</span>
        </button>
    );
};

const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
    const menu = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Panel General' },
        { id: 'agenda', icon: CalendarDays, label: 'Agenda Médica' },
        { id: 'patients', icon: Users, label: 'Pacientes' },
        { id: 'settings', icon: Settings, label: 'Configuración' },
    ];

    const Content = (
        <div className="flex flex-col h-full w-full">
            <div className="h-20 flex items-center gap-3 px-2 mb-2 flex-shrink-0">
                <div className={`w-9 h-9 rounded-xl ${UI.primaryBg} flex items-center justify-center text-white shadow-md ring-4 ring-sky-500/10`}>
                    <Stethoscope size={18} />
                </div>
                <div>
                    <h1 className="font-semibold text-lg text-slate-800 leading-none">Vantra<span className={UI.primaryText}>Med</span></h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Suite Médica</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto py-2">
                {menu.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeTab === item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (window.innerWidth < 768) setMobileOpen(false);
                        }}
                    />
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100 flex-shrink-0">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="relative">
                        <img src={USER_IDENTITY.avatar} alt="User" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="text-left overflow-hidden">
                        <p className="text-xs font-medium text-slate-700 truncate">{USER_IDENTITY.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">Ver Perfil</p>
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <aside className={`w-64 h-full flex-col p-4 z-20 hidden md:flex ${UI.glass} rounded-[2rem]`}>
                {Content}
            </aside>
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 bg-slate-900/20 md:backdrop-blur-sm z-40" />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className={`md:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-[280px] bg-white z-50 p-6 shadow-2xl`}>
                            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"><X size={20} /></button>
                            {Content}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const TopBar = ({ title, setMobileOpen, onSearch }) => {
    return (
        <header className="flex items-center justify-between p-6 pb-2">
            <div className="flex items-center gap-4">
                <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg">
                    <Menu size={20} />
                </button>
                <div>
                    <h2 className="text-lg font-medium text-slate-800">{title}</h2>
                    <p className="text-xs text-slate-400 hidden sm:block">
                        {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm w-48 focus-within:w-64 focus-within:ring-2 focus-within:ring-[hsl(199,89%,48%)] transition-all">
                    <Search size={14} className="text-slate-400 mr-2" />
                    <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-xs text-slate-600 w-full placeholder:text-slate-400" onChange={(e) => onSearch && onSearch(e.target.value)} />
                </div>
                <button className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[hsl(199,89%,48%)] hover:shadow-sm transition-all">
                    <Bell size={16} />
                    <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
};

// ==========================================
// 6. VIEW COMPONENTS
// ==========================================

const StatCard = ({ kpi, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${UI.card} p-5 hover:-translate-y-1 transition-transform duration-300 group`}
        >
            <div className="flex justify-between items-center mb-3">
                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.text} group-hover:scale-105 transition-transform`}>
                    <kpi.icon size={16} />
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${kpi.isPositive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                    {kpi.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {kpi.trend}
                </span>
            </div>
            <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">{kpi.title}</p>
                <h3 className="text-xl font-semibold text-slate-700 tracking-tight">{kpi.value}</h3>
            </div>
        </motion.div>
    );
};

const DashboardView = ({ stats, appointments }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((kpi, idx) => <StatCard key={idx} kpi={kpi} index={idx} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 ${UI.card} p-5 h-[380px] flex flex-col`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-slate-700 flex items-center gap-2 text-sm">
                            <CalendarDays size={16} className={UI.primaryText} />
                            Turnos de Hoy
                        </h3>
                        <button className={`text-xs font-medium ${UI.primaryText} hover:underline`}>Ver Todo</button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {appointments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <CalendarDays size={40} className="mb-2 opacity-20" />
                                <p className="text-sm">No hay turnos para hoy</p>
                            </div>
                        ) : (
                            appointments.slice(0, 5).map((apt) => (
                                <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all interactive group">
                                    <div className="flex flex-col items-center min-w-[3rem] py-1 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-white">
                                        <span className="text-xs font-medium text-slate-700">{apt.time}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-slate-700 group-hover:text-sky-600 transition-colors">{apt.patientName}</h4>
                                        <p className="text-xs text-slate-500">{apt.type}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${apt.status === 'En curso' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className={`${UI.card} p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none`}>
                        <h3 className="font-medium text-sm mb-4">Progreso Diario</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-300">Completados</span>
                                <span className="font-medium text-emerald-400">{Math.floor(stats[2].rawValue || 0)}</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-emerald-400 w-[80%]"></div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-300">Pendientes</span>
                                <span className="font-medium text-white">{appointments.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AgendaView = ({ appointments, onAddAppointment }) => {
    const [viewMode, setViewMode] = useState('list');
    return (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                    <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Lista</button>
                    <button onClick={() => setViewMode('calendar')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'calendar' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Calendario</button>
                </div>
                <button onClick={onAddAppointment} className={`${UI.primaryBg} hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95`}>
                    <Plus size={14} /> Nuevo Turno
                </button>
            </div>
            <div className={`${UI.card} flex-1 overflow-hidden flex flex-col`}>
                <div className="overflow-y-auto p-2 custom-scrollbar space-y-2">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="bg-white hover:bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between group transition-all">
                            <div className="flex items-center gap-4">
                                <div className="text-center w-10">
                                    <p className="text-sm font-medium text-slate-700 leading-none">{apt.time.split(':')[0]}</p>
                                    <p className="text-[9px] text-slate-400 uppercase">{apt.time.split(':')[1]}</p>
                                </div>
                                <div className="w-px h-6 bg-slate-200"></div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-700">{apt.patientName}</h4>
                                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {apt.type}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {apt.tags.map(tag => (
                                    <span key={tag} className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] text-slate-500 bg-slate-100 border border-slate-200">{tag}</span>
                                ))}
                                <button className="p-1.5 text-slate-400 hover:text-sky-600 transition-colors"><MoreVertical size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const PatientsView = ({ patients, onAddPatient, onSelectPatient }) => {
    const [search, setSearch] = useState('');
    const filteredPatients = useMemo(() => patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.history.toLowerCase().includes(search.toLowerCase())), [patients, search]);

    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full flex flex-col">
            <div className="mb-6 relative flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Buscar paciente..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full pl-9 pr-4 py-2.5 rounded-xl ${UI.glass} text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all`} />
                </div>
                <button onClick={onAddPatient} className={`${UI.primaryBg} hover:opacity-90 text-white px-3 rounded-xl text-xs font-medium shadow-md flex items-center gap-1 transition-transform hover:scale-105 active:scale-95`}>
                    <Plus size={16} /> <span className="hidden sm:inline">Nuevo</span>
                </button>
            </div>
            <div className={`${UI.card} flex-1 overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                <th className="p-4 pl-6">Paciente</th>
                                <th className="p-4">Historia</th>
                                <th className="p-4">Edad</th>
                                <th className="p-4">Última Visita</th>
                                <th className="p-4 text-right pr-6">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-600">
                            {filteredPatients.map((p) => (
                                <tr key={p.id} onClick={() => onSelectPatient(p)} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors interactive group">
                                    <td className="p-3 pl-6">
                                        <div className="flex items-center gap-3">
                                            <img src={p.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                                            <span className="font-medium text-slate-700 group-hover:text-[hsl(199,89%,48%)] transition-colors">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-xs text-slate-500 font-mono">{p.history}</td>
                                    <td className="p-3">{p.age}</td>
                                    <td className="p-3 text-slate-500">{p.lastVisit}</td>
                                    <td className="p-3 text-right pr-6">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${p.status === 'Activo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

const SettingsView = ({ executeAction }) => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const handleSave = () => executeAction(() => { }, "Preferencias guardadas");

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-8">
            <div className={`${UI.card} p-6 space-y-6`}>
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-full bg-slate-50 text-slate-500"><Settings size={20} /></div>
                    <div><h3 className="text-base font-medium text-slate-800">Configuración</h3><p className="text-xs text-slate-500">Personaliza tu experiencia</p></div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3"><Bell size={18} className="text-slate-400" /><div><p className="font-medium text-slate-700 text-sm">Notificaciones</p><p className="text-xs text-slate-400">Alertas de nuevos turnos</p></div></div>
                        <button onClick={() => setNotifications(!notifications)} className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? UI.primaryBg : 'bg-slate-200'}`}><div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${notifications ? 'left-6' : 'left-1'}`}></div></button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3"><Activity size={18} className="text-slate-400" /><div><p className="font-medium text-slate-700 text-sm">Alto Rendimiento</p><p className="text-xs text-slate-400">Reducir animaciones</p></div></div>
                        <button onClick={() => setDarkMode(!darkMode)} className={`w-10 h-5 rounded-full transition-colors relative ${darkMode ? UI.primaryBg : 'bg-slate-200'}`}><div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${darkMode ? 'left-6' : 'left-1'}`}></div></button>
                    </div>
                </div>
                <div className="pt-2 flex justify-end"><SaveButton onClick={handleSave} /></div>
            </div>
        </motion.div>
    );
};

const SaveButton = ({ onClick }) => {
    const [status, setStatus] = useState('idle');
    const handleClick = async () => { setStatus('loading'); await onClick(); setStatus('success'); setTimeout(() => setStatus('idle'), 2000); };
    return (
        <button disabled={status === 'loading'} onClick={handleClick} className={`${UI.primaryBg} text-white px-5 py-2 rounded-lg font-medium text-xs shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 min-w-[100px] justify-center`}>
            {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : status === 'success' ? <><CheckCircle2 size={14} /> Guardado</> : <><Save size={14} /> Guardar</>}
        </button>
    );
};

const NewAppointmentModal = ({ isOpen, onClose, patients, onSave, executeAction, onNewPatient }) => {
    const [formData, setFormData] = useState({ patientId: '', type: 'Consulta General', time: '', notes: '' });
    useEffect(() => { if (isOpen) setFormData({ patientId: '', type: 'Consulta General', time: '', notes: '' }) }, [isOpen]);
    const handleSave = async () => {
        if (!formData.patientId || !formData.time) return;
        await executeAction(() => {
            const patient = patients.find(p => p.id === parseInt(formData.patientId));
            onSave({ ...formData, patientName: patient?.name || "Desconocido", tags: ["Nuevo"] });
            onClose();
        }, `Turno para ${patients.find(p => p.id === parseInt(formData.patientId))?.name}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/30 md:backdrop-blur-md z-[70]" />
                    <div className="absolute inset-0 z-[80] flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-slate-100 pointer-events-auto"
                        >
                            <div className="flex justify-between items-center mb-6"><h3 className="text-base font-medium text-slate-800">Nuevo Turno</h3><button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-full text-slate-400"><X size={18} /></button></div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-[10px] font-medium text-slate-500 uppercase">Paciente</label>
                                        <button onClick={onNewPatient} className="text-[10px] text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1">+ Nuevo</button>
                                    </div>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-500" value={formData.patientId} onChange={e => setFormData({ ...formData, patientId: e.target.value })}><option value="">Seleccionar...</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Tipo</label><select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}><option>Consulta General</option><option>Control</option><option>Urgencia</option></select></div>
                                    <div><label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Hora</label><input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} /></div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="px-4 py-2 text-slate-500 font-medium text-xs hover:bg-slate-50 rounded-lg">Cancelar</button><SaveButton onClick={handleSave} /></div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

const NewPatientModal = ({ isOpen, onClose, onSave, executeAction }) => {
    const [formData, setFormData] = useState({ name: '', age: '', history: '' });
    useEffect(() => { if (isOpen) setFormData({ name: '', age: '', history: '' }) }, [isOpen]);
    const handleSave = async () => {
        if (!formData.name) return;
        await executeAction(() => {
            onSave(formData);
            onClose();
        }, `Paciente ${formData.name} creado`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/30 md:backdrop-blur-md z-[70]" />
                    <div className="absolute inset-0 z-[80] flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-slate-100 pointer-events-auto"
                        >
                            <div className="flex justify-between items-center mb-6"><h3 className="text-base font-medium text-slate-800">Nuevo Paciente</h3><button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-full text-slate-400"><X size={18} /></button></div>
                            <div className="space-y-4">
                                <div><label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Nombre Completo</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ej: Maria Gonzalez" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Edad</label><input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} placeholder="34" /></div>
                                    <div><label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Nro Historia</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={formData.history} onChange={e => setFormData({ ...formData, history: e.target.value })} placeholder="HC-..." /></div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="px-4 py-2 text-slate-500 font-medium text-xs hover:bg-slate-50 rounded-lg">Cancelar</button><SaveButton onClick={handleSave} /></div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

const PatientHistoryModal = ({ patient, onClose }) => {
    if (!patient) return null;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/30 md:backdrop-blur-md z-[70] flex justify-end">
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto border-l border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <img src={patient.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" alt="" />
                            <div>
                                <h3 className="text-lg font-medium text-slate-800">{patient.name}</h3>
                                <div className="flex gap-2 text-xs text-slate-500">
                                    <span>{patient.history}</span>
                                    <span>•</span>
                                    <span>{patient.age} años</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <ActivitySquare size={14} className="text-sky-500" />
                                Evolución Clínica
                            </h4>
                            <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-1.5">
                                {MOCK_HISTORY.map((item, i) => (
                                    <div key={i} className="relative pl-6 pb-2">
                                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-sky-400"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-xs font-medium text-slate-700">{item.type}</span>
                                            <span className="text-[10px] text-slate-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            {item.note}
                                        </p>
                                        <div className="mt-1 text-[10px] text-slate-400 font-medium">{item.doctor}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <ImageIcon size={14} className="text-purple-500" />
                                Estudios Adjuntos
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="aspect-square bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative group overflow-hidden interactive">
                                    <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=300&h=300" alt="X-Ray" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-[10px] translate-y-full group-hover:translate-y-0 transition-transform">
                                        Radiografía Tórax
                                    </div>
                                </div>
                                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-100 transition-colors interactive">
                                    <Plus size={20} />
                                    <span className="text-[10px] font-medium">Adjuntar</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                            Nueva Evolución
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ==========================================
// 8. MAIN COMPONENT (ROOT)
// ==========================================

export default function MedDashboardPreview() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [patients, setPatients] = useState(INITIAL_PATIENTS);
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [toasts, setToasts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
    const addToast = (toast) => { const id = Date.now(); setToasts(prev => [...prev, { ...toast, id }]); setTimeout(() => removeToast(id), 4000); };
    const { execute } = useSimulatedAction(addToast);

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const stats = useMemo(() => {
        const totalPatients = patients.length;
        const totalAppointments = appointments.length;
        const revenue = totalAppointments * 1500;
        return [
            { title: "Ingresos", value: `$${(revenue / 1000).toFixed(1)}k`, trend: "+12.5%", isPositive: true, icon: TrendingUp, bg: "bg-emerald-500/10", text: "text-emerald-600" },
            { title: "Pacientes", value: totalPatients, trend: "+3.2%", isPositive: true, icon: Users, bg: "bg-blue-500/10", text: "text-blue-600" },
            { title: "Turnos", value: totalAppointments, trend: "+5%", isPositive: true, icon: CalendarDays, bg: "bg-violet-500/10", text: "text-violet-600", rawValue: totalAppointments },
            { title: "Cancelados", value: "2.1%", trend: "-0.5%", isPositive: true, icon: XCircle, bg: "bg-rose-500/10", text: "text-rose-600" },
        ];
    }, [patients, appointments]);

    const handleAddAppointment = (newApt) => {
        setAppointments(prev => [{ id: Date.now(), ...newApt, date: new Date().toISOString(), status: 'Confirmado' }, ...prev]);
    };

    const handleAddPatient = (newPatient) => {
        setPatients(prev => [...prev, { ...newPatient, id: Date.now(), status: "Activo", avatar: `https://ui-avatars.com/api/?name=${newPatient.name}&background=random` }]);
    };

    if (!mounted) return null;

    return (
        // Estructura aplanada: Un solo contenedor padre con el gradiente.
        // Sidebar y Contenido son hijos directos.
        // Importante: relative para que los modales (absolute) se queden dentro de ESTE componente y no tapen el browser header del DemoSection.
        <div className="w-full h-full font-sans text-slate-600 bg-gradient-to-br from-white to-sky-100 flex overflow-hidden relative">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <NewAppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} patients={patients} onSave={handleAddAppointment} executeAction={execute} onNewPatient={() => { setIsModalOpen(false); setIsNewPatientModalOpen(true); }} />
            <PatientHistoryModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
            <NewPatientModal isOpen={isNewPatientModalOpen} onClose={() => setIsNewPatientModalOpen(false)} onSave={handleAddPatient} executeAction={execute} />

            {/* Sidebar ahora es hijo directo, con padding propio si es necesario */}
            <div className="h-full z-20 p-4">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            </div>

            {/* Contenido Principal */}
            <motion.div
                className={`flex-1 flex flex-col h-full overflow-hidden relative`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Fondo Decorativo */}
                <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${UI.primaryBg}/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3`}></div>

                <div className="relative z-10 p-4 sm:p-6 pb-0"><TopBar title={activeTab === 'dashboard' ? 'Panel General' : activeTab === 'agenda' ? 'Agenda' : activeTab === 'patients' ? 'Pacientes' : 'Ajustes'} setMobileOpen={setMobileOpen} /></div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-0 relative z-10 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && <DashboardView key="dashboard" stats={stats} appointments={appointments} />}
                        {activeTab === 'agenda' && <AgendaView key="agenda" appointments={appointments} onAddAppointment={() => setIsModalOpen(true)} />}
                        {activeTab === 'patients' && <PatientsView key="patients" patients={patients} onSelectPatient={setSelectedPatient} onAddPatient={() => setIsNewPatientModalOpen(true)} />}
                        {activeTab === 'settings' && <SettingsView key="settings" executeAction={execute} />}
                        {activeTab === 'analytics' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center h-64 text-slate-400 text-sm"><p>Módulo de Analítica en desarrollo...</p></motion.div>}
                    </AnimatePresence>
                </div>
            </motion.div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.4); }
      `}</style>
        </div>
    );
}