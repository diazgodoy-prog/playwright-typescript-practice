import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly brand: Locator;
  readonly model: Locator;
  readonly daysInput: Locator;
  readonly total: Locator;
  readonly pricePerDay: Locator;
  readonly addToQuoteButton: Locator;
  readonly guarantee: Locator;
  readonly calibration: Locator;
  readonly shippingNotice: Locator;
  readonly cartCount: Locator;
  readonly cartButton: Locator;
  readonly galleryMain: Locator;
  readonly galleryThumbs: Locator;
  readonly relatedCards: Locator;
  readonly menuToggle: Locator;
  readonly menu: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly quoteDrawer: Locator;
  readonly quoteItems: Locator;
  readonly quoteNet: Locator;
  readonly quoteTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('product-title');
    this.brand = page.getByTestId('product-brand');
    this.model = page.getByTestId('product-model');
    this.daysInput = page.getByTestId('rent-days');
    this.total = page.getByTestId('rent-total');
    this.pricePerDay = page.getByTestId('price-per-day');
    this.addToQuoteButton = page.getByTestId('add-to-quote');
    this.guarantee = page.getByTestId('guarantee');
    this.calibration = page.getByTestId('calibration');
    this.shippingNotice = page.getByTestId('shipping-notice');
    this.cartCount = page.getByTestId('cart-count');
    this.cartButton = page.getByTestId('cart-button');
    this.galleryMain = page.getByTestId('gallery-main');
    this.galleryThumbs = page.getByTestId('gallery-thumb');
    this.relatedCards = page.getByTestId('related-card');
    this.menuToggle = page.getByTestId('menu-toggle');
    this.menu = page.getByTestId('menu');
    this.searchInput = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-button');
    this.searchResults = page.getByTestId('search-result');
    this.quoteDrawer = page.getByTestId('quote-drawer');
    this.quoteItems = page.getByTestId('quote-item');
    this.quoteNet = page.getByTestId('quote-net');
    this.quoteTotal = page.getByTestId('quote-total');
  }

  async goto() {
    await this.page.goto('/');
  }

  async setDays(days: number) {
    await this.daysInput.fill(String(days));
  }

  async addRelated(name: string) {
    await this.relatedCards.filter({ hasText: name }).getByTestId('related-add').click();
  }

  async openQuote() {
    await this.cartButton.click();
    await expect(this.quoteDrawer).toHaveClass(/open/);
    await expect(this.quoteDrawer).toBeVisible();
    // Espera a que termine cualquier animación del panel antes de interactuar
    await this.quoteDrawer.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  }

  async search(text: string) {
    await this.menuToggle.click();
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }
}
