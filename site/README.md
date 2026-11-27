# Página de arriendo de equipos

Página de producto para arriendo de equipos (ejemplo: Megger VLF Sinus 62kV), hecha con HTML, CSS y JavaScript sin dependencias.

## Ver la página

```bash
npm start
# abre http://localhost:3000
```

## Qué incluye

- Encabezado con logo, menú (buscador + categorías desplegables) y contador de cotización.
- Galería con imagen principal y miniaturas.
- Marca, modelo, título y descripción.
- Caja de arriendo: días → total, "Agregar a Cotización", garantía y calibración.
- Aviso de retiro en sucursal y tabla de características técnicas.
- Carrusel de productos complementarios.
- Panel de cotización (neto, IVA 19%, total) con envío por WhatsApp; se guarda en el navegador.
- Botón flotante "¿Te ayudamos?" de WhatsApp.

## Personalizar

- **Textos y precios** del equipo y de los complementarios: directo en `index.html` (así Google los lee).
  Los precios que usa la cotización están en los atributos `data-price-per-day` y `data-guarantee`.
- **Nombre de la empresa** ("MaaoRent"): búscalo y reemplázalo en `index.html`, `og-image.png` y `favicon.svg`.
- `WHATSAPP_NUMBER` en `app.js`: tu número (ej. `56912345678`).
- `SVG` en `app.js`: ilustraciones de ejemplo; reemplázalas por fotos reales.
- Colores y tipografías: variables en `:root` de `styles.css`.

## SEO (para aparecer en Google)

Ya incluido:
- `<title>` y `meta description` con el equipo y "Calama".
- Contenido en el HTML (visible aunque JavaScript no cargue).
- Datos estructurados Schema.org: `Product` (precio por día en CLP), `LocalBusiness` (Calama), `FAQPage` y `BreadcrumbList`.
- Secciones "¿Para qué se usa?" y "Preguntas frecuentes".
- Vista previa al compartir (`og-image.png`), `favicon.svg`, `robots.txt` y `sitemap.xml`.

Cuando tengas dominio propio, reemplaza `https://diazgodoy-prog.github.io/playwright-typescript-practice/`
por tu dominio en `index.html`, `robots.txt` y `sitemap.xml`.

Pasos fuera del código:
1. Registrar el sitio en Google Search Console y enviar `sitemap.xml`.
2. Crear la ficha en Google Business Profile (Calama).
3. Conseguir reseñas y enlaces desde directorios, proveedores y redes sociales.

## Publicar con GitHub Pages

El workflow `.github/workflows/pages.yml` publica la carpeta `site/` cada vez que hay cambios en `main`.
Solo una vez: en GitHub ve a **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**.
La página queda en `https://diazgodoy-prog.github.io/playwright-typescript-practice/`.

## Tests

`tests/arriendo.spec.ts` (Page Object en `pages/ProductPage.ts`). Playwright levanta el servidor solo (`webServer` en `playwright.config.ts`):

```bash
npx playwright test tests/arriendo.spec.ts tests/seo.spec.ts
```

`tests/seo.spec.ts` revisa título, descripción, datos estructurados, robots.txt y sitemap.
