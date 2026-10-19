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
}

export const services: readonly Service[] = [
  {
    id: 'semipermanente',
    title: 'Manicura y esmaltado semipermanente',
    description:
      'Un acabado cuidado para el día a día, con atención a la forma, la cutícula y el detalle final.',
    detail:
      'Si buscas un color limpio y una manicura bien terminada, esta es la opción de partida. Confirmamos contigo el acabado antes de empezar.',
    imageSlot: 'service-semi',
  },
  {
    id: 'acrilicas',
    title: 'Uñas acrílicas y extensiones',
    description:
      'Construcción y extensión a medida para conseguir la forma y el largo que tienes en mente.',
    detail:
      'Trabajamos la estructura de la uña y el acabado que mejor encaja contigo. Consulta disponibilidad y detalles por teléfono o Instagram.',
    imageSlot: 'service-acrylic',
  },
];

export const gallery = [
  {
    slot: 'gallery-01',
    caption: 'Detalle de manicura',
    position: 'wide',
  },
  {
    slot: 'gallery-02',
    caption: 'Acabado natural',
    position: 'tall',
  },
  {
    slot: 'gallery-03',
    caption: 'Textura y color',
    position: 'square',
  },
  {
    slot: 'gallery-04',
    caption: 'Luz de estudio',
    position: 'landscape',
  },
  {
    slot: 'gallery-05',
    caption: 'Detalle editorial',
    position: 'tall',
  },
  {
    slot: 'gallery-06',
    caption: 'Inspiración de estilo',
    position: 'portrait',
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
