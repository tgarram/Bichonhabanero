# 🐾 Habaneros de la Lavanda Canarias · Criadero de Bichón Habanero

Web estática, moderna y responsive para **Habaneros de la Lavanda Canarias**, un
criadero familiar y **núcleo zoológico registrado** en Vega de San Mateo
(Las Palmas, Islas Canarias), dedicado a la cría responsable del **Bichón
Habanero**, el único perro nativo de Cuba. Criadora: Diana Martel Suárez.

**Datos oficiales:** Núcleo Zoológico N.º ES350330027837 (Gobierno de Canarias) ·
Registro 20/2023 (Sociedad Canina de Valencia).

El sitio presenta el criadero, explica la raza, muestra los ejemplares
reproductores, las camadas disponibles, una galería, testimonios, preguntas
frecuentes y un formulario de contacto.

---

## ✨ Características

- **Diseño cálido** inspirado en el color "habano" (arena, crema y marrón).
- **100% responsive** — móvil, tablet y escritorio.
- **Sin dependencias ni build**: solo HTML, CSS y JavaScript puro.
- **Accesible**: navegación por teclado, `skip-link`, `aria-*`, foco visible y
  respeto a `prefers-reduced-motion`.
- **Interactividad**:
  - Menú hamburguesa en móvil.
  - Acordeón de FAQ (elemento nativo `<details>`).
  - Galería con *lightbox*.
  - Formulario de contacto con validación en el cliente.
  - Animaciones de aparición al hacer scroll (`IntersectionObserver`).
  - Botón "volver arriba".

---

## 📁 Estructura del proyecto

```text
Bichonhabanero/
├── index.html          # Página principal (one-page con anclas)
├── css/
│   └── styles.css      # Estilos y diseño responsive
├── js/
│   └── script.js       # Interactividad (módulos por responsabilidad)
├── assets/
│   └── favicon.svg     # Logotipo / favicon (huella)
└── README.md           # Este archivo
```

---

## 🚀 Cómo ver el sitio

Al ser estático, basta con abrir `index.html` en el navegador. Para una
experiencia idéntica a producción, sirve la carpeta con un servidor local:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node
npx serve .
```

Luego visita <http://localhost:8000>.

---

## 🎨 Personalización

| Qué                     | Dónde                                                        |
| ----------------------- | ----------------------------------------------------------- |
| **Logo**                | Sustituir `assets/logo.svg` (mismo nombre) → se actualiza en cabecera y pie |
| Colores y tipografías   | Variables `:root` en `css/styles.css`                       |
| Datos del núcleo        | Sección `#contacto` y footer en `index.html`                |
| Ejemplares / camadas    | Secciones `#ejemplares` y `#camadas` en `index.html`        |
| Galería                 | Array `galleryData` en `js/script.js`                       |
| Número de registro      | `ES350330027837` y `20/2023` en `index.html`                |

> **Datos reales** ya integrados: nombre del criadero, criadora (Diana Martel
> Suárez), ubicación (La Vega de San Mateo, Gran Canaria), año (2023),
> descripción, números de registro, **Instagram**
> (`@habaneros__la_lavanda_canarias`), **WhatsApp** (+34 609 468 049) y
> **Facebook** (diana.martelsuarez).
>
> **Pendiente de aportar:** el **logo** (`assets/logo.svg` es un placeholder con
> el monograma «HL»), las **fotos** reales y los **nombres de los perros y
> camadas** (de ejemplo).

---

## 🐕 Sobre el Bichón Habanero

Raza pequeña (3–6 kg), de manto largo y sedoso, carácter alegre y muy sociable.
Perro nacional de Cuba, descendiente del antiguo "Blanquito de la Habana".
Ideal para familias, pisos y personas que puedan ofrecerle compañía.

---

## 📄 Licencia

Plantilla de uso libre para el criadero. Las marcas, nombres y datos reales son
responsabilidad de su propietario.
