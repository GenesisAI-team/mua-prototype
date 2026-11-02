import { describe, expect, it } from 'vitest';
import {
  gallery,
  navigation,
  priceGroups,
  principles,
  services,
  visitSteps,
} from '../../src/data/content';
import { imageSlots } from '../../src/data/images';
import { site } from '../../src/data/site';

describe('confirmed content', () => {
  it('keeps the five confirmed services as the main service cards', () => {
    expect(services.map((service) => service.id)).toEqual([
      'semipermanente',
      'acrilicas',
      'pedicura',
      'cejas',
      'facial',
    ]);
    expect(services.map((service) => service.title)).toEqual([
      'Manicura y esmaltado semipermanente',
      'Uñas acrílicas y extensiones',
      'Pedicura',
      'Diseño de cejas',
      'Tratamiento facial',
    ]);
  });

  it('keeps the confirmed price list grouped by category', () => {
    expect(priceGroups.map((group) => group.label)).toEqual([
      'Manicura',
      'Pedicura',
      'Otros servicios',
    ]);
    expect(priceGroups.map((group) => group.items.length)).toEqual([8, 3, 3]);
    expect(priceGroups.flatMap((group) => group.items.map((item) => item.price))).toEqual([
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
  });

  it('does not duplicate price rows and only declares the facial durations', () => {
    const items = priceGroups.flatMap((group) => group.items);

    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(items.filter((item) => item.duration).map((item) => item.duration)).toEqual([
      '45 min',
      '1 h',
    ]);
    expect(JSON.stringify(priceGroups)).not.toMatch(/IVA|protocolo/i);
  });

  it('keeps prices out of the service cards and avoids clinical promises', () => {
    const cards = JSON.stringify(services);
    const copy = JSON.stringify({
      services,
      priceGroups,
      principles,
      visitSteps,
      gallery,
    });

    expect(cards).not.toMatch(/€|precio|tarifa/i);
    expect(copy).not.toMatch(/resultado garantizado|promesa clínica|protocolo/i);
  });

  it('points every content image to a registered slot', () => {
    for (const service of services) {
      expect(imageSlots[service.imageSlot]).toBeDefined();
    }

    for (const item of gallery) {
      expect(imageSlots[item.slot]).toBeDefined();
    }
  });

  it('labels the relocated hero image as a French manicure', () => {
    const item = gallery.find((entry) => entry.slot === 'gallery-05');

    expect(item?.caption).toBe('Manicura francesa');
  });

  it('groups the last four gallery images into an overlapping cluster', () => {
    const clusterItems = gallery.filter((entry) => entry.position === 'cluster');

    expect(clusterItems.map((entry) => entry.slot)).toEqual([
      'gallery-07',
      'gallery-05',
      'gallery-08',
      'gallery-06',
    ]);
    expect(clusterItems.find((entry) => entry.slot === 'gallery-07')?.caption).toBe(
      'Diseño de cejas',
    );
    expect(clusterItems.find((entry) => entry.slot === 'gallery-08')?.caption).toBe(
      'Luz natural',
    );
  });

  it('keeps navigation limited to existing page anchors', () => {
    expect(navigation.map((item) => item.href)).toEqual([
      '#servicios',
      '#galeria',
      '#estudio',
      '#contacto',
    ]);
  });
});

describe('business data', () => {
  it('keeps the approved phone, address, hours and Instagram source', () => {
    expect(site.phone.href).toBe('tel:+34747496624');
    expect(site.phone.display).toBe('747 49 66 24');
    expect(site.address.line1).toBe('Calle de Artica');
    expect(site.address.line2).toBe('Pamplona, Navarra');
    expect(site.hours.label).toBe('Horario');
    expect(site.instagram.url).toBe(
      'https://www.instagram.com/muanails.es/?hl=es',
    );
  });

  it('contains no provisional references in the data', () => {
    expect(JSON.stringify(site)).not.toMatch(
      /provisional|pendiente de confirmar/i,
    );
  });

  it('does not present a verified review count or testimonial', () => {
    const copy = JSON.stringify(site);

    expect(copy).not.toMatch(/reseñas?\s*\(?\d+\)?/i);
    expect(copy).not.toMatch(/testimonio|valoración de clienta/i);
  });
});
