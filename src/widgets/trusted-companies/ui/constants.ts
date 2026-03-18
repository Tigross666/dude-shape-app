import type { IconProps } from '@/shared/ui/icon';
import mastercardIcon from '@/shared/assets/mastercard.svg';
import airbnbIcon from '@/shared/assets/airbnb.svg';
import uberIcon from '@/shared/assets/uber.svg';
import paypalIcon from '@/shared/assets/paypal.svg';
import visaIcon from '@/shared/assets/visa.svg';
import stripeIcon from '@/shared/assets/stripe.svg';

export const COMPANY_LOGOS: IconProps[] = [
  { src: mastercardIcon, alt: 'Mastercard' },
  { src: airbnbIcon, alt: 'Airbnb' },
  { src: uberIcon, alt: 'Uber' },
  { src: paypalIcon, alt: 'PayPal' },
  { src: visaIcon, alt: 'Visa' },
  { src: stripeIcon, alt: 'Stripe' },
];
