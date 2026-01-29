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

            // --- MODO SIMULACIÓN (ELIMINADO POR SOLICITUD) ---
            // Se fuerza el paso a producción. Si falta URL o Token, fallará en la validación siguiente o en el fetch.


            // --- VALIDACIÓN DE SEGURIDAD ---
            if (!apiToken) {
                throw new Error("Error de configuración: Falta el API Token.");
            }

            // --- MODO PRODUCCIÓN (Petición Real) ---
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiToken}` // <--- AQUÍ ESTÁ LA MAGIA
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