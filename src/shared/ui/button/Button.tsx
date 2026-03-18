import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'vector' | 'like';
  presets?: 'dark' | 'light' | 'arrow' | 'favorites' | 'share';
}

export const Button = ({
  children,
  size = 'small',
  presets = 'light',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${styles.root} ${styles[size]} ${styles[presets]}`}
      {...props}
    >
      {children}
    </button>
  );
};
