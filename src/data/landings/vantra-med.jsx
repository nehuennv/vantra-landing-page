import DemoTriggerWrapper from '../../components/previews/DemoTriggerWrapper';

export const vantraMedData = {
    theme: {
        primary: '#38bdf8', // Sky-400 (Celeste más claro/suave)
        onPrimary: '#ffffff', // White text on buttons
        secondary: '#ffffff'
    },
    hero: {
        badge: 'EL NUEVO ESTÁNDAR',
        title: 'Tu consultorio, <span style="color:var(--product-primary)">automatizado.</span>',
        subtitle: 'Unificamos <span class="text-white font-medium">Agenda, WhatsApp e Historial</span> en una plataforma que gestiona tus pacientes en piloto automático. Menos tareas administrativas, más <span class="text-white font-medium">medicina real.</span>',
        mobileSubtitle: 'Unificamos <span class="text-white font-medium">Agenda, WhatsApp e Historial</span> en una plataforma que gestiona tus pacientes en piloto automático.',
        benefits: ['Respuestas inmediatas', 'Agenda blindada', 'Historial ordenado', 'Cero ausentismo'],
        cta: {
            primary: { text: 'Agendar llamada', href: '#cta-section' },
            secondary: { text: 'Ver Demo Interactiva', href: '#demo-section' }
        }
    },
    presentation: {
        layout: 'split-right',
        title: 'Orden operativo y clínico.',
        subtitle: 'NUESTRA SOLUCIÓN',
        paragraph: 'No somos solo un bot de turnos. Centralizamos la información del paciente para eliminar papeles y notas sueltas. Desde que te escriben hasta que los atendés, todo queda organizado en un flujo lógico.',
        items: [
            { title: 'WhatsApp Automático', description: 'Responde y filtra consultas sin interrumpirte.' },
            { title: 'Agenda Viva', description: 'Confirmaciones y reprogramaciones solas.' },
            { title: 'Historial Centralizado', description: 'Cada turno está asociado a la ficha del paciente.' },
            { title: 'Dashboard', description: 'Panorama claro de qué pasó y qué falta hacer hoy.' }
        ]
    },
    problem: {
        layout: 'centered',
        // Nota: El componente visualmente usa un título corto hardcodeado ("No es solo la agenda..."), 
        // pero dejamos este aquí por si decides usarlo dinámicamente.
        title: 'El caos no está solo en la agenda: está en la información.',
        subtitle: 'EL DOLOR REAL',
        paragraph: 'Un turno sin confirmar es plata perdida. Pero atender sin saber el contexto del paciente es un riesgo médico. Cuando WhatsApp y la Historia Clínica viven separados, perdés el control.',
        items: [
            {
                title: "Datos Dispersos",
                description: "Agendás el turno pero perdés la ficha. La información clínica queda separada de la operativa."
            },
            {
                title: "Sistemas Obsoletos",
                description: "Fichas en papel, notas de celular o software viejo. La información crítica nunca está a mano."
            },
            {
                title: "Falta de Contexto",
                description: "Atendés a ciegas. No saber el motivo de la visita ni el historial previo daña tu autoridad."
            },
            {
                title: "Dependencia Humana",
                description: "Todo el flujo depende de tu memoria o de una secretaria saturada. Si alguien falla, perdés plata."
            }
        ],
        quote: 'El problema no es solo llenar la agenda: es atender con la información ordenada.'
    },
    solution: {
        layout: 'split-left',
        title: 'Una sola estructura. Mayor control.',
        subtitle: 'LA SOLUCIÓN',
        paragraph: 'Conectamos la atención, la agenda y el historial en un mismo lugar. Cuando un paciente escribe, el sistema lo atiende, lo agenda y busca su historial. Al momento de la consulta, tenés todo el contexto listo.',
        items: [
            { title: 'Trazabilidad', description: 'Cada mensaje de WhatsApp queda registrado.' },
            { title: 'Cero olvidos', description: 'Recordatorios automáticos para vos y el paciente.' },
            { title: 'Contexto inmediato', description: 'Ficha del paciente a un clic del turno.' },
            { title: 'Continuidad', description: 'El consultorio sigue funcionando mientras vos atendés.' }
        ]
    },
    demo: {
        title: 'Probá Vantra en tiempo real.',
        subtitle: 'Esta es una muestra visual simplificada. La plataforma completa incluye historial clínico detallado, facturación y métricas avanzadas.',
        component: <DemoTriggerWrapper />
    },
    pricing: {
        title: 'Tres niveles de orden para tu consultorio.',
        subtitle: 'Elegí la etapa en la que estás hoy.',
        plans: [

            {
                title: 'Automatización + Control',
                highlight: false,
                description: 'Para consultorios que necesitan resolver el lío de turnos y WhatsApp.',
                features: ['WhatsApp automatizado + Agenda', 'Panel de turnos y estados', 'Ficha de paciente básica asociada']
            },
            {
                title: 'Sistema Completo',
                highlight: true, // ESTE es el que manda
                description: 'Ideal si la demanda te desborda y la información clínica es un caos.',
                features: ['Agente IA en WhatsApp', 'Agenda inteligente + Recordatorios', 'Historial clínico digital', 'Dashboard de gestión']
            },
            {
                title: 'Gestión Interna',
                highlight: false,
                description: 'Si ya tenés quien atienda el teléfono, pero necesitás ordenar la información.',
                features: ['Panel central de agenda', 'Historial organizado', 'Sin automatización de WhatsApp']
            }
        ]
    },
    cta: {
        title: 'Ordenemos tu consultorio.',
        subtitle: 'Agendá un diagnóstico breve. Revisamos tu flujo actual de turnos e información clínica y te decimos si Vantra te sirve.',
        benefits: ['Diagnóstico de flujo', 'Revisión de info clínica', 'Propuesta a medida'],
        cta: { text: 'Solicitar Diagnóstico', action: () => { } }
    }
};
