import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BackgroundImage from '../../assets/complete-background.webp';
import MedicalImage from '../../assets/complete-background-medical.webp';

const GlobalAuroraBackground = () => {
    const location = useLocation();

    // Determine which background to show
    const isMedPage = location.pathname === '/med';
    const activeImage = isMedPage ? MedicalImage : BackgroundImage;
    const activeKey = isMedPage ? 'med-bg' : 'home-bg';


    return (
        // OPTIMIZATION FIXED: Use Flexbox for centering to avoid transform conflicts
        <div
            className="fixed inset-0 z-[-1] overflow-hidden bg-[#050507] pointer-events-none flex items-center justify-center"
            style={{ contentVisibility: 'auto' }}
        >

            {/* DARK BASE ATMOSPHERE */}
            <div className="absolute inset-0 bg-[#050507]" />

            {/* BAKED ASSET LAYER */}
            <div className="relative w-full h-full">
                <div
                    className="w-full h-full relative"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={activeKey}
                            src={activeImage}
                            alt=""
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            decoding="async"
                            loading="eager"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* NOISE OVERLAY */}

            <div
                className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAA5OTkAAABMTExERERmZmYzMzMyMjJ4D30DAAAAB3RSTlMABw8XIzM3R0+jMQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfmAwIIJh4zBUe7AAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpdGggR0lNUGQuZQcAAACWSURBVDjLrdDBDcQwDAPBQA2k/16GgP3XgfuI3L0zSF8fDxbC+Xh+fL9+j+fH8+P79Xs8P54f36/f4/nx/Ph+/R7Pj+fH8+H79Hs+P54f36/f4/nx/fo9nh/Pj+/X7/H8eH58v36P58fz4/v1ezw/nh/fr9/j+fH8+H79Hs+P58f36/d4fjw/vl+/x/Pj+fH9+j2eH8+P79fv8fzwA583X15t937hAAAAAElFTkSuQmCC")`,
                    backgroundRepeat: 'repeat',
                    willChange: 'opacity'
                }}
            />

        </div >
    );
};

export default GlobalAuroraBackground;
