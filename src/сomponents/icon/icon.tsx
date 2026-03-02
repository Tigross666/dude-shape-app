import mastercardIcon from "../../assets/mastercard.svg";
import airbnbIcon from "../../assets/airbnb.svg";
import uberIcon from "../../assets/uber.svg";
import paypalIcon from "../../assets/paypal.svg";
import visaIcon from "../../assets/visa.svg";
import stripeIcon from "../../assets/stripe.svg";
import sofaImage from "../../assets/sofa.png";
import shieldIcon from "../../assets/shield.svg";
import tickIcon from "../../assets/tick.svg";
import truckIcon from "../../assets/truck.svg";

const icons = {
  mastercard: { src: mastercardIcon, alt: "Mastercard" },
  airbnb: { src: airbnbIcon, alt: "Airbnb" },
  uber: { src: uberIcon, alt: "Uber" },
  paypal: { src: paypalIcon, alt: "PayPal" },
  visa: { src: visaIcon, alt: "Visa" },
  stripe: { src: stripeIcon, alt: "Stripe" },
  sofa: { src: sofaImage, alt: "Sofa" },
  shield: { src: shieldIcon, alt: "Shield" },
  tick: { src: tickIcon, alt: "Tick" },
  truck: { src: truckIcon, alt: "Truck" },
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
}

export const Icon = ({ name }: IconProps) => {
  const icon = icons[name];
  return <img src={icon.src} alt={icon.alt} />;
};
