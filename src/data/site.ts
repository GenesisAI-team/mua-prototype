export interface PhoneField {
  readonly href: string;
  readonly display: string;
}

export interface AddressField {
  readonly line1: string;
  readonly line2: string;
}

export interface WhatsAppField {
  readonly number: string;
  readonly url: string;
}

export const site = {
  name: 'MUA Estética',
  shortName: 'MUA',
  city: 'Pamplona',
  region: 'Navarra',
  country: 'España',
  instagram: {
    handle: '@muanails.es',
    url: 'https://www.instagram.com/muanails.es/?hl=es',
  },
  phone: {
    href: 'tel:+34747496624',
    display: '747 49 66 24',
  } satisfies PhoneField,
  whatsapp: {
    number: '34747496624',
    url: 'https://wa.me/34747496624',
  } satisfies WhatsAppField,
  address: {
    line1: 'Calle de Artica',
    line2: 'Pamplona, Navarra',
  } satisfies AddressField,
  hours: {
    label: 'Horario',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=MUA+Est%C3%A9tica+Calle+de+Artica+Pamplona',
} as const;
