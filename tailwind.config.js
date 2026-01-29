/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', 'sans-serif'],
                display: ['Righteous', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
                righteous: ['Righteous', 'cursive'],
            },
            colors: {
                vantra: {
                    DEFAULT: '#EDF246',   // Permite usar bg-vantra, text-vantra, border-vantra
                    neon: '#EDF246',      // Tu Amarillo Ácido (Accent Principal)
                    // EL AZUL SUAVE "APPLE" (Usar para brillos secundarios)
                    ice: '#A0E9FF',

                    // LA BASE "PREMIUM DARK" (No es negro, es gris azulado profundo)
                    bg: '#050507',
                    card: '#0A0A0B',
                    surface: '#121214',
                },
                // Alias para que funcione text-dark-900 si se usa en componentes
                dark: {
                    900: '#18181b', // zinc-900
                    base: '#050507', // vantra-bg
                }
            },
            backgroundImage: {
                // EL DEGRADADO QUE QUERÍAS (Amarillo + Azul + Negro)
                'aurora': 'conic-gradient(from 180deg at 50% 50%, #121214 0deg, #0A0A0B 120deg, #1E3A8A 180deg, #A0E9FF 240deg, #EDF246 300deg, #121214 360deg)',
                'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
            },
            boxShadow: {
                // Sombras de luz, no de oscuridad (Glows)
                'glow': '0 0 40px -10px rgba(237, 242, 70, 0.3)',
                'glow-blue': '0 0 40px -10px rgba(160, 233, 255, 0.3)',
            }
        },
    },
    plugins: [],
}