'use strict';

/* =====================================================================
 * Datos — edita aquí precios, textos y productos.
 * ===================================================================== */
const WHATSAPP_NUMBER = ''; // ej: '56912345678' (vacío = WhatsApp elige el contacto)
const IVA = 0.19;

const PRODUCT = {
  id: 'megger-vlf-sinus-62kv',
  brand: 'Megger',
  model: 'Sinus 62',
  name: 'Megger VLF Sinus 62kV + Tangente Delta',
  description:
    'El Megger VLF Sinus 62 kV es un sistema portátil de pruebas de muy baja frecuencia (VLF) ' +
    'diseñado para cables de media tensión, con capacidades avanzadas de diagnóstico e ' +
    'interpretación automática de resultados',
  pricePerDay: 1000000,
  guarantee: 60000000,
  calibrated: true,
  shipping: false,
  images: ['open', 'closed', 'front', 'side'],
  specs: [
    ['Tensión de salida máxima', '62 kV pico (44 kVrms)'],
    ['Forma de onda', 'Senoidal VLF'],
    ['Frecuencia de prueba', '0,01 – 0,1 Hz'],
    ['Diagnóstico', 'Tangente Delta (TD) integrada'],
    ['Aplicación', 'Cables de media tensión'],
    ['Interpretación', 'Automática de resultados'],
  ],
};

const RELATED = [
  { id: 'detector-alto-voltaje', name: 'Detector de Alto Voltaje sin Contacto', pricePerDay: 39000, img: 'probe' },
  { id: 'medidor-rigidez-dielectrica', name: 'Medidor de Rigidez Dieléctrica de Aceite', pricePerDay: 450000, img: 'tester' },
  { id: 'megohmetro-aemc-1060', name: 'Probador de Aislación Megóhmetro AEMC 1060 1kV', pricePerDay: 60000, img: 'case' },
  { id: 'megohmetro-5kv', name: 'Probador de Aislación Megóhmetro 5kV', pricePerDay: 80000, img: 'case' },
  { id: 'pinza-amperimetrica', name: 'Pinza Amperimétrica True RMS 1000A', pricePerDay: 25000, img: 'clamp' },
];

const CATEGORIES = [
  { name: 'Pruebas Eléctricas', items: ['Equipos VLF', 'Megóhmetros', 'Detectores de tensión', 'Rigidez dieléctrica', 'Telurómetros'] },
  { name: 'Solar', items: ['Trazadores de curva I-V', 'Medidores de irradiancia'] },
  { name: 'Análisis de Energía', items: ['Analizadores de redes', 'Pinzas amperimétricas', 'Registradores'] },
  { name: 'Automatización Industrial', items: ['Calibradores de procesos', 'Comunicadores HART'] },
  { name: 'Gas SF₆', items: ['Analizadores de SF₆', 'Detectores de fuga'] },
  { name: 'Termografía', items: ['Cámaras termográficas', 'Termómetros infrarrojos'] },
  { name: 'Otras Categorías', items: ['Accesorios', 'Seguridad eléctrica'] },
  { name: 'Capacitaciones' },
  { name: 'Blog' },
];

/* =====================================================================
 * Ilustraciones SVG (reemplázalas por <img src="..."> con fotos reales)
 * ===================================================================== */
const SVG = {
  open: `<svg viewBox="0 0 200 200" role="img" aria-label="Equipo VLF con tapa abierta">
    <polygon points="70,40 160,25 150,95 72,100" fill="#eef1f5" stroke="#9aa3ad" stroke-width="2"/>
    <line x1="100" y1="36" x2="98" y2="98" stroke="#c9ced5"/><line x1="130" y1="31" x2="126" y2="96" stroke="#c9ced5"/>
    <polygon points="45,95 150,85 165,100 60,112" fill="#55585f"/>
    <polygon points="45,95 60,112 62,180 45,165" fill="#3a3c41"/>
    <polygon points="60,112 165,100 163,170 62,180" fill="#e7e9ec" stroke="#b5bac1"/>
    <rect x="95" y="95" width="30" height="8" rx="2" fill="#1d2a33" transform="skewX(-25)"/>
    <circle cx="80" cy="100" r="4" fill="#d33"/>
    <text x="80" y="140" font-size="9" fill="#c0392b" font-family="sans-serif" transform="rotate(-6 80 140)">VLF 62</text>
  </svg>`,
  closed: `<svg viewBox="0 0 200 200" role="img" aria-label="Equipo VLF cerrado">
    <polygon points="40,70 140,55 165,75 65,92" fill="#f2f4f7" stroke="#9aa3ad"/>
    <polygon points="40,70 65,92 65,165 40,145" fill="#2f3135"/>
    <polygon points="65,92 165,75 165,148 65,165" fill="#e4e7eb" stroke="#b5bac1"/>
    <rect x="72" y="100" width="40" height="40" fill="#3a3c41" opacity=".25"/>
  </svg>`,
  front: `<svg viewBox="0 0 200 200" role="img" aria-label="Vista frontal del equipo VLF">
    <rect x="45" y="55" width="110" height="20" rx="3" fill="#f2f4f7" stroke="#9aa3ad"/>
    <rect x="40" y="75" width="120" height="85" rx="4" fill="#e7e9ec" stroke="#9aa3ad"/>
    <rect x="35" y="95" width="8" height="18" rx="2" fill="#333"/><rect x="157" y="95" width="8" height="18" rx="2" fill="#333"/>
    <text x="100" y="105" text-anchor="middle" font-size="10" fill="#c0392b" font-family="sans-serif">VLF 62</text>
    <rect x="40" y="155" width="120" height="8" fill="#2f3135"/>
  </svg>`,
  side: `<svg viewBox="0 0 200 200" role="img" aria-label="Vista lateral del equipo VLF abierto">
    <rect x="75" y="30" width="50" height="55" rx="3" fill="#eef1f5" stroke="#9aa3ad"/>
    <rect x="65" y="85" width="70" height="85" rx="4" fill="#e7e9ec" stroke="#9aa3ad"/>
    <rect x="58" y="110" width="8" height="20" rx="2" fill="#333"/><rect x="134" y="110" width="8" height="20" rx="2" fill="#333"/>
    <rect x="65" y="165" width="70" height="8" fill="#2f3135"/>
    <circle cx="80" cy="180" r="5" fill="#333"/><circle cx="120" cy="180" r="5" fill="#333"/>
  </svg>`,
  probe: `<svg viewBox="0 0 200 200" role="img" aria-label="Detector de alto voltaje">
    <g transform="rotate(35 100 100)">
      <rect x="72" y="25" width="56" height="45" rx="10" fill="#e8b416"/>
      <circle cx="100" cy="35" r="10" fill="#c0392b"/>
      <rect x="80" y="70" width="40" height="30" fill="#e8501c"/>
      <rect x="88" y="100" width="24" height="75" rx="6" fill="#ef6a2b"/>
    </g>
  </svg>`,
  tester: `<svg viewBox="0 0 200 200" role="img" aria-label="Medidor de rigidez dieléctrica">
    <rect x="35" y="60" width="130" height="95" rx="8" fill="#2b2d31"/>
    <rect x="45" y="70" width="110" height="60" rx="4" fill="#e5e8eb"/>
    <rect x="55" y="78" width="35" height="16" fill="#1d2a33"/>
    <circle cx="110" cy="88" r="6" fill="#c0392b"/><circle cx="130" cy="88" r="6" fill="#27ae60"/>
    <rect x="80" y="45" width="40" height="15" rx="4" fill="none" stroke="#2b2d31" stroke-width="6"/>
    <rect x="140" y="110" width="40" height="45" rx="4" fill="#f5c518"/>
  </svg>`,
  case: `<svg viewBox="0 0 200 200" role="img" aria-label="Megóhmetro en maletín amarillo">
    <rect x="40" y="20" width="120" height="70" rx="8" fill="#f5c518" stroke="#c9a00a" stroke-width="2"/>
    <rect x="62" y="35" width="76" height="35" fill="#1d1d1d"/>
    <rect x="35" y="90" width="130" height="85" rx="8" fill="#f5c518" stroke="#c9a00a" stroke-width="2"/>
    <rect x="50" y="100" width="100" height="65" rx="4" fill="#2b2d31"/>
    <rect x="65" y="108" width="50" height="25" rx="2" fill="#7fd3e6"/>
    <circle cx="132" cy="140" r="9" fill="#f5c518"/>
    <rect x="80" y="10" width="40" height="12" rx="4" fill="none" stroke="#222" stroke-width="5"/>
  </svg>`,
  clamp: `<svg viewBox="0 0 200 200" role="img" aria-label="Pinza amperimétrica">
    <path d="M70 70a30 30 0 1 1 60 0" fill="none" stroke="#e8501c" stroke-width="14"/>
    <rect x="70" y="70" width="60" height="105" rx="10" fill="#e8501c"/>
    <rect x="80" y="85" width="40" height="28" rx="2" fill="#cfe9d8"/>
    <circle cx="100" cy="140" r="12" fill="#2b2d31"/>
  </svg>`,
};

/* =====================================================================
 * Utilidades
 * ===================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const clp = (n) => '$' + new Intl.NumberFormat('es-CL').format(Math.round(n));
const clampDays = (v) => Math.min(365, Math.max(1, parseInt(v, 10) || 1));
const chevron = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="m6 9 6 6 6-6-1.4-1.4L12 12.2 7.4 7.6z"/></svg>';
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const storage = {
  get() { try { return JSON.parse(localStorage.getItem('quote') || '[]'); } catch { return []; } },
  set(v) { try { localStorage.setItem('quote', JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
};

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

let toastTimer;
function toast(msg) {
  const el = $('[data-test="toast"]');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* =====================================================================
 * Producto principal
 * ===================================================================== */
function renderProduct() {
  $('[data-test="product-brand"] span').textContent = PRODUCT.brand;
  $('[data-test="product-model"] span').textContent = PRODUCT.model;
  $('[data-test="product-title"]').textContent = PRODUCT.name;
  $('[data-test="product-description"]').textContent = PRODUCT.description;
  $('[data-test="price-per-day"]').textContent = clp(PRODUCT.pricePerDay);
  $('[data-test="guarantee"] b').textContent = clp(PRODUCT.guarantee);
  $('[data-test="calibration"]').hidden = !PRODUCT.calibrated;
  $('[data-test="shipping-notice"]').hidden = PRODUCT.shipping;

  $('[data-test="specs-table"] tbody').innerHTML = PRODUCT.specs
    .map(([k, v]) => `<tr><th scope="row">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('');

  updateTotal();
}

function updateTotal() {
  const input = $('[data-test="rent-days"]');
  const days = clampDays(input.value);
  $('[data-test="rent-total"]').textContent = clp(PRODUCT.pricePerDay * days);
  return days;
}

/* =====================================================================
 * Galería
 * ===================================================================== */
function renderGallery() {
  const main = $('[data-test="gallery-main"]');
  const thumbs = $('[data-test="gallery-thumbs"]');

  thumbs.innerHTML = PRODUCT.images
    .map((key, i) => `<button class="thumb" data-test="gallery-thumb" data-index="${i}" aria-label="Ver imagen ${i + 1}">${SVG[key]}</button>`)
    .join('');

  const select = (i) => {
    main.innerHTML = SVG[PRODUCT.images[i]];
    main.dataset.index = i;
    thumbs.querySelectorAll('.thumb').forEach((t, j) => t.setAttribute('aria-current', String(i === j)));
  };
  thumbs.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb');
    if (btn) select(Number(btn.dataset.index));
  });
  select(0);
}

/* =====================================================================
 * Complementarios
 * ===================================================================== */
function renderRelated() {
  $('[data-test="related-list"]').innerHTML = RELATED.map((p) => `
    <article class="prod-card" data-test="related-card" data-id="${p.id}">
      <div class="prod-card__img">${SVG[p.img]}</div>
      <div class="prod-card__body">
        <h3 class="prod-card__name" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</h3>
        <p class="prod-card__price">${clp(p.pricePerDay)} + IVA</p>
        <p class="prod-card__per">Por día de arriendo</p>
      </div>
      <button class="btn btn--yellow btn--block" data-test="related-add" data-id="${p.id}">Agregar a Cotización</button>
    </article>`).join('');

  $('[data-test="related-list"]').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-test="related-add"]');
    if (!btn) return;
    const p = RELATED.find((r) => r.id === btn.dataset.id);
    addToQuote(p, 1);
  });
}

/* =====================================================================
 * Menú, categorías y búsqueda
 * ===================================================================== */
function renderMenu() {
  const toggle = $('[data-test="menu-toggle"]');
  const menu = $('[data-test="menu"]');

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.hidden = !open;
    if (open) $('[data-test="search-input"]').focus();
  });

  $('[data-test="categories"]').innerHTML = CATEGORIES.map((c, i) => c.items
    ? `<li class="category">
         <button class="category__btn" data-test="category" aria-expanded="false" aria-controls="cat-${i}">${c.name}${chevron}</button>
         <ul class="category__sub" id="cat-${i}" data-test="category-items" hidden>
           ${c.items.map((it) => `<li><a href="#">${it}</a></li>`).join('')}
         </ul>
       </li>`
    : `<li class="category"><a class="category__link" data-test="category" href="#">${c.name}</a></li>`).join('');

  $('[data-test="categories"]').addEventListener('click', (e) => {
    const btn = e.target.closest('.category__btn');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  });

  $('[data-test="search-form"]').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('[data-test="search-input"]').value.trim().toLowerCase();
    const list = $('[data-test="search-results"]');
    if (!q) { list.hidden = true; return; }
    const catalog = [{ id: PRODUCT.id, name: PRODUCT.name, pricePerDay: PRODUCT.pricePerDay }, ...RELATED];
    const hits = catalog.filter((p) => p.name.toLowerCase().includes(q));
    list.innerHTML = hits.length
      ? hits.map((p) => `<li data-test="search-result"><div class="result"><span>${escapeHtml(p.name)}</span><span class="price">${clp(p.pricePerDay)}/día</span></div></li>`).join('')
      : `<li data-test="search-empty">No encontramos equipos para “${escapeHtml(q)}”.</li>`;
    list.hidden = false;
  });
}

/* =====================================================================
 * Cotización (carrito)
 * ===================================================================== */
let quote = storage.get();

function addToQuote(p, days) {
  const existing = quote.find((q) => q.id === p.id);
  if (existing) existing.days += days;
  else quote.push({ id: p.id, name: p.name, pricePerDay: p.pricePerDay, days });
  saveQuote();
  const badge = $('[data-test="cart-count"]');
  badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
  toast(`Agregado: ${p.name}`);
}

function saveQuote() {
  storage.set(quote);
  renderQuote();
}

function renderQuote() {
  $('[data-test="cart-count"]').textContent = quote.length;
  $('[data-test="quote-empty"]').hidden = quote.length > 0;
  $('[data-test="quote-totals"]').hidden = quote.length === 0;

  $('[data-test="quote-items"]').innerHTML = quote.map((q) => `
    <li class="quote-item" data-test="quote-item" data-id="${q.id}">
      <span class="quote-item__name" data-test="quote-item-name">${escapeHtml(q.name)}</span>
      <span class="quote-item__meta">${clp(q.pricePerDay)} por día</span>
      <label class="quote-item__days">Días <input type="number" min="1" max="365" value="${q.days}" data-test="quote-item-days" data-id="${q.id}"></label>
      <span class="quote-item__sub" data-test="quote-item-subtotal">${clp(q.pricePerDay * q.days)}</span>
      <button class="quote-item__remove" data-test="quote-item-remove" data-id="${q.id}">Quitar</button>
    </li>`).join('');

  const net = quote.reduce((s, q) => s + q.pricePerDay * q.days, 0);
  $('[data-test="quote-net"]').textContent = clp(net);
  $('[data-test="quote-iva"]').textContent = clp(net * IVA);
  $('[data-test="quote-total"]').textContent = clp(net * (1 + IVA));

  const lines = quote.map((q) => `• ${q.name} — ${q.days} día(s): ${clp(q.pricePerDay * q.days)}`);
  $('[data-test="quote-send"]').href = waLink(
    `Hola, quiero cotizar el arriendo de:\n${lines.join('\n')}\n\nTotal neto: ${clp(net)} + IVA`,
  );
}

function setDrawer(open) {
  const drawer = $('[data-test="quote-drawer"]');
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  $('[data-test="overlay"]').hidden = !open;
  if (open) $('[data-test="quote-close"]').focus();
}

function bindQuote() {
  $('[data-test="add-to-quote"]').addEventListener('click', () => {
    const days = updateTotal();
    $('[data-test="rent-days"]').value = days;
    addToQuote(PRODUCT, days);
  });
  $('[data-test="rent-days"]').addEventListener('input', updateTotal);
  $('[data-test="rent-days"]').addEventListener('change', (e) => { e.target.value = clampDays(e.target.value); updateTotal(); });

  $('[data-test="cart-button"]').addEventListener('click', () => setDrawer(true));
  $('[data-test="quote-close"]').addEventListener('click', () => setDrawer(false));
  $('[data-test="overlay"]').addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });

  const list = $('[data-test="quote-items"]');
  list.addEventListener('change', (e) => {
    if (e.target.dataset.test !== 'quote-item-days') return;
    const item = quote.find((q) => q.id === e.target.dataset.id);
    item.days = clampDays(e.target.value);
    saveQuote();
  });
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-test="quote-item-remove"]');
    if (!btn) return;
    quote = quote.filter((q) => q.id !== btn.dataset.id);
    saveQuote();
  });
  $('[data-test="quote-clear"]').addEventListener('click', () => { quote = []; saveQuote(); });

  $('[data-test="whatsapp"]').href = waLink(`Hola, necesito ayuda con el arriendo de: ${PRODUCT.name}`);
}

/* ===================================================================== */
renderProduct();
renderGallery();
renderRelated();
renderMenu();
bindQuote();
renderQuote();
