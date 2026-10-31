import { describe, expect, it } from 'vitest';
import {
  additionalServices,
  gallery,
  navigation,
  principles,
  services,
  visitSteps,
} from '../../src/data/content';
import { imageSlots } from '../../src/data/images';
import { site } from '../../src/data/site';

describe('confirmed content', () => {
  it('keeps the two core services as the main service cards', () => {
    expect(services.map((service) => service.id)).toEqual([
      'semipermanente',
      'acrilicas',
    ]);
    expect(services.map((service) => service.title)).toEqual([
      'Manicura y esmaltado semipermanente',
      'Uñas acrílicas y extensiones',
    ]);
  });

  it('lists the additional services confirmed by the user', () => {
    expect(additionalServices).toEqual([
      'Pedicura',
      'Diseño de cejas',
      'Tratamiento facial',
    ]);
  });

  it('does not include prices, bookings or clinical promises', () => {
    const copy = JSON.stringify({
      services,
      additionalServices,
      principles,
      visitSteps,
      gallery,
    });

    expect(copy).not.toMatch(/\b\d+\s?€\b/);
    expect(copy).not.toMatch(/precio|tarifa|reserva online|resultado garantizado/i);
  });

  it('points every content image to a registered slot', () => {
    for (const service of services) {
      expect(imageSlots[service.imageSlot]).toBeDefined();
    }

    for (const item of gallery) {
      expect(imageSlots[item.slot]).toBeDefined();
    }
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

describe('provisional business data', () => {
  it('marks the phone, address and schedule as provisional', () => {
    expect(site.phone.provisional).toBe(true);
    expect(site.address.provisional).toBe(true);
    expect(site.address.numberPending).toBe(true);
    expect(site.hours.provisional).toBe(true);
  });

  it('keeps the approved provisional phone and Instagram source', () => {
    expect(site.phone.href).toBe('tel:+34747496624');
    expect(site.phone.display).toBe('747 49 66 24');
    expect(site.instagram.url).toBe(
      'https://www.instagram.com/muanails.es/?hl=es',
    );
  });

  it('does not present a verified review count or testimonial', () => {
    const copy = JSON.stringify(site);

    expect(copy).not.toMatch(/reseñas?\s*\(?\d+\)?/i);
    expect(copy).not.toMatch(/testimonio|valoración de clienta/i);
  });
});
