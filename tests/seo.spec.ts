import { test, expect } from '@playwright/test';

test.describe('SEO - página de arriendo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('título y descripción mencionan el equipo y Calama', async ({ page }) => {
    await expect(page).toHaveTitle(/Megger VLF Sinus 62kV.*Calama/);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Calama');
    expect(description!.length).toBeLessThanOrEqual(160);
  });

  test('tiene un solo h1 y el contenido está en el HTML sin JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Megger VLF Sinus 62kV + Tangente Delta');
    await expect(page.getByTestId('price-per-day')).toHaveText('$1.000.000');
    await expect(page.getByTestId('related-card')).toHaveCount(5);
    await context.close();
  });

  test('datos estructurados válidos con producto, empresa y preguntas', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw!);
    const types = data['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['Product', 'LocalBusiness', 'FAQPage', 'BreadcrumbList']));

    const product = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Product');
    expect(product.offers.price).toBe('1000000');
    expect(product.offers.priceCurrency).toBe('CLP');

    const business = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'LocalBusiness');
    expect(business.address.addressLocality).toBe('Calama');
  });

  test('vista previa para redes y canonical', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.png$/);
  });

  test('robots.txt, sitemap.xml e imagen están disponibles', async ({ request }) => {
    for (const path of ['/robots.txt', '/sitemap.xml', '/og-image.png', '/favicon.svg']) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
    expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:');
  });
});
