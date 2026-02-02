// src/lib/meta-pixel.js

// Tu ID de Pixel (extraído del código que te pasó tu jefe)
const PIXEL_ID = '3782601118709297';

/**
 * Inicializa el Pixel de Meta inyectando el script en el head.
 * Solo lo hace una vez para evitar duplicados.
 */
export const initMetaPixel = () => {
    if (typeof window === 'undefined') return; // Seguridad para SSR

    // Evitar reinicializar si ya existe
    if (window.fbq) return;

    // Código base minificado de Facebook (Standard)
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');

    // Inicializar
    window.fbq('init', PIXEL_ID);

    // Track inicial de PageView
    window.fbq('track', 'PageView');
};

/**
 * Dispara un evento estándar de Meta (ej: 'Lead', 'Purchase', 'Contact')
 * @param {string} eventName - Nombre del evento estándar
 * @param {object} options - Datos opcionales (value, currency, etc.)
 */
export const trackEvent = (eventName, options = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, options);

    }
};