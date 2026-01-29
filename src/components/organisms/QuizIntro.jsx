import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Activity, Clock } from 'lucide-react';
import Button from '../ui/Button';

const QuizIntro = ({ onStart }) => {
    return (
        <div className="w-full h-full min-h-[480px] p-2 flex flex-col justify-between">

            {/* --- HEADER --- */}
            <div>
                <h3 className="text-xl font-medium text-white mb-2">
                    ¿Tu consultorio depende 100% de tu WhatsApp?
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    En Vantra desarrollamos sistemas de previsibilidad. En menos de 2 minutos, vamos a identificar <strong>dónde se está perdiendo tiempo y dinero</strong> en tu operación diaria y qué sistema (A, B o C) necesitás para solucionarlo.
                </p>
            </div>

            {/* --- VISUAL CUES (Puntos de dolor) --- */}
            <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 flex items-start gap-4">
                    <div className="mt-1 p-2 bg-zinc-950/50 rounded-lg border border-white/10 text-zinc-400">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-zinc-200 text-sm font-medium mb-1">Análisis de Tiempo</p>
                        <p className="text-zinc-500 text-xs">Calculamos cuánto tiempo operativo podrías recuperar.</p>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 flex items-start gap-4">
                    <div className="mt-1 p-2 bg-zinc-950/50 rounded-lg border border-white/10 text-zinc-400">
                        <Activity size={18} />
                    </div>
                    <div>
                        <p className="text-zinc-200 text-sm font-medium mb-1">Escalabilidad</p>
                        <p className="text-zinc-500 text-xs">Determinamos si estás listo para automatizar.</p>
                    </div>
                </div>
            </div>

            {/* --- CTA --- */}
            <div className="mt-auto">
                <Button
                    onClick={onStart} // Esta función la pasaremos luego para iniciar el quiz
                    className="w-full py-4 text-base font-bold text-white rounded-xl flex items-center justify-center gap-3 group active:scale-[0.98] transition-all relative overflow-hidden"
                    style={{
                        backgroundColor: 'var(--product-primary)',
                        color: '#fff',
                        border: 'none',
                        // Sombra sutil en el color primario, nada de verde ácido
                        boxShadow: '0 0 30px -10px var(--product-primary-opacity-30, rgba(14, 165, 233, 0.3))'
                    }}
                >
                    <span>Iniciar Diagnóstico</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-center text-xs text-zinc-600 mt-3">
                    Sin costo • Análisis inmediato • Privado
                </p>
            </div>
        </div>
    );
};

export default QuizIntro;