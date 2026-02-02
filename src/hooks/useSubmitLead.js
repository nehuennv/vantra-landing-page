import { useState } from 'react';
// 🔥 IMPORTANTE: Traemos nuestra utilidad de tracking
import { trackEvent } from '../lib/meta-pixel';

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
            // No loguear el token completo por seguridad, solo si existe o los primeros caracteres
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

            // 🔥 TRACKING DE META (FACEBOOK)
            // Disparamos el evento 'Lead' solo si la API guardó el contacto
            trackEvent('Lead', {
                content_name: 'Formulario Vantra Web',
                currency: 'USD',
                value: 0, // Puedes poner un valor estimado si quieres (ej: 10)
                status: 'submitted_success'
            });

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