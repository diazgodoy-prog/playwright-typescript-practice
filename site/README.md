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

Todo el contenido está al inicio de `app.js`:

- `PRODUCT`: datos del equipo principal (precio, garantía, especificaciones…).
- `RELATED`: productos complementarios.
- `CATEGORIES`: categorías del menú.
- `WHATSAPP_NUMBER`: tu número (ej. `56912345678`).
- `SVG`: ilustraciones de ejemplo; reemplázalas por fotos reales (`<img src="img/equipo.jpg">`).

Colores y tipografías: variables en `:root` de `styles.css`.

## Tests

`tests/arriendo.spec.ts` (Page Object en `pages/ProductPage.ts`). Playwright levanta el servidor solo (`webServer` en `playwright.config.ts`):

```bash
npx playwright test tests/arriendo.spec.ts
```
