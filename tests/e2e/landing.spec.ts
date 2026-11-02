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

  test('opens the phone dialer from the hero primary CTA', async ({ page }) => {
    await page.goto('/');

    const actions = page.locator('.hero-actions');
    const call = actions.getByRole('link', {
      name: 'Consultar disponibilidad',
      exact: true,
    });

    await expect(call).toHaveAttribute('href', 'tel:+34747496624');
    await expect(
      actions.getByRole('link', { name: 'Ver servicios', exact: true }),
    ).toHaveAttribute('href', '#servicios');
    await expect(page.locator('.hero-note .provisional-tag')).toHaveText(
      'Datos de contacto provisionales',
    );
  });

  test('uses direct WhatsApp links without a booking form', async ({ page }) => {
    await page.goto('/');

    const contact = page.locator('#contacto');
    const whatsappLinks = page.locator('a[href^="https://wa.me/34747496624?text="]');

    await expect(
      contact.locator('a[href="tel:+34747496624"]').first(),
    ).toBeVisible();
    await expect(
      contact.locator('a[href*="instagram.com/muanails.es"]').first(),
    ).toHaveAttribute('href', /instagram\.com\/muanails\.es/);
    await expect(whatsappLinks).toHaveCount(20);
    await expect(page.locator('form')).toHaveCount(0);
  });

  test('shows the five services and the full price list', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.service-card')).toHaveCount(5);
    await expect(page.locator('.service-card__title')).toHaveText([
      'Manicura y esmaltado semipermanente',
      'Uñas acrílicas y extensiones',
      'Pedicura',
      'Diseño de cejas',
      'Tratamiento facial',
    ]);

    await expect(page.locator('.pricing-group__title')).toHaveText([
      'Manicura',
      'Pedicura',
      'Otros servicios',
    ]);
    await expect(page.locator('.pricing-row')).toHaveCount(14);
    await expect(page.locator('.pricing-row__price')).toHaveText([
      '15 €',
      '17 €',
      '20 €',
      '25 €',
      '28 €',
      '40 €',
      '28 €',
      '3 €',
      '20 €',
      '25 €',
      '30 €',
      '7/10 €',
      '55 €',
      '65 €',
    ]);

    const reservations = page.locator('.pricing-row__cta');
    await expect(reservations).toHaveCount(14);

    const messages = await reservations.evaluateAll((nodes) =>
      nodes.map((node) => {
        const url = new URL((node as HTMLAnchorElement).href);
        return url.searchParams.get('text');
      }),
    );

    expect(messages.every((message) => message?.startsWith('Hola, quiero reservar'))).toBe(
      true,
    );
  });

  test('integrates the selected images and keeps the map pending', async ({
    page,
  }) => {
    await page.goto('/');

    const media = page.locator('[data-image-reveal]');
    expect(await media.count()).toBeGreaterThanOrEqual(23);
    await expect(page.locator('.media__img')).toHaveCount(22);
    await expect(page.locator('.media__label')).toHaveCount(1);
    await expect(page.locator('.media__label')).toHaveText('MAPA PENDIENTE');
    await expect(page.getByText('Imágenes ilustrativas').first()).toBeVisible();

    const labelled = await media.evaluateAll((nodes) =>
      nodes.every((node) => (node.getAttribute('aria-label') ?? '').length > 20),
    );

    expect(labelled).toBe(true);
  });

  test('shows the hero as a six-image editorial mosaic', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.hero-collage .media:visible')).toHaveCount(6);
    await expect(
      page.locator('.hero-collage .media__img[src*="mua-hero"]'),
    ).toHaveCount(7);
  });

  test('layers the last four gallery images in an overlapping cluster', async ({
    page,
    viewport,
  }) => {
    await page.goto('/');

    const cluster = page.locator('.gallery-item--cluster');

    await expect(cluster).toHaveCount(4);

    const sources = await cluster
      .locator('.media__img')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('src')));

    expect(sources).toEqual([
      '/images/mua-diseno-cejas.webp',
      '/images/mua-manicura-francesa.webp',
      '/images/mua-galeria-08.webp',
      '/images/mua-galeria-06.webp',
    ]);

    test.skip(!viewport || viewport.width < 1024);

    await page.locator('.gallery-cluster').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const boxes = await cluster.evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, y: rect.y, w: rect.width, h: rect.height };
      }),
    );
    const overlaps = (
      a: { x: number; y: number; w: number; h: number },
      b: { x: number; y: number; w: number; h: number },
    ) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

    expect(overlaps(boxes[0]!, boxes[1]!)).toBe(true);
    expect(overlaps(boxes[0]!, boxes[2]!)).toBe(true);
    expect(overlaps(boxes[2]!, boxes[3]!)).toBe(true);
  });

  test('loads the integrated images after scrolling the page', async ({
    page,
  }) => {
    await page.goto('/');

    await page.mouse.move(100, 400);
    for (let step = 0; step < 10; step += 1) {
      await page.mouse.wheel(0, 900);
      await page.waitForTimeout(120);
    }

    const images = page.locator('.media__img:visible');
    const imageCount = await images.count();

    for (let index = 0; index < imageCount; index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }

    await expect
      .poll(
        () =>
          images.evaluateAll((nodes) =>
            nodes.every(
              (node) =>
                node instanceof HTMLImageElement &&
                node.complete &&
                node.naturalWidth > 0,
            ),
          ),
        { timeout: 10_000 },
      )
      .toBe(true);
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
    await expect(page.locator('#servicios')).toBeInViewport({ ratio: 0.05 });
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
    await expect(page.locator('.media__img')).toHaveCount(22);
    await expect(page.locator('.media__label:visible')).toHaveCount(1);
    await expect(page.locator('.hero-collage .media:visible')).toHaveCount(6);

    await context.close();
  });
});
