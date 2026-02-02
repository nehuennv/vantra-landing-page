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

        // 1. MAPEO DE DATOS
        const payload = {
            nombre: data.nombre,
            email: data.email,
            celular: data.celular,
            // Opcionales
            opcion_interes: data.opcion || data.opcion_interes || null,
            dolor_principal: data.dolor_principal || null,
            nicho: data.nicho || null
        };

        try {
            // Leemos las variables de entorno
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiToken = import.meta.env.VITE_API_TOKEN;

            // DEBUG: Ver qué está llegando realmente en producción
            console.log("--- DEBUG VANTRA ---");
            console.log("VITE_API_URL:", apiUrl);
            // No loguear el token completo por seguridad
            console.log("VITE_API_TOKEN exists:", !!apiToken);
            console.log("Env keys:", Object.keys(import.meta.env));
            console.log("--------------------");

            // --- VALIDACIÓN DE SEGURIDAD ---
            if (!apiToken) {
                throw new Error("Error de configuración: Falta el API Token.");
            }

            // --- MODO PRODUCCIÓN (Petición Real) ---
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiToken}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Manejo especial para error de Token (401)
                if (response.status === 401) {
                    throw new Error("No autorizado. Verifica el API Token.");
                }

                const errorData = await response.json().catch(() => ({}));
                if (errorData.details && errorData.details.fieldErrors) {
                    const firstErrorKey = Object.keys(errorData.details.fieldErrors)[0];
                    throw new Error(errorData.details.fieldErrors[firstErrorKey][0]);
                }
                throw new Error('Error al procesar la solicitud.');
            }

            // ✅ ÉXITO: La API respondió correctamente

            // 🔥 TRACKING DE META (FACEBOOK) - Integración Directa
            // Usamos window.fbq porque el script ya está cargado en el HTML global
            if (window.fbq) {
                console.log("📡 Enviando evento Lead a Facebook...");
                window.fbq('track', 'Lead', {
                    content_name: 'Formulario Vantra Web',
                    currency: 'USD',
                    value: 0, // Valor opcional del lead
                    status: 'submitted_success'
                });
            } else {
                console.warn("⚠️ Pixel de Facebook no detectado (posible bloqueo por AdBlock)");
            }

            setSuccess(true);
            return true;

        } catch (err) {
            console.error("API Error:", err);
            setError(err.message || "Hubo un problema de conexión.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submitLead, loading, success, error, reset: () => setSuccess(false) };
};