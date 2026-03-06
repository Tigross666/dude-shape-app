import type { FeatureItemProps } from "../featureItem/featureItem";
import shield from "../../assets/shield.svg";
import tick from "../../assets/tick.svg";
import truck from "../../assets/truck.svg";


export const ITEMS: FeatureItemProps[]  = [
  {
    id: 'shield',
    icon: shield,
    alt: "shield",
    title: "Best Quality",
    description: "All of our furniture uses the best materials and choices"
  },
  {
    id: 'tick',
    icon: tick,
    alt: "tick",
    title: "100% Secure",
    description: "All of our furniture uses the best materials and choices"
  },
  {
    id: 'truck',
    icon: truck,
    alt: "truck",
    title: "Free Shipping",
    description: "All of our furniture uses the best materials and choices"
  }
];