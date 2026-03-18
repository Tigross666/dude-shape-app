import { AppLink } from '@/shared/ui/app-link';
import styles from './navigation.module.css';

const NAVIGATION_ROUTES = [
  { href: '#', title: 'Home' },
  { href: '#', title: 'About' },
  { href: '#', title: 'Features' },
  { href: '#', title: 'Contact' },
];

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {NAVIGATION_ROUTES.map((route) => (
          <li key={route.title}>
            <AppLink title={route.title} href={route.href} presets="dark" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
