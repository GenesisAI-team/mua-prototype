import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { imageSlotList, imageSlots } from '../../src/data/images';

const expectedSlots = [
  'hero-desktop',
  'hero-mobile',
  'service-semi',
  'service-acrylic',
  'gallery-01',
  'gallery-02',
  'gallery-03',
  'gallery-04',
  'gallery-05',
  'gallery-06',
  'studio-salon',
  'studio-detail',
  'map',
];

const expectedSources = {
  'hero-desktop': '/images/mua-hero-desktop.webp',
  'hero-mobile': '/images/mua-hero-mobile.webp',
  'service-semi': '/images/mua-semipermanente.webp',
  'service-acrylic': '/images/mua-acrilicas.webp',
  'gallery-01': '/images/mua-galeria-01.webp',
  'gallery-02': '/images/mua-galeria-02.webp',
  'gallery-03': '/images/mua-galeria-03.webp',
  'gallery-04': '/images/mua-galeria-04.webp',
  'gallery-05': '/images/mua-acrilicas.webp',
  'gallery-06': '/images/mua-galeria-06.webp',
  'studio-salon': '/images/mua-estudio-salon.webp',
  'studio-detail': '/images/mua-estudio-detalle.webp',
};

describe('image slot inventory', () => {
  it('keeps every section slot registered', () => {
    expect(Object.keys(imageSlots).sort()).toEqual([...expectedSlots].sort());
  });

  it('defines a stable replacement file and layout box for every slot', () => {
    for (const slot of imageSlotList) {
      expect(slot.id).toBeTruthy();
      expect(slot.section).toBeTruthy();
      expect(slot.label).toBeTruthy();
      expect(slot.alt.length).toBeGreaterThan(20);
      expect(slot.ratio).toMatch(/^\d+ \/ \d+$/);
      expect(slot.width).toBeGreaterThan(0);
      expect(slot.height).toBeGreaterThan(0);
      expect(slot.futureFile).toMatch(/^mua-[a-z0-9-]+\.webp$/);
      expect(slot.note.length).toBeGreaterThan(10);
      expect(slot.src === null || slot.src.startsWith('/images/')).toBe(true);
    }
  });

  it('integrates the approved WebP assets with descriptive alt text', () => {
    for (const [slotId, src] of Object.entries(expectedSources)) {
      const slot = imageSlots[slotId as keyof typeof imageSlots];

      expect(slot.src).toBe(src);
      expect(slot.alt).toMatch(/recreación visual/i);
      expect(existsSync(resolve('public', src.replace(/^\//, '')))).toBe(true);
    }
  });

  it('reuses the acrylic asset in the gallery without duplicating the file', () => {
    expect(imageSlots['gallery-05'].src).toBe(imageSlots['service-acrylic'].src);
    expect(imageSlots['gallery-05'].futureFile).toBe('mua-galeria-05.webp');
  });

  it('does not duplicate replacement files or identifiers', () => {
    const files = imageSlotList.map((slot) => slot.futureFile);
    const ids = imageSlotList.map((slot) => slot.id);

    expect(new Set(files).size).toBe(files.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps the map pending instead of inventing a location image', () => {
    expect(imageSlots.map.src).toBeNull();
    expect(imageSlots.map.label).toBe('MAPA PENDIENTE');
    expect(imageSlots.map.alt).toMatch(/espacio reservado/i);
  });

  it('keeps the hero ready for desktop and mobile art direction', () => {
    expect(imageSlots['hero-desktop'].ratio).toBe('4 / 5');
    expect(imageSlots['hero-mobile'].ratio).toBe('4 / 5');
    expect(imageSlots['hero-desktop'].futureFile).not.toBe(
      imageSlots['hero-mobile'].futureFile,
    );
  });
});
