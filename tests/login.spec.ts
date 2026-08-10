import { test, expect } from '@playwright/test';


test('login exitoso con usuario válido', async ({ page }) => {
  // login
  await page.goto('https://www.saucedemo.com/');
  // coloca nombre de usuario y contraseña válidos
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
    // hace clic en el botón de inicio de sesión 
  await page.locator('#login-button').click();
    // valida si ya esta en la página siguiente y si tiene el titulo correcto
  await expect (page).toHaveURL(/inventory.html/);
}); 
