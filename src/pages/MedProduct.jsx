import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductLandingTemplate from '../components/templates/ProductLandingTemplate';
import { vantraMedData } from '../data/landings/vantra-med.jsx';
import SEO from '../components/layout/SEO';

export default function MedProduct() {
    return (
        <>
            <SEO
                title="Medicina"
                description="La evolución de tu consultorio. Gestión inteligente de pacientes y turnos automatizados con IA. Moderniza la experiencia médica con una plataforma intuitiva."
                image="https://vantradigital.com/complete-background-medical.webp"
                keywords="Software Médico IA, Historia Clínica Digital, Turnos Online, Automatización Clínicas, Salud Digital"
                url="https://vantradigital.com/med"
            />

            <ProductLandingTemplate data={vantraMedData} />
        </>
    );
}