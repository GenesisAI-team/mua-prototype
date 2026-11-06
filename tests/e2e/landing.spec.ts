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
    await expect(page.locator('.hero-note .provisional-tag')).toHaveCount(0);
    await expect(page.locator('.provisional-tag')).toHaveCount(1);
    await expect(page.locator('.provisional-tag')).toHaveText(
      'Imágenes ilustrativas',
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
    await expect(page.locator('.media__img')).toHaveCount(34);
    await expect(page.locator('.media__label')).toHaveCount(1);
    await expect(page.locator('.media__label')).toHaveText('MAPA PENDIENTE');
    await expect(page.getByText('Imágenes ilustrativas').first()).toBeVisible();

    const labelled = await media.evaluateAll((nodes) =>
      nodes.every((node) => (node.getAttribute('aria-label') ?? '').length > 20),
    );

    expect(labelled).toBe(true);
  });

  test('shows the hero as an editorial mosaic with an image rail', async ({
    page,
    viewport,
  }) => {
    await page.goto('/');

    // Desktop: main + 2 tiles + 6 del rail vertical. Móvil: solo main y
    // fachada (la franja horizontal ahora vive en la sección de servicios).
    const expectedMedia = viewport && viewport.width >= 900 ? 9 : 2;

    await expect(
      page.locator('.hero-collage .media:visible'),
    ).toHaveCount(expectedMedia);
    await expect(
      page.locator('.hero-collage .media__img[src*="mua-hero"]'),
    ).toHaveCount(11);
  });

  test('loops the services marquee on the compositor without jitter', async ({
    page,
    viewport,
  }, testInfo) => {
    const reduced = testInfo.project.name === 'reduced-motion';

    if (reduced) {
      await page.setViewportSize({ width: 390, height: 844 });
    }

    await page.goto('/');

    const track = page.locator('.hero-rail-h__track');
    const isMobile = reduced || !viewport || viewport.width < 900;

    if (!isMobile) {
      await expect(track).not.toBeVisible();
      return;
    }

    await expect(track).toBeVisible();
    await page.evaluate(() => {
      document
        .querySelector('.hero-rail-h')
        ?.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(300);

    const readX = () =>
      track.evaluate((node) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(node).transform);
        return matrix.m41;
      });

    if (reduced) {
      const animationName = await track.evaluate(
        (node) => getComputedStyle(node).animationName,
      );
      expect(animationName).toBe('none');

      const initialX = await readX();
      await page.waitForTimeout(400);
      expect(await readX()).toBe(initialX);
      return;
    }

    const geometry = await track.evaluate((node) => {
      const sets = [...node.children].map(
        (set) => set.getBoundingClientRect().width,
      );

      return {
        track: node.getBoundingClientRect().width,
        setCount: sets.length,
        firstSet: sets[0] ?? 0,
        secondSet: sets[1] ?? 0,
      };
    });

    expect(geometry.setCount).toBe(2);
    expect(Math.abs(geometry.firstSet - geometry.secondSet)).toBeLessThan(1);
    expect(
      Math.abs(geometry.track - geometry.firstSet * 2),
    ).toBeLessThan(1);

    const animation = await track.evaluate((node) => {
      const style = getComputedStyle(node);

      return {
        name: style.animationName,
        duration: style.animationDuration,
        iteration: style.animationIterationCount,
        timing: style.animationTimingFunction,
      };
    });

    expect(animation.name).toBe('hero-rail-h-loop');
    expect(animation.duration).toBe('30s');
    expect(animation.iteration).toBe('infinite');
    expect(animation.timing).toBe('linear');

    const samples = await track.evaluate(async (node) => {
      return new Promise<{ t: number; x: number; dt: number }[]>((resolve) => {
        const frames: { t: number; x: number; dt: number }[] = [];
        let previous = performance.now();

        const tick = (now: number) => {
          const matrix = new DOMMatrixReadOnly(
            getComputedStyle(node).transform,
          );
          frames.push({ t: now, x: matrix.m41, dt: now - previous });
          previous = now;

          if (frames.length < 30) {
            requestAnimationFrame(tick);
          } else {
            resolve(frames);
          }
        };

        requestAnimationFrame(tick);
      });
    });

    const steps = samples.slice(1).flatMap((sample, index) => {
      const previous = samples[index];

      return previous ? [{ dt: sample.dt, dx: sample.x - previous.x }] : [];
    });
    const moving = steps.filter((step) => step.dt > 0);

    expect(moving.length).toBeGreaterThan(10);
    expect(steps.every((step) => step.dx <= 0.01)).toBe(true);

    const speeds = moving.map((step) => -step.dx / step.dt);
    const meanSpeed =
      speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
    const expectedSpeed = geometry.track / 2 / 30_000;

    expect(meanSpeed).toBeGreaterThan(expectedSpeed * 0.7);
    expect(meanSpeed).toBeLessThan(expectedSpeed * 1.3);

    for (const speed of speeds) {
      expect(Math.abs(speed - meanSpeed) / meanSpeed).toBeLessThan(0.5);
    }
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
      const image = images.nth(index);
      const alwaysMoving = await image.evaluate((node) =>
        Boolean(
          node.closest(
            '.hero-rail, .hero-rail-h, .hero-visual__media--mobile, .hero-visual__media--facade',
          ),
        ),
      );

      // The rails loop forever and the mobile collage floats in 3D, so
      // Playwright would wait for a stability that never comes; those images
      // sit near the top of the page and load already.
      if (alwaysMoving) {
        continue;
      }

      await image.scrollIntoViewIfNeeded();
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
    await expect(page.locator('.media__img')).toHaveCount(34);
    await expect(page.locator('.media__label:visible')).toHaveCount(1);
    await expect(page.locator('.hero-collage .media:visible')).toHaveCount(9);

    await context.close();
  });
});
