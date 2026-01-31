import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LenisScrollHandler = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
};

const NativeScrollHandler = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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