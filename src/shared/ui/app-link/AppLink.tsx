import styles from './app-link.module.css';

export interface AppLinkProps {
  href?: string;
  title: string;
  presets?: 'dark';
}

export const AppLink = ({ href = '#', title, presets }: AppLinkProps) => {
  return (
    <a
      href={href}
      className={`${styles.root} ${presets ? styles[presets] : ''}`}
    >
      {title}
    </a>
  );
};
