import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import LogoCompleto from '../../assets/logo/logo-completo.svg';
// Importamos los assets pesados para precargarlos
const BackgroundHome = "/complete-background.webp";
const BackgroundMed = "/complete-background-medical.webp";

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const progressMv = useMotionValue(0);

    useEffect(() => {
        // Lista de assets críticos que deben estar listos antes de mostrar la web
        const assets = [LogoCompleto, BackgroundHome, BackgroundMed];
        let loadedCount = 0;

        const preloadImages = async () => {
            const promises = assets.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;

                    // Cuando carga (o si falla), avanzamos igual para no bloquear
                    img.onload = () => {
                        loadedCount++;
                        updateProgress();
                        resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        updateProgress();
                        resolve();
                    };
                });
            });

            await Promise.all(promises);

            // Forzamos el 100% al final y ejecutamos la salida
            animate(progressMv, 100, {
                duration: 0.5,
                onUpdate: (latest) => setProgress(Math.floor(latest)),
                onComplete: () => {
                    // Pequeño delay para disfrutar el 100%
                    setTimeout(onComplete, 200);
                }
            });
        };

        const updateProgress = () => {
            const target = (loadedCount / assets.length) * 100;
            // Animamos hacia el nuevo porcentaje suavemente
            animate(progressMv, target, {
                duration: 0.5,
                onUpdate: (latest) => setProgress(Math.floor(latest))
            });
        };

        preloadImages();

        // Limpieza si el componente se desmonta
        return () => progressMv.stop();
    }, [onComplete, progressMv]);

    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                filter: "blur(10px)", // Blur de salida suave
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className="relative z-10 flex flex-col items-center">
                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <img
                        src={LogoCompleto}
                        alt="Vantra"
                        className="w-48 md:w-64 h-auto drop-shadow-2xl"
                    />
                </motion.div>

                {/* BARRA DE PROGRESO */}
                <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#EDF246] shadow-[0_0_10px_#EDF246]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* TEXTO DE ESTADO */}
                <motion.span
                    className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Cargando {progress}%
                </motion.span>
            </div>
        </motion.div>
    );
};

export default SplashScreen;