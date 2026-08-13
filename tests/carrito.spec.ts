import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('agregar producto al carrito', async ({ page }) => {
  // login
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page); 
    const cartPage = new CartPage(page);

    await loginPage.goto ();
    await loginPage.login('standard_user', 'secret_sauce');
 
    // valida si ya esta en la página siguiente y si tiene el titulo correcto
    await expect (page).toHaveURL(/inventory.html/);
    // agrega productos al carro de compras 
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-onesie');
    // valida el contador del carro de compras
    await expect (inventoryPage.cartBadge).toHaveText('2');
    // ir al carrito de compras 
    await inventoryPage.goToCart();
    await expect (page).toHaveURL(/cart.html/);
  // validar los productos agregados al carro de compras 
    await expect (page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect (page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Onesie');
}); 
