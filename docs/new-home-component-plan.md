# 🧩 New Home V2 — Plan de Componentes

> Mapeo del copywriting V2 a componentes React, indicando qué se reutiliza, qué se crea, qué se modifica, y qué animaciones/patrones aplicar.

---

## Visión General: Home V2 vs Home Actual

```
HOME ACTUAL (6 secciones)          HOME V2 (12+ secciones)
─────────────────────              ─────────────────────────
1. Hero                       →    1. Hero (MODIFICAR)
2. Services                   →    2. Problem (NUEVO)
                                   3. Method (NUEVO)
                                   4. Modules (NUEVO)
3. Ecosystem                  ✕    5. Service: Web (NUEVO)
4. UnifiedServices            →    6. Service: Software (NUEVO)
                                   7. Service: Paid Media (NUEVO)
                                   8. Process (NUEVO)
                                   9. Pricing (NUEVO)
                                   10. Testimonials (NUEVO)
                                   11. About (NUEVO)
5. Meeting → CTA Final             12. FAQ (REUTILIZAR + MODIFICAR)
6. FAQ                        →    13. CTA Final (NUEVO)
```

**Cambio de identidad:** La web pasa de "agencia de software/IA" a "compañía de transformación operativa". El tono cambia de tech-neon a consultivo-premium.

---

## CAPA GLOBAL — Reutilizable sin cambios

| Componente | Estado | Notas |
|---|---|---|
| `SplashScreen` | ✅ Reutilizar | Sin cambios |
| `GlobalCursor` | ✅ Reutilizar | Sin cambios |
| `GlobalAuroraBackground` | ⚠️ Evaluar | El background actual tiene tinte neon/tech. Quizás necesite un asset nuevo más sobrio para la identidad "consultora" |
| `GlobalSpotlight` | ✅ Reutilizar | El dot grid scanner encaja con la estética premium |
| `SmoothScroll` (Lenis) | ✅ Reutilizar | Sin cambios |
| `Navbar` | 🔄 Modificar | Cambiar links: Método, Módulos, Web, Software, Paid Media, Precios, FAQ. CTA: "Hablar con Vantra" |
| `Footer` | 🔄 Modificar | Actualizar columnas: Servicios (Radiografía, Transformación, Implementación, Evolución), Capacidades (Web, Software, Paid Media, Asesoría), Contacto |
| `PageTransition` | ✅ Reutilizar | Sin cambios |
| `SEO` | ✅ Reutilizar | Solo cambiar props de texto |
| `Layout` | ✅ Reutilizar | Sin cambios |

---

## PÁGINA: `Home.jsx` (Modificar)

```jsx
// NUEVA ESTRUCTURA
<div style={{ '--product-primary': '#e94560' }}> // ← NUEVO color accent (rojo)
  <SEO title="Transformamos la operación de tu empresa" ... />
  <HeroV2 />
  <Problem />
  <Method />
  <Modules />
  <ServiceWeb />
  <ServiceSoftware />
  <ServiceMedia />
  <Process />
  <Pricing />
  <Testimonials />
  <About />
  <FAQV2 />
  <CTAFinal />
</div>
```

> [!IMPORTANT]
> **Cambio de color accent.** El HTML V2 usa `#e94560` (rojo rosado) en vez de `#EDF246` (amarillo neón). Esto impacta TODA la estética. Decidir si se migra el accent o se mantiene el amarillo con el nuevo copy.

---

## SECCIONES — Detalle por Componente

---

### 1️⃣ `HeroV2` — 🔄 MODIFICAR `Hero.jsx`

**Cambios respecto al actual:**

| Elemento | Actual | Nuevo |
|---|---|---|
| Badge | "Transparencia 100%" (rotativo) | "Compañía de transformación operativa..." (estático) |
| Headline | "Tecnología que {multiplica} tu crecimiento." | "Tu negocio creció. Tu operación se quedó *en el mismo lugar.*" |
| Subtítulo | Unimos desarrollo web, automatización con IA... | Entramos en tu empresa, diagnosticamos... |
| CTA Primario | "Configurar mi proyecto" | "Quiero una Radiografía de mi empresa →" |
| CTA Secundario | "Conocer servicios" | "Conocé el Método Vantra" |
| Stats | 100% Transparencia, 15+ Alianzas, 8x ROAS | +20 Proyectos, 5+ Industrias, 98% Satisfacción, 3.7x ROI |
| Efecto headline | Corchetes `{}` interactivos + cursor parpadeante | Italic emphasis en "en el mismo lugar" |

**Animaciones a mantener:**
- Stagger de entrada con spring physics
- Status bar con delay 0.8s
- Badge mobile rotativo (adaptar a estático)
- Hover effects en CTAs

**Sub-componentes internos:**
- `StatusBarItem` → Reutilizar, cambiar data (4 stats en vez de 3)
- Eliminar efecto interactivo de "multiplica" con corchetes

---

### 2️⃣ `Problem` — 🆕 NUEVO

**Tipo:** Sección de dos columnas (dolor + revelación)

**Sub-componentes:**

#### `PainCard` (×5)
- Emoji icon con fondo coloreado (como el HTML: `rgba(color, 0.1)`)
- Título bold (h4)
- Descripción (p)
- Hover: border-accent, translateX(6px), bg-card

#### `ProblemBlockquote`
- Blockquote gigante estilo display font
- Palabras en emphasis con accent color
- Párrafo complementario debajo

**Layout:** `grid-cols-1 lg:grid-cols-2 gap-72px` — Pain cards izquierda, Blockquote derecha

**Animaciones sugeridas:**
- `whileInView` stagger en los pain cards
- Glow decorativo detrás del blockquote
- Hover translateX en cada pain card

---

### 3️⃣ `Method` — 🆕 NUEVO

**Tipo:** Accordion vertical (5 fases)

**Inspiración estética:** Combinar el patrón del FAQ actual (accordion animado) con el diseño "monolith container" de UnifiedServices

**Sub-componentes:**

#### `MethodPhase` (×5)
- Header clickeable: Número grande (01-05), Título, Duración, Toggle icon (+/×)
- Body expandible: 2 columnas ("Qué hacemos" + "Qué recibís"), cada una con lista de items con flecha `→`
- Indicador de fase activa: borde accent izquierdo animado (como `layoutId` de UnifiedServices)

**Data array:**
```js
const phases = [
  { num: "01", title: "Radiografía", subtitle: "Diagnóstico Profundo", duration: "1-2 semanas", whatWeDo: [...], whatYouGet: [...] },
  { num: "02", title: "Arquitectura", subtitle: "Diseño de Solución", duration: "1 semana", ... },
  { num: "03", title: "Construcción", subtitle: "Implementación y Desarrollo", duration: "4-16 semanas", ... },
  { num: "04", title: "Transferencia", subtitle: "Capacitación y Adopción", duration: "2-4 semanas", ... },
  { num: "05", title: "Evolución", subtitle: "Acompañamiento y Crecimiento", duration: "continuo", ... },
]
```

**Animaciones:**
- Expandir/colapsar con Framer `AnimatePresence`, `height: 0 → auto`
- Número de fase: opacidad baja → accent en activo
- Toggle icon: `rotate(45deg)` en activo
- `whileInView` para reveal

---

### 4️⃣ `Modules` — 🆕 NUEVO

**Tipo:** Grid de 4 cards (programa de transformación)

**Inspiración estética:** Bento grid de `Services.jsx` actual

**Sub-componentes:**

#### `ModuleCard` (×4)
- Emoji icon grande
- Título (h3)
- Duración + precio (accent color, badge)
- Descripción
- Checklist con ✓ items
- Top border con color único por módulo (rojo, azul, verde, amarillo)
- Hover: translateY(-6px), border-accent

**Layout:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20px`

**Animaciones:**
- `whileInView` stagger
- `hover: translateY(-6px)`
- Línea de color top `opacity 0 → 1` en hover

---

### 5️⃣ `ServiceWeb` — 🆕 NUEVO

**Tipo:** Sección de servicio completa (Header + Features + Cases)

**Sub-componentes:**

#### `ServiceHeader` (reutilizable para las 3 secciones de servicio)
- 2 columnas: Copy izquierda + Panel "Qué construimos" derecha
- Tag badge de color
- Headline (h2)
- Descripción
- Feature grid (2×3 o 3×2) con emoji + título + descripción

#### `ServicePanel` (reutilizable)
- Card con título, descripción, lista con flechas `→`
- Estilo glass/card actual

#### `CaseStudyCard` (reutilizable ×2 por servicio)
- Tag badge de color
- Título del caso (h3)
- Descripción
- "Lo que hicimos" → grid 2 columnas de bullet points
- Footer con 3 métricas en row (valor accent + label)
- Hover: translateY(-4px), border-accent

#### `CaseStudyGrid`
- Grid de 2 columnas para case study cards

**Layout ServiceHeader:** `grid-cols-1 lg:grid-cols-2 gap-64px`  
**Layout Features:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20px`  
**Layout Cases:** `grid-cols-1 md:grid-cols-2 gap-24px`

**Animaciones:**
- `whileInView` stagger en features
- Cards con hover translateY + border glow

---

### 6️⃣ `ServiceSoftware` — 🆕 NUEVO

**Estructura idéntica a `ServiceWeb`** pero con:
- Color distinto (`#818cf8` violeta)
- 4 case studies en vez de 2
- Features y panel de "Tipos de soluciones" distintos

Reutiliza: `ServiceHeader`, `ServicePanel`, `CaseStudyCard`, `CaseStudyGrid`

---

### 7️⃣ `ServiceMedia` — 🆕 NUEVO

**Estructura idéntica a `ServiceWeb`** pero con:
- Color distinto (`#fbbf24` amarillo/dorado)
- 4 case studies
- Panel "Cómo gestionamos campañas"

Reutiliza: `ServiceHeader`, `ServicePanel`, `CaseStudyCard`, `CaseStudyGrid`

> [!TIP]
> **Alternativa unificada:** Crear un solo componente `ServiceSection` que reciba props de `{ tag, color, headline, description, features, panelTitle, panelDescription, panelItems, caseStudies }` y renderice todo. Así las 3 secciones de servicio usan el mismo componente con distinta data.

---

### 8️⃣ `Process` — 🆕 NUEVO

**Tipo:** Grid horizontal de 4 pasos

**Sub-componentes:**

#### `ProcessStep` (×4)
- Número gigante (watermark, baja opacidad)
- Emoji icon
- Título (h4)
- Descripción
- Hover: translateY(-4px), border-accent

**Layout:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20px`

**Animaciones:**
- `whileInView` stagger
- Hover translate + border glow
- Conectores visuales opcionales entre pasos (línea decorativa)

---

### 9️⃣ `Pricing` — 🆕 NUEVO

**Tipo:** Grid de 4 pricing cards

**Inspiración estética:** Se puede inspirar en `PricingCarousel.jsx` que ya existe (24KB) pero que NO se usa en el Home actual.

**Sub-componentes:**

#### `PricingCard` (×4)
- Tier label (accent, uppercase)
- Título (h3)
- Precio (accent, display font)
- Sufijo "/mes" si aplica
- Descripción
- Feature list con ✓ items
- CTA button (primario para "popular", outline para el resto)
- Badge "MÁS POPULAR" en Nivel 2

**Layout:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20px`

**Animaciones:**
- `whileInView` stagger
- Card popular con borde accent + gradient sutil de fondo
- Hover: translateY(-4px)

> [!NOTE]
> Ya existe `PricingCarousel.jsx` (24KB) en el proyecto. Evaluar si se puede adaptar o si es mejor crear uno nuevo más simple basado en grid.

---

### 🔟 `Testimonials` — 🆕 NUEVO

**Tipo:** Grid de 3 testimonial cards

**Sub-componentes:**

#### `TestimonialCard` (×3)
- Stars (★★★★★)
- Quote text en italic
- Author section: avatar con iniciales (gradient bg), nombre, rubro

**Layout:** `grid-cols-1 md:grid-cols-3 gap-24px`

**Animaciones:**
- `whileInView` stagger
- Hover: border-accent sutil
- Avatar con gradient `from-accent to-accent2`

---

### 1️⃣1️⃣ `About` — 🆕 NUEVO

**Tipo:** Sección de 2 columnas (copy + valores)

**Sub-componentes:**

#### `ValueCard` (×4)
- Emoji + título bold
- Descripción corta
- Hover: border-accent

**Layout izquierda:** 3 párrafos (el tercero con accent color)  
**Layout derecha:** `grid-cols-1 sm:grid-cols-2 gap-16px` de ValueCards  
**Layout general:** `grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-72px`

**Animaciones:**
- `whileInView`
- `hover: border-accent` en value cards

---

### 1️⃣2️⃣ `FAQV2` — 🔄 MODIFICAR `FAQ.jsx`

**Cambios:**

| Aspecto | Actual | Nuevo |
|---|---|---|
| Cantidad | 5 preguntas | 8 preguntas |
| Label sección | (no tiene) | "Preguntas frecuentes" |
| Título | "Despejamos dudas." | "Todo lo que necesitás saber" |
| CTA final | WhatsApp link | Remover o adaptar |
| Preguntas | Sobre Vantra tech/software | Sobre Vantra consultora/operativa |

**Reutilizar:** Componente `FAQCard` exactamente como está (accordion). Solo cambiar la data `faqItems[]` y el header de sección.

---

### 1️⃣3️⃣ `CTAFinal` — 🆕 NUEVO

**Tipo:** Sección full-width centrada con fondo con gradiente

**Contenido:**
- Headline: "Tu empresa merece funcionar como un *sistema*, no como un caos."
- Descripción
- 2 botones: "Agendar llamada gratuita →" + "Escribinos por WhatsApp"

**Estilo:**
- Background: gradient oscuro (`linear-gradient(135deg, #0a0a2e, #150a22, #0a0a1a)`)
- Glow radial centrado (accent color)
- Centrado, max-width en párrafo

**Animaciones:**
- `whileInView` en contenido
- Glow pulse sutil de fondo
- CTAs con hover scale + shadow

**Similar a:** El bloque Meeting actual pero sin formulario, solo copy + CTAs

---

## COMPONENTES REUTILIZABLES A CREAR

| Componente | Ubicación | Usado por |
|---|---|---|
| `SectionHeader` | `components/ui/` | Todas las secciones (label + title + description) |
| `ServiceSection` | `components/sections/` | ServiceWeb, ServiceSoftware, ServiceMedia |
| `CaseStudyCard` | `components/ui/` | Las 3 secciones de servicio |
| `PainCard` | `components/ui/` | Problem |
| `ModuleCard` | `components/ui/` | Modules |
| `ProcessStep` | `components/ui/` | Process |
| `PricingCard` | `components/ui/` | Pricing |
| `TestimonialCard` | `components/ui/` | Testimonials |
| `ValueCard` | `components/ui/` | About |
| `MethodPhase` | `components/ui/` | Method |

---

## COMPONENTES ACTUALES QUE SE ELIMINAN DEL HOME

| Componente | Razón |
|---|---|
| `Ecosystem` | No hay sección de "verticales" (Medicina/Gastronomía) en V2 |
| `EcosystemDashboard` | Dependencia de Ecosystem |
| `UnifiedServices` | Reemplazado por 3 `ServiceSection` separadas |
| `Services` (bento grid) | Reemplazado por `Modules` + secciones de servicio |
| `Meeting` (formulario) | Reemplazado por `CTAFinal` (sin form, solo botones a WhatsApp) |
| `HeroForm` | No se usa en V2 |

> [!WARNING]
> Estos componentes NO se borran del código. Se mantienen porque otras páginas como `/resto`, `/med` podrían seguir usándolos. Solo se sacan del `Home.jsx`.

---

## RESUMEN DE ARCHIVOS A CREAR/MODIFICAR

### 📁 Nuevos archivos (`src/components/sections/`)

```
Problem.jsx           — 🆕 Pain points + blockquote
Method.jsx            — 🆕 Accordion 5 fases
Modules.jsx           — 🆕 Grid 4 módulos
ServiceSection.jsx    — 🆕 Template reutilizable para servicios
Process.jsx           — 🆕 Grid 4 pasos
Pricing.jsx           — 🆕 Grid 4 pricing cards (o adaptar PricingCarousel)
Testimonials.jsx      — 🆕 Grid 3 testimonios
About.jsx             — 🆕 Copy + valores
CTAFinal.jsx          — 🆕 CTA cierre
```

### 📁 Nuevos archivos (`src/components/ui/`)

```
SectionHeader.jsx     — 🆕 Label + título + descripción (DRY)
CaseStudyCard.jsx     — 🆕 Card de caso de éxito con métricas
PainCard.jsx          — 🆕 Card de pain point (opcionalm si queda inline)
```

### 📁 Nuevos archivos (`src/data/`)

```
services.js           — 🆕 Data de los 3 servicios (web, soft, media)
method.js             — 🆕 Data de las 5 fases
modules.js            — 🆕 Data de los 4 módulos
pricing.js            — 🆕 Data de los 4 niveles
testimonials.js       — 🆕 Data de los 3 testimonios
faqV2.js              — 🆕 Data de las 8 preguntas
process.js            — 🆕 Data de los 4 pasos
about.js              — 🆕 Valores
```

### ✏️ Archivos a modificar

```
src/pages/Home.jsx          — 🔄 Reemplazar secciones
src/components/layout/Navbar.jsx   — 🔄 Cambiar links de navegación
src/components/layout/Footer.jsx   — 🔄 Actualizar columnas
src/components/sections/Hero.jsx   — 🔄 Nuevo copy, nuevo headline, nuevos stats
src/components/sections/FAQ.jsx    — 🔄 Nueva data, nuevo header, más preguntas
```

---

## ORDEN DE IMPLEMENTACIÓN SUGERIDO

```
1. Data files (todo el contenido separado en /data/)
2. SectionHeader (componente DRY que se usa en todas las secciones)
3. HeroV2 (la primera impresión)
4. Problem + Method (las secciones más consultivas/nuevas)
5. Modules (grid simple)
6. ServiceSection + CaseStudyCard (template reutilizable)
7. ServiceWeb + ServiceSoftware + ServiceMedia (usando el template)
8. Process (grid simple)
9. Pricing (adaptar o crear nuevo)
10. Testimonials (grid simple)
11. About (layout 2 columnas)
12. FAQV2 (adaptar existente)
13. CTAFinal (cierre)
14. Navbar + Footer (actualizar links)
15. Home.jsx (ensamblar todo)
```

---

## CONTEO ESTIMADO

| Tipo | Cantidad |
|---|---|
| Nuevas secciones | 11 componentes |
| Nuevos UI components | 2-3 componentes |
| Nuevos data files | 8 archivos |
| Archivos a modificar | 5 archivos |
| **Total nuevos archivos** | **~22 archivos** |
| **Esfuerzo estimado** | Medio-Alto (la estética y animaciones ya están definidas, es sobre todo copy + layout nuevo) |
