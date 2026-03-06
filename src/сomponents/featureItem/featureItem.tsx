import styles from "./featureItem.module.css";
import { Icon } from "../icon/icon";

export interface FeatureItemProps {
  id: string;
  icon: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureItem = ({icon, alt, title, description, className }: FeatureItemProps) => {
  return (
    <div className={` ${styles.elements} ${className || ""}`}>
      <div className={styles.elementIcons}>
        <Icon src={icon} alt={alt} />
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.paragraph}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
