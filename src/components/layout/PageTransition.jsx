import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import Footer from './Footer';

const PageTransition = ({ children }) => {
    const { pathname, hash } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        // Al montar la página (después de que la anterior se fue por mode="wait"), reseteamos el scroll
        const scrollToTop = () => {
            if (lenis) {
                // Lógica para Lenis
                if (hash) {
                    // Pequeño timeout para asegurar que el DOM esté listo
                    setTimeout(() => {
                        lenis.scrollTo(hash, { offset: 0, immediate: false, lock: true });
                    }, 100);
                } else {
                    lenis.scrollTo(0, { immediate: true });
                }
            } else {
                // Lógica Nativa (Mobile)
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
            }
        };

        scrollToTop();
    }, [pathname, hash, lenis]);

    // Lógica para mostrar footer (copiada de App.jsx original)
    const showFooter = !pathname.includes('/resto');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{
                opacity: 0,
                y: -20,
                filter: 'blur(5px)',
                transition: { duration: 0.25, ease: "easeIn" } // Exit rápido (< 0.3s)
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col min-h-screen" // Flex column & min-h-screen for sticky footer
        >
            <div className="flex-grow w-full">
                {children}
            </div>

            {showFooter && <Footer />}
        </motion.div>
    );
};

export default PageTransition;
