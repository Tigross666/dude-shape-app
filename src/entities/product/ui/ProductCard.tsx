import styles from './product-card.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import like from '@/shared/assets/like.svg';
import share from '@/shared/assets/share.svg';
import type { Product } from '../model/types';

export const ProductCard = ({ title, price, image }: Product) => {
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
