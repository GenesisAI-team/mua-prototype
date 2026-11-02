import { site } from '../data/site';

export function buildWhatsAppUrl(message: string): string {
  return `${site.whatsapp.url}?text=${encodeURIComponent(message)}`;
}
