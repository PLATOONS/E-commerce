import { test, expect } from '@playwright/test';

test('usuario puede agregar un producto al carrito', async ({ page }) => {
  await page.goto('/');

  // Click en el primer botón "Agregar al carrito"
  const firstAddButton = page.getByRole('button', { name: /agregar al carrito/i }).first();
  await firstAddButton.click();

  // Ir al carrito (puede ser un link en el navbar)
  await page.getByRole('link', { name: /carrito/i }).click();

  // Verificar que el producto aparece en el carrito
  await expect(
    page.getByTestId('cart-item')
  ).toBeVisible();
});
