# 🏋️‍♂️ Gym Landing Page - Master Template

Este es el repositorio **Template Oficial** para crear Landing Pages de Gimnasios de alta conversión.
Diseñado para ser clonado y personalizado rápidamente para cada cliente usando **Sanity CMS** como panel de control.

## 🛠 Tech Stack

*   **Framework**: Next.js 14+ (App Router)
*   **Estilos**: Tailwind CSS + CSS Variables
*   **Animaciones**: Framer Motion
*   **CMS**: Sanity.io (Headless CMS)
*   **Iconos**: Lucide React

---

## 🚀 Guía de Inicio Rápido (Nuevo Cliente)

Sigue estos pasos cada vez que tengas un nuevo cliente (ej: "Power Gym").

### 1. Clonar el Proyecto
Descarga este template y renombra la carpeta para tu cliente.
```bash
git clone <URL_DE_ESTE_REPO> power-gym-landing
cd power-gym-landing
npm install
```

### 2. Configurar Sanity (Backend)
Necesitas un nuevo proyecto en Sanity para este cliente.

1.  Crea el proyecto desde la terminal:
    ```bash
    npm create sanity@latest
    # O simplemente logueate y crea uno nuevo en sanity.io/manage
    ```
2. Busca el `Project ID` y `Dataset Name` de tu nuevo proyecto.
3. Crea un archivo `.env.local` en la raíz (basado en `.env.example`) y pon las credenciales:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="tu_project_id_nuevo"
    NEXT_PUBLIC_SANITY_DATASET="production"
    ```

### 3. Ejecutar Localmente
```bash
npm run dev
```
Visita `http://localhost:3000`.

---

## 🎨 Personalización (Sin tocar código)

Todo el contenido se gestiona desde **[http://localhost:3000/studio](http://localhost:3000/studio)**.

### Paso A: Configurar la Marca (Branding)
Entra en el Studio -> **Marca (Brand)**. Aquí defines la identidad visual del gimnasio:
*   **Logo**: Sube el logo del cliente.
*   **Colores**: Define los colores Primario, Secundario y Fondo. La web cambiará automáticamente.
*   **Tipografía**: Elige fuentes (Inter/Roboto).
*   **Header Settings**: Personaliza los enlaces del menú (Ej: "Inicio", "Clases").
*   **Footer Settings**: Texto del pie de página y redes sociales.

### Paso B: Base de Datos de Secciones
Antes de armar la página, crea los bloques de contenido en las carpetas correspondientes del Studio:
*   **UI Sections Database** -> **Hero Sections**: Crea la portada.
*   **UI Sections Database** -> **Pricing Plans**: Crea los planes de precios.
*   **UI Sections Database** -> **Photo Galleries**: Sube fotos de las instalaciones.
*   **UI Sections Database** -> **Generic Sections**: Para "Sobre Nosotros", "Clases", etc.

### Paso C: Armar la Landing Page (¡El Lego!)
1.  Ve a **Páginas** -> **Landing Pages**.
2.  Crea la página "Home" (slug: `/`).
3.  Selecciona la **Marca** que creaste en el Paso A.
4.  En **Sections / Page Builder**, añade bloques en el orden que quieras:
    *   Añadir Item -> Select `Hero` -> Elige el Hero que creaste.
    *   Añadir Item -> Select `Gallery` -> Elige la Galería.
    *   Añadir Item -> Select `Generic (About)` -> Elige la sección About.
    *   Añadir Item -> Select `Pricing` -> El orden es flexible.
5.  ¡Dale a **Publish**!

---

## 📢 Componentes Disponibles

| Sección | Key (Código) | Configuración en Studio | Notas |
| :--- | :--- | :--- | :--- |
| **Hero** | `home` | **Hero Sections** | Soporta imagen de fondo, título, subtítulo y CTA. |
| **About Us** | `generic` (Variant: `about`) | **Generic Sections** | Texto a la izquierda, imagen a la derecha. |
| **Gallery** | `gallery` | **Photo Galleries** | Grilla tipo Masonry con Lightbox. |
| **Pricing** | `pricing` | **Pricing Plans** (Global) | Muestra tarjetas de precios automáticamente. |
| **Contact** | `contact` | (Próximamente) | Formulario de contacto / Mapa. |

---

## 🚢 Despliegue (Deploy)

La forma más rápida es usar **Vercel**.

1.  Sube tu nuevo repo a GitHub.
2.  Importa el proyecto en Vercel.
3.  En "Environment Variables" de Vercel, añade las mismas de tu `.env.local`:
    *   `NEXT_PUBLIC_SANITY_PROJECT_ID`
    *   `NEXT_PUBLIC_SANITY_DATASET`
4.  **Deploy**.

### ⚡ Opción Económica (Hostinger / cPanel)

Si usas hosting compartido barato (sin Node.js) o quieres ahorrar recursos:

1.  Ejecuta este comando mágico:
    ```bash
    npm run build:hostinger
    ```
2.  Se creará una carpeta llamada `out`.
3.  Sube el **CONTENIDO** de esa carpeta `out` a la carpeta `public_html` de tu hosting.
4.  ¡Listo! Tu web funcionará sin servidor, gratis y súper rápida.

*Nota: En esta modalidad, el Studio (`/studio`) no funcionará en la web. Debes editar el contenido localmente (`npm run dev`) y volver a subir los archivos cuando hagas cambios.*

---

## 🧹 Mantenimiento

*   Si quieres añadir una **nueva sección** al template global:
    1.  Crea el componente en `components/sections/NuevaSeccion.tsx`.
    2.  Regístralo en `lib/section-registry.tsx`.
    3.  Actualiza el esquema `landing.ts` en Sanity para permitir seleccionarla.
