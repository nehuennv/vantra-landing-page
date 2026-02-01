import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorCore = () => {
    // 1. Coordenadas reactivas (sin useState)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 2. Física de resorte para el Aura (The Ghost)
    const springConfig = { damping: 35, stiffness: 400, mass: 0.2 };
    const auraX = useSpring(mouseX, springConfig);
    const auraY = useSpring(mouseY, springConfig);

    // 3. Escala reactiva
    const cursorScale = useMotionValue(1);
    const cursorScaleSpring = useSpring(cursorScale, { damping: 20, stiffness: 300 });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => cursorScale.set(0.8);
        const handleMouseUp = () => cursorScale.set(1);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleMouseOver = (e) => {
            const target = e.target;
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

        window.addEventListener('mousemove', moveMouse, { passive: true });
        window.addEventListener('mousedown', handleMouseDown, { passive: true });
        window.addEventListener('mouseup', handleMouseUp, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true, capture: true });

        setIsVisible(true);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', handleMouseOver, { capture: true });
            document.body.classList.remove('cursor-hover');
        };
    }, [cursorScale, mouseX, mouseY, isVisible]);

    return createPortal(
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[200000] mix-blend-exclusion transform-gpu"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.2s ease",
            }}
        >
            <motion.div
                className="absolute rounded-full bg-[#EDF246] transform-gpu"
                style={{
                    width: 8, height: 8,
                    x: mouseX, y: mouseY,
                    translateX: '-50%', translateY: '-50%',
                }}
            />
            <motion.div
                className="absolute rounded-full border border-[#EDF246]/50 transform-gpu"
                style={{
                    width: 32, height: 32,
                    x: auraX, y: auraY,
                    scale: cursorScaleSpring,
                    translateX: '-50%', translateY: '-50%',
                }}
            />
        </motion.div>,
        document.body
    );
};

const GlobalCursor = () => {
    // Estado simple para checkear capability
    const [isTouchDevice, setIsTouchDevice] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(pointer: coarse)').matches;
        }
        return false;
    });

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        };
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Si es touch, NO RENDERIZAMOS NADA (ni siquiera los hooks de spring se inicializan)
    if (isTouchDevice) return null;

    return <CursorCore />;
};

export default GlobalCursor;


