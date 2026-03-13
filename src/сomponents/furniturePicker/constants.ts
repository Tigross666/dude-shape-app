import type { CategoryButtonProps } from "../categoryButton/categoryButton";
import bedRoom from "../../assets/bedRoom.svg";
import diningRoom from "../../assets/diningRoom.svg";
import hallway from "../../assets/hallway.svg";
import kitchen from "../../assets/kitchen.svg";
import livingRoom from "../../assets/livingRoom.svg";

export const CATEGORIES: CategoryButtonProps[] = [
  {
    image: { url: bedRoom, alt: "bedRoom" },
    title: "Bed Room",
  },
  {
    image: { url: hallway, alt: "hallway" },
    title: "Hallway",
  },
  {
    image: { url: diningRoom, alt: "diningRoom" },
    title: "Dining Room",
  },
  {
    image: { url: kitchen, alt: "kitchen" },
    title: "Kitchen",
  },
  {
    image: { url: livingRoom, alt: "livingRoom" },
    title: "Living Room",
  },
  {
    image: { url: livingRoom, alt: "office" }, // Обратите внимание: здесь livingRoom для office
    title: "Office",
  },
];
