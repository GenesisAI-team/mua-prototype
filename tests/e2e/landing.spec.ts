import { expect, test } from '@playwright/test';

test.describe('MUA landing', () => {
  test('renders the proposal headline and keeps the preview noindexed', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/MUA Estética/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(
      'Tu estilo está en los detalles.',
    );
    await expect(
      page.getByText('Propuesta no oficial', { exact: false }).first(),
    ).toBeVisible();

    await expect
      .poll(
        () =>
          page
            .locator('.hero-line__inner')
            .first()
            .evaluate((node) => getComputedStyle(node).transform),
        { timeout: 4_000 },
      )
      .toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test('exposes the phone and Instagram without inventing a booking flow', async ({
    page,
  }) => {
    await page.goto('/');

    const contact = page.locator('#contacto');

    await expect(
      contact.locator('a[href="tel:+34747496624"]').first(),
    ).toBeVisible();
    await expect(
      contact.locator('a[href*="instagram.com/muanails.es"]').first(),
    ).toHaveAttribute('href', /instagram\.com\/muanails\.es/);
    await expect(page.locator('form')).toHaveCount(0);
  });

  test('renders every image slot as an accessible placeholder', async ({
    page,
  }) => {
    await page.goto('/');

    const media = page.locator('[data-image-reveal]');
    expect(await media.count()).toBeGreaterThanOrEqual(12);
    await expect(page.locator('.media__label:visible').first()).toBeVisible();

    const labelled = await media.evaluateAll((nodes) =>
      nodes.every((node) => (node.getAttribute('aria-label') ?? '').length > 20),
    );

    expect(labelled).toBe(true);
  });

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('desktop navigation scrolls to the services section', async ({
    page,
    viewport,
  }) => {
    test.skip(!viewport || viewport.width < 900);

    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Navegación principal' })
      .getByRole('link', { name: 'Servicios', exact: true })
      .click();

    await expect(page.locator('#servicios')).toBeInViewport({ ratio: 0.15 });
  });

  test('mobile menu opens, navigates and closes', async ({
    page,
    viewport,
  }) => {
    test.skip(!viewport || viewport.width >= 900);

    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú de navegación' }).click();

    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();

    await menu.getByRole('link', { name: /Servicios/ }).click();
    await expect(menu).not.toBeVisible();
    await expect(page.locator('#servicios')).toBeInViewport({ ratio: 0.15 });
  });

  test('reduced motion shows content without hidden transforms', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'reduced-motion');

    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const state = await page.locator('[data-reveal]').first().evaluate((node) => {
      const styles = getComputedStyle(node);
      return { opacity: styles.opacity, transform: styles.transform };
    });

    expect(state.opacity).toBe('1');
    expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(state.transform);
  });

  test('content and fallback navigation remain readable without JavaScript', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();

    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Navegación sin JavaScript' }),
    ).toBeVisible();
    await expect(page.locator('.media__label:visible').first()).toBeVisible();

    await context.close();
  });
});
