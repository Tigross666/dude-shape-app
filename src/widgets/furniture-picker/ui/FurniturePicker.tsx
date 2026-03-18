import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { CategoryButton } from '@/shared/ui/category-button';
import styles from './furniture-picker.module.css';
import interiorFour from '@/shared/assets/interiorFour.png';
import { ROOM_CATEGORIES } from './constants';

export const FurniturePicker = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Furniture</h1>
      <div className={styles.tabs}>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Room</h3>
        </Button>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Category</h3>
        </Button>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Style</h3>
        </Button>
      </div>

      <div className={styles.content}>
        <Icon src={interiorFour} alt="Interior four" />
        <div className={styles.grid}>
          {ROOM_CATEGORIES.map((category) => (
            <CategoryButton
              key={category.title}
              image={category.image}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
