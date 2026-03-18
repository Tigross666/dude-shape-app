import type { CategoryButtonProps } from '@/shared/ui/category-button';
import bedRoom from '@/shared/assets/bedRoom.svg';
import diningRoom from '@/shared/assets/diningRoom.svg';
import hallway from '@/shared/assets/hallway.svg';
import kitchen from '@/shared/assets/kitchen.svg';
import livingRoom from '@/shared/assets/livingRoom.svg';

export const ROOM_CATEGORIES: CategoryButtonProps[] = [
  { image: { url: bedRoom, alt: 'bedRoom' }, title: 'Bed Room' },
  { image: { url: hallway, alt: 'hallway' }, title: 'Hallway' },
  { image: { url: diningRoom, alt: 'diningRoom' }, title: 'Dining Room' },
  { image: { url: kitchen, alt: 'kitchen' }, title: 'Kitchen' },
  { image: { url: livingRoom, alt: 'livingRoom' }, title: 'Living Room' },
  { image: { url: livingRoom, alt: 'office' }, title: 'Office' },
];
