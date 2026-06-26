# Documento de Diseño de Software (SDD)
## Web del Núcleo Zoológico del Bichón Habanero — "Perla de la Habana"

| Campo            | Valor                                             |
| ---------------- | ------------------------------------------------- |
| Proyecto         | Sitio web del núcleo zoológico Perla de la Habana |
| Versión del doc  | 1.0                                               |
| Fecha            | 2026-06-26                                        |
| Estado           | Aprobado para implementación                      |
| Autor            | Equipo de desarrollo                              |

---

## 1. Introducción

### 1.1 Propósito
Este documento describe el diseño de software de la web del núcleo zoológico
**Perla de la Habana**, dedicado a la cría responsable del **Bichón Habanero**.
Sirve como referencia técnica para implementación, mantenimiento y futuras
ampliaciones.

### 1.2 Alcance
Sitio web **estático** de una sola página (one-page con anclas) cuyo objetivo es:

- Presentar el núcleo zoológico y transmitir confianza (registro legal, salud).
- Informar sobre la raza Bichón Habanero.
- Mostrar ejemplares reproductores y camadas disponibles.
- Captar contactos de familias interesadas mediante un formulario.

Queda **fuera de alcance** (en esta versión): backend, base de datos, panel de
administración, pasarela de pago y envío real de correos.

### 1.3 Definiciones y acrónimos
| Término | Significado                                             |
| ------- | ------------------------------------------------------ |
| SDD     | Software Design Document (este documento)              |
| Núcleo zoológico | Figura legal que autoriza la cría de animales |
| One-page | Sitio de una sola página con navegación por anclas    |
| Lightbox | Visor modal para ampliar imágenes                     |

---

## 2. Visión general del sistema

La aplicación es un **front-end estático** servido como archivos planos. No
requiere proceso de build ni dependencias externas (salvo la fuente web de
Google Fonts, opcional). Se ejecuta íntegramente en el navegador del cliente.

```
┌─────────────────────────────────────────────┐
│                 Navegador                     │
│  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │ index.html│→ │styles.css│  │  script.js  │ │
│  │ (estructura)│ │ (estilo) │  │(comportamiento)│
│  └──────────┘  └──────────┘  └─────────────┘ │
│         ↑ separación de responsabilidades      │
└─────────────────────────────────────────────┘
            ▲
            │ HTTP (archivos estáticos)
   ┌─────────────────┐
   │ Servidor estático│ (GitHub Pages, Netlify, Nginx…)
   └─────────────────┘
```

### 2.1 Decisiones de arquitectura
| Decisión | Justificación |
| -------- | ------------- |
| Sitio estático | Coste cero, máxima velocidad, despliegue trivial, sin superficie de ataque de servidor. |
| Sin framework | El alcance no justifica React/Vue; HTML/CSS/JS reduce mantenimiento y peso. |
| Separación HTML/CSS/JS | Principio de responsabilidad única; facilita el mantenimiento. |
| `<details>` nativo para FAQ | Accesible y sin JS adicional. |
| `IntersectionObserver` | Animaciones eficientes sin librerías. |

---

## 3. Arquitectura de componentes

### 3.1 Estructura de archivos
```text
Bichonhabanero/
├── index.html          # Estructura semántica y contenido
├── css/styles.css      # Sistema de diseño y responsive
├── js/script.js        # Lógica de interfaz (IIFE modular)
├── assets/favicon.svg  # Identidad visual
├── README.md           # Guía de uso
└── SDD.md              # Este documento
```

### 3.2 Componentes de la interfaz (HTML)
| Componente | Sección (`id`) | Función |
| ---------- | -------------- | ------- |
| Header / Nav | `#top` | Navegación fija, menú responsive |
| Hero | — | Mensaje principal y llamadas a la acción |
| Trust bar | — | Señales de confianza |
| El núcleo | `#nosotros` | Presentación del criadero |
| La raza | `#raza` | Características y cuidados |
| Ejemplares | `#ejemplares` | Perros reproductores |
| Camadas | `#camadas` | Disponibilidad y garantías |
| Galería | `#galeria` | Imágenes + lightbox |
| Testimonios | — | Prueba social |
| FAQ | `#faq` | Acordeón de preguntas |
| Contacto | `#contacto` | Formulario + datos |
| Footer | — | Enlaces y aviso legal |

### 3.3 Módulos de JavaScript (`script.js`)
El script es una **IIFE** en modo estricto. Cada bloque tiene una única
responsabilidad (alineado con el principio SRP):

| Módulo | Responsabilidad |
| ------ | --------------- |
| Año dinámico | Actualizar el año del footer |
| Menú móvil | Abrir/cerrar navegación y `aria-expanded` |
| Volver arriba | Mostrar botón según scroll y desplazar al top |
| Galería + lightbox | Generar tiles y gestionar el visor modal |
| Formulario | Validación en cliente y feedback al usuario |
| Reveal on scroll | Animar la aparición de elementos |

---

## 4. Diseño detallado

### 4.1 Sistema de diseño (CSS)
- **Tokens de diseño** mediante variables CSS en `:root` (colores, radios,
  sombras, tipografías, ancho máximo).
- **Paleta**: tonos "habano", arena y crema, evocando el origen cubano.
- **Tipografías**: `Fraunces` (títulos) y `Nunito Sans` (texto).
- **Layout**: CSS Grid y Flexbox.
- **Breakpoints**: 900 px (tablet) y 680 px (móvil).

### 4.2 Flujo del formulario de contacto
```
Usuario rellena → submit → preventDefault
   → validar nombre / email (regex) / mensaje
       ├─ inválido → mensaje de error (rojo)
       └─ válido   → mensaje de éxito (verde) + reset
```
> Nota: la versión actual no envía datos. Para producción se integrará un
> servicio (Formspree, Netlify Forms o endpoint propio) — ver sección 7.

### 4.3 Accesibilidad (a11y)
- `skip-link` para saltar al contenido.
- Atributos `aria-*`, `role` y `aria-live` en estados dinámicos.
- Navegación por teclado y `Escape` para cerrar el lightbox.
- Respeto a `prefers-reduced-motion`.
- Contraste de color conforme a WCAG AA en textos principales.

---

## 5. Requisitos no funcionales

| Atributo | Objetivo |
| -------- | -------- |
| Rendimiento | Sin frameworks; carga ligera; fuentes con `preconnect`. |
| Compatibilidad | Navegadores modernos (Chrome, Firefox, Safari, Edge). |
| Mantenibilidad | Código separado por capas y comentado. |
| Accesibilidad | WCAG 2.1 nivel AA como objetivo. |
| SEO | `meta description`, `lang`, jerarquía semántica de encabezados. |
| Seguridad | Sin backend ni datos sensibles en cliente. |

---

## 6. Despliegue

1. Servir la carpeta como archivos estáticos.
2. Opciones recomendadas: **GitHub Pages**, **Netlify** o **Vercel**.
3. No requiere variables de entorno ni pasos de build.

```bash
# Vista previa local
python3 -m http.server 8000
```

---

## 7. Evolución futura (backlog)

| Prioridad | Mejora |
| --------- | ------ |
| Alta | Conectar el formulario a un servicio real de email. |
| Alta | Sustituir emojis/placeholders por fotos reales optimizadas (WebP). |
| Media | Página individual por camada con fichas de cachorros. |
| Media | Integración con Instagram para la galería. |
| Baja | Internacionalización (ES/EN). |
| Baja | Datos estructurados Schema.org (`LocalBusiness`/`Pet`). |

---

## 8. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
| ------ | ------- | ---------- |
| Datos legales de ejemplo en producción | Alto | Revisar y sustituir `ZOO-XXXX/2026` y contacto antes de publicar. |
| Dependencia de Google Fonts | Bajo | Hay *fallback* de fuentes del sistema en el CSS. |
| Formulario sin backend | Medio | Integrar servicio antes del lanzamiento (sección 7). |

---

*Fin del documento.*
