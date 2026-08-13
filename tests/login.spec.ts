import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';



test('login exitoso con usuario válido', async ({ page }) => {
  // login
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto ();
  await loginPage.login('standard_user', 'secret_sauce');
   // valida si ya esta en la página siguiente y si tiene el titulo correcto
  await expect (page).toHaveURL(/inventory.html/);
  await expect (inventoryPage.title).toHaveText('Products');
}); 
