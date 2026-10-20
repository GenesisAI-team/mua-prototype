export interface ProvisionalField {
  readonly provisional: boolean;
  readonly note?: string;
}

export interface PhoneField extends ProvisionalField {
  readonly href: string;
  readonly display: string;
}

export interface AddressField extends ProvisionalField {
  readonly line1: string;
  readonly line2: string;
  readonly numberPending: boolean;
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
    provisional: true,
    note: 'Teléfono provisional pendiente de confirmar.',
  } satisfies PhoneField,
  address: {
    line1: 'Calle de Artica',
    line2: 'Pamplona, Navarra',
    numberPending: true,
    provisional: true,
    note: 'Dirección provisional: falta confirmar el número exacto.',
  } satisfies AddressField,
  hours: {
    label: 'Horario pendiente de confirmar',
    provisional: true,
    note: 'Consulta disponibilidad por teléfono o Instagram.',
  } satisfies ProvisionalField & { readonly label: string },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=MUA+Est%C3%A9tica+Calle+de+Artica+Pamplona',
} as const;
