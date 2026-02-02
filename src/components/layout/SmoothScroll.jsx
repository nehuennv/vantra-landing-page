import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

const SmoothScroll = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Una detección más robusta basada en el User Agent y Touch
        const checkMobile = () => {
            const ua = navigator.userAgent;
            const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
            return isTouch && isMobileUA; // Combinación para evitar laptops touch
        };

        setIsMobile(checkMobile());
    }, []);

    // Opciones optimizadas para Desktop
    const lenisOptions = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial (Apple style)
        smoothWheel: true,
        wheelMultiplier: 1,
        // Forzamos que en touch NO haga nada de smooth artificial
        touchMultiplier: 0,
        smoothTouch: false,
    };

    // Si es mobile, devolvemos el contenido limpio. 
    // El scroll nativo de iOS/Android es lo que mejor funciona en Instagram.
    if (isMobile) {
        return (
            <div className="w-full relative isolate">
                {children}
            </div>
        );
    }

    return (
        <ReactLenis root options={lenisOptions} className="w-full min-h-screen touch-auto">
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;