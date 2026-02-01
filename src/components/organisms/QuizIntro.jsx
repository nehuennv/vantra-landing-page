import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Activity, Clock } from 'lucide-react';
import Button from '../ui/Button';

const QuizIntro = ({ onStart }) => {
    return (
        <div className="w-full h-full flex flex-1 flex-col pt-6  md:px-0">

            {/* --- HEADER --- */}
            <div className="space-y-4 mb-8">

                <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-sm">
                    Descubrí en 2 minutos qué sistema necesita tu negocio para escalar sin caos operativo.
                </p>
            </div>

            {/* --- VISUAL CUES (Puntos de dolor) --- */}
            <div className="grid grid-cols-1 gap-4">
                <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-5 hover:border-white/10 hover:shadow-lg">
                    <div className="p-3.5 bg-white/5 rounded-xl text-[var(--product-primary)] border border-white/10 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-white text-base font-bold mb-1 group-hover:text-[var(--product-primary)] transition-colors">Análisis de Tiempo</p>
                        <p className="text-zinc-500 text-sm">Calculá cuánto tiempo operativo podés recuperar por mes.</p>
                    </div>
                </div>

                <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-5 hover:border-white/10 hover:shadow-lg">
                    <div className="p-3.5 bg-white/5 rounded-xl text-[var(--product-primary)] border border-white/10 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-white text-base font-bold mb-1 group-hover:text-[var(--product-primary)] transition-colors">Escalabilidad</p>
                        <p className="text-zinc-500 text-sm">Medí tu aptitud actual para automatizar procesos.</p>
                    </div>
                </div>
            </div>

            {/* --- CTA --- */}
            <div className="mt-auto">
                <Button
                    onClick={onStart}
                    className="w-full h-16 text-lg font-bold text-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:brightness-110 shadow-[0_0_40px_-10px_rgba(var(--product-primary-rgb),0.5)] group"
                    style={{
                        backgroundColor: 'var(--product-primary)'
                    }}
                >
                    <span className="tracking-wide">Iniciar Diagnóstico</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
};

export default QuizIntro;