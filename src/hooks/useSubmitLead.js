import { useState } from 'react';

/**
 * Hook de conexión con API Vantra (Secured)
 * Endpoint: /v1/vantra/clients
 * Auth: Bearer Token
 */
export const useSubmitLead = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const submitLead = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // 1. MAPEO DE DATOS COMPLETO
        const payload = {
            nombre: data.nombre,
            email: data.email,
            celular: data.celular,
            opcion_interes: data.opcion || data.opcion_interes || null,
            dolor_principal: data.dolor_principal || null,
            nicho: data.nicho || null
        };

        try {
            // -------------------------------------------------------
            // 🚨 PASO 1 (PRIORITARIO): TRACKING DE META (FACEBOOK)
            // -------------------------------------------------------
            // Lo ejecutamos ANTES del fetch para asegurar que el evento salga
            // aunque el backend de error por "Usuario Duplicado" o "Error 500".
            if (window.fbq) {


                // Enviamos la versión COMPLETA con metadatos para mejor calidad de lead
                window.fbq('track', 'Lead', {
                    content_name: 'Formulario Vantra Web',
                    currency: 'USD',
                    value: 0,
                    status: 'submitted_form',
                    content_category: payload.nicho || 'General' // Extra: Categorizamos por nicho si existe
                });
            } else {
                console.warn("⚠️ Pixel no detectado (Posible AdBlock), continuamos con el guardado.");
            }

            // -------------------------------------------------------
            // 🚨 PASO 2: GUARDADO EN BASE DE DATOS (BACKEND)
            // -------------------------------------------------------

            // Leemos las variables de entorno
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiToken = import.meta.env.VITE_API_TOKEN;

            // Validación básica de config
            if (!apiToken) throw new Error("Error de configuración: Falta el API Token.");

            // Petición Real
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiToken}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Si el backend falla, intentamos leer el error específico
                // (Ej: "El email ya está registrado")
                const errorData = await response.json().catch(() => ({}));

                if (response.status === 401) throw new Error("No autorizado. Token inválido.");
                if (response.status === 409) throw new Error("El usuario ya está registrado (Email o teléfono duplicado).");

                if (errorData.details && errorData.details.fieldErrors) {
                    const firstErrorKey = Object.keys(errorData.details.fieldErrors)[0];
                    throw new Error(errorData.details.fieldErrors[firstErrorKey][0]);
                }

                throw new Error('No se pudo guardar en la base de datos (pero el aviso llegó).');
            }

            // ✅ ÉXITO TOTAL (Pixel + DB)

            setSuccess(true);
            return true;

        } catch (err) {
            console.error("API Error:", err);
            // Mostramos el error en pantalla para que el usuario sepa qué pasó
            // (Ej: "Ya te registraste con este email")
            setError(err.message || "Hubo un problema de conexión.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submitLead, loading, success, error, reset: () => setSuccess(false) };
};