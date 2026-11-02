import type { ImageSlotId } from './images';

export const navigation = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'El espacio', href: '#estudio' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly imageSlot: ImageSlotId;
  readonly portrait?: boolean;
}

export const services: readonly Service[] = [
  {
    id: 'semipermanente',
    title: 'Manicura y esmaltado semipermanente',
    description:
      'Manicura rusa, tradicional o semipermanente, con atención a la forma, la cutícula y el detalle final.',
    detail:
      'También podemos reforzar la uña con calcio cuando está débil o necesita más longitud. Confirmamos contigo el acabado antes de empezar.',
    imageSlot: 'service-semi',
  },
  {
    id: 'acrilicas',
    title: 'Uñas acrílicas y extensiones',
    description:
      'Alargamiento, relleno y reparación para conseguir la forma y el largo que tienes en mente.',
    detail:
      'Trabajamos la estructura de la uña y el acabado que mejor encaja contigo. Si se rompe una uña, valoramos el arreglo antes de la cita.',
    imageSlot: 'service-acrylic',
    portrait: true,
  },
  {
    id: 'pedicura',
    title: 'Pedicura',
    description:
      'Limpieza completa de pies, esmaltado tradicional o semipermanente para un acabado cuidado.',
    detail:
      'Adaptamos el tratamiento al estado de la piel y de la uña. Confirmamos contigo el acabado y el tiempo necesario antes de empezar.',
    imageSlot: 'gallery-02',
  },
  {
    id: 'cejas',
    title: 'Diseño de cejas',
    description:
      'Depilación y diseño para definir la forma de la ceja con un acabado natural.',
    detail:
      'Revisamos contigo la forma antes de trabajar la ceja. Consulta disponibilidad y detalles por WhatsApp.',
    imageSlot: 'gallery-07',
  },
  {
    id: 'facial',
    title: 'Tratamiento facial',
    description:
      'Limpieza facial completa en versión básica o completa, según el tiempo y el cuidado que busques.',
    detail:
      'La limpieza facial se adapta a cada piel. Confirmamos contigo la opción y la duración antes de la cita.',
    imageSlot: 'gallery-06',
    portrait: true,
  },
];

export interface PriceItem {
  readonly id: string;
  readonly title: string;
  readonly note?: string;
  readonly variant?: string;
  readonly duration?: string;
  readonly price: string;
}

export interface PriceGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly PriceItem[];
}

export const priceGroups: readonly PriceGroup[] = [
  {
    id: 'manicura',
    label: 'Manicura',
    items: [
      { id: 'limpieza', title: 'Limpieza (manicura rusa)', price: '15 €' },
      {
        id: 'tradicional',
        title: 'Manicura tradicional',
        note: 'Incluye manicura rusa',
        price: '17 €',
      },
      {
        id: 'semipermanente',
        title: 'Manicura semipermanente',
        price: '20 €',
      },
      {
        id: 'refuerzo-calcio',
        title: 'Manicura con refuerzo de calcio',
        note: 'Base para reforzar uñas débiles o largas',
        price: '25 €',
      },
      {
        id: 'refuerzo-largas',
        title: 'Manicura con refuerzo en uñas largas',
        price: '28 €',
      },
      { id: 'alargamiento', title: 'Alargamiento', price: '40 €' },
      { id: 'relleno', title: 'Relleno', price: '28 €' },
      {
        id: 'una-rota',
        title: 'Alargar 1 uña rota',
        price: '3 €',
      },
    ],
  },
  {
    id: 'pedicura',
    label: 'Pedicura',
    items: [
      {
        id: 'limpieza-pies',
        title: 'Limpieza de pies completa',
        note: 'SPA',
        price: '20 €',
      },
      {
        id: 'esmaltado-tradicional',
        title: 'Pedicura con esmaltado tradicional',
        price: '25 €',
      },
      {
        id: 'esmaltado-semipermanente',
        title: 'Pedicura con esmaltado semipermanente',
        price: '30 €',
      },
    ],
  },
  {
    id: 'otros',
    label: 'Otros servicios',
    items: [
      {
        id: 'depilacion-cejas',
        title: 'Depilación de cejas',
        price: '7/10 €',
      },
      {
        id: 'facial-basica',
        title: 'Limpieza facial completa',
        variant: 'Básica',
        duration: '45 min',
        price: '55 €',
      },
      {
        id: 'facial-completa',
        title: 'Limpieza facial completa',
        variant: 'Completa',
        duration: '1 h',
        price: '65 €',
      },
    ],
  },
];

export const gallery = [
  {
    slot: 'gallery-01',
    caption: 'Manicura en proceso',
    position: 'wide',
  },
  {
    slot: 'gallery-02',
    caption: 'Pedicura spa',
    position: 'tall',
  },
  {
    slot: 'gallery-03',
    caption: 'Detalle de marca',
    position: 'square',
  },
  {
    slot: 'gallery-04',
    caption: 'Fachada',
    position: 'landscape',
  },
  {
    slot: 'gallery-07',
    caption: 'Diseño de cejas',
    position: 'cluster',
  },
  {
    slot: 'gallery-05',
    caption: 'Manicura francesa',
    position: 'cluster',
  },
  {
    slot: 'gallery-08',
    caption: 'Luz natural',
    position: 'cluster',
  },
  {
    slot: 'gallery-06',
    caption: 'Tratamiento facial',
    position: 'cluster',
  },
] as const satisfies readonly {
  readonly slot: ImageSlotId;
  readonly caption: string;
  readonly position: string;
}[];

export const principles = [
  {
    title: 'Escuchar primero',
    description:
      'Partimos de lo que buscas y de cómo cuidas tus uñas para proponer un acabado coherente.',
  },
  {
    title: 'Cuidar el proceso',
    description:
      'La preparación, la forma y el terminado importan tanto como el color final.',
  },
  {
    title: 'Hablar claro',
    description:
      'Confirmamos disponibilidad y detalles antes de la cita, sin promesas que no podamos sostener.',
  },
] as const;

export const visitSteps = [
  {
    title: 'Cuéntanos qué buscas',
    description:
      'Escríbenos o llámanos con tu idea, la fecha aproximada y cualquier referencia que tengas.',
  },
  {
    title: 'Acordamos el detalle',
    description:
      'Revisamos forma, largo y acabado para que la cita llegue con las ideas claras.',
  },
  {
    title: 'Disfruta del proceso',
    description:
      'Un espacio luminoso, materiales preparados y el tiempo necesario para cada detalle.',
  },
] as const;
