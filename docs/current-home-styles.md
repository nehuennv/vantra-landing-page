# 🎨 Vantra Home — Guía de Estilos Actual (Completa)

> Todo lo estético del Home actual: colores, tipografías, bordes, sombras, animaciones, efectos, backgrounds, spacing, componentes UI.
> Fuente: Código fuente del proyecto React (`src/`)

---

## 1. PALETA DE COLORES

### Colores Primarios (Definidos en `tailwind.config.js`)

| Token | Hex | Uso |
|---|---|---|
| `vantra-neon` / `vantra-DEFAULT` | `#EDF246` | **Acento principal.** CTAs, highlights, bordes activos, cursor, glows, iconos activos, gradients |
| `vantra-ice` | `#A0E9FF` | Azul hielo para brillos secundarios (casi no se usa en Home actual) |
| `vantra-bg` | `#050507` | **Fondo principal del body.** Negro profundo con tinte azul |
| `vantra-card` | `#0A0A0B` | Fondo de cards y superficies elevadas |
| `vantra-surface` | `#121214` | Fondo de superficies terciarias |

### Colores de Secciones Específicas

| Color | Hex | Dónde se usa |
|---|---|---|
| Sector Medicina (Ecosystem) | `#06B6D4` | Cyan — aura, iconos, botón, barra progreso |
| Sector Gastronomía (Ecosystem) | `#F97316` | Naranja — aura, iconos, botón, barra progreso |
| Status bar EDF246 glow | `rgba(237,242,70,0.3)` | Sombra neon en CTAs y glows |
| Status bar EDF246 bg | `rgba(237,242,70,0.5)` | Fondo transparente en highlights |

### Escala de Blancos con Opacidad (Patrón Dominante)

```
white              → Títulos principales, valores de stats
white/80           → (poco uso)
white/60           → Descripciones en Ecosystem
white/50           → Subtítulos de sección
white/40           → Textos terciarios, labels inactivos
white/20           → Scrollbar thumb, separadores
white/10           → Bordes de cards, separadores, inputs
white/[0.08]       → Bordes ultra-sutiles (Card component)
white/[0.05]       → Bordes de spec pills, UnifiedServices
white/[0.03]       → Fondos de elementos ghost, hover states
white/[0.02]       → Hover states ultra-sutiles
white/[0.015]      → Noise overlay
```

### Escala de Grises Tailwind

```
gray-300    → Textos de FAQ pregunta (no activa)
gray-400    → Texto de descripción/párrafos, iconos inactivos
gray-500    → Labels de status bar inactivos, iconos de inputs
gray-600    → Labels muy secundarios en UnifiedServices
gray-700    → Iconos inactivos en UnifiedServices sidebar
```

### Fondos Específicos por Componente

| Componente | Fondo Mobile | Fondo Desktop |
|---|---|---|
| Body | `#050507` | `#050507` |
| Card.jsx | `#0A0A0B` (sólido) | `#0A0A0B/60` + `backdrop-blur-xl` |
| Services cards | `#08080A/60` | `#08080A/90` (hover) |
| UnifiedServices container | `black/30` | `#08080A/80` + `backdrop-blur-3xl` |
| Meeting form | `black/30` | `#08080A/80` + `backdrop-blur-3xl` |
| FAQ cards | `black/30` | `#0A0A0B/60` → `#0A0A0B` (open) |

---

## 2. TIPOGRAFÍA

### Fuentes (cargadas en `index.css` y `index.html`)

| Fuente | Variable Tailwind | Peso | Uso |
|---|---|---|---|
| **Righteous** | `font-display` | Regular (400) | Títulos (h1-h6), nombres de servicios, stats, labels |
| **Raleway** | `font-sans` | 300-800 | Cuerpo de texto, párrafos, descripciones, labels, inputs |

### Base CSS Reset

```css
body { @apply font-sans antialiased; }
h1, h2, h3, h4, h5, h6 { @apply font-display tracking-tighter; }
```

### Tamaños de Texto por Sección

#### Hero
| Elemento | Mobile | Desktop |
|---|---|---|
| Título h1 | `text-5xl` (3rem) | `text-8xl lg:text-[7rem]` |
| Subtítulo | `text-base` (1rem) | `text-xl` (1.25rem) |
| CTA buttons | `text-sm` (0.875rem) | `text-sm` |
| Badge rotativo | `text-xs` (0.75rem) | — |
| Status bar valor | — | `text-2xl` (1.5rem) |
| Status bar label | — | `text-[10px]` |

#### Services
| Elemento | Mobile | Desktop |
|---|---|---|
| Subtítulo sección | `text-[#EDF246] text-sm` | `text-sm` |
| Título sección (h3) | `text-3xl` | `text-6xl` |
| Card título (h4) | `text-3xl` | `text-4xl` |
| Card descripción | `text-sm` | `text-base` |
| Spec pills | `text-xs` | `text-xs` |

#### Ecosystem
| Elemento | Mobile | Desktop |
|---|---|---|
| Label "Ecosistema" | `text-xs` | `text-xs` |
| Título h2 | `text-4xl` | `text-5xl md:text-6xl` |
| Descripción | `text-base` | `text-xl` |
| Selector título | `text-2xl` | `text-2xl` |
| Selector descripción | `text-sm` | `text-sm` |

#### UnifiedServices
| Elemento | Mobile | Desktop |
|---|---|---|
| Título sección | `text-3xl` | `text-6xl` |
| Servicio título (content) | — | `text-4xl md:text-5xl` |
| Servicio descripción | `text-lg` | `text-lg` |
| Specs pills | `text-sm` | `text-sm` |
| Sidebar título | — | `text-2xl` |
| Sidebar subtitle | — | `text-xs` |
| Mobile nav | `text-sm` | — |

#### Meeting
| Elemento | Mobile | Desktop |
|---|---|---|
| Badge | `text-xs` | `text-xs` |
| Título h2 | `text-3xl` | `text-6xl` |
| Descripción | `text-base` | `text-xl` |
| Input labels | `text-xs` | `text-xs` |
| Inputs/Select | `text-base` | `text-base` |
| Submit button | `text-lg` | `text-lg` |
| Bullets de venta | `text-sm` | `text-sm` |

#### FAQ
| Elemento | Mobile | Desktop |
|---|---|---|
| Título sección | `text-3xl` | `text-6xl` |
| Pregunta (h3) | `text-xl` | `text-2xl` |
| Respuesta | `text-base` | `text-lg` |

### Estilos de Texto Especiales

```
tracking-widest       → CTAs, badges (letter-spacing: 0.1em)
tracking-[0.2em]      → Status bar labels
tracking-[0.3em]      → Section labels, splash screen
tracking-tight        → Títulos principales
uppercase             → CTAs, badges, labels
lowercase italic      → Palabra "multiplica" en Hero
font-bold / font-medium / font-light → Jerarquía tipográfica
```

### Efectos de Texto

| Efecto | CSS |
|---|---|
| **Text gradient** | `text-transparent bg-clip-text bg-gradient-to-b from-white via-[#EDF246] to-[#EDF246]` |
| **Text gradient (sección)** | `backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EDF246 50%)'` |
| **Text stroke (outline)** | `WebkitTextStroke: '1px #ffffff'; color: 'rgba(255,255,255,0.05)'` |
| **Text glow** (utility) | `text-shadow: 0 0 20px rgba(237, 242, 70, 0.3)` |
| **Drop shadow neon** | `drop-shadow-[0_0_15px_rgba(237,242,70,0.5)]` |

---

## 3. BORDES

### Patrones de Bordes Recurrentes

| Estilo | Uso |
|---|---|
| `border border-white/10` | Borde estándar de cards, inputs, contenedores |
| `border border-white/[0.08]` | Card.jsx base (ultra-sutil) |
| `border border-white/[0.05]` | Divisores en UnifiedServices |
| `border border-white/5` | Separadores en sidebar, etc. |
| `border border-white/20` | Hover state de bordes |
| `border border-[#EDF246]/10` | Contenedores UnifiedServices, Meeting |
| `border border-[#EDF246]/20` | Badge de Meeting |
| `border border-[#EDF246]/50` | Focus state de inputs |
| `hover:border-[#EDF246]/50` | Hover en cards de Services |
| `hover:border-[#EDF246]/30` | Hover en form reset button |
| `border-l border-white/10` | Línea decorativa izquierda (Services header) |
| `border-l-2 border-[#EDF246]/20` | Borde respuesta FAQ |

### Border Radius

| Token | Valor | Uso |
|---|---|---|
| `rounded-full` | 9999px | Badges, avatares, indicadores |
| `rounded-3xl` | 1.5rem | Cards principales (Card.jsx) |
| `rounded-2xl` | 1rem | Inputs, botones grandes, contenedores internos |
| `rounded-xl` | 0.75rem | Botones CTA, icon containers, tabs |
| `rounded-lg` | 0.5rem | Spec pills, botones secundarios |
| `rounded-t-xl` | — | MacOS window top |

---

## 4. SOMBRAS & GLOWS

### Box Shadows

| Sombra | CSS | Uso |
|---|---|---|
| **Glow neon** | `shadow-[0_0_20px_rgba(237,242,70,0.3)]` | CTA primario, botones activos |
| **Glow neon fuerte** | `shadow-[0_0_40px_rgba(237,242,70,0.6)]` | Hover CTA FAQ |
| **Glow neon success** | `shadow-[0_0_30px_rgba(237,242,70,0.2)]` | Icono de éxito |
| **Glow blanco sutil** | `shadow-[0_0_20px_rgba(255,255,255,0.05)]` | Hover CTA secundario |
| **Card hover** | `shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]` | Card.jsx hover |
| **Glow Tailwind token** | `shadow-glow = 0 0 40px -10px rgba(237,242,70,0.3)` | Definido en config |
| `shadow-lg` | Standard | Status bar items desktop |
| `shadow-2xl` | Standard | UnifiedServices contenedores, wireframes |
| `shadow-xl` | Standard | Glass panel utility |

### Drop Shadows (Filter)

```
drop-shadow-2xl     → Título hero, logo splash
drop-shadow-[0_0_15px_rgba(237,242,70,0.5)] → Hover "multiplica"
```

### Decorative Glow Blobs (Background)

| Componente | Glow |
|---|---|
| Services header | `w-[600px] h-[400px] bg-[#EDF246]/5 blur-[100px]` |
| Meeting | `w-[800px] h-[800px] bg-[#EDF246]/5 blur-[120px]` |
| Meeting form | `bg-[#EDF246]/5 blur-[80px]` |
| FAQ top-right | `w-[500px] h-[500px] bg-[#EDF246]/5 blur-[120px]` |
| FAQ bottom-left | `w-[500px] h-[500px] bg-blue-900/10 blur-[120px]` |
| UnifiedServices wireframe | `bg-[#EDF246]/5 blur-[80px]` |
| Ecosystem aura | `blur-[120px]` con color del sector activo, `opacity: 0.3` |

---

## 5. BACKDROP BLUR & GLASSMORPHISM

### Niveles de Blur

| Nivel | Uso |
|---|---|
| `backdrop-blur-md` | Status bar items, badges, glass-panel utility |
| `backdrop-blur-xl` | Card.jsx desktop, CTA secundario hero |
| `backdrop-blur-3xl` | UnifiedServices, Meeting, FAQ containers desktop |

### Patrón "Glass Panel" (Utility class)

```css
.glass-panel {
  @apply bg-vantra-surface/30 backdrop-blur-md border border-white/10 shadow-xl;
}
```

### Patrón Glass Manual Recurrente

```
bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl
```

---

## 6. ANIMACIONES (Framer Motion)

### Transiciones de Página (PageTransition.jsx)

```js
// ENTER
initial: { opacity: 0, y: 20, filter: 'blur(10px)' }
animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

// EXIT
exit: { opacity: 0, y: -20, filter: 'blur(5px)' }
transition: { duration: 0.25, ease: "easeIn" }
```

### Splash Screen Animations

```js
// Logo: scale 0.9→1, opacity 0→1, duration 0.8
// Exit: opacity 0, blur 10px, duration 0.8, easeInOut
// Progress bar text: opacity [0.3, 0.7, 0.3] pulse, 1.5s infinite
// Progress bar: bg-[#EDF246] shadow-[0_0_10px_#EDF246]
```

### App Wrapper (Main Content Enter)

```js
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.8, ease: "easeOut" }
```

### Hero Animations

```js
// Container stagger
containerVariants: {
  staggerChildren: 0.15,
  delayChildren: 0.2
}

// Items (Spring physics)
itemVariants: {
  hidden: { y: 30, opacity: 0 }
  visible: { y: 0, opacity: 1, type: "spring", stiffness: 50, damping: 20 }
}

// Status bar (bottom)
initial: { opacity: 0, y: 50 }
animate: { opacity: 1, y: 0 }
transition: { duration: 1, delay: 0.8, type: "spring", stiffness: 30 }

// Cursor parpadeante
animate: { opacity: [1, 0, 1] }
transition: { duration: 1, repeat: Infinity, ease: "steps(2)" }

// Badge rotativo (mobile) 3s interval
initial: { opacity: 0, y: 10, filter: 'blur(4px)' }
animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
exit: { opacity: 0, y: -10, filter: 'blur(4px)' }
transition: { duration: 0.5 }
```

### Services Animations

```js
// Container: staggerChildren: 0.1
// Items: y: 20→0, type: "spring", stiffness: 50
// Section header: whileInView opacity 0→1, y 20→0, duration 0.8
```

### Ecosystem Animations

```js
// Sector switch: opacity 0→1, filter blur 4px→0, duration 1
// Dashboard: opacity 0→1, y 10→0, scale 0.98→1, duration 0.5
// Desktop dashboard: y 15→0, scale 0.96→1, blur 4px→0, duration 0.7, ease [0.22,1,0.36,1]
// Aura: opacity 0→0.3, scale 0.8→1, exit: opacity 0, scale 1.2, duration 1.2
// Progress bar: CSS @keyframes fillHeight { from height:0% to height:100% } 5000ms linear
```

### UnifiedServices Animations

```js
// Service switch: opacity 0→1, duration 0.4 (AnimatePresence mode="wait")
// layoutId="activeTab" → smooth indicator move
// Mouse cursor sim: x/y keyframes, 12s linear infinite
// Auto-scroll: y [0, -600], mirror, linear, 15-25s
// Chart bars: height animate with 3s + stagger delay
// Typing dots: opacity [0.3,1,0.3], 1s infinite, stagger 0.2s
```

### Meeting Animations

```js
// Left content: opacity 0→1, x: -30→0, duration 0.8
// Success: opacity 0→1, scale 0.95→1
// Submit spinner: animate-spin (Tailwind)
// Form: AnimatePresence mode="wait"
```

### FAQ Animations

```js
// Border color animate: rgba(237,242,70,0.5) ↔ rgba(255,255,255,0.08), duration 0.3
// Content reveal: height 0→auto, opacity 0→1, duration 0.4, ease [0.04,0.62,0.23,0.98]
```

### Card.jsx Animations

```js
// Enter: opacity 0→1, y 30→0, duration 0.6, easeOut, whileInView, viewport margin -100px
// Hover: y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
```

---

## 7. EFECTOS GLOBALES (Siempre Activos)

### GlobalAuroraBackground

- **Tipo:** Imagen WebP pre-renderizada (`/complete-background.webp`)
- **Posición:** `fixed inset-0 z-[-1]`
- **Opacidad:** `0.7`
- **Fondo base:** `#050507` sólido debajo
- **Noise overlay:** Base64 PNG, `opacity: 0.015`, `mix-blend-overlay`
- **Cambio de ruta:** CrossFade entre home bg y medical bg, `duration: 1.5`

### GlobalCursor (Solo Desktop)

- **Dot interno:** `8x8px` circular, `bg-[#EDF246]`, sigue el mouse exacto
- **Aura externa:** `32x32px` circular, `border border-[#EDF246]/50`, con spring physics
- **Spring config:** `damping: 35, stiffness: 400, mass: 0.2`
- **Hover interactivo:** Scale `1 → 1.5` en links, buttons, inputs
- **Click:** Scale `1 → 0.8`
- **Blend mode:** `mix-blend-exclusion`
- **Z-index:** `200000`
- **CSS global:** `cursor: none !important` en `@media (pointer: fine)`

### GlobalSpotlight (Solo Desktop)

- **Layer 1 (Base):** Dot grid `radial-gradient(#ffffff 1.5px, transparent 1.5px)`, `backgroundSize: 24x24px`, `opacity: 0.03`
- **Layer 2 (Scanner):** Mismo patrón, `opacity: 0.25`, con mask `linear-gradient(120deg)` que se anima diagonal
- **Animación Scanner:** `maskPosition -50%,-50% → 150%,150%`, `duration: 2.5s`, `linear`, `infinite`, `repeatDelay: 0.5s`

### SmoothScroll (Solo Desktop)

- **Librería:** Lenis
- **Duration:** `1.2s`
- **Easing:** Curva exponencial Apple-style: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- **Mobile:** Scroll nativo del OS (no se aplica Lenis)

---

## 8. HOVER STATES & TRANSICIONES CSS

### Durations

```
transition-all duration-300    → Estándar (la mayoría)
transition-all duration-500    → Cards, estados activos
transition-colors duration-300 → Solo color changes
transition-colors duration-500 → Status bar items
transition-transform duration-300 → Iconos, flechas
transition-transform duration-500 → Wireframe container
transition-transform duration-700 → Wireframe hover
transition-opacity duration-500 → Glow de fondo
transition-opacity duration-700 → Card hover glow
```

### Hover Effects Comunes

| Efecto | CSS |
|---|---|
| **Scale up** | `hover:scale-105` (CTAs), `hover:scale-[1.02]` (Ecosystem btn) |
| **Scale down click** | `active:scale-[0.98]` |
| **Lift up** | Framer `whileHover: { y: -5 }` |
| **Border illuminate** | `hover:border-[#EDF246]/50` |
| **Background fill** | `hover:bg-white/10` |
| **Color change** | `hover:text-[#EDF246]`, `group-hover:text-[#EDF246]` |
| **Icon scale** | `group-hover:scale-110` |
| **Translate arrow** | `group-hover:translate-x-1` |
| **Shine sweep** | `skew-x-12 -translate-x-full group-hover:translate-x-full duration-500` |
| **Glow intensify** | `hover:shadow-[0_0_40px_...]` |
| **Brightness** | `brightness-125` |
| **Tag fill** | `group-hover:bg-[#EDF246] group-hover:text-black` (Service intro tags) |

---

## 9. SPACING & LAYOUT

### Section Padding

```
py-24 md:py-32    → Secciones estándar (6rem / 8rem)
min-h-[100dvh]    → Hero (full viewport)
min-h-[900px]     → Ecosystem
min-h-[600px]     → UnifiedServices services container
min-h-[500px]     → Meeting success state
```

### Container

```
container mx-auto px-6           → Estándar
container mx-auto px-6 md:px-12  → Services
container mx-auto px-4 lg:px-8   → UnifiedServices
container mx-auto px-6 max-w-4xl → FAQ
max-w-7xl mx-auto                → Meeting inner
max-w-6xl                        → Hero title
max-w-2xl                        → Hero description, FAQ description
max-w-xl                         → Meeting form
```

### Grid Layouts

| Sección | Grid |
|---|---|
| Services | `grid-cols-1 md:grid-cols-12 gap-6` (bento: 7+5, 5+7) |
| Ecosystem | `flex lg:flex-row gap-20` (1/3 + 2/3) |
| UnifiedServices | `grid-cols-1 lg:grid-cols-12` (4+8) |
| UnifiedServices pillars | `grid-cols-4 divide-x` |
| Meeting | `flex lg:flex-row gap-16 lg:gap-24` |
| FAQ | `flex flex-col gap-4` |

### Gaps Comunes

```
gap-2     → Spec pills, small elements
gap-3     → Buttons group (CTA hero)
gap-4     → Cards
gap-5     → Hero CTAs, status bar items
gap-6     → Sections internas, form fields, Ecosystem selectors
gap-8     → Hero separación, features
gap-16    → Meeting columns
gap-20    → Ecosystem columns
gap-24    → Meeting desktop columns
```

---

## 10. ICONOGRAFÍA

### Librería: Lucide React

**Tamaños recurrentes:**
```
size={14}  → Badge icons, mini indicators
size={16}  → CTA flechas, check pills
size={18}  → Bullets, arrows, submit icons
size={20}  → Input icons, toggles, status bar
size={24}  → Card icons, service selector
size={28}  → Ecosystem sector icons, pillar icons
size={40}  → Success state checkmark
size={300} → Watermark background icons (Services cards)
```

**strokeWidth estándar:** `1.5` (solo se especifica en algunos)

### Iconos del Home

```
Hero:        ArrowRight, ShieldCheck, Globe, Zap
Services:    ArrowUpRight, Code2, Cpu, Globe, LineChart
Ecosystem:   Utensils, HeartPulse, ArrowRight, Zap
Unified:     Zap, TrendingUp, Users, HeartHandshake, ArrowRight,
             CheckCircle2, Cpu, Rocket, ShoppingBag, LayoutTemplate,
             ChevronRight, ChevronLeft, CreditCard, MousePointer2, MessageCircle
Meeting:     Send, CheckCircle2, User, Mail, Phone, Layers, Loader2, ArrowRight, AlertCircle
FAQ:         Plus, Minus, MessageSquare, ArrowRight
```

---

## 11. NOISE & TEXTURES

### Grain Texture (Card.jsx, FAQ)

```html
<div class="absolute inset-0 opacity-[0.03]
  bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
  pointer-events-none mix-blend-overlay" />
```

### Noise Overlay (GlobalAuroraBackground)

```
Base64 inline PNG pattern
opacity: 0.015
mix-blend-overlay
```

### Dot Grid (GlobalSpotlight)

```css
backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)'
backgroundSize: '24px 24px'
```

---

## 12. INPUTS & FORMS (Meeting)

### Input Style

```
w-full h-16
bg-white/[0.03]
border border-white/10
rounded-2xl
pl-14 pr-5
text-white
placeholder:text-gray-400
focus:border-[#EDF246]/50
focus:bg-white/[0.05]
transition-all duration-300
font-medium text-base
```

### Select Style (mismo que input + custom chevron)

```
appearance-none
pr-12
Custom chevron icon: ArrowRight rotate-90
```

### Label Style

```
text-xs font-bold text-gray-400
uppercase tracking-widest
mb-3 ml-1
```

### Submit Button

```
w-full h-16
bg-[#EDF246] text-black
font-bold text-lg
rounded-2xl
hover:bg-[#E5EA35]
hover:shadow-[0_0_40px_-10px_rgba(237,242,70,0.5)]
active:scale-[0.98]
disabled:opacity-70 disabled:cursor-not-allowed
```

### Focus Icon Behavior

```
text-gray-500 → group-focus-within:text-[#EDF246]
transition-colors duration-300
```

---

## 13. BOTONES (CTAs)

### CTA Primario (Hero, UnifiedServices, FAQ)

```
bg-[#EDF246] text-[#050507]
font-bold text-sm uppercase tracking-widest
px-9 py-4 rounded-lg
shadow-[0_0_20px_rgba(237,242,70,0.3)]
hover:scale-105
overflow-hidden (para shine effect)
```

### CTA Secundario (Hero)

```
border border-white/10 bg-black/30
text-white font-bold text-sm uppercase tracking-widest
px-9 py-4 rounded-lg
hover:bg-white/10 hover:border-white/20
md:backdrop-blur-md
hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
active:scale-[0.98]
```

### CTA Ecosystem (Dinámico)

```
px-10 py-4 rounded-xl
backgroundColor: sector.color  (dinámico)
boxShadow: 0 0 20px -5px {color}80
text-white font-bold text-sm uppercase tracking-widest
hover:scale-[1.02] hover:shadow-lg
```

### CTA Cotizar (UnifiedServices)

```
px-8 py-4 rounded-full
bg-[#EDF246] text-black
font-bold text-sm tracking-wide
hover:shadow-[0_0_20px_rgba(237,242,70,0.3)]
```

---

## 14. VARIABLE CSS CUSTOM

```css
--product-primary: #EDF246  /* Definida en Home.jsx wrapper div */
```

---

## 15. SELECTION STYLE

```css
selection:bg-vantra-neon selection:text-vantra-bg
/* Selección de texto: fondo amarillo neon, texto negro */
```

---

## 16. SCROLLBAR CUSTOM

```css
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { @apply bg-white/20 rounded-full; }
::-webkit-scrollbar-thumb:hover { @apply bg-white/40; }
```

---

## 17. RESPONSIVE BREAKPOINTS

| Breakpoint | Pixels | Uso principal |
|---|---|---|
| Default (mobile-first) | 0px+ | Layout de 1 columna, fonts más chicos |
| `sm:` | 640px+ | CTAs en fila, títulos intermedios |
| `md:` | 768px+ | Grids 2 col, fonts más grandes, backdrop-blur activo, backgrounds glass |
| `lg:` | 1024px+ | Layouts 2-3 columnas, sidebars visibles |

### Patrón Mobile vs Desktop

```
Mobile: Sólido, sin blur, sin cursor custom, sin spotlight, sin smooth scroll
Desktop: Glass, blur, cursor custom, spotlight scanner, smooth scroll Lenis
```

---

## 18. Z-INDEX STACK

| Z-Index | Componente |
|---|---|
| `z-[-1]` | GlobalAuroraBackground |
| `z-0` | GlobalSpotlight |
| `z-10` | Main content, sección contenido relativo |
| `z-20` | Status bar, MacOS header |
| `z-30` | Mouse cursor sim (UnifiedServices) |
| `z-100` | Navbar (en Navbar.jsx) |
| `z-[99999]` | SplashScreen |
| `z-[200000]` | GlobalCursor |
