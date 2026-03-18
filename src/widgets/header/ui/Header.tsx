import { Navigation } from './Navigation';
import loupeImage from '@/shared/assets/loupe.svg';
import menuImage from '@/shared/assets/menu.svg';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>DudeShape</h2>
      <Navigation />
      <div className={styles.tools}>
        <img src={loupeImage} alt="loupe" />
        <img src={menuImage} alt="menu" />
      </div>
    </header>
  );
};
