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
                description="Moderniza tu clínica con Vantra Medicina. Gestión de pacientes, turnos online y recetas digitales en una plataforma segura."
                image="https://vantradigital.com/complete-background-medical.webp"
                keywords="software médico, historia clínica digital, turnos online, recetas digitales, gestión clínica"
                url="https://vantradigital.com/med"
            />

            <ProductLandingTemplate data={vantraMedData} />
        </>
    );
}