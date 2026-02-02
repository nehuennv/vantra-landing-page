import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, url, image, keywords }) => {
    const location = useLocation();
    // Para OG Tags usamos el título completo
    const fullTitle = title ? `Vantra | ${title}` : 'Vantra | Software & IA';
    const siteUrl = 'https://vantradigital.com';
    const defaultImage = `${siteUrl}/complete-background.webp`; // Imagen por defecto

    return (
        <Helmet key={location.pathname} defer={false}>
            {/* Título de la pestaña: Usamos fullTitle explícitamente */}
            <title>{fullTitle}</title>

            {/* Metadatos básicos */}
            <meta name="description" content={description} />
            <meta name="author" content="Vantra Digital" />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url || siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
