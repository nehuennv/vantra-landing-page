import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, url, image, keywords }) => {
    const location = useLocation();
    // Para OG Tags usamos el título completo
    const fullTitle = title ? `Vantra | ${title}` : 'Vantra | Software & IA';
    const siteUrl = 'https://vantradigital.com';
    const currentUrl = url || `${siteUrl}${location.pathname}`;
    const defaultImage = `${siteUrl}/complete-background.webp`; // Imagen por defecto

    // Schema para Google (Invisible para el usuario)
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": "Vantra Digital",
                "description": "Software a medida e Inteligencia Artificial"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${currentUrl}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": siteUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": title || "Software & IA", // Aquí Google leerá "Medicina", "Equipo", etc.
                        "item": currentUrl
                    }
                ]
            }
        ]
    };

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

            {/* INYECCIÓN DE SCHEMA PARA GOOGLE */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
