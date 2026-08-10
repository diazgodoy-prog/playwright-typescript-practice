import { test, expect } from '@playwright/test';


test('agregar productos al carrito', async ({ page }) => {
  // login
  await page.goto('https://www.saucedemo.com/');
  // coloca nombre de usuario y contraseña válidos
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
    // hace clic en el botón de inicio de sesión 
  await page.locator('#login-button').click();
    // valida si ya esta en la página siguiente y si tiene el titulo correcto
  await expect (page).toHaveURL(/inventory.html/);
  // agrega productos al carro de compras 
  await page.locator('data-test=add-to-cart-sauce-labs-backpack').click();
  await page.locator('data-test=add-to-cart-sauce-labs-onesie').click();
  // valida el contador del carro de compras
  await expect (page.locator('.shopping_cart_badge')).toHaveText('2');
  // ir al carrito de compras 
  await page.locator('.shopping_cart_link').click();
  await expect (page).toHaveURL(/cart.html/);
  // validar los productos agregados al carro de compras 
  await expect (page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
  await expect (page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Onesie');
}); 
