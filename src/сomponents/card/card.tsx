import interiorOne from "../../assets/interiorOne.png";
import interiorTwo from "../../assets/interiorTwo.png";
import interiorThree from "../../assets/interiorThree.png";
import like from "../../assets/like.svg";
import share from "../../assets/share.svg";
import { Card } from "./constants";
import styles from "./card.module.css";

export const ProductCard = () => {
  return (
    <div className={styles.productCards}>
      <Card
        productName="White Swan Chair"
        productPrice={40}
        imageUrl={interiorOne}
        likeIcon={like}
        shareIcon={share}
      />

      <Card
        productName="White Swan Chair"
        productPrice={40}
        imageUrl={interiorTwo}
        likeIcon={like}
        shareIcon={share}
      />

      <Card
        productName="White Swan Chair"
        productPrice={40}
        imageUrl={interiorThree}
        likeIcon={like}
        shareIcon={share}
      />
    </div>
  );
};
