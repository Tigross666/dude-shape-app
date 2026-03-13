import styles from "./card.module.css";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import like from "../../assets/like.svg";
import share from "../../assets/share.svg";

export interface CardProps {
  title: string;
  price: number;
  image: { url: string; alt: string };
}

export const Card = ({ title, price, image }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image.url} alt={image.alt} />
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.activityButtons}>
            <Button size="like" presets="favorites">
              <Icon src={like} alt="like" />
            </Button>
            <Button size="like" presets="share">
              <Icon src={share} alt="share" />
            </Button>
          </div>
        </div>

        <div className={styles.buySection}>
          <p className={styles.price}>${price}</p>
          <Button size="small" presets="dark">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
