import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import PresentationSection from './sections/PresentationSection';
import DemoSection from './sections/DemoSection';
import PricingSection from './sections/PricingSection';
import CTASection from './sections/CTASection';

const ProductLandingTemplate = ({ data }) => {
    const { theme, hero, presentation, problem, solution, demo, pricing, cta } = data;
    const [selectedPlan, setSelectedPlan] = React.useState(null);



    const handlePlanSelect = (planName) => {
        setSelectedPlan(planName);
        setTimeout(() => {
            const element = document.getElementById('consultation-form') || document.getElementById('cta-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    // Set CSS variables for theme colors
    useEffect(() => {
        if (theme) {
            const root = document.documentElement;
            root.style.setProperty('--product-primary', theme.primary || '#EDF246');
            root.style.setProperty('--product-secondary', theme.secondary || '#ffffff');

            // Calculate RGB for rgba() usage
            // This is a simple helper, assuming hex input
            const hexToRgb = (hex) => {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `${r}, ${g}, ${b}`;
            };

            if (theme.primary && theme.primary.startsWith('#')) {
                root.style.setProperty('--product-primary-rgb', hexToRgb(theme.primary));
            }
            root.style.setProperty('--product-on-primary', theme.onPrimary || '#18181b');
        }
    }, [theme]);

    // If no data is provided, return null or a loader
    if (!data) return null;

    return (
        <div className="pt-20 min-h-screen text-white overflow-hidden selection:bg-[color:var(--product-primary)] selection:text-black font-sans">

            {/* Dynamic Background Wrapper */}
            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">

                {/* Default Glow Effects (Only shown if no global background overrides, but for now we keep them as accent) */}
                {/* Actually, user wants the IMAGE. If GlobalAuroraBackground is showing the image, we don't need glows blocking it? 
                   But GlobalAuroraBackground is BEHIND everything. 
                   If we leave glows, they will overlay the global background image.
                   The template originally had glows. 
                   If the user wants "just the background", we should probably hide the template glows on /med?
                   Currently, the template doesn't know about /med.
                   But we essentially "removed" the opaque background of the template by removing 'bg-vantra-bg'.
                   We can just comment out the glows or leave them as subtle accents.
                   Let's keep them but make them conditional or just leave them if they look good.
                   Wait, the previous logic replaced glows with image.
                   If I leave glows, they will appear ON TOP of the global image.
                   Maybe I should remove the glows entirely if the goal is the image?
                   Let's remove the glows for now or check if data has a flag.
                   Actually, let's just stick to the clean revert but minus the background color. 
                */}

                <div
                    className="absolute top-[-20%] left-[20%] w-[900px] h-[900px] rounded-full blur-[130px] opacity-20 transition-colors duration-1000"
                    style={{ backgroundColor: 'var(--product-primary)' }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-15 transition-colors duration-1000"
                    style={{ backgroundColor: 'var(--product-primary)' }}
                />




            </div>

            <div className="relative z-10">

                {hero && <HeroSection data={hero} theme={theme} />}

                {problem && <ProblemSection data={problem} theme={theme} />}

                {presentation && <PresentationSection data={presentation} theme={theme} />}

                {solution && <SolutionSection data={solution} theme={theme} />}

                {demo && <DemoSection data={demo} theme={theme} />}

                {pricing && <PricingSection data={pricing} theme={theme} onPlanSelect={handlePlanSelect} />}

                <div id="cta-section">
                    {cta && <CTASection data={cta} theme={theme} preSelectedPlan={selectedPlan} />}
                </div>

            </div>
        </div>
    );
};

export default ProductLandingTemplate;
