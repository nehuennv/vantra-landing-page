import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GlobalCursor = () => {
    // 1. Coordenadas reactivas (sin useState)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 2. Física de resorte para el Aura (The Ghost) -> AHORA MÁS RÍGIDO
    // stiffness alto y mass bajo para que siga rápido y sin "shadow lag"
    const springConfig = { damping: 35, stiffness: 400, mass: 0.2 };
    const auraX = useSpring(mouseX, springConfig);
    const auraY = useSpring(mouseY, springConfig);

    // 3. Escala reactiva (MotionValues para evitar re-renders)
    const cursorScale = useMotionValue(1);
    const cursorScaleSpring = useSpring(cursorScale, { damping: 20, stiffness: 300 });

    // Estado para visibilidad (montaje/desmontaje en touch devices)
    const [isVisible, setIsVisible] = useState(false);

    // Inicialización Lazy para evitar el "Flash" en mobile
    const [isTouchDevice, setIsTouchDevice] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(pointer: coarse)').matches;
        }
        return false;
    });

    useEffect(() => {
        // Detectar cambios en resize (por si rota la tablet o conecta mouse)
        const checkTouch = () => {
            setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        };
        window.addEventListener('resize', checkTouch);

        // Event Listeners de Mouse
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            // Mostrar cursor si se mueve (por si estaba oculto)
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => cursorScale.set(0.8);
        const handleMouseUp = () => cursorScale.set(1);

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Detección de interactivos (Delegación Optimizada)
        // Usamos Capture Phase para interceptar antes y matches para chequear rápido.
        const handleMouseOver = (e) => {
            const target = e.target;

            // Comprobación simple y rápida: Elemento directo o padre inmediato
            // Evitamos .closest() que recorre todo el árbol hacia arriba
            const isInteractive =
                target.matches?.('a, button, input, textarea, .interactive') ||
                target.parentElement?.matches?.('a, button, input, textarea, .interactive');

            if (isInteractive) {
                cursorScale.set(1.5);
                document.body.classList.add('cursor-hover');
            } else {
                cursorScale.set(1);
                document.body.classList.remove('cursor-hover');
            }
        };

        if (!isTouchDevice) {
            // Listeners pasivos y optimizados
            window.addEventListener('mousemove', moveMouse, { passive: true });
            window.addEventListener('mousedown', handleMouseDown, { passive: true });
            window.addEventListener('mouseup', handleMouseUp, { passive: true });
            document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
            document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

            // DELEGACIÓN EN CAPTURE PHASE: 
            // Detecta el evento bajando desde window hacia el target, evitando problemas con stopPropagation en hijos
            window.addEventListener('mouseover', handleMouseOver, { passive: true, capture: true });

            setIsVisible(true);
        }

        return () => {
            window.removeEventListener('resize', checkTouch);
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);

            // Cleanup correcto
            window.removeEventListener('mouseover', handleMouseOver, { capture: true });
            document.body.classList.remove('cursor-hover');
        };
    }, [cursorScale, mouseX, mouseY, isVisible, isTouchDevice]);

    // Si es touch device, no renderizamos nada
    if (isTouchDevice) return null;

    // Renderizar en el body
    return createPortal(
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[200000] mix-blend-exclusion transform-gpu"
            style={{
                opacity: isVisible ? 1 : 0,
                // Usamos una transición suave para la opacidad
                transition: "opacity 0.2s ease",
            }}
        >
            {/* 1. NÚCLEO (The Pointer) - Instantáneo */}
            <motion.div
                className="absolute rounded-full bg-[#EDF246] transform-gpu"
                style={{
                    width: 8,
                    height: 8,
                    x: mouseX, // Sigue al mouse directamente (sin spring)
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    translateY: '-50%',
                    // willChange removed
                }}
            />

            {/* 2. AURA (The Ring) - Con Spring Physics Tight */}
            <motion.div
                className="absolute rounded-full border border-[#EDF246]/50 transform-gpu" // Borde fino en lugar de fill
                style={{
                    width: 32,
                    height: 32,
                    x: auraX,
                    y: auraY,
                    scale: cursorScaleSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    // QUITAMOS EL BLUR
                    // willChange removed
                }}
            />
        </motion.div>,
        document.body
    );
};

export default GlobalCursor;
