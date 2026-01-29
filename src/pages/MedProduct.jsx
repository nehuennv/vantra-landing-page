import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductLandingTemplate from '../components/templates/ProductLandingTemplate';
import { vantraMedData } from '../data/landings/vantra-med.jsx';

export default function MedProduct() {
    return (
        <ProductLandingTemplate data={vantraMedData} />
    );
}
