import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image, keywords }) => {
    // Si hay título, "Vantra | Título". Si no (Home), solo "Vantra".
    const pageTitle = title ? `Vantra | ${title}` : 'Vantra';
    const siteUrl = 'https://vantradigital.com';
    const defaultImage = `${siteUrl}/complete-background.webp`; // Imagen por defecto

    return (
        <Helmet>
            {/* Título de la pestaña */}
            <title>{pageTitle}</title>

            {/* Metadatos básicos */}
            <meta name="description" content={description} />
            <meta name="author" content="Vantra Digital" />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url || siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
