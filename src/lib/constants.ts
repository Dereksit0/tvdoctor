export const PHONE = '222 713 2551';
export const PHONE_HREF = 'tel:+522227132551';
export const WA_GENERIC =
  'https://wa.me/522227132551?text=Hola%2C%20quiero%20informes%20sobre%20reparaci%C3%B3n%20de%20pantalla';
export const WA_DIAGNOSTIC =
  'https://wa.me/522227132551?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20gratuito';
export const WA_DOMICILIO =
  'https://wa.me/522227132551?text=Hola%2C%20necesito%20servicio%20a%20domicilio';
export const MAPS_URL = 'https://maps.app.goo.gl/Tz3zi8ne7sLKjHnF8';
export const MAPS_EMBED =
  'https://maps.google.com/maps?q=TV+Doctor+Puebla+Mexico&output=embed';

// Dirección del centro de servicio (recolección y entrega).
export const SHOP_ADDRESS =
  'Antiguo Camino Real a Cholula 4219, Camino Real a Cholula, 72837 Heroica Puebla de Zaragoza, Pue.';
// Coordenadas del centro de la zona de cobertura.
// AJUSTA estos valores si el pin no cae exactamente sobre el local.
export const SHOP_COORDS = { lat: 19.047733, lng: -98.257709 };
// Radio (en km) dentro del cual la recolección y entrega es GRATIS.
export const FREE_PICKUP_RADIUS_KM = 20;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SHOP_COORDS.lat},${SHOP_COORDS.lng}`;

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Garantía', href: '#garantia' },
  { label: 'Contacto', href: '#contacto' },
];

export const TRUST_BADGES = [
  { icon: 'check', text: 'Diagnóstico gratuito' },
  { icon: 'shield', text: '3 a 6 meses de garantía' },
  { icon: 'home', text: 'Servicio a domicilio' },
  { icon: 'bolt', text: 'Presupuesto sin costo' },
] as const;

export type ValueProp = {
  number: string;
  title: string;
  description: string;
};

export const VALUE_PROPS: ValueProp[] = [
  {
    number: '01',
    title: 'Diagnóstico gratuito',
    description:
      'Evaluamos tu pantalla sin costo antes de cualquier reparación. Sin sorpresas.',
  },
  {
    number: '02',
    title: '3–6 meses de garantía',
    description:
      'Todas nuestras reparaciones tienen garantía por escrito. Tu inversión protegida.',
  },
  {
    number: '03',
    title: 'Técnicos certificados',
    description:
      'Años de experiencia en todas las marcas y tecnologías del mercado.',
  },
  {
    number: '04',
    title: 'Servicio a domicilio',
    description:
      'Vamos hasta donde estás. Sin que tengas que cargar tu pantalla.',
  },
];

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  iconType: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Reparación de Pantallas',
    description:
      'Diagnóstico y reparación profesional de todo tipo de fallas. Imagen, retroiluminación, placa, fuente de poder y más.',
    iconType: 'monitor',
  },
  {
    id: 2,
    title: 'Mantenimiento Preventivo',
    description:
      'Limpieza interna, revisión de componentes y calibración. Prolonga la vida útil de tu pantalla.',
    iconType: 'shield',
  },
  {
    id: 3,
    title: 'Servicio a Domicilio',
    description:
      'Vamos a tu hogar u oficina con todo el equipo necesario. Puebla y zona metropolitana.',
    iconType: 'home',
  },
  {
    id: 4,
    title: 'Pantallas Smart TV',
    description:
      'Reparación de sistemas Android TV, Google TV, Roku, Fire TV y más. Software y hardware.',
    iconType: 'smart',
  },
  {
    id: 5,
    title: 'Diagnóstico Express',
    description:
      'Evaluación completa en el día. Sabrás exactamente qué tiene tu pantalla y cuánto costará repararla.',
    iconType: 'search',
  },
  {
    id: 6,
    title: 'Pantallas Comerciales',
    description:
      'Reparación de monitores, pantallas para negocio, restaurantes, hoteles y espacios corporativos.',
    iconType: 'building',
  },
];

export const TECHNOLOGIES = [
  'Plasma',
  'LCD',
  'LED 4K',
  'OLED',
  'OLED EVO',
  'Neo QLED',
  'ULED',
  'Roku TV',
  'Fire TV',
  'Google TV',
  'Android TV',
  'Smart TV',
  'Curvo',
  '8K',
];

export type BrandItem = {
  name: string;
  displayColor: string;
  weight: string;
};

export const BRANDS: BrandItem[] = [
  { name: 'SONY', displayColor: '#FFFFFF', weight: '700' },
  { name: 'Panasonic', displayColor: '#004B8D', weight: '700' },
  { name: 'Samsung', displayColor: '#1428A0', weight: '700' },
  { name: 'LG', displayColor: '#A50034', weight: '800' },
  { name: 'TCL', displayColor: '#E4002B', weight: '700' },
  { name: 'Hisense', displayColor: '#009FE3', weight: '700' },
  { name: 'Sharp', displayColor: '#CCCCCC', weight: '700' },
  { name: 'Philips', displayColor: '#0077B3', weight: '700' },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contáctanos',
    description: 'Llámanos o escríbenos por WhatsApp. Cuéntanos el problema.',
  },
  {
    number: '02',
    title: 'Diagnóstico gratuito',
    description:
      'Evaluamos tu pantalla sin costo. Te damos el presupuesto exacto.',
  },
  {
    number: '03',
    title: 'Reparación experta',
    description:
      'Trabajamos con refacciones de calidad. Tiempo estimado según el caso.',
  },
  {
    number: '04',
    title: 'Garantía incluida',
    description:
      'Entregamos con 3 a 6 meses de garantía por escrito.',
  },
];
