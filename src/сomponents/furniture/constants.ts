import type { CardProps } from "../card/card";
import interiorOne from "../../assets/interiorOne.png";
import interiorTwo from "../../assets/interiorTwo.png";
import interiorThree from "../../assets/interiorThree.png";

type CardsType = CardProps & {};

export const CARDS: CardsType[] = [
  {
    title: "White Swan Chair ",
    price: 40,
    image: { url: interiorOne, alt: "interiorOne" },
  },

  {
    title: "White Swan Chair ",
    price: 40,
    image: { url: interiorTwo, alt: "interiorTwo" },
  },

  {
    title: "White Swan Chair ",
    price: 40,
    image: { url: interiorThree, alt: "interiorThree" },
  },
];
