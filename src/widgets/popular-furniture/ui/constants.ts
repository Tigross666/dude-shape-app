import type { Product } from '@/entities/product';
import interiorOne from '@/shared/assets/interiorOne.png';
import interiorTwo from '@/shared/assets/interiorTwo.png';
import interiorThree from '@/shared/assets/interiorThree.png';

export const FEATURED_PRODUCTS: Product[] = [
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorOne, alt: 'Interior one' },
  },
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorTwo, alt: 'Interior two' },
  },
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorThree, alt: 'Interior three' },
  },
];
