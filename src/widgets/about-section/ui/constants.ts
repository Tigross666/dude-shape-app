import type { FeatureItemProps } from '@/shared/ui/feature-item';
import shield from '@/shared/assets/shield.svg';
import tick from '@/shared/assets/tick.svg';
import truck from '@/shared/assets/truck.svg';

export const ABOUT_FEATURES: FeatureItemProps[] = [
  {
    id: 'shield',
    icon: shield,
    alt: 'shield',
    title: 'Best Quality',
    description: 'All of our furniture uses the best\n materials and choices',
  },
  {
    id: 'tick',
    icon: tick,
    alt: 'tick',
    title: '100% Secure',
    description: 'All of our furniture uses the best\n materials and choices',
  },
  {
    id: 'truck',
    icon: truck,
    alt: 'truck',
    title: 'Free Shipping',
    description: 'All of our furniture uses the best\n materials and choices',
  },
];
