import { SectionId } from '../types/app';

export interface NavigationLink {
  id: SectionId;
  label: string;
}

export const HOME_NAV_LINKS: NavigationLink[] = [
  { id: 'tentang-kami', label: 'Cerita' },
  { id: 'menu', label: 'Menu' },
  { id: 'promo', label: 'Promo' },
  { id: 'kontak', label: 'Kontak' },
];
