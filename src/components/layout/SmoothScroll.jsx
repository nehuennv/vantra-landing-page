import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LenisScrollHandler = () => {
    const { pathname, hash } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            if (hash) {
                // Esperamos a que termine la transición de página (aprox 500ms)
                // y forzamos un recálculo del layout por si cambió la altura
                setTimeout(() => {
                    lenis.resize();
                    lenis.scrollTo(hash, { offset: 0, duration: 1.5, lock: true }); // Lock para evitar interrupciones
                }, 600);
            } else {
                lenis.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname, hash, lenis]);

    return null;
};

const NativeScrollHandler = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

const SmoothScroll = ({ children }) => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
            );
        };
        setIsTouch(checkTouch());
    }, []);

    const lenisOptions = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial (Apple style)
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    };

    if (isTouch) {
        return (
            <div className="w-full min-h-screen">
                <NativeScrollHandler />
                {children}
            </div>
        );
    }

    return (
        <ReactLenis root options={lenisOptions} className="w-full min-h-screen touch-auto">
            <LenisScrollHandler />
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;