import { motion } from 'framer-motion';

const GlobalSpotlight = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* 
               DUAL LAYER DOTS SYSTEM 
               Solves "Empty Corners" and "Tilted Container" perception.
            */}

            {/* LAYER 1: THE BASE (Static Structure)
                Ocupa el 100% de la pantalla siempre.
                Da la sensación de "Contenedor Derecho" que pide el usuario.
                Opacidad muy baja para que no ensucie.
            */}
            <div
                className="absolute inset-0 bg-transparent"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                    opacity: 0.03, // Muy sutil, solo para marcar el territorio
                }}
            />

            {/* LAYER 2: THE WAVE (The Scanner)
                La línea de luz que recorre la estructura.
            */}
            <motion.div
                className="absolute inset-0 bg-transparent will-change-[mask-position] transform-gpu"
                style={{
                    // El mismo patrón, perfectamente alineado
                    backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',

                    // Alta visibilidad para el efecto de luz
                    opacity: 0.25,

                    // THE MASK (Razor Thin Line)
                    // Linear Gradient Diagonal
                    maskImage: 'linear-gradient(120deg, transparent 40%, black 50%, transparent 60%)',
                    WebkitMaskImage: 'linear-gradient(120deg, transparent 40%, black 50%, transparent 60%)',

                    // Size: Gigante para permitir el recorrido completo
                    maskSize: '300% 300%',
                    WebkitMaskSize: '300% 300%',

                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                }}
                animate={{
                    // De esquina a esquina (-100% a 200% asegura cobertura total)
                    maskPosition: ['-50% -50%', '150% 150%'],
                    WebkitMaskPosition: ['-50% -50%', '150% 150%'],
                }}
                transition={{
                    duration: 2.5, // Mucho más rápido, estilo scanner activo
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5 // Breve pausa para respiro
                }}
            />
        </div>
    );
};

export default GlobalSpotlight;
