import styles from './popular-furniture.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { ProductCard } from '@/entities/product';
import { FEATURED_PRODUCTS } from './constants';
import vectorLeft from '@/shared/assets/left_vector.svg';
import vectorRight from '@/shared/assets/right_vector.svg';

export const PopularFurniture = () => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Our Popular Furniture</h1>
          <p className={styles.description}>
            All of our furniture uses the best materials and choices for our
            customers. All of our <br />
            furniture uses the best materials and choices for our customers.
          </p>
        </div>
        <div className={styles.navigation}>
          <Button size="vector" presets="arrow">
            <Icon src={vectorLeft} alt="previous" />
          </Button>
          <Button size="vector" presets="arrow">
            <Icon src={vectorRight} alt="next" />
          </Button>
        </div>
      </div>

      <div className={styles.cards}>
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard
            key={product.title + product.image.alt}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};
