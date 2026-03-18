import { Button } from '@/shared/ui/button';
import styles from './hero-section.module.css';
import chairImage from '@/shared/assets/chair.png';

export const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <img className={styles.chair} src={chairImage} alt="chair" />
      <div className={styles.text}>
        <h1>We Help You Make Modern Furniture</h1>
        <p className={styles.paragraph}>
          All of our furniture uses the best materials and choices for our
          customers. All of our furniture uses the best materials
        </p>
        <Button size="medium" presets="light">
          Explore more
        </Button>
      </div>
    </div>
  );
};
