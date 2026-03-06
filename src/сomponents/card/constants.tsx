import styles from "./card.module.css";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import like from "../../assets/like.svg";
import share from "../../assets/share.svg";

interface CardProps {
  productName: string;
  productPrice: number;
  imageUrl: string;
  alt?: string;
  className?: string;
  buttonText?: string;
  likeIcon?: string;
  shareIcon?: string;
}

export const Card = ({
  productName,
  productPrice,
  imageUrl,
  alt,
  likeIcon = like,
  shareIcon = share,
  className = "",
  buttonText = "Buy Now",
}: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div>
        <img src={imageUrl} alt={alt || productName} />
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.name}>{productName}</div>
        <div className={styles.buttons}>
          <Button size="saveSize" presets="save">
            <Icon src={likeIcon} alt="like" />
          </Button>

          <Button size="saveSize" presets="share">
            <Icon src={shareIcon} alt="share" />
          </Button>
        </div>
      </div>

      <div className={styles.buy}>
        <p className={styles.price}>${productPrice}</p>
        <Button size="small" presets="dark">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Card;
