import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Pizza Test')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  // Workaround: dialog simultaneously closes while the toast is rendering,
  // so we need to wait for the dialog to be hidden
  await page
    .getByRole('dialog', { name: 'Perfil da loja' })
    .waitFor({ state: 'hidden' })

  expect(page.getByRole('button', { name: 'Pizza Test' })).toBeVisible()
})
