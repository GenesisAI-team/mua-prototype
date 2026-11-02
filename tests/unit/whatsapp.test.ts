import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { buildWhatsAppUrl } from '../../src/lib/whatsapp';

describe('WhatsApp contact', () => {
  it('uses the configured phone number', () => {
    expect(site.whatsapp.url).toBe('https://wa.me/34747496624');
    expect(site.whatsapp.number).toBe('34747496624');
  });

  it('builds a direct link with the service message prefilled', () => {
    const message = 'Hola, quiero reservar Limpieza (manicura rusa).';
    const url = new URL(buildWhatsAppUrl(message));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/34747496624');
    expect(url.searchParams.get('text')).toBe(message);
  });
});
