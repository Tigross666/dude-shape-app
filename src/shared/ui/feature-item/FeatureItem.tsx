import styles from './feature-item.module.css';
import { Icon } from '@/shared/ui/icon';

export interface FeatureItemProps {
  id: string;
  icon: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

export const FeatureItem = ({
  icon,
  alt,
  title,
  description,
  className,
}: FeatureItemProps) => {
  return (
    <div className={`${styles.element} ${className ?? ''}`}>
      <div className={styles.iconWrapper}>
        <Icon src={icon} alt={alt} className={className} />
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
