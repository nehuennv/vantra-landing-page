import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollHandler = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
};

const SmoothScroll = ({ children }) => {
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

    return (
        <ReactLenis root options={lenisOptions} className="w-full min-h-screen touch-auto">
            <ScrollHandler />
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;