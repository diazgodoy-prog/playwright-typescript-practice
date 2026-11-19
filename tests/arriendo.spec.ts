import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Página de arriendo - Megger VLF Sinus 62kV', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

  test('muestra la información del equipo', async () => {
    await expect(productPage.title).toHaveText('Megger VLF Sinus 62kV + Tangente Delta');
    await expect(productPage.brand).toContainText('Megger');
    await expect(productPage.model).toContainText('Sinus 62');
    await expect(productPage.pricePerDay).toHaveText('$1.000.000');
    await expect(productPage.total).toHaveText('$1.000.000');
    await expect(productPage.guarantee).toContainText('$60.000.000');
    await expect(productPage.calibration).toBeVisible();
    await expect(productPage.shippingNotice).toContainText('sin factibilidad de envío');
  });

  test('calcula el total según los días de arriendo', async () => {
    await productPage.setDays(3);
    await expect(productPage.total).toHaveText('$3.000.000');
  });

  test('cambia la imagen principal al hacer clic en una miniatura', async () => {
    await expect(productPage.galleryThumbs).toHaveCount(4);
    await productPage.galleryThumbs.nth(2).click();
    await expect(productPage.galleryMain).toHaveAttribute('data-index', '2');
    await expect(productPage.galleryThumbs.nth(2)).toHaveAttribute('aria-current', 'true');
  });

  test('agrega el equipo y un complementario a la cotización', async () => {
    await productPage.setDays(2);
    await productPage.addToQuoteButton.click();
    await expect(productPage.cartCount).toHaveText('1');

    await productPage.addRelated('Detector de Alto Voltaje');
    await expect(productPage.cartCount).toHaveText('2');

    await productPage.openQuote();
    await expect(productPage.quoteDrawer).toHaveClass(/open/);
    await expect(productPage.quoteItems).toHaveCount(2);
    // 2 x 1.000.000 + 1 x 39.000 = 2.039.000 neto; + 19% IVA = 2.426.410
    await expect(productPage.quoteNet).toHaveText('$2.039.000');
    await expect(productPage.quoteTotal).toHaveText('$2.426.410');
  });

  test('quita un equipo de la cotización', async () => {
    await productPage.addToQuoteButton.click();
    await productPage.openQuote();
    await productPage.quoteItems.first().getByTestId('quote-item-remove').click();
    await expect(productPage.quoteItems).toHaveCount(0);
    await expect(productPage.cartCount).toHaveText('0');
  });

  test('el menú despliega categorías y busca equipos', async ({ page }) => {
    await productPage.menuToggle.click();
    await expect(productPage.menu).toBeVisible();

    const pruebas = page.getByTestId('category').filter({ hasText: 'Pruebas Eléctricas' });
    await pruebas.click();
    await expect(pruebas).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Megóhmetros' })).toBeVisible();

    await productPage.searchInput.fill('megóhmetro');
    await productPage.searchButton.click();
    await expect(productPage.searchResults).toHaveCount(2);
  });
});
