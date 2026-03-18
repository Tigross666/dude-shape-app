import { Icon } from '@/shared/ui/icon';
import { FeatureItem } from '@/shared/ui/feature-item';
import { ABOUT_FEATURES } from './constants';
import styles from './about-section.module.css';
import sofaImage from '@/shared/assets/sofa.png';

export const AboutSection = () => {
  return (
    <div className={styles.section}>
      <Icon src={sofaImage} alt="sofa" />
      <div>
        <div>
          <h1 className={styles.heading}>About Us</h1>
          <p className={styles.paragraph}>
            All of our furniture uses the best materials and <br />
            choices for our customers. All of our furniture <br />
            uses the best materials
          </p>
        </div>
        <div className={styles.features}>
          {ABOUT_FEATURES.map((item) => (
            <FeatureItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
