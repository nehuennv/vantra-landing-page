# 📊 Biblioteca de Componentes Visuales

Esta carpeta contiene componentes visuales modulares y reutilizables para demostrar diferentes funcionalidades del sistema en landing pages de clientes.

## 📁 Estructura

```
visuals/
├── VisualCapture.jsx    # Captura Inteligente (WhatsApp → Turno)
├── VisualContext.jsx    # Historial 360° del Paciente
├── VisualAction.jsx     # Agenda Dinámica en Tiempo Real
├── VisualGrowth.jsx     # Métricas Operativas (Procedencia + Ausentismo)
├── index.js             # Exportaciones centralizadas
└── README.md            # Esta guía
```

## 🎯 Componentes Disponibles

### 1. **VisualCapture** - Captura Inteligente
Demuestra cómo un mensaje de WhatsApp se convierte automáticamente en una tarjeta de turno estructurada.

**Características:**
- Mensaje de paciente animado
- Indicador de "procesando"
- Tarjeta de resultado con datos extraídos

**Uso:**
```jsx
import { VisualCapture } from '@/components/visuals';

<VisualCapture />
```

---

### 2. **VisualContext** - Historial 360°
Visualiza la información completa del paciente con un nodo central y tarjetas satelitales de datos.

**Características:**
- Nodo central de paciente
- Ondas expansivas animadas
- Tarjetas flotantes (última visita, cobertura, estudios)
- Líneas conectoras sutiles

**Uso:**
```jsx
import { VisualContext } from '@/components/visuals';

<VisualContext />
```

---

### 3. **VisualAction** - Agenda Dinámica
Lista de pacientes del día con diferentes estados y notificaciones en tiempo real.

**Características:**
- Lista de pacientes con horarios
- Estados visuales (finalizado, en curso, confirmado, pendiente)
- Animación de confirmación
- Notificación de nuevo turno

**Uso:**
```jsx
import { VisualAction } from '@/components/visuals';

<VisualAction />
```

---

### 4. **VisualGrowth** - Métricas Operativas
Dashboard de estadísticas mostrando procedencia de pacientes y tasa de ausentismo.

**Características:**
- Barras de procedencia (Instagram, Google, Web)
- Gráfico semanal de ausentismo
- Indicadores de tendencia

**Uso:**
```jsx
import { VisualGrowth } from '@/components/visuals';

<VisualGrowth />
```

---

## 🔧 Personalización para Clientes

### Opción 1: Uso Directo
```jsx
// Importar y usar tal cual
import { VisualCapture } from '@/components/visuals';

<div className="h-[500px]">
    <VisualCapture />
</div>
```

### Opción 2: Wrapper Personalizado
```jsx
// Crear un wrapper con datos específicos del cliente
const ClienteVisualCapture = () => {
    return (
        <div className="custom-container">
            <VisualCapture />
        </div>
    );
};
```

### Opción 3: Fork y Modificar
1. Copiar el componente a una nueva carpeta del cliente
2. Modificar colores, textos, y animaciones
3. Mantener la estructura base

---

## 🎨 Guía de Estilos

Todos los componentes comparten:
- **Fondo:** `bg-zinc-900` con borde `border-white/5`
- **Tipografía:** Sistema de fuentes del proyecto
- **Animaciones:** Framer Motion con spring/easeInOut
- **Colores temáticos:**
  - Emerald (`#10B981`) - Captura
  - Blue (`#3B82F6`) - Contexto
  - Violet (`#8B5CF6`) - Agenda
  - Amber (`#F59E0B`) - Métricas

---

## 📦 Dependencias

Estos componentes requieren:
- `react` ^18.x
- `framer-motion` ^10.x
- `lucide-react` ^0.x

---

## 🚀 Próximos Pasos

Para añadir un nuevo componente visual:

1. Crear `VisualNombreNuevo.jsx` en esta carpeta
2. Seguir la estructura de los existentes
3. Añadir JSDoc con descripción y ejemplo
4. Exportar en `index.js`
5. Documentar en este README

---

## 💡 Tips de Rendimiento

- Todos los componentes usan animaciones GPU-accelerated
- Las animaciones se inician automáticamente al montarse
- No hay re-renders innecesarios (solo al montar/desmontar)
- Ideales para carruseles automáticos

---

**Mantenido por:** Equipo Vantra Frontend  
**Última actualización:** Enero 2026
