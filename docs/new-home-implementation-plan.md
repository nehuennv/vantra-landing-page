# 🏗️ New Home V2 — Plan de Implementación Completo

> **Estética:** Igual al Home actual (amarillo neón `#EDF246`, glassmorphism, Framer Motion, dark premium, wireframes animados, glows)
> **Copy:** Extraído de `docs/newhomecopywriting.md`
> **Referencia visual:** CERO del HTML. Solo el código React actual.

---

## Estructura Final del Nuevo Home

```
Home.jsx
├── SEO
├── 1.  HeroV2
├── 2.  Problem
├── 3.  Method
├── 4.  Modules
├── 5.  ServiceWeb
├── 6.  ServiceSoftware
├── 7.  ServiceMedia
├── 8.  Process
├── 9.  Pricing
├── 10. Testimonials
├── 11. About
├── 12. FAQ (modificado)
└── 13. CTAFinal
```

---

---

# SECCIÓN 1 — `HeroV2`

## Copywriting

- **Badge:** Compañía de transformación operativa para empresas en crecimiento
- **Headline:**
  ```
  Tu negocio creció.
  Tu operación se quedó
  en el mismo lugar.
  ```
- **Subtítulo:** Entramos en tu empresa, diagnosticamos qué te frena, y construimos los sistemas, procesos, tecnología y capacitación que necesitás para dejar de improvisar y empezar a escalar con orden real.
- **CTA 1:** Quiero una Radiografía de mi empresa →
- **CTA 2:** Conocé el Método Vantra
- **Stats:** +20 Proyectos entregados | 5+ Industrias transformadas | 98% Satisfacción | 3.7x ROI campañas

## Visual / Estética

**Layout:** Full viewport centrado, igual que el Hero actual.

**Headline:** La frase "en el mismo lugar" lleva el mismo tratamiento que "multiplica" en el actual:
- Gradient text `from-white via-[#EDF246] to-[#EDF246]`
- Italic + bold
- Corchetes `{}` decorativos a los lados con hover interactivo (se abren, glow neon, rotan)
- Cursor blink inclinado (`-skew-x-12`) al final de "lugar"
- Al hacer hover sobre "en el mismo lugar", los StatusBarItems del fondo se iluminan

**Badge (Mobile):** Igual que el actual — badge pill con borde `border-[#EDF246]/20`, bg `[#EDF246]/5`, dot pulsante. Pero estático (no rotativo ya que es una frase larga).

**Status Bar (Desktop, bottom):** 4 items en vez de 3, mismo diseño glass:
- `bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl`
- Iconos: `ShieldCheck` → proyecto, `Globe` → industrias, `Zap` → satisfacción, `TrendingUp` → ROI
- Se activan con glow neon al hover del headline

**CTAs:** Mismo estilo dual del actual:
- Primario: `bg-[#EDF246] text-black`, shine sweep effect, scale hover, glow shadow
- Secundario: glass outline, `border-white/10 bg-black/30`, hover bg-white/10

**Animaciones:** Spring stagger idéntico al actual (`staggerChildren: 0.15, delayChildren: 0.2`).

---

# SECCIÓN 2 — `Problem`

## Copywriting

- **Label:** El problema que resolvemos
- **Título:** ¿Tu empresa se siente así?
- **5 Pain Points:**
  1. 🔥 Apagás incendios todo el día — Cada semana es una urgencia nueva...
  2. 👤 Sin vos, la empresa se detiene — Si te vas dos semanas...
  3. 📊 Decidís por intuición, no por datos — No sabés cuánto cuesta un cliente...
  4. 🔧 Herramientas que no se hablan entre sí — Excel, WhatsApp, facturas en papel...
  5. 📈 Crecés pero no escalás — Facturás más pero no ganás más...
- **Blockquote:** "El problema no es que te falten *herramientas*. El problema es que nadie te ayudó a *pensar tu negocio como un sistema.*"
- **Párrafo complementario:** La mayoría de las empresas en crecimiento comparten el mismo dolor...

## Visual / Estética

**Layout:** NO es un grid simple. Es un layout asimétrico de 2 bloques:

**Bloque Izquierdo — Pain Points (col vertical):**
Cada pain point es una card horizontal tipo "notification bar":
- Container: `bg-[#0A0A0B]/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl`
- Emoji dentro de un cuadrado con `bg-[color]/10 rounded-xl` (cada uno con color diferente: rojo, azul, naranja, verde, púrpura — usando los colores de servicio de Ecosystem: `#e94560`, `#3b82f6`, `#f59e0b`, `#10b981`, `#8b5cf6`)
- Título: `font-display text-white`
- Descripción: `text-gray-400 text-sm`
- Hover: `translateX(8px)`, `border-[#EDF246]/30`, `bg-white/[0.02]`, transición 400ms
- Stagger enter: cada card entra con `whileInView`, delay incremental 0.08s

**Bloque Derecho — Blockquote Monolith:**
Una card grande estilo "revelation" que ocupa todo el alto:
- Container: Component `Card.jsx` existente con noise texture
- Background: glow blob decorativo `bg-[#EDF246]/5 blur-[100px]` detrás
- Blockquote: `font-display text-3xl md:text-4xl font-bold leading-[1.2]`
- Palabras "herramientas" y "pensar tu negocio como un sistema" en `text-[#EDF246]` con leve `drop-shadow` neon
- Una línea decorativa vertical `w-[3px] bg-[#EDF246]` a la izquierda del blockquote (como Services usa `border-l`)
- Debajo: párrafo complementario en `text-gray-400 text-base`
- Efecto visual sutil: un grid de dots (como GlobalSpotlight) muy tenue detrás del blockquote, solo dentro de la card, para dar sensación de "sistema/estructura"

**Header de sección:** Patrón visual idéntico al de Services actual:
- Línea vertical `border-l border-white/10` con `div.absolute w-[2px] h-24 bg-[#EDF246]` arriba
- Label en `text-[#EDF246] text-sm tracking-[0.3em] uppercase font-bold`
- Título en `font-display text-3xl md:text-6xl`

---

# SECCIÓN 3 — `Method`

## Copywriting

- **Label:** Nuestro framework propietario
- **Título:** El Método Vantra
- **Descripción:** Un sistema probado de 5 fases que estructura cada proyecto...
- **5 Fases:** (cada una con "Qué hacemos" y "Qué recibís" → ver newhomecopywriting.md para el detalle completo)
  - 01 Radiografía (1-2 semanas)
  - 02 Arquitectura (1 semana)
  - 03 Construcción (4-16 semanas)
  - 04 Transferencia (2-4 semanas)
  - 05 Evolución (continuo)

## Visual / Estética

**Layout:** NO un grid. Es una experiencia tipo "monolito expandible" inspirada en el container de `UnifiedServices`:

**Container Principal:**
- Wrapper: `rounded-3xl border border-[#EDF246]/10 bg-black/30 md:bg-[#08080A]/80 md:backdrop-blur-3xl shadow-2xl`
- Mismo estilo "monolith" que el services module de UnifiedServices

**Cada Fase — Bloque Accordion:**

Estética inspirada en el sidebar de UnifiedServices + el accordion de FAQ actual:

- **Header (clickeable):**
  - Numero: `font-display text-5xl font-black` en `text-[#EDF246]/20` (inactivo) → `text-[#EDF246]` (activo). Transición de color
  - Título: `font-display text-xl font-bold text-white`
  - Duración: `text-sm text-gray-500`
  - Toggle: `+` que rota a `×` (45deg) al abrir. Container cuadrado `w-12 h-12 rounded-xl`, inactivo: `bg-black/20 border-white/5`, activo: `bg-[#EDF246] text-black`
  - Indicador activo: `layoutId` animado — barra `w-1 bg-[#EDF246]` a la izquierda (idéntico al tab indicator de UnifiedServices)
  - Separador: `border-b border-white/5` entre fases

- **Body (expandible con AnimatePresence):**
  - Animación: `height: 0 → auto`, `opacity: 0 → 1`, duración 0.4s, ease `[0.04, 0.62, 0.23, 0.98]`
  - Layout interno: 2 columnas side by side
  - Col 1 "Qué hacemos": Label `text-[#EDF246] text-xs uppercase tracking-widest font-bold`, items con `→` prefix en accent
  - Col 2 "Qué recibís": Mismo estilo
  - Cada item: `text-gray-300 text-sm`, padding `py-2`

**Visual decorativo:** Al lado derecho del container completo, un visual tipo "flowchart" minimalista:
- 5 nodos circulares conectados por líneas, el activo brilla con glow neon
- Sutil, en `opacity-20` hasta que se activa esa fase
- Opcional: se puede omitir en V1 y agregar después

---

# SECCIÓN 4 — `Modules`

## Copywriting

- **Label:** Programa de Transformación
- **Título:** 4 módulos adaptados a tu realidad
- **Descripción:** Acompañamiento semanal de 1 a 1...
- **4 Módulos:**
  - 🎯 Comercial — $800-1.200 USD — Ventas, embudo, CRM...
  - ⚙️ Operativo — $800-1.200 USD — Procesos, SOPs, roles...
  - 💻 Digital — $800-1.500 USD — Herramientas, automatizaciones...
  - 📢 Marketing — $800-1.500 USD — Posicionamiento, contenido, paid media...

## Visual / Estética

**Layout:** Bento grid asimétrico (como Services actual):
- `grid-cols-1 md:grid-cols-12 gap-6`
- Módulo 1 y 4: `col-span-7` (anchos)
- Módulo 2 y 3: `col-span-5` (angostos)

**Cada Module Card:**
Exactamente el patrón visual de las cards de `Services.jsx`:

- Container: `Card.jsx` base (`bg-[#08080A]/60 hover:bg-[#08080A]/90 border-white/5 hover:border-[#EDF246]/50`)
- **Watermark icon gigante:** El emoji del módulo renderizado como un icono Lucide equivalente gigante (`size={300}`) en `opacity-[0.03]` posicionado `absolute -right-8 -bottom-8`, hover `opacity-[0.08]`, `rotate(-10deg)` → `rotate(0)`, `scale-150` → `scale-[1.6]`
- **Top row:** Icono en `p-3 rounded-xl bg-white/5 text-[#EDF246] border border-white/10` + Tag precio como pill `px-4 py-1.5 rounded-full bg-[#EDF246]/10 text-[#EDF246] border border-[#EDF246]/20` que en hover se llena: `group-hover:bg-[#EDF246] group-hover:text-black`
- **Título:** `font-display text-3xl md:text-4xl text-white group-hover:text-[#EDF246]`
- **Descripción:** `text-gray-400 text-sm md:text-base`
- **Checklist items:** Pills tipo spec tags: `px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-gray-400`

**Iconos Lucide a usar:** `Target` (Comercial), `Settings` (Operativo), `Monitor` (Digital), `Megaphone` (Marketing)

**Animaciones:** `whileInView` stagger con spring (`staggerChildren: 0.1`, `stiffness: 50`)

---

# SECCIONES 5, 6, 7 — `ServiceSection` (Template Reutilizable)

Se crea **un solo componente** `ServiceSection` que recibe toda la data por props y se usa 3 veces.

## Copywriting por Servicio

### 5 — Web
- **Tag:** Desarrollo Web (color: `#10b981` verde)
- **Headline:** Sitios web que no solo se ven bien. Venden, comunican y convierten.
- **Descripción + 6 features + panel "Qué construimos" (7 items) + 2 case studies**

### 6 — Software
- **Tag:** Software & Automatización (color: `#8b5cf6` violeta)
- **Headline:** Sistemas que trabajan por vos. Tecnología que ordena tu empresa.
- **Descripción + 6 features + panel "Tipos de soluciones" (8 items) + 4 case studies**

### 7 — Paid Media
- **Tag:** Paid Media & Crecimiento (color: `#f59e0b` amarillo/dorado)
- **Headline:** Campañas que no queman plata. Performance con estrategia real.
- **Descripción + 6 features + panel "Cómo gestionamos" (8 items) + 4 case studies**

## Visual / Estética (Compartida)

**Layout Principal:** NO es un grid plano. Es un layout de 2 grandes bloques verticales:

### Bloque A — Service Header (2 columnas)

**Col Izquierda — Copy:**
- Tag badge: pill con `bg-[color]/10 text-[color] border border-[color]/20 text-xs font-bold uppercase tracking-widest`
- Headline: `font-display text-3xl md:text-5xl text-white leading-[1.1]`
- Descripción: `text-gray-400 text-base md:text-lg leading-relaxed`
- Feature Pills (2×3): cada una es una mini-card horizontal:
  - Emoji `text-xl` + div con título `font-display text-sm font-bold` + descripción `text-xs text-gray-500`
  - Container: `border border-white/[0.08] bg-[#0A0A0B]/60 rounded-xl p-4`

**Col Derecha — Panel Visual:**
Inspirado en el "svc-right" pero con estética Vantra actual:

Dentro de un `Card.jsx`:
- Título: "Qué construimos" / "Tipos de soluciones" / "Cómo gestionamos"
- Descripción corta
- Lista con ítems `→` prefijados en `text-[#EDF246]`
- Separador `border-b border-white/5` entre ítems
- Glow decorativo detrás: blob `bg-[color]/5 blur-[80px]`

**Visual extra en el panel:** Una representación visual animada según el servicio:

| Servicio | Visual |
|---|---|
| **Web** | El `LandingWireframe` de UnifiedServices (MacOS window con navbar, hero, logos, features auto-scrolleando). Ya existe! |
| **Software** | El `DashboardWireframe` de UnifiedServices (sidebar + stats + chart animado + tabla). Ya existe! |
| **Paid Media** | Un nuevo visual: un mockup de "dashbboard de métricas" con barras animadas de ROAS, gráficos de CPA, números que suben. Similar al chart de `DashboardWireframe` pero enfocado en métricas de ads |

> Reutilizar los wireframes de `UnifiedServices.jsx` (`MacOSWindow`, `LandingWireframe`, `DashboardWireframe`) extrayéndolos a componentes separados.

### Bloque B — Case Studies

**Layout:** `grid-cols-1 md:grid-cols-2 gap-6`

**Cada Case Study Card:**
- Container: `Card.jsx` base
- **Header:** Tag pill de color + Título del caso
- **Descripción:** `text-gray-400 text-sm`
- **"Lo que hicimos":** Label accent `text-[#EDF246] text-xs uppercase font-bold tracking-widest` + grid 2 columnas de bullets con `•` accent
- **Footer métricas:** Row de 3 celdas separadas por `border-r border-white/5`:
  - Valor: `font-display text-2xl font-bold text-[#EDF246]`
  - Label: `text-xs text-gray-500`
  - Background: `bg-white/[0.015]` muy sutil
  - Counters animados: los números se animan al entrar en viewport (CountUp effect)

**Animación:** Cards con `whileInView` stagger, hover `translateY(-4px)` + `border-[#EDF246]/30`

**Separación entre servicios:** `border-t border-white/5` o espaciado `py-32` para crear breaks limpios

---

# SECCIÓN 8 — `Process`

## Copywriting

- **Label:** Cómo arrancamos
- **Título:** De la primera charla al primer resultado
- **Descripción:** 4 pasos claros. Sin misterio, sin letra chica, sin sorpresas.
- **4 Pasos:**
  1. 💬 Hablamos — Nos contás tu situación real...
  2. 🔍 Diagnosticamos — Analizamos tu operación...
  3. 📋 Proponemos — Te presentamos un plan claro...
  4. 🚀 Ejecutamos — Arrancamos con portal de seguimiento...

## Visual / Estética

**Layout:** NO un grid de 4 columnas iguales. Un layout tipo "timeline horizontal" con conexiones:

**Container:** Un `rounded-3xl border border-[#EDF246]/10 bg-black/30 md:bg-[#08080A]/80 backdrop-blur-3xl shadow-2xl` — misma estética monolith de UnifiedServices

**Dentro del container:**
- 4 bloques en `flex lg:flex-row` con `divide-x divide-white/5`
- Cada bloque es una columna flex con:
  - **Número:** `font-display text-6xl font-black text-[#EDF246]/10` como watermark
  - **Icono Lucide:** Reemplazar emojis por: `MessageCircle` (Hablamos), `Search` (Diagnosticamos), `FileText` (Proponemos), `Rocket` (Ejecutamos)
  - Icono en `text-gray-400 group-hover:text-[#EDF246]` transición 300ms
  - **Título:** `font-display text-lg text-white font-bold`
  - **Descripción:** `text-sm text-gray-500 leading-relaxed`

**Visual conectivo:** Entre cada paso, una línea horizontal animada `w-full h-[1px]` con un gradient que se ilumina secuencialmente:
- Animación con Framer Motion `scaleX: 0 → 1` en `whileInView`, `delay` incremental
- Color: `bg-gradient-to-r from-transparent via-[#EDF246]/30 to-transparent`

**Mobile:** Se apila vertical con `border-b border-white/5` en vez de `border-r`

**Animación adicional:** Los 4 pasos aparecen secuencialmente con stagger (`staggerChildren: 0.15`), con spring physics

---

# SECCIÓN 9 — `Pricing`

## Copywriting

- **Label:** Inversión
- **Título:** Servicios con precio claro
- **Descripción:** Cada empresa tiene necesidades distintas...
- **4 Niveles:**
  - Nivel 1: Radiografía — USD $150-250
  - Nivel 2: Transformación — USD $800-1.500/mes ⭐ MÁS POPULAR
  - Nivel 3: Implementación — USD $2.500-15.000
  - Nivel 4: Evolución — USD $300-1.500/mes

## Visual / Estética

**Layout:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5`

> Evaluar si `PricingCarousel.jsx` existente se puede adaptar. Si no, crear nuevo.

**Cada Pricing Card:**
- Container: `Card.jsx` base, `flex flex-col h-full p-8`
- **Tier label:** `text-[#EDF246] text-xs font-bold uppercase tracking-widest`
- **Título:** `font-display text-xl font-bold text-white`
- **Precio:** `font-display text-3xl font-bold text-[#EDF246]` + suffix `/mes` en `text-sm text-gray-500`
- **Descripción:** `text-sm text-gray-400 leading-relaxed flex-1` (flex-1 para empujar CTA abajo)
- **Features:** Lista con `✓` en `text-[#10b981]` (verde), separadores `border-b border-white/5`
- **CTA:** `btn` full width, rounded-xl

**Card Popular (Nivel 2):**
- `border-[#EDF246]/30` (más brillante que el resto)
- Background: gradient sutil `bg-gradient-to-br from-[#0A0A0B] to-[#EDF246]/[0.04]`
- Badge "MÁS POPULAR" flotante arriba: `absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EDF246] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full`
- CTA primario: `bg-[#EDF246] text-black` (los demás son outline)

**Animaciones:**
- `whileInView` stagger
- Hover: `translateY(-4px)`, `border-[#EDF246]/50`
- Card popular con `glow` sutil permanente: `shadow-[0_0_30px_-10px_rgba(237,242,70,0.15)]`

---

# SECCIÓN 10 — `Testimonials`

## Copywriting

- **Label:** Lo que dicen nuestros clientes
- **Título:** Confianza construida con resultados
- **3 Testimonios:**
  1. Globaltech — "Vantra no solo nos hizo un sistema..." — Telecomunicaciones B2B
  2. Heyblack — "Pasamos de gestionar todo por WhatsApp..." — E-commerce
  3. Chana — "Lo que más valoro es la cercanía..." — Restaurante & Club

## Visual / Estética

**Layout:** NO un grid plano de 3. Un layout escalonado con profundidad:

**Opción elegida:** 3 cards pero la del medio está ligeramente elevada (`-translate-y-4`) para crear ritmo visual:

```
[Card 1]    [Card 2 ↑]    [Card 3]
```

**Cada Testimonial Card:**
- Container: `Card.jsx` base
- Padding: `p-8 md:p-10`
- **Stars:** 5 estrellas `★★★★★` en `text-[#EDF246]` con `tracking-[3px]`
- **Quote:** `text-base md:text-lg text-gray-300 leading-relaxed italic font-light`
- Con comillas decorativas `"` gigantes en `font-display text-6xl text-[#EDF246]/10 absolute top-4 left-6`
- **Author block:**
  - Avatar: círculo `w-12 h-12` con iniciales, `bg-gradient-to-br from-[#EDF246] to-[#EDF246]/60 font-display font-bold text-black rounded-full`
  - Nombre: `font-semibold text-white text-sm`
  - Rubro: `text-xs text-gray-500`
- **Hover:** `border-[#EDF246]/30` transición

**Visual decorativo:** Glow blobs sutiles detrás de la sección:
- `bg-[#EDF246]/5 blur-[120px]` top-right
- `bg-blue-900/5 blur-[120px]` bottom-left

**Animaciones:** `whileInView` stagger, cards con spring physics

---

# SECCIÓN 11 — `About`

## Copywriting

- **Label:** Quiénes somos
- **Título:** Somos Vantra
- **Párrafo 1:** Nacimos de una convicción: las empresas en crecimiento merecen un socio...
- **Párrafo 2:** Somos un equipo de estrategas, desarrolladores, diseñadores...
- **Párrafo Accent:** No vendemos humo. Entramos, diagnosticamos con honestidad...
- **4 Valores:** Criterio, Cercanía, Orden, Educación

## Visual / Estética

**Layout:** 2 grandes bloques horizontal (`grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-start`)

**Bloque Izquierdo — Storytelling:**
- Header style de Services: línea vertical border-l con accent line
- Título: `font-display text-4xl md:text-6xl text-white font-medium`
- Párrafos: `text-gray-300 text-base md:text-lg leading-relaxed`
- Párrafo accent: `text-[#EDF246] font-semibold` con un leve `text-glow`
- Visual opcional: foto del equipo o un visual abstract tipo "constelación de nodos" animado que representa "sistema/conexión"

**Bloque Derecho — Values Grid:**
- `grid-cols-1 sm:grid-cols-2 gap-4`
- Cada value card:
  - `p-6 bg-[#0A0A0B]/60 backdrop-blur border border-white/[0.08] rounded-2xl`
  - Emoji: `text-2xl mb-3`
  - Título: `font-display text-base font-bold text-white mb-2`
  - Descripción: `text-sm text-gray-500 leading-relaxed`
  - Hover: `border-[#EDF246]/30 bg-white/[0.02]`

**Animaciones:**
- Left block: `whileInView` desde `x: -30`
- Values: stagger con spring
- Párrafo accent: leve glow animation on enter

---

# SECCIÓN 12 — `FAQ` (Modificar existente)

## Copywriting

- **Label:** Preguntas frecuentes
- **Título:** Todo lo que necesitás saber
- **8 Preguntas:** (ver newhomecopywriting.md completo)
  1. ¿Vantra es una agencia de marketing?
  2. ¿Para qué tipo de empresa es Vantra?
  3. ¿Cuánto cuesta trabajar con Vantra?
  4. ¿Cuánto tiempo tarda un proyecto?
  5. ¿Qué pasa después de terminar un proyecto?
  6. ¿En qué se diferencia Vantra de una software factory?
  7. ¿Puedo contratar solo un servicio específico?
  8. ¿Trabajan solo en Argentina?

## Visual / Estética

**Sin cambios estéticos.** Se reutiliza el componente `FAQ.jsx` y `FAQCard` exactamente como están:
- Accordion con `AnimatePresence`
- Border animated entre accent y white/8
- Icon box `+`/`-` con `bg-[#EDF246]` cuando open
- Respuesta con `border-l-2 border-[#EDF246]/20`
- Noise texture, glow blobs ambient

**Cambios:**
- Actualizar array `faqItems` con las 8 nuevas preguntas
- Actualizar header: label "Preguntas frecuentes", título "Todo lo que necesitás saber"
- Eliminar CTA de WhatsApp del bottom (se mueve a CTAFinal)

---

# SECCIÓN 13 — `CTAFinal`

## Copywriting

- **Headline:** Tu empresa merece funcionar como un *sistema*, no como un caos.
- **Descripción:** Agendá una conversación con nuestro equipo...
- **CTA 1:** Agendar llamada gratuita →
- **CTA 2:** Escribinos por WhatsApp

## Visual / Estética

**Layout:** Full-width, centrado, con fondo especial.

**Background:**
- No usa el `bg-[#050507]` base. Tiene su propio gradient:
- `bg-gradient-to-br from-[#0A0A1A] via-[#0A0A2E] to-[#0A0A1A]`
- Glow radial central: `bg-[#EDF246]/[0.07] blur-[120px] w-[700px] h-[700px]` centrado absolute
- Leve noise overlay

**Contenido:**
- Headline: `font-display text-3xl md:text-5xl lg:text-6xl text-white text-center font-bold`
- "sistema" en `text-[#EDF246] italic` con glow sutil
- Descripción: `text-base md:text-lg text-gray-400 text-center max-w-xl mx-auto`
- CTAs centrados: misma estética que Hero
  - Primario: `bg-[#EDF246] text-black`, shine sweep, scale hover, glow
  - Secundario: glass outline

**Animaciones:**
- `whileInView` con spring
- Glow de fondo con leve pulse (`opacity: [0.05, 0.08, 0.05]`, 4s, infinite)
- CTAs con hover scale + shadow growth

---

# COMPONENTES REUTILIZABLES A EXTRAER

## Del código actual

| Componente a extraer | Desde | Para usar en |
|---|---|---|
| `MacOSWindow` | UnifiedServices.jsx | ServiceWeb, ServiceSoftware |
| `LandingWireframe` | UnifiedServices.jsx | ServiceWeb |
| `DashboardWireframe` | UnifiedServices.jsx | ServiceSoftware |
| `StatusBarItem` | Hero.jsx | HeroV2 (ya está ahí) |
| `FAQCard` | FAQ.jsx | FAQ (ya está ahí) |

## Nuevos a crear

| Componente | Descripción |
|---|---|
| `SectionHeader` | Label accent + título display + descripción. Reutilizable en todas las secciones. Props: `label, title, description, align ("left"/"center")` |
| `CaseStudyCard` | Card de caso de éxito con tag, título, descripción, bullets "Lo que hicimos", métricas footer |
| `MediaWireframe` | Nuevo visual wireframe para Paid Media (charts de métricas animadas tipo dashboard de ads) |

---

# DATA FILES A CREAR

```
src/data/homeV2/
├── hero.js          — Stats, badge text
├── problem.js       — Pain points array
├── method.js        — 5 fases con whatWeDo[] y whatYouGet[]
├── modules.js       — 4 módulos con precio, features
├── services.js      — 3 servicios: web, software, media (features, panel, caseStudies)
├── process.js       — 4 pasos
├── pricing.js       — 4 niveles
├── testimonials.js   — 3 reviews
├── faq.js           — 8 Q&A
└── about.js         — Párrafos, valores
```

---

# RESUMEN DE ARCHIVOS

| Acción | Archivo | Descripción |
|---|---|---|
| 🆕 Crear | `sections/Problem.jsx` | Pain points + blockquote |
| 🆕 Crear | `sections/Method.jsx` | Accordion 5 fases monolith |
| 🆕 Crear | `sections/Modules.jsx` | Bento grid 4 módulos |
| 🆕 Crear | `sections/ServiceSection.jsx` | Template reutilizable servicios |
| 🆕 Crear | `sections/Process.jsx` | Timeline 4 pasos |
| 🆕 Crear | `sections/Pricing.jsx` | Grid 4 pricing cards |
| 🆕 Crear | `sections/Testimonials.jsx` | Cards testimonios escalonados |
| 🆕 Crear | `sections/About.jsx` | Copy + valores grid |
| 🆕 Crear | `sections/CTAFinal.jsx` | CTA cierre con gradient bg |
| 🆕 Crear | `ui/SectionHeader.jsx` | Label+título+desc reutilizable |
| 🆕 Crear | `ui/CaseStudyCard.jsx` | Card caso de éxito |
| 🆕 Crear | `visuals/MediaWireframe.jsx` | Visual ads dashboard |
| 🆕 Crear | `data/homeV2/*.js` | 10 data files |
| 🔄 Modificar | `pages/Home.jsx` | Nueva composición de secciones |
| 🔄 Modificar | `sections/Hero.jsx` | Nuevo copy, stats, headline |
| 🔄 Modificar | `sections/FAQ.jsx` | 8 preguntas, nuevo header |
| 🔄 Modificar | `layout/Navbar.jsx` | Nuevos links |
| 🔄 Modificar | `layout/Footer.jsx` | Nuevas columnas |

**Total: ~25 archivos** (15 nuevos + 10 data + 5 modificados)

---

# ORDEN DE IMPLEMENTACIÓN

```
FASE 1 — Foundation
  1. Crear data files (toda la info separada)
  2. Crear SectionHeader (se usa en TODAS las secciones)
  3. Modificar Home.jsx (estructura vacía con imports)

FASE 2 — Above the Fold
  4. HeroV2 (modificar Hero.jsx)
  5. Problem (nuevo)

FASE 3 — Core Method
  6. Method (nuevo, accordion monolith)
  7. Modules (nuevo, bento grid)

FASE 4 — Services
  8. Extraer wireframes de UnifiedServices a componentes separados
  9. Crear CaseStudyCard
  10. Crear ServiceSection template
  11. Instanciar ServiceWeb, ServiceSoftware, ServiceMedia

FASE 5 — Conversion
  12. Process (timeline)
  13. Pricing (grid cards)
  14. Testimonials (cards escalonados)

FASE 6 — Trust & Close
  15. About (copy + valores)
  16. FAQ (modificar data)
  17. CTAFinal (nuevo)

FASE 7 — Global
  18. Navbar (actualizar links)
  19. Footer (actualizar columnas)
  20. Testing responsive + animaciones
```
