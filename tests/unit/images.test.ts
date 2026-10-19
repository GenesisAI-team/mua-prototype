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
      expect(slot.src).toBeNull();
    }
  });

  it('does not duplicate files or identifiers', () => {
    const files = imageSlotList.map((slot) => slot.futureFile);
    const ids = imageSlotList.map((slot) => slot.id);

    expect(new Set(files).size).toBe(files.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('labels every empty slot as pending instead of presenting fake work', () => {
    for (const slot of imageSlotList) {
      expect(`${slot.label} ${slot.alt}`.toLowerCase()).toMatch(
        /foto aquí|mapa pendiente|espacio reservado/,
      );
    }
  });

  it('keeps the hero ready for desktop and mobile art direction', () => {
    expect(imageSlots['hero-desktop'].ratio).toBe('4 / 5');
    expect(imageSlots['hero-mobile'].ratio).toBe('4 / 5');
    expect(imageSlots['hero-desktop'].futureFile).not.toBe(
      imageSlots['hero-mobile'].futureFile,
    );
  });
});
